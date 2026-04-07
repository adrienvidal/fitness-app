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
- `theme` (`"dark" | "light"`) — persisted in `localStorage` under key `"theme"`
- `workoutLog` (`Record<string, DayType>`) — maps ISO date strings (`"YYYY-MM-DD"`) to day type; persisted in `localStorage` under key `"workoutLog"`; updated by `handleFinishSession` which records the current day's type for today's date

No Context, Redux, or Zustand. Persistence:
- [src/components/WeightInput](src/components/WeightInput/) reads/writes `localStorage` with keys formatted as `weight:d{day}-{exerciseName}`
- `theme` in `localStorage` under `"theme"`
- `workoutLog` in `localStorage` under `"workoutLog"`

`exKey` format: `d{dayIndex}-{exerciseName_with_underscores}` — used as both the `WeightInput` storage key prefix and the completion tracking key.

### Styling

- SCSS file per component for layout/structure
- Dynamic colors (day theme, muscle group tags, category badges) are applied via inline `style` props using values from [src/constants/colors.ts](src/constants/colors.ts)
- Dark-themed mobile-first layout (max-width 600px)
- Each day has a `color` (primary) and `accent` (highlight) defined in the days data
- J3 (CALI) exercises use `cat` badges with colors from `catColors` (Mobilité, Gainage, Force au sol, Flexibilité)

### Side panel

[src/components/SidePanel/SidePanel.tsx](src/components/SidePanel/SidePanel.tsx) is a right-side drawer controlled by `isPanelOpen` in `App.tsx`. It slides in with a CSS `translateX` transition and renders a backdrop overlay that closes it on click. Contains:
- Theme toggle (moved out of the Header; Header now has a `☰` burger button via `onOpenPanel` prop)
- Workout history via [src/components/WorkoutCalendar/WorkoutCalendar.tsx](src/components/WorkoutCalendar/WorkoutCalendar.tsx), which receives `workoutLog` and renders a calendar view of past sessions

### Session progress

[src/components/SessionProgress/SessionProgress.tsx](src/components/SessionProgress/SessionProgress.tsx) renders a thin progress bar + `X / Y exercices` label above the exercise list. It receives `completed`, `total`, and `accentColor` as props — no internal state.

Each `ExerciseCard` has a circular checkbox button (top-right, `stopPropagation` so it doesn't toggle the accordion). When completed: index badge turns green ✓, name gets a strikethrough, card opacity drops to 0.6.
