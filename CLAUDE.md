# CLAUDE.md — Fitness App

Outil de référence personnel pour suivre un programme d'entraînement (PUSH / PULL / LEGS / FULL BODY / CARDIO).

## Session Continuity

En début de session :

- Lire le fichier de la dernière session dans `.claude/sessions/`
- Identifier où on s'est arrêté et les blockers en cours
- Résumer en 3 lignes avant de commencer

En fin de session :

- Sauvegarder un résumé dans `.claude/sessions/[date]_[sujet].md`
- Inclure : Réalisé, Reste à faire, Blockers, Décisions
- Si un fichier existe déjà pour aujourd'hui, le compléter plutôt que le remplacer

Format du nom de fichier : `YYYY-MM-DD_sujet-en-kebab-case.md`
Exemple : `2026-03-10_audit-cabinet-merlin.md`

Règles :

- Toujours lire AVANT d'agir – ne pas redemander ce qui est déjà documenté
- Les blockers non résolus de la session précédente deviennent la priorité
- Quand un blocker est levé, le noter explicitement dans "Réalisé"

Ajoute une instruction dans MEMORY.md pour que tu pense à chercher le fichier claude/sessions du jour automatiquement en début de session.

### Archivage des sessions

Le dossier `.claude/sessions/` ne garde visibles à la racine que les sessions utiles à la reprise. Les autres vont dans `.claude/sessions/archive/`.

- **Garder actives** : les 3 sessions les plus récentes, plus toute session rattachée à un dossier ou un deal encore ouvert.
- **Archiver, ne pas supprimer** : déplacer via `git mv` vers `archive/` (réversible, tracé dans git). Une session est archivable quand elle est close et que son contenu vit déjà ailleurs (code, règles, fiche client, playbook, CRM, git).
- **Filet anti-oubli, impératif** : avant d'archiver une session, reporter chacun de ses « Reste à faire » encore ouverts dans `.claude/sessions/reste-a-faire.md` (le backlog vivant, jamais archivé). Ne jamais archiver une session tant qu'un item ouvert n'a pas été soit fait, soit reporté dans ce backlog. Cocher puis retirer un item du backlog quand il est fait.
- **Quand** : en fin de session, après avoir sauvegardé le résumé du jour, vérifier si d'anciennes sessions sont devenues archivables et les déplacer.
- **Ne jamais toucher** au « Reste à faire » de la session active la plus récente : c'est la liste de priorités vivante.
- **Hygiène de fond** au passage : corriger une contradiction à sa source (pas seulement dans le dernier fichier), refermer un « Reste à faire » qu'une session ultérieure a accompli, signaler une info devenue fausse (par exemple un agent supprimé depuis).
- **Toute suppression ou déplacement se confirme avec Adrien** avant d'agir (cf. règle d'autonomie de l'orchestrateur).

Rappel : les fichiers de session sont un journal de passation, pas la mémoire vivante.

## Méthode de développement

Tout travail de construction — dérouler une tâche du plan, ajouter une commande,
reprendre le fil en début de session — passe par le skill `lean-development` dès
qu'il s'applique. Il fixe la façon d'avancer sans brûler le contexte : lectures
ciblées plutôt que fichiers entiers, sous-agents seulement quand ils paient,
passes de revue non multipliées. L'invoquer au début du travail, pas une fois le
contexte déjà saturé.

## Maquettes

Tout écran se maquette avant d'être développé. Une maquette se jette, un écran
déjà codé se défend.

1. **Lister les écrans et le parcours** avant de dessiner : le nom de chaque
   écran, sa route, ce qu'il permet de finir, et vers quel écran il mène. Faire
   valider cette liste. Dessiner quinze écrans dont cinq n'étaient pas voulus
   est le seul vrai gaspillage de l'étape.
2. **Dessiner tous les écrans** dans un fichier HTML unique publié en Artifact,
   un écran par section, empilés, chacun annoncé par sa route et par ce à quoi
   il sert. Le parcours entier se lit d'une traite, c'est ce qui fait voir
   l'étape manquante.
3. **Rendre le parcours cliquable par des ancres** : chaque bouton porte
   l'ancre de l'écran où il mène (`<a href="#offre-detail">Garder</a>`), et un
   menu d'ancres en tête de page permet de sauter n'importe où. Un bouton mort
   ne dit rien, un bouton qui emmène quelque part fait apparaître les impasses.
4. **Faire valider avant de coder.** Aucune ligne de code applicatif tant que
   les maquettes ne sont pas validées : c'est le dernier moment où changer
   d'avis est gratuit.

Ce qu'une maquette doit montrer :

- **Les états, pas seulement le chemin heureux** : liste vide au premier
  lancement, chargement, erreur, et le cas limite qui fait mal dans ce métier
  (quota atteint, paiement refusé, droit manquant).
- **Des données plausibles** tirées du domaine réel, jamais « Lorem ipsum » ni
  « Client 1, Client 2 ». Le faux texte cache les débordements et les colonnes
  trop étroites, qui sont précisément ce qu'une maquette sert à voir.
- **Le mobile et le desktop**, par media queries dans le même écran. Pas de
  maquette mobile séparée à tenir en double.

Le design reste simple et épuré, et accordé à la niche du projet : un outil de
comptabilité, une librairie et un tableau de bord industriel n'ont ni la même
densité, ni la même typographie, ni la même palette. Regarder ce que fait le
métier avant de choisir, plutôt que reposer le même gris et le même bleu sur
chaque projet.

Les choix pris là (palette, typographie, échelle d'espacement, rayons) sont les
tokens du projet. Les déclarer en variables CSS dans la maquette, puis les
reporter dans les variables SCSS et `src/constants/colors.ts` au moment du développement. Sans ça le design se
refait une seconde fois, en moins bien, au milieu du code.

Une fois un écran développé, le code fait foi et la maquette ment. Garder les
maquettes figées en référence, leur lien Artifact noté dans le fichier de
session, et ne pas chercher à les tenir à jour.

## Workflow git

Un **lot** est un groupe de tâches qui livre quelque chose de vérifiable seul.
On ne travaille jamais directement sur `main` ni sur `dev`. `main` reçoit la
production et ne se touche que par une PR depuis `dev`.

1. Brancher depuis `dev` à jour.
2. Un commit par tâche. Écrire le test d'abord là où un bug coûte cher et où la
   logique est subtile ; ailleurs, un test ciblé après coup suffit.
3. `npm test` au vert sur toute la suite avant d'ouvrir la PR.
4. `gh pr create --base dev`. Ne jamais fusionner sans accord explicite.

### Messages de commit

En anglais, à l'impératif, sans point final. Préfixe `feat:`, `fix:`, `test:`,
`docs:` ou `refactor:`.

## Stack

- npm comme gestionnaire de paquets
- Vite + React 19 + TypeScript, SPA sans routing
- SCSS par composant pour la structure, couleurs dynamiques en `style` inline depuis `src/constants/colors.ts`
- Supabase (Postgres managé + Auth), RLS non activé : la sécurité est applicative, toute requête filtre sur l'utilisateur courant
- Authentification Google OAuth via Supabase Auth, plus un mode invité sans écriture
- Un compte égale un espace : pas de notion d'organisation ni d'invitation, ne pas en prévoir
- Vitest pour les tests, fichiers `*.test.ts(x)` à côté du code testé
- Context7 obligatoire (resolve-library-id → query-docs) avant de coder avec une lib de la stack

## Commands

```bash
npm run dev        # Start Vite dev server (hot reload)
npm run build      # Type-check (tsc -b) then build for production
npm run lint       # Run ESLint
npm run preview    # Preview production build locally
npm test           # Run Vitest once (passes with no test files)
```

## Architecture

**React 19 + TypeScript + Vite SPA** — workout reference tool. Single screen in `App.tsx`. No routing.

### Data model

All workout content in [src/data/days.ts](src/data/days.ts), types in [src/types/index.types.ts](src/types/index.types.ts).

- 5 days: PUSH / PULL / LEGS / FULL BODY / CARDIO
- `Day`: `id`, `label`, `type`, `color`, `accent`, `emoji`, `exercises[]`
- `Exercise`: muscle groups, sets/reps/rest, images, description, tips, optional `warmupSeries`, `hasWeight`, `assistedWeight`, `defaultWeight`

### State

All state in [src/App.tsx](src/App.tsx) as `useState`. No Context/Redux/Zustand.

Key state: `activeDay`, `activeExercise`, `completedExercises` (Set), `isPanelOpen`, `isGuest`, `showConfirmModal`, `showToast`, `showRestTimer`, `pendingLogDate`, `theme`, `workoutLog`.

localStorage keys: `"theme"`, `"workoutLog"`, `weight:d{day}-{exerciseName}`.

### Supabase

Client in [src/lib/supabase.ts](src/lib/supabase.ts). Tables:
- `exercise_weights` — `user_id`, `ex_key`, `weight_kg`
- `workout_logs` — `user_id`, `session_date`, `day_type`

Hooks in [src/hooks/](src/hooks/):
- `useSupabase` — Google OAuth session; returns `{ userId, isReady, signIn, signOut }`
- `useExerciseWeight(exKey, userId)` — Supabase + localStorage cache; returns `{ weight, saveWeight }`
- `useWorkoutLog(userId)` — Supabase + localStorage cache; returns `{ workoutLog, saveSession }`

### Auth

[LoginScreen](src/components/LoginScreen/LoginScreen.tsx) shown when `isReady && !userId && !isGuest`. Two options: Google OAuth (Supabase sync enabled) or guest access (no writes, no sign-out).

### Styling

- SCSS per component for layout/structure
- Dynamic colors via inline `style` props from [src/constants/colors.ts](src/constants/colors.ts)
- Dark-themed, mobile-first (max-width 600px)

### Key components

| Component | File | Purpose |
|---|---|---|
| SidePanel | [src/components/SidePanel/](src/components/SidePanel/) | Right drawer with theme toggle, calendar, sign-out |
| WorkoutCalendar | [src/components/WorkoutCalendar/](src/components/WorkoutCalendar/) | Past session history; clickable for non-guests |
| LogSessionModal | [src/components/LogSessionModal/](src/components/LogSessionModal/) | Bottom sheet to log/edit a session for a past date |
| RestTimerModal | [src/components/RestTimerModal/](src/components/RestTimerModal/) | Rest timer with SVG arc, vibration + beep on end |
| SessionProgress | [src/components/SessionProgress/](src/components/SessionProgress/) | Progress bar above exercise list |
