export type Exercise = {
  name: string
  series: string
  warmupSeries?: string
  rest: string
  hasWeight: boolean
  assistedWeight?: boolean
  defaultWeight?: number
  img: string
  muscles: string[]
  desc: string
  tips: string[]
  cat?: string
  index?: number
  // Jour EXPRESS : bloc d'affichage, et jour d'origine dont l'exercice partage la charge.
  group?: { label: string; note: string }
  sourceDay?: number
}

export type DayType = 'push' | 'pull' | 'legs' | 'fullbody' | 'cardio' | 'express'

export type ExpressBase = 'push' | 'pull'

export type Day = {
  id: number
  label: string
  type: DayType
  color: string
  accent: string
  emoji: string
  exercises: Exercise[]
}
