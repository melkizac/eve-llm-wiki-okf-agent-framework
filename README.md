# Eve LLM Wiki OKF folder-structure scaffold

This repository is a static, filesystem-first reference for organizing an Eve
agent project. It demonstrates where authored instructions, optional capability
folders, immutable source material, and an Open Knowledge Format (OKF) Wiki can
live.

It is **not an installed Eve runtime or a runnable application**.

## No installation required

You do not need Node.js, pnpm, an AI Gateway credential, a Vercel project, WSL,
or an Eve installation to use this repository as a folder-structure scaffold.
Clone it, download it, or copy the parts of `agent/` that fit your project.

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
    `-- wiki/                     # Portable OKF v0.2 Markdown knowledge bundle
        |-- index.md
        |-- log.md
        |-- source-manifest.md
        |-- _templates/
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

1. Copy `agent/` into the project that will own the structure.
2. Customize `agent/instructions.md` for the intended agent.
3. Keep original source material under `agent/sandbox/workspace/raw/`.
4. Maintain source-backed concepts under `agent/sandbox/workspace/wiki/`.
5. Update the Wiki index, source manifest, related pages, and newest-first log
   whenever knowledge is ingested or materially revised.

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
