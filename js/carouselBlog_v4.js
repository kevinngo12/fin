function initDynamicCarousel(selector, customOptions) {
    var el = $(selector);

    if (!el.length) {
        console.warn('Carousel target not found: ' + selector);
        return;
    }

    var defaultOptions = {
        margin: 20,
        loop: false,
        nav: false, // Disable default nav
        dots: true, // Enable dots
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
        var $nextBtn = el.siblings(".carousel-nextBtn");
        var $prevBtn = el.siblings(".carousel-prevBtn");

        // Handle button clicks
        $nextBtn.click(function () {
            el.trigger("next.owl.carousel");
        });

        $prevBtn.click(function () {
            el.trigger("prev.owl.carousel");
        });

        // Update button states based on carousel position
        el.on('changed.owl.carousel', function (event) {
            var carousel = el.data('owl.carousel');
            if (!carousel) return;

            var currentIndex = event.item.index; // Current index
            var totalItems = event.item.count;  // Total items
            var itemsPerPage = event.page.size; // Items per page

            // Disable/enable buttons based on position
            if (currentIndex === 0) {
                $prevBtn.prop('disabled', true);
            } else {
                $prevBtn.prop('disabled', false);
            }

            if (currentIndex + itemsPerPage >= totalItems) {
                $nextBtn.prop('disabled', true);
            } else {
                $nextBtn.prop('disabled', false);
            }
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
}