# Adopt Eve, LLM Wiki, and OKF together

Use this repository as one combined scaffold. Students do not need to adopt
the three upstream projects separately or run three installers.

## Sequence

1. **Eve structure first.** Inspect the destination, its instructions, and any
   existing agent. Establish the owning `agent/` folder and customize its
   `instructions.md`. This repository adopts filesystem conventions only.
2. **LLM Wiki workflow second.** Choose one canonical raw-source directory and
   one canonical wiki. In a new project use `agent/sandbox/workspace/raw/` and
   `agent/sandbox/workspace/wiki/`. Define ingest, query, and lint behavior.
3. **OKF format third, before the first ingest.** Apply OKF v0.2 metadata,
   provenance, lifecycle, and index/log conventions to that same wiki.
4. **Check and ingest.** Verify the structure and links, then process supplied
   source material. Keep examples distinct from actual project facts.

The supplied scaffold already performs steps 1–3. Copying it is one adoption
step; the sequence explains how to assemble or adapt the layers. Eve need not
be installed for the wiki to be useful.

| Layer | Owns | Does not provide in this scaffold |
|---|---|---|
| Eve | Agent instructions and capability folder locations | Running agent, tools, model calls, or sandbox access |
| LLM Wiki | Source preservation and knowledge maintenance | Cross-session preferences or operational memory |
| OKF | Markdown metadata and exchange conventions | Runtime, permissions, or factual verification |

## New project

Copy the scaffold into the intended empty project, preserving an existing
`.git` directory. Include `AGENTS.md`, `CLAUDE.md`, `docs/`, and `agent/`, not
only the agent prompt: the maintenance contract is part of the framework.
Personalize identity and purpose without inventing goals the learner has not
provided. Templates live in `agent/sandbox/workspace/templates/`.

## Existing project

Inspect first and merge deliberately:

- Preserve existing `AGENTS.md`, `CLAUDE.md`, agent prompts, sources, and user
  changes. Merge applicable instructions rather than replacing whole files.
- Reuse an existing Eve agent. Avoid creating an `agent/agent/` nesting or
  a second agent merely to adopt knowledge conventions.
- If `raw/` and `wiki/` already exist at the project root, keep them there
  unless the learner requests relocation. Record their canonical paths in the
  project instructions. Do not create competing copies under the sandbox.
- Existing Markdown links are relative to their file or to the OKF bundle
  root when they begin with `/`. If paths change, update links and source
  metadata, then check every local target.
- Convert source strings to objects with `resource`. Retain useful unknown
  extension fields. Map lifecycle values deliberately: unfinished work is
  `draft`, consumable work is `stable`, and superseded work is `deprecated`.
  Keep workflow flags such as `needs-review` under `wiki_status`.
- Preserve older chronological logs in a clearly named history concept if
  their format differs. New `log.md` entries use newest ISO-date groups first.
- Leave unresolved authority or policy conflicts visible and ask only for a
  material choice that cannot be resolved from the learner's instructions.

## Copyable student prompt

```text
Adopt https://github.com/melkizac/eve-llm-wiki-okf-agent-framework in this
workspace as a structure-only scaffold.

Inspect the workspace and applicable instructions first. Follow
docs/student-adoption-guide.md: establish or reuse the Eve agent structure,
choose one canonical LLM Wiki and raw-source collection, then apply OKF v0.2
to that wiki before ingesting sources. Merge existing instructions and preserve
user files, sources, and .git. Reuse an existing wiki rather than duplicating it.

Do not install a runtime, dependencies, system software, or request credentials.
Customize the agent only from goals I supply; ask if its purpose is missing.
Check metadata, source references, index coverage, log dates, and local links.
Report the canonical paths, what changed, unresolved conflicts, and the checks
actually performed. Do not claim that a runtime or retrieval tool is working.
```

## Check before calling adoption complete

- One canonical agent and knowledge location are documented.
- Every knowledge concept has parseable YAML with a non-empty `type`.
- `sources` entries contain `resource`; cited footnote IDs match those entries.
- Lifecycle uses `draft`, `stable`, or `deprecated`. `verified` records actual
  source confirmation, never just formatting checks. Metadata timestamps use
  ISO 8601 datetimes with explicit UTC offsets.
- Root index frontmatter contains only `okf_version: "0.2"`; other indexes and
  `log.md` have no frontmatter. Log headings use `## YYYY-MM-DD`, newest first.
- Concept pages are discoverable from the index, and local links resolve or
  are explicitly identified as intended knowledge gaps.
- Templates and placeholder provenance are outside the knowledge bundle.
- Preserve raw bytes. Catalog source paths/URLs, revisions where available,
  retrieval dates, ingest status, and hashes when local source files exist.
- Share the whole workspace when consumers need sibling `raw/` files. A wiki
  export alone must retain reachable sources or package referenced material.

## Later runtime adoption

Only if requested, create or integrate a runnable Eve application using current
upstream documentation. Review dependencies, credentials, model choice, and
Windows compatibility then. The `sandbox/workspace/` name is an authoring
location; it does not automatically mount files or expose retrieval tools.
Wire read-only knowledge access explicitly and test it. Writing wiki knowledge
remains a maintainer operation. Publishing, sending, or deployment requires the
appropriate user authorization.

These rules prevent common integration conflicts; unfamiliar existing projects
can still require a deliberate compatibility decision.
