# Eve LLM Wiki OKF Agent Framework

A filesystem-first Vercel Eve agent that combines:

- Eve for the durable agent runtime and HTTP conversation surface;
- the LLM Wiki pattern for incrementally maintained, source-grounded knowledge;
- Open Knowledge Format (OKF) v0.2 for portable concepts, provenance, trust,
  lifecycle, indexing, and logs.

The running Eve agent can search and read the Wiki through three bounded tools:
`wiki_search`, `wiki_read`, and `wiki_sources`. Runtime `bash` and `write_file`
are disabled so the agent cannot silently rewrite its authored knowledge.

## Architecture

| Layer | Location | Responsibility |
|---|---|---|
| Agent policy | `agent/instructions.md` | Source-grounded behavior and trust boundaries |
| Immutable references | `agent/sandbox/workspace/raw/` | Source provenance outside the portable bundle |
| OKF knowledge bundle | `agent/sandbox/workspace/wiki/` | Maintained concepts, sources, index, and log |
| Eve tools | `agent/tools/` | Read-only search, page reading, and source extraction |
| Evals | `evals/wiki/` | Retrieval and runtime immutability checks |
| Conformance | `scripts/validate-okf.mjs` | Deterministic OKF v0.2 structural validation |

## Requirements

- Node.js 24
- pnpm
- An AI Gateway credential for live model calls: `AI_GATEWAY_API_KEY`, or a
  linked Vercel project providing `VERCEL_OIDC_TOKEN`

The default model is `zai/glm-5.2`. Change it in `agent/agent.ts` when needed.

## Install and validate

```powershell
pnpm install
pnpm okf:validate
pnpm typecheck
pnpm build
```

## Run locally

```powershell
pnpm dev
```

Eve requires Node 24 or newer. For reliable live execution on Windows, prefer
WSL/Linux and keep the project in the Linux filesystem. Static typechecking,
OKF validation, and builds can run from Windows.

## Knowledge maintenance

1. Add an immutable source or source reference under `raw/`.
2. Read `wiki/index.md`, `wiki/source-manifest.md`, and recent `wiki/log.md`.
3. Add or update only materially affected OKF concepts.
4. Preserve structured `sources` provenance and expose uncertainty or conflicts.
5. Update the index, source manifest, and newest-first log.
6. Run `pnpm okf:validate`, then rebuild or start a new Eve session.

Do not add `verified` metadata unless a real machine or named human check has
occurred. The Wiki is not a substitute for durable preference, commitment, or
approval memory.

## Sources and attribution

- [Vercel Eve](https://github.com/vercel/eve)
- [Karpathy's LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- [Open Knowledge Format v0.2](https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md), licensed under Apache License 2.0

Implementation decisions and pinned source references are recorded under
`docs/` and `agent/sandbox/workspace/raw/`.

## Current boundaries

- No PostgreSQL operational-memory extension is installed.
- Attested Computation executors and attesters are not configured.
- Live model behavior and cross-session guarantees require credentials and
  runtime verification; compilation alone does not establish them.
