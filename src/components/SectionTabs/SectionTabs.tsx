import type { Phase } from "../../types/index.types";
import "./SectionTabs.scss";

interface Props {
  phase: Phase;
  activeSection: number;
  onSelect: (index: number) => void;
}

export function SectionTabs({ phase, activeSection, onSelect }: Props) {
  return (
    <div className="section-tabs">
      {phase.sections.map((s, i) => {
        const isActive = activeSection === i;
        const activeColor = i === 0 ? phase.accent : "#2ecc71";
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className="section-tabs__btn"
            style={{
              border: `2px solid ${isActive ? activeColor : "transparent"}`,
              background: isActive ? `${activeColor}1a` : "#181b25",
              color: isActive ? activeColor : "#555",
            }}
          >
            <div>{s.icon} {s.type}</div>
            {s.tag && <div className="section-tabs__tag">{s.tag}</div>}
          </button>
        );
      })}
    </div>
  );
}
