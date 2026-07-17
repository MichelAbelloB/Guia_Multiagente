(function () {
  function loadVideo(el, id, title) {
    el.innerHTML = "";
    var iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
    iframe.title = title;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    el.appendChild(iframe);
  }

  function buildFacade(el) {
    var id = el.getAttribute("data-yt-id");
    var title = el.getAttribute("data-title") || "Video de YouTube";
    if (!id) return;

    el.innerHTML = "";
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.setAttribute("aria-label", "Reproducir: " + title);

    var thumb = document.createElement("img");
    thumb.className = "video-embed-thumb";
    thumb.loading = "lazy";
    thumb.alt = title;
    thumb.src = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";

    var play = document.createElement("div");
    play.className = "video-embed-play";

    var caption = document.createElement("div");
    caption.className = "video-embed-caption";
    caption.textContent = title;

    el.appendChild(thumb);
    el.appendChild(play);
    el.appendChild(caption);

    el.addEventListener("click", function () {
      loadVideo(el, id, title);
    });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        loadVideo(el, id, title);
      }
    });
  }

  function init() {
    var nodes = document.querySelectorAll(".video-embed[data-yt-id]");
    for (var i = 0; i < nodes.length; i++) {
      buildFacade(nodes[i]);
    }
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(init);
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
