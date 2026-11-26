/* =========================================================================
   GORI IN GOA — calendar page
   Month grid + agenda + .ics export. All events come from js/data.js.
   ========================================================================= */
(function () {
  "use strict";
  var D = window.GORI, U = window.U;

  var events = window.sortEvents(D.events);
  var byDate = {};
  events.forEach(function (e) {
    (byDate[e.date] = byDate[e.date] || []).push(e);
  });

  var arrival = U.parseISO(D.trip.arrivalISO.slice(0, 10));
  var departure = U.parseISO(D.trip.departureISO.slice(0, 10));
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var view = new Date(arrival.getFullYear(), arrival.getMonth(), 1);
  var selected = null;

  var grid = document.getElementById("cal-grid");
  var monthEl = document.getElementById("cal-month");
  var agendaEl = document.getElementById("agenda");
  var agendaTitle = document.getElementById("agenda-title");

  function iso(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") +
      "-" + String(d.getDate()).padStart(2, "0");
  }

  /* ------------------------------------------------------------ render grid */
  function renderGrid() {
    monthEl.textContent = U.MONTHS[view.getMonth()] + " " + view.getFullYear();

    var first = new Date(view.getFullYear(), view.getMonth(), 1);
    var startPad = first.getDay();
    var daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    var prevDays = new Date(view.getFullYear(), view.getMonth(), 0).getDate();

    var cells = [];

    for (var p = startPad - 1; p >= 0; p--) {
      cells.push({ d: new Date(view.getFullYear(), view.getMonth() - 1, prevDays - p), pad: true });
    }
    for (var i = 1; i <= daysInMonth; i++) {
      cells.push({ d: new Date(view.getFullYear(), view.getMonth(), i), pad: false });
    }
    while (cells.length % 7 !== 0) {
      var last = cells[cells.length - 1].d;
      cells.push({ d: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), pad: true });
    }

    grid.innerHTML = cells.map(function (c) {
      var key = iso(c.d);
      var evs = byDate[key] || [];
      var inTrip = c.d >= arrival && c.d <= departure;
      var isToday = c.d.getTime() === today.getTime();
      var isSel = selected === key;

      var dots = evs.slice(0, 4).map(function (e) {
        return '<span class="dot dot--' + e.cat + '"></span>';
      }).join("");

      return '<button class="cal__day' + (c.pad ? " cal__day--pad" : "") +
        (inTrip ? " cal__day--intrip" : "") +
        (isToday ? " cal__day--today" : "") + '"' +
        ' data-date="' + key + '" aria-pressed="' + (isSel ? "true" : "false") + '"' +
        ' aria-label="' + U.fmtDate(key) + (evs.length ? ", " + evs.length + " event" + (evs.length > 1 ? "s" : "") : "") + '">' +
        '<span>' + c.d.getDate() + "</span>" +
        '<span class="cal__dots">' + dots + "</span>" +
        "</button>";
    }).join("");
  }

  /* ------------------------------------------------------------ agenda */
  function renderAgenda(dateKey) {
    var list = dateKey ? (byDate[dateKey] || []) : null;

    if (dateKey) {
      agendaTitle.textContent = U.fmtDate(dateKey);
      if (!list.length) {
        agendaEl.innerHTML = '<li class="empty">Nothing planned. Keep it that way.</li>';
        return;
      }
      agendaEl.innerHTML = list.map(function (e) {
        return window.eventCard(e, { showDate: false });
      }).join("");
      return;
    }

    var from = iso(today);
    var upcoming = events.filter(function (e) { return e.date >= from; });
    if (!upcoming.length) upcoming = events;

    agendaTitle.textContent = "Up next";
    agendaEl.innerHTML = upcoming.length
      ? upcoming.slice(0, 5).map(function (e) { return window.eventCard(e, { showDate: true }); }).join("")
      : '<li class="empty">The calendar is empty. Add an event in js/data.js.</li>';
  }

  /* ------------------------------------------------------------ all events */
  var allEl = document.getElementById("all-events");
  if (allEl) {
    allEl.innerHTML = events.map(function (e) {
      return window.eventCard(e, { showDate: true });
    }).join("");
  }

  /* ------------------------------------------------------------ legend */
  var legendEl = document.getElementById("cal-legend");
  if (legendEl) {
    var cats = [];
    events.forEach(function (e) { if (cats.indexOf(e.cat) === -1) cats.push(e.cat); });
    legendEl.innerHTML = cats.map(function (c) {
      return '<span><span class="dot dot--' + c + '"></span>' + (window.CAT_LABEL[c] || c) + "</span>";
    }).join("") + '<span><span class="dot" style="background:rgba(255,233,169,1);border:1px solid #2B2118"></span>trip dates</span>';
  }

  /* ------------------------------------------------------------ interactions */
  grid.addEventListener("click", function (e) {
    var btn = e.target.closest(".cal__day");
    if (!btn) return;
    var key = btn.getAttribute("data-date");
    selected = selected === key ? null : key;
    renderGrid();
    renderAgenda(selected);

    var pad = btn.classList.contains("cal__day--pad");
    if (pad) {
      var d = U.parseISO(key);
      view = new Date(d.getFullYear(), d.getMonth(), 1);
      renderGrid();
    }
    if (agendaEl) {
      var top = agendaEl.getBoundingClientRect().top + window.scrollY - 90;
      if (window.innerWidth < 860) window.scrollTo({ top: top, behavior: "smooth" });
    }
  });

  document.getElementById("cal-prev").addEventListener("click", function () {
    view = new Date(view.getFullYear(), view.getMonth() - 1, 1);
    renderGrid();
  });
  document.getElementById("cal-next").addEventListener("click", function () {
    view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
    renderGrid();
  });
  document.getElementById("cal-trip").addEventListener("click", function () {
    view = new Date(arrival.getFullYear(), arrival.getMonth(), 1);
    selected = iso(arrival);
    renderGrid();
    renderAgenda(selected);
  });

  /* ------------------------------------------------------------ .ics */
  function pad2(n) { return String(n).padStart(2, "0"); }

  function toUTCStamp(dateStr, timeStr) {
    var p = dateStr.split("-").map(Number);
    var t = (timeStr || "09:00").split(":").map(Number);
    // treat the trip's times as Asia/Kolkata (+05:30)
    var ms = Date.UTC(p[0], p[1] - 1, p[2], t[0], t[1]) - (5.5 * 3600 * 1000);
    var d = new Date(ms);
    return d.getUTCFullYear() + pad2(d.getUTCMonth() + 1) + pad2(d.getUTCDate()) +
      "T" + pad2(d.getUTCHours()) + pad2(d.getUTCMinutes()) + "00Z";
  }

  function icsEscape(s) {
    return String(s || "").replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  }

  function buildICS(list) {
    var lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Gori in Goa//EN", "CALSCALE:GREGORIAN",
    ];
    list.forEach(function (e, i) {
      var start = toUTCStamp(e.date, e.time || "09:00");
      var endDate = e.date;
      if (e.time) {
        var p = e.date.split("-").map(Number);
        var t = e.time.split(":").map(Number);
        var dt = new Date(Date.UTC(p[0], p[1] - 1, p[2], t[0] + 2, t[1]));
        endDate = dt.getUTCFullYear() + "-" + pad2(dt.getUTCMonth() + 1) + "-" + pad2(dt.getUTCDate());
      }
      var end = toUTCStamp(endDate, e.time || "11:00");
      lines.push(
        "BEGIN:VEVENT",
        "UID:gori-" + e.date.replace(/-/g, "") + "-" + i + "@goriingoa",
        "DTSTAMP:" + toUTCStamp(e.date, e.time || "09:00"),
        "DTSTART:" + start,
        "DTEND:" + end,
        "SUMMARY:" + icsEscape(e.title),
        "LOCATION:" + icsEscape(e.place || ""),
        "DESCRIPTION:" + icsEscape(e.note || ""),
        "END:VEVENT"
      );
    });
    lines.push("END:VCALENDAR");
    return lines.join("\r\n");
  }

  document.getElementById("cal-ics").addEventListener("click", function () {
    var blob = new Blob([buildICS(events)], { type: "text/calendar;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "gori-in-goa.ics";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1000);
  });

  renderGrid();
  renderAgenda(null);
})();
