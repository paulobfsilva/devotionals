# Domain Docs

## Layout

This repository uses a single-context layout: `CONTEXT.md` at the repository root and architectural decision records in `docs/adr/`.

## Before exploring

Read root `CONTEXT.md` and the ADRs in `docs/adr/` relevant to the area of work.

If these files do not exist, proceed silently. Create domain documentation lazily through `/domain-modeling` when terms or decisions are resolved.

## Use the glossary vocabulary

When naming domain concepts in issues, proposals, hypotheses, or tests, use the terms defined in `CONTEXT.md`. If a needed concept is missing, reconsider whether it belongs to the project or note the gap for `/domain-modeling`.

## Flag ADR conflicts

If a proposal contradicts an existing ADR, identify the ADR and explain why the decision should be reconsidered rather than silently overriding it.
