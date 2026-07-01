import { useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";

export interface NivelesSesion {
  d1: 1 | 2 | 3;
  d2: 1 | 2 | 3;
  d3: 1 | 2 | 3;
}

interface PreSessionConfigProps {
  patientName: string;
  onStart: (niveles: NivelesSesion) => void;
  onBack: () => void;
}

// AD01 — niveles predefinidos por dominio, seleccionables manualmente por el
// terapeuta antes de la sesión (no por el niño).
const DOMAINS = [
  {
    id: "d1" as const,
    icon: "🙂",
    name: "Reconocimiento Emocional",
    desc: "Identificar emociones en situaciones sociales",
    levels: [
      { n: 1, desc: "2 opciones · Pistas visuales activas · Emociones primarias", locked: false },
      { n: 2, desc: "3 opciones · Pistas moderadas · Emociones secundarias", locked: false },
      { n: 3, desc: "4 opciones · Sin pistas · Emociones complejas y ambiguas", locked: true },
    ],
    lastSession: "Nivel 1 · hace 3 días",
  },
  {
    id: "d2" as const,
    icon: "💬",
    name: "Comunicación Social",
    desc: "Elegir respuestas adecuadas en diálogos",
    levels: [
      { n: 1, desc: "2 opciones · Pistas visuales activas · Diálogo directo", locked: false },
      { n: 2, desc: "3 opciones · Pistas moderadas · Pide ayuda indirectamente", locked: false },
      { n: 3, desc: "4 opciones · Sin pistas · Frustración oculta", locked: true },
    ],
    lastSession: "Nivel 1 · hace 5 días",
  },
  {
    id: "d3" as const,
    icon: "🤝",
    name: "Atención Conjunta / Turno",
    desc: "Completar tareas secuenciales con un personaje",
    levels: [
      { n: 1, desc: "2 pasos · Indicador grande + voz", locked: false },
      { n: 2, desc: "3 pasos · Pistas moderadas, sin voz", locked: true },
      { n: 3, desc: "4 pasos · Sin pistas explícitas", locked: true },
    ],
    lastSession: "Nivel 1 · hace 1 semana",
  },
];

export function PreSessionConfig({ patientName, onStart, onBack }: PreSessionConfigProps) {
  const [selectedLevels, setSelectedLevels] = useState<NivelesSesion>({ d1: 2, d2: 1, d3: 1 });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#F4F6F9",
      fontFamily: "'Inter', sans-serif",
      display: "flex", flexDirection: "column",
    }}>
      <div style={{
        height: 80, background: "white",
        borderBottom: "1px solid #E5E7EB",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" }}>
            <ArrowLeft size={18} color="#6B7280" />
          </button>
          <span style={{ fontSize: 13, color: "#6B7280" }}>
            Mis Pacientes › <span style={{ color: "#1E3A4A", fontWeight: 500 }}>{patientName}</span> › Configurar sesión
          </span>
        </div>
        <button
          onClick={() => onStart(selectedLevels)}
          style={{
            height: 40, padding: "0 20px",
            background: "#3D9E8C", border: "none", borderRadius: 8,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600, fontSize: 14, color: "white",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(61,158,140,0.3)",
          }}
        >
          Iniciar sesión →
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 28px", gap: 16, overflowX: "auto" }}>
        {DOMAINS.map(domain => (
          <div
            key={domain.id}
            style={{
              width: 340, flexShrink: 0,
              background: "white",
              borderRadius: 14,
              padding: "20px 20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              display: "flex", flexDirection: "column", gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: "#E6F7F5",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, flexShrink: 0,
              }}>
                {domain.icon}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, color: "#1E3A4A" }}>{domain.name}</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2, lineHeight: 1.4 }}>{domain.desc}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {domain.levels.map(level => {
                const isSelected = selectedLevels[domain.id] === level.n;
                const isLocked = level.locked;
                return (
                  <button
                    key={level.n}
                    disabled={isLocked}
                    onClick={() => !isLocked && setSelectedLevels(s => ({ ...s, [domain.id]: level.n as 1 | 2 | 3 }))}
                    style={{
                      flex: 1, height: 52,
                      borderRadius: 10,
                      background: isLocked ? "#F3F4F6" : isSelected ? "#3D9E8C" : "white",
                      border: `1.5px solid ${isLocked ? "#E5E7EB" : isSelected ? "#3D9E8C" : "#CBD5E0"}`,
                      cursor: isLocked ? "not-allowed" : "pointer",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600, fontSize: 13,
                      color: isLocked ? "#9E9E9E" : isSelected ? "white" : "#1E3A4A",
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center", gap: 2,
                      boxShadow: isSelected ? "0 2px 8px rgba(61,158,140,0.25)" : "none",
                      transition: "all 0.15s",
                    }}
                  >
                    {isLocked ? <Lock size={12} /> : null}
                    Nivel {level.n}
                  </button>
                );
              })}
            </div>

            <div style={{ background: "#F9FAFB", borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>
              {domain.levels.find(l => l.n === selectedLevels[domain.id])?.desc || "—"}
            </div>

            <div style={{ fontSize: 12, color: "#9E9E9E", borderTop: "1px solid #F3F4F6", paddingTop: 10 }}>
              Última sesión con este dominio: {domain.lastSession}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        height: 72, background: "white",
        borderTop: "1px solid #E5E7EB",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        flexShrink: 0,
      }}>
        <button
          onClick={onBack}
          style={{
            height: 40, padding: "0 16px",
            background: "white",
            border: "1.5px solid #CBD5E0",
            borderRadius: 8,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500, fontSize: 14, color: "#6B7280",
            cursor: "pointer",
          }}
        >
          Cancelar
        </button>
        <button
          onClick={() => onStart(selectedLevels)}
          style={{
            height: 48, padding: "0 28px",
            background: "#3D9E8C", border: "none",
            borderRadius: 8,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600, fontSize: 14, color: "white",
            cursor: "pointer",
            boxShadow: "0 3px 10px rgba(61,158,140,0.3)",
          }}
        >
          Iniciar sesión con esta configuración
        </button>
      </div>
    </div>
  );
}
