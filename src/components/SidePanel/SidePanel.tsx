import "./SidePanel.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export function SidePanel({ isOpen, onClose, theme, onToggleTheme }: Props) {
  return (
    <>
      <div
        className={`side-panel__backdrop ${isOpen ? "side-panel__backdrop--visible" : ""}`}
        onClick={onClose}
      />
      <div className={`side-panel ${isOpen ? "side-panel--open" : ""}`}>
        <div className="side-panel__header">
          <button className="side-panel__close" onClick={onClose} aria-label="Fermer le menu">
            ✕
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
              <span className="side-panel__theme-icon">{theme === "dark" ? "☀️" : "🌙"}</span>
              <span>{theme === "dark" ? "Mode clair" : "Mode sombre"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
