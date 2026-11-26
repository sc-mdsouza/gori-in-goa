/* =========================================================================
   GORI IN GOA — map page
   Pins are generated from js/data.js `map: {x, y}` coordinates.
   ========================================================================= */
(function () {
  "use strict";
  var D = window.GORI, U = window.U;

  var COLORS = {
    restaurant: "#73A5CA",
    cafe: "#FFCB56",
    dessert: "#D9916B",
    cocktail: "#4C86A9",
    sunset: "#FF933E",
    drive: "#9CC0D8",
    gaddo: "#F2D489",
  };
  var LABELS = {
    restaurant: "Restaurant", cafe: "Café", dessert: "Dessert",
    cocktail: "Cocktail", sunset: "Sunset spot", drive: "Drive",
    gaddo: "Gaddo / street food",
  };

  var pinsG = document.getElementById("pins");
  var filtersEl = document.getElementById("map-filters");
  var sheet = document.getElementById("sheet");
  var sheetBody = document.getElementById("sheet-body");
  var sheetClose = document.getElementById("sheet-close");
  var activeCat = "all";

  function mapsUrl(p) {
    return "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(p.name + " " + (p.area || "") + " Goa");
  }

  /* ------------------------------------------------------------ pin drawing */
  function pinMarkup(p) {
    var c = COLORS[p.cat] || "#FFCB56";
    return '<g class="pin" data-id="' + p.id + '" data-cat="' + p.cat + '" tabindex="0" role="button" ' +
      'aria-label="' + U.esc(p.name) + ', ' + U.esc(LABELS[p.cat] || "") + '">' +
      "<title>" + U.esc(p.name) + "</title>" +
      '<circle class="hit" cx="' + p.map.x + '" cy="' + (p.map.y - 36) + '" r="56"></circle>' +
      '<g class="body" transform="translate(' + p.map.x + " " + p.map.y + ') scale(1.28)">' +
        '<path d="M0 0C-7-11-13-18-13-25a13 13 0 1 1 26 0C13-18 7-11 0 0Z" fill="' + c + '" stroke="#2C2318" stroke-opacity=".55" stroke-width="1.4" stroke-linejoin="round"/>' +
        '<circle cx="0" cy="-25" r="4.6" fill="#FFFCF4" stroke="#2C2318" stroke-opacity=".4" stroke-width="1.2"/>' +
      "</g></g>";
  }

  function homeMarkup() {
    var x = D.homePin.x, y = D.homePin.y;
    var star = "M0 -16 4.7 -5.1 16.5 -4.4 7.4 3.2 10.3 14.6 0 8.4 -10.3 14.6 -7.4 3.2 -16.5 -4.4 -4.7 -5.1 Z";
    return '<g class="pin pin--home" data-id="home" data-cat="home" tabindex="0" role="button" aria-label="Home">' +
      "<title>Home</title>" +
      '<circle class="hit" cx="' + x + '" cy="' + (y - 20) + '" r="48"></circle>' +
      '<g class="body" transform="translate(' + x + " " + y + ') scale(1.7)">' +
        '<circle cx="0" cy="-10" r="18" fill="#FFFFFF" opacity=".95"/>' +
        '<path d="' + star + '" fill="#2C2318" stroke="#2C2318" stroke-width="1.5" stroke-linejoin="round"/>' +
      "</g>" +
      '<text x="' + (x + 34) + '" y="' + (y - 30) + '">home</text>' +
      "</g>";
  }

  /* SVG elements don't reliably support innerHTML everywhere, so we parse
     the markup properly and import the nodes. */
  function setSVG(el, markup) {
    var doc = new DOMParser().parseFromString(
      '<svg xmlns="http://www.w3.org/2000/svg">' + markup + "</svg>", "image/svg+xml");
    while (el.firstChild) el.removeChild(el.firstChild);
    var kids = doc.documentElement.childNodes;
    for (var i = 0; i < kids.length; i++) {
      el.appendChild(document.importNode(kids[i], true));
    }
  }

  if (pinsG) {
    setSVG(pinsG, D.places.filter(function (p) { return p.map; }).map(pinMarkup).join("") + homeMarkup());
  }

  /* ------------------------------------------------------------ filters */
  var CATS = [
    { id: "all", label: "Everything" },
    { id: "restaurant", label: "Food" },
    { id: "cafe", label: "Cafés" },
    { id: "dessert", label: "Dessert" },
    { id: "cocktail", label: "Cocktails" },
    { id: "sunset", label: "Sunsets" },
    { id: "drive", label: "Drives" },
    { id: "gaddo", label: "Gaddo" },
  ];

  if (filtersEl) {
    filtersEl.innerHTML = CATS.map(function (c) {
      return '<button class="chip" data-cat="' + c.id + '" aria-pressed="' + (c.id === "all") + '">' + c.label + "</button>";
    }).join("");

    filtersEl.addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      activeCat = b.getAttribute("data-cat");
      filtersEl.querySelectorAll(".chip").forEach(function (c) {
        c.setAttribute("aria-pressed", String(c.getAttribute("data-cat") === activeCat));
      });
      applyFilter();
    });
  }

  function applyFilter() {
    pinsG.querySelectorAll(".pin").forEach(function (g) {
      var cat = g.getAttribute("data-cat");
      var show = activeCat === "all" || cat === activeCat || cat === "home";
      g.style.display = show ? "" : "none";
      g.style.opacity = (activeCat !== "all" && cat === "home") ? ".45" : "1";
    });
  }

  /* ------------------------------------------------------------ sheet */
  function openSheet(place) {
    if (!place) return;
    sheetBody.innerHTML =
      '<span class="pill">' + U.esc(LABELS[place.cat] || place.cat) + "</span>" +
      '<h2 class="h3" id="sheet-title" style="margin:.5rem 0 .15rem">' + U.esc(place.name) + "</h2>" +
      '<p class="small" style="margin:0;font-weight:600">' + U.esc(place.area || "") + "</p>" +
      '<p style="margin:.6rem 0 0;font-size:.94rem;color:var(--ink-soft)">' + U.esc(place.blurb || "") + "</p>" +
      (place.tags ? '<div class="tags">' + place.tags.map(function (t) { return '<span class="tag">' + U.esc(t) + "</span>"; }).join("") + "</div>" : "") +
      '<div class="btnrow" style="margin-top:.9rem">' +
        '<a class="btn btn--sm" href="' + mapsUrl(place) + '" target="_blank" rel="noopener">Open in Maps</a>' +
        '<button class="btn btn--ghost btn--sm" type="button" id="sheet-dismiss">Close</button>' +
      "</div>" +
      (place.draft ? '<p class="small" style="margin:.7rem 0 0"><span class="pill pill--draft">to confirm</span> this one still needs a real address.</p>' : "");

    sheet.setAttribute("data-open", "true");
    document.getElementById("sheet-dismiss").addEventListener("click", closeSheet);
  }

  function closeSheet() { sheet.setAttribute("data-open", "false"); }
  if (sheetClose) sheetClose.addEventListener("click", closeSheet);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSheet();
  });
  document.addEventListener("click", function (e) {
    if (sheet.getAttribute("data-open") === "true" &&
        !sheet.contains(e.target) && !e.target.closest(".pin")) closeSheet();
  });

  function onPin(e) {
    var g = e.target.closest(".pin");
    if (!g) return;
    var id = g.getAttribute("data-id");
    if (id === "home") {
      openSheet({
        name: "Home", area: D.trip.homeVillage, cat: "home",
        blurb: "Our house. The verandah, the fan, the dog that isn't ours but lives here now.",
        tags: ["Your base", "Always tea"], draft: false,
      });
      return;
    }
    var place = D.places.filter(function (p) { return p.id === id; })[0];
    if (place) openSheet(place);
  }

  if (pinsG) {
    pinsG.addEventListener("click", onPin);
    pinsG.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPin(e); }
    });
  }

  /* ------------------------------------------------------------ list */
  var list = document.getElementById("map-list");
  if (list) {
    list.innerHTML = D.places.filter(function (p) { return p.map; }).map(function (p) {
      return '<a class="tile" href="places.html#' + p.id + '">' +
        '<span class="place__cat cat-' + p.cat + '" style="font-size:.6rem">' + U.esc(LABELS[p.cat]) + "</span>" +
        '<div class="tile__title" style="font-size:1.12rem;margin-top:.3rem">' + U.esc(p.name) + "</div>" +
        '<p class="tile__desc">' + U.esc(p.area) + "</p>" +
        "</a>";
    }).join("");
  }

  function mapsUrlOf(name, area) {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(name + " " + (area || "") + " Goa");
  }
})();
