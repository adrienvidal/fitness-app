// Durées de repos telles qu'écrites dans days.ts : "90s", "2 min", "1 min 30".
export function parseRestSeconds(rest: string): number | null {
  const match = rest.trim().match(/^(?:(\d+)\s*min(?:\s*(\d+))?|(\d+)\s*s)$/)
  if (!match) return null
  const [, minutes, extraSeconds, seconds] = match
  if (seconds) return Number(seconds)
  return Number(minutes) * 60 + Number(extraSeconds ?? 0)
}

export function parseKg(value: string): number | null {
  if (value.trim() === '') return null
  const n = Number(value.replace(',', '.'))
  return Number.isFinite(n) ? n : null
}

export function formatKg(kg: number): string {
  return String(kg).replace('.', ',')
}

export function stepWeight(kg: number, delta: number): number {
  return Math.max(0, Math.round((kg + delta) * 100) / 100)
}

interface WeightSources {
  local: string | null
  pending: boolean
  remote: string | null
}

// Une valeur saisie hors réseau (pending) l'emporte sur celle du compte, et doit y être renvoyée.
export function resolveWeight({ local, pending, remote }: WeightSources): { value: string; push: boolean } {
  if (pending && local !== null) return { value: local, push: true }
  if (remote !== null) return { value: remote, push: false }
  return { value: local ?? '', push: false }
}
