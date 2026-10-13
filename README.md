# Eve LLM Wiki OKF folder-structure scaffold

This repository is a static, filesystem-first reference for organizing an Eve
agent project. It demonstrates where authored instructions, optional capability
folders, immutable source material, and an Open Knowledge Format (OKF) Wiki can
live.

It is **not an installed Eve runtime or a runnable application**.

## No installation required

You do not need Node.js, pnpm, an AI Gateway credential, a Vercel project, WSL,
or an Eve installation to use this repository as a folder-structure scaffold.
Clone or download it, then follow the adoption guide to merge its instructions
and agent structure into your project.

Do not install system software or request credentials merely to inspect, copy,
or customize this structure. Runtime dependencies become relevant only if a
future user explicitly asks to turn the scaffold into a runnable Eve agent.

## Structure

```text
agent/
|-- README.md                     # Map of the scaffold
|-- instructions.md              # Example location for standing agent policy
|-- channels/README.md            # Optional transport/channel location
|-- tools/README.md               # Optional typed-action location
`-- sandbox/workspace/
    |-- raw/                      # Immutable source material and references
    |-- templates/                # Authoring examples outside the bundle
    `-- wiki/                     # Portable OKF v0.2 Markdown knowledge bundle
        |-- index.md
        |-- log.md
        |-- source-manifest.md
        |-- concepts/
        |-- entities/
        |-- questions/
        `-- sources/
```

The `channels/` and `tools/` directories contain guidance only. Add executable
files there only when a separate implementation project actually needs those
capabilities. Other Eve folders such as `skills/`, `subagents/`, `connections/`,
and `schedules/` are optional and should be added only when real behavior exists.

## How to use it

Follow the [student adoption guide](docs/student-adoption-guide.md), including
its copyable prompt and existing-project compatibility checks.

1. Establish or reuse the **Eve agent structure** and personalize its instructions.
2. Establish one **LLM Wiki workflow** with canonical raw-source and wiki paths.
3. Apply **OKF v0.2 formatting** to that wiki before ingesting knowledge.
4. Check metadata and links, then ingest sources and maintain the index,
   manifest, related pages, and newest-first log.

This scaffold already combines the three layers. Adopt it once; do not run
three separate setup flows. In an existing project, merge instructions and
reuse existing agent/wiki folders instead of overwriting or duplicating them.

## Wiki and OKF boundary

The sample Wiki is an OKF v0.2 Markdown bundle. Concept documents require YAML
frontmatter with a non-empty `type`; `index.md` and `log.md` are reserved files.
Use structured `sources` entries, record generated authorship, and add
`verified` metadata only when a real machine or named human check occurred.

This repository provides conventions and examples, not an executable validator.
Validation can be added later by the project that adopts the structure.

## If a runnable Eve agent is requested later

Treat that as a separate, explicit implementation step. Consult the current Eve
documentation before adding model configuration, tools, channels, package files,
credentials, build commands, deployment configuration, or runtime validation.

## Sources and attribution

- [Vercel Eve](https://github.com/vercel/eve)
- [Karpathy's LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- [Open Knowledge Format v0.2](https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md), licensed under Apache License 2.0

Implementation decisions and pinned source references are recorded under
`docs/` and `agent/sandbox/workspace/raw/`.
