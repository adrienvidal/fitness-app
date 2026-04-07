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
- Each exercise carries metadata: muscle groups, sets/reps/rest, images, description, tips, optional `warmupSeries` (e.g. "2×15" for warm-up sets before working sets), and an optional `hasWeight` flag

### State management

All UI state lives in [src/App.tsx](src/App.tsx) as plain `useState`:
- `activeDay` (0–3)
- `activeExercise` (null or index)

No Context, Redux, or Zustand. The only persistence is in [src/components/WeightInput](src/components/WeightInput/), which reads/writes `localStorage` with keys formatted as `weight:d{day}-{exerciseName}`.

### Styling

- SCSS file per component for layout/structure
- Dynamic colors (day theme, muscle group tags, category badges) are applied via inline `style` props using values from [src/constants/colors.ts](src/constants/colors.ts)
- Dark-themed mobile-first layout (max-width 600px)
- Each day has a `color` (primary) and `accent` (highlight) defined in the days data
- J3 (CALI) exercises use `cat` badges with colors from `catColors` (Mobilité, Gainage, Force au sol, Flexibilité)
