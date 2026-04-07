# Fitness App

Application web mobile-first de suivi d'entraînement, organisée par jour de séance (PUSH / PULL / CALI / CARDIO).

## Stack

- React 19 + TypeScript + Vite
- SCSS (un fichier par composant)
- Supabase (authentification Google OAuth + persistance des données)

## Fonctionnalités

- 4 jours d'entraînement : Jour 1 PUSH, Jour 2 PULL, Jour 3 CALI, Jour 4 CARDIO
- Fiches exercices détaillées : groupes musculaires, séries/reps/repos, images, conseils
- Suivi du poids par exercice (synchronisé avec Supabase, cache localStorage)
- Progression de séance en temps réel (barre de progression + exercices cochés)
- Historique des séances sous forme de calendrier
- Thème clair / sombre (persisté en localStorage)
- Accès invité sans compte (sans synchronisation)

## Commandes

```bash
npm run dev        # Serveur de développement avec hot reload
npm run build      # Vérification TypeScript + build de production
npm run lint       # ESLint
npm run preview    # Prévisualisation du build de production
```

## Structure

```
src/
├── components/     # Composants React (ExerciseCard, SidePanel, WeightInput, …)
├── data/           # Contenu des séances (days.ts)
├── hooks/          # Hooks Supabase (useExerciseWeight, useWorkoutLog, useSupabase)
├── lib/            # Client Supabase
├── types/          # Types TypeScript
└── constants/      # Couleurs et constantes
```

## Base de données Supabase

- `exercise_weights` — `user_id`, `ex_key`, `weight_kg`
- `workout_logs` — `user_id`, `session_date`, `day_type`
