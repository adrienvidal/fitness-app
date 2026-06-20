import { WorkoutCalendar } from "../WorkoutCalendar/WorkoutCalendar";
import type { DayType } from "../../types/index.types";
import "./SidePanel.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  workoutLog: Record<string, DayType>;
  onSignOut: () => void;
  isGuest?: boolean;
  onSelectDate?: (dateStr: string) => void;
}

const IconX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const IconSun = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const IconMoon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

export function SidePanel({ isOpen, onClose, theme, onToggleTheme, workoutLog, onSignOut, isGuest, onSelectDate }: Props) {
  return (
    <>
      <div
        className={`side-panel__backdrop ${isOpen ? "side-panel__backdrop--visible" : ""}`}
        onClick={onClose}
      />
      <div className={`side-panel ${isOpen ? "side-panel--open" : ""}`}>
        <div className="side-panel__header">
          <button className="side-panel__close" onClick={onClose} aria-label="Fermer le menu">
            <IconX />
          </button>
        </div>

        <div className="side-panel__content">
          <div className="side-panel__section">
            <span className="side-panel__label">Thème</span>
            <button
              className="side-panel__theme-toggle"
              onClick={onToggleTheme}
              aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
            >
              <span className="side-panel__theme-icon">
                {theme === "dark" ? <IconSun /> : <IconMoon />}
              </span>
              <span>{theme === "dark" ? "Mode clair" : "Mode sombre"}</span>
            </button>
          </div>

          <div className="side-panel__section">
            <span className="side-panel__label">Historique</span>
            <WorkoutCalendar workoutLog={workoutLog} onSelectDate={onSelectDate} />
          </div>

          {!isGuest && (
            <div className="side-panel__section side-panel__section--bottom">
              <button className="side-panel__signout" onClick={onSignOut}>
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
