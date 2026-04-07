import { useState } from 'react'
import type { Exercise } from '../../types/index.types'
import { muscleColors, catColors } from '../../constants/colors'
import { WeightInput } from '../WeightInput/WeightInput'
import './ExerciseCard.scss'

interface Props {
  ex: Exercise & { index: number }
  accentColor: string
  dayColor: string
  isOpen: boolean
  onClick: () => void
  exKey: string
  isCompleted: boolean
  onToggleComplete: () => void
}

export function ExerciseCard({ ex, accentColor, dayColor, isOpen, onClick, exKey, isCompleted, onToggleComplete }: Props) {
  const [imgOk, setImgOk] = useState(true)
  const catColor = (ex.cat && catColors[ex.cat]) || accentColor

  return (
    <div
      className={`exercise-card${isCompleted ? ' exercise-card--done' : ''}`}
      style={{
        border: `1.5px solid ${isCompleted ? 'var(--card-done-border)' : isOpen ? accentColor : 'var(--card-inactive-border)'}`,
        boxShadow: isOpen && !isCompleted ? `0 4px 24px ${accentColor}28` : 'none'
      }}
    >
      <button onClick={onClick} className='exercise-card__header'>
        <div
          className='exercise-card__index'
          style={{
            background: isCompleted ? 'var(--check-done-bg)' : isOpen ? accentColor : `${accentColor}20`,
            color: isCompleted ? '#4caf50' : isOpen ? '#fff' : accentColor
          }}
        >
          {isCompleted ? '✓' : ex.index}
        </div>
        <div className='exercise-card__meta'>
          <div className='exercise-card__title-row'>
            <span className='exercise-card__name'>{ex.name}</span>
            {ex.cat && (
              <span
                className='exercise-card__cat'
                style={{
                  background: `${catColor}22`,
                  color: catColor,
                  border: `1px solid ${catColor}40`
                }}
              >
                {ex.cat}
              </span>
            )}
          </div>
          <div className='exercise-card__series-info'>
            {ex.warmupSeries && (
              <span
                className='exercise-card__warmup-badge'
                style={{ color: `${accentColor}99`, borderColor: `${accentColor}40` }}
              >
                Éch. {ex.warmupSeries}
              </span>
            )}
            <span>{ex.series}{ex.rest ? ` · Repos ${ex.rest}` : ''}</span>
          </div>
        </div>
        <div
          className='exercise-card__chevron'
          style={{
            color: accentColor,
            transform: isOpen ? 'rotate(180deg)' : 'none'
          }}
        >
          ▾
        </div>
      </button>

      {isOpen && (
        <div className='exercise-card__body'>
          <div className='exercise-card__image-wrap'>
            {imgOk ? (
              <img
                src={ex.img}
                alt={ex.name}
                onError={() => setImgOk(false)}
                className='exercise-card__image'
              />
            ) : (
              <div
                className='exercise-card__image-fallback'
                style={{
                  background: `linear-gradient(135deg, ${dayColor}55, ${accentColor}22)`,
                  color: accentColor
                }}
              >
                <div className='exercise-card__image-fallback-icon'>🏋️</div>
                <div className='exercise-card__image-fallback-name'>{ex.name}</div>
              </div>
            )}
            <div
              className='exercise-card__series-badge'
              style={{ background: accentColor }}
            >
              {ex.warmupSeries ? `Éch. ${ex.warmupSeries} → ${ex.series}` : ex.series}
            </div>
          </div>

          <div className='exercise-card__content'>
            <div className='exercise-card__muscles'>
              {ex.muscles.map((m, j) => (
                <span
                  key={j}
                  className='exercise-card__muscle'
                  style={{
                    background: `${muscleColors[m] || '#555'}28`,
                    color: muscleColors[m] || '#aaa',
                    border: `1px solid ${muscleColors[m] || '#555'}45`
                  }}
                >
                  {m}
                </span>
              ))}
            </div>

            {ex.hasWeight && <WeightInput exKey={exKey} accentColor={accentColor} defaultWeight={ex.defaultWeight} assistedWeight={ex.assistedWeight} />}

            <div
              className='exercise-card__desc'
              style={{ borderLeft: `3px solid ${accentColor}` }}
            >
              {ex.desc}
            </div>

            <div className='exercise-card__tips-title' style={{ color: accentColor }}>
              ✦ Points clés
            </div>

            {ex.tips.map((tip, j) => (
              <div key={j} className='exercise-card__tip'>
                <span className='exercise-card__tip-arrow' style={{ color: accentColor }}>
                  ›
                </span>
                <span>{tip}</span>
              </div>
            ))}

            <button
              className={`exercise-card__validate${isCompleted ? ' exercise-card__validate--done' : ''}`}
              onClick={onToggleComplete}
              style={isCompleted
                ? { background: 'var(--check-done-bg)', color: '#4caf50', borderColor: '#4caf50' }
                : { background: `${accentColor}18`, color: accentColor, borderColor: `${accentColor}60` }
              }
            >
              {isCompleted ? '✓ Validé' : 'Valider'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
