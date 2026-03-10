import { useState } from "react";
import { phases } from "./data/phases";
import { Header } from "./components/Header/Header";
import { PhaseTabs } from "./components/PhaseTabs/PhaseTabs";
import { SectionTabs } from "./components/SectionTabs/SectionTabs";
import { CaliLegend } from "./components/CaliLegend/CaliLegend";
import { ExerciseCard } from "./components/ExerciseCard/ExerciseCard";
import "./App.scss";

export default function App() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [activeExercise, setActiveExercise] = useState<number | null>(null);

  const phase = phases[activePhase];
  const section = phase.sections[activeSection];
  const isCali = activeSection === 1;
  const accentColor = isCali ? "#2ecc71" : phase.accent;

  return (
    <div className="app">
      <Header phase={phase} />

      <PhaseTabs
        phases={phases}
        activePhase={activePhase}
        onSelect={(i) => { setActivePhase(i); setActiveSection(0); setActiveExercise(null); }}
      />

      <div className="app__theme-badge">
        <span style={{ background: `${phase.accent}1a`, color: phase.accent }}>
          {phase.theme}
        </span>
      </div>

      <SectionTabs
        phase={phase}
        activeSection={activeSection}
        onSelect={(i) => { setActiveSection(i); setActiveExercise(null); }}
      />

      {isCali && <CaliLegend />}

      <div className="app__count">
        <span>{section.exercises.length} exercices</span>
      </div>

      <div className="app__list">
        {section.exercises.map((ex, i) => {
          const exKey = `p${activePhase}-s${activeSection}-${ex.name.replace(/\s+/g, "_")}`;
          return (
            <ExerciseCard
              key={exKey}
              ex={{ ...ex, index: i + 1 }}
              phase={phase}
              accentColor={accentColor}
              exKey={exKey}
              isOpen={activeExercise === i}
              onClick={() => setActiveExercise(activeExercise === i ? null : i)}
            />
          );
        })}
      </div>

      <div className="app__footer">
        {phase.label} · {phase.theme}
      </div>
    </div>
  );
}
