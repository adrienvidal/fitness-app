import type { ExpressBase } from '../../types/index.types'
import { days } from '../../data/days'
import { onAccent } from '../../constants/colors'
import './ExpressBaseToggle.scss'

const bases = days.filter((d): d is typeof d & { type: ExpressBase } => d.type === 'push' || d.type === 'pull')

interface Props {
  base: ExpressBase
  onSelect: (base: ExpressBase) => void
}

export function ExpressBaseToggle({ base, onSelect }: Props) {
  return (
    <div className='express-base' role='radiogroup' aria-label='Base de la séance'>
      <span className='express-base__label'>Base</span>
      {bases.map(d => {
        const isActive = d.type === base
        return (
          <button
            key={d.type}
            role='radio'
            aria-checked={isActive}
            className='express-base__opt'
            onClick={() => onSelect(d.type)}
            style={isActive ? { background: d.accent, color: onAccent[d.type] } : undefined}
          >
            {d.label}
          </button>
        )
      })}
    </div>
  )
}
