# Eve folder-structure scaffold

This repository is a static reference for organizing files under `agent/`. It
is not a runnable Eve application and does not require a local Eve runtime.

## Structure-only boundary

- Do not install Node.js, pnpm, Eve, WSL, Docker, PostgreSQL, or deployment
  tooling for structure-only work.
- Do not request AI provider, AI Gateway, Vercel, database, or other runtime
  credentials.
- Do not run build, development, deployment, package-installation, or live-model
  commands.
- Preserve the repository as a filesystem scaffold unless the user explicitly
  asks to create a separate runnable implementation.

For content-only changes to identity, purpose, tone, or response guidance, edit
`agent/instructions.md`. Use the guidance files under optional folders to decide
where future behavior would belong; do not invent executable behavior merely to
populate a directory.

If a user later explicitly requests a runnable Eve agent, first consult the
current Eve documentation and treat runtime creation, dependencies, credentials,
validation, and deployment as a separate scoped task.

## LLM Wiki maintenance

Codex maintains authored sources under `agent/sandbox/workspace/raw/` and Wiki
pages under `agent/sandbox/workspace/wiki/`. Preserve source bytes and update the
manifest, index, materially affected pages, related links, and newest-first log
on every ingest. Mark uncertainty or contradictions explicitly.

The `wiki/` directory is an OKF v0.2 bundle. Every concept document other than
reserved `index.md` and `log.md` requires parseable YAML frontmatter with a
non-empty `type`. Use structured `sources` entries with a `resource`, stable IDs
for claim footnotes, `generated` for authorship, optional `verified` only after a
real check, and lifecycle values `draft`, `stable`, or `deprecated`. Keep root
`index.md` frontmatter limited to `okf_version`, keep `log.md` free of
frontmatter, and preserve unknown extension fields.

This scaffold intentionally has no executable validator. Review these structural
rules directly unless the adopting project supplies its own validation method.
