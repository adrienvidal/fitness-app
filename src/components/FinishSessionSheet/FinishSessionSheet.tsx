import './FinishSessionSheet.scss'

const MAX_LISTED = 3

function listMissing(names: string[]): string {
  const listed = names.slice(0, MAX_LISTED).join(', ')
  const rest = names.length - MAX_LISTED
  return rest > 0 ? `${listed} +${rest}` : listed
}

interface Props {
  dayLabel: string
  accentColor: string
  onAccentColor: string
  completed: number
  total: number
  missing: string[]
  dateLabel: string
  isGuest: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function FinishSessionSheet({ dayLabel, accentColor, onAccentColor, completed, total, missing, dateLabel, isGuest, onCancel, onConfirm }: Props) {
  return (
    <div className='finish-sheet__scrim' onClick={onCancel}>
      <div
        className='finish-sheet'
        role='dialog'
        aria-modal='true'
        aria-labelledby='finish-sheet-title'
        onClick={e => e.stopPropagation()}
      >
        <div className='finish-sheet__grab' aria-hidden='true' />
        <h2 id='finish-sheet-title' className='finish-sheet__title'>Terminer {dayLabel} ?</h2>

        <div className='finish-sheet__stats'>
          <div>
            <b>{completed}/{total}</b>
            <small>exercices validés</small>
          </div>
          {missing.length > 0 && (
            <div className='finish-sheet__missing'>
              <b>{missing.length}</b>
              <small>non fait{missing.length > 1 ? 's' : ''} : {listMissing(missing)}</small>
            </div>
          )}
        </div>

        <p className='finish-sheet__text'>
          {isGuest
            ? "En mode invité, la séance n'est pas gardée dans l'historique."
            : `La séance sera ajoutée à ton historique au ${dateLabel}.`}
        </p>

        <div className='finish-sheet__actions'>
          <button className='finish-sheet__btn finish-sheet__btn--ghost' onClick={onCancel}>Continuer</button>
          <button className='finish-sheet__btn' style={{ background: accentColor, color: onAccentColor }} onClick={onConfirm}>
            {isGuest ? 'Terminer' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </div>
  )
}
