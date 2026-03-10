export type Exercise = {
  name: string
  series: string
  rest: string
  hasWeight: boolean
  img: string
  muscles: string[]
  desc: string
  tips: string[]
  cat?: string
  index?: number
}

export type Section = {
  type: string
  icon: string
  tag?: string
  exercises: Exercise[]
}

export type Phase = {
  id: number
  label: string
  sub: string
  theme: string
  color: string
  accent: string
  emoji: string
  sections: Section[]
}
