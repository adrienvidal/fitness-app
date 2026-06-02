import type { DayType } from "../../types/index.types";
import "./LogSessionModal.scss";

const DAY_TYPES: { type: DayType; label: string; color: string }[] = [
  { type: "push", label: "PUSH", color: "#FF6B35" },
  { type: "pull", label: "PULL", color: "#4A90D9" },
  { type: "legs", label: "LEGS", color: "#9B59B6" },
  { type: "fullbody", label: "FULL BODY", color: "#F1C40F" },
  { type: "cardio", label: "CARDIO", color: "#7b00ce" },
];

interface Props {
  dateStr: string;
  currentType: DayType | null;
  onSave: (dateStr: string, dayType: DayType) => void;
  onClose: () => void;
}

export function LogSessionModal({ dateStr, currentType, onSave, onClose }: Props) {
  const date = new Date(dateStr + "T12:00:00");
  const dateLabel = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="log-session-modal__backdrop" onClick={onClose}>
      <div className="log-session-modal" onClick={e => e.stopPropagation()}>
        <button className="log-session-modal__close" onClick={onClose}>✕</button>

        <p className="log-session-modal__title">
          {currentType ? "Modifier la séance" : "Ajouter une séance"}
        </p>
        <p className="log-session-modal__date">{dateLabel}</p>

        <div className="log-session-modal__types">
          {DAY_TYPES.map(({ type, label, color }) => {
            const isSelected = currentType === type;
            return (
              <button
                key={type}
                className={`log-session-modal__type-btn${isSelected ? " log-session-modal__type-btn--selected" : ""}`}
                style={isSelected
                  ? { background: color, borderColor: color, color: "#fff" }
                  : { borderColor: `${color}60`, color }
                }
                onClick={() => onSave(dateStr, type)}
              >
                {label}
              </button>
            );
          })}
        </div>

        <button className="log-session-modal__cancel" onClick={onClose}>
          Annuler
        </button>
      </div>
    </div>
  );
}
