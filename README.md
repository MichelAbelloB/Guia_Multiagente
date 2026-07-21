# Guía Multiagente

## Curso: Agentes y Sistemas Multiagente con LLMs

Creado y dictado por **Michel Abello**.

Sesiones diarias de 30 minutos · Audiencia: desarrolladores con experiencia · Duración: 12 semanas (continuo) · Stack 100% **open source y sin costo** (Ollama, LangGraph, CrewAI/AutoGen, ChromaDB, Langfuse self-hosted).

> ### 📖 La documentación completa e interactiva del curso está publicada acá:
> ## **[michelabellob.github.io/Guia_Multiagente](https://michelabellob.github.io/Guia_Multiagente/)**
>
> Navegación por módulo, videos, diagramas, ejemplos de código, autoevaluaciones y una simulación jugable — todo pensado para leerse ahí, no en este archivo.

## Qué vas a aprender

Este curso lleva de cero a un sistema multiagente completo, funcionando en local y sin depender de ningún servicio pago. Al terminarlo vas a poder:

- Explicar qué es un LLM y qué lo convierte en un **agente**: el loop de razonar → actuar → observar (ReAct).
- Darle **herramientas** a un agente (tool/function calling) y manejar sus fallos con criterio.
- Dotarlo de **memoria** de corto y largo plazo, con RAG y una base vectorial (ChromaDB).
- Modelar agentes como **grafos de estado** con LangGraph: ciclos, checkpoints y aprobación humana (human-in-the-loop).
- Diseñar **sistemas multiagente**: cuándo dividir responsabilidades, y los patrones de coordinación más usados (Supervisor, Pipeline, Debate, Paralelo).
- Comparar LangGraph contra alternativas de más alto nivel como **CrewAI** y **AutoGen**, con criterio propio.
- **Evaluar** agentes (no es testing tradicional), detectar alucinaciones y tool misuse, y aplicar guardrails.
- Lo que hace falta para llevar un agente a **producción**: costos, latencia, observabilidad (Langfuse) y manejo de fallos.
- Seguridad (prompt injection) y hacia dónde va el campo (MCP, agentes multimodales).

Todo esto se aplica en simultáneo sobre un mismo **proyecto sincrónico** (una agencia de investigación y reporte automatizado) que crece de complejidad módulo a módulo, y se complementa con **módulos extra** de profundización (arquitectura de transformers, redes neuronales, embeddings, optimización de tokens, prompt engineering avanzado) y una **simulación jugable** para practicar los conceptos antes de tocar código real.

## Programa

| Semana | Módulo |
|---|---|
| — | 0 · Panorama general (orientación) |
| 1 | Fundamentos |
| 2 | Herramientas (Tool Calling) |
| 3 | Memoria y estado |
| 4-5 | LangGraph I y II |
| 6-8 | Multiagente: fundamentos, orquestación, colaboración |
| 9 | Frameworks alternativos (CrewAI, AutoGen) |
| 10 | Evaluación y confiabilidad |
| 11 | Producción |
| 12 | Cierre y Demo Day |

El programa completo, con desglose día a día, ejemplos y videos, está en el [sitio publicado](https://michelabellob.github.io/Guia_Multiagente/).

## Sobre este repositorio

Este repo es la fuente del sitio de arriba — la carpeta [`docs/`](docs/), generada con [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) y publicada automáticamente en GitHub Pages en cada push a `main`. Para correrlo en local:

```bash
python -m venv venv
source venv/bin/activate  # en Windows: .\venv\Scripts\Activate.ps1
pip install -r requirements.txt
mkdocs serve
```

Abre [http://127.0.0.1:8000](http://127.0.0.1:8000) con recarga automática al editar cualquier archivo de `docs/`.

## Licencia

Contenido educativo de uso libre. Todas las herramientas recomendadas en el curso son open source — ver [Stack técnico](https://michelabellob.github.io/Guia_Multiagente/recursos/stack-tecnico/).
