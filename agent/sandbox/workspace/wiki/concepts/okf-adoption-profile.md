---
type: Implementation Profile
title: OKF adoption profile
description: Project-specific application of Open Knowledge Format v0.2 to a static Eve-compatible LLM Wiki scaffold.
status: stable
tags: [okf, eve, llm-wiki, implementation]
generated: { by: codex/gpt-5, at: 2026-08-22T22:14:06Z }
sources:
  - id: okf-v0-2
    resource: /sources/open-knowledge-format-v0-2.md
    title: Open Knowledge Format v0.2
---

# OKF adoption profile

## Bundle boundary

`agent/sandbox/workspace/wiki/` is the OKF v0.2 bundle. The sibling `raw/`
directory is immutable source storage and provenance support, but it is outside
the portable OKF bundle.

## Required project conventions

- Every concept document has YAML frontmatter and a non-empty `type`.
- Root `index.md` declares `okf_version: "0.2"` and provides progressive
  disclosure without concept metadata.
- `log.md` has no frontmatter and records newest ISO-date updates first.
- Provenance uses structured `sources` entries with a `resource` and stable IDs
  when body claims use keyed footnotes.
- Agent-authored concepts record `generated`; `verified` is omitted unless a
  real source check occurred.
- Lifecycle uses only `draft`, `stable`, and `deprecated`; stale knowledge uses
  an explicit `stale_after` timestamp when applicable.
- Future consumers should tolerate unknown types and extension fields.

## Filesystem mapping

| OKF concern | Scaffold location or rule |
|---|---|
| Progressive discovery | `wiki/index.md` |
| Concept reading | Markdown files under the bundle |
| Provenance | Structured `sources[].resource` entries |
| Source preservation | Immutable files or references under sibling `raw/` |
| Change history | Newest-first entries in `wiki/log.md` |

## Deferred optional features

- Attested Computation is supported as a future concept type but no executor,
  attester, or runtime is included.
- No vector index, graph viewer, schema registry, or external serving layer is
  required for the current bundle.
- No human-review `verified` event is recorded until a named human actually
  reviews a concept against its sources.

## Source

- [Open Knowledge Format v0.2](/sources/open-knowledge-format-v0-2.md)
