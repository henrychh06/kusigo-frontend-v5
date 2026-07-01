import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { TopBar } from "./TopBar";
import { MUNDOS, DOMAIN_META, progresionKey } from "../data/scenesContent";
import type { Mundo, ProgresionNino, Dominio } from "../data/scenesContent";

interface DomainSelectorProps {
  mundo: Mundo;
  progresion: ProgresionNino;
  onSelectDominio: (dominio: Dominio) => void;
  onBack: () => void;
}

const DOMINIOS: Dominio[] = ["D1", "D2", "D3"];

function DomainCard({
  dominio, nivelActivo, onSelect, delay,
}: {
  dominio: Dominio;
  nivelActivo: number;
  onSelect: (d: Dominio) => void;
  delay: number;
}) {
  const domain = DOMAIN_META[dominio];

  return (
    <motion.button
      onClick={() => onSelect(dominio)}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      style={{
        position: "relative",
        width: 280, height: 330,
        borderRadius: 22,
        background: "white",
        border: "none",
        boxShadow: "0 4px 22px rgba(0,0,0,0.10)",
        display: "flex", flexDirection: "column",
        alignItems: "center",
        padding: "28px 20px 22px",
        cursor: "pointer",
        fontFamily: "'Nunito', sans-serif",
        gap: 12,
      }}
    >
      <div style={{
        position: "absolute", top: 14, right: 14,
        background: domain.ring, color: "white",
        borderRadius: 20, padding: "4px 12px",
        fontWeight: 800, fontSize: 12,
      }}>
        Nivel {nivelActivo}
      </div>

      <div style={{
        width: 96, height: 96, borderRadius: "50%",
        background: "white",
        border: `5px solid ${domain.ring}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 42,
        marginTop: 4,
      }}>
        {domain.icon}
      </div>

      <div style={{ fontWeight: 800, fontSize: 18, color: "#2C2C2C", textAlign: "center" }}>
        {domain.titulo}
      </div>

      <div style={{ fontWeight: 600, fontSize: 14, color: "#7A7A7A", textAlign: "center", lineHeight: 1.4, flex: 1 }}>
        {domain.sesionDescripcion}
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{
          background: `${domain.ring}1A`,
          color: domain.ring,
          borderRadius: 20, padding: "6px 16px",
          fontWeight: 800, fontSize: 12,
        }}>
          {domain.pillLabel}
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9E9E9E" }}>
          🔁 3 actividades en esta sesión
        </div>
      </div>
    </motion.button>
  );
}

export function DomainSelector({ mundo, progresion, onSelectDominio, onBack }: DomainSelectorProps) {
  const mundoMeta = MUNDOS[mundo];

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      fontFamily: "'Nunito', sans-serif",
      background: "#F5F0E8",
    }}>
      <TopBar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 40px", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={onBack}
            style={{
              width: 48, height: 48, borderRadius: "50%",
              border: "none", background: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0,
            }}
          >
            <ArrowLeft size={20} color="#3D9E8C" />
          </button>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 22 }}>{mundoMeta.icon}</span>
              <span style={{ fontWeight: 800, fontSize: 20, color: "#2C2C2C" }}>{mundoMeta.nombre}</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: 12, color: "#9E9E9E", marginTop: 2 }}>
              Nivel actual de cada actividad
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 2 }}>
          <div style={{ fontWeight: 800, fontSize: 24, color: "#2C2C2C" }}>¿Qué quieres practicar hoy?</div>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#7A7A7A", marginTop: 2 }}>
            Elige una actividad para empezar
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 28 }}>
          {DOMINIOS.map((dominio, i) => (
            <DomainCard
              key={dominio}
              dominio={dominio}
              nivelActivo={progresion[progresionKey(mundo, dominio)] ?? 1}
              onSelect={onSelectDominio}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
