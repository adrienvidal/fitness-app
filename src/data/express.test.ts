import { describe, expect, it } from 'vitest'
import { expressExercises } from './express'

describe('expressExercises', () => {
  it('starts with the first 3 PUSH exercises and Lombaires, keyed on the PUSH day', () => {
    const force = expressExercises('push').slice(0, 4)
    expect(force.map(ex => ex.name)).toEqual([
      'Développé couché barre',
      'Développé incliné haltères',
      'Pecfly',
      'Lombaires (finish)',
    ])
    expect(force.every(ex => ex.sourceDay === 0)).toBe(true)
  })

  it('swaps only the force block when the base is PULL', () => {
    const push = expressExercises('push')
    const pull = expressExercises('pull')
    expect(pull.slice(0, 3).map(ex => ex.name)).toEqual([
      'Tirage vertical divergent',
      'Tirage vertical (lat pull)',
      'Tractions assistées',
    ])
    expect(pull[3].sourceDay).toBe(1)
    expect(pull.slice(4)).toEqual(push.slice(4))
  })

  it('ends with the circuit and a 20 min incline walk, neither tied to a source day', () => {
    const rest = expressExercises('push').slice(4)
    expect(rest.map(ex => ex.name)).toEqual(['Jumping jacks', 'Pompes', 'Squats poids du corps', 'Marche inclinée tapis'])
    expect(rest.at(-1)?.series).toBe('20 min')
    expect(rest.every(ex => ex.sourceDay === undefined)).toBe(true)
  })
})
