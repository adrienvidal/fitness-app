# 2026-10-06 — Workflow et CLAUDE.md

## Réalisé

- CLAUDE.md complété via /wnr-init-claude : continuité de session, archivage, méthode, maquettes, workflow git (branches depuis `dev`, PR vers `dev`, `main` = production), stack réelle
- Vitest installé, script `npm test` (`vitest run --passWithNoTests`)
- `.claude/sessions/` suivi par git (le reste de `.claude/` reste ignoré)

## Reste à faire

- Fusionner la PR `chore/workflow-tooling` → `dev`
- Voir `reste-a-faire.md` (lint, npm audit)

## Blockers

Aucun.

## Décisions

- Stack de référence Next.js/Prisma/Tailwind écartée : on documente Vite + React + SCSS + Supabase tels quels
- RLS non activé, sécurité applicative ; Vitest seul, pas de Playwright
