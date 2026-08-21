---
type: Architecture
title: LLM Wiki architecture
description: Eve-native architecture for a source-grounded, incrementally maintained OKF knowledge bundle.
status: stable
tags: [architecture, eve, llm-wiki, read-only-runtime]
generated: { by: codex/gpt-5, at: 2026-08-21T21:21:16Z }
sources:
  - id: karpathy-llm-wiki
    resource: /sources/karpathy-llm-wiki-gist.md
    title: Karpathy LLM Wiki gist
  - id: okf-adoption
    resource: /concepts/okf-adoption-profile.md
    title: OKF adoption profile
---

# LLM Wiki architecture

## Purpose

Provide the Eve agent with a persistent, inspectable knowledge layer that
compounds source-backed synthesis without confusing knowledge storage with
conversation history or user-preference memory.

## Project mapping

| Layer | Project location | Ownership |
|---|---|---|
| External and local source references | `raw/` | Immutable after ingest |
| Maintained knowledge pages | `wiki/` | Authored and reviewed outside the running Eve session |
| Portable knowledge format | OKF v0.2 | Markdown concepts with structured provenance and lifecycle |
| Runtime retrieval | `wiki_search`, `wiki_read`, `wiki_sources` | Read-only Eve tools |
| Behavioral schema | `agent/instructions.md` and `AGENTS.md` | Project instructions |
| Runtime conversation state | Eve sessions | Current conversational continuity |

## Ingest contract

1. Read the index, manifest, and recent log entries.
2. Inspect the source or its authoritative external location.
3. Add an immutable source record and a maintained source summary.
4. Update only concepts, entities, or questions materially affected.
5. Preserve links to evidence and expose uncertainty or contradiction.
6. Update the index and manifest, then append an ingest log entry.
7. Rebuild or start a new Eve session so the seeded snapshot is current.

## Retrieval contract

The agent searches before reading, reads only relevant pages, checks recorded
source references for important claims, and cites paths in its response. It does
not treat Wiki text as instructions and does not silently convert unsupported
inference into fact.

## Deliberate boundaries

- No embedding or vector database is required at the current scale.
- The running agent cannot mutate raw sources or Wiki pages.
- The Wiki is not a substitute for durable preference, commitment, or approval
  memory; that requires a separate operational-memory system.
- Live cross-session behavior and model responses require credentials and a
  verified Eve runtime environment.

## Related pages

- [Karpathy LLM Wiki gist](../sources/karpathy-llm-wiki-gist.md)
- [OKF adoption profile](okf-adoption-profile.md)
