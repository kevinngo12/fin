$("html").prepend(
    `
      <a href="#" data-activates="slide-out" class="button-collapse hide-on-large-only"><i class="material-icons">menu</i></a>
      <header id="header">
         <div id="slide-out" class="side-nav fixed">
            <ul id="mainNav" class="nav">
            </ul>
         </div>
      </header>
  `
  );
  
  $(".heading-section").each(function(index) {
    $(this).attr("id", "section" + (index + 1));
  });

  var dataLabel;
  $(".heading-section").each(function (index) {
    var hasSection = 'Section ' + (index + 1);
    var dataType = $(this).attr("data-type");
    var sectionTitle = $(this).attr("data-section-title");
    if(dataType === undefined) {
      dataLabel = "";
    } else {
      if(sectionTitle === "false") {
        hasSection = '';
        dataLabel = dataType;
      } else {
        dataLabel = ": " + dataType;
      }
    }
    $("ul.nav").append(
      '<li class="nav-item">' +
        '<a href="#section' +
        (index + 1) +
        '" class="nav-link">' +
        '<span class="nav-label">' +
        hasSection +
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
  
  $('.nav-link').click(function (t) {
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

  $(".nav-link").click(function() {
    var overlay = $("#sidenav-overlay");
    if( overlay.length ) {
      $(".button-collapse").click();
    }
  });

  $('.button-collapse').sideNav({
    menuWidth: 240, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true // Choose whether you can drag to open on touch screens,
  }
);
  
  