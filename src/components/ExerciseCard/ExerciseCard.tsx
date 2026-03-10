import { useState } from "react";
import type { Exercise, Phase } from "../../types/index.types";
import { muscleColors, catColors } from "../../constants/colors";
import { WeightInput } from "../WeightInput/WeightInput";
import "./ExerciseCard.scss";

interface Props {
  ex: Exercise & { index: number };
  accentColor: string;
  phase: Phase;
  isOpen: boolean;
  onClick: () => void;
  exKey: string;
}

export function ExerciseCard({ ex, accentColor, phase, isOpen, onClick, exKey }: Props) {
  const [imgOk, setImgOk] = useState(true);
  const catColor = (ex.cat && catColors[ex.cat]) || accentColor;

  return (
    <div
      className="exercise-card"
      style={{
        border: `1.5px solid ${isOpen ? accentColor : "#2a2d3a"}`,
        boxShadow: isOpen ? `0 4px 24px ${accentColor}28` : "none",
      }}
    >
      <button onClick={onClick} className="exercise-card__header">
        <div
          className="exercise-card__index"
          style={{
            background: isOpen ? accentColor : `${accentColor}20`,
            color: isOpen ? "#fff" : accentColor,
          }}
        >
          {ex.index}
        </div>
        <div className="exercise-card__meta">
          <div className="exercise-card__title-row">
            <span className="exercise-card__name">{ex.name}</span>
            {ex.cat && (
              <span
                className="exercise-card__cat"
                style={{
                  background: `${catColor}22`,
                  color: catColor,
                  border: `1px solid ${catColor}40`,
                }}
              >
                {ex.cat}
              </span>
            )}
          </div>
          <div className="exercise-card__series-info">{ex.series} · Repos {ex.rest}</div>
        </div>
        <div
          className="exercise-card__chevron"
          style={{
            color: accentColor,
            transform: isOpen ? "rotate(180deg)" : "none",
          }}
        >
          ▾
        </div>
      </button>

      {isOpen && (
        <div className="exercise-card__body">
          <div className="exercise-card__image-wrap">
            {imgOk ? (
              <img
                src={ex.img}
                alt={ex.name}
                onError={() => setImgOk(false)}
                className="exercise-card__image"
              />
            ) : (
              <div
                className="exercise-card__image-fallback"
                style={{
                  background: `linear-gradient(135deg, ${phase.color}55, ${accentColor}22)`,
                  color: accentColor,
                }}
              >
                <div className="exercise-card__image-fallback-icon">🏋️</div>
                <div className="exercise-card__image-fallback-name">{ex.name}</div>
              </div>
            )}
            <div className="exercise-card__series-badge" style={{ background: accentColor }}>
              {ex.series}
            </div>
          </div>

          <div className="exercise-card__content">
            <div className="exercise-card__muscles">
              {ex.muscles.map((m, j) => (
                <span
                  key={j}
                  className="exercise-card__muscle"
                  style={{
                    background: `${muscleColors[m] || "#555"}28`,
                    color: muscleColors[m] || "#aaa",
                    border: `1px solid ${muscleColors[m] || "#555"}45`,
                  }}
                >
                  {m}
                </span>
              ))}
            </div>

            <div
              className="exercise-card__desc"
              style={{ borderLeft: `3px solid ${accentColor}` }}
            >
              {ex.desc}
            </div>

            <div className="exercise-card__tips-title" style={{ color: accentColor }}>
              ✦ Points clés
            </div>
            {ex.tips.map((tip, j) => (
              <div key={j} className="exercise-card__tip">
                <span className="exercise-card__tip-arrow" style={{ color: accentColor }}>›</span>
                <span>{tip}</span>
              </div>
            ))}

            {ex.hasWeight && <WeightInput exKey={exKey} accentColor={accentColor} />}
          </div>
        </div>
      )}
    </div>
  );
}
