/**
 * KusiGo — Contenido de escenas (Mundo 1 · El Colegio / Mundo 2 · El Barrio)
 * Fuente: KusiGo_Especificacion_Pantallas_v2.md (escenas base) +
 * expansión a 3 escenas por dominio acordada en chat (18 escenas totales).
 *
 * Decisión de alcance: el nivel sigue siendo propiedad de (niño, dominio) —
 * NO de la escena ni de la variante (esto NO cambia respecto a la arquitectura
 * ya validada en Cap. 4.2). Lo que se agrega es un eje de VARIEDAD narrativa:
 * cada dominio tiene 3 variantes (situación/NPC distintos) que rotan en
 * round-robin cada vez que el niño entra a ese dominio, para favorecer
 * generalización (Wang et al., 2023) y evitar la "escasa variedad de
 * historias" señalada como limitación en Kim et al. (2023) y Fonseca et al.
 * (2025). No hay pantalla nueva ni tap adicional para el niño — RA13 se
 * mantiene intacto.
 */

export type Nivel = 1 | 2 | 3;
export type Mundo = 1 | 2;
export type Dominio = "D1" | "D2" | "D3";
export type Variante = 1 | 2 | 3;

// SceneId codifica (mundo, dominio, variante). Ej: "1-D1-2" = Mundo1, D1, variante 2.
export type SceneId = `${Mundo}-${Dominio}-${Variante}`;

// ─────────────────────────────────────────────────────────────────────────
// Metadata de dominio y mundo
// ─────────────────────────────────────────────────────────────────────────

export interface DomainMeta {
  dominio: Dominio;
  titulo: string;
  ring: string;
  icon: string;
  pillLabel: string;
  sesionDescripcion: string; // subtítulo de la domain-card: ya no es la pregunta de 1 escena, es la sesión completa
}

export const DOMAIN_META: Record<Dominio, DomainMeta> = {
  D1: { dominio: "D1", titulo: "Reconocimiento Emocional", ring: "#0F6E56", icon: "🙂", pillLabel: "D1 — Emociones",
    sesionDescripcion: "Reconoce cómo se sienten distintos personajes" },
  D2: { dominio: "D2", titulo: "Comunicación Social",      ring: "#534AB7", icon: "💬", pillLabel: "D2 — Comunicación",
    sesionDescripcion: "Practica qué responder en una conversación" },
  D3: { dominio: "D3", titulo: "Atención Conjunta",        ring: "#993C1D", icon: "🤝", pillLabel: "D3 — Turnos",
    sesionDescripcion: "Practica turnarte con un amigo" },
};

export interface MundoMeta {
  mundo: Mundo;
  nombre: string;
  icon: string;
}

export const MUNDOS: Record<Mundo, MundoMeta> = {
  1: { mundo: 1, nombre: "El Colegio", icon: "🏫" },
  2: { mundo: 2, nombre: "El Barrio",  icon: "🏘️" },
};

export interface SceneMeta {
  sceneId: SceneId;
  mundo: Mundo;
  dominio: Dominio;
  variante: Variante;
  npcName: string;
  label: string;
  icon: string;
  preguntaContextual: string;
  situacionBase: string;
}

// ─────────────────────────────────────────────────────────────────────────
// SCENES_META — las 18 escenas
// ─────────────────────────────────────────────────────────────────────────

export const SCENES_META: Record<SceneId, SceneMeta> = {
  // ── MUNDO 1 — EL COLEGIO ──────────────────────────────────────────────
  "1-D1-1": { sceneId: "1-D1-1", mundo: 1, dominio: "D1", variante: 1, npcName: "Lucía", label: "El salón de clases", icon: "📚", preguntaContextual: "¿Cómo se siente Lucía?", situacionBase: "Lucía olvidó su tarea en casa." },
  "1-D1-2": { sceneId: "1-D1-2", mundo: 1, dominio: "D1", variante: 2, npcName: "Mateo", label: "El kiosco", icon: "🍪", preguntaContextual: "¿Cómo se siente Mateo?", situacionBase: "A Mateo no le alcanza el dinero para comprar su snack favorito en el kiosco." },
  "1-D1-3": { sceneId: "1-D1-3", mundo: 1, dominio: "D1", variante: 3, npcName: "Sofía", label: "El patio", icon: "🧸", preguntaContextual: "¿Cómo se siente Sofía?", situacionBase: "A Sofía se le rompe el juguete que trajo para jugar en el recreo." },

  "1-D2-1": { sceneId: "1-D2-1", mundo: 1, dominio: "D2", variante: 1, npcName: "Diego", label: "Trabajo en grupo", icon: "✏️", preguntaContextual: "¿Qué le dices a Diego?", situacionBase: "Diego organiza un proyecto grupal." },
  "1-D2-2": { sceneId: "1-D2-2", mundo: 1, dominio: "D2", variante: 2, npcName: "Ana", label: "La biblioteca silenciosa", icon: "🤫", preguntaContextual: "¿Qué le dices a Ana?", situacionBase: "Ana necesita pedir un lápiz prestado sin hablar fuerte." },
  "1-D2-3": { sceneId: "1-D2-3", mundo: 1, dominio: "D2", variante: 3, npcName: "Profesora Rosa", label: "Pedir permiso", icon: "🙋", preguntaContextual: "¿Qué le dices a la profesora?", situacionBase: "Necesitas pedir permiso para ir al baño durante la clase." },

  "1-D3-1": { sceneId: "1-D3-1", mundo: 1, dominio: "D3", variante: 1, npcName: "Valeria", label: "El recreo", icon: "⚽", preguntaContextual: "¿Cuándo es tu turno?", situacionBase: "Juego de pelota por turnos en el patio." },
  "1-D3-2": { sceneId: "1-D3-2", mundo: 1, dominio: "D3", variante: 2, npcName: "Mateo", label: "El juego de mesa", icon: "🎲", preguntaContextual: "¿Cuándo es tu turno?", situacionBase: "Turnarse para tirar el dado en un juego de mesa." },
  "1-D3-3": { sceneId: "1-D3-3", mundo: 1, dominio: "D3", variante: 3, npcName: "tus compañeros", label: "La fila para salir", icon: "🚪", preguntaContextual: "¿Cuándo es tu turno?", situacionBase: "Turnarse para salir ordenadamente al sonar el timbre." },

  // ── MUNDO 2 — EL BARRIO ───────────────────────────────────────────────
  "2-D1-1": { sceneId: "2-D1-1", mundo: 2, dominio: "D1", variante: 1, npcName: "Don Pepe", label: "La bodega de Don Pepe", icon: "🛒", preguntaContextual: "¿Cómo se siente Don Pepe?", situacionBase: "Don Pepe se confunde dando el cambio." },
  "2-D1-2": { sceneId: "2-D1-2", mundo: 2, dominio: "D1", variante: 2, npcName: "el chofer", label: "La parada del bus", icon: "🚌", preguntaContextual: "¿Cómo se siente el chofer?", situacionBase: "El bus se demora mucho en el tráfico." },
  "2-D1-3": { sceneId: "2-D1-3", mundo: 2, dominio: "D1", variante: 3, npcName: "la vendedora", label: "La feria del barrio", icon: "🎪", preguntaContextual: "¿Cómo se siente la vendedora?", situacionBase: "La vendedora no ha vendido nada en todo el día." },

  "2-D2-1": { sceneId: "2-D2-1", mundo: 2, dominio: "D2", variante: 1, npcName: "Camila", label: "El cumpleaños", icon: "🎂", preguntaContextual: "¿Qué le dices a Camila?", situacionBase: "Saludo y conversación en fiesta familiar." },
  "2-D2-2": { sceneId: "2-D2-2", mundo: 2, dominio: "D2", variante: 2, npcName: "Mariano", label: "La cancha de fútbol", icon: "⚽", preguntaContextual: "¿Qué le dices a Mariano?", situacionBase: "Mariano invita a jugar un partido." },
  "2-D2-3": { sceneId: "2-D2-3", mundo: 2, dominio: "D2", variante: 3, npcName: "Tío Carlos", label: "La reunión familiar", icon: "👨‍👩‍👧", preguntaContextual: "¿Qué le dices a Tío Carlos?", situacionBase: "Un adulto pregunta cómo te va en el colegio." },

  "2-D3-1": { sceneId: "2-D3-1", mundo: 2, dominio: "D3", variante: 1, npcName: "Joaquín", label: "El parque", icon: "🌳", preguntaContextual: "¿Cuándo es tu turno?", situacionBase: "Turnarse en el sube y baja." },
  "2-D3-2": { sceneId: "2-D3-2", mundo: 2, dominio: "D3", variante: 2, npcName: "Renzo", label: "El futbolito de la esquina", icon: "🕹️", preguntaContextual: "¿Cuándo es tu turno?", situacionBase: "Turnarse para jugar futbolito en la tienda de la esquina." },
  "2-D3-3": { sceneId: "2-D3-3", mundo: 2, dominio: "D3", variante: 3, npcName: "la vecina", label: "La cola del mercado", icon: "🧺", preguntaContextual: "¿Cuándo es tu turno?", situacionBase: "Turnarse en la cola para pagar en el mercado." },
};

// Las 3 variantes de cada (mundo, dominio), en orden — usado para la rotación.
export const ESCENAS_POR_DOMINIO: Record<Mundo, Record<Dominio, SceneId[]>> = {
  1: {
    D1: ["1-D1-1", "1-D1-2", "1-D1-3"],
    D2: ["1-D2-1", "1-D2-2", "1-D2-3"],
    D3: ["1-D3-1", "1-D3-2", "1-D3-3"],
  },
  2: {
    D1: ["2-D1-1", "2-D1-2", "2-D1-3"],
    D2: ["2-D2-1", "2-D2-2", "2-D2-3"],
    D3: ["2-D3-1", "2-D3-2", "2-D3-3"],
  },
};

// ─────────────────────────────────────────────────────────────────────────
// D1 — Reconocimiento emocional
// ─────────────────────────────────────────────────────────────────────────

export interface D1Option {
  id: string;
  label: string;
  emoji: string;
  correct?: boolean;
}

export interface D1NivelContent {
  expresionDesc: string;
  npcEmoji: string;
  texto: string;
  opciones: D1Option[];
  scaffolding: string;
  delayMs: number;
  feedbackCorrecto: string;
}

export interface D1SceneContent {
  porNivel: Record<Nivel, D1NivelContent>;
}

export type D1SceneId = "1-D1-1" | "1-D1-2" | "1-D1-3" | "2-D1-1" | "2-D1-2" | "2-D1-3";

export const D1_CONTENT: Record<D1SceneId, D1SceneContent> = {
  "1-D1-1": {
    porNivel: {
      1: { expresionDesc: "Exagerada — llorando, boca muy curva", npcEmoji: "😭",
        texto: "Lucía olvidó su tarea en casa y está muy triste.",
        opciones: [{ id: "triste", label: "Triste", emoji: "😢", correct: true }, { id: "feliz", label: "Feliz", emoji: "😊" }],
        scaffolding: "Flecha directa a “Triste”", delayMs: 3500,
        feedbackCorrecto: "Lucía está triste porque olvidó su tarea en casa." },
      2: { expresionDesc: "Moderada — ceño fruncido, mirada baja", npcEmoji: "😟",
        texto: "Lucía está preocupada porque no entregó su tarea a tiempo.",
        opciones: [{ id: "preocupada", label: "Preocupada", emoji: "😟", correct: true }, { id: "feliz", label: "Feliz", emoji: "😊" }, { id: "enojada", label: "Enojada", emoji: "😠" }],
        scaffolding: "Resaltado tenue general", delayMs: 2000,
        feedbackCorrecto: "Lucía está preocupada por no haber entregado su tarea." },
      3: { expresionDesc: "Sutil — sonríe pero evita contacto visual", npcEmoji: "🙂",
        texto: "Lucía sonríe cuando le preguntan, pero algo en su mirada es distinto hoy.",
        opciones: [{ id: "triste", label: "Triste", emoji: "😢", correct: true }, { id: "feliz", label: "Feliz", emoji: "😊" }, { id: "enojada", label: "Enojada", emoji: "😠" }, { id: "avergonzada", label: "Avergonzada", emoji: "😳" }],
        scaffolding: "Ninguno", delayMs: 0,
        feedbackCorrecto: "Aunque Lucía sonreía, en el fondo seguía triste por su tarea." },
    },
  },
  "1-D1-2": {
    porNivel: {
      1: { expresionDesc: "Exagerada — boca abierta, mira sus monedas con las manos abiertas", npcEmoji: "😫",
        texto: "A Mateo no le alcanzó el dinero para comprar su snack favorito y está muy decepcionado.",
        opciones: [{ id: "decepcionado", label: "Decepcionado", emoji: "😞", correct: true }, { id: "feliz", label: "Feliz", emoji: "😊" }],
        scaffolding: "Flecha directa", delayMs: 3500,
        feedbackCorrecto: "Mateo estaba decepcionado porque no le alcanzó el dinero para su snack." },
      2: { expresionDesc: "Moderada — cuenta sus monedas otra vez con la cabeza baja", npcEmoji: "😞",
        texto: "Mateo cuenta sus monedas de nuevo, un poco decepcionado.",
        opciones: [{ id: "decepcionado", label: "Decepcionado", emoji: "😞", correct: true }, { id: "feliz", label: "Feliz", emoji: "😊" }, { id: "enojado", label: "Enojado", emoji: "😠" }],
        scaffolding: "Resaltado tenue", delayMs: 2000,
        feedbackCorrecto: "Mateo se sintió decepcionado al no poder comprar lo que quería." },
      3: { expresionDesc: "Sutil — sonríe y dice que no importa, pero guarda las monedas despacio", npcEmoji: "🙂",
        texto: "Mateo sonríe y dice que no importa, pero guarda sus monedas despacio.",
        opciones: [{ id: "decepcionado", label: "Decepcionado", emoji: "😞", correct: true }, { id: "feliz", label: "Feliz", emoji: "😊" }, { id: "enojado", label: "Enojado", emoji: "😠" }, { id: "sorprendido", label: "Sorprendido", emoji: "😲" }],
        scaffolding: "Ninguno", delayMs: 0,
        feedbackCorrecto: "Aunque dijo que no importaba, Mateo seguía un poco decepcionado." },
    },
  },
  "1-D1-3": {
    porNivel: {
      1: { expresionDesc: "Exagerada — boca temblorosa, sostiene las piezas rotas", npcEmoji: "😢",
        texto: "A Sofía se le rompió su juguete favorito y está muy triste.",
        opciones: [{ id: "triste", label: "Triste", emoji: "😢", correct: true }, { id: "feliz", label: "Feliz", emoji: "😊" }],
        scaffolding: "Flecha directa", delayMs: 3500,
        feedbackCorrecto: "Sofía estaba triste porque se le rompió su juguete favorito." },
      2: { expresionDesc: "Moderada — mira las piezas rotas en silencio", npcEmoji: "😕",
        texto: "Sofía mira las piezas de su juguete roto, un poco triste.",
        opciones: [{ id: "triste", label: "Triste", emoji: "😢", correct: true }, { id: "feliz", label: "Feliz", emoji: "😊" }, { id: "enojada", label: "Enojada", emoji: "😠" }],
        scaffolding: "Resaltado leve", delayMs: 2000,
        feedbackCorrecto: "Sofía se quedó un poco triste mirando su juguete roto." },
      3: { expresionDesc: "Sutil — guarda las piezas y sigue jugando, pero más callada", npcEmoji: "🙂",
        texto: "Sofía guarda las piezas rotas y sigue jugando, pero está más callada que siempre.",
        opciones: [{ id: "triste", label: "Triste", emoji: "😢", correct: true }, { id: "feliz", label: "Feliz", emoji: "😊" }, { id: "enojada", label: "Enojada", emoji: "😠" }, { id: "avergonzada", label: "Avergonzada", emoji: "😳" }],
        scaffolding: "Ninguno", delayMs: 0,
        feedbackCorrecto: "Aunque seguía jugando, Sofía estaba un poco triste por dentro." },
    },
  },
  "2-D1-1": {
    porNivel: {
      1: { expresionDesc: "Exagerada — rascándose la cabeza, cejas muy arqueadas", npcEmoji: "😵",
        texto: "Don Pepe está muy confundido contando el cambio.",
        opciones: [{ id: "confundido", label: "Confundido", emoji: "😕", correct: true }, { id: "feliz", label: "Feliz", emoji: "😊" }],
        scaffolding: "Flecha directa", delayMs: 3500,
        feedbackCorrecto: "Don Pepe estaba confundido porque le costó contar el cambio." },
      2: { expresionDesc: "Moderada — duda un momento", npcEmoji: "🤔",
        texto: "Don Pepe duda un momento antes de dar el cambio.",
        opciones: [{ id: "confundido", label: "Confundido", emoji: "😕", correct: true }, { id: "feliz", label: "Feliz", emoji: "😊" }, { id: "enojado", label: "Enojado", emoji: "😠" }],
        scaffolding: "Resaltado tenue", delayMs: 2000,
        feedbackCorrecto: "Don Pepe dudó un momento antes de darte el cambio correcto." },
      3: { expresionDesc: "Sutil — sonríe pero cuenta el dinero dos veces", npcEmoji: "🙂",
        texto: "Don Pepe sonríe mientras te entrega el cambio, pero lo cuenta de nuevo.",
        opciones: [{ id: "confundido", label: "Confundido", emoji: "😕", correct: true }, { id: "feliz", label: "Feliz", emoji: "😊" }, { id: "enojado", label: "Enojado", emoji: "😠" }, { id: "sorprendido", label: "Sorprendido", emoji: "😲" }],
        scaffolding: "Ninguno", delayMs: 0,
        feedbackCorrecto: "Aunque sonreía, Don Pepe seguía un poco confundido con el cambio." },
    },
  },
  "2-D1-2": {
    porNivel: {
      1: { expresionDesc: "Exagerada — cejas muy fruncidas, golpea el volante suave", npcEmoji: "😡",
        texto: "El chofer está muy molesto porque el bus se demora mucho en el tráfico.",
        opciones: [{ id: "molesto", label: "Molesto", emoji: "😠", correct: true }, { id: "feliz", label: "Feliz", emoji: "😊" }],
        scaffolding: "Flecha directa", delayMs: 3500,
        feedbackCorrecto: "El chofer estaba molesto porque el tráfico retrasó el bus." },
      2: { expresionDesc: "Moderada — suspira y mira el reloj", npcEmoji: "😤",
        texto: "El chofer suspira y mira el reloj porque el bus va tarde.",
        opciones: [{ id: "molesto", label: "Molesto", emoji: "😠", correct: true }, { id: "feliz", label: "Feliz", emoji: "😊" }, { id: "preocupado", label: "Preocupado", emoji: "😟" }],
        scaffolding: "Resaltado leve", delayMs: 2000,
        feedbackCorrecto: "El chofer suspiró, un poco molesto por el retraso." },
      3: { expresionDesc: "Sutil — sonríe a los pasajeros pero tamborilea los dedos", npcEmoji: "🙂",
        texto: "El chofer sonríe a los pasajeros, pero tamborilea los dedos en el volante.",
        opciones: [{ id: "molesto", label: "Molesto", emoji: "😠", correct: true }, { id: "feliz", label: "Feliz", emoji: "😊" }, { id: "preocupado", label: "Preocupado", emoji: "😟" }, { id: "cansado", label: "Cansado", emoji: "😪" }],
        scaffolding: "Ninguno", delayMs: 0,
        feedbackCorrecto: "El chofer seguía un poco molesto por el tráfico, aunque sonreía." },
    },
  },
  "2-D1-3": {
    porNivel: {
      1: { expresionDesc: "Exagerada — hombros caídos, mirada baja, suspiro grande", npcEmoji: "😔",
        texto: "La vendedora está muy triste porque no ha vendido nada hoy.",
        opciones: [{ id: "triste", label: "Triste", emoji: "😢", correct: true }, { id: "feliz", label: "Feliz", emoji: "😊" }],
        scaffolding: "Flecha directa", delayMs: 3500,
        feedbackCorrecto: "La vendedora estaba triste porque no había vendido nada ese día." },
      2: { expresionDesc: "Moderada — acomoda sus productos sin ánimo", npcEmoji: "😕",
        texto: "La vendedora acomoda sus artesanías sin mucho ánimo.",
        opciones: [{ id: "triste", label: "Triste", emoji: "😢", correct: true }, { id: "feliz", label: "Feliz", emoji: "😊" }, { id: "cansada", label: "Cansada", emoji: "😪" }],
        scaffolding: "Resaltado leve", delayMs: 2000,
        feedbackCorrecto: "La vendedora acomodaba sus cosas sin mucho ánimo, un poco triste." },
      3: { expresionDesc: "Sutil — sonríe al saludar pero guarda algunas piezas", npcEmoji: "🙂",
        texto: "La vendedora te sonríe al saludarte, pero empieza a guardar algunas piezas.",
        opciones: [{ id: "triste", label: "Triste", emoji: "😢", correct: true }, { id: "feliz", label: "Feliz", emoji: "😊" }, { id: "cansada", label: "Cansada", emoji: "😪" }, { id: "preocupada", label: "Preocupada", emoji: "😟" }],
        scaffolding: "Ninguno", delayMs: 0,
        feedbackCorrecto: "La vendedora seguía un poco triste por las pocas ventas, aunque sonreía." },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// D2 — Comunicación social
// ─────────────────────────────────────────────────────────────────────────

export interface D2Option {
  id: string;
  text: string;
  correct?: boolean;
  previewText: string;
}

export interface D2NivelContent {
  dialogo: string;
  estiloDialogo: string;
  opciones: D2Option[];
  scaffolding: string;
  delayMs: number;
  feedbackCorrecto: string;
}

export interface D2SceneContent {
  porNivel: Record<Nivel, D2NivelContent>;
}

export type D2SceneId = "1-D2-1" | "1-D2-2" | "1-D2-3" | "2-D2-1" | "2-D2-2" | "2-D2-3";

export const D2_CONTENT: Record<D2SceneId, D2SceneContent> = {
  "1-D2-1": {
    porNivel: {
      1: { dialogo: "¿Tú quieres dibujar o escribir?", estiloDialogo: "Pregunta directa",
        opciones: [{ id: "dibujar", text: "Quiero dibujar", correct: true, previewText: "Diego sonríe: “¡Genial, hagámoslo juntos!” 😊" }, { id: "nada", text: "No quiero hacer nada", previewText: "Diego se queda confundido. 😕" }],
        scaffolding: "Flecha a opción colaborativa", delayMs: 3500,
        feedbackCorrecto: "Elegir una tarea ayuda a que el trabajo en grupo avance. ¡Bien hecho!" },
      2: { dialogo: "Esta parte del proyecto es difícil para mí...", estiloDialogo: "Pide ayuda indirectamente",
        opciones: [{ id: "ayudo", text: "Te ayudo con esa parte", correct: true, previewText: "Diego se alivia: “¡Gracias, eso me ayuda mucho!” 🙂" }, { id: "noproblema", text: "Esa parte no es mi problema", previewText: "Diego se siente solo con la tarea. 😟" }, { id: "sinella", text: "Sigamos sin hacerla", previewText: "El proyecto queda incompleto. 😕" }],
        scaffolding: "Leve", delayMs: 2000,
        feedbackCorrecto: "Notaste que Diego necesitaba ayuda aunque no lo pidió directamente." },
      3: { dialogo: "Bueno... ya casi terminamos, supongo.", estiloDialogo: "Frustración oculta",
        opciones: [{ id: "necesitas", text: "¿Necesitas ayuda con algo?", correct: true, previewText: "Diego respira aliviado: “La verdad, sí. Gracias.” 🙂" }, { id: "genial", text: "¡Genial, ya casi acabamos!", previewText: "Diego asiente, pero sigue tenso. 😐" }, { id: "yahice", text: "Yo ya hice mi parte", previewText: "Diego se queda callado. 😞" }, { id: "apuremonos", text: "Apurémonos entonces", previewText: "Diego se siente más presionado. 😣" }],
        scaffolding: "Ninguno", delayMs: 0,
        feedbackCorrecto: "El tono de Diego no coincidía con sus palabras — notaste la frustración oculta." },
    },
  },
  "1-D2-2": {
    porNivel: {
      1: { dialogo: "¿Me prestas un lápiz, por favor?", estiloDialogo: "Pregunta directa",
        opciones: [{ id: "presta", text: "Claro, toma", correct: true, previewText: "Ana sonríe en silencio y te agradece con un gesto. 🙂" }, { id: "no", text: "No tengo", previewText: "Ana se queda sin lápiz para su tarea. 😕" }],
        scaffolding: "Flecha directa", delayMs: 3500,
        feedbackCorrecto: "Prestarle el lápiz a Ana fue un gesto amable y directo." },
      2: { dialogo: "Psst... ¿tienes un lápiz extra?", estiloDialogo: "Pide en voz baja (contexto de biblioteca)",
        opciones: [{ id: "bajito", text: "(en voz baja) Toma, aquí tienes", correct: true, previewText: "Ana asiente agradecida, sin romper el silencio. 🙂" }, { id: "fuerte", text: "(en voz alta) ¡Sí, toma!", previewText: "Algunos compañeros se voltean a mirar. 😬" }, { id: "nose", text: "No sé", previewText: "Ana sigue buscando un lápiz. 😕" }],
        scaffolding: "Leve", delayMs: 2000,
        feedbackCorrecto: "Responder en voz baja respetó el contexto silencioso de la biblioteca." },
      3: { dialogo: "Da igual, ya casi termino de todos modos.", estiloDialogo: "Frustración oculta (en realidad sí necesita el lápiz)",
        opciones: [{ id: "seguro", text: "¿Seguro? Toma uno mío", correct: true, previewText: "Ana sonríe aliviada y termina su trabajo a tiempo. 🙂" }, { id: "ok", text: "Ok", previewText: "Ana sigue sin el lápiz que necesitaba. 😕" }, { id: "yotambien", text: "Yo también casi termino", previewText: "Ana no consigue el lápiz. 😞" }, { id: "shh", text: "Shh, estamos en silencio", previewText: "Ana se siente un poco ignorada. 😶" }],
        scaffolding: "Ninguno", delayMs: 0,
        feedbackCorrecto: "Notaste que Ana sí necesitaba el lápiz, aunque dijo que no importaba." },
    },
  },
  "1-D2-3": {
    porNivel: {
      1: { dialogo: "¿Qué necesitas?", estiloDialogo: "La profesora ya notó tu mano levantada (directo)",
        opciones: [{ id: "permiso", text: "¿Puedo ir al baño, por favor?", correct: true, previewText: "La profesora asiente: “Claro, ve.” 🙂" }, { id: "callado", text: "(quedarse callado)", previewText: "La profesora espera tu respuesta. 😐" }],
        scaffolding: "Flecha directa", delayMs: 3500,
        feedbackCorrecto: "Pedir permiso con claridad es la forma correcta de comunicarte con la profesora." },
      2: { dialogo: "(la profesora está explicando y no te ve de inmediato)", estiloDialogo: "Requiere levantar la mano y esperar",
        opciones: [{ id: "levanto", text: "Levanto la mano y espero", correct: true, previewText: "La profesora te ve y te da la palabra. 🙂" }, { id: "hablo", text: "Hablo sin levantar la mano", previewText: "La profesora se sorprende un poco. 😯" }, { id: "aguanto", text: "Me quedo callado y aguanto", previewText: "Esperas más de lo necesario. 😣" }],
        scaffolding: "Leve", delayMs: 2000,
        feedbackCorrecto: "Levantar la mano y esperar tu turno es la forma adecuada de pedir la palabra." },
      3: { dialogo: "(la profesora está ocupada ayudando a otro niño)", estiloDialogo: "Requiere esperar el momento adecuado e interrumpir con cortesía",
        opciones: [{ id: "disculpe", text: "Disculpe, ¿puedo ir al baño?", correct: true, previewText: "La profesora se voltea y te da permiso. 🙂" }, { id: "interrumpe", text: "¡Profesora!", previewText: "La profesora se sobresalta un poco. 😮" }, { id: "saleignorando", text: "(sale sin pedir permiso)", previewText: "La profesora nota que faltaste sin avisar. 😟" }, { id: "espera", text: "Espero sin decir nada hasta que termine la clase", previewText: "Esperas mucho más de lo necesario. 😣" }],
        scaffolding: "Ninguno", delayMs: 0,
        feedbackCorrecto: "Pedir permiso con cortesía, incluso cuando la profesora está ocupada, fue la mejor opción." },
    },
  },
  "2-D2-1": {
    porNivel: {
      1: { dialogo: "¡Hola! ¿Cómo te llamas?", estiloDialogo: "Pregunta directa",
        opciones: [{ id: "mellamo", text: "Me llamo (tu nombre)", correct: true, previewText: "Camila sonríe: “¡Mucho gusto! Ven a jugar.” 😊" }, { id: "noresponder", text: "(no responder)", previewText: "Camila espera y se va a hablar con otro niño. 😶" }],
        scaffolding: "Flecha a respuesta social", delayMs: 3500,
        feedbackCorrecto: "Presentarte cuando alguien te saluda es un buen comienzo de conversación." },
      2: { dialogo: "Qué bueno que viniste a mi fiesta.", estiloDialogo: "Requiere reciprocidad social",
        opciones: [{ id: "gracias", text: "Gracias por invitarme", correct: true, previewText: "Camila se pone feliz: “¡Qué bueno que viniste!” 😊" }, { id: "si", text: "Sí", previewText: "Camila espera que digas algo más. 😐" }, { id: "comida", text: "¿Dónde está la comida?", previewText: "Camila se queda un poco sorprendida. 😯" }],
        scaffolding: "Leve", delayMs: 2000,
        feedbackCorrecto: "Agradecer la invitación demuestra reciprocidad social." },
      3: { dialogo: "Hace mucho que no nos vemos, ¿no?", estiloDialogo: "Informal, requiere inferencia",
        opciones: [{ id: "cuantotiempo", text: "Sí, ¡cuánto tiempo! ¿Cómo has estado?", correct: true, previewText: "Camila se anima: “¡Muy bien! Te cuento todo.” 😄" }, { id: "si", text: "Sí", previewText: "Camila espera que sigas la conversación. 😐" }, { id: "noacuerdo", text: "No me acuerdo de ti", previewText: "Camila se siente un poco triste. 😕" }, { id: "comida", text: "Voy a buscar algo de comer", previewText: "Camila se queda sola un momento. 😶" }],
        scaffolding: "Ninguno", delayMs: 0,
        feedbackCorrecto: "Retomar la conversación con interés genuino mantiene el vínculo social." },
    },
  },
  "2-D2-2": {
    porNivel: {
      1: { dialogo: "¿Quieres jugar con nosotros?", estiloDialogo: "Pregunta directa",
        opciones: [{ id: "siclaro", text: "¡Sí, claro!", correct: true, previewText: "Mariano sonríe: “¡Genial, vamos!” 😊" }, { id: "noresponder", text: "(no responder)", previewText: "Mariano espera tu respuesta. 😐" }],
        scaffolding: "Flecha directa", delayMs: 3500,
        feedbackCorrecto: "Aceptar la invitación de Mariano fue una buena forma de unirte al grupo." },
      2: { dialogo: "Nos falta uno para el equipo...", estiloDialogo: "Pide ayuda indirectamente",
        opciones: [{ id: "yopuedo", text: "Yo puedo jugar", correct: true, previewText: "Mariano se alegra: “¡Perfecto, ya estamos completos!” 🙂" }, { id: "quepena", text: "Qué pena", previewText: "El equipo sigue incompleto. 😕" }, { id: "busca", text: "Busca a otro", previewText: "Mariano sigue buscando un jugador. 😐" }],
        scaffolding: "Leve", delayMs: 2000,
        feedbackCorrecto: "Notaste que faltaba un jugador y te ofreciste — eso ayudó al equipo." },
      3: { dialogo: "Bueno, jugamos con los que hay, no importa.", estiloDialogo: "Resignación oculta (en realidad le gustaría que jugaras)",
        opciones: [{ id: "esperayo", text: "Espera, yo juego con ustedes", correct: true, previewText: "Mariano se anima: “¡Genial, ahora sí estamos parejos!” 😊" }, { id: "ok", text: "Ok", previewText: "Mariano se queda con un equipo incompleto. 😕" }, { id: "suerte", text: "Suerte en el partido", previewText: "Te vas sin jugar. 😶" }, { id: "cuantosson", text: "¿Cuántos son?", previewText: "Mariano espera una respuesta más clara. 😐" }],
        scaffolding: "Ninguno", delayMs: 0,
        feedbackCorrecto: "Notaste que a Mariano sí le interesaba que jugaras, aunque dijo que no importaba." },
    },
  },
  "2-D2-3": {
    porNivel: {
      1: { dialogo: "¿Cómo te va en el colegio?", estiloDialogo: "Pregunta directa",
        opciones: [{ id: "bien", text: "Bien, gracias", correct: true, previewText: "Tío Carlos sonríe: “¡Qué bueno escuchar eso!” 😊" }, { id: "noresponder", text: "(no responder)", previewText: "Tío Carlos espera tu respuesta. 😐" }],
        scaffolding: "Flecha directa", delayMs: 3500,
        feedbackCorrecto: "Responder con cortesía a un adulto que te pregunta es una buena práctica social." },
      2: { dialogo: "He escuchado que andas ocupado últimamente...", estiloDialogo: "Espera que cuentes algo más",
        opciones: [{ id: "tareas", text: "Sí, tengo varias tareas", correct: true, previewText: "Tío Carlos asiente interesado: “Cuéntame más.” 🙂" }, { id: "si", text: "Sí", previewText: "Tío Carlos espera que digas algo más. 😐" }, { id: "nose", text: "No sé", previewText: "La conversación se queda corta. 😶" }],
        scaffolding: "Leve", delayMs: 2000,
        feedbackCorrecto: "Compartir un poco más mantiene viva la conversación con un adulto." },
      3: { dialogo: "Ya casi no te veo por aquí, ¿no?", estiloDialogo: "Informal, espera reciprocidad",
        opciones: [{ id: "ycomousted", text: "Es verdad, ¿cómo ha estado usted?", correct: true, previewText: "Tío Carlos se anima: “¡Muy bien! Te cuento.” 😄" }, { id: "si", text: "Sí", previewText: "Tío Carlos espera que sigas la conversación. 😐" }, { id: "ocupado", text: "Estoy ocupado", previewText: "La conversación se corta un poco. 😕" }, { id: "saludarotros", text: "Voy a saludar a los demás", previewText: "Te vas antes de continuar la charla. 😶" }],
        scaffolding: "Ninguno", delayMs: 0,
        feedbackCorrecto: "Devolver la pregunta con interés mantiene una buena conversación con un adulto." },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// D3 — Atención conjunta / turno
// ─────────────────────────────────────────────────────────────────────────

export interface D3Paso {
  actor: "npc" | "nino";
  descripcion: string;
  esTurnoFinal?: boolean;
}

export interface D3NivelContent {
  indicadorTurno: string;
  conTTS: boolean;
  pasos: D3Paso[];
  scaffolding: string;
  delayMs: number;
  feedbackCorrecto: string;
}

export interface D3SceneContent {
  porNivel: Record<Nivel, D3NivelContent>;
}

export type D3SceneId = "1-D3-1" | "1-D3-2" | "1-D3-3" | "2-D3-1" | "2-D3-2" | "2-D3-3";

export const D3_CONTENT: Record<D3SceneId, D3SceneContent> = {
  "1-D3-1": {
    porNivel: {
      1: { indicadorTurno: "Grande + TTS “¡Es tu turno!”", conTTS: true,
        pasos: [{ actor: "npc", descripcion: "Valeria lanza la pelota" }, { actor: "nino", descripcion: "¡Tú lanzas la pelota!", esTurnoFinal: true }],
        scaffolding: "Animación de “pase” marcada", delayMs: 3500,
        feedbackCorrecto: "¡Lanzaste la pelota en tu turno! Valeria y tú juegan por turnos." },
      2: { indicadorTurno: "Visual estándar, sin voz", conTTS: false,
        pasos: [{ actor: "npc", descripcion: "Valeria lanza la pelota" }, { actor: "nino", descripcion: "Recibes la pelota" }, { actor: "nino", descripcion: "¡Tú lanzas la pelota!", esTurnoFinal: true }],
        scaffolding: "Resaltado leve en el balón", delayMs: 2000,
        feedbackCorrecto: "Recibiste y lanzaste la pelota en el momento correcto." },
      3: { indicadorTurno: "Ninguno explícito — inferir por animación", conTTS: false,
        pasos: [{ actor: "npc", descripcion: "Valeria lanza la pelota" }, { actor: "npc", descripcion: "Hay una pausa" }, { actor: "nino", descripcion: "Notas que es tu turno" }, { actor: "nino", descripcion: "¡Tú lanzas la pelota!", esTurnoFinal: true }],
        scaffolding: "Ninguno", delayMs: 0,
        feedbackCorrecto: "Notaste la pausa de Valeria y reconociste que era tu turno." },
    },
  },
  "1-D3-2": {
    porNivel: {
      1: { indicadorTurno: "Grande + TTS “¡Es tu turno de tirar el dado!”", conTTS: true,
        pasos: [{ actor: "npc", descripcion: "Mateo tira el dado" }, { actor: "nino", descripcion: "¡Tú tiras el dado!", esTurnoFinal: true }],
        scaffolding: "Marcada", delayMs: 3500,
        feedbackCorrecto: "¡Tiraste el dado en tu turno! Tú y Mateo juegan por turnos." },
      2: { indicadorTurno: "Visual estándar", conTTS: false,
        pasos: [{ actor: "npc", descripcion: "Mateo tira el dado" }, { actor: "npc", descripcion: "Mateo mueve su ficha" }, { actor: "nino", descripcion: "¡Tú tiras el dado!", esTurnoFinal: true }],
        scaffolding: "Leve", delayMs: 2000,
        feedbackCorrecto: "Esperaste a que Mateo moviera su ficha y tiraste en tu turno." },
      3: { indicadorTurno: "Ninguno explícito", conTTS: false,
        pasos: [{ actor: "npc", descripcion: "Mateo tira" }, { actor: "npc", descripcion: "Mueve su ficha" }, { actor: "npc", descripcion: "Te mira y empuja el dado hacia ti" }, { actor: "nino", descripcion: "¡Tú tiras el dado!", esTurnoFinal: true }],
        scaffolding: "Ninguno", delayMs: 0,
        feedbackCorrecto: "Notaste que Mateo te pasó el dado como señal de tu turno." },
    },
  },
  "1-D3-3": {
    porNivel: {
      1: { indicadorTurno: "Grande + TTS “¡Avanza, es tu turno de salir!”", conTTS: true,
        pasos: [{ actor: "npc", descripcion: "El compañero de adelante sale" }, { actor: "nino", descripcion: "¡Tú sales!", esTurnoFinal: true }],
        scaffolding: "Marcada", delayMs: 3500,
        feedbackCorrecto: "¡Saliste en tu turno! Todos salen ordenadamente, uno por uno." },
      2: { indicadorTurno: "Visual estándar", conTTS: false,
        pasos: [{ actor: "npc", descripcion: "El compañero de adelante se levanta" }, { actor: "npc", descripcion: "Avanza hacia la puerta" }, { actor: "nino", descripcion: "¡Tú sales!", esTurnoFinal: true }],
        scaffolding: "Leve", delayMs: 2000,
        feedbackCorrecto: "Esperaste a que avanzara tu compañero y saliste en tu turno." },
      3: { indicadorTurno: "Ninguno explícito", conTTS: false,
        pasos: [{ actor: "npc", descripcion: "El compañero de adelante se levanta" }, { actor: "npc", descripcion: "Avanza" }, { actor: "npc", descripcion: "Se abre un espacio en la fila" }, { actor: "nino", descripcion: "Avanzas y sales", esTurnoFinal: true }],
        scaffolding: "Ninguno", delayMs: 0,
        feedbackCorrecto: "Notaste el espacio en la fila y avanzaste en el momento correcto." },
    },
  },
  "2-D3-1": {
    porNivel: {
      1: { indicadorTurno: "Grande + TTS", conTTS: true,
        pasos: [{ actor: "npc", descripcion: "Joaquín sube al sube y baja" }, { actor: "nino", descripcion: "¡Tú subes!", esTurnoFinal: true }],
        scaffolding: "Marcada", delayMs: 3500,
        feedbackCorrecto: "¡Subiste en tu turno! Joaquín y tú se turnan en el sube y baja." },
      2: { indicadorTurno: "Visual estándar", conTTS: false,
        pasos: [{ actor: "npc", descripcion: "Joaquín sube" }, { actor: "npc", descripcion: "Joaquín baja" }, { actor: "nino", descripcion: "¡Tú subes!", esTurnoFinal: true }],
        scaffolding: "Leve", delayMs: 2000,
        feedbackCorrecto: "Esperaste a que Joaquín bajara y subiste en tu turno." },
      3: { indicadorTurno: "Ninguno explícito", conTTS: false,
        pasos: [{ actor: "npc", descripcion: "Joaquín sube" }, { actor: "npc", descripcion: "Joaquín baja" }, { actor: "npc", descripcion: "Joaquín te mira" }, { actor: "nino", descripcion: "Inicias tu turno", esTurnoFinal: true }],
        scaffolding: "Ninguno", delayMs: 0,
        feedbackCorrecto: "Notaste la mirada de Joaquín como señal de que era tu turno." },
    },
  },
  "2-D3-2": {
    porNivel: {
      1: { indicadorTurno: "Grande + TTS “¡Es tu turno de jugar!”", conTTS: true,
        pasos: [{ actor: "npc", descripcion: "Renzo juega su turno" }, { actor: "nino", descripcion: "¡Tú juegas tu turno!", esTurnoFinal: true }],
        scaffolding: "Marcada", delayMs: 3500,
        feedbackCorrecto: "¡Jugaste tu turno en el futbolito! Tú y Renzo se turnan para jugar." },
      2: { indicadorTurno: "Visual estándar", conTTS: false,
        pasos: [{ actor: "npc", descripcion: "Renzo juega" }, { actor: "npc", descripcion: "Renzo termina su turno" }, { actor: "nino", descripcion: "¡Tú juegas!", esTurnoFinal: true }],
        scaffolding: "Leve", delayMs: 2000,
        feedbackCorrecto: "Esperaste a que Renzo terminara su turno antes de jugar." },
      3: { indicadorTurno: "Ninguno explícito", conTTS: false,
        pasos: [{ actor: "npc", descripcion: "Renzo juega" }, { actor: "npc", descripcion: "Termina" }, { actor: "npc", descripcion: "Te pasa las manijas" }, { actor: "nino", descripcion: "¡Tú juegas!", esTurnoFinal: true }],
        scaffolding: "Ninguno", delayMs: 0,
        feedbackCorrecto: "Notaste que Renzo te pasó las manijas como señal de tu turno." },
    },
  },
  "2-D3-3": {
    porNivel: {
      1: { indicadorTurno: "Grande + TTS “¡Avanza, es tu turno de pagar!”", conTTS: true,
        pasos: [{ actor: "npc", descripcion: "La vecina paga" }, { actor: "nino", descripcion: "¡Tú pagas!", esTurnoFinal: true }],
        scaffolding: "Marcada", delayMs: 3500,
        feedbackCorrecto: "¡Pagaste en tu turno! Todos esperan su turno en la cola." },
      2: { indicadorTurno: "Visual estándar", conTTS: false,
        pasos: [{ actor: "npc", descripcion: "La vecina espera su turno" }, { actor: "npc", descripcion: "La vecina paga" }, { actor: "nino", descripcion: "¡Tú pagas!", esTurnoFinal: true }],
        scaffolding: "Leve", delayMs: 2000,
        feedbackCorrecto: "Esperaste tu turno en la cola y pagaste cuando correspondía." },
      3: { indicadorTurno: "Ninguno explícito", conTTS: false,
        pasos: [{ actor: "npc", descripcion: "La vecina espera" }, { actor: "npc", descripcion: "Paga" }, { actor: "npc", descripcion: "Avanza y te mira" }, { actor: "nino", descripcion: "Avanzas y pagas", esTurnoFinal: true }],
        scaffolding: "Ninguno", delayMs: 0,
        feedbackCorrecto: "Notaste que la vecina avanzó y reconociste que era tu turno." },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// Simulación de PROGRESION_NINO — el nivel sigue siendo por (niño, dominio),
// y aplica por igual a las 3 escenas de la sesión de ese dominio.
// ─────────────────────────────────────────────────────────────────────────

export type ProgresionNino = Record<string, Nivel>; // key: `${mundo}-${dominio}`

export const PROGRESION_NINO_MOCK: ProgresionNino = {
  "1-D1": 2, "1-D2": 1, "1-D3": 1,
  "2-D1": 1, "2-D2": 1, "2-D3": 1,
};

export function progresionKey(mundo: Mundo, dominio: Dominio) {
  return `${mundo}-${dominio}`;
}

/**
 * Devuelve la secuencia completa de las 3 escenas de un dominio, en orden
 * fijo. Al elegir un dominio, el niño juega las 3 una tras otra (RA08
 * anuncia cada cambio vía SceneTransition) y el puntaje se calcula recién
 * al terminar la tercera. Ya no hay rotación entre visitas — siempre se
 * juegan las 3 en la misma sesión.
 */
export function sesionDelDominio(mundo: Mundo, dominio: Dominio): SceneId[] {
  return ESCENAS_POR_DOMINIO[mundo][dominio];
}
