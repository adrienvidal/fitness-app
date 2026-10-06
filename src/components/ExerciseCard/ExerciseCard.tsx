import { useState, type CSSProperties } from 'react'
import type { Exercise } from '../../types/index.types'
import { muscleColors } from '../../constants/colors'
import { useExerciseWeight } from '../../hooks/useExerciseWeight'
import { formatKg, parseKg, parseRestSeconds } from '../../utils/weight'
import { WeightInput } from '../WeightInput/WeightInput'
import './ExerciseCard.scss'

interface Props {
  ex: Exercise & { index: number }
  accentColor: string
  onAccentColor: string
  isOpen: boolean
  isNext: boolean
  onClick: () => void
  exKey: string
  isCompleted: boolean
  onToggleComplete: () => void
  onStartRest: (seconds: number) => void
  userId: string | null
}

export function ExerciseCard({ ex, accentColor, onAccentColor, isOpen, isNext, onClick, exKey, isCompleted, onToggleComplete, onStartRest, userId }: Props) {
  const [imgOk, setImgOk] = useState(true)
  const { weight, status, saveWeight, retry } = useExerciseWeight(exKey, ex.hasWeight ? userId : null)
  const restSeconds = parseRestSeconds(ex.rest)
  const isReadOnly = !userId

  const specs = [
    { label: ex.rest ? 'Séries' : 'Durée', value: ex.series },
    ...(ex.rest ? [{ label: 'Repos', value: ex.rest }] : []),
    ...(ex.warmupSeries ? [{ label: 'Échauff.', value: ex.warmupSeries }] : []),
    ...(!ex.warmupSeries && ex.defaultWeight !== undefined ? [{ label: 'Départ', value: `${formatKg(ex.defaultWeight)} kg` }] : []),
  ]

  const checkStyle = isCompleted ? { background: accentColor, borderColor: accentColor, color: onAccentColor } : undefined
  const classes = ['exercise-card']
  let cardStyle: CSSProperties | undefined
  if (isOpen) {
    classes.push('exercise-card--open')
    cardStyle = { borderColor: accentColor }
  } else if (isCompleted) {
    classes.push('exercise-card--done')
  } else if (isNext) {
    cardStyle = { outlineColor: accentColor }
  }

  return (
    <div className={classes.join(' ')} style={cardStyle}>
      <div className='exercise-card__row'>
        <button onClick={onClick} className='exercise-card__header' aria-expanded={isOpen}>
          <span className='exercise-card__index' style={isOpen || isNext ? { color: accentColor } : undefined}>{ex.index}</span>
          <span className='exercise-card__meta'>
            <span className='exercise-card__name'>{ex.name}</span>
            {!isOpen && <span className='exercise-card__details'>{rowDetails(ex, weight, isReadOnly)}</span>}
          </span>
        </button>
        <button
          className='exercise-card__check'
          onClick={onToggleComplete}
          aria-pressed={isCompleted}
          aria-label={isCompleted ? `Annuler la validation de ${ex.name}` : `Valider ${ex.name}`}
          style={checkStyle}
        >
          {isCompleted && <IconCheck />}
        </button>
      </div>

      {isOpen && (
        <div className='exercise-card__body'>
          {imgOk ? (
            <img src={ex.img} alt='' onError={() => setImgOk(false)} className='exercise-card__image' loading='lazy' />
          ) : (
            <div className='exercise-card__image exercise-card__image--fallback' aria-hidden='true' />
          )}

          <div className='exercise-card__chips'>
            {ex.muscles.map(m => (
              <span key={m} className='exercise-card__chip'>
                <i style={{ background: muscleColors[m] ?? 'var(--muted)' }} />
                {m}
              </span>
            ))}
          </div>

          <dl className='exercise-card__specs' style={{ gridTemplateColumns: `repeat(${specs.length}, minmax(0, 1fr))` }}>
            {specs.map(s => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>

          {ex.hasWeight && (
            <WeightInput
              weight={weight}
              status={status}
              defaultWeight={ex.defaultWeight}
              assistedWeight={ex.assistedWeight}
              readOnly={isReadOnly}
              onChange={saveWeight}
              onRetry={retry}
            />
          )}

          <details className='exercise-card__how'>
            <summary>
              Comment faire
              <IconChevron />
            </summary>
            <p>{ex.desc}</p>
            <ul>
              {ex.tips.map(tip => <li key={tip}>{tip}</li>)}
            </ul>
          </details>

          <div className='exercise-card__actions'>
            {restSeconds !== null && (
              <button className='exercise-card__btn' onClick={() => onStartRest(restSeconds)}>
                <IconPlay /> Repos {ex.rest}
              </button>
            )}
            <button
              className='exercise-card__btn'
              onClick={onToggleComplete}
              style={isCompleted ? undefined : { background: accentColor, color: onAccentColor }}
            >
              <IconCheck /> {isCompleted ? 'Validé' : 'Valider'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function rowDetails(ex: Exercise, weight: string, isReadOnly: boolean): string {
  const parts = [ex.series]
  if (ex.rest) parts.push(ex.rest)
  if (!ex.hasWeight) return parts.join(' · ')

  const kg = isReadOnly ? ex.defaultWeight ?? null : parseKg(weight) ?? ex.defaultWeight ?? null
  if (kg === null) return parts.join(' · ')

  let prefix = ''
  if (ex.assistedWeight) prefix = 'assist. '
  else if (isReadOnly) prefix = 'conseillé '
  parts.push(`${prefix}${formatKg(kg)} kg`)
  return parts.join(' · ')
}

function IconCheck() {
  return (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
      <path d='M20 6 9 17l-5-5' />
    </svg>
  )
}

function IconChevron() {
  return (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
      <path d='m6 9 6 6 6-6' />
    </svg>
  )
}

function IconPlay() {
  return (
    <svg viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
      <path d='M7 5v14l12-7z' />
    </svg>
  )
}
