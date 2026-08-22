---
type: Reference
title: Open Knowledge Format v0.2
description: Canonical specification for portable Markdown knowledge bundles with structured provenance, trust, lifecycle, and attestation.
resource: https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/0b87c52c6ef999286c745e19998fdfcd03d5dbee/SPEC.md
status: stable
tags: [okf, specification, provenance, lifecycle, trust]
generated: { by: codex/gpt-5, at: 2026-08-21T21:21:16Z }
sources:
  - id: okf-spec
    resource: ../../raw/open-knowledge-format-v0-2-reference.md
    title: Open Knowledge Format v0.2 source reference
    author: team:google-cloud-platform
    last_modified: 2026-08-21T19:31:43Z
---

# Open Knowledge Format v0.2

## Summary

OKF defines a portable knowledge bundle as a directory of UTF-8 Markdown
documents. Every concept document has YAML frontmatter and a non-empty `type`;
the reserved `index.md` and `log.md` files support progressive disclosure and
chronological maintenance history.[^okf-spec]

## Trustable knowledge metadata

- `sources` records structured provenance and objective credibility signals.
- `generated` identifies the producer and meaningful content-change time.
- `verified` records actual machine or human checks; consumers derive trust tiers.
- `status` distinguishes draft, stable, and deprecated concepts.
- `stale_after` makes freshness a deterministic timestamp comparison.
- Attested Computation concepts can describe sanctioned computation, executor,
  receipt, and deterministic attester interfaces without prescribing a runtime.

## Consumer behavior

Consumers tolerate unknown concept types, extension fields, broken links, and
missing optional metadata. They should preserve unknown fields, surface failed
attestation or stale content, and attempt best-effort reading of unfamiliar OKF
versions rather than rejecting an entire bundle.

## Project relevance

OKF supplies the interoperable metadata contract for this project's LLM Wiki.
The Eve folder conventions provide an optional home for that Wiki, while
Karpathy's LLM Wiki pattern supplies the incremental maintenance idea. This
scaffold does not include an Eve runtime, and OKF does not prescribe Eve or a
query infrastructure.

[^okf-spec]: Canonical Open Knowledge Format v0.2 specification at the adopted commit
