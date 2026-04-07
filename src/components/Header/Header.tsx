import type { Day } from "../../types/index.types";
import "./Header.scss";

interface Props {
  day: Day;
  theme: "dark" | "light";
  onOpenPanel: () => void;
}

const coolGradients: Record<string, string> = {
  push:   "linear-gradient(135deg, #1a3a5c 0%, #4a9eff 100%)",
  pull:   "linear-gradient(135deg, #1a4a3a 0%, #3acfaa 100%)",
  cali:   "linear-gradient(135deg, #2a1a5c 0%, #7a6aff 100%)",
  cardio: "linear-gradient(135deg, #1a4a5c 0%, #3abfcf 100%)",
};

export function Header({ day, theme, onOpenPanel }: Props) {
  const background = theme === "dark"
    ? `linear-gradient(135deg, ${day.color} 0%, ${day.accent} 100%)`
    : coolGradients[day.type];

  return (
    <div
      className="header"
      style={{ background }}
    >
      <button
        className="header__menu-btn"
        onClick={onOpenPanel}
        aria-label="Ouvrir le menu"
      >
        ☰
      </button>
      <div className="header__title">FitnessPal</div>
      <div className="header__subtitle">Adrien</div>
    </div>
  );
}
