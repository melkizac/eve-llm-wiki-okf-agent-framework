# LLM Wiki adoption note

Access date: 2026-08-22

## Source reviewed

- Andrej Karpathy, “LLM Wiki”: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- Vercel Eve repository and public documentation available at the access date

## Adopted

- Immutable source layer separated from maintained Wiki synthesis
- Source summary, concept/entity pages, a content index, and preserved log history
  with new entries added under newest-first OKF date groups
- Index-first query flow and explicit provenance
- Contradiction, uncertainty, staleness, and orphan-page linting
- Eve-compatible filesystem locations for future read-only search, page-reading,
  and source-listing tools

## Deferred or rejected

- No verbatim Gist copy because no explicit license was visible
- No vector database, embedding pipeline, Obsidian dependency, or optional CLI
- No PostgreSQL operational memory; it is a separate concern and was not part of
  this adoption request
- No runtime is included; authored maintenance is performed directly in files

## Verification boundary

This repository demonstrates static structure only. It does not compile, run a
model, create sessions, validate runtime behavior, or establish production
authorization.
