# 2026-10-06 — Workflow et CLAUDE.md

## Réalisé

- CLAUDE.md complété via /wnr-init-claude : continuité de session, archivage, méthode, maquettes, workflow git (branches depuis `dev`, PR vers `dev`, `main` = production), stack réelle
- Vitest installé, script `npm test` (`vitest run --passWithNoTests`)
- `.claude/sessions/` suivi par git (le reste de `.claude/` reste ignoré)
- PR #1 fusionnée dans `dev`, branche supprimée
- Lint au vert : helpers Supabase sortis de `useExerciseWeight` (+ annulation de l'effet au changement d'exercice)
- `npm audit` à 0 : `npm audit fix` + `sharp` passé en 0.35.5 (seul usage : `scripts/optimize-images.mjs`)

## Reste à faire

- Fusionner la PR `fix/lint-errors` → `dev`

## Blockers

Aucun.

## Décisions

- Stack de référence Next.js/Prisma/Tailwind écartée : on documente Vite + React + SCSS + Supabase tels quels
- RLS non activé, sécurité applicative ; Vitest seul, pas de Playwright
