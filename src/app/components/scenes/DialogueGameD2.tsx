import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TopBar } from "../TopBar";
import { DomainProgressBar } from "../DomainProgressBar";
import { D2_CONTENT, SCENES_META } from "../../data/scenesContent";
import type { Nivel, D2SceneId } from "../../data/scenesContent";

interface DialogueGameD2Props {
  sceneId: D2SceneId;
  nivel: Nivel;
  indiceSesion: number;
  onComplete: (stars: 1 | 2 | 3) => void;
  onBack: () => void;
}

export function DialogueGameD2({ sceneId, nivel, indiceSesion, onComplete, onBack }: DialogueGameD2Props) {
  const meta = SCENES_META[sceneId];
  const content = D2_CONTENT[sceneId].porNivel[nivel];

  const [ready, setReady] = useState(content.delayMs === 0);
  const [hovered, setHovered] = useState<string | null>(null);
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

  function handleSelect(id: string) {
    if (!ready || feedback === "correct") return;
    setSelected(id);
    const opt = content.opciones.find(o => o.id === id);
    if (opt?.correct) setFeedback("correct");
    else {
      setFeedback("incorrect");
      setIntentos(n => n + 1);
    }
  }

  function handleRetry() {
    setSelected(null);
    setFeedback("none");
    setHovered(null);
  }

  function calcStars(): 1 | 2 | 3 {
    if (intentos === 0) return 3;
    if (intentos === 1) return 2;
    return 1;
  }

  // Comportamiento de preview por nivel (igual al ya prototipado en LevelVariations.tsx)
  const previewMode: "always" | "hover" | "none" = nivel === 1 ? "always" : nivel === 2 ? "hover" : "none";
  const showGlowOnCorrectPreview = nivel < 3;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      fontFamily: "'Nunito', sans-serif",
      background: "#F5F0E8",
    }}>
      <TopBar centerLabel={meta.label} centerIcon={<span>{meta.icon}</span>} showTimer timerProgress={0.45} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 32px", gap: 14, overflowY: "auto", position: "relative" }}>

        {/* Panel de escena con diálogo del NPC */}
        <motion.div
          key={sceneId + nivel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            width: 660, height: 190,
            borderRadius: 16,
            background: "linear-gradient(135deg, #DCD7F2 0%, #E8E4F5 60%, #F5F0E8 100%)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
            position: "relative", overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 16,
            padding: "0 28px", boxSizing: "border-box",
          }}
        >
          <div style={{
            width: 64, height: 64, borderRadius: "50%", background: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 32, flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}>
            👤
          </div>
          <div style={{
            background: "white", borderRadius: 14, padding: "14px 18px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)", flex: 1, maxWidth: 420,
          }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#534AB7", marginBottom: 4 }}>
              {meta.npcName}
            </div>
            <div style={{ fontWeight: 600, fontSize: 15, color: "#2C2C2C", lineHeight: 1.4 }}>
              «{content.dialogo}»
            </div>
          </div>
        </motion.div>

        {!ready && (
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.1, repeat: Infinity }}
            style={{ fontWeight: 700, fontSize: 13, color: "#9E9E9E" }}
          >
            Pensando qué responder a {meta.npcName}...
          </motion.div>
        )}

        {ready && (
          <>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#2C2C2C" }}>{meta.preguntaContextual}</div>

            <div style={{ display: "flex", gap: 12, width: 660, position: "relative", flexWrap: "wrap" as const }}>
              {content.opciones.map((opt) => {
                const isSelected = selected === opt.id;
                const showGlow = feedback === "correct" && isSelected && showGlowOnCorrectPreview;
                const showTint = feedback === "incorrect" && isSelected;
                const showPreview =
                  feedback === "none" &&
                  ((previewMode === "always") || (previewMode === "hover" && hovered === opt.id));

                return (
                  <div key={opt.id} style={{ flex: "1 1 0", minWidth: 140, position: "relative" }}>
                    <AnimatePresence>
                      {showPreview && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          style={{
                            position: "absolute", bottom: "calc(100% + 8px)", left: "50%",
                            transform: "translateX(-50%)", width: 150,
                            background: "white", border: "1.5px solid #E0D9CC", borderRadius: 10,
                            padding: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
                            fontSize: 11, fontWeight: 600, color: "#2C2C2C", textAlign: "center",
                            lineHeight: 1.4, zIndex: 10,
                          }}
                        >
                          {opt.previewText}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      onHoverStart={() => setHovered(opt.id)}
                      onHoverEnd={() => setHovered(null)}
                      onClick={() => handleSelect(opt.id)}
                      whileHover={feedback === "none" ? { scale: 1.03 } : {}}
                      whileTap={feedback === "none" ? { scale: 0.97 } : {}}
                      style={{
                        width: "100%", height: 100, borderRadius: 12,
                        background: showGlow ? "#E8F7ED" : showTint ? "#E8F0F7" : "white",
                        border: `2.5px solid ${showGlow ? "#5BAD6F" : showTint ? "#7BA7C2" : isSelected ? "#534AB7" : "#534AB7"}`,
                        boxShadow: showGlow ? "0 0 18px rgba(91,173,111,0.35)" : "0 2px 8px rgba(0,0,0,0.08)",
                        cursor: feedback === "correct" ? "default" : "pointer",
                        fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14, color: "#2C2C2C",
                        padding: "0 12px", display: "flex", alignItems: "center", justifyContent: "center",
                        textAlign: "center", lineHeight: 1.35,
                      }}
                    >
                      “{opt.text}”
                    </motion.button>
                  </div>
                );
              })}
            </div>
          </>
        )}

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
              <span>Mira los resultados de cada respuesta antes de elegir...</span>
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

        <AnimatePresence>
          {feedback === "correct" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                background: "white", border: "3px solid #5BAD6F", borderRadius: 18,
                padding: "20px 28px", boxShadow: "0 8px 32px rgba(91,173,111,0.25)",
                textAlign: "center", zIndex: 10, maxWidth: 380,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>🌟</div>
              <div style={{ fontWeight: 800, fontSize: 20, color: "#5BAD6F", marginBottom: 6 }}>¡Muy bien!</div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#2C2C2C", lineHeight: 1.5, marginBottom: 14 }}>
                {content.feedbackCorrecto}
              </div>
              <button
                onClick={() => onComplete(calcStars())}
                style={{
                  background: "#3D9E8C", border: "none", borderRadius: 10, color: "white",
                  fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 16,
                  padding: "10px 24px", cursor: "pointer",
                }}
              >
                Continuar 🏆
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <DomainProgressBar dominioActivo={meta.dominio} indiceSesion={indiceSesion} />
    </div>
  );
}
