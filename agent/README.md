# Agent folder map

This directory demonstrates the authored filesystem structure of an Eve agent
without installing or running Eve.

- `instructions.md` holds standing identity, purpose, boundaries, and response
  guidance.
- `channels/` is the optional location for transport integrations.
- `tools/` is the optional location for typed actions.
- `sandbox/workspace/raw/` stores immutable source material and references.
- `sandbox/workspace/wiki/` stores the maintained OKF knowledge bundle.
- `sandbox/workspace/templates/` stores authoring templates outside the bundle.

See the [student adoption guide](../docs/student-adoption-guide.md) for sequence,
existing-project mappings, and checks. These locations alone provide no runtime
mounts or retrieval tools.

Add other optional Eve folders only when the adopting project needs real
behavior. A future runnable implementation may add model configuration and
executable files, but they are intentionally absent from this scaffold.
