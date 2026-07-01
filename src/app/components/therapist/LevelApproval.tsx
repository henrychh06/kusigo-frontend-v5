import { useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";

interface LevelApprovalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export function LevelApproval({ onClose, onConfirm }: LevelApprovalProps) {
  const [decision, setDecision] = useState<"approve" | "hold" | null>(null);

  const sessionData = [
    { session: "Sesión 8", filled: 8, total: 10 },
    { session: "Sesión 9", filled: 9, total: 10 },
    { session: "Sesión 10", filled: 10, total: 10 },
  ];

  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "rgba(30,58,74,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 50,
      fontFamily: "'Inter', sans-serif",
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          width: 560,
          background: "white",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{
          borderLeft: "4px solid #E8A830",
          padding: "18px 24px",
          background: "#FFFBF2",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 20 }}>⚡</span>
              <span style={{ fontWeight: 600, fontSize: 17, color: "#1E3A4A" }}>
                Sugerencia de avance de nivel
              </span>
            </div>
            <div style={{ fontSize: 13, color: "#6B7280" }}>
              Dominio: Reconocimiento Emocional (D1) · Paciente: Lucía Flores
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <X size={18} color="#9E9E9E" />
          </button>
        </div>

        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>

          {/* AD02 — el sistema sugiere, nunca avanza solo */}
          <div style={{
            background: "#F9FAFB", borderRadius: 10,
            padding: "14px 16px",
            fontSize: 13, color: "#374151", lineHeight: 1.6,
          }}>
            <div style={{ marginBottom: 10, fontWeight: 500 }}>
              El sistema detectó que Lucía alcanzó el umbral de progresión:
            </div>
            {sessionData.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ width: 72, fontSize: 12, color: "#6B7280", flexShrink: 0 }}>{s.session}:</span>
                <div style={{ display: "flex", gap: 3 }}>
                  {Array.from({ length: s.total }).map((_, j) => (
                    <div key={j} style={{
                      width: 14, height: 14, borderRadius: "50%",
                      background: j < s.filled ? "#5BAD6F" : "#E5E7EB",
                    }} />
                  ))}
                </div>
                <span style={{ fontSize: 12, color: "#6B7280" }}>({s.filled}/{s.total})</span>
              </div>
            ))}
            <div style={{ marginTop: 8, fontSize: 13, color: "#3D9E8C", fontWeight: 500 }}>
              Promedio últimas 3 sesiones: 90% de aciertos · Umbral: 80%
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 600, fontSize: 15, color: "#1E3A4A", marginBottom: 12 }}>
              Decisión clínica
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setDecision("approve")}
                style={{
                  flex: 1, padding: "14px 12px",
                  borderRadius: 12,
                  background: decision === "approve" ? "#F0FBF5" : "#F9FAFB",
                  border: `${decision === "approve" ? "3px" : "1.5px"} solid ${decision === "approve" ? "#5BAD6F" : "#E5E7EB"}`,
                  cursor: "pointer", textAlign: "left",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 6 }}>✅</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#1E3A4A", marginBottom: 4 }}>
                  Aprobar avance a Nivel 2
                </div>
                <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.4 }}>
                  El nuevo nivel se activará en la próxima sesión
                </div>
              </button>

              <button
                onClick={() => setDecision("hold")}
                style={{
                  flex: 1, padding: "14px 12px",
                  borderRadius: 12,
                  background: decision === "hold" ? "#FFF8E6" : "#F9FAFB",
                  border: `${decision === "hold" ? "3px" : "1.5px"} solid ${decision === "hold" ? "#E8A830" : "#E5E7EB"}`,
                  cursor: "pointer", textAlign: "left",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 6 }}>⏸</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#1E3A4A", marginBottom: 4 }}>
                  Mantener Nivel 1
                </div>
                <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.4 }}>
                  Se registrará como revisado. Puede aprobarse después
                </div>
              </button>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#9E9E9E", fontFamily: "'Inter', sans-serif" }}>
              Cancelar
            </button>
            <button
              onClick={decision ? onConfirm : undefined}
              disabled={!decision}
              style={{
                width: 200, height: 48,
                background: decision ? "#3D9E8C" : "#C9C9C9",
                border: "none", borderRadius: 8,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600, fontSize: 15,
                color: "white", cursor: decision ? "pointer" : "not-allowed",
                boxShadow: decision ? "0 4px 12px rgba(61,158,140,0.3)" : "none",
                transition: "background 0.2s",
              }}
            >
              Confirmar decisión
            </button>
          </div>

          <div style={{ fontSize: 12, color: "#9E9E9E", textAlign: "center", lineHeight: 1.5 }}>
            Esta acción quedará registrada en el historial:<br />
            Ps. Ana Torres · {new Date().toLocaleDateString("es-PE")} · {decision === "approve" ? "Aprobado" : decision === "hold" ? "Mantenido" : "—"}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
