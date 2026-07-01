import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Check, Scissors, Palette, User } from "lucide-react";

interface AvatarCustomizationProps {
  onComplete: (config: AvatarConfig) => void;
  onBack: () => void;
}

export interface AvatarConfig {
  gender: "nino" | "nina";
  skinTone: string;
  hairStyle: number;
  hairColor: string;
  clothing: number;
  name: string;
}

const SKIN_TONES = ["#E8C9A0", "#D4A574", "#C68642", "#A0612A", "#7B4A1E"];
const HAIR_COLORS = ["#2C1810", "#5C3A1E", "#C8860A", "#D44000", "#8C8C8C"];
const HAIR_STYLES = ["Liso", "Rizado", "Ondulado", "Corto"];
const HAIR_STYLE_ICONS = ["〜", "ʘ", "ω", "⌒"];
const CLOTHING = [
  { label: "Uniforme", emoji: "👔" },
  { label: "Casual A", emoji: "👕" },
  { label: "Casual B", emoji: "🧥" },
  { label: "Hoodie", emoji: "🧣" },
];

function Confetti() {
  const shapes = ["★", "♥", "●", "★", "♥", "●", "★", "♥"];
  const colors = ["#E8A830", "#5BAD6F", "#7BA7C2", "#3D9E8C", "#E8A830", "#5BAD6F"];
  return (
    <>
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute", left: `${8 + i * 12}%`, top: `${5 + (i % 3) * 12}%`,
            fontSize: 14, color: colors[i % colors.length], opacity: 0.35,
            pointerEvents: "none", userSelect: "none",
          }}
          animate={{ y: [0, -10, 0], rotate: [0, 12, -8, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        >
          {s}
        </motion.div>
      ))}
    </>
  );
}

export function AvatarCustomization({ onComplete, onBack }: AvatarCustomizationProps) {
  const [gender, setGender] = useState<"nino" | "nina">("nino");
  const [skinTone, setSkinTone] = useState(SKIN_TONES[2]);
  const [hairStyle, setHairStyle] = useState(0);
  const [hairColor, setHairColor] = useState(HAIR_COLORS[0]);
  const [clothing, setClothing] = useState(0);
  const [name, setName] = useState("");

  const canProceed = name.trim().length >= 1;

  function handleComplete() {
    if (canProceed) onComplete({ gender, skinTone, hairStyle, hairColor, clothing, name });
  }

  return (
    <div style={{ width: "100%", height: "100%", background: "#F5F0E8", fontFamily: "'Nunito', sans-serif", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* LEFT PANEL — preview */}
        <div style={{
          width: 340, flexShrink: 0, position: "relative",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 20, padding: 28, borderRight: "1px solid rgba(0,0,0,0.06)",
        }}>
          <Confetti />
          <div style={{ fontWeight: 800, fontSize: 18, color: "#2C2C2C" }}>Crea tu personaje</div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 160, height: 160, borderRadius: "50%",
              background: skinTone,
              border: `5px solid ${hairColor}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 64, position: "relative", boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            }}
          >
            {gender === "nino" ? "👦" : "👧"}
            <div style={{
              position: "absolute", bottom: -6, right: -6,
              width: 40, height: 40, borderRadius: "50%", background: "white",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}>
              {CLOTHING[clothing].emoji}
            </div>
          </motion.div>

          <div style={{ width: "100%", maxWidth: 280, display: "flex", flexDirection: "column", gap: 4 }}>
            <input
              value={name}
              onChange={e => setName(e.target.value.slice(0, 12))}
              placeholder="¿Cómo te llamas?"
              maxLength={12}
              style={{
                width: "100%", height: 52, borderRadius: 14,
                border: `2px solid ${name ? "#3D9E8C" : "#C9B99A"}`,
                background: "white", fontFamily: "'Nunito', sans-serif",
                fontWeight: 700, fontSize: 18, color: "#2C2C2C",
                textAlign: "center", outline: "none", boxSizing: "border-box",
                padding: "0 12px", transition: "border-color 0.2s",
              }}
            />
            <div style={{ textAlign: "right", fontSize: 12, color: "#9E9E9E", fontWeight: 600 }}>
              {name.length}/12
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ flex: 1, padding: "20px 28px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 20 }}>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <User size={18} color="#3D9E8C" />
              <span style={{ fontWeight: 800, fontSize: 16, color: "#2C2C2C" }}>Personaje</span>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {(["nino", "nina"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  style={{
                    width: 140, height: 72, borderRadius: 14,
                    border: `2.5px solid ${gender === g ? "#3D9E8C" : "#C9B99A"}`,
                    background: gender === g ? "#E6F7F5" : "white", cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
                    fontFamily: "'Nunito', sans-serif", transition: "all 0.2s",
                  }}
                >
                  <span style={{ fontSize: 24 }}>{g === "nino" ? "👦" : "👧"}</span>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#2C2C2C" }}>{g === "nino" ? "Niño" : "Niña"}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <span style={{ fontSize: 16 }}>✋</span>
              <span style={{ fontWeight: 800, fontSize: 16, color: "#2C2C2C" }}>Piel</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {SKIN_TONES.map((tone) => (
                <button
                  key={tone}
                  onClick={() => setSkinTone(tone)}
                  style={{
                    width: 48, height: 48, borderRadius: "50%", background: tone,
                    border: skinTone === tone ? "3px solid white" : "3px solid transparent",
                    outline: skinTone === tone ? "3px solid #3D9E8C" : "none",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "outline 0.15s", flexShrink: 0,
                  }}
                >
                  {skinTone === tone && <Check size={18} color="white" strokeWidth={3} />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <Scissors size={16} color="#3D9E8C" />
              <span style={{ fontWeight: 800, fontSize: 16, color: "#2C2C2C" }}>Estilo</span>
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              {HAIR_STYLES.map((style, i) => (
                <button
                  key={i}
                  onClick={() => setHairStyle(i)}
                  style={{
                    width: 72, height: 72, borderRadius: 12,
                    border: `2.5px solid ${hairStyle === i ? "#3D9E8C" : "#C9B99A"}`,
                    background: hairStyle === i ? "#E6F7F5" : "white", cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3,
                    fontFamily: "'Nunito', sans-serif", transition: "all 0.2s",
                  }}
                >
                  <span style={{ fontSize: 22 }}>{HAIR_STYLE_ICONS[i]}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#2C2C2C" }}>{style}</span>
                </button>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <Palette size={16} color="#3D9E8C" />
              <span style={{ fontWeight: 800, fontSize: 16, color: "#2C2C2C" }}>Color</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {HAIR_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setHairColor(color)}
                  style={{
                    width: 40, height: 40, borderRadius: "50%", background: color,
                    border: hairColor === color ? "3px solid white" : "3px solid transparent",
                    outline: hairColor === color ? "3px solid #3D9E8C" : "none",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "outline 0.15s", flexShrink: 0,
                  }}
                >
                  {hairColor === color && <Check size={14} color="white" strokeWidth={3} />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <span style={{ fontSize: 16 }}>👕</span>
              <span style={{ fontWeight: 800, fontSize: 16, color: "#2C2C2C" }}>Ropa</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {CLOTHING.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setClothing(i)}
                  style={{
                    width: 72, height: 72, borderRadius: 12,
                    border: `2.5px solid ${clothing === i ? "#3D9E8C" : "#C9B99A"}`,
                    background: clothing === i ? "#E6F7F5" : "white", cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3,
                    fontFamily: "'Nunito', sans-serif", transition: "all 0.2s",
                  }}
                >
                  <span style={{ fontSize: 24 }}>{item.emoji}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#2C2C2C" }}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{
        height: 72, background: "white", borderTop: "1px solid rgba(0,0,0,0.08)",
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", flexShrink: 0,
      }}>
        <button
          onClick={onBack}
          style={{
            width: 56, height: 56, borderRadius: 14, border: "2px solid #C9B99A",
            background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <ArrowLeft size={22} color="#7BA7C2" />
        </button>

        <motion.button
          onClick={handleComplete}
          whileHover={canProceed ? { scale: 1.03 } : {}}
          whileTap={canProceed ? { scale: 0.97 } : {}}
          style={{
            width: 200, height: 56, borderRadius: 14,
            background: canProceed ? "#3D9E8C" : "#C9C9C9", border: "none",
            cursor: canProceed ? "pointer" : "not-allowed",
            fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 22, color: "white",
            boxShadow: canProceed ? "0 4px 14px rgba(61,158,140,0.35)" : "none",
            transition: "background 0.2s",
          }}
        >
          ¡Listo! 🎉
        </motion.button>
      </div>
    </div>
  );
}
