import { useState } from "react";
import { ArrowLeft, Download, ChevronDown, ChevronUp } from "lucide-react";
import { LevelApproval } from "./LevelApproval";

interface SessionReportProps {
  patientName: string;
  onBack: () => void;
}

// RF07 — reporte básico de uso por sesión: tiempo, módulos, nivel, aciertos/errores
const METRICS = [
  { icon: "⏱", label: "Duración total", value: "12m 34s", color: "#1E3A4A" },
  { icon: "🎯", label: "Escenas completadas", value: "3 / 3", color: "#3D9E8C" },
  { icon: "✅", label: "Aciertos totales", value: "18 / 22", color: "#3D9E8C" },
  { icon: "⚡", label: "Tiempo prom. por respuesta", value: "4.2 seg", color: "#1E3A4A" },
];

const DOMAIN_ROWS = [
  { icon: "🙂", name: "Reconocimiento Emocional", level: "Nivel 2", hits: "8/10", hitsOk: true, errors: 2, avgTime: "3.8s", trend: [6, 7, 7, 8, 8] },
  { icon: "💬", name: "Comunicación Social", level: "Nivel 1", hits: "6/8", hitsOk: true, errors: 2, avgTime: "4.5s", trend: [4, 5, 5, 6, 6] },
  { icon: "🤝", name: "Atención Conjunta", level: "Nivel 1", hits: "4/4", hitsOk: true, errors: 0, avgTime: "5.1s", trend: [2, 3, 3, 4, 4] },
];

function SparkLine({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const w = 60, h = 24;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${h - (v / max) * h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke="#5BAD6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SessionReport({ patientName, onBack }: SessionReportProps) {
  const [notes, setNotes] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [showPrevNotes, setShowPrevNotes] = useState(false);
  const [showApproval, setShowApproval] = useState(false);

  function handleNotesChange(v: string) {
    setNotes(v);
    setSavedAt(null);
    setTimeout(() => setSavedAt("hace un momento"), 1500);
  }

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#F4F6F9",
      fontFamily: "'Inter', sans-serif",
      display: "flex", flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>

      {showApproval && (
        <LevelApproval onClose={() => setShowApproval(false)} onConfirm={() => setShowApproval(false)} />
      )}

      <div style={{
        background: "white",
        borderBottom: "1px solid #E5E7EB",
        padding: "16px 28px",
        display: "flex", alignItems: "flex-start",
        justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
              <ArrowLeft size={16} color="#6B7280" />
            </button>
            <h2 style={{ margin: 0, fontWeight: 600, fontSize: 20, color: "#1E3A4A" }}>
              Reporte de Sesión — {patientName}
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: "#6B7280" }}>
            Fecha: 10 jun 2026 · Duración: 12 min 34 seg
          </p>
        </div>
        <button style={{
          height: 40, padding: "0 14px",
          background: "white", border: "1.5px solid #3D9E8C",
          borderRadius: 8, cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500, fontSize: 13, color: "#3D9E8C",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <Download size={14} />
          Exportar PDF
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px", display: "flex", flexDirection: "column", gap: 16 }}>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {METRICS.map((m, i) => (
            <div key={i} style={{ background: "white", borderRadius: 10, padding: "16px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
              <div style={{ fontSize: 12, color: "#9E9E9E", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
                {m.icon} {m.label}
              </div>
              <div style={{ fontSize: 26, fontWeight: 600, color: m.color }}>{m.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "white", borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                {["Dominio", "Nivel activo", "Aciertos", "Errores", "Tiempo prom.", "Tendencia"].map(h => (
                  <th key={h} style={{
                    padding: "10px 16px", textAlign: "left",
                    fontSize: 11, fontWeight: 500, color: "#9E9E9E",
                    textTransform: "uppercase", letterSpacing: "0.5px",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DOMAIN_ROWS.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < DOMAIN_ROWS.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{row.icon}</span>
                      <span style={{ fontSize: 14, fontWeight: 500, color: "#1E3A4A" }}>{row.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: 20, background: "#E6F7F5", color: "#3D9E8C", fontSize: 12, fontWeight: 600 }}>{row.level}</span>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 600, color: row.hitsOk ? "#5BAD6F" : "#E8A830" }}>
                    {row.hits}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 14, color: "#6B7280" }}>{row.errors}</td>
                  <td style={{ padding: "14px 16px", fontSize: 14, color: "#6B7280" }}>{row.avgTime}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <SparkLine data={row.trend} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AD02 — banner de sugerencia (el sistema NUNCA avanza nivel solo) */}
        <div style={{
          background: "#FFF8E6",
          borderLeft: "4px solid #E8A830",
          borderRadius: 8, padding: "14px 18px",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ fontSize: 18 }}>⚡</span>
            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
              <strong>El sistema sugiere evaluar avance al Nivel 2 en D1 (Reconocimiento Emocional).</strong><br />
              {patientName.split(" ")[0]} alcanzó 9/10 aciertos en las últimas 3 sesiones.
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0, marginLeft: 20 }}>
            <button
              onClick={() => setShowApproval(true)}
              style={{
                height: 36, padding: "0 14px",
                background: "#3D9E8C", border: "none", borderRadius: 8,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600, fontSize: 13, color: "white",
                cursor: "pointer",
              }}
            >
              Aprobar avance
            </button>
            <button style={{
              height: 36, padding: "0 12px",
              background: "white",
              border: "1.5px solid #CBD5E0",
              borderRadius: 8, cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500, fontSize: 13, color: "#6B7280",
            }}>
              Posponer
            </button>
          </div>
        </div>

        {/* Notas clínicas — campo de texto libre */}
        <div style={{ background: "white", borderRadius: 10, padding: "18px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontWeight: 600, fontSize: 15, color: "#1E3A4A" }}>
              📝 Notas clínicas — Sesión 10 jun 2026
            </div>
            {savedAt && <span style={{ fontSize: 12, color: "#5BAD6F" }}>Guardado · {savedAt}</span>}
          </div>
          <textarea
            value={notes}
            onChange={e => handleNotesChange(e.target.value)}
            placeholder="Registre observaciones cualitativas de esta sesión: comportamiento, estado emocional, factores externos..."
            style={{
              width: "100%", minHeight: 140,
              border: "1.5px solid #E5E7EB",
              borderRadius: 8, padding: "12px",
              fontFamily: "'Inter', sans-serif",
              fontSize: 14, color: "#2C2C2C",
              outline: "none", resize: "vertical",
              boxSizing: "border-box",
              lineHeight: 1.6,
            }}
          />

          <button
            onClick={() => setShowPrevNotes(s => !s)}
            style={{
              marginTop: 12, background: "none", border: "none",
              cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
              fontSize: 13, color: "#3D9E8C", fontFamily: "'Inter', sans-serif",
              padding: 0,
            }}
          >
            {showPrevNotes ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            Ver notas de sesiones anteriores
          </button>

          {showPrevNotes && (
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { date: "3 jun 2026", note: "Mostró mayor concentración en la tarea de emociones que en sesiones previas." },
                { date: "27 may 2026", note: "Sesión interrumpida brevemente. Se reincorporó bien tras una pausa corta." },
              ].map((n, i) => (
                <div key={i} style={{ padding: "10px 12px", background: "#F9FAFB", borderRadius: 8, border: "1px solid #E5E7EB" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 4 }}>{n.date}</div>
                  <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.4 }}>{n.note}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
