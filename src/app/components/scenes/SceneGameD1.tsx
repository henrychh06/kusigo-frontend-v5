import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TopBar } from "../TopBar";
import { DomainProgressBar } from "../DomainProgressBar";
import { D1_CONTENT, SCENES_META } from "../../data/scenesContent";
import type { Nivel, D1SceneId } from "../../data/scenesContent";

interface SceneGameD1Props {
  sceneId: D1SceneId;
  nivel: Nivel;
  indiceSesion: number;
  onComplete: (stars: 1 | 2 | 3) => void;
  onBack: () => void;
}

export function SceneGameD1({ sceneId, nivel, indiceSesion, onComplete, onBack }: SceneGameD1Props) {
  const meta = SCENES_META[sceneId];
  const content = D1_CONTENT[sceneId].porNivel[nivel];

  const [ready, setReady] = useState(content.delayMs === 0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"none" | "correct" | "incorrect">("none");
  const [intentos, setIntentos] = useState(0);

  useEffect(() => {
    setReady(content.delayMs === 0);
    if (content.delayMs > 0) {
      const t = setTimeout(() => setReady(true), content.delayMs);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneId, nivel]);

  function handleSelect(optionId: string) {
    if (!ready || feedback === "correct") return;
    setSelected(optionId);
    const opt = content.opciones.find(o => o.id === optionId);
    if (opt?.correct) {
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
      setIntentos(n => n + 1);
    }
  }

  function handleRetry() {
    setSelected(null);
    setFeedback("none");
  }

  function calcStars(): 1 | 2 | 3 {
    if (intentos === 0) return 3;
    if (intentos === 1) return 2;
    return 1;
  }

  const cardSize = nivel === 1 ? 150 : nivel === 2 ? 130 : 112;
  const showLabels = nivel < 3;
  const showArrowScaffold = nivel === 1;
  const correctId = content.opciones.find(o => o.correct)?.id;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      fontFamily: "'Nunito', sans-serif",
      background: "#F5F0E8",
    }}>
      <TopBar centerLabel={meta.label} centerIcon={<span>{meta.icon}</span>} showTimer timerProgress={0.35} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 32px", gap: 16, overflowY: "auto", position: "relative" }}>

        {/* Panel de escena */}
        <motion.div
          key={sceneId + nivel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            width: 640, height: 220,
            borderRadius: 16,
            background: "linear-gradient(135deg, #CFEDE5 0%, #E6F4EE 60%, #F5F0E8 100%)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
            position: "relative", overflow: "hidden",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 10, padding: 18, boxSizing: "border-box",
          }}
        >
          <div style={{ fontSize: 64 }}>{content.npcEmoji}</div>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#3D9E8C" }}>{meta.npcName}</div>
          <div style={{
            fontWeight: 600, fontSize: 15, color: "#2C2C2C", textAlign: "center",
            maxWidth: 480, lineHeight: 1.5,
          }}>
            {content.texto}
          </div>
        </motion.div>

        {/* Espera previa al estímulo (AD03) */}
        {!ready && (
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.1, repeat: Infinity }}
            style={{ fontWeight: 700, fontSize: 13, color: "#9E9E9E" }}
          >
            Observando a {meta.npcName}...
          </motion.div>
        )}

        {/* Pregunta + opciones */}
        {ready && (
          <>
            <div style={{ fontWeight: 800, fontSize: 18, color: "#2C2C2C" }}>{meta.preguntaContextual}</div>

            <div style={{ display: "flex", gap: 16, position: "relative" }}>
              {content.opciones.map((opt) => {
                const isSelected = selected === opt.id;
                const showGlow = feedback === "correct" && isSelected;
                const showTint = feedback === "incorrect" && isSelected;
                return (
                  <div key={opt.id} style={{ position: "relative" }}>
                    {showArrowScaffold && opt.id === correctId && feedback === "none" && (
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 1.1, repeat: Infinity }}
                        style={{
                          position: "absolute", top: -28, left: "50%", transform: "translateX(-50%)",
                          fontSize: 22, color: "#E8A830",
                        }}
                      >
                        ⬇️
                      </motion.div>
                    )}
                    <motion.button
                      onClick={() => handleSelect(opt.id)}
                      whileHover={feedback === "none" ? { scale: 1.05 } : {}}
                      whileTap={feedback === "none" ? { scale: 0.95 } : {}}
                      style={{
                        width: cardSize, height: cardSize,
                        borderRadius: 16,
                        background: showGlow ? "#E8F7ED" : showTint ? "#E8F0F7" : "white",
                        border: `3px solid ${showGlow ? "#5BAD6F" : showTint ? "#7BA7C2" : "#0F6E56"}`,
                        boxShadow: showGlow ? "0 0 18px rgba(91,173,111,0.35)" : "0 2px 8px rgba(0,0,0,0.08)",
                        cursor: feedback === "correct" ? "default" : "pointer",
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                        gap: 6, fontFamily: "'Nunito', sans-serif",
                      }}
                    >
                      <span style={{ fontSize: cardSize * 0.42 }}>{opt.emoji}</span>
                      {showLabels && (
                        <span style={{ fontWeight: 700, fontSize: 13, color: "#2C2C2C" }}>{opt.label}</span>
                      )}
                    </motion.button>
                  </div>
                );
              })}
            </div>

            {nivel === 2 && feedback === "none" && (
              <div style={{ fontSize: 11, fontWeight: 600, color: "#B8841C" }}>
                💡 Mira bien la cara de {meta.npcName}
              </div>
            )}
          </>
        )}

        {/* Feedback orientador (RF10 — no punitivo) */}
        <AnimatePresence>
          {feedback === "incorrect" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                background: "white", border: "2px solid #7BA7C2", borderRadius: 12,
                padding: "10px 18px", display: "flex", alignItems: "center", gap: 10,
                fontWeight: 600, fontSize: 14, color: "#2C2C2C",
              }}
            >
              <span style={{ fontSize: 20 }}>🦉</span>
              <span>
                {nivel === 1
                  ? `Mira otra vez la cara de ${meta.npcName}.`
                  : `Observa con atención la expresión de ${meta.npcName}.`}
              </span>
              <button
                onClick={handleRetry}
                style={{
                  background: "#7BA7C2", border: "none", borderRadius: 8, color: "white",
                  fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 12,
                  padding: "4px 12px", cursor: "pointer",
                }}
              >
                Intentar de nuevo
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Acierto */}
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
                ⭐
              </motion.div>
              <div style={{ fontWeight: 800, fontSize: 21, color: "#5BAD6F", marginBottom: 6 }}>¡Muy bien!</div>
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
                ¡Continuar! 🏆
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <DomainProgressBar dominioActivo={meta.dominio} indiceSesion={indiceSesion} />
    </div>
  );
}
