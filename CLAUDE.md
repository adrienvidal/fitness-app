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

**Single-page React 19 + TypeScript + Vite app** — a workout reference tool for a 12-week upper body training program with no routing.

### Data model

All workout content lives in [src/data/phases.ts](src/data/phases.ts). The type hierarchy (defined in [src/types/index.types.ts](src/types/index.types.ts)):

```
Phase → Section[] → Exercise[]
```

- 3 phases (Bases, Hypertrophie, Densité), each with 2 sections (Musculation / Callisthénie)
- Each exercise carries metadata: muscle groups, sets/reps/rest, images, description, tips, and an optional weight field

### State management

All UI state lives in [src/App.tsx](src/App.tsx) as plain `useState`:
- `activePhase` (0–2)
- `activeSection` (0–1)
- `activeExercise` (null or index)

No Context, Redux, or Zustand. The only persistence is in [src/components/WeightInput](src/components/WeightInput/), which reads/writes `localStorage` with keys formatted as `weight:p{phase}-s{section}-{exerciseName}`.

### Styling

- SCSS file per component for layout/structure
- Dynamic colors (phase theme, muscle group tags, category badges) are applied via inline `style` props using values from [src/constants/colors.ts](src/constants/colors.ts)
- Dark-themed mobile-first layout (max-width 600px)
- Each phase has a `color` (primary) and `accent` (highlight) defined in the phases data
