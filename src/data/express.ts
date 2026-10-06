import type { Exercise, ExpressBase } from '../types/index.types'
import { days } from './days'

const FORCE_COUNT = 3
const FINISH_NAME = 'Lombaires (finish)'

const circuit: Exercise[] = [
  {
    name: 'Jumping jacks',
    series: '3×30 s',
    rest: 'enchaîner',
    hasWeight: false,
    img: '/images/exercises/jumping-jacks.webp',
    muscles: ['Cardio', 'Corps entier'],
    desc: "Debout, pieds joints, bras le long du corps. Sauter en écartant les pieds et en montant les bras au-dessus de la tête, puis revenir. Rythme soutenu et régulier pendant 30 secondes, puis enchaîner sur les pompes.",
    tips: [
      'Atterrir sur l\'avant du pied, genoux souples',
      'Gainage léger pour garder le buste droit',
      'Respirer en rythme, ne pas bloquer'
    ]
  },
  {
    name: 'Pompes',
    series: '3×12',
    rest: 'enchaîner',
    hasWeight: false,
    img: '/images/exercises/pompes.webp',
    muscles: ['Pectoraux', 'Triceps', 'Core'],
    desc: "Mains un peu plus larges que les épaules, corps aligné de la tête aux talons. Descendre la poitrine près du sol, coudes à 45° du corps, puis pousser. Sur les genoux si la forme se dégrade avant la 12e.",
    tips: [
      'Fessiers et abdos serrés, bassin ni haut ni bas',
      'Coudes vers l\'arrière, pas à l\'horizontale',
      'Amplitude complète plutôt que vitesse'
    ]
  },
  {
    name: 'Squats poids du corps',
    series: '3×15',
    rest: '60s',
    hasWeight: false,
    img: '/images/exercises/squats.webp',
    muscles: ['Quadriceps', 'Fessiers'],
    desc: "Pieds largeur d'épaules, pointes légèrement ouvertes. Descendre comme pour s'asseoir, cuisses au moins parallèles au sol, puis remonter. Le repos de 60 s se prend ici, à la fin du tour, avant de repartir sur les jumping jacks.",
    tips: [
      'Talons au sol tout le long',
      'Genoux dans l\'axe des pieds',
      'Buste fier, regard devant'
    ]
  }
].map(ex => ({ ...ex, group: { label: 'Circuit', note: '3 tours, enchaîner' } }))

function cardio(): Exercise {
  const walk = days.find(d => d.type === 'cardio')!.exercises.find(ex => ex.name === 'Marche inclinée tapis')!
  return { ...walk, series: '20 min', group: { label: 'Cardio', note: '20 min' } }
}

// Les 3 premiers exercices du jour de base + Lombaires, puis le circuit et la marche inclinée.
// sourceDay garde la clé de charge du jour d'origine : la progression reste la même qu'en PUSH ou PULL.
export function expressExercises(base: ExpressBase): Exercise[] {
  const sourceDay = days.findIndex(d => d.type === base)
  const { label, exercises } = days[sourceDay]
  const force = [...exercises.slice(0, FORCE_COUNT), exercises.find(ex => ex.name === FINISH_NAME)!]
  const group = { label: `Force · ${label}`, note: `${force.length} exercices` }
  return [...force.map(ex => ({ ...ex, group, sourceDay })), ...circuit, cardio()]
}
