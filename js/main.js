/* ===================================================================
   Language toggle (EN / PT)
   Every translatable element carries data-en and data-pt attributes.
   We swap its content and remember the choice in localStorage.
   =================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "dk-lang";
  var SUPPORTED = ["en", "pt"];

  function applyLanguage(lang) {
    if (SUPPORTED.indexOf(lang) === -1) { lang = "en"; }

    document.documentElement.setAttribute("lang", lang);

    // Swap text for every tagged element. The HTML parser already decodes
    // entities (·, —, &) in the attributes, so getAttribute returns plain
    // text — textContent is both correct and free of any XSS surface.
    var nodes = document.querySelectorAll("[data-" + lang + "]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = nodes[i].getAttribute("data-" + lang);
    }

    // Update the toggle buttons' active/pressed state.
    var buttons = document.querySelectorAll(".lang__btn");
    for (var j = 0; j < buttons.length; j++) {
      var active = buttons[j].getAttribute("data-lang") === lang;
      buttons[j].classList.toggle("is-active", active);
      buttons[j].setAttribute("aria-pressed", active ? "true" : "false");
    }

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
  }

  function init() {
    var saved = "en";
    try { saved = localStorage.getItem(STORAGE_KEY) || "en"; } catch (e) { /* ignore */ }
    applyLanguage(saved);

    var buttons = document.querySelectorAll(".lang__btn");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        applyLanguage(this.getAttribute("data-lang"));
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
