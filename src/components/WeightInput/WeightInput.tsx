import { useState } from "react";
import "./WeightInput.scss";

interface Props {
  exKey: string;
  accentColor: string;
  defaultWeight?: number;
  assistedWeight?: boolean;
}

export function WeightInput({ exKey, accentColor, defaultWeight, assistedWeight }: Props) {
  const storageKey = `weight:${exKey}`;
  const [value, setValue] = useState(() => localStorage.getItem(storageKey) ?? "");
  const [saved, setSaved] = useState(false);

  const handleSave = (val: string) => {
    setValue(val);
    localStorage.setItem(storageKey, val);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  console.log('test', {value});
  

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
