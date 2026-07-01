import { useEffect } from "react";
import { motion } from "motion/react";
import { SCENES_META } from "../data/scenesContent";
import type { SceneId } from "../data/scenesContent";

interface SceneTransitionProps {
  sceneId: SceneId;
  onContinue: () => void;
}

// Color de fondo suave por dominio, coherente con el anillo del DomainSelector
const BG_BY_DOMINIO: Record<string, string> = {
  D1: "linear-gradient(160deg, #CFEDE5 0%, #F5F0E8 70%)",
  D2: "linear-gradient(160deg, #DCD7F2 0%, #F5F0E8 70%)",
  D3: "linear-gradient(160deg, #F0D9CC 0%, #F5F0E8 70%)",
};

export function SceneTransition({ sceneId, onContinue }: SceneTransitionProps) {
  const meta = SCENES_META[sceneId];

  useEffect(() => {
    const t = setTimeout(onContinue, 2500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneId]);

  return (
    <motion.button
      onClick={onContinue}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        width: "100%", height: "100%",
        border: "none", cursor: "pointer",
        background: BG_BY_DOMINIO[meta.dominio],
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 18,
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 220 }}
        style={{
          width: 120, height: 120, borderRadius: "50%",
          background: "white",
          boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 56,
        }}
      >
        {meta.icon}
      </motion.div>

      <motion.div
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ textAlign: "center" }}
      >
        <div style={{ fontWeight: 800, fontSize: 24, color: "#2C2C2C" }}>
          Vamos a: {meta.label}
        </div>
        <div style={{ fontWeight: 700, fontSize: 16, color: "#3D9E8C", marginTop: 4 }}>
          con {meta.npcName}
        </div>
      </motion.div>

      {/* indicador de avance automático */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 140 }}
        transition={{ duration: 2.5, ease: "linear" }}
        style={{ height: 5, borderRadius: 4, background: "#3D9E8C", marginTop: 8 }}
      />
      <div style={{ fontWeight: 600, fontSize: 12, color: "#9E9E9E" }}>
        Toca para continuar
      </div>
    </motion.button>
  );
}
