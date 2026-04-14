import { useState, useEffect } from 'react'
import './RestTimerModal.scss'

const PRESETS = [
  { label: '1 min', seconds: 60 },
  { label: '1 min 30', seconds: 90 },
  { label: '2 min', seconds: 120 },
]

const SIZE = 180
const STROKE = 10
const R = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * R

interface Props {
  accentColor: string
  onClose: () => void
}

export function RestTimerModal({ accentColor, onClose }: Props) {
  const [remaining, setRemaining] = useState<number | null>(null)
  const [total, setTotal] = useState<number>(60)

  useEffect(() => {
    if (remaining === null || remaining <= 0) return
    const id = setInterval(() => {
      setRemaining(prev => (prev !== null && prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [remaining])

  function startTimer(seconds: number) {
    setTotal(seconds)
    setRemaining(seconds)
  }

  const isRunning = remaining !== null && remaining > 0
  const isDone = remaining === 0
  const progress = remaining !== null ? remaining / total : 1
  const dashOffset = CIRCUMFERENCE * (1 - progress)

  const minutes = remaining !== null ? Math.floor(remaining / 60) : 0
  const seconds = remaining !== null ? remaining % 60 : 0
  const timeLabel = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  return (
    <div className='rest-timer-modal__backdrop' onClick={onClose}>
      <div className='rest-timer-modal' onClick={e => e.stopPropagation()}>
        <button className='rest-timer-modal__close' onClick={onClose}>✕</button>

        <div className='rest-timer-modal__presets'>
          {PRESETS.map(p => (
            <button
              key={p.seconds}
              className={`rest-timer-modal__preset${remaining !== null && total === p.seconds && (isRunning || isDone) ? ' rest-timer-modal__preset--active' : ''}`}
              style={remaining !== null && total === p.seconds && (isRunning || isDone)
                ? { background: accentColor, color: '#000', borderColor: accentColor }
                : { borderColor: `${accentColor}60`, color: accentColor }
              }
              onClick={() => startTimer(p.seconds)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className='rest-timer-modal__arc-wrap'>
          <svg width={SIZE} height={SIZE}>
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill='none'
              stroke='var(--card-inactive-border)'
              strokeWidth={STROKE}
            />
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill='none'
              stroke={isDone ? '#4caf50' : accentColor}
              strokeWidth={STROKE}
              strokeLinecap='round'
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
              style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s' }}
            />
          </svg>
          <div className='rest-timer-modal__time'>
            {remaining === null
              ? <span className='rest-timer-modal__time--placeholder'>--:--</span>
              : isDone
                ? <span className='rest-timer-modal__time--done' style={{ color: '#4caf50' }}>✓</span>
                : <span style={{ color: accentColor }}>{timeLabel}</span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
