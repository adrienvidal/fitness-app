import { catColors } from "../../constants/colors";
import "./CaliLegend.scss";

export function CaliLegend() {
  return (
    <div className="cali-legend">
      <div className="cali-legend__title">
        Catégories — logique de progression
      </div>
      <div className="cali-legend__badges">
        {Object.entries(catColors).map(([cat, color]) => (
          <span
            key={cat}
            className="cali-legend__badge"
            style={{
              background: `${color}18`,
              color,
              border: `1px solid ${color}35`,
            }}
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}
