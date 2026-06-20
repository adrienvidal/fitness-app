import type { Day } from "../../types/index.types";
import "./Header.scss";

interface Props {
  day: Day;
  theme: "dark" | "light";
  onOpenPanel: () => void;
  onOpenTimer: () => void;
}

const coolGradients: Record<string, string> = {
  push:     "linear-gradient(135deg, #1a3a5c 0%, #4a9eff 100%)",
  pull:     "linear-gradient(135deg, #1a4a3a 0%, #3acfaa 100%)",
  legs:     "linear-gradient(135deg, #2a1a5c 0%, #9B59B6 100%)",
  fullbody: "linear-gradient(135deg, #2a2000 0%, #F1C40F 100%)",
  cardio:   "linear-gradient(135deg, #1a4a5c 0%, #3abfcf 100%)",
};

export function Header({ day, theme, onOpenPanel, onOpenTimer }: Props) {
  const background = theme === "dark"
    ? `linear-gradient(135deg, ${day.color} 0%, ${day.accent} 100%)`
    : coolGradients[day.type];

  return (
    <div className="header" style={{ background }}>
      <button className="header__timer-btn" onClick={onOpenTimer} aria-label="Timer de repos">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      </button>
      <button className="header__menu-btn" onClick={onOpenPanel} aria-label="Ouvrir le menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <div className="header__title">FitnessPal</div>
      <div className="header__subtitle">
        <span aria-hidden="true">{day.emoji}</span> {day.label}
      </div>
    </div>
  );
}
