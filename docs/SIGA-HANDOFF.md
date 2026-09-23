CAVEMAN HANDOFF v1

APP:
GUTT ROYALE

WORKSTREAM:
Repository migration / landing-page baseline + repository-local SIGA continuation protocol

STATE:
Active pull request exists. SIGA protocol has been added to the existing workstream. No separate SIGA branch or PR was created.

MODE:
RESUME

CANONICAL SOURCE:
GitHub repository `az1nn/gutt-royale`; real repository state overrides this handoff, memory and chat.

CURRENT VERSION / HEAD:
`505584652d32857cb245655799f1daf7d8b38916` was the verified branch HEAD immediately before this handoff commit. Re-resolve `feat/site-migration-v1` HEAD before any action.

BASE:
`master` at verified base `827aa4722de77b79c122353f5a76421dfa1f5904`.

BRANCH / ENV:
`feat/site-migration-v1`

PR / MR / TASK:
PR #1 — `feat: migrate and improve Gutt Royale landing page`
State at last verification: OPEN, non-draft, mergeable.

SPEC / ADR:
No repository spec or ADR was identified for this workstream.
SIGA contract: `.agents/skills/siga/SKILL.md`.

DONE:
- Reconciled repository identity, default branch, active branches and PRs.
- Verified only `master` and `feat/site-migration-v1` were visible.
- Verified PR #1 is the active workstream.
- Verified no existing `.agents/skills/siga/SKILL.md` or `docs/SIGA-HANDOFF.md` existed before this change.
- Added repository-local SIGA protocol without opening parallel work.

VERIFY:
- PR #1 was mergeable at last inspection.
- No combined status checks were reported for the pre-SIGA PR HEAD.
- No pull-request workflow runs were reported for the pre-SIGA PR HEAD.
- Repository-local SIGA skill creation returned commit `505584652d32857cb245655799f1daf7d8b38916`.

GATES:
- Do not merge or deploy automatically unless the current user instruction and repository state explicitly authorize it.
- Re-check any visual/product approval gate before publishing changes.

BLOCKERS:
- No CI exists on the verified PR HEAD, so CI cannot be used as proof.
- Repository state must be rechecked because the handoff itself changes branch HEAD.

INVARIANTS:
- REAL STATE > HANDOFF > MEMORY > CHAT.
- VERIFY-FIRST on every `Siga`.
- Do not create duplicate branch/PR/workstream while PR #1 remains the applicable active unit.
- Do not declare success without available evidence.
- Do not mask failures.
- Persist future SIGA state only in this repository for this app.

NEXT:
On the next `Siga`, re-resolve repository HEAD, PR #1, checks/workflows, review state and current files. Then classify exactly RESUME, WATCH or ADVANCE from the real state. If PR #1 remains the active incomplete workstream, continue it rather than starting a new PR.

VERIFY-FIRST:
1. Confirm repository is `az1nn/gutt-royale`.
2. Resolve default branch and exact `master` HEAD.
3. Resolve exact `feat/site-migration-v1` HEAD.
4. Inspect PR #1 state, mergeability, reviews/comments and changed files.
5. Inspect status checks and workflow runs for current PR HEAD.
6. Read `.agents/skills/siga/SKILL.md` and this handoff.
7. Inspect current site files before any mutation.
8. Classify RESUME / WATCH / ADVANCE.
9. Execute only from the verified boundary, validate, then update this single handoff.
