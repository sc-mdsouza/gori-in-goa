/* =========================================================================
   GORI IN GOA — family tree
   Renders the households and everyone in them from js/data.js.
   ========================================================================= */
(function () {
  "use strict";
  var D = window.GORI, U = window.U;

  var host = document.getElementById("family-list");
  if (!host) return;

  function initial(name) {
    return String(name || "?").trim().charAt(0).toUpperCase();
  }

  function contact(p) {
    var digits = String(p.phone || "").replace(/[^\d+]/g, "");
    if (!digits) return "";
    var wa = digits.replace(/^\+/, "");
    return '<span class="mem__act">' +
      '<a class="iconbtn" href="tel:' + digits + '">' + window.ICON.phone + "Call</a>" +
      '<a class="iconbtn" href="https://wa.me/' + wa + '" target="_blank" rel="noopener">' + window.ICON.wa + "WhatsApp</a>" +
      "</span>";
  }

  host.innerHTML = D.familyGroups.map(function (g) {
    return '<section class="fam">' +
      '<div class="fam__head">' +
        '<h2 class="h3">' + U.esc(g.name) + "</h2>" +
        (g.note ? '<p class="fam__note">' + U.esc(g.note) + "</p>" : "") +
      "</div>" +
      '<ul class="fam__list">' +
        g.members.map(function (p) {
          return '<li class="mem">' +
            '<span class="mem__av" aria-hidden="true">' + U.esc(initial(p.name)) + "</span>" +
            '<span class="mem__body">' +
              '<span class="mem__name">' + U.esc(p.name) + "</span>" +
              '<span class="mem__role">' + U.esc(p.role) + "</span>" +
              (p.note ? '<span class="mem__note">' + U.esc(p.note) + "</span>" : "") +
            "</span>" +
            contact(p) +
          "</li>";
        }).join("") +
      "</ul></section>";
  }).join("");
})();
