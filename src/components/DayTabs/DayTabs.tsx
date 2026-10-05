import type { Day } from "../../types/index.types";
import { onAccent } from "../../constants/colors";
import "./DayTabs.scss";

interface Props {
  days: Day[];
  activeDay: number;
  onSelect: (index: number) => void;
}

export function DayTabs({ days, activeDay, onSelect }: Props) {
  return (
    <div className="day-tabs">
      {days.map((d, i) => {
        const isActive = activeDay === i;
        return (
          <button
            key={d.id}
            onClick={() => onSelect(i)}
            className="day-tabs__btn"
            aria-pressed={isActive}
            aria-label={d.label}
            style={isActive ? { background: d.accent, color: onAccent[d.type] } : undefined}
          >
            {d.label.split(" ")[0]}
          </button>
        );
      })}
    </div>
  );
}
