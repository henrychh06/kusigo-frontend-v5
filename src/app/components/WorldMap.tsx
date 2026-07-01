import { useState } from "react";
import { motion } from "motion/react";
import { TopBar } from "./TopBar";
// Mantenemos exactamente los mismos imports de imagen que ya tenías en WorldMap.tsx.
// Si tu proyecto ya tiene estos archivos en src/imports/, esto funciona sin cambios.
import classroomBg from "@/imports/97418534-vector-cartoon-background-with-empty-school-classroom-interior-inside-education-concept.jpg";
import streetBg from "@/imports/street-road-graphic-color-city-landscape-sketch-illustration-vector-2CAP1WW.jpg";
import type { Mundo } from "../data/scenesContent";

interface WorldMapProps {
  onSelectMundo: (mundo: Mundo) => void;
  offlineState?: "offline" | "restored" | "hidden";
  soundMode?: "on" | "off" | "visual-only";
  onSoundToggle?: () => void;
}

function SchoolBuilding() {
  return (
    <div style={{ width: 240, height: 190, borderRadius: 12, overflow: "hidden", position: "relative", flexShrink: 0 }}>
      <img
        src={classroomBg}
        alt="Salón de clases"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
      />
      <div style={{ position: "absolute", top: 8, right: 8, display: "flex", flexDirection: "column", gap: 0 }}>
        <div style={{ width: 20, height: 6, background: "#CE1126" }} />
        <div style={{ width: 20, height: 6, background: "white" }} />
        <div style={{ width: 20, height: 6, background: "#CE1126" }} />
      </div>
    </div>
  );
}

function NeighborhoodIllustration() {
  return (
    <div style={{ width: 240, height: 190, borderRadius: 12, overflow: "hidden", position: "relative", flexShrink: 0 }}>
      <img
        src={streetBg}
        alt="El Barrio"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
      />
    </div>
  );
}

function MundoCard({
  mundo, nombre, icon, children, onSelect, delay,
}: {
  mundo: Mundo; nombre: string; icon: string;
  children: React.ReactNode;
  onSelect: (m: Mundo) => void;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      onClick={() => onSelect(mundo)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      style={{
        background: "white",
        border: "none",
        borderRadius: 22,
        padding: "24px 28px",
        boxShadow: hovered ? "0 8px 28px rgba(0,0,0,0.14)" : "0 4px 24px rgba(0,0,0,0.10)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        minWidth: 300,
        cursor: "pointer",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "box-shadow 0.2s, transform 0.2s",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {children}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        <span style={{ fontWeight: 800, fontSize: 22, color: "#2C2C2C" }}>{nombre}</span>
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        background: "#E6F7F5", borderRadius: 20, padding: "6px 16px",
      }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: "#3D9E8C" }}>Elegir actividad</span>
        <span style={{ color: "#3D9E8C", fontWeight: 800 }}>→</span>
      </div>
    </motion.button>
  );
}

export function WorldMap({ onSelectMundo, offlineState = "hidden", soundMode = "on", onSoundToggle }: WorldMapProps) {
  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      fontFamily: "'Nunito', sans-serif",
      background: "linear-gradient(180deg, #B8D9E8 0%, #F5F0E8 60%)",
    }}>
      <TopBar offlineState={offlineState} soundMode={soundMode} onSoundToggle={onSoundToggle} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <div style={{ textAlign: "center", marginBottom: 4 }}>
          <div style={{ fontWeight: 800, fontSize: 24, color: "#2C2C2C" }}>¿A dónde quieres ir?</div>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#7A7A7A", marginTop: 2 }}>Elige un mundo para empezar</div>
        </div>

        <div style={{ display: "flex", gap: 48 }}>
          <MundoCard mundo={1} nombre="El Colegio" icon="🏫" onSelect={onSelectMundo} delay={0}>
            <SchoolBuilding />
          </MundoCard>
          <MundoCard mundo={2} nombre="El Barrio" icon="🏘️" onSelect={onSelectMundo} delay={0.1}>
            <NeighborhoodIllustration />
          </MundoCard>
        </div>
      </div>
    </div>
  );
}
