import { api } from "./client";
import type { Dominio, Nivel } from "../data/scenesContent";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DomainConfig {
  domain: Dominio;
  level: Nivel;
  lastSessionDate: string | null; // ISO date
  advanceSuggested: boolean;
}

export interface PatientSummary {
  id: number;
  name: string;
  age: number;
  lastSessionDate: string | null;
  domainConfigs: DomainConfig[];
}

export interface PatientConfig {
  patientId: number;
  d1Level: Nivel;
  d2Level: Nivel;
  d3Level: Nivel;
}

export interface UpdateConfigRequest {
  d1Level: Nivel;
  d2Level: Nivel;
  d3Level: Nivel;
}

// ─── API calls ───────────────────────────────────────────────────────────────

/** GET /api/patients — listado de pacientes del terapeuta autenticado */
export async function getPatients(): Promise<PatientSummary[]> {
  const { data } = await api.get<PatientSummary[]>("/patients");
  return data;
}

/** GET /api/patients/:id/config — niveles activos de los 3 dominios */
export async function getPatientConfig(patientId: number): Promise<PatientConfig> {
  const { data } = await api.get<PatientConfig>(`/patients/${patientId}/config`);
  return data;
}

/**
 * PUT /api/patients/:id/config
 * El terapeuta guarda la configuración desde PreSessionConfig (Pantalla 9).
 */
export async function updatePatientConfig(
  patientId: number,
  req: UpdateConfigRequest
): Promise<PatientConfig> {
  const { data } = await api.put<PatientConfig>(`/patients/${patientId}/config`, req);
  return data;
}

/**
 * POST /api/patients/:id/level-approval
 * El terapeuta aprueba o mantiene el nivel sugerido (LevelApproval modal).
 */
export async function submitLevelApproval(
  patientId: number,
  domain: Dominio,
  decision: "approve" | "hold",
  notes?: string
): Promise<void> {
  await api.post(`/patients/${patientId}/level-approval`, {
    domain,
    decision,
    notes: notes ?? "",
  });
}
