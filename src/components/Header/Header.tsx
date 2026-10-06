import "./Header.scss";

interface Props {
  onOpenPanel: () => void;
  onOpenTimer: () => void;
}

export function Header({ onOpenPanel, onOpenTimer }: Props) {
  return (
    <header className="header">
      <span className="header__brand">FitnessPal</span>
      <div className="header__actions">
        <button className="header__btn" onClick={onOpenTimer} aria-label="Minuteur de repos">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="13" r="8" />
            <path d="M12 9v4l2.5 2M9 2h6" />
          </svg>
        </button>
        <button className="header__btn" onClick={onOpenPanel} aria-label="Ouvrir le menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h10" />
          </svg>
        </button>
      </div>
    </header>
  );
}
