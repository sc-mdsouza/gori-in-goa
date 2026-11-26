/* =========================================================================
   GORI IN GOA — beaches
   ========================================================================= */
(function () {
  "use strict";
  var D = window.GORI, U = window.U;

  var grid = document.getElementById("beach-grid");
  var filterEl = document.getElementById("beach-filters");
  var countEl = document.getElementById("beach-count");
  var active = "all";

  var SKY = {
    calm:    { top: "#E9F4FB", bottom: "#FFF6E2", sun: "#FFCB56", glow: "#FFE9A9", sea: "#73A5CA" },
    care:    { top: "#FFF2D6", bottom: "#FFE3B4", sun: "#FF933E", glow: "#FFCB56", sea: "#6C9EBE" },
    caution: { top: "#FFEDD3", bottom: "#F6D3B8", sun: "#FF933E", glow: "#FFCB56", sea: "#5E93B2" },
  };

  var SWIM = {
    calm:    { label: "Good for swimming", hint: "Calm, sandy, plenty of people in the water." },
    care:    { label: "Swim with care",    hint: "Fine in the middle, watch the ends and the current." },
    caution: { label: "Look, don't swim",  hint: "Strong water or no one around. Feet only." },
  };

  function art(b, i) {
    var c = SKY[b.swim] || SKY.care;
    var id = "bsky" + i;
    var shift = (i % 3) * 26;
    var x = 300 - shift;
    return '<svg viewBox="0 0 400 90" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="' + c.top + '"/><stop offset="100%" stop-color="' + c.bottom + '"/></linearGradient></defs>' +
      '<rect width="400" height="90" fill="url(#' + id + ')"/>' +
      '<circle cx="' + x + '" cy="36" r="30" fill="' + c.glow + '" opacity=".45"/>' +
      '<circle cx="' + x + '" cy="36" r="16" fill="' + c.sun + '"/>' +
      '<path d="M0 60 Q 40 50 80 60 T 160 60 T 240 60 T 320 60 T 400 60 V90 H0 Z" fill="' + c.sea + '"/>' +
      '<path d="M0 70 Q 40 62 80 70 T 160 70 T 240 70 T 320 70 T 400 70" fill="none" stroke="#FFFFFF" stroke-opacity=".4" stroke-width="2"/>' +
      '<path d="M0 79 Q 40 72 80 79 T 160 79 T 240 79 T 320 79 T 400 79" fill="none" stroke="#FFFFFF" stroke-opacity=".25" stroke-width="2"/>' +
      "</svg>";
  }

  function card(b, i) {
    var s = SWIM[b.swim] || SWIM.care;
    return '<article class="beach">' +
      '<div class="beach__art">' + art(b, i) + "</div>" +
      '<div class="beach__in">' +
        '<div style="display:flex;align-items:center;gap:.5rem;flex-wrap:wrap">' +
          '<h3 class="beach__name">' + U.esc(b.name) + "</h3>" +
          '<span class="swim swim--' + b.swim + '">' + U.esc(s.label) + "</span>" +
        "</div>" +
        '<p class="beach__vibe">' + U.esc(b.vibe) + "</p>" +
        '<dl class="beach__rows">' +
          '<div class="beach__row"><dt>Best</dt><dd>' + U.esc(b.best) + "</dd></div>" +
          '<div class="beach__row"><dt>Eat</dt><dd>' + U.esc(b.eat) + "</dd></div>" +
        "</dl>" +
        '<p class="beach__note">' + U.esc(b.note) + "</p>" +
      "</div></article>";
  }

  function render() {
    var list = D.beaches.filter(function (b) { return active === "all" || b.swim === active; });
    grid.innerHTML = list.map(card).join("");
    countEl.textContent = list.length + " beaches" +
      (active === "all" ? "" : " · " + SWIM[active].label.toLowerCase());
  }

  if (filterEl) {
    var cats = [
      { id: "all", label: "All beaches" },
      { id: "calm", label: "Good for swimming" },
      { id: "care", label: "Swim with care" },
      { id: "caution", label: "Look, don't swim" },
    ];
    filterEl.innerHTML = cats.map(function (c) {
      return '<button class="chip" data-cat="' + c.id + '" aria-pressed="' + (c.id === "all") + '">' + c.label + "</button>";
    }).join("");

    filterEl.addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      active = b.getAttribute("data-cat");
      filterEl.querySelectorAll(".chip").forEach(function (c) {
        c.setAttribute("aria-pressed", String(c.getAttribute("data-cat") === active));
      });
      render();
    });
  }

  render();
})();
