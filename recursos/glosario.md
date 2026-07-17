# Glosario de conceptos clave

Documento vivo — se amplía a medida que avanza el curso. Es la base de la Semana 1 y punto de referencia durante todo el curso.

- **Agente**: un sistema que usa un LLM como "motor de decisión" dentro de un loop de percepción → razonamiento → acción, en lugar de una sola llamada de entrada/salida.
- **LLM como reasoning engine vs. agente**: la diferencia no es el modelo, es el *loop* que lo rodea (herramientas, memoria, capacidad de actuar sobre el entorno).
- **ReAct (Reason + Act)**: patrón donde el modelo alterna entre "pensar" (texto) y "actuar" (llamar una herramienta), observando el resultado antes de continuar.
- **Tool / function calling**: mecanismo por el cual el LLM decide *qué* función invocar y con *qué* argumentos, estructurado en JSON.
- **Contexto vs. memoria**: contexto = lo que cabe en la ventana actual; memoria = información persistida entre turnos o sesiones (corto plazo vs. largo plazo).
- **Orquestación**: la lógica que decide qué agente/herramienta actúa a continuación (puede ser el propio LLM, un grafo, o código determinista).
- **Multiagente**: varios agentes con roles, contextos o herramientas distintos que colaboran para resolver una tarea que un solo agente resolvería peor o de forma menos controlable.
- **Patrones multiagente comunes**:
  - *Supervisor/Router*: un agente central delega en agentes especializados.
  - *Pipeline secuencial*: cada agente pasa su output al siguiente (como una línea de ensamblaje).
  - *Debate/Revisión*: agentes se critican o validan entre sí antes de dar una respuesta final.
  - *Paralelo con agregación*: varios agentes resuelven en simultáneo y un agente final consolida.
- **Human-in-the-loop**: puntos de control donde un humano aprueba, corrige o interviene antes de que el sistema continúe.
- **Guardrails**: reglas o validaciones (de input o output) que limitan lo que el agente puede hacer o decir.
- **Alucinación en agentes**: no solo "inventar hechos", sino invocar herramientas inexistentes, con argumentos inválidos, o afirmar que ejecutó una acción que no ejecutó.
- **Observabilidad**: capacidad de trazar cada paso del agente (qué pensó, qué llamó, qué costó, cuánto tardó) para depurar y auditar.
