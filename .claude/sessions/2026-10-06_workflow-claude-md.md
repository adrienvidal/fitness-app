# 2026-10-06 — Workflow et CLAUDE.md

## Réalisé

- CLAUDE.md complété via /wnr-init-claude : continuité de session, archivage, méthode, maquettes, workflow git (branches depuis `dev`, PR vers `dev`, `main` = production), stack réelle
- Vitest installé, script `npm test` (`vitest run --passWithNoTests`)
- `.claude/sessions/` suivi par git (le reste de `.claude/` reste ignoré)
- PR #1 fusionnée dans `dev`, branche supprimée
- Lint au vert : helpers Supabase sortis de `useExerciseWeight` (+ annulation de l'effet au changement d'exercice)
- `npm audit` à 0 : `npm audit fix` + `sharp` passé en 0.35.5 (seul usage : `scripts/optimize-images.mjs`)
- PR #2 fusionnée dans `dev`, branche supprimée
- PR #3 : `dev` fusionnée dans `main` (production, `e64a329`)

## Reste à faire

- Vérifier à la main le chargement / l'enregistrement d'un poids d'exercice en étant connecté (non testé, demande une connexion Google)

## Blockers

Aucun.

## Décisions

- `npm test` utilise `--passWithNoTests` tant qu'aucun test n'existe
- Notes de session commitées via branche + PR vers `dev`, jamais directement sur `dev`
- Stack de référence Next.js/Prisma/Tailwind écartée : on documente Vite + React + SCSS + Supabase tels quels
- RLS non activé, sécurité applicative ; Vitest seul, pas de Playwright
