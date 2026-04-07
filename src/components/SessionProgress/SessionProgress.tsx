import './SessionProgress.scss'

interface Props {
  completed: number
  total: number
  accentColor: string
}

export function SessionProgress({ completed, total, accentColor }: Props) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)
  const isDone = completed === total

  return (
    <div className="session-progress">
      <div className="session-progress__header">
        <span className="session-progress__label" style={{ color: isDone ? accentColor : '#888' }}>
          {isDone ? '✓ Séance terminée !' : `${completed} / ${total} exercices`}
        </span>
        <span className="session-progress__percent" style={{ color: accentColor }}>
          {percent}%
        </span>
      </div>
      <div className="session-progress__track">
        <div
          className="session-progress__fill"
          style={{
            width: `${percent}%`,
            background: accentColor,
            boxShadow: percent > 0 ? `0 0 8px ${accentColor}66` : 'none'
          }}
        />
      </div>
    </div>
  )
}
