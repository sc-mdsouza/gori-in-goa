/* =========================================================================
   GORI IN GOA — shared shell
   Injects the nav, drawer, bottom tab bar and footer into every page so
   there's exactly one place to edit them.
   ========================================================================= */
(function () {
  "use strict";

  var D = window.GORI;

  /* ---------------------------------------------------------------- icons */
  var I = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V21h13V9.5"/><path d="M9.5 21v-6h5v6"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4 3 6.5v13L9 17l6 3 6-2.5v-13L15 7 9 4Z"/><path d="M9 4v13M15 7v13"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17Z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.4"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M17 5.2a3.4 3.4 0 0 1 0 6.6M18.5 14.4c2 .7 3.3 2.4 3.3 5.6"/></svg>',
    wave: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 15c3-3 5-3 8 0s5 3 8 0 4-3 4-3"/><path d="M2 9c3-3 5-3 8 0s5 3 8 0 4-3 4-3"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2.5 2.5 0 0 1-2.7 2.5A17 17 0 0 1 4 5.7 2.5 2.5 0 0 1 6.5 3Z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.6a8.9 8.9 0 0 1-13.2 7.8L3 21l1.7-4.6A8.9 8.9 0 1 1 21 11.6Z"/><path d="M8.8 8.2c-.4 1.6.9 4 2.9 5.4 1.3.9 2.6 1.2 3.4.9l.7-1.3-1.7-1-.9.7a5.4 5.4 0 0 1-2.4-2.4l.7-.9-1-1.7-1.7.3Z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6v.1"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v14M6 12l6 6 6-6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round"><path d="M5 5l14 14M19 5 5 19"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  };
  window.ICON = I;

  /* ---------------------------------------------------------------- util */
  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  function todayISO() {
    var d = new Date();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }

  function parseISO(s) {
    // "2026-12-10" -> local-midnight Date (no timezone surprises)
    var p = String(s).split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function fmtDate(s, opts) {
    var d = parseISO(s);
    opts = opts || {};
    var out = DAYS[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()];
    if (opts.year !== false) out += " " + d.getFullYear();
    return out;
  }

  function fmtTime(hhmm) {
    if (!hhmm) return "All day";
    var p = hhmm.split(":");
    var h = Number(p[0]), m = p[1];
    var ampm = h >= 12 ? "pm" : "am";
    h = h % 12; if (h === 0) h = 12;
    return h + ":" + m + " " + ampm;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function daysBetween(a, b) {
    return Math.round((parseISO(b) - parseISO(a)) / 86400000);
  }

  window.U = {
    todayISO: todayISO, parseISO: parseISO, fmtDate: fmtDate,
    fmtTime: fmtTime, esc: esc, daysBetween: daysBetween,
    MONTHS: MONTHS, DAYS: DAYS,
  };

  /* ---------------------------------------------------------------- nav */
  var PAGES = [
    { id: "home",     href: "index.html",    title: "Home",       nav: "Home",     tab: true,  icon: "home" },
    { id: "guide",    href: "guide.html",    title: "Guide",  nav: "Guide",    tab: false, icon: "book" },
    { id: "ourhome",  href: "home.html",     title: "Our Home",   nav: "Our Home", tab: false, icon: "grid" },
    { id: "calendar", href: "calendar.html", title: "Calendar",   nav: "Calendar", tab: true,  icon: "cal" },
    { id: "map",      href: "map.html",      title: "Map",        nav: "Map",      tab: true,  icon: "map" },
    { id: "places",   href: "places.html",   title: "Places",     nav: "Places",   tab: true,  icon: "pin" },
    { id: "beaches",  href: "beaches.html",  title: "Beaches",    nav: "Beaches",  tab: false, icon: "wave" },
    { id: "family",   href: "family.html",   title: "Family", nav: "Family",   tab: false, icon: "users" },
  ];
  window.PAGES = PAGES;

  function brand() {
    return '<a class="brand" href="index.html" aria-label="gori in goa, home">' +
      '<svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true">' +
        '<path d="M5 19a11 11 0 0 1 22 0Z" fill="#FFCB56"/>' +
        '<path d="M1 23.5c3-2.4 6-2.4 9 0s6 2.4 9 0 6-2.4 9 0 3 2.4 3 2.4" ' +
          'class="brand__wave" fill="none" stroke="#73A5CA" stroke-width="2.6" stroke-linecap="round"/>' +
      '</svg>' +
      '<span class="brand__a">gori</span>' +
      '<span class="brand__in">in</span>' +
      '<span class="brand__b">goa</span></a>';
  }

  function mount() {
    var page = document.body.getAttribute("data-page") || "home";

    /* top bar */
    var top = document.getElementById("shell-top");
    if (top) {
      top.className = "topbar";
      top.innerHTML =
        '<div class="wrap topbar__in">' + brand() +
          '<nav class="navlinks" aria-label="Main">' + PAGES.filter(function (p) { return p.id !== "home"; }).map(function (p) {
            return '<a href="' + p.href + '"' + (p.id === page ? ' aria-current="page"' : "") + '>' + p.nav + '</a>';
          }).join("") + '</nav>' +
          '<button class="menu-btn" id="menuOpen" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">' +
            I.menu + '</button>' +
        '</div>';
    }

    /* drawer */
    var dr = document.getElementById("shell-drawer");
    if (!dr) {
      dr = document.createElement("div");
      document.body.appendChild(dr);
    }
    dr.className = "drawer";
    dr.id = "drawer";
    dr.setAttribute("data-open", "false");
    dr.setAttribute("role", "dialog");
    dr.setAttribute("aria-modal", "true");
    dr.setAttribute("aria-label", "All pages");
    dr.innerHTML =
      '<div class="drawer__head">' + brand() +
        '<button class="drawer__close" id="menuClose" aria-label="Close menu">' + I.close + '</button>' +
      '</div>' +
      '<ul class="drawer__list">' + PAGES.map(function (p, i) {
        return '<li><a href="' + p.href + '"' + (p.id === page ? ' aria-current="page"' : "") + '>' +
          '<span class="drawer__num">' + String(i + 1).padStart(2, "0") + '</span>' +
          '<span class="drawer__title">' + p.title + '</span></a></li>';
      }).join("") + '</ul>' +
      '<p class="drawer__foot">Made for one person, in particular.<br>Goa, December.</p>';

    /* bottom tabs */
    var tb = document.getElementById("shell-tab");
    if (tb) {
      tb.className = "tabbar";
      tb.innerHTML = PAGES.filter(function (p) { return p.tab; }).map(function (p) {
        return '<a href="' + p.href + '"' + (p.id === page ? ' aria-current="page"' : "") + '>' +
          I[p.icon] + '<span>' + (p.id === "map" ? "Map" : p.nav) + '</span></a>';
      }).join("") +
        '<a href="#" id="tabMore"><span aria-hidden="true" style="display:flex;height:22px;align-items:center">···</span><span>More</span></a>';
    }

    /* footer */
    var ft = document.getElementById("shell-foot");
    if (ft) {
      ft.className = "footer";
      ft.innerHTML = '<div class="wrap">' +
        '<div class="footer__mark">gori in goa</div>' +
        '<p>An orientation for one very specific visitor.</p>' +
        '<p class="small">Made by ' + esc(D.meta.author) + ' · ' + new Date().getFullYear() +
        ' · <a href="guide.html">How to use this site</a>' +
        ' · <a href="credits.html">Photo credits</a></p>' +
        '</div>';
    }

    /* behaviour */
    var openBtn = document.getElementById("menuOpen");
    var closeBtn = document.getElementById("menuClose");
    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      dr.setAttribute("data-open", "true");
      document.body.style.overflow = "hidden";
      if (openBtn) openBtn.setAttribute("aria-expanded", "true");
      var first = dr.querySelector("a");
      if (first) first.focus();
    }
    function close() {
      dr.setAttribute("data-open", "false");
      document.body.style.overflow = "";
      if (openBtn) openBtn.setAttribute("aria-expanded", "false");
      if (lastFocus) lastFocus.focus();
    }

    if (openBtn) openBtn.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    var more = document.getElementById("tabMore");
    if (more) more.addEventListener("click", function (e) { e.preventDefault(); open(); });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && dr.getAttribute("data-open") === "true") close();
      if (e.key === "Tab" && dr.getAttribute("data-open") === "true") {
        var f = dr.querySelectorAll("a, button");
        if (!f.length) return;
        var firstEl = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
      }
    });

    dr.addEventListener("click", function (e) {
      if (e.target === dr) close();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
