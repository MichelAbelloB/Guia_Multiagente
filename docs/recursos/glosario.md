# Glosario de conceptos clave

!!! info "Documento vivo"
    Se amplía a medida que avanza el curso. Es la base de la Semana 1 y punto de referencia durante todo el curso — cada módulo enlaza de vuelta a los términos que introduce.

## Conceptos base

- **Agente**: un sistema que usa un LLM como "motor de decisión" dentro de un loop de percepción → razonamiento → acción, en lugar de una sola llamada de entrada/salida.
- **LLM como reasoning engine vs. agente**: la diferencia no es el modelo, es el *loop* que lo rodea (herramientas, memoria, capacidad de actuar sobre el entorno).
- **ReAct (Reason + Act)**: patrón donde el modelo alterna entre "pensar" (texto) y "actuar" (llamar una herramienta), observando el resultado antes de continuar. Paper original: Yao et al., 2022.
- **System prompt**: instrucciones persistentes que definen el rol, las restricciones y el estilo del agente en cada turno del loop.
- **Context window / ventana de contexto**: la cantidad máxima de tokens (prompt + historial + herramientas + salida) que el modelo puede procesar en una sola llamada.
- **Planning vs. reactive agent**: un agente *reactivo* decide un paso a la vez según lo último que observó; uno con *planning* genera de antemano una secuencia de pasos y la ajusta sobre la marcha.
- **Reflexión / self-correction**: patrón donde el agente evalúa su propia salida (o la de otro agente) y la corrige antes de darla por final.

## Herramientas y function calling

- **Tool / function calling**: mecanismo por el cual el LLM decide *qué* función invocar y con *qué* argumentos, estructurado en JSON.
- **Tool schema**: la descripción (nombre, parámetros, tipos, descripción en texto) que le indica al modelo cuándo y cómo usar una herramienta. Un schema ambiguo es la causa más común de tool calling defectuoso.
- **Structured output**: forzar a que la respuesta del modelo cumpla un esquema (JSON Schema, Pydantic) en vez de texto libre — la base técnica del tool calling.
- **Tool misuse**: cuando el agente invoca una herramienta que no existe, con argumentos inválidos, o en un momento que no correspondía.

## Contexto, memoria y RAG

- **Contexto vs. memoria**: contexto = lo que cabe en la ventana actual; memoria = información persistida entre turnos o sesiones (corto plazo vs. largo plazo).
- **RAG (Retrieval-Augmented Generation)**: recuperar información relevante de una fuente externa (ej. vector store) e inyectarla en el contexto antes de generar la respuesta, en vez de depender solo del conocimiento del modelo.
- **Embedding**: representación numérica (vector) de un texto que captura su significado semántico, usada para buscar por similitud en vez de por palabra exacta.
- **Vector store**: base de datos optimizada para guardar embeddings y responder consultas de similitud (ej. ChromaDB, Pinecone, FAISS).
- **Context contaminado**: cuando información irrelevante o desactualizada en el contexto degrada la calidad de la respuesta, aunque el modelo "tenga" el dato correcto en algún lugar del historial.

## Orquestación y grafos

- **Orquestación**: la lógica que decide qué agente/herramienta actúa a continuación (puede ser el propio LLM, un grafo, o código determinista).
- **Grafo de estado (state graph)**: modelo donde el flujo del agente se representa como nodos (pasos) y aristas (transiciones), con un objeto de estado compartido que fluye entre ellos — la abstracción central de LangGraph.
- **Arista condicional**: una transición en el grafo cuyo destino se decide en tiempo de ejecución según el estado actual (branching).
- **Checkpoint**: una foto del estado del grafo persistida en un punto determinado, que permite pausar, reanudar o "rebobinar" la ejecución.
- **Human-in-the-loop**: puntos de control donde un humano aprueba, corrige o interviene antes de que el sistema continúe — implementado en LangGraph como una interrupción del grafo en un nodo específico.

## Multiagente

- **Multiagente**: varios agentes con roles, contextos o herramientas distintos que colaboran para resolver una tarea que un solo agente resolvería peor o de forma menos controlable.
- **Patrones multiagente comunes**:
    - *Supervisor/Router*: un agente central delega en agentes especializados.
    - *Pipeline secuencial*: cada agente pasa su output al siguiente (como una línea de ensamblaje).
    - *Debate/Revisión*: agentes se critican o validan entre sí antes de dar una respuesta final.
    - *Paralelo con agregación*: varios agentes resuelven en simultáneo y un agente final consolida.
- **Sub-agente**: un agente invocado por otro agente como si fuera una herramienta más, con su propio contexto acotado a la subtarea.
- **Costos ocultos del multiagente**: más latencia (llamadas encadenadas), más tokens (contexto repetido entre agentes) y más superficie de fallo — dividir en agentes no es gratis y debe justificarse.

## Evaluación, seguridad y producción

- **Alucinación en agentes**: no solo "inventar hechos", sino invocar herramientas inexistentes, con argumentos inválidos, o afirmar que ejecutó una acción que no ejecutó.
- **Guardrails**: reglas o validaciones (de input o output) que limitan lo que el agente puede hacer o decir.
- **Observabilidad**: capacidad de trazar cada paso del agente (qué pensó, qué llamó, qué costó, cuánto tardó) para depurar y auditar. En el curso se implementa con Langfuse.
- **Traza (trace) y span**: una traza es el registro completo de una ejecución del agente de punta a punta; un span es cada paso individual dentro de esa traza (una llamada al LLM, una tool call).
- **Prompt injection**: técnica donde contenido externo (una página web, un documento, el resultado de una herramienta) incluye instrucciones que intentan hacer que el agente se desvíe de las instrucciones de su operador.
- **MCP (Model Context Protocol)**: protocolo abierto para exponer herramientas y fuentes de datos a agentes de forma estandarizada, para no reimplementar la integración por cada framework/modelo.

---

¿Falta un término? Este glosario se amplía a lo largo del curso — cada módulo nuevo agrega los conceptos que introduce.
