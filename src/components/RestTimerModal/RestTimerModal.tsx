import { useState, useEffect, useRef } from 'react'
import './RestTimerModal.scss'

const PRESETS = [
  { label: '60 s', seconds: 60 },
  { label: '90 s', seconds: 90 },
  { label: '2 min', seconds: 120 },
  { label: '3 min', seconds: 180 },
]

const EXTRA_SECONDS = 15
const R = 45
const CIRCUMFERENCE = 2 * Math.PI * R

interface Props {
  accentColor: string
  onAccentColor: string
  initialSeconds?: number
  exerciseName?: string
  onClose: () => void
}

function formatClock(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function getDialText(remaining: number | null, total: number): { time: string; caption: string } {
  if (remaining === null) return { time: '–:––', caption: 'Choisis une durée' }
  if (remaining === 0) return { time: 'GO', caption: "C'est reparti" }
  return { time: formatClock(remaining), caption: `sur ${formatClock(total)}` }
}

export function RestTimerModal({ accentColor, onAccentColor, initialSeconds, exerciseName, onClose }: Props) {
  const [remaining, setRemaining] = useState<number | null>(initialSeconds ?? null)
  const [total, setTotal] = useState<number>(initialSeconds ?? 60)
  const audioCtxRef = useRef<AudioContext | null>(null)

  // Ouvert depuis un exercice : le décompte part tout seul. Le contexte audio se crée ici,
  // encore dans le geste de l'utilisateur, pour que le bip de fin soit autorisé.
  useEffect(() => {
    if (initialSeconds && !audioCtxRef.current) audioCtxRef.current = new AudioContext()
  }, [initialSeconds])

  useEffect(() => {
    if (remaining === null || remaining <= 0) return
    const id = setInterval(() => {
      setRemaining(prev => (prev !== null && prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [remaining])

  useEffect(() => {
    if (remaining !== 0) return

    navigator.vibrate?.([400, 150, 400, 150, 400])

    const ctx = audioCtxRef.current
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.value = 880
    gain.gain.setValueAtTime(0.6, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.6)
  }, [remaining])

  function startTimer(seconds: number) {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }
    setTotal(seconds)
    setRemaining(seconds)
  }

  function addTime() {
    setTotal(prev => prev + EXTRA_SECONDS)
    setRemaining(prev => (prev ?? 0) + EXTRA_SECONDS)
  }

  const isIdle = remaining === null
  const isDone = remaining === 0
  const progress = remaining !== null ? remaining / total : 1
  const dialText = getDialText(remaining, total)
  const doneStyle = isDone ? { background: accentColor, color: onAccentColor } : undefined

  return (
    <div className={`rest-timer${isDone ? ' rest-timer--done' : ''}`} style={doneStyle} role='dialog' aria-modal='true' aria-label='Minuteur de repos'>
      <div className='rest-timer__top'>
        <div className='rest-timer__context'>
          {isDone ? 'Repos terminé' : 'Repos'}
          {exerciseName && <b>{isDone ? `Série suivante · ${exerciseName}` : exerciseName}</b>}
        </div>
        <button className='rest-timer__close' onClick={onClose} aria-label='Fermer le minuteur'>
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' aria-hidden='true'>
            <path d='M6 6l12 12M18 6 6 18' />
          </svg>
        </button>
      </div>

      <div className='rest-timer__dial'>
        <svg viewBox='0 0 100 100' aria-hidden='true'>
          <circle className='rest-timer__track' cx='50' cy='50' r={R} />
          <circle
            className='rest-timer__arc'
            cx='50'
            cy='50'
            r={R}
            stroke={isDone ? onAccentColor : accentColor}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          />
        </svg>
        <div className='rest-timer__time' aria-live='polite'>
          <b>{dialText.time}</b>
          <small>{dialText.caption}</small>
        </div>
      </div>

      {!isDone && (
        <div className='rest-timer__presets'>
          {PRESETS.map(p => (
            <button
              key={p.seconds}
              className='rest-timer__preset'
              aria-pressed={!isIdle && total === p.seconds}
              style={!isIdle && total === p.seconds ? { outlineColor: accentColor } : undefined}
              onClick={() => startTimer(p.seconds)}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      <div className='rest-timer__actions'>
        {isDone && (
          <button className='rest-timer__btn' style={{ background: onAccentColor, color: accentColor }} onClick={onClose}>
            {exerciseName ? "Retour à l'exercice" : 'Fermer'}
          </button>
        )}
        {!isDone && !isIdle && (
          <>
            <button className='rest-timer__btn rest-timer__btn--ghost' onClick={addTime}>+{EXTRA_SECONDS} s</button>
            <button className='rest-timer__btn rest-timer__btn--line' onClick={onClose}>Arrêter</button>
          </>
        )}
      </div>
    </div>
  )
}
