// Language selection: English is the default; German lives under /de/.
// Loaded synchronously in <head> so a redirect happens before first paint.
//
// - A choice made with the language switch is remembered in localStorage
//   ("lang") and wins on every later visit.
// - Without a stored choice, the English pages send visitors whose browser
//   prefers German (navigator.languages) to the German counterpart. German
//   pages never redirect on detection alone, so a shared /de/ link stays German.
// Each page names its counterpart with <link rel="alternate" hreflang="…">.
(function () {
  "use strict";
  var KEY = "lang";
  var SUPPORTED = ["en", "de"];
  var current = (document.documentElement.lang || "en").slice(0, 2);

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      return SUPPORTED.indexOf(v) >= 0 ? v : null;
    } catch (e) {
      return null; // storage disabled: behave as if nothing was chosen
    }
  }

  function detected() {
    var langs = navigator.languages && navigator.languages.length
      ? navigator.languages : [navigator.language || "en"];
    for (var i = 0; i < langs.length; i++) {
      var primary = String(langs[i]).toLowerCase().split("-")[0];
      if (SUPPORTED.indexOf(primary) >= 0) return primary;
    }
    return "en";
  }

  function counterpart(lang) {
    var link = document.querySelector('link[rel="alternate"][hreflang="' + lang + '"]');
    return link ? new URL(link.href, location.href).pathname : null;
  }

  var choice = stored();
  var target = choice || (current === "en" ? detected() : current);
  if (target !== current) {
    var path = counterpart(target);
    if (path && path !== location.pathname) {
      location.replace(path + location.search + location.hash);
      return;
    }
  }

  // Remember a manual switch. Links carry data-set-lang="en|de".
  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("a[data-set-lang]");
    if (!link) return;
    try { localStorage.setItem(KEY, link.getAttribute("data-set-lang")); } catch (e) { /* not remembered */ }
    if (location.hash && link.hash === "") link.hash = location.hash;
  });
})();
