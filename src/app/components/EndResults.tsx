import { motion } from "motion/react";
import { SCENES_META, DOMAIN_META } from "../data/scenesContent";
import type { SceneId } from "../data/scenesContent";

export interface ResultadoEscena {
  sceneId: SceneId;
  stars: 1 | 2 | 3;
}

interface EndResultsProps {
  playerName: string;
  resultados: ResultadoEscena[]; // las 3 escenas de la sesión, en orden
  onElegirOtraActividad: () => void;
}

function labelTotal(total: number): string {
  if (total >= 8) return "¡Excelente trabajo!";
  if (total >= 5) return "¡Muy bien hecho!";
  return "¡Lo lograste!";
}

export function EndResults({ playerName, resultados, onElegirOtraActividad }: EndResultsProps) {
  const dominio = SCENES_META[resultados[0].sceneId].dominio;
  const domain = DOMAIN_META[dominio];
  const totalStars = resultados.reduce((sum, r) => sum + r.stars, 0);

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 22, fontFamily: "'Nunito', sans-serif",
      background: "linear-gradient(180deg, #FFF6E0 0%, #F5F0E8 100%)",
      padding: "20px 0",
    }}>
      <div style={{ textAlign: "center" }}>
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260 }}
          style={{ fontSize: 36, fontWeight: 800, color: "#2C2C2C" }}
        >
          ¡Bien hecho, {playerName}!
        </motion.div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 4 }}>
          <span style={{ fontSize: 16 }}>{domain.icon}</span>
          <span style={{ fontWeight: 600, fontSize: 15, color: "#9E9E9E" }}>
            {domain.titulo} — 3 actividades completadas ✅
          </span>
        </div>
      </div>

      {/* Desglose por escena */}
      <div style={{ display: "flex", gap: 14 }}>
        {resultados.map((r) => {
          const meta = SCENES_META[r.sceneId];
          return (
            <motion.div
              key={r.sceneId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{
                width: 150, borderRadius: 14, background: "white",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                padding: "12px 10px", display: "flex", flexDirection: "column",
                alignItems: "center", gap: 6,
              }}
            >
              <span style={{ fontSize: 24 }}>{meta.icon}</span>
              <span style={{ fontWeight: 700, fontSize: 12, color: "#2C2C2C", textAlign: "center", lineHeight: 1.3 }}>
                {meta.label}
              </span>
              <div style={{ display: "flex", gap: 2 }}>
                {[1, 2, 3].map(n => (
                  <span key={n} style={{ fontSize: 16, filter: n <= r.stars ? "none" : "grayscale(1) opacity(0.25)" }}>⭐</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Total */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 280 }}
          style={{
            background: domain.ring, color: "white", borderRadius: 20,
            padding: "8px 22px", fontWeight: 800, fontSize: 18,
          }}
        >
          ⭐ {totalStars} / 9
        </motion.div>
        <div style={{ fontWeight: 700, fontSize: 16, color: "#E8A830" }}>{labelTotal(totalStars)}</div>
      </div>

      <button
        onClick={onElegirOtraActividad}
        style={{
          height: 56, minWidth: 260, padding: "0 28px", borderRadius: 14,
          background: "#3D9E8C", border: "none",
          fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 16, color: "white",
          cursor: "pointer", boxShadow: "0 4px 14px rgba(61,158,140,0.35)",
        }}
      >
        Elegir otra actividad
      </button>
    </div>
  );
}
