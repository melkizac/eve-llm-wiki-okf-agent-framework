# LLM Wiki adoption note

Access date: 2026-08-22

## Source reviewed

- Andrej Karpathy, “LLM Wiki”: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- Eve 0.42.0 bundled documentation: `node_modules/eve/docs/README.md` and `getting-started.mdx`

## Adopted

- Immutable source layer separated from maintained Wiki synthesis
- Source summary, concept/entity pages, a content index, and an append-only log
- Index-first query flow and explicit provenance
- Contradiction, uncertainty, staleness, and orphan-page linting
- Eve-native read-only runtime tools for search, page reading, and source listing

## Deferred or rejected

- No verbatim Gist copy because no explicit license was visible
- No vector database, embedding pipeline, Obsidian dependency, or optional CLI
- No PostgreSQL operational memory; it is a separate concern and was not part of
  this adoption request
- No runtime Wiki writes; authored maintenance remains outside the Eve session

## Verification boundary

Static structure, compilation, and generated validators can establish discovery
and read-only configuration. They do not establish live model behavior,
cross-session memory, or production authorization.
