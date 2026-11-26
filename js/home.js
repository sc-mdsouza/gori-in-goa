/* =========================================================================
   GORI IN GOA — home page: countdown + what's next
   ========================================================================= */
(function () {
  "use strict";
  var D = window.GORI, U = window.U;

  /* ------------------------------------------------------------ countdown */
  var arrival = new Date(D.trip.arrivalISO);
  var departure = new Date(D.trip.departureISO);
  var el = {
    box: document.getElementById("countdown"),
    label: document.getElementById("cd-label"),
    d: document.getElementById("cd-d"),
    h: document.getElementById("cd-h"),
    m: document.getElementById("cd-m"),
    s: document.getElementById("cd-s"),
    foot: document.getElementById("cd-foot"),
    note: document.getElementById("cd-note"),
  };

  function pad(n) { return String(Math.max(0, n)).padStart(2, "0"); }

  function tick() {
    var now = new Date();
    var diff = arrival - now;

    if (diff <= 0 && now < departure) {
      // she's here
      el.box.classList.add("countdown--here");
      el.label.textContent = "You're here";
      var left = departure - now;
      el.d.textContent = pad(Math.floor(left / 864e5));
      el.h.textContent = pad(Math.floor(left / 36e5) % 24);
      el.m.textContent = pad(Math.floor(left / 6e4) % 60);
      el.s.textContent = pad(Math.floor(left / 1e3) % 60);
      el.foot.textContent = "until you fly home. Let's not think about it.";
      el.note.textContent = "";
      return;
    }

    if (now >= departure) {
      el.box.classList.add("countdown--here");
      el.label.textContent = "Trip complete";
      el.d.textContent = "—";
      el.h.textContent = "—";
      el.m.textContent = "—";
      el.s.textContent = "—";
      el.foot.textContent = "Come back soon.";
      el.note.textContent = "";
      return;
    }

    var days = Math.floor(diff / 864e5);
    var hours = Math.floor(diff / 36e5) % 24;
    var mins = Math.floor(diff / 6e4) % 60;
    var secs = Math.floor(diff / 1e3) % 60;

    el.d.textContent = pad(days);
    el.h.textContent = pad(hours);
    el.m.textContent = pad(mins);
    el.s.textContent = pad(secs);
    el.foot.textContent = "until you land at " + D.trip.airport;
    el.note.textContent = D.trip.arrivalPlaceholder ? "flight not booked yet" : "";
  }

  if (el.d) {
    tick();
    setInterval(tick, 1000);
  }

  /* ------------------------------------------------------------ what's next */
  var list = document.getElementById("upcoming");
  if (list) {
    var today = U.todayISO();
    var all = window.sortEvents(D.events);
    var ahead = all.filter(function (e) { return e.date >= today; });
    var pick = (ahead.length ? ahead : all).slice(0, 3);

    if (!pick.length) {
      list.innerHTML = '<li class="empty">Nothing on the calendar yet.</li>';
    } else {
      pick.forEach(function (e, i) {
        list.insertAdjacentHTML("beforeend", window.eventCard(e, { showDate: true }));
      });
    }
  }
})();
