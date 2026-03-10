import type { Phase } from "../../types/index.types";
import "./PhaseTabs.scss";

interface Props {
  phases: Phase[];
  activePhase: number;
  onSelect: (index: number) => void;
}

export function PhaseTabs({ phases, activePhase, onSelect }: Props) {
  return (
    <div className="phase-tabs">
      {phases.map((p, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="phase-tabs__btn"
          style={{
            border: `2px solid ${activePhase === i ? p.accent : "transparent"}`,
            background: activePhase === i ? `${p.accent}1a` : "#181b25",
            color: activePhase === i ? p.accent : "#555",
          }}
        >
          <div className="phase-tabs__emoji">{p.emoji}</div>
          <div>{p.label}</div>
          <div className="phase-tabs__sub">{p.sub}</div>
        </button>
      ))}
    </div>
  );
}
