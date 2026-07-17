# Guía Multiagente

## Curso: Agentes y Sistemas Multiagente con LLMs

Creado y dictado por **Michel Abello**.

Sesiones diarias de 30 minutos · Audiencia: desarrolladores con experiencia · Duración: 12 semanas (continuo)

Stack 100% **open source y sin costo**: Ollama (modelos locales), LangGraph, CrewAI/AutoGen, ChromaDB, Langfuse self-hosted.

**La documentación completa vive en [michelabellob.github.io/Guia_Multiagente](https://michelabellob.github.io/Guia_Multiagente/)** — sitio navegable con búsqueda, videos por módulo, diagramas y ejemplos de código.

Este repositorio es la fuente de esa documentación (carpeta [`docs/`](docs/)), generada con [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) y publicada automáticamente en GitHub Pages en cada push a `main`.

## Estructura del repo

```text
docs/
├── index.md                  # portada del sitio
├── modulos/                  # los 12 módulos del curso
├── proyecto-sincronico.md    # proyecto que evoluciona semana a semana
└── recursos/                 # glosario, stack técnico, videos y lecturas
mkdocs.yml                    # configuración del sitio
.github/workflows/deploy.yml  # build + deploy automático a GitHub Pages
```

## Correr la documentación en local

```bash
python -m venv venv
source venv/bin/activate  # en Windows: .\venv\Scripts\Activate.ps1
pip install -r requirements.txt
mkdocs serve
```

Abre [http://127.0.0.1:8000](http://127.0.0.1:8000) con recarga automática al editar cualquier archivo de `docs/`.

## Cómo usar el curso

1. Cada semana, el instructor abre la página del módulo correspondiente en el sitio publicado.
2. Cada día tiene: tema explicado, ejemplo de código cuando aplica, y actividad práctica sobre el [proyecto sincrónico](docs/proyecto-sincronico.md).
3. El código de ejemplo de cada sesión (cuando exista) se agrega en una subcarpeta `codigo/` dentro del módulo correspondiente, en commits separados, para llevar historial de cómo evolucionó el proyecto.

## Licencia

Contenido educativo de uso libre. Todas las herramientas recomendadas en el curso son open source — ver [Stack técnico](docs/recursos/stack-tecnico.md).
