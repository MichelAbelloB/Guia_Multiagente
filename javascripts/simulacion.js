(function () {
  var currentScript = document.currentScript;
  var baseUrl = "";
  if (currentScript && currentScript.src) {
    baseUrl = currentScript.src.replace(/javascripts\/simulacion\.js.*$/, "");
  }
  var nodoSrc = baseUrl + "assets/mascota/nodo.png";
  var STORAGE_KEY = "sim-progreso-v1";

  var LEVELS = [
    {
      node: { icon: "🔌", label: "Herramienta" },
      title: "Nivel 1 — Por qué hace falta un agente",
      brief:
        "Mirá esto: le pregunté la fecha de hoy a un modelo sin ninguna herramienta. Fijate qué responde.",
      terminal: [
        { type: "cmd", text: "ollama run llama3.1:8b" },
        { type: "cmd", text: "¿qué día es hoy?" },
        {
          type: "out",
          text: "No tengo forma de saber la fecha actual — no tengo acceso a un reloj ni a internet.",
        },
      ],
      afterBrief:
        "Por eso hace falta darle una herramienta. Instalá la librería de búsqueda web para empezar.",
      task: {
        kind: "input",
        prompt: "Escribí el comando para instalar la herramienta de búsqueda:",
        placeholder: "$",
        hint: "Probá con: pip install duckduckgo-search",
        accept: function (v) {
          v = v.toLowerCase();
          return v.indexOf("pip install") !== -1 && v.indexOf("duckduckgo") !== -1;
        },
        successOutput: "✔ Successfully installed duckduckgo-search-6.3.0",
      },
      xp: 10,
    },
    {
      node: { icon: "💬", label: "Prompt" },
      title: "Nivel 2 — El primer system prompt",
      brief:
        "Ya tenés la herramienta instalada. Ahora el agente necesita saber CUÁNDO usarla — no alcanza con dársela.",
      terminal: [],
      task: {
        kind: "choice",
        prompt: "¿Cuál de estos tres system prompts es el mejor punto de partida?",
        options: [
          {
            label: "\"Sos un asistente. Respondé todo lo que te pregunten.\"",
            correct: false,
            feedback: "Con esto el agente ni se entera de que tiene una herramienta disponible.",
          },
          {
            label:
              "\"Tenés una herramienta de búsqueda web. Usala solo si la pregunta requiere datos que puedan haber cambiado recientemente. Si no, respondé directo.\"",
            correct: true,
            feedback:
              "¡Exacto! Le decís CUÁNDO actuar, no solo QUÉ puede hacer — la diferencia clave del Módulo 1.",
          },
          {
            label: "\"Sos un asistente. Buscá en internet todo, siempre, para estar seguro.\"",
            correct: false,
            feedback: "Funcionaría, pero buscaría hasta para saludar — tiempo y tokens tirados a la basura.",
          },
        ],
      },
      xp: 10,
    },
    {
      node: { icon: "⚙️", label: "Ejecución" },
      title: "Nivel 3 — Tool calling en acción",
      brief: "Con el system prompt correcto, así se ve el agente resolviendo la misma pregunta:",
      terminal: [
        { type: "cmd", text: "¿qué día es hoy?" },
        { type: "out", text: "🤔 Pensando... esta pregunta necesita un dato actual." },
        { type: "out", text: "🔧 Llamando a buscar_web(query=\"fecha de hoy\")" },
        { type: "out", text: "📥 Resultado: \"17 de julio de 2026\"" },
      ],
      afterBrief: "Ahora completá vos la respuesta final que debería dar el agente, usando ese resultado:",
      task: {
        kind: "input",
        prompt: "Escribí la respuesta final del agente:",
        placeholder: ">>>",
        hint: "Usá el resultado de arriba: 17 de julio de 2026",
        accept: function (v) {
          v = v.toLowerCase();
          return v.indexOf("17") !== -1 && (v.indexOf("julio") !== -1 || v.indexOf("jul") !== -1);
        },
        successOutput: "🤖 Hoy es 17 de julio de 2026.",
      },
      xp: 10,
    },
    {
      node: { icon: "💾", label: "Memoria" },
      title: "Nivel 4 — Memoria: no perder lo investigado",
      brief:
        "El agente investigó algo importante para el reporte. Si reiniciás el programa mañana, ¿dónde tiene que estar guardado ese hallazgo para no perderlo?",
      terminal: [],
      task: {
        kind: "choice",
        prompt: "Elegí dónde guardar el hallazgo:",
        options: [
          {
            label: "En una variable de Python",
            correct: false,
            feedback: "Se pierde apenas se reinicia el proceso — no sirve como memoria real.",
          },
          {
            label: "En un vector store como ChromaDB",
            correct: true,
            feedback: "Correcto — persiste entre sesiones y se puede recuperar por significado, no solo por texto exacto.",
          },
          {
            label: "No hace falta guardarlo, se lo volvemos a preguntar cada vez",
            correct: false,
            feedback: "A veces ni se puede — la fuente pudo haber cambiado o desaparecido.",
          },
        ],
      },
      xp: 10,
    },
    {
      node: { icon: "👥", label: "Equipo" },
      title: "Nivel 5 — De un agente a un equipo",
      brief:
        "El proyecto creció: ahora hay que investigar, verificar fuentes y redactar un informe. Un solo agente ya no alcanza.",
      terminal: [],
      task: {
        kind: "choice",
        prompt: "¿Cómo organizamos el trabajo?",
        options: [
          {
            label: "Un solo agente gigante que hace todo",
            correct: false,
            feedback: "Funciona al principio, pero se vuelve imposible de debuggear y de mejorar.",
          },
          {
            label: "Varios agentes especializados, coordinados por un supervisor",
            correct: true,
            feedback: "¡Eso es! Cada agente con su rol, y un supervisor que decide quién actúa a continuación.",
          },
          {
            label: "Copiar y pegar el mismo prompt tres veces",
            correct: false,
            feedback: "Eso no divide nada — seguís teniendo un solo comportamiento, ahora triplicado.",
          },
        ],
      },
      xp: 10,
    },
  ];

  var TYPE_SPEED = 18;
  var LINE_PAUSE = 260;

  var root = null;
  var state = { level: 0, xp: 0 };

  function loadProgress() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      /* localStorage no disponible */
    }
    return null;
  }

  function saveProgress() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* no pasa nada si no se puede guardar */
    }
  }

  function clearProgress() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* nada */
    }
  }

  function el(tag, className, html) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function renderRoadmap(container, levelIndex) {
    var wrap = el("div", "sim-progress");

    var nodesMeta = LEVELS.map(function (l) {
      return l.node;
    }).concat([{ icon: "🏁", label: "Meta" }]);

    var map = el("div", "sim-roadmap");
    nodesMeta.forEach(function (meta, i) {
      var status;
      if (i < levelIndex) {
        status = "done";
      } else if (i === levelIndex) {
        status = "current";
      } else {
        status = "upcoming";
      }

      var node = el("div", "sim-roadmap-node " + status);
      var circle = el("div", "sim-roadmap-circle", status === "done" ? "✓" : meta.icon);
      circle.title = meta.label;
      var label = el("div", "sim-roadmap-label", meta.label);
      node.appendChild(circle);
      node.appendChild(label);
      map.appendChild(node);

      if (i < nodesMeta.length - 1) {
        var connectorDone = i < levelIndex;
        var connector = el("div", "sim-roadmap-connector" + (connectorDone ? " done" : ""));
        map.appendChild(connector);
      }
    });
    wrap.appendChild(map);

    var xpBadge = el("div", "sim-xp-badge", "⭐ " + state.xp + " XP");
    wrap.appendChild(xpBadge);
    container.appendChild(wrap);
  }

  function renderNodo(container, text, big) {
    var row = el("div", "sim-nodo-row");
    var img = document.createElement("img");
    img.src = nodoSrc;
    img.alt = "Nodo";
    img.className = "sim-nodo-avatar" + (big ? " sim-nodo-big" : "");
    row.appendChild(img);
    if (text) {
      var bubble = el("div", "sim-nodo-bubble", text);
      row.appendChild(bubble);
    }
    container.appendChild(row);
    return row;
  }

  function renderTerminal(container, lines, onDone) {
    var term = el("div", "sim-terminal");
    var bar = el(
      "div",
      "sim-terminal-bar",
      '<span class="sim-terminal-dot red"></span><span class="sim-terminal-dot yellow"></span><span class="sim-terminal-dot green"></span><span class="sim-terminal-label">agente.py</span>'
    );
    var body = el("div", "sim-terminal-body");
    term.appendChild(bar);
    term.appendChild(body);
    container.appendChild(term);

    if (!lines || lines.length === 0) {
      if (onDone) onDone();
      return term;
    }

    var cursor = el("span", "sim-cursor");
    var idx = 0;

    function typeNext() {
      if (idx >= lines.length) {
        cursor.remove();
        if (onDone) onDone();
        return;
      }
      var lineDef = lines[idx];
      var lineEl = el("div", "sim-terminal-line " + lineDef.type);
      body.appendChild(lineEl);
      body.appendChild(cursor);
      var text = lineDef.text;
      var charIdx = 0;
      var timer = setInterval(function () {
        lineEl.textContent = text.slice(0, charIdx + 1);
        charIdx++;
        body.scrollTop = body.scrollHeight;
        if (charIdx >= text.length) {
          clearInterval(timer);
          idx++;
          setTimeout(typeNext, LINE_PAUSE);
        }
      }, TYPE_SPEED);
    }

    typeNext();
    return term;
  }

  function appendTerminalLine(term, type, text) {
    var body = term.querySelector(".sim-terminal-body");
    var lineEl = el("div", "sim-terminal-line " + type, text);
    body.appendChild(lineEl);
    body.scrollTop = body.scrollHeight;
  }

  function renderInput() {
    var screen = el("div", "sim-screen");
    var levelDef = LEVELS[state.level];

    renderRoadmap(screen, state.level);
    var titleBlock = el("div");
    titleBlock.appendChild(el("h3", "sim-title", levelDef.title));
    screen.appendChild(titleBlock);

    renderNodo(screen, levelDef.brief);

    var terminalHolder = el("div");
    screen.appendChild(terminalHolder);

    var taskHolder = el("div", "sim-task");
    taskHolder.style.display = "none";
    screen.appendChild(taskHolder);

    root.innerHTML = "";
    root.appendChild(screen);

    function afterTerminal() {
      if (levelDef.afterBrief) {
        renderNodo(terminalHolder, levelDef.afterBrief);
      }
      buildTask(taskHolder, levelDef);
      taskHolder.style.display = "block";
    }

    if (levelDef.terminal && levelDef.terminal.length > 0) {
      renderTerminal(terminalHolder, levelDef.terminal, afterTerminal);
    } else {
      afterTerminal();
    }

    return screen;
  }

  function buildTask(taskHolder, levelDef) {
    var task = levelDef.task;
    var terminalRef = taskHolder.parentNode.querySelector(".sim-terminal");

    if (task.kind === "input") {
      var promptEl = el("p", "sim-task-prompt", task.prompt);
      var row = el("div", "sim-input-row");
      var promptSign = document.createElement("span");
      promptSign.textContent = task.placeholder || "$";
      var input = document.createElement("input");
      input.type = "text";
      input.autocomplete = "off";
      input.autocapitalize = "off";
      input.spellcheck = false;
      input.setAttribute("aria-label", task.prompt);
      row.appendChild(promptSign);
      row.appendChild(input);

      var actions = el("div", "sim-actions");
      var submitBtn = el("button", "sim-btn sim-btn-primary", "Ejecutar");
      actions.appendChild(submitBtn);

      var feedbackHolder = el("div");

      taskHolder.appendChild(promptEl);
      taskHolder.appendChild(row);
      taskHolder.appendChild(actions);
      taskHolder.appendChild(feedbackHolder);

      function submit() {
        var value = input.value.trim();
        if (!value) return;
        if (task.accept(value)) {
          input.disabled = true;
          submitBtn.disabled = true;
          if (terminalRef) appendTerminalLine(terminalRef, "cmd", value);
          if (terminalRef && task.successOutput) appendTerminalLine(terminalRef, "ok", task.successOutput);
          feedbackHolder.innerHTML = "";
          feedbackHolder.appendChild(el("div", "sim-feedback success", "✔ ¡Bien! Nivel completado."));
          completeLevel(taskHolder);
        } else {
          feedbackHolder.innerHTML = "";
          feedbackHolder.appendChild(
            el("div", "sim-feedback error", "Todavía no. Tip: " + task.hint)
          );
        }
      }

      submitBtn.addEventListener("click", submit);
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") submit();
      });
      setTimeout(function () {
        input.focus();
      }, 50);
    } else if (task.kind === "choice") {
      var promptEl2 = el("p", "sim-task-prompt", task.prompt);
      var choices = el("div", "sim-choices");
      var feedbackHolder2 = el("div");
      taskHolder.appendChild(promptEl2);
      taskHolder.appendChild(choices);
      taskHolder.appendChild(feedbackHolder2);

      var buttons = [];
      task.options.forEach(function (opt) {
        var btn = el("button", "sim-choice-btn", opt.label);
        btn.addEventListener("click", function () {
          buttons.forEach(function (b) {
            b.disabled = true;
          });
          feedbackHolder2.innerHTML = "";
          if (opt.correct) {
            btn.classList.add("correct");
            feedbackHolder2.appendChild(el("div", "sim-feedback success", "✔ " + opt.feedback));
            completeLevel(taskHolder);
          } else {
            btn.classList.add("incorrect");
            feedbackHolder2.appendChild(el("div", "sim-feedback error", opt.feedback));
            var retryBtn = el("button", "sim-btn sim-btn-secondary", "Probar de nuevo");
            retryBtn.addEventListener("click", function () {
              buttons.forEach(function (b) {
                b.disabled = false;
                b.classList.remove("incorrect", "correct");
              });
              feedbackHolder2.innerHTML = "";
            });
            var actionsRetry = el("div", "sim-actions");
            actionsRetry.appendChild(retryBtn);
            feedbackHolder2.appendChild(actionsRetry);
          }
        });
        buttons.push(btn);
        choices.appendChild(btn);
      });
    }
  }

  function completeLevel(taskHolder) {
    var levelDef = LEVELS[state.level];
    state.xp += levelDef.xp;
    saveProgress();
    var xpBadge = document.querySelector(".sim-xp-badge");
    if (xpBadge) xpBadge.textContent = "⭐ " + state.xp + " XP";
    var actions = el("div", "sim-actions");
    var isLast = state.level >= LEVELS.length - 1;
    var nextBtn = el(
      "button",
      "sim-btn sim-btn-primary",
      isLast ? "Ver resultado final →" : "Siguiente nivel →"
    );
    nextBtn.addEventListener("click", function () {
      state.level++;
      saveProgress();
      if (state.level >= LEVELS.length) {
        renderVictory();
      } else {
        renderInput();
      }
    });
    actions.appendChild(nextBtn);
    taskHolder.appendChild(actions);
  }

  function renderIntro() {
    var screen = el("div", "sim-screen");
    renderNodo(
      screen,
      "¡Hola! Soy Nodo. Antes de que arranques el curso posta, ¿querés armar un mini agente conmigo, ahora mismo, en 5 niveles cortos?",
      true
    );
    screen.appendChild(el("h2", "sim-title", "Simulación: construí tu primer agente"));
    screen.appendChild(
      el(
        "p",
        "sim-subtitle",
        "5 niveles · terminal simulada · nada que instalar. Vas a tocar los mismos conceptos que ves en los Módulos 1, 2, 3, 6 y 7 del curso real."
      )
    );

    var saved = loadProgress();
    renderRoadmap(screen, saved ? saved.level : -1);

    var actions = el("div", "sim-actions");
    if (saved && saved.level > 0 && saved.level < LEVELS.length) {
      var continueBtn = el("button", "sim-btn sim-btn-primary", "Continuar (Nivel " + (saved.level + 1) + ")");
      continueBtn.addEventListener("click", function () {
        state = saved;
        renderInput();
      });
      actions.appendChild(continueBtn);

      var restartBtn = el("button", "sim-btn sim-btn-secondary", "Empezar de nuevo");
      restartBtn.addEventListener("click", function () {
        clearProgress();
        state = { level: 0, xp: 0 };
        renderInput();
      });
      actions.appendChild(restartBtn);
    } else {
      var startBtn = el("button", "sim-btn sim-btn-primary", "Empezar simulación →");
      startBtn.addEventListener("click", function () {
        state = { level: 0, xp: 0 };
        saveProgress();
        renderInput();
      });
      actions.appendChild(startBtn);
    }
    screen.appendChild(actions);

    root.innerHTML = "";
    root.appendChild(screen);
  }

  function renderVictory() {
    clearProgress();
    var screen = el("div", "sim-screen sim-victory");
    renderRoadmap(screen, LEVELS.length + 1);
    var img = document.createElement("img");
    img.src = nodoSrc;
    img.alt = "Nodo";
    img.className = "sim-nodo-avatar sim-nodo-big";
    img.style.margin = "0 auto";
    img.style.display = "block";
    screen.appendChild(img);

    screen.appendChild(el("h2", "sim-title", "¡Misión cumplida!"));
    screen.appendChild(
      el(
        "p",
        "sim-subtitle",
        "Armaste, paso a paso, la lógica de un agente que usa herramientas, recuerda lo investigado, y se coordina con otros agentes."
      )
    );

    var stats = el("div", "sim-victory-stats");
    var xpStat = el("div", "sim-victory-stat", "<b>" + state.xp + "</b><span>XP total</span>");
    var levelStat = el(
      "div",
      "sim-victory-stat",
      "<b>" + LEVELS.length + "/" + LEVELS.length + "</b><span>Niveles</span>"
    );
    stats.appendChild(xpStat);
    stats.appendChild(levelStat);
    screen.appendChild(stats);

    screen.appendChild(
      el(
        "p",
        "sim-nodo-bubble",
        "Esto fue solo una probadita. En el curso real vas a construir este mismo sistema con LangGraph, herramientas de verdad y memoria persistente, semana a semana durante 12 semanas — arrancando por el Módulo 0."
      )
    );

    var actions = el("div", "sim-actions");
    var goBtn = document.createElement("a");
    goBtn.href = (baseUrl || "../") + "modulos/00-introduccion-general/";
    goBtn.className = "sim-btn sim-btn-primary";
    goBtn.textContent = "Empezar el Módulo 0 →";
    goBtn.style.textDecoration = "none";
    goBtn.style.display = "inline-block";
    actions.appendChild(goBtn);

    var restartBtn = el("button", "sim-btn sim-btn-secondary", "Jugar de nuevo");
    restartBtn.addEventListener("click", function () {
      state = { level: 0, xp: 0 };
      saveProgress();
      renderInput();
    });
    actions.appendChild(restartBtn);
    screen.appendChild(actions);

    root.innerHTML = "";
    root.appendChild(screen);
  }

  function initSimulacion() {
    var container = document.getElementById("sim-root");
    if (!container) return;
    root = container;
    state = { level: 0, xp: 0 };
    renderIntro();
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(initSimulacion);
  } else {
    document.addEventListener("DOMContentLoaded", initSimulacion);
  }
})();
