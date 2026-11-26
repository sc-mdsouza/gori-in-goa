/* =========================================================================
   GORI IN GOA — small shared renderers
   ========================================================================= */
(function () {
  "use strict";
  function U() { return window.U; }

  var CAT_LABEL = {
    travel: "Travel", family: "Family", wedding: "Wedding",
    beach: "Beach", sunset: "Sunset", trip: "Day trip",
    celebration: "Celebration", free: "Nothing planned",
  };

  window.CAT_LABEL = CAT_LABEL;

  window.eventCard = function (evt, opts) {
    opts = opts || {};
    var dateLine = opts.showDate === false ? "" :
      '<span class="evt__date">' + U().fmtDate(evt.date) + "</span>";

    return '<li><article class="evt evt--' + evt.cat + '">' +
      '<div class="evt__time">' + (evt.time ? U().esc(U().fmtTime(evt.time)) : "All day") + "</div>" +
      "<div>" + dateLine +
        '<h3 class="evt__title">' + U().esc(evt.title) + "</h3>" +
        (evt.place ? '<p class="evt__meta">📍 ' + U().esc(evt.place) +
          " · " + (CAT_LABEL[evt.cat] || evt.cat) + "</p>" : "") +
        (evt.note ? '<p class="evt__note">' + U().esc(evt.note) + "</p>" : "") +
        (evt.draft ? '<p style="margin:.4rem 0 0"><span class="pill pill--draft">details to confirm</span></p>' : "") +
      "</div></article></li>";
  };

  window.sortEvents = function (list) {
    return list.slice().sort(function (a, b) {
      return (a.date + (a.time || "00:00")).localeCompare(b.date + (b.time || "00:00"));
    });
  };
})();
