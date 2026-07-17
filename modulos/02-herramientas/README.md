# Módulo 2 — Herramientas / Tool Calling (Semana 2)

**Tema central:** tool calling, function calling, esquemas JSON.

## Desglose diario

| Día | Tema |
|---|---|
| 6 | Qué es function/tool calling y cómo lo implementa cada proveedor |
| 7 | Diseño de esquemas de herramientas (JSON schema, nombres claros, descripciones) |
| 8 | Manejo de errores de herramientas (qué hace el agente si la tool falla) |
| 9 | Encadenar múltiples llamadas a herramientas en un mismo turno |
| 10 | Práctica: dar al agente del proyecto su primera herramienta real (búsqueda web con DuckDuckGo Search) |

## Notas para el instructor

- Con Ollama, verificar que el modelo elegido soporte tool calling nativo (ej. `llama3.1`, `qwen2.5`); si no, mostrar el patrón manual de parseo de JSON como alternativa.
- El Día 10 avanza el proyecto: agregar la herramienta de búsqueda al agente de la Fase 1.
