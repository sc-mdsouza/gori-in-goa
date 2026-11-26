/* =========================================================================
   GORI IN GOA — guide page
   Renders: the site map, the before-you-fly checklist, the how-tos, phrases.
   ========================================================================= */
(function () {
  "use strict";
  var D = window.GORI, U = window.U, I = window.ICON;

  /* ------------------------------------------------------------ site map */
  var map = document.getElementById("site-map");
  if (map) {
    map.className = "card";
    map.style.padding = ".25rem .9rem";
    map.innerHTML = D.sections.map(function (s) {
      return '<a class="rowlink" href="' + s.href + '">' +
        '<span class="rowlink__num">' + s.num + "</span>" +
        '<span class="rowlink__title">' + U.esc(s.title) + "</span>" +
        '<span class="rowlink__arrow" aria-hidden="true">→</span></a>';
    }).join("");
  }

  /* ------------------------------------------------------------ checklist */
  var KEY = "gori-checklist-v1";
  var host = document.getElementById("checklist");
  var fill = document.getElementById("check-fill");
  var count = document.getElementById("check-count");
  var reset = document.getElementById("check-reset");

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  if (host) {
    var state = load();
    var groups = {};
    var order = [];
    D.checklist.forEach(function (item) {
      if (!groups[item.cat]) { groups[item.cat] = []; order.push(item.cat); }
      groups[item.cat].push(item);
    });

    var html = "";
    order.forEach(function (cat) {
      var items = groups[cat];
      var done = items.filter(function (it) { return state[it.text]; }).length;
      html += '<div class="check__group"><h3>' + U.esc(cat) +
        '<span class="check__count" data-cat="' + U.esc(cat) + '">' + done + "/" + items.length + "</span></h3><div class=\"check\">";
      items.forEach(function (it) {
        var id = "c" + Math.random().toString(36).slice(2, 9);
        html += '<label for="' + id + '">' +
          '<input type="checkbox" id="' + id + '" data-text="' + U.esc(it.text) + '"' +
            (state[it.text] ? " checked" : "") + ">" +
          '<span class="box" aria-hidden="true"></span>' +
          '<span class="txt">' + U.esc(it.text) + "</span></label>";
      });
      html += "</div></div>";
    });
    host.innerHTML = html;

    function refresh() {
      var total = D.checklist.length;
      var done = 0;
      host.querySelectorAll("input[type=checkbox]").forEach(function (cb) {
        if (cb.checked) done++;
      });
      if (count) count.textContent = done + " of " + total + " done";
      if (fill) fill.style.width = total ? (done / total * 100) + "%" : "0%";

      host.querySelectorAll(".check__count").forEach(function (badge) {
        var cat = badge.getAttribute("data-cat");
        var boxes = [];
        host.querySelectorAll("input[data-text]").forEach(function (cb) {
          if ((groups[cat] || []).some(function (g) { return g.text === cb.getAttribute("data-text"); })) boxes.push(cb);
        });
        var d = boxes.filter(function (b) { return b.checked; }).length;
        badge.textContent = d + "/" + boxes.length;
      });
    }

    host.addEventListener("change", function (e) {
      var cb = e.target;
      if (cb.type !== "checkbox") return;
      var t = cb.getAttribute("data-text");
      var s = load();
      if (cb.checked) s[t] = 1; else delete s[t];
      save(s);
      refresh();
    });

    if (reset) reset.addEventListener("click", function () {
      save({});
      host.querySelectorAll("input[type=checkbox]").forEach(function (cb) { cb.checked = false; });
      refresh();
    });

    refresh();
  }

  /* ------------------------------------------------------------ how-tos */
  var how = document.getElementById("howtos");
  if (how) {
    var g = {}, gor = [];
    D.howtos.forEach(function (h) {
      if (!g[h.group]) { g[h.group] = []; gor.push(h.group); }
      g[h.group].push(h);
    });
    var out = "";
    gor.forEach(function (group) {
      out += '<div style="margin-bottom:1.6rem">' +
        '<h3 class="h3" style="margin-bottom:.7rem">' + U.esc(group) + "</h3><div class=\"stack-sm\">";
      g[group].forEach(function (h, i) {
        out += '<details class="howto"' + (i === 0 && gor[0] === group ? "" : "") + ">" +
          "<summary><span>" + U.esc(h.title) + "</span></summary>" +
          '<div class="howto__body"><p>' + U.esc(h.body) + "</p></div></details>";
      });
      out += "</div></div>";
    });
    how.innerHTML = out;

    // one open per page keeps it from being a wall
    var first = how.querySelector("details");
    if (first) first.open = true;
  }

  /* ------------------------------------------------------------ phrases */
  var ph = document.getElementById("phrases");
  if (ph) {
    ph.innerHTML = D.phrases.map(function (p) {
      return '<div class="phrase">' +
        "<div><div class=\"phrase__kn\">" + U.esc(p.kn) + "</div>" +
        '<div class="phrase__say">' + U.esc(p.say) + "</div></div>" +
        '<div class="phrase__en">' + U.esc(p.en) + "</div></div>";
    }).join("");
  }
})();
