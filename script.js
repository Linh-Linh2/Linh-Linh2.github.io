$(document).ready(function () {
  // --- FUNKTION FÜR DAS HAMBURGER MENÜ-ICON ---
  $(".navbar-toggler").click(function () {
    $("#nav-icon").toggleClass("open");
  });

  // --- FUNKTION FÜR DEN SCROLL-FORTSCHRITTSBALKEN ---
  $(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    var docHeight = $(document).height();
    var winHeight = $(window).height();
    var scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

    $("#progress-bar").css("width", scrollPercent + "%");
  });

  // --- FUNKTION FÜR SMOOTH SCROLLING ---
  $(".nav-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - 85, // 85px ist die Höhe der Navbar
        },
        800 // Dauer der Animation
      );
      
      // Schließt das mobile Menü nach dem Klick (falls offen)
      if ($('.navbar-collapse').hasClass('show')) {
        $('.navbar-toggler').click();
      }
    }
  });
});