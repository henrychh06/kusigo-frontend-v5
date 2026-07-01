import { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff } from "lucide-react";

interface TherapistLoginProps {
  onLogin: () => void;
}

export function TherapistLogin({ onLogin }: TherapistLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex",
      fontFamily: "'Inter', sans-serif",
      background: "#F4F6F9",
    }}>
      {/* Left decorative panel */}
      <div style={{
        width: "50%",
        background: "#1E3A4A",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "space-between",
        padding: "40px 48px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ alignSelf: "flex-start" }}>
          <span style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800, fontSize: 28,
            color: "white", letterSpacing: 0.5,
          }}>
            KusiGo
          </span>
          <div style={{ fontSize: 12, color: "#A8C4D0", fontWeight: 400, marginTop: 2 }}>
            Plataforma terapéutica
          </div>
        </div>

        <div style={{ width: 320, height: 360, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 120 }}>
          👩‍🏫
        </div>

        <p style={{ color: "#A8C4D0", fontSize: 15, textAlign: "center", lineHeight: 1.6, margin: 0 }}>
          Plataforma de seguimiento terapéutico
        </p>

        <div style={{ position: "absolute", bottom: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "#3D9E8C", opacity: 0.15 }} />
        <div style={{ position: "absolute", top: -40, left: -40, width: 140, height: 140, borderRadius: "50%", background: "#3D9E8C", opacity: 0.1 }} />
      </div>

      {/* Right login form */}
      <div style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            width: 480,
            background: "white",
            borderRadius: 16,
            padding: "40px 40px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          }}
        >
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600, fontSize: 24,
            color: "#1E3A4A", margin: "0 0 28px 0",
          }}>
            Acceso Terapeuta
          </h2>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontWeight: 500, fontSize: 14, color: "#1E3A4A", marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="terapeuta@kusigo.pe"
              style={{
                width: "100%", height: 48,
                border: `1.5px solid ${email ? "#3D9E8C" : "#CBD5E0"}`,
                borderRadius: 8, padding: "0 14px",
                fontFamily: "'Inter', sans-serif",
                fontSize: 15, color: "#2C2C2C",
                outline: "none", boxSizing: "border-box",
                background: "white",
                transition: "border-color 0.2s",
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontWeight: 500, fontSize: 14, color: "#1E3A4A", marginBottom: 6 }}>
              Contraseña
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%", height: 48,
                  border: `1.5px solid ${password ? "#3D9E8C" : "#CBD5E0"}`,
                  borderRadius: 8, padding: "0 44px 0 14px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15, color: "#2C2C2C",
                  outline: "none", boxSizing: "border-box",
                  background: "white",
                  transition: "border-color 0.2s",
                }}
              />
              <button
                onClick={() => setShowPass(s => !s)}
                style={{
                  position: "absolute", right: 12, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none",
                  cursor: "pointer", padding: 0,
                  display: "flex", alignItems: "center",
                }}
              >
                {showPass ? <EyeOff size={18} color="#9E9E9E" /> : <Eye size={18} color="#9E9E9E" />}
              </button>
            </div>
          </div>

          <button
            onClick={onLogin}
            style={{
              width: "100%", height: 48,
              background: "#3D9E8C", border: "none",
              borderRadius: 8, cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600, fontSize: 16, color: "white",
              boxShadow: "0 4px 14px rgba(61,158,140,0.35)",
              transition: "opacity 0.2s",
            }}
          >
            Ingresar
          </button>

          <div style={{ textAlign: "right", marginTop: 12 }}>
            <span style={{ fontSize: 13, color: "#3D9E8C", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
              ¿Olvidó su contraseña?
            </span>
          </div>

          <p style={{
            marginTop: 28, fontSize: 12, color: "#9E9E9E",
            textAlign: "center", lineHeight: 1.5,
            fontFamily: "'Inter', sans-serif",
          }}>
            Acceso exclusivo para especialistas clínicos
          </p>
        </motion.div>
      </div>
    </div>
  );
}
