import { useState } from "react";
import type { DayType } from "../../types/index.types";
import { days } from "../../data/days";
import "./LogSessionModal.scss";

interface Props {
  dateStr: string;
  currentType: DayType | null;
  onSave: (dateStr: string, dayType: DayType) => void;
  onRemove: (dateStr: string) => void;
  onClose: () => void;
}

export function LogSessionModal({ dateStr, currentType, onSave, onRemove, onClose }: Props) {
  const [selected, setSelected] = useState<DayType | null>(currentType);
  const dateLabel = new Date(dateStr + "T12:00:00").toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="log-session__scrim" onClick={onClose}>
      <div
        className="log-session"
        role="dialog"
        aria-modal="true"
        aria-labelledby="log-session-title"
        onClick={e => e.stopPropagation()}
      >
        <div className="log-session__grab" aria-hidden="true" />
        <div>
          <p className="log-session__date">{dateLabel}</p>
          <h2 id="log-session-title" className="log-session__title">
            {currentType ? "Modifier la séance" : "Ajouter une séance"}
          </h2>
        </div>

        <div className="log-session__types" role="radiogroup" aria-label="Type de séance">
          {days.map(d => (
            <button
              key={d.type}
              role="radio"
              aria-checked={selected === d.type}
              className="log-session__type"
              onClick={() => setSelected(d.type)}
            >
              <i style={{ background: d.accent }} />
              {d.label}
              {selected === d.type && <span>Sélectionné</span>}
            </button>
          ))}
        </div>

        <div className="log-session__actions">
          <button className="log-session__btn log-session__btn--ghost" onClick={onClose}>Annuler</button>
          <button
            className="log-session__btn"
            disabled={selected === null || selected === currentType}
            onClick={() => selected && onSave(dateStr, selected)}
          >
            Enregistrer
          </button>
        </div>

        {currentType && (
          <button className="log-session__remove" onClick={() => onRemove(dateStr)}>
            Retirer cette séance
          </button>
        )}
      </div>
    </div>
  );
}
