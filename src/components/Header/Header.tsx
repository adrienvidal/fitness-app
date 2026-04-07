import type { Day } from "../../types/index.types";
import "./Header.scss";

interface Props {
  day: Day;
}

export function Header({ day }: Props) {
  return (
    <div
      className="header"
      style={{ background: `linear-gradient(135deg, ${day.color} 0%, ${day.accent} 100%)` }}
    >
      <div className="header__label">
        Programme Upper Body + Callisthénie
      </div>
      <div className="header__title">Guide des Exercices</div>
      <div className="header__subtitle">41 ans · 75 kg · 1m75</div>
    </div>
  );
}
