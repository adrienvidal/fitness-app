export type Exercise = {
  name: string
  series: string
  warmupSeries?: string
  rest: string
  hasWeight: boolean
  img: string
  muscles: string[]
  desc: string
  tips: string[]
  cat?: string
  index?: number
}

export type DayType = 'push' | 'pull' | 'cali' | 'cardio'

export type Day = {
  id: number
  label: string
  type: DayType
  color: string
  accent: string
  emoji: string
  exercises: Exercise[]
}
