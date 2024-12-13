function initDynamicCarousel(selector, customOptions) {
    var el = $(selector);

    if (!el.length) {
        console.warn('Carousel target not found: ' + selector);
        return;
    }

    var defaultOptions = {
        margin: 20,
        responsiveClass: true,
        nav: false,
        dots: true,
        loop: false,
        autoplay: false,
        stagePadding: 0,
        smartSpeed: 700,
        slideBy: 'page',
        responsive: {
            0: { items: 2, rows: 2 },
            768: { items: 2, rows: 2 },
            1200: { items: 4, rows: 2 },
        },
    };

    var carouselOptions = $.extend(true, {}, defaultOptions, customOptions);

    var viewport = function () {
        return window.innerWidth || document.documentElement.clientWidth || $(carouselOptions.responsiveBaseElement || window).width();
    };

    var severalRows = Object.values(carouselOptions.responsive).some(settings => settings.rows > 1);
    var orderedBreakpoints = Object.keys(carouselOptions.responsive).map(Number).sort((a, b) => b - a);
    var carousel;

    var setupCustomNavButtons = function () {
        var $parentContainer = el.closest('.carousel-wrapper'); // Adjusted to find buttons inside the wrapper
        var $nextBtn = $parentContainer.find(".carousel-nextBtn");
        var $prevBtn = $parentContainer.find(".carousel-prevBtn");

        $nextBtn.off('click').on('click', function () {
            el.trigger("next.owl.carousel");
        });

        $prevBtn.off('click').on('click', function () {
            el.trigger("prev.owl.carousel");
        });
    };

    if (severalRows) {
        var slides = el.find('[data-slide-index]');
        var slidesNb = slides.length;
        if (slidesNb > 0) {
            var rowsNb, colsNb, previousRowsNb, previousColsNb;

            var updateRowsColsNb = function () {
                var width = viewport();
                for (var breakpoint of orderedBreakpoints) {
                    if (width >= breakpoint || breakpoint === orderedBreakpoints[orderedBreakpoints.length - 1]) {
                        var settings = carouselOptions.responsive[breakpoint];
                        rowsNb = settings.rows;
                        colsNb = settings.items;
                        break;
                    }
                }
            };

            var updateCarousel = function () {
                updateRowsColsNb();

                if (rowsNb !== previousRowsNb || colsNb !== previousColsNb) {
                    if (carousel) {
                        carousel.trigger("destroy.owl.carousel");
                        carousel = undefined;
                        slides = el.find("[data-slide-index]").detach().appendTo(el);
                        el.find(".fake-col-wrapper").remove();
                    }

                    var perPage = rowsNb * colsNb;
                    var pageIndex = Math.floor(slidesNb / perPage);
                    var fakeColsNb = pageIndex * colsNb + (slidesNb >= pageIndex * perPage + colsNb ? colsNb : slidesNb % colsNb);

                    var count = 0;
                    for (var i = 0; i < fakeColsNb; i++) {
                        var fakeCol = $('<div class="fake-col-wrapper"></div>').appendTo(el);
                        for (var j = 0; j < rowsNb; j++) {
                            var index = Math.floor(count / perPage) * perPage + (i % colsNb) + j * colsNb;
                            if (index < slidesNb) {
                                slides.filter("[data-slide-index=" + index + "]").detach().appendTo(fakeCol);
                            }
                            count++;
                        }
                    }

                    previousRowsNb = rowsNb;
                    previousColsNb = colsNb;

                    carousel = el.owlCarousel(carouselOptions);
                    setupCustomNavButtons();
                }
            };

            $(window).on("resize", updateCarousel);
            updateCarousel();
        }
    } else {
        carousel = el.owlCarousel(carouselOptions);
        setupCustomNavButtons();
    }

    el.on('initialized.owl.carousel', function (e) {
        setTimeout(function() {
            $(".slider-counter").html(
                `
                    (${$(".blog-posts .owl-dots .owl-dot.active").index() + 1} / ${$(".blog-posts .owl-dots .owl-dot").length})
                `
            );
        }, 500);
    });

    el.on("changed.owl.carousel", function (e) {
        $(".slider-counter").html(
            `
                (${$(".blog-posts .owl-dots .owl-dot.active").index() + 1} / ${$(".blog-posts .owl-dots .owl-dot").length})
            `
        )
    });

    $(window).resize(function() {
        setTimeout(function() {
            $(".slider-counter").html(
                `
                    (${$(".blog-posts .owl-dots .owl-dot.active").index() + 1} / ${$(".blog-posts .owl-dots .owl-dot").length})
                `
            )
        }, 250);
    });

}