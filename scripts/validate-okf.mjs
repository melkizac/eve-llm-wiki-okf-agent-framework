import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import YAML from "yaml";

const bundleRoot = path.resolve(
  process.argv[2] ?? "agent/sandbox/workspace/wiki",
);
const allowedStatuses = new Set(["draft", "stable", "deprecated"]);
const failures = [];

function markdownFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...markdownFiles(absolute));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(absolute);
  }
  return files.sort();
}

function relative(file) {
  return path.relative(bundleRoot, file).replaceAll("\\", "/");
}

function parseFrontmatter(text, file) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return null;
  try {
    const value = YAML.parse(match[1]);
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      failures.push(`${file}: frontmatter must be a YAML mapping`);
      return {};
    }
    return value;
  } catch (error) {
    failures.push(`${file}: invalid YAML frontmatter (${error.message})`);
    return {};
  }
}

function explicitTimestamp(value) {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

function validateActorEvent(value, label, file) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    failures.push(`${file}: ${label} must be a mapping`);
    return;
  }
  if (typeof value.by !== "string" || value.by.trim() === "") {
    failures.push(`${file}: ${label}.by must be a non-empty actor`);
  }
  if (value.at !== undefined && !explicitTimestamp(value.at)) {
    failures.push(`${file}: ${label}.at must be an ISO 8601 datetime with an explicit offset`);
  }
}

if (!fs.existsSync(bundleRoot) || !fs.statSync(bundleRoot).isDirectory()) {
  console.error(`OKF bundle not found: ${bundleRoot}`);
  process.exit(1);
}

const files = markdownFiles(bundleRoot);
for (const absolute of files) {
  const file = relative(absolute);
  const basename = path.basename(file);
  const text = fs.readFileSync(absolute, "utf8");
  const frontmatter = parseFrontmatter(text, file);

  if (basename === "index.md") {
    if (file === "index.md") {
      if (!frontmatter || frontmatter.okf_version !== "0.2") {
        failures.push(`${file}: root index must declare okf_version: "0.2"`);
      }
      const keys = frontmatter ? Object.keys(frontmatter) : [];
      if (keys.some((key) => key !== "okf_version")) {
        failures.push(`${file}: root index frontmatter may contain only okf_version`);
      }
    } else if (frontmatter) {
      failures.push(`${file}: nested index files must not contain frontmatter`);
    }
    continue;
  }

  if (basename === "log.md") {
    if (frontmatter) failures.push(`${file}: log files must not contain frontmatter`);
    const dates = [...text.matchAll(/^## (\d{4}-\d{2}-\d{2})\s*$/gm)].map((match) => match[1]);
    for (let index = 1; index < dates.length; index += 1) {
      if (dates[index] > dates[index - 1]) {
        failures.push(`${file}: log date headings must be newest first`);
        break;
      }
    }
    continue;
  }

  if (!frontmatter) {
    failures.push(`${file}: concept document requires YAML frontmatter`);
    continue;
  }
  if (typeof frontmatter.type !== "string" || frontmatter.type.trim() === "") {
    failures.push(`${file}: concept document requires a non-empty type`);
  }
  if (frontmatter.status !== undefined && !allowedStatuses.has(frontmatter.status)) {
    failures.push(`${file}: status must be draft, stable, or deprecated`);
  }
  if (frontmatter.generated !== undefined) {
    validateActorEvent(frontmatter.generated, "generated", file);
  }
  if (frontmatter.verified !== undefined) {
    const events = Array.isArray(frontmatter.verified)
      ? frontmatter.verified
      : [frontmatter.verified];
    for (const [index, event] of events.entries()) {
      validateActorEvent(event, `verified[${index}]`, file);
    }
  }
  if (frontmatter.stale_after !== undefined && !explicitTimestamp(frontmatter.stale_after)) {
    failures.push(`${file}: stale_after must be an ISO 8601 datetime with an explicit offset`);
  }

  const sourceIds = new Set();
  if (frontmatter.sources !== undefined) {
    if (!Array.isArray(frontmatter.sources)) {
      failures.push(`${file}: sources must be a list of mappings`);
    } else {
      for (const [index, source] of frontmatter.sources.entries()) {
        if (!source || typeof source !== "object" || Array.isArray(source)) {
          failures.push(`${file}: sources[${index}] must be a mapping`);
          continue;
        }
        if (typeof source.resource !== "string" || source.resource.trim() === "") {
          failures.push(`${file}: sources[${index}].resource is required`);
        }
        if (source.id !== undefined) {
          if (typeof source.id !== "string" || source.id.trim() === "") {
            failures.push(`${file}: sources[${index}].id must be a non-empty string`);
          } else if (sourceIds.has(source.id)) {
            failures.push(`${file}: duplicate source id ${source.id}`);
          } else {
            sourceIds.add(source.id);
          }
        }
        if (source.last_modified !== undefined && !explicitTimestamp(source.last_modified)) {
          failures.push(`${file}: sources[${index}].last_modified must include an explicit offset`);
        }
      }
    }
  }

  const footnotes = new Set(
    [...text.matchAll(/\[\^([^\]]+)\]/g)].map((match) => match[1]),
  );
  for (const footnote of footnotes) {
    if (!sourceIds.has(footnote)) {
      failures.push(`${file}: footnote ${footnote} has no matching sources[].id`);
    }
  }
}

if (failures.length > 0) {
  console.error(`OKF validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`OKF v0.2 validation passed: ${files.length} Markdown files in ${bundleRoot}`);
