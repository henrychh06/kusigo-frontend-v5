/**
 * useSession — estado global de la sesión de juego activa.
 *
 * Encapsula:
 * - startSession()  → crea la sesión en el backend al elegir dominio
 * - recordResult()  → envía el resultado de cada escena al completarla
 * - el ID de sesión activa (necesario para submitSceneResult y el reporte)
 *
 * Si hay un error de red, el resultado se encola offline (ver useOfflineQueue).
 */
import { useState, useCallback } from "react";
import { startSession, submitSceneResult } from "../api/sessions";
import type { StartSessionRequest, SceneResultRequest } from "../api/sessions";
import type { SceneId } from "../data/scenesContent";

interface SessionState {
  sessionId: number | null;
  advanceSuggested: boolean;
  loading: boolean;
  error: string | null;
}

export function useSession() {
  const [state, setState] = useState<SessionState>({
    sessionId: null,
    advanceSuggested: false,
    loading: false,
    error: null,
  });

  /** Llama al backend y guarda el sessionId para usar en recordResult */
  const initSession = useCallback(async (req: StartSessionRequest) => {
    setState(s => ({ ...s, loading: true, error: null }));
    try {
      const session = await startSession(req);
      setState(s => ({ ...s, sessionId: session.sessionId, loading: false }));
      return session.sessionId;
    } catch (err) {
      console.error("[useSession] startSession failed", err);
      setState(s => ({ ...s, loading: false, error: "No se pudo iniciar la sesión" }));
      return null;
    }
  }, []);

  /** Envía el resultado de una escena; devuelve si se sugiere avanzar nivel */
  const recordResult = useCallback(
    async (sceneId: SceneId, stars: number, errors: number, responseTimeMs: number) => {
      if (!state.sessionId) return;
      const result: SceneResultRequest = { sceneId, stars, errors, responseTimeMs };
      try {
        const res = await submitSceneResult(state.sessionId, result);
        if (res.advanceSuggested) {
          setState(s => ({ ...s, advanceSuggested: true }));
        }
      } catch (err) {
        console.error("[useSession] submitSceneResult failed — queued offline", err);
        // Encolar para reintento cuando haya conexión
        queueOfflineResult(state.sessionId, result);
      }
    },
    [state.sessionId]
  );

  const reset = useCallback(() => {
    setState({ sessionId: null, advanceSuggested: false, loading: false, error: null });
  }, []);

  return { ...state, initSession, recordResult, reset };
}

// ── Cola offline simple (localStorage) ─────────────────────────────────────
const QUEUE_KEY = "kusigo_offline_queue";

interface QueuedResult {
  sessionId: number;
  result: SceneResultRequest;
  enqueuedAt: number;
}

function queueOfflineResult(sessionId: number, result: SceneResultRequest) {
  const raw = localStorage.getItem(QUEUE_KEY);
  const queue: QueuedResult[] = raw ? JSON.parse(raw) : [];
  queue.push({ sessionId, result, enqueuedAt: Date.now() });
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

/** Llama esto al detectar conexión restaurada (evento "online") */
export async function flushOfflineQueue() {
  const raw = localStorage.getItem(QUEUE_KEY);
  if (!raw) return;
  const queue: QueuedResult[] = JSON.parse(raw);
  const failed: QueuedResult[] = [];

  for (const item of queue) {
    try {
      await submitSceneResult(item.sessionId, item.result);
    } catch {
      failed.push(item);
    }
  }

  if (failed.length === 0) {
    localStorage.removeItem(QUEUE_KEY);
  } else {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(failed));
  }
}
