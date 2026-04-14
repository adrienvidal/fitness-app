# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server (hot reload)
npm run build      # Type-check (tsc -b) then build for production
npm run lint       # Run ESLint
npm run preview    # Preview production build locally
```

## Architecture

**Single-page React 19 + TypeScript + Vite app** — a workout reference tool organized by training day (PUSH / PULL / CALI / CARDIO), with no routing.

### Data model

All workout content lives in [src/data/days.ts](src/data/days.ts). The type hierarchy (defined in [src/types/index.types.ts](src/types/index.types.ts)):

```
Day → Exercise[]
```

- 4 days: Jour 1 PUSH (8 exercises), Jour 2 PULL (7 exercises), Jour 3 CALI (13 exercises), Jour 4 CARDIO (3 activities)
- Each `Day` has: `id`, `label`, `type` (`push | pull | cali | cardio`), `color`, `accent`, `emoji`, `exercises[]`
- Each exercise carries metadata: muscle groups, sets/reps/rest, images, description, tips, optional `warmupSeries` (e.g. "2×15" for warm-up sets before working sets), `hasWeight` flag, optional `assistedWeight` (boolean, for machine-assisted moves where weight means assistance), and optional `defaultWeight` (number, pre-filled value in WeightInput)

### State management

All UI state lives in [src/App.tsx](src/App.tsx) as plain `useState`:
- `activeDay` (0–3)
- `activeExercise` (null or index)
- `completedExercises` (`Set<string>`) — set of `exKey` strings for exercises marked done; reset on day change
- `isPanelOpen` (boolean) — controls the right side panel visibility
- `isGuest` (boolean) — true when user chose "Continuer sans compte"; bypasses auth gate, disables session saving and sign-out button
- `showConfirmModal` (boolean) — controls the session-finish confirmation modal
- `showToast` (boolean) — controls the "✓ Séance enregistrée !" toast (auto-hides after 3 s)
- `showRestTimer` (boolean) — controls the rest timer modal visibility
- `theme` (`"dark" | "light"`) — persisted in `localStorage` under key `"theme"`
- `workoutLog` (`Record<string, DayType>`) — maps ISO date strings (`"YYYY-MM-DD"`) to day type; persisted in `localStorage` under key `"workoutLog"`; updated by `confirmFinishSession` which records the current day's type for today's date

No Context, Redux, or Zustand. Persistence:
- [src/components/WeightInput](src/components/WeightInput/) reads/writes `localStorage` with keys formatted as `weight:d{day}-{exerciseName}`
- `theme` in `localStorage` under `"theme"`
- `workoutLog` in `localStorage` under `"workoutLog"`

No Context, Redux, or Zustand.

### Supabase integration

[src/lib/supabase.ts](src/lib/supabase.ts) exports the Supabase client. Two tables are used:

- `exercise_weights` — columns: `user_id`, `ex_key`, `weight_kg`
- `workout_logs` — columns: `user_id`, `session_date`, `day_type`

**Hooks** (all in [src/hooks/](src/hooks/)):

- `useSupabase` — on mount, resumes existing session via `getSession`; provides Google OAuth sign-in and sign-out; returns `{ userId, isReady, signIn, signOut }`
- `useExerciseWeight(exKey, userId)` — loads weight from Supabase (with localStorage as cache), migrates any existing localStorage value on first use; returns `{ weight, saveWeight }`
- `useWorkoutLog(userId)` — loads workout history from Supabase (with localStorage cache), migrates old localStorage data on first run; returns `{ workoutLog, saveSession }`

`WeightInput` now delegates entirely to `useExerciseWeight` instead of managing `localStorage` directly. It receives `userId` as a prop.

**Session logging**: `App.tsx` exposes a "Terminer la séance" button. Clicking it opens a confirmation modal (`showConfirmModal`). On confirm, `confirmFinishSession` calls `saveSession(dateStr, day.type, userId)` (skipped for guests) and shows a toast notification for 3 s. Session saving is skipped when `isGuest` is true.

### Styling

- SCSS file per component for layout/structure
- Dynamic colors (day theme, muscle group tags, category badges) are applied via inline `style` props using values from [src/constants/colors.ts](src/constants/colors.ts)
- Dark-themed mobile-first layout (max-width 600px)
- Each day has a `color` (primary) and `accent` (highlight) defined in the days data
- J3 (CALI) exercises use `cat` badges with colors from `catColors` (Mobilité, Gainage, Force au sol, Flexibilité)

### Authentication

[src/components/LoginScreen/LoginScreen.tsx](src/components/LoginScreen/LoginScreen.tsx) is rendered by `App.tsx` when `isReady && !userId && !isGuest`. It shows two options:
- **Google OAuth** — "Continuer avec Google" (`signIn` from `useSupabase`); enables Supabase sync and session logging
- **Guest access** — "Continuer sans compte" (`onGuestAccess` sets `isGuest = true`); skips auth, no Supabase writes, no sign-out button in the side panel

### Rest timer

[src/components/RestTimerModal/RestTimerModal.tsx](src/components/RestTimerModal/RestTimerModal.tsx) is a modal overlay controlled by `showRestTimer` in `App.tsx`. Opened via the `⏱` button in the Header (`onOpenTimer` prop). Features:
- Three preset durations: 1 min, 1 min 30, 2 min
- Circular SVG arc progress indicator that drains as time elapses
- Displays countdown in `MM:SS`; shows a green `✓` when done
- Uses `setInterval` (1 s tick); clears on unmount or when timer reaches 0
- Receives `accentColor` (current day's accent) and `onClose` as props

### Side panel

[src/components/SidePanel/SidePanel.tsx](src/components/SidePanel/SidePanel.tsx) is a right-side drawer controlled by `isPanelOpen` in `App.tsx`. It slides in with a CSS `translateX` transition and renders a backdrop overlay that closes it on click. Contains:
- Theme toggle (moved out of the Header; Header now has a `☰` burger button via `onOpenPanel` prop and a `⏱` timer button via `onOpenTimer` prop)
- Workout history via [src/components/WorkoutCalendar/WorkoutCalendar.tsx](src/components/WorkoutCalendar/WorkoutCalendar.tsx), which receives `workoutLog` and renders a calendar view of past sessions
- Sign-out button ("Déconnexion") via `onSignOut` prop — hidden when `isGuest` is true

### Session progress

[src/components/SessionProgress/SessionProgress.tsx](src/components/SessionProgress/SessionProgress.tsx) renders a thin progress bar + `X / Y exercices` label above the exercise list. It receives `completed`, `total`, and `accentColor` as props — no internal state.

Each `ExerciseCard` has a circular checkbox button (top-right, `stopPropagation` so it doesn't toggle the accordion). When completed: index badge turns green ✓, name gets a strikethrough, card opacity drops to 0.6.
