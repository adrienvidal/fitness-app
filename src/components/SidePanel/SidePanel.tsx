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
  onSignIn: () => void;
  isGuest: boolean;
  onSelectDate?: (dateStr: string) => void;
}

export function SidePanel({ isOpen, onClose, theme, onToggleTheme, workoutLog, onSignOut, onSignIn, isGuest, onSelectDate }: Props) {
  const isEmpty = Object.keys(workoutLog).length === 0;

  return (
    <>
      <div
        className={`side-panel__backdrop${isOpen ? " side-panel__backdrop--visible" : ""}`}
        onClick={onClose}
      />
      <aside className={`side-panel${isOpen ? " side-panel--open" : ""}`} aria-hidden={!isOpen} inert={!isOpen}>
        <div className="side-panel__header">
          <h2 className="side-panel__title">Menu</h2>
          <button className="side-panel__close" onClick={onClose} aria-label="Fermer le menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <section>
          <h3 className="side-panel__label">Thème</h3>
          <div className="side-panel__segmented" role="group" aria-label="Thème">
            <button aria-pressed={theme === "dark"} onClick={theme === "dark" ? undefined : onToggleTheme}>Sombre</button>
            <button aria-pressed={theme === "light"} onClick={theme === "light" ? undefined : onToggleTheme}>Clair</button>
          </div>
        </section>

        <section>
          <h3 className="side-panel__label">Historique</h3>
          {isEmpty ? (
            <div className="side-panel__empty">
              <b>Aucune séance pour l'instant</b>
              {isGuest
                ? "En mode invité, tes séances ne sont pas gardées. Connecte-toi pour garder ton historique."
                : "Termine ta première séance : elle apparaîtra ici, à sa date, dans la couleur du jour."}
            </div>
          ) : (
            <WorkoutCalendar workoutLog={workoutLog} onSelectDate={onSelectDate} />
          )}
        </section>

        <div className="side-panel__account">
          {isGuest ? (
            <>
              <span>Mode invité</span>
              <button className="side-panel__account-btn" onClick={onSignIn}>Se connecter</button>
            </>
          ) : (
            <>
              <span>Connecté avec Google</span>
              <button className="side-panel__account-btn" onClick={onSignOut}>Se déconnecter</button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
