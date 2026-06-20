# CLAUDE.md

## Commands

```bash
npm run dev        # Start Vite dev server (hot reload)
npm run build      # Type-check (tsc -b) then build for production
npm run lint       # Run ESLint
npm run preview    # Preview production build locally
```

## Architecture

**React 19 + TypeScript + Vite SPA** — workout + nutrition reference tool. Two tabs (Entraînement / Nutrition) in `App.tsx`. No routing.

### Data model

All workout content in [src/data/days.ts](src/data/days.ts), types in [src/types/index.types.ts](src/types/index.types.ts).

- 5 days: PUSH / PULL / LEGS / FULL BODY / CARDIO
- `Day`: `id`, `label`, `type`, `color`, `accent`, `emoji`, `exercises[]`
- `Exercise`: muscle groups, sets/reps/rest, images, description, tips, optional `warmupSeries`, `hasWeight`, `assistedWeight`, `defaultWeight`

### State

All state in [src/App.tsx](src/App.tsx) as `useState`. No Context/Redux/Zustand.

Key state: `activeDay`, `activeExercise`, `completedExercises` (Set), `activeSection`, `isPanelOpen`, `isGuest`, `showConfirmModal`, `showToast`, `showRestTimer`, `pendingLogDate`, `theme`, `workoutLog`.

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
| WorkoutOMAD | [src/components/WorkoutOMAD/](src/components/WorkoutOMAD/) | Nutrition tab (18/6 IF protocol, meal builder) |
