var isSearching = false;
var pageTitle = document.title;
document.title = pageTitle;
$("#page-loading-title").html(`${pageTitle}`);

$.fn.disableScroll = function() {
    window.oldScrollPos = $(window).scrollTop();

    $(window).on('scroll.scrolldisabler',function ( event ) {
       $(window).scrollTop( window.oldScrollPos );
       event.preventDefault();
    });
};

$.fn.enableScroll = function() {
    $(window).off('scroll.scrolldisabler');
};

  $(document).on('click', '.close-modal, .page-overlay, .nav-li', function(t) {
    if($(".mobile-menu-btn").is(":visible")) {
      $("body").enableScroll();
      $(".page-overlay").fadeOut(300);
      $(".left-banner").fadeOut(300).addClass("is-mobile");
      setTimeout(() => {
        $("zd-hc-navbar").css("z-index", "2147483646");
      }, 100);
    }
  });

  $(document).on('click', '.mobile-menu-btn', function(t) {
    if($(".mobile-menu-btn").length > 0) {
      $("body").disableScroll();
      $(".page-overlay").fadeIn(300);
      $(".left-banner").fadeIn(300).removeClass("is-mobile");
      setTimeout(() => {
        $("#left-banner").scrollTop(0);
        $("zd-hc-navbar").css("z-index", "99");
      }, 10);
    }
  });

 $(window).resize(function() {
  if ($(window).width() < 992) {
    $("body").enableScroll();
    $(".mobile-menu-btn").fadeIn(0);
    $(".page-overlay").fadeOut(0);
    $(".left-banner").fadeOut(0).addClass("is-mobile");
    $("body").addClass("is-mobile");
    if($("body").hasClass("is-mobile")) {
        $("zd-hc-navbar").css("z-index", "2147483646");
    }
  } else {
    $("body").enableScroll();
    $(".mobile-menu-btn").fadeOut(0);
    $(".page-overlay").fadeOut(0);
    $(".left-banner").fadeIn(0).removeClass("is-mobile");
    $("body").removeClass("is-mobile");
    if($("body").hasClass("is-mobile")) {
        $("zd-hc-navbar").css("z-index", "99");
    }
  }
});

$(document).ready(function () {
  var uname;
  if (HelpCenter.user.name === null) {
    uname = "Redfinian";
  } else {
    uname = HelpCenter.user.name.split(" ")[0];
  }
  
  $("#username").html(`Hey ${uname}`);
          
  $("header.header").after(
  `
    <div class="app-header">
      <div class="content-padding">
        <div class="left-panel">
            <button class="mobile-menu-btn">
            <span class="material-icons">menu</span>
          </button>
        </div>
        <div class="right-panel">
                      <div class="search-container"></div>
                  </div>
      </div>
    </div>
  `);

  $("html").prepend(
  `
    <div id="left-banner" class="left-banner">
        <div class="fin-page-info">
        <div class="fin-page-innerInfo">
          <h1 id="page-title">&nbsp;</h1>
          <span id="update-status"></span>
        </div>
        <span class="material-icons close-modal" aria-label="Close">close</span>
      </div>
      <div class="nav-container">
        <div id="nav-list-header"></div>
        <ul id="nav-list"></ul>
      </div>
      </div>
  `);
  
     $("#page-title").html(pageTitle);
  $("#mobile-title").html(pageTitle);
  $(".article-meta").appendTo("#update-status");
  $(".sub-nav form[role='search']").appendTo(".search-container");
  
  //Generate Search Bar
  $("#nav-list-header").append(
    `
        <div id="search-contents" class="search-form-container">
        <div id="search-bar">
          <input type="type" id="actualsearch" autocomplete="off" aria-hidden="true">
          <form id="cd-search" class="search" role="search" aria-label="Sitewide" spellcheck="false">
            <input type="search" id="search" placeholder="Search for content" aria-label="Search" autocomplete="off">
            <button id="clear-btn" type="button" class="css-clear" aria-label="Clear search"">
              <span class="material-icons">close</span>
            </button>
          </form>
          <div class="search-bg">
            <div class="search-results-container" role="region">
              <div id="scrollDiv" class="search-results" tabindex="-1">
                <div id="search-splash-screen">
                  <img src="/hc/article_attachments/12576203857563" alt="">
                  <h2>Search for content</h2>
                  <p>Type a character to start searching for content.</p>
                </div>
                <div class="sr-announcement" aria-live="polite">
                  <h2 class="search-input-text"></h2>
                </div>
                <div class="loader-container">
                  <div class="loader"></div>
                </div>
                <ul class="search-results-list"></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  )
  
  let navItems = [];

  const sectionItems = document.querySelectorAll('.section-content-ws');
  sectionItems.forEach(function(item) {
      let img = item.getAttribute("data-img");
      let title = item.getAttribute("data-title");
      let type = item.getAttribute("data-type");
      let duration = item.getAttribute("data-duration");
      let icon = item.getAttribute("data-icon");
      let bgPosition = item.getAttribute("data-img-position");
      let navData = {
          img: img,
          title: title,
          type: type,
          duration: duration,
          icon: icon,
          bgPosition: bgPosition
      };
      navItems.push(navData);
  });
  
  navItems.forEach((el, index) => {
    $("#nav-list").append(
      `
        <li class="nav-li ${index === 0 ? 'module-overview' : ''}" data-id="section${index + 1}" data-title="${el.title}">
            <a class="nav-links mobile-links" data-img=${el.img} data-section=${index + 1} href=#section${index + 1}>
              <span class="nav-link-innerContainer">
                <span class="nav-link-content">
                <span class="heading-type">
                                      <span class="material-icons-outlined">${el.icon}</span> section ${index + 1}: ${el.type}
                                  </span>
                  <h2>${el.title}</h2>
              </span>
                          </span>
                      </a>
        </li>
      `
    );
  });
  
  //Generate FAQ counts
  $(".faq-counter-id").each(function(index) {
    var getFAQid = $(this).attr("data-id");
    var getFAQLength = $(`.${getFAQid}`).length;
    $(this).html(`(${getFAQLength})`);
  });
  
  //Generate Unique IDs, fetch background images, and generate footer nav
  $(".section-content-ws").each(function(index) {
    const lastSectionID = navItems.length - 1;
    $(this).attr("data-id", `section${index + 1}`);
    $(this).attr("data-index", `${index + 1}`);
    $(this).attr("data-img", `${navItems[index].img}`);
    $(this).attr("data-title", `${navItems[index].title}`);
    $(this).attr("data-type", `${navItems[index].type}`);
    $(this).find(".content-background-img").css({"background-image": `url(${navItems[index].img})`, "background-position": `${navItems[index].bgPosition}`}).attr("data-img", `${navItems[index].img}`);
    $(this).find(".share-btn-container").append(
      `
          <button class="button primary copy-link" data-id="section${index + 1}">Share Section</button>
      `
    )
    $(this).find(".heading-section").prepend(navItems[index].title);
    $(this).find(".heading-type").prepend(`${navItems[index].duration} • ${navItems[index].type}`);
    if($(this).attr("id") === "has-special-style") {
        $(this).find(".content-background-img").css({"background-size": "contain", "background-color": "var(--primary)"});
    }
    
    if(index === 0 && navItems.length > 1) {
      $(this).find(".footer-nav").html(
        `
            <div class="col-12 col-next no-padding">
              <a class="next-btn bottom-nav-btn" data-id="section2" href="#section2">
                  <div class="footer-content right-footer">
                  <div class="next-nav-icon">
                    <span class="material-icons">arrow_forward</span>
                 </div>
                 <div class="footer-label">Next <span class="section-nav-text">Section<span></div>
                  <div id="next-txt" class="footer-lessonTitle">${navItems[1].title}</div>
              </div>
            </a>
          </div>
        `
      );
    };
    
    if(index != 0 && index != lastSectionID) {
      $(this).find(".footer-nav").html(
        `
            <div class="col-6 col-prev no-padding">
              <a class="prev-btn bottom-nav-btn" data-id="section${index}" href="#section${index}">
                  <div class="footer-content left-footer">
                  <div class="prev-nav-icon">
                    <span class="material-icons">arrow_backward</span>
                 </div>
                 <div class="footer-label">Previous <span class="section-nav-text">Section<span></div>
                  <div id="prev-txt" class="footer-lessonTitle">${navItems[index - 1].title}</div>
              </div>
            </a>
          </div>
            <div class="col-6 col-next no-padding">
              <a class="next-btn bottom-nav-btn" data-id="section${index + 2}" href="#section${index + 2}">
                  <div class="footer-content right-footer">
                  <div class="next-nav-icon">
                    <span class="material-icons">arrow_forward</span>
                 </div>
                 <div class="footer-label">Next <span class="section-nav-text">Section<span></div>
                  <div id="next-txt" class="footer-lessonTitle">${navItems[index + 1].title}</div>
              </div>
            </a>
          </div>
        `
      );
    }
    
    if(index === lastSectionID && navItems.length > 1) {
      $(this).find(".footer-nav").html(
        `
            <div class="col-12 col-prev no-padding">
              <a class="prev-btn bottom-nav-btn" style="border-right: 0;" data-id="section${lastSectionID}" href="#section${lastSectionID}">
                  <div class="footer-content left-footer">
                  <div class="prev-nav-icon">
                    <span class="material-icons">arrow_backward</span>
                 </div>
                 <div class="footer-label">Previous <span class="section-nav-text">Section<span></div>
                  <div id="prev-txt" class="footer-lessonTitle">${navItems[lastSectionID - 1].title}</div>
              </div>
            </a>
          </div>
        `
      );
    }         

  });
  
  // Fade in Content
  var timer = null;
  var lastNavIndex = 0;
  var currentNavIndex = 0;
  function fadeInContent(navDirection) {
    var findActiveID = $(".nav-li.active").attr("data-id");
    timer = setTimeout(function() {
      if(navDirection) {
        $(`.main-content .section-content-ws[data-id=${findActiveID}]`).addClass("active-section").css({"transform":"translateX(100vw)", "position":"relative"});
      } else {
        $(`.main-content .section-content-ws[data-id=${findActiveID}]`).addClass("active-section").css({"transform":"translateX(-100vw)", "position":"relative"});
      }
      setTimeout(() => {
        $(`.main-content .section-content-ws[data-id=${findActiveID}]`).fadeIn(400, "linear").css({"transform":"translateX(0)", "position":"relative"});
        $(`.main-content .section-content-ws[data-id=${findActiveID}]`).addClass("active-section");
      }, 25);
    }, 400);
  }
       
  $(document).on('click', '.nav-li', function(t) {
    if ($(this).hasClass("active")) {
      //Do nothing - the link is already active
    } else {
      currentNavIndex = $(".nav-li.active").children(".nav-links").attr("data-section");
      lastNavIndex = $(this).children(".nav-links").attr("data-section");
      window.scrollTo({top: 0, behavior: 'smooth'});
      setTimeout(() => {
        if(currentNavIndex < lastNavIndex) {
          $(".section-content-ws.active-section").css({"transform":"translateX(-100vw)", "position":"absolute" });
        } else {
          $(".section-content-ws.active-section").css({"transform":"translateX(100vw)", "position":"absolute" });
        }
        $(".section-content-ws.active-section").removeClass("active-section").fadeOut(400, "linear");
        $(".nav-li").removeClass("active");
        $(this).addClass("active");
        clearTimeout(timer);
        fadeInContent(currentNavIndex < lastNavIndex);
      }, 150);
    }
  });

  // LA Share
  var storeButtonText;
  $(document).on('click', '.copy-link', function(t) {
    var getAnchorLink = $(this).attr("data-id");
    var cleanURL = window.location.href.split("#")[0];
    storeButtonText = $(this).html();

    navigator.clipboard.writeText(cleanURL + "#" + getAnchorLink);
    $(this).html("Copied to Clipboard");
    $(this).css("pointer-events", "none");
    setTimeout(() => {
      $(this).css("pointer-events", "auto");
      $(this).html(storeButtonText);
    }, 2000);
  });
  
  // Detect if a direct section is linked
  var getBrowserURL = window.location.href;
  var getWdStepsTag = getBrowserURL.split('#')[1];
  var wdTagLowerCase;
  if(getWdStepsTag !== undefined) {
      wdTagLowerCase = getWdStepsTag.toString().toLowerCase();
  }
  
  if($(`.nav-li[data-id=${wdTagLowerCase}]`).length && wdTagLowerCase !== undefined) {
    $(`.nav-li[data-id=${wdTagLowerCase}]`).click();
    fadeInContent();
  } else {
    $(".module-overview").click();
    fadeInContent();
  }

  if ($(window).width() < 992) {
    $("body").enableScroll();
    $(".mobile-menu-btn").fadeIn(0);
    $(".page-overlay").fadeOut(0);
    $(".left-banner").fadeOut(0).addClass("is-mobile");
    $("body").addClass("is-mobile");
  } else {
    $("body").enableScroll();
    $(".mobile-menu-btn").fadeOut(0);
    $(".page-overlay").fadeOut(0);
    $(".left-banner").fadeIn(0).removeClass("is-mobile");
    $("body").removeClass("is-mobile");
  }
  
  //Search Code
  var timeout = null;
  (function () {
    var textInput = document.getElementById('search');
    var resultFocus = document.getElementById('search');
    var clearBtn = document.getElementById('clear-btn');
    
    $("#cd-search").submit(function() {
       return false;
    });

    $("#search").on('keyup', function(e) {
      if (e.keyCode == 13 || e.keyCode == 9 || e.keyCode == 16 || e.keyCode == 18 || e.keyCode == 17 || e.keyCode == 20) {
        return false;
      } else if ( e.keyCode == 27 ) {
        $(this).blur();
        var context = document.querySelector(".main-content");
        var instance = new Mark(context);
        instance.unmark();
        document.getElementById('actualsearch').value = ''
        document.getElementById('search').value = ''
        document.getElementsByClassName("search-bg")[0].style.opacity = "0";
        document.getElementsByClassName("search-bg")[0].style.visibility = "hidden";
        document.getElementById("search-contents").classList.remove("active-search");
        setTimeout(function(){ document.getElementsByClassName("left-banner")[0].style.overflowY = "auto"; }, 100);
        setTimeout(function(){ $(".css-clear").css("visibility", "hidden"); }, 100);

        $(".search-results-list").empty();
        $(".result_item").remove();
        $(".search-sections").remove();

        return false;
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          $("#actualsearch").val("");
          $("#search").focus();
          isSearching = true;
          startsearch();
          $(".search-results .loader-container").show();
        }, 500);
      }
    });

  resultFocus.addEventListener('focusin', (event) => {
    document.getElementsByClassName("left-banner")[0].scrollTo(0,0);
    startsearch();
    setTimeout(function(){ document.getElementById('scrollDiv').scrollTo(0,0) }, 50);
    document.getElementById("actualsearch").value = ''
    document.getElementsByClassName("search-bg")[0].style.opacity = "1";
    document.getElementsByClassName("search-bg")[0].style.visibility = "visible";
    document.getElementsByClassName("left-banner")[0].style.overflowY = "hidden";
    document.getElementById("search-contents").classList.add("active-search");
    $(".css-clear").css("visibility", "visible");
  });

  clearBtn.addEventListener('click', (event) => {
    document.getElementById('actualsearch').value = ''
    document.getElementById('search').value = ''
    document.getElementsByClassName("search-bg")[0].style.opacity = "0";
    document.getElementsByClassName("search-bg")[0].style.visibility = "hidden";
    document.getElementsByClassName("left-banner")[0].style.overflowY = "auto";
    document.getElementById("search-contents").classList.remove("active-search");
    $(".css-clear").css("visibility", "hidden");
    $(".search-results-list").empty();
    $(".result_item").remove();
    $(".search-sections").remove();
    var context = document.querySelector(".main-content");
    var instance = new Mark(context);
    instance.unmark();
  });

  document.getElementById('nav-list').addEventListener('focusin', (event) => {
    document.getElementById('actualsearch').value = ''
    document.getElementsByClassName("search-bg")[0].style.opacity = "0";
    document.getElementsByClassName("search-bg")[0].style.visibility = "hidden";
    document.getElementById("search-contents").classList.remove("active-search");
    setTimeout(function(){ document.getElementsByClassName("left-banner")[0].style.overflowY = "auto"; }, 100);
    if ($("#search").val().length == 0) {
      setTimeout(function(){ $(".css-clear").css("visibility", "hidden"); }, 100);
    }
    clearTimeout(timeout);
  });

  function startsearch() {
      document.getElementById('actualsearch').value = ''
      var $input = $("#actualsearch");
      $input.val($input.val() + textInput.value).trigger("keyup");
    }
  })();


  $("#actualsearch").on('paste keyup change', function() {
     var searchinput = $("#actualsearch").val();
      $(".search-sections").remove();
    if(isSearching) {
      $(".search-results-list").empty();
      $(".result_item").remove();

      var markInstance = new Mark(document.querySelectorAll(".highlightable"));
      var keywordInput = document.querySelector("#search");

      function performMark() {
        var keyword = keywordInput.value;

        markInstance.unmark({
          done: function(){
            markInstance.mark(keyword);
          }
        });
      };
      performMark();

      $(".section-content-ws").each(function(index) {
        var highlightLength = $(this).find("mark").length;
        var dataIndex = $(this).attr("data-index");
        var dataImg = $(this).attr("data-img");
        var datatitle = $(this).attr("data-title");
        var dataType = $(this).attr("data-type");
        var getActiveElm = $(".nav-li.active").attr("data-id");
        var compareRender = "section" + $(this).attr("data-index");
        if(highlightLength > 0) {
          $(".search-results-list").append(
            '<li class="results-lists__item item ' + `${getActiveElm === compareRender ? "active" : ""}` + '">' +
              '<a href="#" class="result_item lesson-result__info"' + 'data-id="section' + dataIndex + '"</a>' +
                '<div class="results-content-info">' +
                  '<div class="nav-link-innerContainer">' +
                    '<span class="content-background-img-container">' +
                      '<span class="nav-background" style="background-image: url(' + dataImg + ');"></span>' +
                      '<span class="animated-background placeholder-nav"></span>' +
                    '</span>' +
                    '<div class="nav-link-content">' +
                                '<span class="heading-type">' + 'section ' + dataIndex + ': ' + dataType + '</span>' +
                      '<h2>' + datatitle + '</h2>' +
                                '<p class="highlight-length">' + highlightLength + ' ' + `${highlightLength === 1 ? 'result' : 'results'}` + '</p>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</a>' +
            '</li>'
            )
        }
      }).promise().done( function(){ 
        setTimeout(function(){
          $(".search-results .loader-container").fadeOut(300);
            timeout = setTimeout(function () {
              $('.search-results-list .item').each(function(i, el) {
                  setTimeout(function() {
                    $(el).addClass('floatInUpResults');
                  }, i * 100);
              });
            }, 300);
        }, 300);
      } );
      isSearching = false;
        }

      var divCount1 = $(".search-results").find(".result_item").length;
      if (divCount1 == 0 && searchinput.length == 0) {
        $(".search-input-text").hide();
        $("#search-splash-screen").show();
      }
      if (divCount1 == 0 && searchinput.length >= 1 ) {
        $("#search-splash-screen").hide();
        $(".search-input-text").show();
        if ($(".no-results-img").length > 0) {
          $("#search-query").html('"' + searchinput + '"');
        } else {
          $(".search-input-text").html(
            `
                <img class="no-results-img character-img" src="/hc/article_attachments/12576157358747" alt="">
                <span class='nr-title'>We couldn't find a match for <b id="search-query">"${searchinput}"</b>.</span>
                Please make sure your keywords are spelled correctly, or try rephrasing and using less specific keywords.
              `
          );
        }
      } else if (divCount1 == 1 && searchinput.length >= 1) {
        $("#search-splash-screen").hide();
        $(".sr-announcement").prepend('<h2 class="search-sections">' + divCount1 + ' Result Found</h2>')
        $(".search-input-text").hide();
        $(".search-input-text").empty();
      } else if (divCount1 > 1 && searchinput.length >= 1) {
        $("#search-splash-screen").hide();
        $(".sr-announcement").prepend('<h2 class="search-sections">' + divCount1 + ' Results Found</h2>')
        $(".search-input-text").hide();
        $(".search-input-text").empty();
      }
    });
  
  $(document).on('click', '.result_item, .bottom-nav-btn', function(t) {
    var getClickedID = $(this).attr("data-id");
    $(".results-lists__item.item").removeClass("active");
    $(`.result_item[data-id="${getClickedID}"]`).parent().addClass("active");
    $(`.nav-li[data-id="${getClickedID}"]`).find(".nav-links").click();
  });
  
  const items = document.querySelectorAll(".accordion button");

  function toggleAccordion() {
    const itemToggle = this.getAttribute('aria-expanded');

    for (i = 0; i < items.length; i++) {
      items[i].setAttribute('aria-expanded', 'false');
      items[i].parentNode.classList.remove("clicked")

    }

    if (itemToggle == 'false') {
      this.setAttribute('aria-expanded', 'true');
      this.parentNode.classList.add("clicked");
    }
  }

  items.forEach(item => item.addEventListener('click', toggleAccordion));
  
  setTimeout(() => {
      $(".wrap").fadeOut("400");
    $("body").css("overflow-y", "auto");
  }, 300);
});