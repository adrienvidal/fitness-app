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
  userId: string | null
}

const IconCheck = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const IconChevronDown = ({ style }: { style?: React.CSSProperties }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

const IconArrow = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)

const IconStar = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
)

export function ExerciseCard({ ex, accentColor, dayColor, isOpen, onClick, exKey, isCompleted, onToggleComplete, userId }: Props) {
  const [imgOk, setImgOk] = useState(true)
  const catColor = (ex.cat && catColors[ex.cat]) || accentColor

  return (
    <div
      className={`exercise-card${isCompleted ? ' exercise-card--done' : ''}`}
      style={{
        border: `1.5px solid ${isCompleted ? 'var(--card-done-border)' : isOpen ? accentColor : 'var(--card-inactive-border)'}`,
        boxShadow: isOpen && !isCompleted ? `0 4px 28px ${accentColor}30` : 'none'
      }}
    >
      <button onClick={onClick} className='exercise-card__header' aria-expanded={isOpen}>
        <div
          className='exercise-card__index'
          style={{
            background: isCompleted ? 'var(--check-done-bg)' : isOpen ? accentColor : `${accentColor}20`,
            color: isCompleted ? '#4caf50' : isOpen ? '#fff' : accentColor
          }}
        >
          {isCompleted ? <IconCheck size={15} /> : ex.index}
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
        <div className='exercise-card__chevron' style={{ color: accentColor }}>
          <IconChevronDown style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }} />
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
                loading="lazy"
              />
            ) : (
              <div
                className='exercise-card__image-fallback'
                style={{
                  background: `linear-gradient(135deg, ${dayColor}55, ${accentColor}22)`,
                  color: accentColor
                }}
              >
                <div className='exercise-card__image-fallback-icon' aria-hidden="true">🏋️</div>
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

            {ex.hasWeight && <WeightInput exKey={exKey} accentColor={accentColor} defaultWeight={ex.defaultWeight} assistedWeight={ex.assistedWeight} userId={userId} />}

            <div
              className='exercise-card__desc'
              style={{ borderLeft: `3px solid ${accentColor}` }}
            >
              {ex.desc}
            </div>

            <div className='exercise-card__tips-title' style={{ color: accentColor }}>
              <IconStar /> Points clés
            </div>

            {ex.tips.map((tip, j) => (
              <div key={j} className='exercise-card__tip'>
                <span className='exercise-card__tip-arrow' style={{ color: accentColor }}>
                  <IconArrow />
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
              {isCompleted ? (
                <><IconCheck size={14} /> Validé</>
              ) : 'Valider'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
