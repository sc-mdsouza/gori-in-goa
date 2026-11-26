/* =========================================================================
   GORI IN GOA — our home page
   ========================================================================= */
(function () {
  "use strict";
  var D = window.GORI, U = window.U;

  function foodCard(d) {
    return '<div class="food">' +
      '<span class="food__tag">' + U.esc(d.tag) + "</span>" +
      '<h4 class="food__name">' + U.esc(d.name) + "</h4>" +
      '<p class="food__note">' + U.esc(d.note) + "</p>" +
      "</div>";
  }

  var homeHost = document.getElementById("food-home");
  var outHost = document.getElementById("food-out");

  if (homeHost) {
    homeHost.innerHTML = D.dishes.filter(function (d) { return d.madeBy === "home"; })
      .map(foodCard).join("");
  }
  if (outHost) {
    outHost.innerHTML = D.dishes.filter(function (d) { return d.madeBy === "out"; })
      .map(foodCard).join("");
  }
})();
