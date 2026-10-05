import { describe, expect, it } from 'vitest'
import { formatKg, parseKg, parseRestSeconds, resolveWeight, stepWeight } from './weight'

describe('parseRestSeconds', () => {
  it('reads the rest formats used in days.ts', () => {
    expect(parseRestSeconds('90s')).toBe(90)
    expect(parseRestSeconds('60s')).toBe(60)
    expect(parseRestSeconds('2 min')).toBe(120)
    expect(parseRestSeconds('1 min 30')).toBe(90)
  })

  it('returns null when there is no rest', () => {
    expect(parseRestSeconds('')).toBeNull()
    expect(parseRestSeconds('libre')).toBeNull()
  })
})

describe('parseKg / formatKg', () => {
  it('accepts a French decimal comma', () => {
    expect(parseKg('36,5')).toBe(36.5)
    expect(parseKg('40')).toBe(40)
    expect(parseKg('')).toBeNull()
    expect(parseKg('abc')).toBeNull()
  })

  it('formats with a comma and no trailing zero', () => {
    expect(formatKg(36.5)).toBe('36,5')
    expect(formatKg(40)).toBe('40')
    expect(formatKg(1.25)).toBe('1,25')
  })
})

describe('stepWeight', () => {
  it('adds or removes 2.5 kg', () => {
    expect(stepWeight(34, 2.5)).toBe(36.5)
    expect(stepWeight(34, -2.5)).toBe(31.5)
  })

  it('never goes below zero', () => {
    expect(stepWeight(1, -2.5)).toBe(0)
  })

  it('avoids floating point drift', () => {
    expect(stepWeight(0.1 + 0.2, 2.5)).toBe(2.8)
  })
})

describe('resolveWeight', () => {
  it('keeps an unsynced local value and asks to push it, even if the account has an older one', () => {
    expect(resolveWeight({ local: '36.5', pending: true, remote: '34' })).toEqual({ value: '36.5', push: true })
  })

  it('takes the account value once nothing is pending', () => {
    expect(resolveWeight({ local: '30', pending: false, remote: '34' })).toEqual({ value: '34', push: false })
  })

  it('falls back to the local value when the account has none', () => {
    expect(resolveWeight({ local: '30', pending: false, remote: null })).toEqual({ value: '30', push: false })
    expect(resolveWeight({ local: null, pending: false, remote: null })).toEqual({ value: '', push: false })
  })
})
