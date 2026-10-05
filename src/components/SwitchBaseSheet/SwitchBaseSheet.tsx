import '../FinishSessionSheet/FinishSessionSheet.scss'

interface Props {
  fromLabel: string
  toLabel: string
  toAccent: string
  toOnAccent: string
  forceDone: number
  onCancel: () => void
  onConfirm: () => void
}

// Changer de base en cours de séance décoche le bloc force : on le fait confirmer.
export function SwitchBaseSheet({ fromLabel, toLabel, toAccent, toOnAccent, forceDone, onCancel, onConfirm }: Props) {
  const plural = forceDone > 1 ? 's' : ''
  return (
    <div className='finish-sheet__scrim' onClick={onCancel}>
      <div
        className='finish-sheet'
        role='dialog'
        aria-modal='true'
        aria-labelledby='switch-base-title'
        onClick={e => e.stopPropagation()}
      >
        <div className='finish-sheet__grab' aria-hidden='true' />
        <h2 id='switch-base-title' className='finish-sheet__title'>Passer en {toLabel} ?</h2>
        <p className='finish-sheet__text'>
          {forceDone} exercice{plural} validé{plural} du bloc force {forceDone > 1 ? 'seront décochés' : 'sera décoché'}.
          Le circuit et le cardio sont conservés.
        </p>
        <div className='finish-sheet__actions'>
          <button className='finish-sheet__btn finish-sheet__btn--ghost' onClick={onCancel}>Rester en {fromLabel}</button>
          <button className='finish-sheet__btn' style={{ background: toAccent, color: toOnAccent }} onClick={onConfirm}>
            Passer en {toLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
