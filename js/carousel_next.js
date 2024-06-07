function setupCarousel(e, t, o, n, a, s, r, i, l) {
    var c = $(e);
    window.blockMenuHeaderScroll = false;
    var d = new Hammer(document);

    d.on("swipeleft swiperight panleft panright", function () {
        window.blockMenuHeaderScroll = true;
    });
    
    d.on("panend swipeend", function () {
        window.blockMenuHeaderScroll = false;
    });
    
    d.on("swipeup swipedown panup pandown", function () {
        window.blockMenuHeaderScroll = false;
    });

    var u = document.querySelectorAll(e);
    for (var m = 0; m < u.length; m++) {
        u[m].addEventListener(
            "touchmove",
            function (event) {
                if (window.blockMenuHeaderScroll) {
                    event.preventDefault();
                }
            },
            { passive: false }
        );
    }

    c.owlCarousel({
        margin: 20,
        responsiveClass: true,
        nav: false,
        dots: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 15000, // changed from 15e3 for readability
        autoplayHoverPause: true,
        stagePadding: r,
        center: s,
        responsive: {
            0: { items: t, slideBy: t, stagePadding: l, margin: 16 },
            768: { items: o, slideBy: o, stagePadding: l },
            992: { items: n, slideBy: n, stagePadding: i },
            1200: { items: a, slideBy: a },
        },
    });

    c.parent().find(".carousel-nextBtn, .carousel-prevBtn").hover(
        function () {
            c.trigger("stop.owl.autoplay");
        },
        function () {
            c.trigger("play.owl.autoplay");
        }
    );

    c.parent().find(".carousel-nextBtn").click(function () {
        c.trigger("next.owl.carousel");
    });

    c.parent().find(".carousel-prevBtn").click(function () {
        c.trigger("prev.owl.carousel");
    });
}