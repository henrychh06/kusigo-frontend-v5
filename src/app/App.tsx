import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { WorldMap } from "./components/WorldMap";
import { DomainSelector } from "./components/DomainSelector";
import { SceneTransition } from "./components/SceneTransition";
import { EndResults, type ResultadoEscena } from "./components/EndResults";
import { SceneGameD1 } from "./components/scenes/SceneGameD1";
import { DialogueGameD2 } from "./components/scenes/DialogueGameD2";
import { TurnGameD3 } from "./components/scenes/TurnGameD3";

import { AvatarCustomization, type AvatarConfig } from "./components/AvatarCustomization";

import { TherapistLogin } from "./components/therapist/TherapistLogin";
import { PatientDashboard } from "./components/therapist/PatientDashboard";
import { PreSessionConfig, type NivelesSesion } from "./components/therapist/PreSessionConfig";
import { SessionReport } from "./components/therapist/SessionReport";

import {
  SCENES_META, PROGRESION_NINO_MOCK, progresionKey, sesionDelDominio,
} from "./data/scenesContent";
import type { Mundo, SceneId, ProgresionNino, Dominio, D1SceneId, D2SceneId, D3SceneId } from "./data/scenesContent";

type SoundMode = "on" | "off" | "visual-only";
type OfflineState = "offline" | "restored" | "hidden";

type Screen =
  | "avatar"
  | "worldmap"
  | "domain-selector"
  | "scene-transition"
  | "scene-gameplay"
  | "end-results"
  | "t-login"
  | "t-dashboard"
  | "t-presession"
  | "t-report";

const PATIENT_NAMES: Record<string, string> = {
  lucia: "Lucía Flores",
  diego: "Diego Ramos",
  sofia: "Sofía Mendez",
};

function ModeToggle({
  isTherapist, onToggle, offlineState, onOfflineToggle, soundMode, onSoundToggle,
  progresion, mundoActivo, onBumpNivel,
}: {
  isTherapist: boolean;
  onToggle: () => void;
  offlineState: OfflineState;
  onOfflineToggle: () => void;
  soundMode: SoundMode;
  onSoundToggle: () => void;
  progresion: ProgresionNino;
  mundoActivo: Mundo | null;
  onBumpNivel: (dominio: Dominio) => void;
}) {
  return (
    <div style={{ position: "absolute", top: 8, right: 8, zIndex: 100, display: "flex", gap: 6, flexWrap: "wrap" as const, maxWidth: 380, justifyContent: "flex-end" }}>
      {!isTherapist && (
        <>
          <button onClick={onOfflineToggle} style={{ padding: "5px 10px", borderRadius: 8, background: "#E8A830", border: "none", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 10, color: "white", opacity: 0.85 }}>
            📶 Sin conexión ({offlineState})
          </button>
          <button onClick={onSoundToggle} style={{ padding: "5px 10px", borderRadius: 8, background: "#7BA7C2", border: "none", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 10, color: "white", opacity: 0.85 }}>
            🔊 Sonido ({soundMode})
          </button>
          {mundoActivo && (
            <>
              <button onClick={() => onBumpNivel("D1")} style={{ padding: "5px 10px", borderRadius: 8, background: "#0F6E56", border: "none", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 10, color: "white", opacity: 0.85 }}>
                D1 → Nivel {progresion[progresionKey(mundoActivo, "D1")]}
              </button>
              <button onClick={() => onBumpNivel("D2")} style={{ padding: "5px 10px", borderRadius: 8, background: "#534AB7", border: "none", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 10, color: "white", opacity: 0.85 }}>
                D2 → Nivel {progresion[progresionKey(mundoActivo, "D2")]}
              </button>
              <button onClick={() => onBumpNivel("D3")} style={{ padding: "5px 10px", borderRadius: 8, background: "#993C1D", border: "none", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 10, color: "white", opacity: 0.85 }}>
                D3 → Nivel {progresion[progresionKey(mundoActivo, "D3")]}
              </button>
            </>
          )}
        </>
      )}
      <button
        onClick={onToggle}
        style={{
          padding: "5px 10px", borderRadius: 8,
          background: isTherapist ? "#1E3A4A" : "#3D9E8C",
          border: "none", cursor: "pointer",
          fontFamily: isTherapist ? "'Inter', sans-serif" : "'Nunito', sans-serif",
          fontWeight: 700, fontSize: 11, color: "white", opacity: 0.9,
        }}
      >
        {isTherapist ? "👶 Vista Niño" : "🩺 Vista Terapeuta"}
      </button>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("avatar");
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig | null>(null);
  const [isTherapist, setIsTherapist] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const [mundoActivo, setMundoActivo] = useState<Mundo | null>(null);

  const [sesionEscenas, setSesionEscenas] = useState<SceneId[] | null>(null);
  const [indiceSesion, setIndiceSesion] = useState(0);
  const [resultadosSesion, setResultadosSesion] = useState<ResultadoEscena[]>([]);

  const sceneActiva: SceneId | null = sesionEscenas ? sesionEscenas[indiceSesion] : null;

  // Simulación local de PROGRESION_NINO — el mismo objeto que alimenta tanto
  // el flujo del niño (DomainSelector) como el del terapeuta (PreSessionConfig
  // escribe aquí al iniciar una sesión). En producción esto vive en el backend.
  const [progresion, setProgresion] = useState<ProgresionNino>(PROGRESION_NINO_MOCK);

  const [soundMode, setSoundMode] = useState<SoundMode>("on");
  const [offlineState, setOfflineState] = useState<OfflineState>("hidden");

  const canvasW = 1024;
  const canvasH = 768;

  function go(s: Screen) { setScreen(s); }

  function cycleSoundMode() {
    setSoundMode(m => m === "on" ? "off" : m === "off" ? "visual-only" : "on");
  }
  function toggleOffline() {
    setOfflineState(s => s === "hidden" ? "offline" : s === "offline" ? "restored" : "hidden");
  }
  function bumpNivel(dominio: Dominio) {
    if (!mundoActivo) return;
    const key = progresionKey(mundoActivo, dominio);
    setProgresion(p => {
      const next = ((p[key] % 3) + 1) as 1 | 2 | 3;
      return { ...p, [key]: next };
    });
  }

  function handleToggleMode() {
    setIsTherapist(t => {
      const next = !t;
      go(next ? "t-login" : "avatar");
      return next;
    });
  }

  function handleSelectMundo(m: Mundo) {
    setMundoActivo(m);
    go("domain-selector");
  }

  function handleSelectDominio(dominio: Dominio) {
    if (!mundoActivo) return;
    const escenas = sesionDelDominio(mundoActivo, dominio);
    setSesionEscenas(escenas);
    setIndiceSesion(0);
    setResultadosSesion([]);
    go("scene-transition");
  }

  function handleSceneComplete(stars: 1 | 2 | 3) {
    if (!sceneActiva || !sesionEscenas) return;
    const nuevosResultados = [...resultadosSesion, { sceneId: sceneActiva, stars }];
    setResultadosSesion(nuevosResultados);

    const esLaUltima = indiceSesion >= sesionEscenas.length - 1;
    if (esLaUltima) go("end-results");
    else {
      setIndiceSesion(i => i + 1);
      go("scene-transition");
    }
  }

  function handleElegirOtraActividad() {
    setSesionEscenas(null);
    setIndiceSesion(0);
    setResultadosSesion([]);
    go("domain-selector");
  }

  // ── Terapeuta ──────────────────────────────────────────────────────────
  function handleOpenReport(patientId: string) {
    setSelectedPatientId(patientId);
    go("t-report");
  }

  function handleNewSession(patientId: string) {
    setSelectedPatientId(patientId);
    go("t-presession");
  }

  // Al iniciar sesión desde PreSessionConfig: los niveles elegidos por el
  // terapeuta (AD01) se escriben en la PROGRESION_NINO compartida — para
  // los 2 mundos por igual, ya que la configuración es por dominio, no por
  // mundo — y la app cambia a la vista del niño en el mapa de mundos, lista
  // para jugar con esos niveles. Esto demuestra la integración real entre
  // ambas vistas sin backend.
  function handleIniciarSesionTerapeuta(niveles: NivelesSesion) {
    setProgresion(p => ({
      ...p,
      "1-D1": niveles.d1, "2-D1": niveles.d1,
      "1-D2": niveles.d2, "2-D2": niveles.d2,
      "1-D3": niveles.d3, "2-D3": niveles.d3,
    }));
    setIsTherapist(false);
    setMundoActivo(null);
    setSesionEscenas(null);
    go("worldmap");
  }

  const nivelActivo = mundoActivo && sceneActiva
    ? progresion[progresionKey(mundoActivo, SCENES_META[sceneActiva].dominio)]
    : 1;

  const selectedPatientName = selectedPatientId ? (PATIENT_NAMES[selectedPatientId] ?? "Paciente") : "Paciente";

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#2C2C2C", position: "relative",
    }}>
      <div style={{
        width: canvasW, height: canvasH,
        borderRadius: 16, overflow: "hidden",
        boxShadow: "0 16px 64px rgba(0,0,0,0.5)",
        position: "relative", display: "flex", flexDirection: "column",
      }}>
        <ModeToggle
          isTherapist={isTherapist} onToggle={handleToggleMode}
          offlineState={offlineState} onOfflineToggle={toggleOffline}
          soundMode={soundMode} onSoundToggle={cycleSoundMode}
          progresion={progresion} mundoActivo={mundoActivo} onBumpNivel={bumpNivel}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={screen + (sceneActiva ?? "") + indiceSesion + (selectedPatientId ?? "")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}
          >
            {/* ── NIÑO ── */}

            {screen === "avatar" && (
              <AvatarCustomization
                onComplete={cfg => { setAvatarConfig(cfg); go("worldmap"); }}
                onBack={() => go("worldmap")}
              />
            )}

            {screen === "worldmap" && (
              <WorldMap
                onSelectMundo={handleSelectMundo}
                offlineState={offlineState}
                soundMode={soundMode}
                onSoundToggle={cycleSoundMode}
              />
            )}

            {screen === "domain-selector" && mundoActivo && (
              <DomainSelector
                mundo={mundoActivo}
                progresion={progresion}
                onSelectDominio={handleSelectDominio}
                onBack={() => go("worldmap")}
              />
            )}

            {screen === "scene-transition" && sceneActiva && (
              <SceneTransition sceneId={sceneActiva} onContinue={() => go("scene-gameplay")} />
            )}

            {screen === "scene-gameplay" && sceneActiva && (() => {
              const dominio = SCENES_META[sceneActiva].dominio;
              if (dominio === "D1") {
                return (
                  <SceneGameD1
                    sceneId={sceneActiva as D1SceneId} nivel={nivelActivo} indiceSesion={indiceSesion}
                    onComplete={handleSceneComplete} onBack={() => go("domain-selector")}
                  />
                );
              }
              if (dominio === "D2") {
                return (
                  <DialogueGameD2
                    sceneId={sceneActiva as D2SceneId} nivel={nivelActivo} indiceSesion={indiceSesion}
                    onComplete={handleSceneComplete} onBack={() => go("domain-selector")}
                  />
                );
              }
              return (
                <TurnGameD3
                  sceneId={sceneActiva as D3SceneId} nivel={nivelActivo} indiceSesion={indiceSesion}
                  onComplete={handleSceneComplete} onBack={() => go("domain-selector")}
                />
              );
            })()}

            {screen === "end-results" && resultadosSesion.length === 3 && (
              <EndResults
                playerName={avatarConfig?.name || "Campeón"}
                resultados={resultadosSesion}
                onElegirOtraActividad={handleElegirOtraActividad}
              />
            )}

            {/* ── TERAPEUTA ── */}

            {screen === "t-login" && (
              <TherapistLogin onLogin={() => go("t-dashboard")} />
            )}

            {screen === "t-dashboard" && (
              <PatientDashboard
                onOpenReport={handleOpenReport}
                onNewSession={handleNewSession}
                onLogout={() => { setIsTherapist(false); go("avatar"); }}
              />
            )}

            {screen === "t-presession" && (
              <PreSessionConfig
                patientName={selectedPatientName}
                onStart={handleIniciarSesionTerapeuta}
                onBack={() => go("t-dashboard")}
              />
            )}

            {screen === "t-report" && (
              <SessionReport
                patientName={selectedPatientName}
                onBack={() => go("t-dashboard")}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
