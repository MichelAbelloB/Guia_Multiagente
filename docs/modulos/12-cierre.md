# Módulo 12 — Cierre (Semana 12)

!!! abstract "Tema central"
    Seguridad en agentes, tendencias emergentes (MCP, agentes multimodales), y la integración final del proyecto en el Demo Day.

## Objetivos de aprendizaje

- [ ] Explicar qué es prompt injection y una mitigación concreta.
- [ ] Describir en una frase qué resuelve MCP y por qué importa.
- [ ] Presentar el proyecto completo con métricas de costo, latencia y tasa de éxito.

## Desglose diario

| Día | Tema |
|---|---|
| 56 | Seguridad en agentes (prompt injection, exfiltración de datos) |
| 57 | Tendencias: MCP (Model Context Protocol), agentes multimodales |
| 58 | Pulido final del proyecto en equipos |
| 59 | Ensayo de demo |
| 60 | **Demo Day**: cada equipo presenta su versión del sistema + retro final del curso |

### Día 56 — Prompt injection

!!! danger "El contenido externo no es confiable"
    Si el agente lee resultados de búsqueda, páginas web o documentos, ese contenido puede incluir instrucciones dirigidas al modelo ("ignorá tus reglas anteriores y..."). La mitigación central: tratar todo contenido observado por una herramienta como **datos**, nunca como instrucciones — el mismo principio que se aplicó durante todo el curso al construir el system prompt de cada agente.

Ejercicio sugerido: inyectar deliberadamente una instrucción falsa en un resultado de búsqueda simulado y verificar si el agente del proyecto la sigue.

### Día 57 — MCP y qué sigue

MCP (Model Context Protocol) estandariza cómo un agente descubre y llama herramientas/fuentes de datos, para no reimplementar la integración por cada combinación de framework y modelo — ver [glosario](../recursos/glosario.md). Vale la pena mostrarlo como el paso lógico después de todo lo enseñado en el Módulo 2 (tool calling) y el Módulo 9 (frameworks): mismo problema, solución estandarizada.

### Día 60 — Estructura sugerida del Demo Day

```markdown
1. Problema y arquitectura final (2 min) — diagrama del sistema multiagente completo
2. Demo en vivo (5 min) — una investigación de punta a punta
3. Métricas (2 min) — costo/cómputo, latencia, tasa de éxito (del Módulo 10)
4. Qué cambiarían con más tiempo (1 min)
```

## Videos recomendados

<div class="video-embed" data-yt-id="OaRhpwz_TGM" data-title="The Future of AI Agents with Andrew Ng — Interrupt 26"></div>

**[The Future of AI Agents with Andrew Ng — Interrupt 26](https://www.youtube.com/watch?v=OaRhpwz_TGM)** — Fireside chat entre Andrew Ng y el fundador de LangChain sobre hacia dónde va el campo — buen cierre de curso.

Más videos sobre este módulo:

| Video | Canal | Por qué verlo |
|---|---|---|
| [Tips for building AI agents](https://www.youtube.com/watch?v=LP5OCa20Zpg) | — (equipo de Anthropic) | Errores comunes y buenas prácticas al construir agentes — cierra el círculo con el video de apertura del Módulo 1. |

## Notas para el instructor

- El Día 60 corresponde a la Fase 7 del proyecto (`proyecto-sincronico/fase-7-demo-final/`) — demo con métricas de costo, latencia y tasa de éxito.
- Cerrar con la rúbrica de checkpoints completa y el [glosario](../recursos/glosario.md) ampliado como entregable del curso.

!!! tip "Nodo dice"
    Llegaste hasta acá — de un LLM que solo predice texto a un sistema completo de agentes coordinados. Fue un buen recorrido. ¡Éxitos en el Demo Day!

## Checklist de cierre del curso

- [ ] Cada equipo presentó su sistema con métricas reales, no estimadas.
- [ ] Se discutió al menos una mitigación de prompt injection aplicada al proyecto.
- [ ] El glosario y el registro de decisiones (`decisiones.md`) quedan como entregables finales del repositorio.
