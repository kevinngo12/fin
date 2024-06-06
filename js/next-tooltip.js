    $('[data-toggle="tooltip"]').on("show.bs.tooltip", function () {
        $('[data-toggle="tooltip"]').not(this).tooltip("hide");
    });

    function r() {
        if ($(window).innerWidth() <= 576 && $(".tooltip.show").length) {
            $(".body-overlay-tooltip").fadeIn(200);
            $("body").addClass("tooltip-open");
        } else {
            $(".body-overlay-tooltip").fadeOut(200);
            $("body").removeClass("tooltip-open");
        }
    }

    $(document).on("keydown", function(e) {
        if (e.key === "Escape") {
            var t = $('[data-toggle="tooltip"]:visible');
            if (t.length !== 0) {
                t.tooltip("hide");
                $(".body-overlay-tooltip").fadeOut(200);
                $("body").removeClass("tooltip-open");
            }
        }
    });

    $('[data-toggle="tooltip"]').on("click", function(e) {
        e.preventDefault();
        var t = this;
        $(t).attr("aria-describedby") ? $(t).tooltip("hide") : $(t).tooltip("show");
        r();
    });

    $(document).on("click", function(e) {
        if (!$(e.target).closest('[data-toggle="tooltip"]').length && !$(e.target).closest(".tooltip-inner").length) {
            $('[data-toggle="tooltip"]').tooltip("hide");
            $(".body-overlay-tooltip").fadeOut(200);
            $("body").removeClass("tooltip-open");
        }
    });

    $(window).on("resize", function() {
        r();
    });

    $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip({ trigger: "manual", html: true });
    });