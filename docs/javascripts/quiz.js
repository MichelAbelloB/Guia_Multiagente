(function () {
  function enhanceQuiz(quiz) {
    if (quiz.dataset.enhanced === "1") return;
    quiz.dataset.enhanced = "1";

    var items = Array.prototype.slice.call(quiz.querySelectorAll("li"));
    var feedback = document.createElement("p");
    feedback.className = "mc-quiz-feedback";
    feedback.style.display = "none";

    items.forEach(function (li) {
      var checkbox = li.querySelector('input[type="checkbox"]');
      if (!checkbox) return;
      var isCorrect = checkbox.checked;
      checkbox.style.display = "none";

      var icon = document.createElement("span");
      icon.className = "mc-quiz-icon";
      icon.textContent = "○";
      li.insertBefore(icon, li.firstChild);

      li.classList.add("mc-quiz-option");
      li.setAttribute("role", "button");
      li.setAttribute("tabindex", "0");

      function choose() {
        if (quiz.classList.contains("answered")) return;
        quiz.classList.add("answered");
        items.forEach(function (other) {
          var otherCb = other.querySelector('input[type="checkbox"]');
          var otherIcon = other.querySelector(".mc-quiz-icon");
          if (otherCb && otherCb.checked) {
            other.classList.add("mc-quiz-correct");
            if (otherIcon) otherIcon.textContent = "✔";
          }
        });
        if (!isCorrect) {
          li.classList.add("mc-quiz-incorrect");
          icon.textContent = "✘";
        }
        feedback.textContent = isCorrect
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
