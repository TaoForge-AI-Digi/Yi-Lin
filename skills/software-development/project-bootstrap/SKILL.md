---
name: project-bootstrap
tags: [项目管理, 规划]
description: >
  Initialize engineering projects before implementation by reading project agent instructions,
  creating or updating PRD, tech stack, project plan, architecture, and progress docs.
  Use when starting a new demo, PoC, feature project, agent-driven coding task, or when
  the user asks to preserve a repeatable project initialization workflow.
---

# Project Bootstrap

Use this skill before formal development starts. The goal is to convert an ambiguous project request into a documented execution harness: requirements, technical direction, clear steps, file ownership, progress tracking, and agent workflow.

## Startup Workflow

1. **Inspect the workspace first.**
   - List root files and `docs/`.
   - Check for `AGENTS.md`, `agent.md`, or similar project agent instruction files.
   - If no agent instruction file exists, generate an initial `AGENTS.md` before the docs five-pack.
   - If an agent instruction file exists, read it; do not replace it unless the user explicitly confirms replacement.
   - If a Sprint Contract or immediate task contract exists, treat it as the current source of truth.

2. **Generate the docs in this strict order.**
   - First create or update `docs/PRD.md`.
   - Then create or update `docs/TECH_STACK.md` based on `PRD.md`.
   - Then create or update `docs/PROJECT_PLAN.md` based on `PRD.md` and `TECH_STACK.md`.
   - Last initialize `docs/ARCHITECTURE.md` and `docs/PROGRESS.md`.
   - Accept lowercase variants such as `docs/prd.md` when the project already uses them.

3. **Do not jump into implementation until the plan is concrete enough.**
   - Every project step must have a `目标` or objective.
   - Every project step must have measurable `Criteria`.
   - Every step should include verification commands or observable checks when possible.

4. **Initialize missing docs with the right depth.**
   - Use the templates in `references/document-five-pack.md`.
   - Keep docs concise enough to maintain, but specific enough that another agent can execute from them.
   - Keep initial `ARCHITECTURE.md` and `PROGRESS.md` lightweight; grow them during development.

5. **Establish the agent workflow.**
   - Read `references/agent-workflow.md`.
   - Main agent acts as orchestrator and final integrator.
   - When the user/project instructions explicitly request subagents and tools permit, use `delegate_task` with a generator subagent for implementation and an evaluator subagent for independent review.

6. **Start formal development only after updating `PROGRESS.md`.**
   - Mark documentation steps as `Done` only when created and checked.
   - Leave unverified runtime or hardware steps as `Not Started`.
   - Mark blocked external dependencies explicitly.

## Output Rules

- Prefer creating docs under `docs/` for durable project state.
- If the project already has root-level docs, either preserve the existing location or move only when the user asks.
- Keep initial `ARCHITECTURE.md` focused on the current skeleton only: known folders, known durable files, and maintenance rules. Add details later as implementation creates real structure.
- Keep initial `PROGRESS.md` factual and minimal: status legend, docs created, current blockers, and next actions. Expand it as `PROJECT_PLAN.md` steps are executed.
- Update `PROGRESS.md` whenever a step is completed, blocked, or invalidated.
- Update `ARCHITECTURE.md` whenever new project folders or durable files are added.

## Hermes-Specific Notes

- Use `read_file` / `write_file` / `patch` for doc operations.
- Use `delegate_task` for generator/evaluator subagent pattern when needed.
- Use `todo` to track active implementation steps during execution.
- Project workspace is typically under `/mnt/c/Hermes/workspace/` — verify the actual project root first.

## Reference Files

- Read `references/document-five-pack.md` when creating or refreshing project docs.
- Read `references/agent-workflow.md` when the user requests generator/evaluator subagents or agent orchestration.
