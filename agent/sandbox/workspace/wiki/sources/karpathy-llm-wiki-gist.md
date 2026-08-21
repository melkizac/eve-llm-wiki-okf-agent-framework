---
type: Reference
title: Karpathy LLM Wiki gist
description: Originating pattern for an incrementally maintained Markdown knowledge base.
status: stable
tags: [llm-wiki, knowledge-base, provenance]
generated: { by: codex/gpt-5, at: 2026-08-21T21:21:16Z }
sources:
  - id: karpathy-gist
    resource: ../../raw/karpathy-llm-wiki-gist-reference.md
    title: Karpathy LLM Wiki gist source reference
    author: human:karpathy
---

# Karpathy LLM Wiki gist

## Summary

The source proposes a persistent Markdown Wiki maintained incrementally by an
LLM. Instead of reconstructing every synthesis from raw-document retrieval for
each question, the agent integrates new evidence into linked pages that become
richer over time.[^karpathy-gist]

## Core architecture

The pattern separates three concerns:

1. Raw sources remain immutable and authoritative.
2. The Wiki contains maintained summaries, concepts, entities, comparisons,
   contradictions, and derived synthesis.
3. An instruction schema governs ingest, querying, maintenance, and structure.

## Operating workflows

- Ingest one or more curated sources, summarize them, update materially affected
  pages, preserve provenance, and record the change.
- Query the index first, inspect relevant pages and their sources, and retain
  durable recurring synthesis when useful.
- Lint periodically for stale claims, contradictions, missing links, orphaned
  pages, unresolved questions, and evidence gaps.

The source distinguishes a content-oriented index from a chronological,
append-only activity log. It also treats search engines, Obsidian, graph views,
and presentation tooling as optional extensions rather than core requirements.

## Adoption in this project

This project adopts the architecture and workflow as an Eve-native,
filesystem-first implementation. At runtime, the agent can search and read the
Wiki through bounded tools. Authored sources and Wiki files remain read-only to
the running agent and are maintained outside the runtime session.

## Source

- [External Gist](../../raw/karpathy-llm-wiki-gist-reference.md)

[^karpathy-gist]: Karpathy LLM Wiki gist source reference
