import type { Day } from "../../types/index.types";
import "./DayTabs.scss";

interface Props {
  days: Day[];
  activeDay: number;
  onSelect: (index: number) => void;
}

export function DayTabs({ days, activeDay, onSelect }: Props) {
  return (
    <div className="day-tabs">
      {days.map((d, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="day-tabs__btn"
          style={{
            border: `2px solid ${activeDay === i ? d.accent : "transparent"}`,
            background: activeDay === i ? `${d.accent}1a` : "var(--bg-tab)",
            color: activeDay === i ? d.accent : "#555",
          }}
        >
          <div className="day-tabs__emoji">{d.emoji}</div>
          <div className="day-tabs__num">J{d.id}</div>
          <div className="day-tabs__label">{d.label}</div>
        </button>
      ))}
    </div>
  );
}
