/* =========================================================================
   GORI IN GOA — places list (filters + search + deep links)
   ========================================================================= */
(function () {
  "use strict";
  var D = window.GORI, U = window.U;

  var LABELS = {
    restaurant: "Restaurant", cafe: "Café", dessert: "Dessert",
    cocktail: "Cocktail", sunset: "Sunset", drive: "Drive", gaddo: "Gaddo",
  };

  var grid = document.getElementById("place-grid");
  var filterEl = document.getElementById("place-filters");
  var searchEl = document.getElementById("place-search");
  var countEl = document.getElementById("place-count");

  var active = "all";
  var q = "";

  var CATS = [
    { id: "all", label: "Everything" },
    { id: "picks", label: "Mitchelle's top Picks" },
    { id: "restaurant", label: "Restaurants" },
    { id: "cafe", label: "Cafés" },
    { id: "dessert", label: "Desserts" },
    { id: "cocktail", label: "Cocktails" },
    { id: "sunset", label: "Sunsets" },
    { id: "drive", label: "Drives" },
    { id: "gaddo", label: "Gaddo" },
  ];

  function mapsUrl(p) {
    return "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(p.name + " " + (p.area || "") + " Goa");
  }

  function card(p) {
    return '<article class="place' + (p.draft ? " place--draft" : "") + '" id="' + p.id + '">' +
      '<div class="place__top">' +
        '<span class="place__cat cat-' + p.cat + '">' + U.esc(LABELS[p.cat] || p.cat) + "</span>" +
        (p.topPick ? '<span class="pick">★ Mitchelle\'s top Picks</span>' : "") +
        (p.draft ? '<span class="pill pill--draft">to confirm</span>' : "") +
      "</div>" +
      '<h3 class="place__name">' + U.esc(p.name) + "</h3>" +
      (p.area ? '<p class="place__area">' + U.esc(p.area) + "</p>" : "") +
      (p.blurb ? '<p class="place__blurb">' + U.esc(p.blurb) + "</p>" : "") +
      (p.tags ? '<div class="tags">' + p.tags.map(function (t) { return '<span class="tag">' + U.esc(t) + "</span>"; }).join("") + "</div>" : "") +
      '<div class="place__foot">' +
        '<a class="place__map" href="' + mapsUrl(p) + '" target="_blank" rel="noopener">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>Maps</a>' +
      "</div></article>";
  }

  function matches(p) {
    if (active === "picks" && !p.topPick) return false;
    if (active !== "all" && active !== "picks" && p.cat !== active) return false;
    if (!q) return true;
    var hay = [p.name, p.area, p.blurb, (p.tags || []).join(" "), LABELS[p.cat]].join(" ").toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function render() {
    var list = D.places.filter(matches);
    grid.innerHTML = list.length ? list.map(card).join("") :
      '<div class="empty" style="grid-column:1/-1">Nothing matches that. Try “sunset”, “fish” or “Palolem”.</div>';
    countEl.textContent = list.length + " of " + D.places.length + " places";
  }

  if (filterEl) {
    filterEl.innerHTML = CATS.map(function (c) {
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

  if (searchEl) {
    searchEl.addEventListener("input", function () {
      q = searchEl.value.trim().toLowerCase();
      render();
    });
  }

  // deep link: places.html#martins
  var hash = (location.hash || "").replace("#", "");
  if (hash) {
    var p = D.places.filter(function (x) { return x.id === hash; })[0];
    if (p) {
      active = "all"; q = "";
      render();
      var node = document.getElementById(hash);
      if (node) {
        node.scrollIntoView({ block: "center" });
        node.style.outline = "3px solid var(--orange)";
        node.style.outlineOffset = "4px";
      }
      return;
    }
  }

  render();
})();
