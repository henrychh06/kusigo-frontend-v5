import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TopBar } from "../TopBar";
import { DomainProgressBar } from "../DomainProgressBar";
import { D3_CONTENT, SCENES_META } from "../../data/scenesContent";
import type { Nivel, D3SceneId } from "../../data/scenesContent";

interface TurnGameD3Props {
  sceneId: D3SceneId;
  nivel: Nivel;
  indiceSesion: number;
  onComplete: (stars: 1 | 2 | 3) => void;
  onBack: () => void;
}

export function TurnGameD3({ sceneId, nivel, indiceSesion, onComplete, onBack }: TurnGameD3Props) {
  const meta = SCENES_META[sceneId];
  const content = D3_CONTENT[sceneId].porNivel[nivel];
  const lastStepIndex = content.pasos.length - 1;
  // Ritmo de los pasos automáticos del NPC — usa el mismo "delay estímulo"
  // de la matriz (3.5s / 2s / 0s) que las escenas D1 y D2, con un mínimo
  // razonable para que la secuencia siga siendo legible en Nivel 3.
  const stepDelayMs = Math.max(content.delayMs, 450);

  const [stepIndex, setStepIndex] = useState(0);
  const [turnoListo, setTurnoListo] = useState(false); // true cuando llega al paso final (turno del niño)
  const [feedback, setFeedback] = useState<"none" | "correct">("none");
  const [idleTicks, setIdleTicks] = useState(0);
  const spokeRef = useRef(false);

  // Avanza automáticamente los pasos del NPC hasta llegar al paso final (turno del niño)
  useEffect(() => {
    setStepIndex(0);
    setTurnoListo(false);
    setFeedback("none");
    setIdleTicks(0);
    spokeRef.current = false;
  }, [sceneId, nivel]);

  useEffect(() => {
    if (stepIndex >= lastStepIndex) {
      setTurnoListo(true);
      return;
    }
    const t = setTimeout(() => setStepIndex(i => i + 1), stepDelayMs);
    return () => clearTimeout(t);
  }, [stepIndex, lastStepIndex, stepDelayMs]);

  // TTS real solo en Nivel 1 ("Grande + TTS")
  useEffect(() => {
    if (!turnoListo || !content.conTTS || spokeRef.current) return;
    spokeRef.current = true;
    try {
      if ("speechSynthesis" in window) {
        const utter = new SpeechSynthesisUtterance("¡Es tu turno!");
        utter.lang = "es-PE";
        utter.rate = 0.95;
        window.speechSynthesis.speak(utter);
      }
    } catch {
      // si el navegador no soporta TTS, se omite silenciosamente — RF08 (offline-friendly)
    }
  }, [turnoListo, content.conTTS]);

  // Pista contextual tras varios segundos de inactividad en el turno del niño (AD04)
  useEffect(() => {
    if (!turnoListo || feedback !== "none") return;
    const t = setInterval(() => setIdleTicks(n => n + 1), 1000);
    return () => clearInterval(t);
  }, [turnoListo, feedback]);

  function handleTurnoTap() {
    if (!turnoListo || feedback === "correct") return;
    setFeedback("correct");
  }

  function calcStars(): 1 | 2 | 3 {
    if (idleTicks <= 4) return 3;
    if (idleTicks <= 9) return 2;
    return 1;
  }

  const showHint = nivel === 1 || (nivel === 2 && idleTicks >= 6);

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      fontFamily: "'Nunito', sans-serif",
      background: "#F5F0E8",
    }}>
      <TopBar centerLabel={meta.label} centerIcon={<span>{meta.icon}</span>} showTimer timerProgress={0.55} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 32px", gap: 16, position: "relative" }}>

        {/* Indicador de pasos */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {content.pasos.map((paso, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {i > 0 && <div style={{ width: 28, height: 2, background: i <= stepIndex ? "#993C1D" : "#D9CFC2" }} />}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <motion.div
                  animate={i === stepIndex && !turnoListo ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: i < stepIndex || (i === lastStepIndex && feedback === "correct")
                      ? "#3D9E8C"
                      : i === stepIndex ? "#993C1D" : "#E6DACB",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, color: "white", fontWeight: 800,
                  }}
                >
                  {paso.actor === "npc" ? "🧑" : "🧒"}
                </motion.div>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#9E9E9E", maxWidth: 86, textAlign: "center" }}>
                  {paso.descripcion}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Escena */}
        <motion.div
          key={sceneId + nivel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            width: 600, height: 200, borderRadius: 16,
            background: "linear-gradient(135deg, #F0D9CC 0%, #F5E6D8 60%, #F5F0E8 100%)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 24,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 48 }}>🧑</span>
            <span style={{ fontWeight: 700, fontSize: 12, color: "#993C1D" }}>{meta.npcName}</span>
          </div>
          <span style={{ fontSize: 28 }}>{meta.icon}</span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 48 }}>🧒</span>
            <span style={{ fontWeight: 700, fontSize: 12, color: "#3D9E8C" }}>Tú</span>
          </div>
        </motion.div>

        {/* Acción de turno */}
        <div style={{ position: "relative" }}>
          {showHint && turnoListo && feedback === "none" && (
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.1, repeat: Infinity }}
              style={{ position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)", fontSize: 22 }}
            >
              ⬇️
            </motion.div>
          )}
          <motion.button
            onClick={handleTurnoTap}
            disabled={!turnoListo || feedback === "correct"}
            animate={turnoListo && feedback === "none" ? { scale: [1, 1.04, 1] } : {}}
            transition={{ duration: 1.3, repeat: Infinity }}
            whileTap={turnoListo ? { scale: 0.95 } : {}}
            style={{
              minWidth: 220, height: 64, borderRadius: 16, padding: "0 24px",
              background: turnoListo ? (feedback === "correct" ? "#5BAD6F" : "#993C1D") : "#D9CFC2",
              border: "none", cursor: turnoListo ? "pointer" : "not-allowed",
              fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 16, color: "white",
              boxShadow: turnoListo ? "0 4px 14px rgba(153,60,29,0.35)" : "none",
            }}
          >
            {feedback === "correct"
              ? "¡Listo! ✅"
              : turnoListo
                ? content.pasos[lastStepIndex].descripcion
                : "Esperando a " + meta.npcName + "..."}
          </motion.button>
        </div>

        {content.conTTS && turnoListo && feedback === "none" && (
          <div style={{ fontSize: 11, fontWeight: 700, color: "#9E9E9E" }}>🔊 “¡Es tu turno!”</div>
        )}

        <AnimatePresence>
          {feedback === "correct" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                background: "white", border: "3px solid #5BAD6F", borderRadius: 20,
                padding: "22px 32px", boxShadow: "0 8px 36px rgba(91,173,111,0.28)",
                textAlign: "center", zIndex: 10, maxWidth: 380,
              }}
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 300 }} style={{ fontSize: 40, marginBottom: 8 }}>
                🤝
              </motion.div>
              <div style={{ fontWeight: 800, fontSize: 21, color: "#5BAD6F", marginBottom: 6 }}>¡Tú y {meta.npcName} lo hicieron juntos!</div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#2C2C2C", lineHeight: 1.5, marginBottom: 16 }}>
                {content.feedbackCorrecto}
              </div>
              <button
                onClick={() => onComplete(calcStars())}
                style={{
                  background: "#3D9E8C", border: "none", borderRadius: 12, color: "white",
                  fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 17,
                  padding: "11px 28px", cursor: "pointer", boxShadow: "0 3px 12px rgba(61,158,140,0.35)",
                }}
              >
                ¡Ver mis logros! 🏆
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <DomainProgressBar dominioActivo={meta.dominio} indiceSesion={indiceSesion} />
    </div>
  );
}
