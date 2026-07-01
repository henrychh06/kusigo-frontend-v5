import { useState } from "react";
import { Users, BarChart2, Settings, LogOut, Search } from "lucide-react";
import { LevelApproval } from "./LevelApproval";

interface PatientDashboardProps {
  onOpenReport: (patientId: string) => void;
  onNewSession: (patientId: string) => void;
  onLogout: () => void;
}

const PATIENTS = [
  {
    id: "lucia",
    name: "Lucía Flores",
    age: 8,
    initials: "LF",
    lastSession: "hace 2 días",
    domains: [
      { icon: "🙂", label: "Emociones", level: "Nivel 2", status: "progressing" },
      { icon: "💬", label: "Comunicación", level: "Nivel 1", status: "stalled" },
      { icon: "🤝", label: "Atención", level: "Nivel 1", status: "progressing" },
    ],
    badge: true,
  },
  {
    id: "diego",
    name: "Diego Ramos",
    age: 9,
    initials: "DR",
    lastSession: "hace 1 semana",
    domains: [
      { icon: "🙂", label: "Emociones", level: "Nivel 1", status: "progressing" },
      { icon: "💬", label: "Comunicación", level: "Nivel 1", status: "progressing" },
      { icon: "🤝", label: "Atención", level: "Nivel 1", status: "stalled" },
    ],
    badge: false,
  },
  {
    id: "sofia",
    name: "Sofía Mendez",
    age: 7,
    initials: "SM",
    lastSession: "hoy",
    domains: [
      { icon: "🙂", label: "Emociones", level: "Nivel 3", status: "progressing" },
      { icon: "💬", label: "Comunicación", level: "Nivel 2", status: "progressing" },
      { icon: "🤝", label: "Atención", level: "Nivel 2", status: "progressing" },
    ],
    badge: false,
  },
];

const NAV_ITEMS = [
  { icon: <Users size={18} />, label: "Mis Pacientes", id: "patients" },
  { icon: <BarChart2 size={18} />, label: "Reportes", id: "reports" },
  { icon: <Settings size={18} />, label: "Configuración", id: "settings" },
];

export function PatientDashboard({ onOpenReport, onNewSession, onLogout }: PatientDashboardProps) {
  const [activeNav, setActiveNav] = useState("patients");
  const [search, setSearch] = useState("");
  const [showApproval, setShowApproval] = useState(false);

  const filtered = PATIENTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex",
      fontFamily: "'Inter', sans-serif",
      background: "#F4F6F9",
      position: "relative",
    }}>

      {showApproval && (
        <LevelApproval
          onClose={() => setShowApproval(false)}
          onConfirm={() => setShowApproval(false)}
        />
      )}

      {/* SIDEBAR */}
      <div style={{ width: 240, background: "#1E3A4A", display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "0 20px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "#3D9E8C",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 600, fontSize: 15, color: "white",
            flexShrink: 0,
          }}>AT</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "white" }}>Ps. Ana Torres</div>
            <div style={{ fontSize: 12, color: "#A8C4D0" }}>Terapeuta</div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "16px 0" }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                width: "100%", height: 48,
                display: "flex", alignItems: "center", gap: 12,
                padding: "0 20px",
                background: "none", border: "none", cursor: "pointer",
                borderLeft: `4px solid ${activeNav === item.id ? "#3D9E8C" : "transparent"}`,
                color: activeNav === item.id ? "white" : "#A8C4D0",
                fontSize: 14, fontWeight: activeNav === item.id ? 600 : 400,
                fontFamily: "'Inter', sans-serif",
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={onLogout}
          style={{
            margin: "0 20px",
            display: "flex", alignItems: "center", gap: 8,
            background: "none", border: "none", cursor: "pointer",
            color: "#A8C4D0", fontSize: 14,
            fontFamily: "'Inter', sans-serif",
            padding: "8px 0",
          }}
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{
          height: 64, background: "white",
          borderBottom: "1px solid #E5E7EB",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          flexShrink: 0,
        }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, color: "#1E3A4A", margin: 0 }}>
            Mis Pacientes
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <Search size={16} color="#9E9E9E" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar paciente..."
                style={{
                  width: 280, height: 40,
                  border: "1.5px solid #E5E7EB",
                  borderRadius: 8,
                  padding: "0 12px 0 34px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14, color: "#2C2C2C", outline: "none",
                  background: "#F9FAFB",
                }}
              />
            </div>
            <button
              title="Contacte al administrador"
              style={{
                height: 40, padding: "0 16px",
                background: "#C9C9C9",
                border: "none", borderRadius: 8,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500, fontSize: 14, color: "white",
                cursor: "not-allowed",
              }}
            >
              + Nuevo paciente
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {filtered.map(patient => (
              <div
                key={patient.id}
                style={{
                  background: "white",
                  borderRadius: 10,
                  padding: "16px 18px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                  position: "relative",
                  transition: "box-shadow 0.15s",
                }}
              >
                {patient.badge && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowApproval(true); }}
                    title="Sugerencia de avance pendiente"
                    style={{
                      position: "absolute", top: 12, right: 12,
                      width: 14, height: 14, borderRadius: "50%",
                      background: "#E8A830", border: "none",
                      cursor: "pointer",
                    }}
                  />
                )}

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "#E6F7F5",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: 18, color: "#3D9E8C",
                    flexShrink: 0, border: "2px solid #3D9E8C",
                  }}>
                    {patient.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15, color: "#1E3A4A" }}>{patient.name}</div>
                    <div style={{ fontSize: 13, color: "#9E9E9E" }}>{patient.age} años</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" as const }}>
                  {patient.domains.map((d, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ fontSize: 13 }}>{d.icon}</span>
                      <span style={{ fontSize: 11, fontWeight: 500, color: "#6B7280" }}>{d.label}</span>
                      <span style={{
                        padding: "2px 6px", borderRadius: 12,
                        background: d.status === "progressing" ? "#DCFCE7" : "#FEF9C3",
                        color: d.status === "progressing" ? "#15803D" : "#92400E",
                        fontSize: 10, fontWeight: 600,
                      }}>
                        {d.level}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize: 12, color: "#9E9E9E", marginBottom: 12 }}>
                  Última sesión: {patient.lastSession}
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => onNewSession(patient.id)}
                    style={{
                      flex: 1, height: 36,
                      background: "#3D9E8C", border: "none", borderRadius: 8,
                      fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: "white",
                      cursor: "pointer",
                    }}
                  >
                    ▶ Nueva sesión
                  </button>
                  <button
                    onClick={() => onOpenReport(patient.id)}
                    style={{
                      flex: 1, height: 36,
                      background: "white", border: "1.5px solid #CBD5E0", borderRadius: 8,
                      fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13, color: "#6B7280",
                      cursor: "pointer",
                    }}
                  >
                    Ver detalle ›
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
