var viewport = function() {
    var width;
    if (carouselOptions.responsiveBaseElement && carouselOptions.responsiveBaseElement !== window) {
    width = $(carouselOptions.responsiveBaseElement).width();
    } else if (window.innerWidth) {
    width = window.innerWidth;
    } else if (document.documentElement && document.documentElement.clientWidth) {
    width = document.documentElement.clientWidth;
    } else {
    console.warn('Can not detect viewport width.');
    }
    return width;
};

var severalRows = false;
var orderedBreakpoints = [];
for (var breakpoint in carouselOptions.responsive) {
    if (carouselOptions.responsive[breakpoint].rows > 1) {
    severalRows = true;
    }
    orderedBreakpoints.push(parseInt(breakpoint));
}

if (severalRows) {
    orderedBreakpoints.sort(function (a, b) {
    return b - a;
    });
    var slides = el.find('[data-slide-index]');
    var slidesNb = slides.length;
    if (slidesNb > 0) {
    var rowsNb;
    var previousRowsNb = undefined;
    var colsNb;
    var previousColsNb = undefined;

    var updateRowsColsNb = function () {
        var width =  viewport();
        for (var i = 0; i < orderedBreakpoints.length; i++) {
        var breakpoint = orderedBreakpoints[i];
        if (width >= breakpoint || i == (orderedBreakpoints.length - 1)) {
            var breakpointSettings = carouselOptions.responsive['' + breakpoint];
            rowsNb = breakpointSettings.rows;
            colsNb = breakpointSettings.items;
            break;
        }
        }
    };

    var updateCarousel = function () {
        updateRowsColsNb();

        if (rowsNb != previousRowsNb || colsNb != previousColsNb) {
        var reInit = false;
        if (carousel) {
            carousel.trigger('destroy.owl.carousel');
            carousel = undefined;
            slides = el.find('[data-slide-index]').detach().appendTo(el);
            el.find('.fake-col-wrapper').remove();
            reInit = true;
        }

        var perPage = rowsNb * colsNb;
        var pageIndex = Math.floor(slidesNb / perPage);
        var fakeColsNb = pageIndex * colsNb + (slidesNb >= (pageIndex * perPage + colsNb) ? colsNb : (slidesNb % colsNb));

        var count = 0;
        for (var i = 0; i < fakeColsNb; i++) {
            var fakeCol = $('<div class="fake-col-wrapper"></div>').appendTo(el);
            for (var j = 0; j < rowsNb; j++) {
            var index = Math.floor(count / perPage) * perPage + (i % colsNb) + j * colsNb;
            if (index < slidesNb) {
                slides.filter('[data-slide-index=' + index + ']').detach().appendTo(fakeCol);
            }
            count++;
            }
        }

        previousRowsNb = rowsNb;
        previousColsNb = colsNb;

        if (reInit) {
            carousel = el.owlCarousel(carouselOptions);
        }
        }
    };

    $(window).on('resize', updateCarousel);

    updateCarousel();
    }
}