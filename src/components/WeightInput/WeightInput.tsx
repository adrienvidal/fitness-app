import { useState, useEffect } from "react";
import "./WeightInput.scss";

interface Props {
  exKey: string;
  accentColor: string;
}

export function WeightInput({ exKey, accentColor }: Props) {
  const storageKey = `weight:${exKey}`;
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res = await (window as any).storage.get(storageKey);
        if (res) setValue(res.value);
      } catch {}
    };
    load();
  }, [storageKey]);

  const handleSave = async (val: string) => {
    setValue(val);
    setSaved(false);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (window as any).storage.set(storageKey, val);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch {}
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
        🏋️ Mon poids utilisé
      </div>
      <div className="weight-input__row">
        <input
          type="number"
          placeholder="ex: 60"
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
          Charge enregistrée : <strong>{value} kg</strong>
        </div>
      )}
    </div>
  );
}
