import { api } from "./client";
import type { Dominio, Mundo, SceneId } from "../data/scenesContent";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface StartSessionRequest {
  patientId: number;
  mundo: Mundo;
  domain: Dominio;
}

export interface SessionResponse {
  sessionId: number;
  patientId: number;
  mundo: Mundo;
  domain: Dominio;
  startedAt: string;
}

export interface SceneResultRequest {
  sceneId: SceneId;
  stars: number;           // 1 | 2 | 3
  errors: number;          // intentos fallidos
  responseTimeMs: number;  // ms hasta el acierto final
}

export interface SceneResultResponse extends SceneResultRequest {
  id: number;
  sessionId: number;
  createdAt: string;
  advanceSuggested: boolean; // true si se alcanzó el umbral de aciertos
}

export interface SessionReportScene {
  sceneId: SceneId;
  stars: number;
  errors: number;
  responseTimeMs: number;
}

export interface SessionReport {
  sessionId: number;
  patientName: string;
  mundo: Mundo;
  domain: Dominio;
  startedAt: string;
  endedAt: string | null;
  totalStars: number;       // suma de estrellas de las 3 escenas (max 9)
  scenes: SessionReportScene[];
  therapistNotes: string;
  advanceSuggested: boolean;
}

// ─── API calls ───────────────────────────────────────────────────────────────

/** POST /api/sessions — inicia una sesión cuando el niño elige dominio */
export async function startSession(req: StartSessionRequest): Promise<SessionResponse> {
  const { data } = await api.post<SessionResponse>("/sessions", req);
  return data;
}

/**
 * POST /api/sessions/:id/results
 * Se llama al completar cada escena (onComplete del motor D1/D2/D3).
 * Devuelve si el sistema sugiere avanzar de nivel.
 */
export async function submitSceneResult(
  sessionId: number,
  result: SceneResultRequest
): Promise<SceneResultResponse> {
  const { data } = await api.post<SceneResultResponse>(
    `/sessions/${sessionId}/results`,
    result
  );
  return data;
}

/** GET /api/sessions/:id/report — Pantalla 10 (SessionReport del terapeuta) */
export async function getSessionReport(sessionId: number): Promise<SessionReport> {
  const { data } = await api.get<SessionReport>(`/sessions/${sessionId}/report`);
  return data;
}

/**
 * PATCH /api/sessions/:id/notes
 * El terapeuta guarda las notas clínicas de texto libre.
 */
export async function saveSessionNotes(
  sessionId: number,
  notes: string
): Promise<void> {
  await api.patch(`/sessions/${sessionId}/notes`, { notes });
}

/**
 * GET /api/patients/:id/sessions?limit=10
 * Historial de sesiones recientes del paciente (para SessionReport).
 */
export async function getPatientSessions(
  patientId: number,
  limit = 10
): Promise<SessionReport[]> {
  const { data } = await api.get<SessionReport[]>(
    `/patients/${patientId}/sessions`,
    { params: { limit } }
  );
  return data;
}
