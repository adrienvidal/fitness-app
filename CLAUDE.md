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

**Single-page React 19 + TypeScript + Vite app** — a workout + nutrition reference tool. Two main sections (Entraînement / Nutrition) switched via tabs in `App.tsx`. Workout section is organized by training day (PUSH / PULL / LEGS / FULL BODY / CARDIO); Nutrition section shows a WorkoutOMAD intermittent-fasting plan. No routing.

### Data model

All workout content lives in [src/data/days.ts](src/data/days.ts). The type hierarchy (defined in [src/types/index.types.ts](src/types/index.types.ts)):

```
Day → Exercise[]
```

- 5 days: Jour 1 PUSH (7 exercises), Jour 2 PULL (7 exercises), Jour 3 LEGS (7 exercises), Jour 4 FULL BODY (7 exercises), Jour 5 CARDIO (3 activities)
- Each `Day` has: `id`, `label`, `type` (`push | pull | legs | fullbody | cardio`), `color`, `accent`, `emoji`, `exercises[]`
- Each exercise carries metadata: muscle groups, sets/reps/rest, images, description, tips, optional `warmupSeries` (e.g. "2×15" for warm-up sets before working sets), `hasWeight` flag, optional `assistedWeight` (boolean, for machine-assisted moves where weight means assistance), and optional `defaultWeight` (number, pre-filled value in WeightInput)

### State management

All UI state lives in [src/App.tsx](src/App.tsx) as plain `useState`:
- `activeDay` (0–4)
- `activeExercise` (null or index)
- `completedExercises` (`Set<string>`) — set of `exKey` strings for exercises marked done; reset on day change
- `activeSection` (`"workout" | "nutrition"`) — controls the main content tab (Entraînement vs Nutrition)
- `isPanelOpen` (boolean) — controls the right side panel visibility
- `isGuest` (boolean) — true when user chose "Continuer sans compte"; bypasses auth gate, disables session saving and sign-out button
- `showConfirmModal` (boolean) — controls the session-finish confirmation modal
- `showToast` (boolean) — controls the "✓ Séance enregistrée !" toast (auto-hides after 3 s)
- `showRestTimer` (boolean) — controls the rest timer modal visibility
- `pendingLogDate` (string | null) — ISO date string of the day selected in the calendar for retroactive logging; when set, opens `LogSessionModal`
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

**Session logging**: `App.tsx` exposes a "Terminer la séance" button. Clicking it opens a confirmation modal (`showConfirmModal`). On confirm, `confirmFinishSession` calls `saveSession(dateStr, day.type, userId)` and shows a toast notification for 3 s. Session saving is skipped when `!userId` (guests have no userId).

**Retroactive session logging**: Past dates (≤ today) in `WorkoutCalendar` are clickable for non-guest users. Clicking a date sets `pendingLogDate` in `App.tsx`, which opens `LogSessionModal`. The modal shows the 5 day types; tapping one calls `saveSession(dateStr, dayType, userId)` and closes. Already-logged dates show their current type pre-highlighted and can be overwritten (upsert). Guest users cannot click calendar dates.

### Styling

- SCSS file per component for layout/structure
- Dynamic colors (day theme, muscle group tags, category badges) are applied via inline `style` props using values from [src/constants/colors.ts](src/constants/colors.ts)
- Dark-themed mobile-first layout (max-width 600px)
- Each day has a `color` (primary) and `accent` (highlight) defined in the days data

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
- On completion: triggers `navigator.vibrate([400, 150, 400, 150, 400])` + a 880 Hz sine-wave beep via Web Audio API (`AudioContext` stored in a `useRef`, created lazily on first start to satisfy browser autoplay policy)
- Receives `accentColor` (current day's accent) and `onClose` as props

### Side panel

[src/components/SidePanel/SidePanel.tsx](src/components/SidePanel/SidePanel.tsx) is a right-side drawer controlled by `isPanelOpen` in `App.tsx`. It slides in with a CSS `translateX` transition and renders a backdrop overlay that closes it on click. Contains:
- Theme toggle (moved out of the Header; Header now has a `☰` burger button via `onOpenPanel` prop and a `⏱` timer button via `onOpenTimer` prop)
- Workout history via [src/components/WorkoutCalendar/WorkoutCalendar.tsx](src/components/WorkoutCalendar/WorkoutCalendar.tsx), which receives `workoutLog` and `onSelectDate` (absent for guests) and renders a calendar view of past sessions; past/today dates are clickable when `onSelectDate` is provided
- Sign-out button ("Déconnexion") via `onSignOut` prop — hidden when `isGuest` is true

### Log session modal

[src/components/LogSessionModal/LogSessionModal.tsx](src/components/LogSessionModal/LogSessionModal.tsx) is a bottom-sheet modal controlled by `pendingLogDate` in `App.tsx`. Opened when a past/today date is tapped in the calendar. Features:
- Date formatted in French (weekday + day + month)
- 2-column grid of day-type buttons (PUSH / PULL / LEGS / FULL BODY / CARDIO) with their respective colors; the 5th button (CARDIO) spans both columns
- If the date already has a session, the matching type button appears filled/selected
- Tapping a type immediately calls `onSave(dateStr, dayType)` — no separate confirm step
- Backdrop click or ✕ button calls `onClose` without saving

### Session progress

[src/components/SessionProgress/SessionProgress.tsx](src/components/SessionProgress/SessionProgress.tsx) renders a thin progress bar + `X / Y exercices` label above the exercise list. It receives `completed`, `total`, and `accentColor` as props — no internal state.

Each `ExerciseCard` has a circular checkbox button (top-right, `stopPropagation` so it doesn't toggle the accordion). When completed: index badge turns green ✓, name gets a strikethrough, card opacity drops to 0.6.

### Nutrition tab (WorkoutOMAD)

[src/components/WorkoutOMAD/WorkoutOMAD.tsx](src/components/WorkoutOMAD/WorkoutOMAD.tsx) is rendered when `activeSection === "nutrition"`. It documents a 18/6 intermittent fasting + morning lifting protocol. All its state is local (no Supabase, no localStorage). Features:
- **Header** with 24h mini-timeline bar and live calorie/protein totals
- **Day selector** (Mon–Sun); weekends show a special notice (no workout shakes)
- **Three tabs**: Timeline (step-by-step day schedule), Repas (meal builder), Tips
- **Meal builder** — four independent selectors (pre-workout shake, post-workout shake + eggs, main meal, optional collation); each updates the running total displayed in the header stats
- Uses inline styles + scoped CSS-in-JS (`<style>` tag) with `DM Sans` + `Syne` fonts from Google Fonts; animations: `omadFadeUp`, `omadGlow`
