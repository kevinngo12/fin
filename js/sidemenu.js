$("html").prepend(
    `
      <a href="#" data-activates="slide-out" class="button-collapse hide-on-large-only"><i class="material-icons">menu</i></a>
      <header id="header">
         <div id="slide-out" class="side-nav fixed">
                 <div class="header-logo"><img src="/hc/article_attachments/5021621988635/rise-logo-red.png" alt="redfin rise logo"></div>
            <ul id="mainNav" class="nav d-flex">
            </ul>
         </div>
      </header>
  `
  );
  
  var dataLabel;
  $(".heading-section").each(function (index) {
    var dataType = $(this).attr("data-type");
    if(dataType === undefined) {
      dataLabel = "";
    } else {
      dataLabel = ": " + dataType;
    }
    $("ul.nav").append(
      '<li class="nav-item">' +
        '<a href="#section' +
        (index + 1) +
        '" class="nav-link">' +
        '<span class="nav-label">Section ' +
        (index + 1) +
        dataLabel +
        "</span>" +
        '<span class="nav-item-content">' +
        $(this).text() +
        "</span>" +
        "</a>" +
        "</li>"
    );
  });
  
  // Cache selectors
  var lastId,
    topMenu = $("#mainNav"),
    topMenuHeight = topMenu.outerHeight() + 1,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
      var item = $($(this).attr("href"));
      if (item.length) {
        return item;
      }
    });
  
  // Bind to scroll
  $(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop();
  
    // Get id of current scroll item
    var cur = scrollItems.map(function () {
      if ($(this).offset().top - 40 < fromTop) return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";
  
    if (lastId !== id) {
      lastId = id;
      // Set/remove active class
      menuItems
        .parent()
        .removeClass("active")
        .end()
        .filter("[href=#" + id + "]")
        .parent()
        .addClass("active");
    }
  });
  
  $('a[href*="#"]').click(function (t) {
    if (
      location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var e = $(this.hash);
      (e = e.length ? e : $("[name=" + this.hash.slice(1) + "]")),
        e.length &&
          (t.preventDefault(),
          $("html, body").animate(
            {
              scrollTop: e.offset().top - 15,
            },
            500,
            function () {
              var t = $(e);
              if ((t.focus(), t.is(":focus"))) return !1;
              t.attr("tabindex", "-1"), t.focus();
            }
          ));
    }
  });

  $('.button-collapse').sideNav({
    menuWidth: 240, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true // Choose whether you can drag to open on touch screens,
  }
); 
  
  