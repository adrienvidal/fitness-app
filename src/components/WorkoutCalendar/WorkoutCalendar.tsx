import { useState } from "react";
import type { DayType } from "../../types/index.types";
import "./WorkoutCalendar.scss";

const DAY_TYPE_COLOR: Record<DayType, string> = {
  push: "#FF6B35",
  pull: "#4A90D9",
  cali: "#2ECC71",
  cardio: "#00BCD4",
};

const DAY_TYPE_LABEL: Record<DayType, string> = {
  push: "PUSH",
  pull: "PULL",
  cali: "CALI",
  cardio: "CARDIO",
};

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];

interface Props {
  workoutLog: Record<string, DayType>;
}

export function WorkoutCalendar({ workoutLog }: Props) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7; // lundi = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const monthLabel = viewDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div className="workout-calendar">
      <div className="workout-calendar__nav">
        <button onClick={() => setViewDate(new Date(year, month - 1, 1))} aria-label="Mois précédent">‹</button>
        <span className="workout-calendar__month">{monthLabel}</span>
        <button onClick={() => setViewDate(new Date(year, month + 1, 1))} aria-label="Mois suivant">›</button>
      </div>

      <div className="workout-calendar__grid">
        {WEEKDAYS.map((d, i) => (
          <div key={i} className="workout-calendar__weekday">{d}</div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const workout = workoutLog[dateStr];
          const isToday = dateStr === todayStr;
          return (
            <div
              key={dateStr}
              className={`workout-calendar__day${isToday ? " workout-calendar__day--today" : ""}`}
            >
              <span className="workout-calendar__day-num">{day}</span>
              {workout && (
                <span
                  className="workout-calendar__dot"
                  style={{ backgroundColor: DAY_TYPE_COLOR[workout] }}
                  title={DAY_TYPE_LABEL[workout]}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="workout-calendar__legend">
        {(Object.keys(DAY_TYPE_COLOR) as DayType[]).map(type => (
          <span key={type} className="workout-calendar__legend-item">
            <span className="workout-calendar__legend-dot" style={{ backgroundColor: DAY_TYPE_COLOR[type] }} />
            {DAY_TYPE_LABEL[type]}
          </span>
        ))}
      </div>
    </div>
  );
}
