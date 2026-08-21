# Open Knowledge Format adoption note

Access date: 2026-08-22

## Source selection

The user supplied the frozen copy at
`GoogleCloudPlatform/knowledge-catalog/okf/SPEC.md`. That directory's README
directs implementers to stop using the snapshot and use the canonical
`GoogleCloudPlatform/open-knowledge-format` repository. This project therefore
targets canonical OKF v0.2 at commit
`0b87c52c6ef999286c745e19998fdfcd03d5dbee`.

The canonical repository reports Apache License 2.0. Attribution and immutable
source permalinks are retained in the raw source reference and Wiki summary.

## Adopted

- OKF v0.2 bundle declaration and reserved-file rules
- Required concept `type`, recommended titles/descriptions, and open extensions
- Structured provenance with stable source IDs and keyed claim footnotes
- Separate production, verification, trust-tier, lifecycle, and freshness data
- Progressive index, newest-first chronological log, links, and best-effort consumption
- Project validator and Eve provenance-tool support for structured sources

## Deferred

- Attested Computation executors and attesters until a real sanctioned
  computation exists
- Human `verified` events until named human review occurs
- Optional graph visualization and external serving infrastructure
