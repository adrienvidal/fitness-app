import type { Phase } from "../../types/index.types";
import "./Header.scss";

interface Props {
  phase: Phase;
}

export function Header({ phase }: Props) {
  return (
    <div
      className="header"
      style={{ background: `linear-gradient(135deg, ${phase.color} 0%, ${phase.accent} 100%)` }}
    >
      <div className="header__label">
        Programme 12 Semaines · Haut du Corps + Callisthénie
      </div>
      <div className="header__title">Guide des Exercices</div>
      <div className="header__subtitle">41 ans · 75 kg · 1m75 · 5 séances/sem</div>
    </div>
  );
}
