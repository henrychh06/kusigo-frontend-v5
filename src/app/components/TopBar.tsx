import { Volume2, VolumeX, Eye } from "lucide-react";
import { motion } from "motion/react";
import { OfflineBanner } from "./OfflineBanner";

type SoundMode = "on" | "off" | "visual-only";
type OfflineState = "offline" | "restored" | "hidden";

interface TopBarProps {
  centerLabel?: string;
  centerIcon?: React.ReactNode;
  showTimer?: boolean;
  timerProgress?: number; // 0–1
  offlineState?: OfflineState;
  soundMode?: SoundMode;
  onSoundToggle?: () => void;
}

// Flat SVG avatar para el badge del jugador
function PlayerAvatar() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#C68642" />
      <ellipse cx="20" cy="13" rx="10" ry="8" fill="#3D1C00" />
      <ellipse cx="20" cy="22" rx="9" ry="10" fill="#C68642" />
      <circle cx="16" cy="21" r="2" fill="#2C2C2C" />
      <circle cx="24" cy="21" r="2" fill="#2C2C2C" />
      <circle cx="16.6" cy="20.4" r="0.7" fill="white" />
      <circle cx="24.6" cy="20.4" r="0.7" fill="white" />
      <path d="M15 25.5 Q20 29 25 25.5" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// Anillo circular de tiempo de sesión
function TimerRing({ progress }: { progress: number }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const dash = circ * progress;
  const isWarning = progress > 0.86;
  const color = isWarning ? "#E8A830" : progress < 0.6 ? "#5BAD6F" : "#7BA7C2";
  return (
    <div style={{ position: "relative" }}>
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={r} fill="none" stroke="#E0D9CC" strokeWidth="4" />
        <circle
          cx="24" cy="24" r={r}
          fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeDashoffset={circ * 0.25}
          style={{ transition: "stroke-dasharray 1s linear" }}
        />
        <circle cx="24" cy="24" r="8" fill="none" stroke="#7BA7C2" strokeWidth="1.5" />
        <line x1="24" y1="24" x2="24" y2="19" stroke="#7BA7C2" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="24" x2="28" y2="24" stroke="#7BA7C2" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {isWarning && (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            position: "absolute", bottom: -4, right: -4,
            width: 18, height: 18, background: "#E8A830", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, border: "1.5px solid white",
          }}
        >
          🦉
        </motion.div>
      )}
    </div>
  );
}

function SoundBadge({ mode, onToggle }: { mode: SoundMode; onToggle?: () => void }) {
  return (
    <button
      onClick={onToggle}
      title={mode === "on" ? "Sonido activado" : mode === "off" ? "Sin sonido" : "Solo visual"}
      style={{
        width: 40, height: 40, borderRadius: "50%",
        background: "#F5F0E8", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 2, position: "relative",
      }}
    >
      {mode === "on" && <Volume2 size={20} color="#3D9E8C" />}
      {mode === "off" && <VolumeX size={20} color="#9E9E9E" />}
      {mode === "visual-only" && (
        <div style={{ position: "relative" }}>
          <VolumeX size={18} color="#9E9E9E" />
          <Eye size={12} color="#9E9E9E" style={{ position: "absolute", bottom: -4, right: -6 }} />
        </div>
      )}
    </button>
  );
}

export function TopBar({
  centerLabel, centerIcon, showTimer, timerProgress = 0.3,
  offlineState = "hidden", soundMode = "on", onSoundToggle,
}: TopBarProps) {
  return (
    <div style={{ flexShrink: 0 }}>
      <OfflineBanner state={offlineState} />
      <div
        style={{
          height: 64, background: "white",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px",
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%", overflow: "hidden",
            border: "2.5px solid #E8A830",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "#F5F0E8",
          }}>
            <PlayerAvatar />
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#2C2C2C" }}>Tú</span>
        </div>

        {centerLabel ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {centerIcon}
            <span style={{ fontWeight: 800, fontSize: 20, color: "#3D9E8C", letterSpacing: 0.2 }}>
              {centerLabel}
            </span>
          </div>
        ) : (
          <span style={{ fontWeight: 800, fontSize: 24, color: "#3D9E8C", letterSpacing: 0.5 }}>
            KusiGo
          </span>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <SoundBadge mode={soundMode} onToggle={onSoundToggle} />
          {showTimer && <TimerRing progress={timerProgress} />}
        </div>
      </div>
    </div>
  );
}
