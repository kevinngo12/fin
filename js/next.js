  var $root = $("html, body"),
    container = $("body");
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}
const accordionItems = document.querySelectorAll(".accordion-item");
accordionItems.forEach(((e, t) => {
    const o = e.querySelector(".accordion-button"),
        n = `collapse${t + 1}`,
        a = `collapse${t + 1}`;
    o.setAttribute("data-bs-toggle", "collapse"),
    o.setAttribute("data-bs-target", `#${n}`),
    o.setAttribute("aria-expanded", 0 === t ? "true" : "false"),
    o.setAttribute("aria-controls", a),
    0 === t && o.classList.add("show");
    const s = e.querySelector(".accordion-collapse");
    s.id = n,
    s.setAttribute("aria-labelledby", a),
    s.setAttribute("data-bs-parent", "#accordionCulture"),
    0 === t && s.classList.add("show")
}));
const scrollBackTopElements = document.querySelectorAll(".scroll-back-top");
scrollBackTopElements.forEach((e => {
    e.addEventListener("click", scrollToTop)
})),
$(".rd-resource-container").on("click keypress", (function() {
    var e = $(this).find(".rd-resource-link").attr("href");
    window.open(e, "_blank")
}));
const usStates = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
    renderStatesElement = document.getElementById("render-states");
$("#render-states").empty(),
usStates.forEach((e => {
    const t = document.createElement("li");
    t.className = "dropdown__item",
    t.setAttribute("role", "option"),
    t.setAttribute("aria-selected", "false"),
    t.setAttribute("tabindex", "0"),
    t.textContent = e,
    renderStatesElement.appendChild(t)
}));
const phoneInput = document.getElementById("request-phone");
function removeError(e) {
    e.closest(".form-element").removeClass("error"),
    e.next().remove()
}
function removeErrorDropDown(e) {
    e.closest(".form-element").removeClass("error"),
    e.closest(".form-element").find(".field-error").remove()
}
function DropDown(e) {
    const [t, o] = e.children,
        n = t => {
            if (!e)
                return document.removeEventListener("click", n);
            e.contains(t.target) || this.toggle(!1)
        },
        a = o => {
            const n = o.textContent;
            e.querySelectorAll(".dropdown__item").forEach((e => {
                e.setAttribute("aria-selected", "false")
            })),
            o.setAttribute("aria-selected", "true"),
            t.textContent = n,
            this.value = n,
            this.toggle(!1),
            e.dispatchEvent(new Event("change")),
            t.focus()
        },
        s = e => {
            e.preventDefault();
            const t = [...o.children],
                n = t.indexOf(e.target);
            if (38 === e.keyCode)
                t[0 === n ? t.length - 1 : n - 1].focus();
            else if (40 === e.keyCode)
                t[n === t.length - 1 ? 0 : n + 1].focus();
            else if (27 === e.keyCode)
                this.toggle(!1);
            else if (13 === e.keyCode || 32 === e.keyCode)
                a(e.target);
            else if (1 === e.key.length) {
                const o = e.key.toLowerCase(),
                    n = t.find((e => e.textContent.toLowerCase().startsWith(o)));
                n && n.focus()
            }
        };
    t.addEventListener("click", (() => this.toggle())),
    [...o.children].forEach((e => {
        e.addEventListener("keydown", s),
        e.addEventListener("click", (() => a(e)))
    })),
    this.element = e,
    this.value = t.textContent,
    this.toggle = (a=null) => {
        a = null === a ? "true" !== o.getAttribute("aria-expanded") : a,
        o.setAttribute("aria-expanded", a),
        a ? (t.classList.add("active"), o.children[0].focus(), document.addEventListener("click", n), e.dispatchEvent(new Event("opened"))) : (t.classList.remove("active"), e.dispatchEvent(new Event("closed")), document.removeEventListener("click", n))
    }
}
$(".dropdown-toggle").on("click", (function() {
    var e = $(this).next(".dropdown-menu-custom"),
        t = e.find('[aria-selected="true"]');
    t.length > 0 && setTimeout((() => {
        e.scrollTop(t.position().top)
    }), 5)
})),
phoneInput.addEventListener("input", (function(e) {
    let t = e.target.value;
    t = t.replace(/\D/g, "");
    const o = t.replace(/[^0-9]/g, "");
    if (o.length >= 10) {
        const e = o.split("");
        t = `(${e.slice(0, 3).join("")}) ${e.slice(3, 6).join("")}-${e.slice(6).join("")}`
    }
    e.target.value = t
})),
$("#other-option").on("click", (function() {
    $("#traffic-source").hide(),
    $(".other-field").show(),
    $("#request-other").focus()
})),
$(".undo-btn").on("click", (function() {
    $("#traffic-source").show(),
    $("#other-option").attr("aria-selected", !1),
    $("#request-traffic-source-volume").text("-"),
    $(".other-field").hide(),
    $(".other-field-container").removeClass("error").find(".field-error").remove(),
    $("#request-other").val(""),
    $("#sourceOther").val("")
})),
$("#submit-form-max-interest").on("click", (function() {
    $(".form-element.form-field.error .field-error").remove();
    const e = [];
    $(".other-field").is(":visible") && "" === $("#request-other").val().trim() && $(".other-field-container").addClass("error").append('\n              <span class="field-error" role="alert" aria-atomic="true">Please enter a response.</span>\n            '),
    $("#max-interest-form .form-element.form-field").each((function() {
        const t = $(this),
            o = t.find("label").text();
        if (t.hasClass("required"))
            if (t.find(".dropdown-toggle").length > 0) {
                const n = t.find(".dropdown-toggle").text().trim();
                if ("-" === n) {
                    t.addClass("error");
                    const e = `<span class="material-symbols-outlined">error</span>${o} is a required field`,
                        n = $('<span class="field-error" role="alert" aria-atomic="true"></span>').html(e);
                    t.append(n)
                } else
                    e.push({
                        label: o,
                        value: n
                    })
            } else {
                const n = t.find("input, textarea");
                if (n.length > 0) {
                    const a = n.val().trim();
                    if ("" === a) {
                        t.addClass("error");
                        const e = `<span class="material-symbols-outlined">error</span>${o} is a required field`,
                            n = $('<span class="field-error" role="alert" aria-atomic="true"></span>').html(e);
                        t.append(n)
                    } else
                        e.push({
                            label: o,
                            value: a
                        });
                    if ("request-email" === n.attr("id") & a.length > 0) {
                        const e = n.val().trim();
                        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(e)) {
                            t.addClass("error");
                            const e = $('<span class="field-error" role="alert" aria-atomic="true"></span>').text("Please enter a valid email address");
                            t.append(e)
                        }
                    }
                }
            }
        else {
            const n = t.find("input, textarea"),
                a = t.find("input").val();
            if ("request-phone" === n.attr("id") && a.length > 0)
                if (10 !== a.replace(/[^0-9]/g, "").length) {
                    t.addClass("error");
                    const e = $('<span class="field-error" role="alert" aria-atomic="true"></span>').text("Please enter a valid phone number");
                    t.append(e)
                } else
                    e.push({
                        label: o,
                        valueOptional: a
                    })
        }
    })),
    e.length >= 6 && $(".field-error").length < 1 ? ($("#max-interest-form-submission").attr("action", "https://docs.google.com/forms/u/0/d/e/1FAIpQLSevnhKAJmBQc7ggYFCYiWktnHEkW7HSufke8ri85S2q1jb_LQ/formResponse"), $("#firstName").val(e[0].value), $("#lastName").val(e[1].value), $("#email").val(e[2].value), $("#city").val(e[3].value), $("#state").val(e[4].value), $("#sales").val(e[5].value), 7 === e.length && $("#phoneNumber").val(e[6].valueOptional), $(".other-field").is(":visible") && "" !== $("#request-other").val().trim() && ($("#sourceOtherRadio").attr("name", "entry.365749222"), $("#sourceOther").attr("name", "entry.365749222.other_option_response"), $("#sourceOther").val($("#request-other").val()), $("#sourceOtherRadio").val("__other_option__")), $("#traffic-source").is(":visible") && "-" !== $("#request-traffic-source-volume").text() && ($("#sourceOtherRadio").attr("name", ""), $("#sourceOtherRadio").val(""), $("#sourceOther").attr("name", "entry.365749222"), $("#sourceOther").val($("#request-traffic-source-volume").text())), setTimeout((() => {
        document.getElementById("max-interest-form-submission").submit(),
        $("#max-interest-form").addClass("disabled-elm"),
        $("#submit-form-max-interest").find(".view-more-icon").remove(),
        $("#submit-form-max-interest").attr({
            "aria-live": "assertive",
            "aria-busy": !0
        }),
        $("#submit-form-max-interest").prepend('\n <svg class="SvgIcon-spinner spinner"><svg viewBox="8 -8 40 40"><path class="spinner-background background" d="M28-7c10.5 0 19 8.5 19 19s-8.5 19-19 19S9 22.5 9 12 17.5-7 28-7zm0 4c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15S36.3-3 28-3z"></path><path class="spinner-fill fill" d="M38.6 22.6C35.9 25.3 32.1 27 28 27c-8.3 0-15-6.7-15-15S19.7-3 28-3v-4C17.5-7 9 1.5 9 12s8.5 19 19 19c5.2 0 10-2.1 13.4-5.6l-2.8-2.8z"></path></svg></svg>\n ')
    }), 200)) : $("#max-interest-form-submission").attr("action", "")
})),
$("#request-firstName, #request-lastName, #request-city").on("keyup", (function() {
    $(this).val().trim().length > 0 && removeError($(this))
})),
$("#request-other").on("keyup", (function() {
    $(this).val().trim().length > 0 && $(".other-field-container").removeClass("error").find(".field-error").remove()
})),
$("#request-email").on("keyup", (function() {
    $(this).parent(".form-element").hasClass("error") && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test($(this).val()) && removeError($(this))
})),
$("#request-phone").on("keyup", (function() {
    10 === $(this).val().replace(/[^0-9]/g, "").length && removeError($(this)),
    0 === $(this).val().length && removeError($(this))
})),
$(".dropdown__item").on("click keypress keydown", (function() {
    setTimeout((() => {
        "-" !== $(".dropdown-toggle.active").text().trim() && removeErrorDropDown($(this))
    }), 50)
})),
document.querySelectorAll(".custom-dropdown").forEach((e => {
    new DropDown(e)
}));

function setupCarousel(e, t, o, n, a, s, r, i, l) {
    var c = $(e);
    window.blockMenuHeaderScroll = !1;
    var d = new Hammer(document);
    d.on("swipeleft swiperight panleft panright", (function(e) {
        window.blockMenuHeaderScroll = !0
    })),
    d.on("panend swipeend", (function(e) {
        window.blockMenuHeaderScroll = !1
    })),
    d.on("swipeup swipedown panup pandown", (function(e) {
        window.blockMenuHeaderScroll = !1
    }));
    for (var u = document.querySelectorAll(e), m = 0; m < u.length; m++)
        u[m].addEventListener("touchmove", (function(e) {
            window.blockMenuHeaderScroll && e.preventDefault()
        }), {
            passive: !1
        });
    c.owlCarousel({
        margin: 20,
        responsiveClass: !0,
        nav: !1,
        dots: !0,
        loop: !0,
        autoplay: !0,
        autoplayTimeout: 15e3,
        autoplayHoverPause: !0,
        stagePadding: r,
        center: s,
        responsive: {
            0: {
                items: t,
                slideBy: t,
                stagePadding: 35,
                margin: 14
            },
            768: {
                items: o,
                slideBy: o,
                stagePadding: l
            },
            992: {
                items: n,
                slideBy: n,
                stagePadding: i
            },
            1200: {
                items: a,
                slideBy: a
            }
        }
    }),
    c.parent().find(".carousel-nextBtn, .carousel-prevBtn").hover((function() {
        c.trigger("stop.owl.autoplay")
    }), (function() {
        c.trigger("play.owl.autoplay")
    })),
    c.parent().find(".carousel-nextBtn").click((function() {
        c.trigger("next.owl.carousel")
    })),
    c.parent().find(".carousel-prevBtn").click((function() {
        c.trigger("prev.owl.carousel")
    }))
}
var resizeTimer;
function adjustMargins() {
    document.querySelectorAll(".body-section-list-no-header .list-item-inner-content").forEach((function(e) {
        e.querySelector("p").clientHeight >= 40 ? e.style.marginTop = "3px" : e.style.marginTop = "11px"
    }))
}
function debounceResize() {
    clearTimeout(resizeTimer),
    resizeTimer = setTimeout(adjustMargins, 250)
}
setupCarousel(".owl-carousel-facts", 1, 2, 2, 3, !1, 60, 60, 60),
setupCarousel(".owl-carousel-quotes", 1, 1, 1, 1, !0, 240, 100, 60),
$(document).ready((function() {
  console.log("?")
    var e = 0,
        t = !1;
    function o() {
        document.body.classList.add("nav-active"),
        e = window.pageYOffset || document.documentElement.scrollTop,
        document.body.style.position = "fixed",
        document.body.style.top = -e + "px"
    }
    function n() {
        t && (document.body.classList.remove("nav-active"), document.body.style.position = "", document.body.style.top = "", window.scrollTo(0, e))
    }
    if ($(".interest-form-btn").on("click keypress", (function() {
        $("#redfin-max-interest-form").modal("show")
    })), $(".close-modal").on("click keypress", (function() {
        $("#redfin-max-interest-form").modal("hide")
    })), $("#redfin-max-interest-form").on("show.bs.modal", (function() {
        $(".backdrop-overlay").fadeIn(200);
        var e,
            t,
            o = $(this);
        o.data("activeElement", document.activeElement),
        function(o) {
            o.find('input, button, select, textarea, a, [tabindex]:not([tabindex="-1"])'),
            o.on("keydown", (function(o) {
                "Tab" !== o.key && 9 !== o.keyCode || (o.shiftKey ? document.activeElement === e && (o.preventDefault(), t.focus()) : document.activeElement === t && (o.preventDefault(), e.focus()))
            }))
        }(o)
    })), $("#redfin-max-interest-form").on("hide.bs.modal", (function() {
        $(".backdrop-overlay").fadeOut(200);
        var e = $(this);
        e.off("keydown"),
        e.data("activeElement").focus()
    })), !a)
        function a() {}
    function s(e) {
        return e ? "ASIDE" === e.tagName ? e : e.querySelector("aside") || s(e.parentElement) : null
    }
    function r() {
        window.innerWidth <= 576 && $(".tooltip.show").length ? ($(".body-overlay-tooltip").fadeIn(200), $("body").addClass("tooltip-open")) : ($(".body-overlay-tooltip").fadeOut(200), $("body").removeClass("tooltip-open"))
    }
    a.hasClass = function(e, t) {
        return e.classList.contains(t)
    },
    a.addClass = function(e, t) {
        var o = t.split(" ");
        e.classList.add(o[0]),
        o.length > 1 && a.addClass(e, o.slice(1).join(" "))
    },
    a.removeClass = function(e, t) {
        var o = t.split(" ");
        e.classList.remove(o[0]),
        o.length > 1 && a.removeClass(e, o.slice(1).join(" "))
    },
    a.toggleClass = function(e, t, o) {
        o ? a.addClass(e, t) : a.removeClass(e, t)
    },
    function() {
        var e = function(e) {
            this.element = e,
            this.search = this.element.getElementsByClassName("js-mega-nav__search"),
            this.searchActiveController = !1,
            this.menu = this.element.getElementsByClassName("js-mega-nav__nav"),
            this.menuItems = this.menu[0].getElementsByClassName("js-mega-nav__item"),
            this.menuActiveController = !1,
            this.itemExpClass = "mega-nav__item--expanded",
            this.classIconBtn = "mega-nav__icon-btn--state-b",
            this.classSearchVisible = "mega-nav__search--is-visible",
            this.classNavVisible = "mega-nav__nav--is-visible",
            this.classMobileLayout = "mega-nav--mobile",
            this.classDesktopLayout = "mega-nav--desktop",
            this.layout = "mobile",
            this.dropdown = this.element.getElementsByClassName("js-dropdown"),
            this.expandedClass = "mega-nav--expanded",
            this.hover = this.element.getAttribute("data-hover") && "on" == this.element.getAttribute("data-hover"),
            function(e) {
                s(e),
                function(e) {
                    if (0 != e.menu.length) {
                        e.menuToggles = document.querySelectorAll('[aria-controls="' + e.menu[0].getAttribute("id") + '"]');
                        for (var t = 0; t < e.menuToggles.length; t++)
                            !function(t) {
                                e.menuToggles[t].addEventListener("click", (function(o) {
                                    l(e, e.menu[0], "menuActiveController", e.classNavVisible, e.menuToggles[t], !0),
                                    m(e)
                                }))
                            }(t)
                    }
                }(e),
                function(e) {
                    e.element.addEventListener("click", (function(t) {
                        c(e, t, "click")
                    })),
                    e.hover && (e.element.addEventListener("mouseover", (function(t) {
                        "desktop" == e.layout && c(e, t, "mouseover")
                    })), e.element.addEventListener("mouseout", (function(t) {
                        if ("desktop" == e.layout) {
                            var o = t.target.closest(".js-mega-nav__item");
                            if (o) {
                                var n = o.getElementsByClassName("js-mega-nav__control");
                                if (!(n.length < 1)) {
                                    var s = a.hasClass(o, e.itemExpClass);
                                    if (s) {
                                        var r = t.relatedTarget;
                                        r && o.contains(r) || (a.toggleClass(o, e.itemExpClass, !s), s ? n[0].removeAttribute("aria-expanded") : n[0].setAttribute("aria-expanded", "true"))
                                    }
                                }
                            }
                        }
                    })))
                }(e),
                e.element.addEventListener("update-menu-layout", (function(t) {
                    s(e)
                }))
            }(this)
        };
        function s(e) {
            var s = getComputedStyle(e.element, ":before").getPropertyValue("content").replace(/\'|"/g, "");
            t || (t = !0),
            s != e.layout && (e.layout = s, a.toggleClass(e.element, e.classDesktopLayout, "desktop" == e.layout), a.toggleClass(e.element, e.classMobileLayout, "desktop" != e.layout), "desktop" != e.layout && "mobile" != e.layout || ($(".mega-nav--expanded").length > 0 && n(), d(e, !1), function(e) {
                if (0 != e.dropdown.length)
                    for (var t = 0; t < e.dropdown.length; t++)
                        e.dropdown[t].dispatchEvent(new CustomEvent("placeDropdown"))
            }(e)), "mobile" == e.layout && $(".mega-nav__nav--is-visible").length > 0 && o(), "mobile" == e.layout && $(".body-overlay").fadeOut(200), function(e) {
                document.documentElement.style.setProperty("--mega-nav-offset-y", e.element.getBoundingClientRect().top + "px")
            }(e), m(e))
        }
        function r(e) {
            $(".mega-nav--expanded").length && n(),
            a.hasClass(e.menu[0], e.classNavVisible) && l(e, e.menu[0], "menuActiveController", e.classNavVisible, e.menuActiveController, !0),
            d(e, !1),
            $(".body-overlay").fadeOut(200),
            m(e)
        }
        function i(e) {
            a.hasClass(e.menu[0], e.classNavVisible) && !document.activeElement.closest(".js-mega-nav__nav") && l(e, e.menu[0], "menuActiveController", e.classNavVisible, e.menuActiveController, !0);
            for (var t = 0; t < e.menuItems.length; t++)
                if (a.hasClass(e.menuItems[t], e.itemExpClass)) {
                    var o = document.activeElement.closest(".js-mega-nav__item");
                    o && o == e.menuItems[t] || (u(e, t), $(".body-overlay").fadeOut(200))
                }
            m(e)
        }
        function l(e, t, s, r, i, l) {
            var c = a.hasClass(t, r);
            a.toggleClass(t, r, !c),
            a.toggleClass(i, e.classIconBtn, !c),
            c ? i.removeAttribute("aria-expanded") : i.setAttribute("aria-expanded", "true"),
            c ? (i && l && i.focus(), e[s] = !1) : (i && (e[s] = i), function(e) {
                for (var t = e.querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary'), o = !1, n = 0; n < t.length; n++)
                    if (t[n].offsetWidth || t[n].offsetHeight || t[n].getClientRects().length) {
                        o = t[n];
                        break
                    }
                return o
            }(t).focus()),
            "mobile" != e.layout || c ? n() : o()
        }
        function c(e, t, s) {
            var r = t.target.closest(".js-mega-nav__control");
            if (r) {
                var i = r.closest(".js-mega-nav__item");
                if (i) {
                    var l = a.hasClass(i, e.itemExpClass);
                    e.hover && l && "desktop" == e.layout && "click" != s || (a.toggleClass(i, e.itemExpClass, !l), l ? r.removeAttribute("aria-expanded") : r.setAttribute("aria-expanded", "true"), "desktop" != e.layout || l || d(e, i), m(e), "desktop" != e.layout || l ? ($(".body-overlay").fadeOut(200), "mobile" !== e.layout && n()) : ($(".body-overlay").fadeIn(0), o()))
                }
            }
        }
        function d(e, t) {
            if (0 != e.menuItems.length)
                for (var o = 0; o < e.menuItems.length; o++)
                    e.menuItems[o] != t && u(e, o)
        }
        function u(e, t) {
            a.removeClass(e.menuItems[t], e.itemExpClass);
            var o = e.menuItems[t].getElementsByClassName("js-mega-nav__control");
            o.length > 0 && o[0].removeAttribute("aria-expanded")
        }
        function m(e) {
            e.element.getElementsByClassName(e.itemExpClass).length > 0 && "desktop" == e.layout || e.element.getElementsByClassName(e.classSearchVisible).length > 0 || e.element.getElementsByClassName(e.classNavVisible).length > 0 && "mobile" == e.layout ? a.addClass(e.element, e.expandedClass) : a.removeClass(e.element, e.expandedClass)
        }
        $(document).on("click", ".btn-list", (function() {
            for (var e = 0; e < v.length; e++)
                !function(e) {
                    r(v[e])
                }(e)
        }));
        var f = document.getElementsByClassName("js-mega-nav");
        if (f.length > 0) {
            for (var v = [], p = 0; p < f.length; p++)
                !function(t) {
                    v.push(new e(f[t]))
                }(p);
            window.addEventListener("keyup", (function(e) {
                if (e.keyCode && 27 == e.keyCode || e.key && "escape" == e.key.toLowerCase())
                    for (var t = 0; t < v.length; t++)
                        !function(e) {
                            r(v[e])
                        }(t);
                if (e.keyCode && 9 == e.keyCode || e.key && "tab" == e.key.toLowerCase())
                    for (t = 0; t < v.length; t++)
                        !function(e) {
                            i(v[e])
                        }(t)
            })),
            window.addEventListener("click", (function(e) {
                e.target.closest(".js-mega-nav") || r(v[0])
            }));
            var h = !1,
                g = new CustomEvent("update-menu-layout");
            function y() {
                for (var e = 0; e < v.length; e++)
                    !function(e) {
                        v[e].element.dispatchEvent(g)
                    }(e)
            }
            window.addEventListener("resize", (function(e) {
                clearTimeout(h),
                h = setTimeout(y, 200)
            })),
            window.requestAnimationFrame ? window.requestAnimationFrame(y) : y()
        }
    }(),
    document.querySelectorAll(".sup").forEach((function(e, t) {
        var o = "fn" + t;
        e.setAttribute("id", o + "-ref"),
        e.setAttribute("aria-describedby", o);
        var n = s(e);
        n && n.setAttribute("id", o)
    })),
    $(document).on("keydown", (function(e) {
        if ("Escape" === e.key) {
            var t = $('[data-toggle="tooltip"]:visible');
            t.length > 0 && (t.tooltip("hide"), $(".body-overlay-tooltip").fadeOut(200), $("body").removeClass("tooltip-open"))
        }
    })),
    $('[data-toggle="tooltip"]').on("click", (function(e) {
        var t;
        e.preventDefault(),
        t = this,
        $(t).attr("aria-describedby") ? $(t).tooltip("hide") : $(t).tooltip("show"),
        r()
    })),
    $(document).on("click", (function(e) {
        $(e.target).closest('[data-toggle="tooltip"]').length || $(e.target).closest(".tooltip-inner").length || ($('[data-toggle="tooltip"]').tooltip("hide"), $(".body-overlay-tooltip").fadeOut(200), $("body").removeClass("tooltip-open"))
    })),
    $(window).on("resize", (function() {
        r()
    })),
    $(document).ready((function() {
        $('[data-toggle="tooltip"]').tooltip({
            trigger: "manual",
            html: !0
        })
    })),
    setTimeout((() => {
        document.querySelectorAll(".element-animated").forEach(((e, t) => {
            setTimeout((() => {
                e.style.opacity = "1",
                e.style.transform = "translateY(0)"
            }), 150 * t)
        }))
    }), 100)
})),
setTimeout((() => {
    adjustMargins()
}), 50),
window.addEventListener("resize", debounceResize);
const dotContainers = document.querySelectorAll(".owl-dots");
dotContainers.forEach(((e, t) => {
    let o = e.querySelectorAll(".owl-dot"),
        n = e.closest(".owl-carousel");
    if (n) {
        let e = n.getAttribute("data-name");
        o.forEach(((t, n) => {
            let a = n + 1;
            t.setAttribute("aria-label", `Slide ${a} of ${o.length} in ${e}`)
        }))
    }
}));