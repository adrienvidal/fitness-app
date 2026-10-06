import { useState } from "react";
import type { WeightSyncStatus } from "../../hooks/useExerciseWeight";
import { formatKg, parseKg, stepWeight } from "../../utils/weight";
import "./WeightInput.scss";

const STEP_KG = 2.5;

interface Props {
  weight: string;
  status: WeightSyncStatus;
  defaultWeight?: number;
  assistedWeight?: boolean;
  readOnly: boolean;
  onChange: (value: string) => void;
  onRetry: () => void;
}

export function WeightInput({ weight, status, defaultWeight, assistedWeight, readOnly, onChange, onRetry }: Props) {
  const [draft, setDraft] = useState<string | null>(null);
  const current = parseKg(weight);
  const display = current !== null ? formatKg(current) : "";

  function step(delta: number) {
    onChange(String(stepWeight(current ?? defaultWeight ?? 0, delta)));
  }

  function commitDraft() {
    if (draft === null) return;
    const kg = parseKg(draft);
    if (kg !== null && kg >= 0) onChange(String(kg));
    if (draft.trim() === "") onChange("");
    setDraft(null);
  }

  if (readOnly) {
    return (
      <div className="weight-input">
        <div className="weight-input__label">
          <span>{assistedWeight ? "Assistance conseillée" : "Charge conseillée"}</span>
          <span className="weight-input__status">
            <IconLock /> Lecture seule
          </span>
        </div>
        <div className="weight-input__value weight-input__value--static">
          {defaultWeight !== undefined ? formatKg(defaultWeight) : "–"}
          <span>kg</span>
        </div>
        <p className="weight-input__hint">
          {assistedWeight && "Moins d'assistance = plus difficile. "}
          Connecte-toi pour noter la tienne.
        </p>
      </div>
    );
  }

  return (
    <div className="weight-input">
      <div className="weight-input__label">
        <span>{assistedWeight ? "Mon assistance" : "Ma charge"}</span>
        {status === "saved" && (
          <span className="weight-input__status weight-input__status--ok">
            <IconCheck /> Enregistrée
          </span>
        )}
        {status === "error" && (
          <span className="weight-input__status weight-input__status--err">Pas synchronisée</span>
        )}
      </div>

      <div className="weight-input__stepper">
        <button className="weight-input__step" onClick={() => step(-STEP_KG)} aria-label="Retirer 2,5 kg">−</button>
        <label className="weight-input__value">
          <input
            type="text"
            inputMode="decimal"
            value={draft ?? display}
            placeholder={defaultWeight !== undefined ? formatKg(defaultWeight) : "0"}
            onFocus={() => setDraft(display)}
            onChange={e => setDraft(e.target.value)}
            onBlur={commitDraft}
            onKeyDown={e => e.key === "Enter" && e.currentTarget.blur()}
            aria-label={assistedWeight ? "Assistance en kg" : "Charge en kg"}
          />
          <span>kg</span>
        </label>
        <button className="weight-input__step" onClick={() => step(STEP_KG)} aria-label="Ajouter 2,5 kg">+</button>
      </div>

      {status === "error" ? (
        <div className="weight-input__error" role="alert">
          Pas de réseau. {display || "La charge"} kg est gardé sur ce téléphone mais pas encore dans ton compte.{" "}
          <button onClick={onRetry}>Réessayer</button>
        </div>
      ) : (
        <p className="weight-input__hint">±2,5 kg · touche le chiffre pour le saisir</p>
      )}
    </div>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
