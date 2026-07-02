/**
 * KusiGo — Registro central de assets
 *
 * CÓMO AGREGAR IMÁGENES:
 * 1. Coloca el archivo en public/assets/<carpeta>/ con el nombre exacto indicado.
 * 2. No toques este archivo — la ruta se construye automáticamente.
 *
 * Estructura de carpetas en /public/assets/
 * ─────────────────────────────────────────
 * backgrounds/
 *   mundo1.jpg          ← fondo El Colegio (WorldMap card + escenas M1)
 *   mundo2.jpg          ← fondo El Barrio  (WorldMap card + escenas M2)
 *
 * npcs/<npcKey>/
 *   nivel1.png          ← expresión exagerada (D1) o imagen normal
 *   nivel2.png          ← expresión moderada
 *   nivel3.png          ← expresión sutil / estándar
 *   (D2 y D3 usan nivel1.png para todos los niveles si no hay variación)
 *
 * scenes/<sceneId>.png  ← ícono de la escena (ej. 1-D1-1.png)
 *
 * avatar/
 *   piel/  1.png … 5.png
 *   cabello/ liso.png rizado.png ondulado.png corto.png
 *   ropa/  uniforme.png casual_a.png casual_b.png hoodie.png
 *
 * ui/
 *   buho.png            ← personaje de feedback de error
 *   estrella.png        ← estrella de resultado
 *   logo.png            ← logo KusiGo
 */

// ─── NPC keys ──────────────────────────────────────────────────────────────
// Deben coincidir con el npcName de SCENES_META (en minúsculas, sin tildes,
// espacios → _).  Agrega aquí si añades NPCs nuevos.
export type NpcKey =
  | "lucia"
  | "mateo"
  | "sofia"
  | "diego"
  | "ana"
  | "profesora_rosa"
  | "valeria"
  | "don_pepe"
  | "el_chofer"
  | "la_vendedora"
  | "camila"
  | "mariano"
  | "tio_carlos"
  | "joaquin"
  | "renzo"
  | "la_vecina"
  | "tus_companeros";

// npcName (tal como está en SCENES_META.npcName) → NpcKey
export const NPC_KEY_MAP: Record<string, NpcKey> = {
  "Lucía": "lucia",
  "Mateo": "mateo",
  "Sofía": "sofia",
  "Diego": "diego",
  "Ana": "ana",
  "Profesora Rosa": "profesora_rosa",
  "Valeria": "valeria",
  "Don Pepe": "don_pepe",
  "el chofer": "el_chofer",
  "la vendedora": "la_vendedora",
  "Camila": "camila",
  "Mariano": "mariano",
  "Tío Carlos": "tio_carlos",
  "Joaquín": "joaquin",
  "Renzo": "renzo",
  "la vecina": "la_vecina",
  "tus compañeros": "tus_companeros",
};

const BASE = "/assets";

// ─── Getters ────────────────────────────────────────────────────────────────

/** Fondo del mapa del mundo (tarjeta en WorldMap). */
export function bgMundo(mundo: 1 | 2): string {
  return `${BASE}/backgrounds/mundo${mundo}.jpg`;
}

/**
 * Imagen del NPC para un nivel dado.
 * Si el archivo no existe el navegador muestra broken-image — no hay fallback
 * intencional para que sea evidente que falta el asset.
 */
export function npcImage(npcName: string, nivel: 1 | 2 | 3): string {
  const key = NPC_KEY_MAP[npcName] ?? npcName.toLowerCase().replace(/\s+/g, "_");
  return `${BASE}/npcs/${key}/nivel${nivel}.png`;
}

/** Ícono de la escena (usado en SceneTransition y DomainProgressBar). */
export function sceneIcon(sceneId: string): string {
  return `${BASE}/scenes/${sceneId}.png`;
}

// ─── Avatar ─────────────────────────────────────────────────────────────────
export const AVATAR = {
  piel: (idx: 1 | 2 | 3 | 4 | 5) => `${BASE}/avatar/piel/${idx}.png`,
  cabello: (estilo: "liso" | "rizado" | "ondulado" | "corto") =>
    `${BASE}/avatar/cabello/${estilo}.png`,
  ropa: (prenda: "uniforme" | "casual_a" | "casual_b" | "hoodie") =>
    `${BASE}/avatar/ropa/${prenda}.png`,
};

// ─── UI ─────────────────────────────────────────────────────────────────────
export const UI = {
  buho:    `${BASE}/ui/buho.png`,
  estrella:`${BASE}/ui/estrella.png`,
  logo:    `${BASE}/ui/logo.png`,
};

// ─── README de carpetas (solo documentación) ─────────────────────────────────
/*
public/assets/
├── backgrounds/
│   ├── mundo1.jpg
│   └── mundo2.jpg
├── npcs/
│   ├── lucia/          nivel1.png  nivel2.png  nivel3.png
│   ├── mateo/          nivel1.png  nivel2.png  nivel3.png
│   ├── sofia/          nivel1.png  nivel2.png  nivel3.png
│   ├── diego/          nivel1.png  nivel2.png  nivel3.png
│   ├── ana/            nivel1.png  nivel2.png  nivel3.png
│   ├── profesora_rosa/ nivel1.png  nivel2.png  nivel3.png
│   ├── valeria/        nivel1.png  nivel2.png  nivel3.png
│   ├── don_pepe/       nivel1.png  nivel2.png  nivel3.png
│   ├── el_chofer/      nivel1.png  nivel2.png  nivel3.png
│   ├── la_vendedora/   nivel1.png  nivel2.png  nivel3.png
│   ├── camila/         nivel1.png  nivel2.png  nivel3.png
│   ├── mariano/        nivel1.png  nivel2.png  nivel3.png
│   ├── tio_carlos/     nivel1.png  nivel2.png  nivel3.png
│   ├── joaquin/        nivel1.png  nivel2.png  nivel3.png
│   ├── renzo/          nivel1.png  nivel2.png  nivel3.png
│   ├── la_vecina/      nivel1.png  nivel2.png  nivel3.png
│   └── tus_companeros/ nivel1.png  nivel2.png  nivel3.png
├── scenes/
│   ├── 1-D1-1.png  1-D1-2.png  1-D1-3.png
│   ├── 1-D2-1.png  1-D2-2.png  1-D2-3.png
│   ├── 1-D3-1.png  1-D3-2.png  1-D3-3.png
│   ├── 2-D1-1.png  2-D1-2.png  2-D1-3.png
│   ├── 2-D2-1.png  2-D2-2.png  2-D2-3.png
│   └── 2-D3-1.png  2-D3-2.png  2-D3-3.png
├── avatar/
│   ├── piel/   1.png 2.png 3.png 4.png 5.png
│   ├── cabello/ liso.png rizado.png ondulado.png corto.png
│   └── ropa/   uniforme.png casual_a.png casual_b.png hoodie.png
└── ui/
    ├── buho.png
    ├── estrella.png
    └── logo.png
*/
