# Eve LLM Wiki OKF Agent Framework

A filesystem-first Vercel Eve agent that combines:

- Eve for the durable agent runtime and HTTP conversation surface;
- the LLM Wiki pattern for incrementally maintained, source-grounded knowledge;
- Open Knowledge Format (OKF) v0.2 for portable concepts, provenance, trust,
  lifecycle, indexing, and logs.

The running Eve agent can search and read the Wiki through three bounded tools:
`wiki_search`, `wiki_read`, and `wiki_sources`. Runtime `bash` and `write_file`
are disabled so the agent cannot silently rewrite its authored knowledge.

## Why use this instead of a plain Codex project?

A plain Codex project is a good fit for coding, analysis, and document work when
the repository and the current task provide enough context. This framework is
for work where knowledge must accumulate across many sources and remain useful
outside one Codex task.

| Concern | Plain Codex project | This framework |
|---|---|---|
| Working context | Codex reads project files and uses the active task history, which may later be compacted or replaced by a new task | Important knowledge is maintained as explicit Wiki files rather than depending on chat history |
| Knowledge maintenance | Project documentation is updated when someone remembers to update it | The ingest contract requires source, concept, index, manifest, and log updates together |
| Provenance | Citations and review status depend on project-specific conventions | OKF records structured sources, production, verification, lifecycle, and freshness metadata |
| Retrieval | Codex searches and opens repository files as needed | The Eve agent receives bounded `wiki_search`, `wiki_read`, and `wiki_sources` tools |
| Portability | Documentation structure may make sense only inside one repository | The Wiki is an OKF v0.2 Markdown bundle that other compatible consumers can inspect |
| Runtime boundary | Codex can edit the workspace when the user authorizes changes | The running Eve agent can read the Wiki but cannot rewrite its knowledge or raw sources |
| Validation | Checks depend on what each project happens to provide | The repository includes OKF conformance validation, Eve discovery, evals, typechecking, and builds |
| Long-running use | Best suited to interactive work inside Codex tasks | Designed to become an independently running agent with durable Eve sessions and an HTTP surface |

The practical advantage is traceability. When the agent answers from the Wiki,
the project can show which concept it read, which source supports that concept,
who or what generated it, whether anyone verified it, and whether it is draft,
stable, deprecated, or stale. A normal Codex project can adopt similar rules,
but they are built into this repository's file contract and validation commands.

Codex still has an important role. Codex builds the agent, ingests sources,
maintains the authored Wiki, runs validation, and reviews changes. Eve is the
separate runtime that serves the agent once it is configured and running. This
repository does not make Codex itself persistent, and it does not currently
include a Codex-to-Eve session bridge.

### When a plain Codex project is the better choice

Use a normal Codex project when the work is short-lived, the repository is
already the source of truth, or you do not need a separately running agent.
That route has fewer dependencies and no Wiki-maintenance overhead. This
framework adds Node 24, Eve, structured knowledge maintenance, rebuilds, and
runtime credentials, so its benefits matter most for recurring, source-heavy
work where provenance and continuity justify that cost.

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
