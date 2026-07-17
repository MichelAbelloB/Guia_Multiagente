# Módulo 7 — Multiagente: orquestación (Semana 7)

!!! abstract "Tema central"
    Dos formas de coordinar varios agentes: el patrón **Supervisor/Router** (un agente central delega) y el patrón **Pipeline secuencial** (cada agente pasa su output al siguiente).

## Objetivos de aprendizaje

- [ ] Implementar un supervisor que decide a qué agente delegar según el estado actual.
- [ ] Implementar un pipeline secuencial fijo.
- [ ] Elegir el patrón correcto según criterios explícitos, no por preferencia.

## Supervisor vs. Pipeline

```mermaid
flowchart TD
    subgraph Supervisor["Patrón Supervisor / Router"]
        S[Supervisor] -->|decide dinámicamente| A1[Investigador]
        S --> A2[Verificador]
        S --> A3[Redactor]
        A1 --> S
        A2 --> S
        A3 --> S
    end
```

```mermaid
flowchart LR
    subgraph Pipeline["Patrón Pipeline secuencial"]
        P1[Investigador] --> P2[Verificador] --> P3[Redactor] --> P4[Auditor]
    end
```

## Desglose diario

| Día | Tema |
|---|---|
| 31 | Patrón Supervisor/Router |
| 32 | Patrón Pipeline secuencial |
| 33 | Cuándo usar cada patrón (criterios de decisión) |
| 34 | Implementar el supervisor del proyecto (decide investigador → verificador → redactor) |
| 35 | Práctica guiada + troubleshooting grupal |

### Día 31 — Supervisor mínimo en LangGraph

```python
from typing import Literal

def supervisor(state: State) -> Literal["investigador", "verificador", "redactor", "__end__"]:
    ultimo = state["messages"][-1].content
    if "hallazgos" not in state:
        return "investigador"
    if not state.get("fuentes_verificadas"):
        return "verificador"
    if not state.get("borrador"):
        return "redactor"
    return "__end__"

grafo.add_conditional_edges("supervisor", supervisor)
```

El supervisor no hace el trabajo — solo decide **quién** lo hace a continuación, leyendo el estado compartido. Cada agente delegado vuelve al supervisor al terminar, en vez de pasar directo al siguiente.

### Día 33 — Criterios de decisión

| Usar Supervisor cuando... | Usar Pipeline cuando... |
|---|---|
| El orden de los pasos puede variar según el caso | El orden es siempre el mismo, sin excepciones |
| Puede hacer falta repetir un paso (ej. re-verificar) | Cada paso se ejecuta exactamente una vez |
| Se necesita lógica de reintento o escalamiento centralizada | La simplicidad y previsibilidad importan más que la flexibilidad |

## Videos recomendados

| Video | Canal | Por qué verlo |
|---|---|---|
| [LangGraph Supervisor Agent: Multi-Agent Orchestration Walkthrough](https://www.youtube.com/watch?v=HonlBK19F1o) | — | Walkthrough completo del patrón supervisor con `langgraph-supervisor`. |
| [LangGraph:20 — Supervisor Multi-Agentic System](https://www.youtube.com/watch?v=ktjJAxaX8rc) | — | Implementación práctica adicional del patrón supervisor/router. |

## Notas para el instructor

- Comparar ambos patrones en vivo sobre el mismo caso de uso ayuda a que el grupo entienda el criterio de decisión, no solo la sintaxis.

## Checklist de cierre del módulo

- [ ] El proyecto tiene un supervisor funcionando que delega entre al menos 3 agentes.
- [ ] El grupo implementó también la versión pipeline del mismo flujo, aunque sea como ejercicio descartable.
- [ ] Cada participante puede justificar en una frase cuándo usaría cada patrón.
