import { motion } from "motion/react";
import { DOMAIN_META } from "../data/scenesContent";
import type { Dominio } from "../data/scenesContent";

interface DomainProgressBarProps {
  dominioActivo: Dominio;
  indiceSesion: number; // 0,1,2 — cuál de las 3 escenas de la sesión se está jugando
}

const DOMINIOS: Dominio[] = ["D1", "D2", "D3"];

/**
 * Barra inferior de gameplay. Marca el dominio activo y, debajo, el avance
 * dentro de la sesión de 3 escenas continuas (●●○ = en la 2da de 3).
 */
export function DomainProgressBar({ dominioActivo, indiceSesion }: DomainProgressBarProps) {
  return (
    <div
      style={{
        height: 64, background: "white",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.06)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 6, flexShrink: 0,
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {DOMINIOS.map((dominio) => {
          const domain = DOMAIN_META[dominio];
          const isActive = dominio === dominioActivo;
          return (
            <motion.div
              key={dominio}
              animate={isActive ? { scale: [1, 1.12, 1] } : {}}
              transition={isActive ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" } : {}}
              style={{
                width: 40, height: 40, borderRadius: "50%",
                background: isActive ? domain.ring : "#F0EAE0",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16,
                border: isActive ? `2.5px solid ${domain.ring}` : "2.5px solid transparent",
                opacity: isActive ? 1 : 0.55,
              }}
              title={domain.titulo}
            >
              {domain.icon}
            </motion.div>
          );
        })}
      </div>

      {/* Avance dentro de la sesión de 3 escenas continuas */}
      <div style={{ display: "flex", gap: 5 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 7, height: 7, borderRadius: "50%",
              background: i < indiceSesion
                ? "#5BAD6F"
                : i === indiceSesion ? DOMAIN_META[dominioActivo].ring : "#E0DACE",
            }}
          />
        ))}
      </div>
    </div>
  );
}
