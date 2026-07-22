# Stack técnico — 100% open source, costo $0

| Etapa | Herramienta | Por qué |
|---|---|---|
| Modelo (todas las semanas) | **Ollama** + modelo local open source (Llama 3.1/3.2, Qwen2.5, Mistral) | Corre en la máquina de cada participante, sin API key, sin límite de uso ni costo por token |
| Fundamentos (Sem 1-2) | Python + Ollama sin framework (llamadas HTTP directas o SDK `ollama`) | Entender qué pasa "por debajo" antes de abstraer |
| Orquestación (Sem 3-8) | **LangGraph** (open source, licencia MIT) | Control explícito del flujo como grafo de estados; estándar de facto en producción, funciona igual con modelos locales o de API |
| Comparación (Sem 9) | **CrewAI** o **AutoGen** (ambos open source) | Alto nivel de abstracción, roles predefinidos |
| Vector store / RAG | **ChromaDB** (open source, embebido, sin servidor externo) | Memoria de largo plazo sin depender de servicios pagos (Pinecone, etc.) |
| Observabilidad | **Langfuse (self-hosted con Docker)** | Alternativa open source a LangSmith; se levanta local con `docker compose`, sin costo |
| Búsqueda web (herramienta) | **DuckDuckGo Search** (`duckduckgo-search`) o **SearXNG** self-hosted | Evita depender de APIs de búsqueda pagas (Google/Bing/Tavily) |

## Notas de hardware

Con Ollama, un modelo tipo `llama3.1:8b` o `qwen2.5:7b` corre razonablemente en una laptop con 16GB de RAM sin GPU dedicada (más lento) o con GPU de 8GB+ (fluido). Para un catálogo completo de modelos y cuál elegir según la tarea, ver el módulo extra [Ollama: modelos y guía rápida](../extra/ollama-modelos.md).

!!! tip "Plan B para hardware limitado"
    Groq o Google AI Studio (Gemini) ofrecen niveles gratuitos con límite de requests — no son open source pero sí sin costo, útiles para no bloquear a nadie por hardware.

## Política de costo cero

Todo el stack elegido (Ollama, LangGraph, CrewAI/AutoGen, ChromaDB, Langfuse self-hosted, DuckDuckGo Search) es open source y no requiere tarjeta de crédito ni API key de pago. Si en algún momento se quiere comparar contra un modelo propietario (GPT, Claude, Gemini), usar los niveles gratuitos con límite de requests solo como demostración puntual, no como base del curso, para no generar dependencia de un servicio pago.

## Instalación rápida

=== "Linux / macOS"

    ```bash
    # Ollama
    curl -fsSL https://ollama.com/install.sh | sh
    ollama pull llama3.1:8b

    # Entorno Python
    python -m venv venv
    source venv/bin/activate
    pip install langgraph langchain-ollama chromadb duckduckgo-search crewai

    # Langfuse (observabilidad, self-hosted)
    git clone https://github.com/langfuse/langfuse.git
    cd langfuse && docker compose up -d
    ```

=== "Windows (PowerShell)"

    ```powershell
    # Ollama: descargar el instalador desde https://ollama.com/download/windows
    ollama pull llama3.1:8b

    # Entorno Python
    python -m venv venv
    .\venv\Scripts\Activate.ps1
    pip install langgraph langchain-ollama chromadb duckduckgo-search crewai

    # Langfuse (observabilidad, self-hosted — requiere Docker Desktop)
    git clone https://github.com/langfuse/langfuse.git
    cd langfuse
    docker compose up -d
    ```

## Verificar que todo funciona

```bash
# El modelo responde localmente, sin red
ollama run llama3.1:8b "Decime 'hola' en una palabra"

# LangGraph + Ollama están conectados
python -c "from langchain_ollama import ChatOllama; print(ChatOllama(model='llama3.1:8b').invoke('ping'))"
```

!!! warning "Tool calling nativo por modelo"
    No todos los modelos locales soportan tool calling nativo de la misma forma. `llama3.1`, `llama3.2` y `qwen2.5` lo soportan bien vía Ollama. Si el grupo usa otro modelo, verificar soporte antes del Módulo 2 — si no está soportado, se puede enseñar el patrón manual de parseo de JSON como alternativa (ver [Módulo 2](../modulos/02-herramientas.md)).

## Referencia rápida de versiones probadas

| Paquete | Versión de referencia |
|---|---|
| `langgraph` | 0.2.x |
| `langchain-ollama` | 0.2.x |
| `chromadb` | 0.5.x |
| `crewai` | 0.7x |
| `ollama` (servidor) | última estable |
