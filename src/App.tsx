import { useState } from "react";
import { days } from "./data/days";
import { Header } from "./components/Header/Header";
import { DayTabs } from "./components/DayTabs/DayTabs";
import { CaliLegend } from "./components/CaliLegend/CaliLegend";
import { ExerciseCard } from "./components/ExerciseCard/ExerciseCard";
import "./App.scss";

export default function App() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeExercise, setActiveExercise] = useState<number | null>(null);

  const day = days[activeDay];

  return (
    <div className="app">
      <Header day={day} />

      <DayTabs
        days={days}
        activeDay={activeDay}
        onSelect={(i) => { setActiveDay(i); setActiveExercise(null); }}
      />

      {day.type === "cali" && <CaliLegend />}

      <div className="app__count">
        <span>{day.exercises.length} exercices</span>
      </div>

      <div className="app__list">
        {day.exercises.map((ex, i) => {
          const exKey = `d${activeDay}-${ex.name.replace(/\s+/g, "_")}`;
          return (
            <ExerciseCard
              key={exKey}
              ex={{ ...ex, index: i + 1 }}
              dayColor={day.color}
              accentColor={day.accent}
              exKey={exKey}
              isOpen={activeExercise === i}
              onClick={() => setActiveExercise(activeExercise === i ? null : i)}
            />
          );
        })}
      </div>

      <div className="app__footer">
        Jour {day.id} · {day.label}
      </div>
    </div>
  );
}
