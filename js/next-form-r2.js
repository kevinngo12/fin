    const usStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
    ],
    renderStatesElement = document.getElementById("render-states");
    $("#render-states").empty(),
    usStates.forEach((e) => {
        const t = document.createElement("li");
        (t.className = "dropdown__item"),
        t.setAttribute("role", "option"),
        t.setAttribute("aria-selected", "false"),
        t.setAttribute("tabindex", "0"),
        (t.textContent = e),
        renderStatesElement.appendChild(t);
    });
    const phoneInput = document.getElementById("request-phone");
    function removeError(e) {
    e.closest(".form-element").removeClass("error"), e.next().remove();
    }
    function removeErrorDropDown(e) {
    e.closest(".form-element").removeClass("error"),
        e.closest(".form-element").find(".field-error").remove();
    }
    function DropDown(e) {
    const [t, o] = e.children,
        n = (t) => {
            if (!e) return document.removeEventListener("click", n);
            if (!e.contains(t.target)) {
                this.toggle(!1);
            }
        },
        a = (o) => {
            const n = o.textContent;
            e.querySelectorAll(".dropdown__item").forEach((e) => {
                e.setAttribute("aria-selected", "false");
            });
            o.setAttribute("aria-selected", "true");
            t.textContent = n;
            this.value = n;
            this.toggle(!1);
            e.dispatchEvent(new Event("change"));
            t.focus();
        },
        s = (e) => {
            e.preventDefault();
            const t = [...o.children],
                n = t.indexOf(e.target);
            if (e.keyCode === 38) t[0 === n ? t.length - 1 : n - 1].focus();
            else if (e.keyCode === 40) t[n === t.length - 1 ? 0 : n + 1].focus();
            else if (e.keyCode === 27) this.toggle(!1);
            else if (e.keyCode === 13 || e.keyCode === 32) a(e.target);
            else if (e.key.length === 1) {
                const o = e.key.toLowerCase(),
                    n = t.find((e) => e.textContent.toLowerCase().startsWith(o));
                if (n) n.focus();
            }
        };
        t.addEventListener("click", () => this.toggle());
        [...o.children].forEach((e) => {
            e.addEventListener("keydown", s);
            e.addEventListener("click", () => a(e));
        });
        this.element = e;
        this.value = t.textContent;
        this.toggle = (a = null) => {
            a = a === null ? o.getAttribute("aria-expanded") !== "true" : a;
            o.setAttribute("aria-expanded", a);
            if (a) {
                t.classList.add("active");
                o.children[0].focus();
                document.addEventListener("click", n);
                e.dispatchEvent(new Event("opened"));
            } else {
                t.classList.remove("active");
                e.dispatchEvent(new Event("closed"));
                document.removeEventListener("click", n);
            }
        };
    }

    $(".dropdown-toggle").on("click", function () {
        var e = $(this).next(".dropdown-menu-custom"),
            t = e.find('[aria-selected="true"]');
        if (t.length > 0) {
            setTimeout(() => {
                e.scrollTop(t.position().top);
            }, 5);
        }
    });

    phoneInput.addEventListener("input", function (e) {
        let t = e.target.value;
        t = t.replace(/\D/g, "");
        const o = t.replace(/[^0-9]/g, "");
        if (o.length >= 10) {
            const e = o.split("");
            t = `(${e.slice(0, 3).join("")}) ${e.slice(3, 6).join("")}-${e.slice(6).join("")}`;
        }
        e.target.value = t;
    });

    $("#other-option").on("click", function () {
        $("#traffic-source").hide();
        $(".other-field").show();
        $("#request-other").focus();
    });

    $(".undo-btn").on("click", function () {
        $("#traffic-source").show();
        $("#other-option").attr("aria-selected", false);
        $("#request-traffic-source-volume").text("-");
        $(".other-field").hide();
        $(".other-field-container").removeClass("error").find(".field-error").remove();
        $("#request-other").val("");
        $("#sourceOther").val("");
    });

    $("#submit-form-max-interest").on("click", function () {
        $(".form-element.form-field.error .field-error").remove();
        const e = [];
        if ($(".other-field").is(":visible") && $("#request-other").val().trim() === "") {
            $(".other-field-container").addClass("error").append(
                '<span class="field-error" role="alert" aria-atomic="true">Please enter a response.</span>'
            );
        }
        $("#max-interest-form .form-element.form-field").each(function () {
            const t = $(this),
                o = t.find("label").text();
            if (t.hasClass("required")) {
                if (t.find(".dropdown-toggle").length > 0) {
                    const n = t.find(".dropdown-toggle").text().trim();
                    if (n === "-") {
                        t.addClass("error");
                        const e = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>${o} is a required field`,
                            n = $('<span class="field-error" role="alert" aria-atomic="true"></span>').html(e);
                        t.append(n);
                    } else {
                        e.push({ label: o, value: n });
                    }
                } else {
                    const n = t.find("input, textarea");
                    if (n.length > 0) {
                        const a = n.val().trim();
                        if (a === "") {
                            t.addClass("error");
                            const e = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>${o} is a required field`,
                                n = $('<span class="field-error" role="alert" aria-atomic="true"></span>').html(e);
                            t.append(n);
                        } else {
                            e.push({ label: o, value: a });
                        }
                        if (n.attr("id") === "request-email" && a.length > 0) {
                            const e = n.val().trim();
                            if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(e)) {
                                t.addClass("error");
                                const e = $('<span class="field-error" role="alert" aria-atomic="true"></span>').text("Please enter a valid email address");
                                t.append(e);
                            }
                        }
                    }
                }
            } else {
                const n = t.find("input, textarea"),
                    a = t.find("input").val();
                if (n.attr("id") === "request-phone" && a.length > 0) {
                    if (a.replace(/[^0-9]/g, "").length !== 10) {
                        t.addClass("error");
                        const e = $('<span class="field-error" role="alert" aria-atomic="true"></span>').text("Please enter a valid phone number");
                        t.append(e);
                    } else {
                        e.push({ label: o, valueOptional: a });
                    }
                }
            }
        });
        if (e.length >= 6 && $(".field-error").length < 1) {
            $("#max-interest-form-submission").attr(
                "action",
                "https://docs.google.com/forms/u/0/d/e/1FAIpQLSevnhKAJmBQc7ggYFCYiWktnHEkW7HSufke8ri85S2q1jb_LQ/formResponse"
            );
            $("#firstName").val(e[0].value);
            $("#lastName").val(e[1].value);
            $("#email").val(e[2].value);
            $("#city").val(e[3].value);
            $("#state").val(e[4].value);
            $("#sales").val(e[5].value);
            if (e.length === 7) $("#phoneNumber").val(e[6].valueOptional);
            if ($(".other-field").is(":visible") && $("#request-other").val().trim() !== "") {
                $("#sourceOtherRadio").attr("name", "entry.365749222");
                $("#sourceOther").attr("name", "entry.365749222.other_option_response");
                $("#sourceOther").val($("#request-other").val());
                $("#sourceOtherRadio").val("__other_option__");
            }
            if ($("#traffic-source").is(":visible") && $("#request-traffic-source-volume").text() !== "-") {
                $("#sourceOtherRadio").attr("name", "");
                $("#sourceOtherRadio").val("");
                $("#sourceOther").attr("name", "entry.365749222");
                $("#sourceOther").val($("#request-traffic-source-volume").text());
            }
            setTimeout(() => {
                document.getElementById("max-interest-form-submission").submit();
                $("#max-interest-form").addClass("disabled-elm");
                $("#submit-form-max-interest").find(".view-more-icon").remove();
                $("#submit-form-max-interest").attr({
                    "aria-live": "assertive",
                    "aria-busy": true,
                });
                $("#submit-form-max-interest").prepend(
                    '<svg class="SvgIcon-spinner spinner"><svg viewBox="8 -8 40 40"><path class="spinner-background background" d="M28-7c10.5 0 19 8.5 19 19s-8.5 19-19 19S9 22.5 9 12 17.5-7 28-7zm0 4c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15S36.3-3 28-3z"></path><path class="spinner-fill fill" d="M38.6 22.6C35.9 25.3 32.1 27 28 27c-8.3 0-15-6.7-15-15S19.7-3 28-3v-4C17.5-7 9 1.5 9 12s8.5 19 19 19c5.2 0 10-2.1 13.4-5.6l-2.8-2.8z"></path></svg></svg>'
                );
            }, 200);
        } else {
            $("#max-interest-form-submission").attr("action", "");
        }
    });

    $("#request-firstName, #request-lastName, #request-city").on("keyup", function () {
        if ($(this).val().trim().length > 0) {
            removeError($(this));
        }
    });

    $("#request-other").on("keyup", function () {
        if ($(this).val().trim().length > 0) {
            $(".other-field-container").removeClass("error").find(".field-error").remove();
        }
    });

    $("#request-email").on("keyup", function () {
        if ($(this).parent(".form-element").hasClass("error") &&
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test($(this).val())) {
            removeError($(this));
        }
    });

    $("#request-phone").on("keyup", function () {
        if ($(this).val().replace(/[^0-9]/g, "").length === 10 || $(this).val().length === 0) {
            removeError($(this));
        }
    });

    $(".dropdown__item").on("click keypress keydown", function () {
        setTimeout(() => {
            if ($(".dropdown-toggle.active").text().trim() !== "-") {
                removeErrorDropDown($(this));
            }
        }, 50);
    });

    document.querySelectorAll(".custom-dropdown").forEach((e) => {
        new DropDown(e);
    });