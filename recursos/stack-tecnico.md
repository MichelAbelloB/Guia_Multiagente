# Stack técnico — 100% open source, costo $0

| Etapa | Herramienta | Por qué |
|---|---|---|
| Modelo (todas las semanas) | **Ollama** + modelo local open source (Llama 3.1/3.2, Qwen2.5, Mistral) | Corre en la máquina de cada participante, sin API key, sin límite de uso ni costo por token |
| Fundamentos (Sem 1-2) | Python + Ollama sin framework (llamadas HTTP directas o SDK `ollama`) | Entender qué pasa "por debajo" antes de abstraer |
| Orquestación (Sem 3-8) | **LangGraph** (open source, licencia MIT) | Control explícito del flujo como grafo de estados; estándar de facto en producción, funciona igual con modelos locales o de API |
| Comparación (Sem 9-10) | **CrewAI** o **AutoGen** (ambos open source) | Alto nivel de abstracción, roles predefinidos |
| Vector store / RAG | **ChromaDB** (open source, embebido, sin servidor externo) | Memoria de largo plazo sin depender de servicios pagos (Pinecone, etc.) |
| Observabilidad | **Langfuse (self-hosted con Docker)** | Alternativa open source a LangSmith; se levanta local con `docker compose`, sin costo |
| Búsqueda web (herramienta) | **DuckDuckGo Search (`duckduckgo-search`)** o **SearXNG self-hosted** | Evita depender de APIs de búsqueda pagas (Google/Bing/Tavily) |

## Notas de hardware

Con Ollama, un modelo tipo `llama3.1:8b` o `qwen2.5:7b` corre razonablemente en una laptop con 16GB de RAM sin GPU dedicada (más lento) o con GPU de 8GB+ (fluido).

**Plan B para hardware limitado:** Groq o Google AI Studio (Gemini) ofrecen niveles gratuitos con límite de requests — no son open source pero sí sin costo, útiles para no bloquear a nadie por hardware.

## Política de costo cero

Todo el stack elegido (Ollama, LangGraph, CrewAI/AutoGen, ChromaDB, Langfuse self-hosted, DuckDuckGo Search) es open source y no requiere tarjeta de crédito ni API key de pago. Si en algún momento se quiere comparar contra un modelo propietario (GPT, Claude, Gemini), usar los niveles gratuitos con límite de requests solo como demostración puntual, no como base del curso, para no generar dependencia de un servicio pago.

## Instalación rápida (referencia)

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
