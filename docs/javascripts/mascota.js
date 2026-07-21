(function () {
  var currentScript = document.currentScript;
  var baseUrl = "";
  if (currentScript && currentScript.src) {
    baseUrl = currentScript.src.replace(/javascripts\/mascota\.js.*$/, "");
  }
  var mascotSrc = baseUrl + "assets/mascota/nodo.png";

  var TIPS = {
    "/": "¡Hola! Soy Nodo y te voy a acompañar por todo el curso. Si es tu primera vez acá, arrancá por el <strong>Módulo 0</strong> antes que nada.",
    "/modulos/": "Doce módulos, uno por semana. Si no sabés por dónde empezar, andá al Módulo 0 o al Módulo 1.",
    "/modulos/00-introduccion-general/": "Este módulo es el mapa de todo el curso. Ideal si nunca usaste un LLM más allá de un chat.",
    "/modulos/01-fundamentos/": "Prestá atención al diagrama del loop ReAct — lo vas a reconocer en casi todos los módulos que siguen.",
    "/modulos/02-herramientas/": "La clave acá: el nombre y la descripción de una herramienta son, en la práctica, el prompt real.",
    "/modulos/03-memoria-y-estado/": "Más memoria no siempre es mejor — ojo con el 'contexto contaminado' que se explica en este módulo.",
    "/modulos/04-langgraph-I/": "Este es el mismo loop del Módulo 1, pero dibujado como grafo. Compará ambos si algo no cierra.",
    "/modulos/05-langgraph-II/": "Human-in-the-loop es de lo más útil del módulo — un punto donde una persona aprueba antes de seguir.",
    "/modulos/06-multiagente-fundamentos/": "Antes de sumar un agente nuevo, preguntate: ¿de verdad necesita su propio rol?",
    "/modulos/07-multiagente-orquestacion/": "Supervisor vs. Pipeline: la tabla comparativa de este módulo te ahorra una decisión a ciegas.",
    "/modulos/08-multiagente-colaboracion/": "Definí siempre una regla de desempate entre agentes — si no, terminás en un loop de revisiones infinito.",
    "/modulos/09-frameworks-alternativos/": "No hay un framework 'mejor' — la tabla comparativa te ayuda a elegir según el caso.",
    "/modulos/10-evaluacion-confiabilidad/": "Testear un agente no es como testear código tradicional: acá se evalúa contra criterios, no contra un valor exacto.",
    "/modulos/11-produccion/": "Langfuse es tu mejor amigo en este módulo — sin trazas, es muy difícil saber qué hizo el agente y por qué.",
    "/modulos/12-cierre/": "¡Último módulo! Repasá el glosario completo antes del Demo Day.",
    "/proyecto-sincronico/": "Este es el proyecto que crece semana a semana. Guardate esta página, vas a volver seguido.",
    "/recursos/": "Glosario, stack técnico y videos, todo junto. Si te perdés un término, empezá por acá.",
    "/recursos/glosario/": "¿Un término no te cierra? Este glosario se amplía módulo a módulo — volvé cuando haga falta.",
    "/recursos/stack-tecnico/": "Todo lo que necesitás instalar está acá, con comandos para Linux/macOS y Windows.",
    "/recursos/lecturas-recomendadas/": "Todos los videos del curso, agrupados por módulo, en una sola lista.",
    "/extra/": "Estos módulos no consumen semana del cronograma — son para cuando querés profundizar un tema puntual.",
    "/extra/redes-neuronales/": "No te vayas sin apretar play en la simulación de abajo — verla entrenar en vivo dice más que cualquier párrafo.",
    "/extra/prompting-vs-finetuning-vs-rag/": "Si tenés dudas, andá directo al árbol de decisión: en dos preguntas te dice qué técnica conviene para tu caso.",
    "/extra/arquitectura-transformers/": "Es el módulo más denso del curso. Andá con calma, y si algo no cierra, el video de 3Blue1Brown lo explica mejor que cualquier texto.",
    "/extra/optimizacion-tokens/": "Corré el ejemplo de tiktoken con una frase en español y otra en inglés — vas a ver la diferencia con tus propios ojos, no hace falta que me creas.",
    "/extra/embeddings/": "Esto es lo que hace ChromaDB por debajo en el Módulo 3. Si esa parte del curso te quedó como caja negra, empezá por acá.",
    "/extra/prompt-engineering-avanzado/": "Probá el mismo prompt con y sin ejemplos few-shot sobre el agente del proyecto — la diferencia se nota más de lo que pensás."
  };

  var DEFAULT_TIP = "Seguí explorando — cada módulo tiene ejemplos, videos y un checklist al final.";

  function normalizedPath() {
    var path = window.location.pathname;
    path = path.replace(/^\/Guia_Multiagente/, "");
    if (path === "") path = "/";
    return path;
  }

  function getTip() {
    var path = normalizedPath();
    return TIPS[path] || DEFAULT_TIP;
  }

  function setOpen(widget, open) {
    widget.setAttribute("data-open", open ? "true" : "false");
  }

  function buildWidget() {
    var widget = document.createElement("div");
    widget.id = "nodo-widget";
    widget.setAttribute("data-open", "false");

    var bubble = document.createElement("div");
    bubble.className = "nodo-bubble";
    bubble.setAttribute("role", "status");

    var closeBtn = document.createElement("button");
    closeBtn.className = "nodo-close";
    closeBtn.setAttribute("aria-label", "Cerrar");
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(widget, false);
    });

    var bubbleText = document.createElement("span");
    bubbleText.id = "nodo-bubble-text";

    bubble.appendChild(closeBtn);
    bubble.appendChild(bubbleText);

    var avatarBtn = document.createElement("button");
    avatarBtn.className = "nodo-avatar-btn";
    avatarBtn.setAttribute("aria-label", "Abrir tip de Nodo, la mascota del curso");
    avatarBtn.addEventListener("click", function () {
      var isOpen = widget.getAttribute("data-open") === "true";
      setOpen(widget, !isOpen);
    });

    var img = document.createElement("img");
    img.src = mascotSrc;
    img.alt = "Nodo";
    avatarBtn.appendChild(img);

    widget.appendChild(bubble);
    widget.appendChild(avatarBtn);
    document.body.appendChild(widget);

    return widget;
  }

  function initMascota() {
    var widget = document.getElementById("nodo-widget");
    if (!widget) {
      widget = buildWidget();
    }

    var bubbleText = document.getElementById("nodo-bubble-text");
    if (bubbleText) {
      bubbleText.innerHTML = getTip();
    }

    try {
      if (!window.localStorage.getItem("nodo-intro-seen")) {
        setOpen(widget, true);
        window.localStorage.setItem("nodo-intro-seen", "1");
      }
    } catch (err) {
      /* localStorage no disponible (modo privado, etc.) — no pasa nada */
    }
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(initMascota);
  } else {
    document.addEventListener("DOMContentLoaded", initMascota);
  }
})();
