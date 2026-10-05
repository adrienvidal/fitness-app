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

## Réalisé (suite) : suppression Nutrition et refonte mobile

- Onglet Nutrition et `WorkoutOMAD` supprimés (PR #5)
- Maquettes de la refonte mobile validées : https://claude.ai/artifact/PETjD3drA7pFjMXisZdy2o (figées, le code fait foi désormais)
- Refonte livrée en 4 lots, tous fusionnés dans `dev` :
  - PR #6 : tokens (neutres « tapis de sol », texte craie), polices Big Shoulders Display + Figtree, en-tête, onglets de jour, progression segmentée, bouton Terminer collé en bas, bandeau invité
  - PR #7 : fiche exercice (ligne compacte, exercice suivant encadré, rond de validation), charge en pas de 2,5 kg, bouton repos préréglé, invité en lecture seule
  - PR #8 : minuteur plein écran (+15 s, écran de fin couleur du jour), feuille « Terminer la séance » avec bilan, toast daté
  - PR #9 : panneau, calendrier coloré, états vides, saisie de séance passée avec « Retirer », écran de connexion, écran de chargement
- **Blocker levé** : enregistrement d'un poids connecté vérifié (Playwright, compte réel). Bug trouvé et corrigé au passage : un poids envoyé hors réseau était perdu, écrasé au rechargement par l'ancienne valeur du compte (PR #7)
- Premiers tests Vitest : `src/utils/weight.test.ts` (10 tests)

## Reste à faire

- Mettre en production : PR `dev` → `main` (suppression Nutrition + refonte), en attente de l'accord d'Adrien
- Vérifier en salle sur iPhone que le bip de fin de repos sonne encore (AudioContext désormais créé à l'ouverture du minuteur depuis une fiche)
- Optionnel : ajouter `http://localhost:5199` aux Redirect URLs Supabase pour se connecter en local (aujourd'hui Google renvoie sur la prod)

## Blockers

Aucun.

## Décisions

- `npm test` utilise `--passWithNoTests` tant qu'aucun test n'existe
- Notes de session commitées via branche + PR vers `dev`, jamais directement sur `dev`
- Stack de référence Next.js/Prisma/Tailwind écartée : on documente Vite + React + SCSS + Supabase tels quels
- RLS non activé, sécurité applicative ; Vitest seul, pas de Playwright
- App mobile uniquement : pas de desktop, ni en maquette ni en code
- Accent CARDIO éclairci en `#9b3df0` (lisibilité sur fond sombre) ; texte sur accent dans `onAccent` (`colors.ts`)
- Poids : une valeur non synchronisée (`weight_pending:<exKey>`) l'emporte sur celle du compte au chargement et y est renvoyée
- Couleurs de jour tirées de `days.ts` partout (plus de copies en dur)
