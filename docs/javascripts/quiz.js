(function () {
  function enhanceQuiz(quiz) {
    if (quiz.dataset.enhanced === "1") return;
    quiz.dataset.enhanced = "1";

    var rawItems = Array.prototype.slice.call(quiz.querySelectorAll("li"));
    var feedback = document.createElement("p");
    feedback.className = "mc-quiz-feedback";
    feedback.style.display = "none";

    // Se lee isCorrect y se borra el checkbox+indicador ANTES de tocar nada más,
    // para que ninguna regla CSS de Material (input:checked + .task-list-indicator)
    // pueda revelar visualmente cuál es la opción correcta antes de responder.
    var entries = rawItems.map(function (li) {
      var checkbox = li.querySelector('input[type="checkbox"]');
      if (!checkbox) return null;
      var isCorrect = checkbox.checked;
      var control = li.querySelector(".task-list-control");
      if (control) control.remove();
      else checkbox.remove();
      return { li: li, isCorrect: isCorrect };
    }).filter(Boolean);

    entries.forEach(function (entry) {
      var li = entry.li;
      var icon = document.createElement("span");
      icon.className = "mc-quiz-icon";
      icon.textContent = "○";
      li.insertBefore(icon, li.firstChild);
      entry.icon = icon;

      li.classList.add("mc-quiz-option");
      li.setAttribute("role", "button");
      li.setAttribute("tabindex", "0");

      function choose() {
        if (quiz.classList.contains("answered")) return;
        quiz.classList.add("answered");
        entries.forEach(function (other) {
          if (other.isCorrect) {
            other.li.classList.add("mc-quiz-correct");
            other.icon.textContent = "✔";
          }
        });
        if (!entry.isCorrect) {
          li.classList.add("mc-quiz-incorrect");
          icon.textContent = "✘";
        }
        feedback.textContent = entry.isCorrect
          ? "¡Correcto!"
          : "No es esa — fijate cuál se marcó en verde.";
        feedback.style.display = "block";
      }

      li.addEventListener("click", choose);
      li.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          choose();
        }
      });
    });

    var list = quiz.querySelector("ul");
    if (list) list.parentNode.insertBefore(feedback, list.nextSibling);
  }

  function initQuizzes() {
    var quizzes = document.querySelectorAll(".mc-quiz");
    for (var i = 0; i < quizzes.length; i++) {
      enhanceQuiz(quizzes[i]);
    }
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(initQuizzes);
  } else {
    document.addEventListener("DOMContentLoaded", initQuizzes);
  }
})();
