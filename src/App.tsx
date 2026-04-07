import { useState } from "react";
import { days } from "./data/days";
import { Header } from "./components/Header/Header";
import { DayTabs } from "./components/DayTabs/DayTabs";
import { CaliLegend } from "./components/CaliLegend/CaliLegend";
import { ExerciseCard } from "./components/ExerciseCard/ExerciseCard";
import { SessionProgress } from "./components/SessionProgress/SessionProgress";
import "./App.scss";

export default function App() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const day = days[activeDay];

  function handleDaySelect(i: number) {
    setActiveDay(i);
    setActiveExercise(null);
    setCompletedExercises(new Set());
  }

  function toggleComplete(key: string) {
    setCompletedExercises(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="app">
      <Header day={day} />

      <DayTabs
        days={days}
        activeDay={activeDay}
        onSelect={handleDaySelect}
      />

      {day.type === "cali" && <CaliLegend />}

      <SessionProgress
        completed={completedExercises.size}
        total={day.exercises.length}
        accentColor={day.accent}
      />

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
              isCompleted={completedExercises.has(exKey)}
              onToggleComplete={() => toggleComplete(exKey)}
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
