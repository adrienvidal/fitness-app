import './SessionProgress.scss'

interface Props {
  label: string
  dayId: number
  completed: number
  total: number
  accentColor: string
}

export function SessionProgress({ label, dayId, completed, total, accentColor }: Props) {
  const isDone = total > 0 && completed === total

  return (
    <div className="session-progress">
      <div className="session-progress__row">
        <h1 className="session-progress__title">{label}</h1>
        <div className="session-progress__count">
          {completed}/{total}
          <small>{isDone ? 'terminée' : 'exercices'}</small>
        </div>
      </div>
      <div className="session-progress__segs" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={completed}>
        {Array.from({ length: total }, (_, i) => (
          <i key={i} style={i < completed ? { background: accentColor } : undefined} />
        ))}
      </div>
      <span className="session-progress__sub">Jour {dayId} · {total} exercices</span>
    </div>
  )
}
