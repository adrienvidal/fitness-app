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
        {assistedWeight ? '🤝 Mon assistance' : '🏋️ Mon poids utilisé'}
      </div>
      <div className="weight-input__row">
        <input
          type="number"
          placeholder={defaultWeight ? `ex: ${defaultWeight}` : 'ex: 60'}
          value={value}
          onChange={e => handleSave(e.target.value)}
          className="weight-input__field"
          style={{ border: `1.5px solid ${value ? accentColor : "#333"}` }}
        />
        <span className="weight-input__unit">kg</span>
        {saved && <span className="weight-input__saved">✅</span>}
      </div>
      {value && (
        <div className="weight-input__info" style={{ color: accentColor }}>
          {assistedWeight ? 'Assistance enregistrée' : 'Charge enregistrée'} : <strong>{value} kg</strong>
        </div>
      )}
    </div>
  );
}
