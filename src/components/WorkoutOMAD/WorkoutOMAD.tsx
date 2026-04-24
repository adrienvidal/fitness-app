import { useState } from "react";
import "./WorkoutOMAD.scss";

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const timeline = [
  { time: "6h30", label: "Réveil", icon: "⏰", color: "#4b5563", type: "neutral" },
  { time: "7h00", label: "Shake pré-workout", icon: "🥛", color: "#60efff", type: "eat", detail: "25g whey + eau · ~100 kcal · protège le muscle pendant l'effort" },
  { time: "7h15", label: "Musculation 1h", icon: "🏋️", color: "#ff7eb3", type: "sport", detail: "Performance optimale grâce aux acides aminés disponibles" },
  { time: "8h15", label: "Shake post-workout + œufs", icon: "🍳", color: "#f97316", type: "eat", detail: "25g whey + 2 œufs durs · ~280 kcal · fenêtre anabolique maximisée" },
  { time: "9h00", label: "Jeûne long", icon: "⏳", color: "#4b5563", type: "fast", detail: "Café noir / thé vert autorisés. Eau en continu. La phase la plus longue." },
  { time: "18h00", label: "Ouverture fenêtre · Collation", icon: "🥗", color: "#a78bfa", type: "eat", detail: "Collation légère pour ouvrir la fenêtre — skyr, fromage blanc, poignée d'amandes..." },
  { time: "19h30", label: "Repas principal", icon: "🍽️", color: "#e8ff6b", type: "eat", detail: "Gros repas complet : protéines + glucides complexes + légumes" },
  { time: "22h00", label: "Fermeture fenêtre", icon: "🔒", color: "#4b5563", type: "fast", detail: "Début du jeûne jusqu'au lendemain 7h = ~9h de jeûne nocturne + 9h diurne" },
];

const preWorkoutOptions = [
  { name: "Whey vanille + eau froide (25g)", kcal: 100, prot: 22, note: "Le classique, rapide à préparer" },
  { name: "Whey + café cold brew (25g whey)", kcal: 105, prot: 22, note: "Boost caféine inclus ✓" },
  { name: "EAAs + 5g créatine", kcal: 20, prot: 10, note: "Quasi-jeûne préservé, moins efficace" },
];

const postWorkoutOptions = [
  { name: "Whey (25g) + 2 œufs durs", kcal: 280, prot: 34, note: "Combo optimal : whey rapide + protéine lente des œufs" },
  { name: "Whey (25g) + 3 blancs d'œufs", kcal: 220, prot: 36, note: "Moins de lipides, plus de protéines" },
  { name: "Shake whey seul (25g)", kcal: 100, prot: 22, note: "Si tu n'as pas faim juste après le sport" },
];

const mainMealOptions = [
  {
    name: "Poulet grillé / riz basmati / brocoli",
    items: ["200g blanc de poulet grillé", "150g riz basmati cuit", "200g brocoli vapeur", "1 cs huile d'olive", "Sauce soja + ail + gingembre"],
    kcal: 750, prot: 70,
  },
  {
    name: "Omelette complète / riz / légumes 🥚",
    items: ["3 œufs entiers + 3 blancs en omelette", "150g riz basmati cuit", "200g brocoli + poivrons sautés", "1 cs huile d'olive", "Sauce soja + ail"],
    kcal: 720, prot: 65,
  },
  {
    name: "Bœuf haché / quinoa / courgettes",
    items: ["200g bœuf haché 5%", "120g quinoa cuit", "150g courgette + tomates cerises", "100g lentilles cuites", "Épices + citron"],
    kcal: 800, prot: 68,
  },
  {
    name: "Saumon / patate douce / épinards",
    items: ["200g saumon grillé", "180g patate douce rôtie", "100g épinards sautés", "½ avocat", "Jus de citron + herbes fraîches"],
    kcal: 800, prot: 62,
  },
  {
    name: "Thon / riz complet / haricots verts 🥚",
    items: ["200g thon naturel (2 boîtes)", "2 œufs durs", "150g riz complet cuit", "200g haricots verts", "Vinaigrette légère + câpres"],
    kcal: 760, prot: 76,
  },
];

const postMealOptions = [
  { name: "2 œufs durs + concombre", kcal: 160, prot: 14, note: "Simple, rassasiant, zéro préparation" },
  { name: "Skyr nature + myrtilles", kcal: 160, prot: 18, note: "Doux, facile à digérer" },
  { name: "Fromage blanc 0% + whey (20g)", kcal: 200, prot: 30, note: "Si les protéines du jour sont insuffisantes" },
  { name: "Omelette blanche (3 blancs)", kcal: 90, prot: 18, note: "Léger, bon avant la fermeture fenêtre" },
  { name: "Rien — repas principal suffisant", kcal: 0, prot: 0, note: "Si tu as bien mangé à 13h" },
];

const tips = [
  { icon: "☕", text: "Café noir avant le sport = légal pendant le jeûne + coupe-faim + performance" },
  { icon: "🥚", text: "Les œufs : source protéinée complète, haute biodisponibilité, pas chers — mets-en partout" },
  { icon: "💧", text: "500ml d'eau dès le réveil avant le shake — réhydratation post-nuit" },
  { icon: "🧂", text: "5g de créatine dans le shake pré-workout : boost force + récupération, zéro impact sur le jeûne" },
  { icon: "⏰", text: "Le shake post-workout + œufs à 8h15 maximise la synthèse protéique sans attendre 13h" },
  { icon: "😴", text: "8h de sommeil = récupération musculaire + régulation cortisol (anti-graisse ventrale)" },
];

export function WorkoutOMAD() {
  const [activeDay, setActiveDay] = useState<number>(0);
  const [selectedPre, setSelectedPre] = useState<number>(0);
  const [selectedPost, setSelectedPost] = useState<number>(0);
  const [selectedMain, setSelectedMain] = useState<number>(0);
  const [selectedCollation, setSelectedCollation] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("timeline");

  const totalKcal =
    preWorkoutOptions[selectedPre].kcal +
    postWorkoutOptions[selectedPost].kcal +
    mainMealOptions[selectedMain].kcal +
    postMealOptions[selectedCollation].kcal;

  const totalProt =
    preWorkoutOptions[selectedPre].prot +
    postWorkoutOptions[selectedPost].prot +
    mainMealOptions[selectedMain].prot +
    postMealOptions[selectedCollation].prot;

  const typeColors: Record<string, string> = { eat: "#e8ff6b", sport: "#ff7eb3", fast: "#4b5563", neutral: "#4b5563" };
  const itemColors: Record<string, string> = { eat: "rgba(232,255,107,0.05)", sport: "rgba(255,126,179,0.05)" };
  const itemBorders: Record<string, string> = { eat: "rgba(232,255,107,0.15)", sport: "rgba(255,126,179,0.15)" };

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      background: "linear-gradient(160deg, #080810 0%, #0f1320 60%, #080810 100%)",
      minHeight: "100vh",
      color: "#f0f0f0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Syne:wght@700;800;900&display=swap');
        .omad * { box-sizing: border-box; margin: 0; padding: 0; }
        .omad button { font-family: inherit; }
        .omad-card { transition: transform 0.2s ease; }
        .omad-card:hover { transform: translateY(-2px); }
        .omad-opt { transition: all 0.18s ease; cursor: pointer; border: none; text-align: left; width: 100%; }
        .omad-opt:hover { filter: brightness(1.08); }
        .omad-tab { cursor: pointer; transition: all 0.18s ease; border: none; }
        .omad-day-btn { cursor: pointer; transition: all 0.15s ease; border: none; }
        @keyframes omadFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .omad-fade { animation: omadFadeUp 0.3s ease forwards; }
        @keyframes omadGlow {
          0%, 100% { box-shadow: 0 0 18px rgba(232,255,107,0.12); }
          50% { box-shadow: 0 0 30px rgba(232,255,107,0.25); }
        }
        .omad-glow { animation: omadGlow 3s ease infinite; }
      `}</style>

      {/* HEADER */}
      <div style={{
        padding: "26px 22px 20px",
        borderBottom: "1px solid rgba(232,255,107,0.1)",
        background: "rgba(232,255,107,0.03)",
      }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <div className="omad-glow" style={{
              width: 46, height: 46,
              background: "linear-gradient(135deg, #e8ff6b, #b8cc00)",
              borderRadius: 13, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 22, flexShrink: 0,
            }}>🏋️</div>
            <div>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 20, fontWeight: 900, color: "#e8ff6b",
                letterSpacing: "-0.5px", lineHeight: 1,
              }}>MUSCLE + FAT LOSS</div>
              <div style={{ fontSize: 11, color: "#4b5563", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>
                18/6 · Muscu matin · Shakes + Œufs · High Protein
              </div>
            </div>
          </div>

          {/* Timeline visuelle */}
          <div style={{
            background: "rgba(255,255,255,0.03)", borderRadius: 14,
            padding: "14px 16px", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16,
          }}>
            <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 10, letterSpacing: 0.5 }}>TIMELINE 24H</div>
            <div style={{ position: "relative", height: 28 }}>
              <div style={{
                position: "absolute", top: "50%", left: 0, right: 0,
                height: 8, background: "rgba(255,255,255,0.06)",
                borderRadius: 4, transform: "translateY(-50%)",
              }} />
              <div style={{ position: "absolute", top: "50%", left: 0, width: "29%", height: 8, background: "rgba(96,239,255,0.2)", borderRadius: "4px 0 0 4px", transform: "translateY(-50%)" }} />
              <div style={{ position: "absolute", top: "50%", left: "29%", width: "2%", height: 8, background: "#60efff", transform: "translateY(-50%)" }} />
              <div style={{ position: "absolute", top: "50%", left: "31%", width: "5%", height: 8, background: "rgba(255,126,179,0.7)", transform: "translateY(-50%)" }} />
              <div style={{ position: "absolute", top: "50%", left: "36%", width: "2%", height: 8, background: "#f97316", transform: "translateY(-50%)" }} />
              <div style={{ position: "absolute", top: "50%", left: "38%", width: "37%", height: 8, background: "rgba(96,239,255,0.2)", transform: "translateY(-50%)" }} />
              <div style={{ position: "absolute", top: "50%", left: "75%", width: "17%", height: 8, background: "linear-gradient(90deg, #e8ff6b88, #e8ff6b)", transform: "translateY(-50%)" }} />
              <div style={{ position: "absolute", top: "50%", left: "92%", width: "8%", height: 8, background: "rgba(96,239,255,0.2)", borderRadius: "0 4px 4px 0", transform: "translateY(-50%)" }} />
              {["0h", "7h", "8h", "18h", "22h", "24h"].map((l, i) => {
                const positions = ["0%", "29%", "36%", "75%", "92%", "100%"];
                return (
                  <div key={l} style={{
                    position: "absolute", top: -2, left: positions[i],
                    transform: "translateX(-50%)",
                    fontSize: 9, color: "#4b5563", fontWeight: 600,
                  }}>{l}</div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
              {[
                { color: "rgba(96,239,255,0.4)", label: "Jeûne" },
                { color: "#60efff", label: "Shake pré" },
                { color: "rgba(255,126,179,0.7)", label: "Sport" },
                { color: "#f97316", label: "Post-WO + œufs" },
                { color: "#e8ff6b", label: "Fenêtre repas" },
              ].map(l => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 10, color: "#6b7280" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[
              { label: "Calories/j", value: `~${totalKcal}`, color: "#e8ff6b" },
              { label: "Protéines", value: `${totalProt}g`, color: "#60efff" },
              { label: "Jeûne net", value: "~16h", color: "#ff7eb3" },
            ].map(s => (
              <div key={s.label} style={{
                background: "rgba(255,255,255,0.04)", borderRadius: 10,
                padding: "10px 12px", border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 22px" }}>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: 6, marginTop: 16,
          background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 4,
        }}>
          {[
            { id: "timeline", label: "⏱ Timeline" },
            { id: "repas", label: "🍽️ Repas" },
            { id: "tips", label: "💡 Tips" },
          ].map(tab => (
            <button key={tab.id} className="omad-tab" onClick={() => setActiveTab(tab.id)} style={{
              flex: 1, padding: "8px 6px", borderRadius: 9,
              fontSize: 12, fontWeight: 600,
              background: activeTab === tab.id ? "#e8ff6b" : "transparent",
              color: activeTab === tab.id ? "#0a0a0f" : "#6b7280",
            }}>{tab.label}</button>
          ))}
        </div>

        {/* Sélecteur jour */}
        <div style={{ display: "flex", gap: 6, marginTop: 14, overflowX: "auto", paddingBottom: 4 }}>
          {days.map((d, i) => (
            <button key={d} className="omad-day-btn" onClick={() => setActiveDay(i)} style={{
              padding: "7px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700,
              background: activeDay === i ? "#e8ff6b" : "rgba(255,255,255,0.05)",
              color: activeDay === i ? "#0a0a0f" : "#6b7280", flexShrink: 0,
            }}>{d}</button>
          ))}
        </div>

        {activeDay >= 5 && (
          <div style={{
            marginTop: 10, padding: "10px 14px",
            background: "rgba(96,239,255,0.08)", borderRadius: 10,
            border: "1px solid rgba(96,239,255,0.2)",
            fontSize: 12, color: "#60efff",
          }}>
            🏖️ Weekend sans sport → supprime shake pré + post-workout. Fenêtre repas 13h–17h inchangée.
          </div>
        )}

        {/* === TAB TIMELINE === */}
        {activeTab === "timeline" && (
          <div className="omad-fade" style={{ marginTop: 16, paddingBottom: 32 }}>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute", left: 22, top: 12, bottom: 12,
                width: 2, background: "rgba(255,255,255,0.06)",
              }} />
              {timeline.map((item, i) => {
                const dotColor =
                  item.type === "eat" ? (item.time === "8h15" ? "#f97316" : typeColors.eat) :
                  item.type === "sport" ? typeColors.sport : "#374151";
                return (
                  <div key={i} style={{ display: "flex", gap: 16, marginBottom: 14, position: "relative" }}>
                    <div style={{ width: 44, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                      <div style={{
                        width: 10, height: 10, borderRadius: "50%",
                        background: dotColor,
                        boxShadow: item.type === "eat" ? `0 0 8px ${dotColor}88` : "none",
                        zIndex: 1,
                      }} />
                      <div style={{ fontSize: 9, color: "#4b5563", fontWeight: 600 }}>{item.time}</div>
                    </div>
                    <div style={{
                      flex: 1, padding: "10px 14px",
                      background: item.time === "8h15" ? "rgba(249,115,22,0.06)" :
                        item.type === "eat" ? itemColors.eat :
                        item.type === "sport" ? itemColors.sport :
                        "rgba(255,255,255,0.02)",
                      borderRadius: 12,
                      border: `1px solid ${
                        item.time === "8h15" ? "rgba(249,115,22,0.2)" :
                        item.type === "eat" ? itemBorders.eat :
                        item.type === "sport" ? itemBorders.sport :
                        "rgba(255,255,255,0.05)"
                      }`,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: item.detail ? 6 : 0 }}>
                        <span style={{ fontSize: 16 }}>{item.icon}</span>
                        <span style={{
                          fontWeight: 700, fontSize: 13,
                          color: item.time === "8h15" ? "#f97316" : dotColor,
                        }}>{item.label}</span>
                      </div>
                      {item.detail && (
                        <div style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.5 }}>{item.detail}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* === TAB REPAS === */}
        {activeTab === "repas" && (
          <div className="omad-fade" style={{ marginTop: 16, paddingBottom: 32 }}>
            {[
              {
                id: "pre",
                emoji: "🥛", label: "Shake pré-workout", time: "7h00 · avant séance",
                accentColor: "#60efff", accentBg: "rgba(96,239,255,0.05)", accentBorder: "rgba(96,239,255,0.2)",
                options: preWorkoutOptions,
                selected: selectedPre, setSelected: setSelectedPre,
                kcal: preWorkoutOptions[selectedPre].kcal, prot: preWorkoutOptions[selectedPre].prot,
                showIngredients: false,
              },
              {
                id: "post",
                emoji: "🍳", label: "Shake post-workout + œufs", time: "8h15 · après séance",
                accentColor: "#f97316", accentBg: "rgba(249,115,22,0.05)", accentBorder: "rgba(249,115,22,0.2)",
                options: postWorkoutOptions,
                selected: selectedPost, setSelected: setSelectedPost,
                kcal: postWorkoutOptions[selectedPost].kcal, prot: postWorkoutOptions[selectedPost].prot,
                showIngredients: false,
              },
              {
                id: "main",
                emoji: "🍽️", label: "Repas principal", time: "19h30 · repas du soir",
                accentColor: "#e8ff6b", accentBg: "rgba(232,255,107,0.04)", accentBorder: "rgba(232,255,107,0.15)",
                options: mainMealOptions,
                selected: selectedMain, setSelected: setSelectedMain,
                kcal: mainMealOptions[selectedMain].kcal, prot: mainMealOptions[selectedMain].prot,
                showIngredients: true,
              },
              {
                id: "collation",
                emoji: "🥗", label: "Collation (optionnelle)", time: "18h00 · ouverture fenêtre",
                accentColor: "#a78bfa", accentBg: "rgba(167,139,250,0.05)", accentBorder: "rgba(167,139,250,0.15)",
                options: postMealOptions,
                selected: selectedCollation, setSelected: setSelectedCollation,
                kcal: postMealOptions[selectedCollation].kcal, prot: postMealOptions[selectedCollation].prot,
                showIngredients: false,
              },
            ].map(block => (
              <div key={block.id} className="omad-card" style={{
                background: block.accentBg, borderRadius: 16,
                border: `1px solid ${block.accentBorder}`, overflow: "hidden", marginBottom: 12,
              }}>
                <div style={{
                  padding: "12px 16px", borderBottom: `1px solid ${block.accentBorder}`,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{block.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{block.label}</div>
                      <div style={{ fontSize: 11, color: "#4b5563" }}>{block.time}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: block.accentColor }}>{block.kcal} kcal</div>
                    <div style={{ fontSize: 11, color: "#60efff" }}>{block.prot}g prot.</div>
                  </div>
                </div>
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: block.showIngredients ? 10 : 0 }}>
                    {block.options.map((opt, i) => (
                      <button key={i} className="omad-opt" onClick={() => block.setSelected(i)} style={{
                        padding: "9px 12px", borderRadius: 10,
                        background: block.selected === i ? `${block.accentColor}18` : "rgba(255,255,255,0.03)",
                        border: block.selected === i ? `1px solid ${block.accentColor}44` : "1px solid rgba(255,255,255,0.05)",
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                          <div>
                            <div style={{
                              fontSize: 12,
                              fontWeight: block.selected === i ? 600 : 400,
                              color: block.selected === i ? block.accentColor : "#9ca3af",
                            }}>
                              {block.selected === i ? "✓ " : ""}{opt.name}
                            </div>
                            {"note" in opt && opt.note && <div style={{ fontSize: 10, color: "#4b5563", marginTop: 2 }}>{opt.note}</div>}
                          </div>
                          <span style={{ fontSize: 10, color: "#4b5563", flexShrink: 0 }}>{opt.prot}g</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {block.showIngredients && "items" in block.options[block.selected] && (
                    <div style={{
                      background: "rgba(255,255,255,0.02)", borderRadius: 10,
                      padding: "10px 12px", border: "1px solid rgba(255,255,255,0.04)",
                    }}>
                      <div style={{ fontSize: 10, color: "#4b5563", letterSpacing: 1, marginBottom: 6 }}>COMPOSITION</div>
                      {(block.options[block.selected] as typeof mainMealOptions[0]).items.map((item, i) => (
                        <div key={i} style={{
                          fontSize: 12, color: "#9ca3af", padding: "3px 0",
                          borderBottom: i < (block.options[block.selected] as typeof mainMealOptions[0]).items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                          display: "flex", alignItems: "center", gap: 8,
                        }}>
                          <span style={{ color: "#e8ff6b", fontSize: 8 }}>▸</span>{item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Total */}
            <div style={{
              background: "rgba(232,255,107,0.07)", borderRadius: 14,
              border: "1px solid rgba(232,255,107,0.18)",
              padding: "16px 18px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 32,
            }}>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13, color: "#e8ff6b" }}>TOTAL JOURNÉE</div>
                <div style={{ fontSize: 11, color: "#4b5563", marginTop: 2 }}>4 prises · dont 2 shakes + œufs</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#e8ff6b" }}>{totalKcal} kcal</div>
                <div style={{ fontSize: 12, color: "#60efff" }}>{totalProt}g protéines</div>
              </div>
            </div>
          </div>
        )}

        {/* === TAB TIPS === */}
        {activeTab === "tips" && (
          <div className="omad-fade" style={{ marginTop: 16, paddingBottom: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {tips.map((t, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 14,
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.03)", borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{t.icon}</span>
                  <span style={{ fontSize: 13, lineHeight: 1.6 }}>{t.text}</span>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 14, padding: "12px 14px",
              background: "rgba(255,255,255,0.03)", borderRadius: 10,
              fontSize: 11, color: "#4b5563", lineHeight: 1.7,
              border: "1px solid rgba(255,255,255,0.05)",
            }}>
              ⚠️ Programme indicatif adapté à ~80kg, 1h de muscu/jour. Ajuste les quantités à ton gabarit réel. Consulte un professionnel si besoin.
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
