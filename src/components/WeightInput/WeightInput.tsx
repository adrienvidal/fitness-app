import { useState } from "react";
import { useExerciseWeight } from "../../hooks/useExerciseWeight";
import "./WeightInput.scss";

interface Props {
  exKey: string;
  accentColor: string;
  defaultWeight?: number;
  assistedWeight?: boolean;
  userId: string | null;
}

const IconDumbbell = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 4v16M18 4v16M6 8H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2M18 8h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M6 12h12"/>
  </svg>
)

const IconHands = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/>
    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/>
    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/>
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
  </svg>
)

export function WeightInput({ exKey, accentColor, defaultWeight, assistedWeight, userId }: Props) {
  const { weight: value, saveWeight } = useExerciseWeight(exKey, userId);
  const [saved, setSaved] = useState(false);

  const handleSave = (val: string) => {
    saveWeight(val, userId ?? "");
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div
      className="weight-input"
      style={{
        background: `${accentColor}0f`,
        border: `1px solid ${accentColor}30`,
      }}
    >
      <div className="weight-input__label" style={{ color: accentColor }}>
        {assistedWeight ? <IconHands /> : <IconDumbbell />}
        {assistedWeight ? 'Mon assistance' : 'Mon poids utilisé'}
      </div>
      <div className="weight-input__row">
        <input
          type="number"
          placeholder={defaultWeight ? `ex: ${defaultWeight}` : 'ex: 60'}
          value={value}
          onChange={e => handleSave(e.target.value)}
          className="weight-input__field"
          style={{ border: `1.5px solid ${value ? accentColor : "var(--border-primary)"}` }}
        />
        <span className="weight-input__unit">kg</span>
        {saved && (
          <span className="weight-input__saved" aria-label="Enregistré">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </span>
        )}
      </div>
      {value && (
        <div className="weight-input__info" style={{ color: accentColor }}>
          {assistedWeight ? 'Assistance enregistrée' : 'Charge enregistrée'} : <strong>{value} kg</strong>
        </div>
      )}
    </div>
  );
}
