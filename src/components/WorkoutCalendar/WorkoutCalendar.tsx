import { useState } from "react";
import type { DayType } from "../../types/index.types";
import { days } from "../../data/days";
import { onAccent } from "../../constants/colors";
import "./WorkoutCalendar.scss";

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];
const accentByType = Object.fromEntries(days.map(d => [d.type, d.accent])) as Record<DayType, string>;

interface Props {
  workoutLog: Record<string, DayType>;
  onSelectDate?: (dateStr: string) => void;
}

function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function WorkoutCalendar({ workoutLog, onSelectDate }: Props) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7; // lundi = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = toDateStr(today.getFullYear(), today.getMonth(), today.getDate());
  const monthPrefix = toDateStr(year, month, 1).slice(0, 8);
  const sessionsThisMonth = Object.keys(workoutLog).filter(d => d.startsWith(monthPrefix)).length;
  const monthLabel = viewDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  return (
    <div className="workout-calendar">
      <div className="workout-calendar__nav">
        <span className="workout-calendar__month">{monthLabel}</span>
        <span className="workout-calendar__arrows">
          <button onClick={() => setViewDate(new Date(year, month - 1, 1))} aria-label="Mois précédent">
            <IconChevron direction="left" />
          </button>
          <button onClick={() => setViewDate(new Date(year, month + 1, 1))} aria-label="Mois suivant">
            <IconChevron direction="right" />
          </button>
        </span>
      </div>

      <div className="workout-calendar__grid">
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="workout-calendar__weekday">{d}</span>
        ))}
        {Array.from({ length: startOffset }, (_, i) => <span key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateStr = toDateStr(year, month, day);
          const workout = workoutLog[dateStr];
          const isFuture = dateStr > todayStr;
          const classes = ["workout-calendar__day"];
          if (dateStr === todayStr) classes.push("workout-calendar__day--today");
          if (isFuture) classes.push("workout-calendar__day--future");
          const style = workout ? { background: accentByType[workout], color: onAccent[workout] } : undefined;

          if (!onSelectDate || isFuture) {
            return <span key={dateStr} className={classes.join(" ")} style={style}>{day}</span>;
          }
          return (
            <button
              key={dateStr}
              className={classes.join(" ")}
              style={style}
              onClick={() => onSelectDate(dateStr)}
              aria-label={workout ? `${day}, séance ${workout}` : `${day}, ajouter une séance`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="workout-calendar__summary">
        <span>Ce mois-ci</span>
        <b>{sessionsThisMonth} séance{sessionsThisMonth > 1 ? "s" : ""}</b>
      </div>

      <div className="workout-calendar__legend">
        {days.map(d => (
          <span key={d.type}>
            <i style={{ background: d.accent }} />
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function IconChevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={direction === "left" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
    </svg>
  );
}
