import { motion, AnimatePresence } from "motion/react";

export type OfflineState = "offline" | "restored" | "hidden";

interface OfflineBannerProps {
  state: OfflineState;
}

export function OfflineBanner({ state }: OfflineBannerProps) {
  return (
    <AnimatePresence>
      {state !== "hidden" && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          style={{
            overflow: "hidden",
            background: state === "offline" ? "#E8A830" : "#5BAD6F",
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          <div style={{
            padding: "6px 16px",
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 8, fontWeight: 700, fontSize: 12, color: "white",
          }}>
            <span>{state === "offline" ? "📶" : "✅"}</span>
            <span>
              {state === "offline"
                ? "Sin conexión a internet — sigues jugando, tu progreso se guarda en este dispositivo"
                : "Conexión restaurada — progreso sincronizado"}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
