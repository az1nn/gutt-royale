# SIGA — Portable Continuation Protocol

## Purpose

`SIGA` is an operational continuation trigger.

When the user says only `Siga`, do not interpret it as "do the next thing." Reconstruct the real current state first, classify the continuation mode, then continue from the safest verified boundary.

## Trust order

```
REAL STATE > HANDOFF > MEMORY > CHAT
```

The conversation is never the sole canonical source of state.

Every SIGA run starts in **VERIFY-FIRST** mode.

## Start protocol

### 1. RECONCILE

Reconstruct the current state from the best available persistent sources.

Inspect what applies to the environment, including:

- repository / app / workspace identity;
- default branch, active branch or environment;
- exact HEAD, deployed version or persisted revision;
- open tasks, issues, PRs/MRs, cards or jobs;
- active agents/workers and asynchronous runs;
- CI/CD, tests, builds and deploys;
- reviews, comments and human gates;
- blockers and pending decisions;
- specs, ADRs, roadmaps and handoffs;
- local versus remote state where observable.

Never assume the last chat state is still true.

### 2. CLASSIFY

Choose exactly one mode.

#### MODE A — RESUME

Use when existing work is started but not yet complete.

Examples: incomplete PR, started task, unresolved bug, unfinished spec, unfinalized local changes, validation not completed.

Action:

- continue from the last safe verified boundary;
- preserve the existing workstream;
- do not create a parallel branch, PR, task or session unnecessarily.

#### MODE B — WATCH

Use when the main work has already been dispatched and processing or validation is still active.

Examples: CI running, deploy in progress, agent working, review pending, async job executing, pipeline waiting on a gate.

Action:

- do not duplicate work;
- inspect current progress;
- consume completed results;
- fix actionable failures when possible;
- keep the current workstream canonical while execution is genuinely active.

Do not open a parallel branch, PR, task or session merely because a process has not finished.

#### MODE C — ADVANCE

Use only when the previous unit of work is verifiably complete and there is no active execution that must be watched.

Determine the next logical unit from:

- roadmap;
- spec;
- tasks/issues;
- handoff;
- dependencies;
- explicitly defined priorities.

Only in ADVANCE may a new branch, PR, task, spec or workstream be created.

### 3. EXECUTE

After classification:

```
implement -> verify -> classify -> persist
```

All mutations must be validated before being considered complete.

Use the strongest available evidence for the environment, such as:

- tests;
- lint;
- typecheck;
- build;
- CI;
- Engineering Graph;
- preview;
- screenshots;
- API checks;
- queries;
- logs;
- deploy health;
- human validation;
- contract validation.

Context compression must never reduce verification depth.

## Invariants

During SIGA:

- never mask a FAIL;
- never declare success without evidence;
- never duplicate work already running;
- never create a new workstream before reconciling the existing one;
- never trust chat state over current canonical state;
- never change behavior merely to satisfy a gate without fixing the underlying cause;
- never perform merge/deploy/destructive actions automatically when an explicit human gate exists;
- never delete context required to reconstruct decisions.

When sources conflict, current canonical state wins.

## Human gates

If a decision is explicitly reserved for the user, finish all other verifiable work and stop only at that decision boundary.

Present:

1. current state;
2. evidence;
3. decision required;
4. effect of each relevant alternative.

Typical human gates include visual approval, architectural choices, manual merge authorization, production changes, costs and destructive operations.

## Durable handoff

At a natural session boundary, persist exactly one compact handoff in the repository.

Default path for this repository:

`docs/SIGA-HANDOFF.md`

Format:

```
CAVEMAN HANDOFF v1

APP:
WORKSTREAM:
STATE:
MODE:
CANONICAL SOURCE:

CURRENT VERSION / HEAD:
BASE:
BRANCH / ENV:
PR / MR / TASK:
SPEC / ADR:

DONE:
VERIFY:
GATES:
BLOCKERS:

INVARIANTS:
NEXT:

VERIFY-FIRST:
<minimum instructions required to reconstruct real state next time>
```

The handoff records state and delta, not a full session transcript.

A future SIGA run must treat the handoff as a hypothesis and re-run VERIFY-FIRST against the real system.

## Portability

Git is optional. Map the same semantics to the system in use.

Examples:

- Canva: design -> comments -> approval -> export
- Trello: board -> card -> checklist -> blockers
- Notion: spec -> tasks -> decisions -> status
- SaaS: workspace -> jobs -> state machine -> logs
- Infra: environment -> deployment -> health -> incidents
- Agents: run -> child agents -> tool outputs -> pending actions

The invariant lifecycle is always:

```
RECONCILE -> CLASSIFY -> EXECUTE -> VERIFY -> HANDOFF
```

## Final rule

`SIGA` means:

> Discover where we really are and continue correctly from there.

It never means:

> Just execute some next thing.
