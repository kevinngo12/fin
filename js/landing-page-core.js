			var welcomeText = "";
			var uname;
      if (HelpCenter.user.name === null) {
        uname = "Redfinian";
      } else {
        uname = HelpCenter.user.name.split(" ")[0];
      }
      const greeting = document.getElementById("greeting");
      const hour = new Date().getHours();
      const welcomeTypes = ["Good morning", "Good afternoon", "Good evening"];
      if (hour < 12) welcomeText = welcomeTypes[0];
      else if (hour < 18) welcomeText = welcomeTypes[1];
      else welcomeText = welcomeTypes[2];
      $("#welcome-message").text(welcomeText + ' ' + uname);

      $("#module-info").html(`${resources.length} ${resources.length === 1 ? ' Resource' : ' Resources'}`);
      
      $.each( resources, function( i, el ) {
        $("#render-training-modules").append(`
        	<div id=${el.finId} class="col-12 col-md-6 col-lg-6 col-xl-${contentGrid} item">
            <a class="resource-card" href="" target="_blank" rel="noopener noreferrer">
              <div class="resource-card-badges"></div>
            	<div class="background-img" style="background-image: url('${el.img}')">
    					</div>
              <div class="resource-card-content">
              	<div class="resource-content-inner">
                	<span class="read-time"></span>
                  <h3></h3>
                  <div class="article-info">
                  </div>
                </div>
    					</div>
            </a>
          </div>
        `)
      });
      
    var $root = $('html, body'); 
    $(document).on("click", "#view-content-btn", function() {
        var containerWrap = $root;
        var scrollTo = $("#course-content-container");
        containerWrap.animate({
            scrollTop: scrollTo.offset().top - 75
        }, 300);

        return false;
    });

    var storeButtonText;
    $(document).on("click", "#share-button", function() {
        var cleanURL = window.location.href;
      	storeButtonText = $(this).html();

        navigator.clipboard.writeText(cleanURL);
        $(this).html("Copied to Clipboard");
        $(this).css("pointer-events", "none");
        setTimeout(() => {
          $(this).css("pointer-events", "auto");
          $(this).html(storeButtonText);
        }, 2000);
    });
     
      const subdomain = 'fin.redfin.com';
      const zendeskApiUrl = `https://${subdomain}/api/v2/help_center/articles/{{articleId}}.json`;
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      function formatDateToMonthYear(dateTimeString) {
        const date = new Date(dateTimeString);
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${month} ${year}`;
      }

      function formatDateToMonthDayYear(dateTimeString) {
        const date = new Date(dateTimeString);
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
      }
      
      function calculateReadTime(text) {
        const wordsPerMinute = 300;
        const wordCount = text.replace(/<\/?[^>]+(>|$)/g, "").split(/\s+/).length;
        const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

        return readTimeMinutes;
      }
      
      const articlesPromises = resources.map(function(resource) {
        return new Promise(function(resolve, reject) {
          const articleId = resource.finId;
          const articleUrl = zendeskApiUrl.replace('{{articleId}}', articleId);

          $.ajax({
            url: articleUrl,
            type: 'GET',
            dataType: 'json',
            success: function(response) {
              const article = response.article;
              const updatedDate = formatDateToMonthDayYear(article.updated_at);
              const estimatedReadTime = calculateReadTime(article.body);
              if(article.title.length > 0) {
              	$(`#${articleId}`).find("h3").html(article.title);
                $(`#${articleId}`).find("a").attr("href", article.html_url);
                $(`#${articleId}`).find(".read-time").html(`${estimatedReadTime} min read`);
                $(`#${articleId}`).find(".article-info").append(`<div class="article-info-item"><span class="bold-700">Updated: </span>${updatedDate}</div>`);
                resource.title = article.title;
              } else {
                // In the event there's no article title, default is "Fin Article"
              	$(`#${articleId}`).find("h3").html('Fin Article');
                resource.title = 'Fin Article';
              }
              resource.upVote = article.vote_sum;
              resource.duration = estimatedReadTime;
              resource.link = article.html_url;
              resource.updatedDate = updatedDate;
              resolve(article);
            },
            error: function(xhr, status, error) {
              console.error(`Error fetching article ${articleId}:`, error);
              reject(error);
            }
          });
        });
      });
      
      Promise.all(articlesPromises)
        .then(function(articles) {
          console.log(`Fetched ${articles.length} articles.`);
          allArticlesFetched();
        })
        .catch(function(error) {
          console.error('Error fetching articles:', error);
          allArticlesFetched();
        });

      var options = {
        shouldSort: true,
        isCaseSensitive: false,
        includeScore: false,
        includeMatches: false,
        findAllMatches: false,
        threshold: 0.45,
        location: 0,
        distance: 500,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        useExtendedSearch: false,
        keys: [{
          name: 'title',
          weight: 0.75
        }, {
          name: 'tags',
          weight: 0.4
        }]
      };
      var fuse;
      
      function allArticlesFetched() {
        $(".wrap").fadeOut("400");
        let mostRecentDate = new Date(0);
        let mostRecentFinId = "";
        let highestUpVote = -1;
        let mostPopularFinId = "";

        resources.forEach(data => {
          const updatedDate = new Date(data.updatedDate);
          if (updatedDate > mostRecentDate) {
            mostRecentDate = updatedDate;
            mostRecentFinId = data.finId;
          }
        });
        
        resources.forEach(data => {
          data.mostRecent = data.finId === mostRecentFinId;
        });
        
        $(`#${mostRecentFinId}`).find(".resource-card-badges").append(`<span class="primary-badge rd-badge">Recent</span>`);

        resources.forEach(data => {
          if (data.upVote > highestUpVote) {
            highestUpVote = data.upVote;
            mostPopularFinId = data.finId;
          }
        });

        resources.forEach(data => {
          data.mostPopular = data.finId === mostPopularFinId;
        });
        
        $(`#${mostPopularFinId}`).find(".resource-card-badges").append(`<span class="secondary-badge rd-badge">Popular</span>`);
        
        fuse = new Fuse(resources, options);
      }

      function startsearch() {
        $(".loading-body").fadeIn(200);
        document.getElementById('actualsearch').value = '';
        var $input = $("#actualsearch");
        $input.val($input.val() + textInput.value).trigger("keyup");
      }
      
      var timeout = null;
      var isSearching = false;
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
          if($("#actualsearch").val().length > 0) {
            isSearching = true;
            startsearch();
          }
          document.getElementById('actualsearch').value = ''
          document.getElementById('search').value = ''
          $(".css-clear").css("visibility", "hidden");
          return false;
        } else {
          clearTimeout(timeout);
      		timeout = setTimeout(function () {
        		$("#actualsearch").val("");
        		$("#search").focus();
            isSearching = true;
            startsearch();
          }, 500);
        }
      });

      resultFocus.addEventListener('focusin', (event) => {
        $(".css-clear").css("visibility", "visible");
      });

      clearBtn.addEventListener('click', (event) => {
        if($("#actualsearch").val().length > 0) {
          isSearching = true;
          startsearch();
        }
        document.getElementById('actualsearch').value = ''
        document.getElementById('search').value = ''
        $(".css-clear").css("visibility", "hidden");
      });
      
      var flattenedResults
      $( "#actualsearch" ).on('paste keyup change', function() {
        timeout = setTimeout(function () {
          var searchinput = $("#actualsearch").val();
          var $searchbar = $('#actualsearch');
          var result = fuse.search($searchbar.val());
          if(searchinput.length === 0) {
            flattenedResults = resources;
          } else {
            flattenedResults = result.flatMap(obj => obj.item);
          }
          if(isSearching) {
            $("#render-training-modules").empty();
            $("#no-results").hide();
            if(flattenedResults.length > 0) {
              flattenedResults.forEach(function(el, index)	{
                $("#render-training-modules").append(`
                  <div id=${el.finId} class="col-12 col-md-6 col-lg-6 col-xl-${contentGrid} item">
                    <a class="resource-card" href="${el.link}" target="_blank" rel="noopener noreferrer">
                      <div class="resource-card-badges">
                        ${el.mostPopular === true ? '<span class="secondary-badge rd-badge">Popular</span>' : ''}
                        ${el.mostRecent === true ? '<span class="primary-badge rd-badge">Recent</span>' : ''}
                      </div>
                      <div class="background-img" style="background-image: url('${el.img}')"></div>
                      <div class="resource-card-content">
                        <div class="resource-content-inner">
                        	<span class="read-time">${el.duration} min read</span>
                          <h3>${el.title}</h3>
                          <div class="article-info">
                            <div class="article-info-item"><span class="bold-700">Updated: </span>${el.updatedDate}</div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                `);
              });
            } else {
              $("#render-training-modules").html(
                '<div id="no-results">' +
                '<svg xmlns:xlink="http://www.w3.org/1999/xlink" class="no-results-svg" viewBox="0 0 145 141" xmlns="http://www.w3.org/2000/svg"><defs><path id="c" d="M10.075 1.963c-.99-.712-2.832-.85-4.23.849-1.396-1.7-3.238-1.561-4.228-.849-.99.713-1.453 2.21-.883 3.635.739 1.844 4.483 4.68 5.042 5.096a.113.113 0 00.14 0c.563-.417 4.354-3.276 5.04-5.096.542-1.435.108-2.922-.881-3.635"></path><path id="e" d="M18.453 5.32c.843 0 1.677.252 2.289.69 1.264.91 2.075 3.074 1.177 5.451-.9 2.387-5.664 6.625-9.162 9.324-3.466-2.687-8.206-6.922-9.183-9.363-.919-2.296-.071-4.501 1.192-5.411.612-.44 1.446-.692 2.29-.692 1.039 0 2.587.377 4.06 2.168l1.639 1.993 1.638-1.993c1.473-1.792 3.021-2.168 4.06-2.168m0-2.127c-1.86 0-3.94.804-5.698 2.942-1.759-2.138-3.839-2.942-5.7-2.942-1.365 0-2.613.433-3.527 1.091-2.16 1.555-3.17 4.823-1.926 7.93 1.61 4.025 9.78 10.213 11 11.12.094.07.21.07.304 0 1.23-.91 9.502-7.15 11-11.12 1.182-3.13.234-6.375-1.925-7.93-.915-.658-2.163-1.091-3.528-1.091"></path><path id="i" d="M10.075 1.963c-.99-.712-2.832-.85-4.23.849-1.396-1.7-3.238-1.561-4.228-.849-.99.713-1.453 2.21-.883 3.635.739 1.844 4.483 4.68 5.042 5.096a.113.113 0 00.14 0c.563-.417 4.354-3.276 5.04-5.096.542-1.435.108-2.922-.881-3.635"></path><path id="k" d="M18.453 5.32c.843 0 1.677.252 2.289.69 1.264.91 2.075 3.074 1.177 5.451-.9 2.387-5.664 6.625-9.162 9.324-3.466-2.687-8.206-6.922-9.183-9.363-.919-2.296-.071-4.501 1.192-5.411.612-.44 1.446-.692 2.29-.692 1.039 0 2.587.377 4.06 2.168l1.639 1.993 1.638-1.993c1.473-1.792 3.021-2.168 4.06-2.168m0-2.127c-1.86 0-3.94.804-5.698 2.942-1.759-2.138-3.839-2.942-5.7-2.942-1.365 0-2.613.433-3.527 1.091-2.16 1.555-3.17 4.823-1.926 7.93 1.61 4.025 9.78 10.213 11 11.12.094.07.21.07.304 0 1.23-.91 9.502-7.15 11-11.12 1.182-3.13.234-6.375-1.925-7.93-.915-.658-2.163-1.091-3.528-1.091"></path><path id="o" d="M9.489 1.845c-.933-.67-2.667-.8-3.983.798-1.316-1.598-3.05-1.467-3.983-.798C.59 2.515.155 3.923.692 5.262c.695 1.734 4.222 4.4 4.748 4.79.04.03.091.03.131 0 .531-.392 4.102-3.08 4.749-4.79.51-1.35.101-2.747-.831-3.417"></path><filter id="a" width="113.1%" height="114.7%" x="-3.9%" y="-4.4%" filterUnits="objectBoundingBox"><feMorphology in="SourceAlpha" operator="dilate" radius="1" result="shadowSpreadOuter1"></feMorphology><feOffset dx="4" dy="4" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset><feComposite in="shadowOffsetOuter1" in2="SourceAlpha" operator="out" result="shadowOffsetOuter1"></feComposite><feColorMatrix in="shadowOffsetOuter1" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.5 0"></feColorMatrix></filter><filter id="g" width="113.1%" height="114.7%" x="-3.9%" y="-4.4%" filterUnits="objectBoundingBox"><feMorphology in="SourceAlpha" operator="dilate" radius="1" result="shadowSpreadOuter1"></feMorphology><feOffset dx="4" dy="4" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset><feComposite in="shadowOffsetOuter1" in2="SourceAlpha" operator="out" result="shadowOffsetOuter1"></feComposite><feColorMatrix in="shadowOffsetOuter1" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.5 0"></feColorMatrix></filter><filter id="m" width="113.1%" height="114.7%" x="-3.9%" y="-4.4%" filterUnits="objectBoundingBox"><feMorphology in="SourceAlpha" operator="dilate" radius="1" result="shadowSpreadOuter1"></feMorphology><feOffset dx="4" dy="4" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset><feComposite in="shadowOffsetOuter1" in2="SourceAlpha" operator="out" result="shadowOffsetOuter1"></feComposite><feColorMatrix in="shadowOffsetOuter1" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.5 0"></feColorMatrix></filter><rect id="b" width="76.44" height="68.09" x="0" y="0" rx="2"></rect><rect id="h" width="76.44" height="68.09" x="0" y="0" rx="2"></rect><rect id="n" width="76.44" height="68.09" x="0" y="0" rx="2"></rect></defs><g fill="none" fill-rule="evenodd"><ellipse cx="70.07" cy="70.22" fill="#f5f2ed" rx="70.07" ry="70.22"></ellipse><g transform="rotate(-22 106.51 7.481)"><use fill="#000" filter="url(#a)" xlink:href="#b"></use><rect width="77.44" height="69.09" x="-.5" y="-.5" fill="#F5F5F5" stroke="#8b5d50" rx="2"></rect><g opacity=".52" transform="translate(61.388 1.993)"><mask id="d" fill="#fff"><use xlink:href="#c"></use></mask><use fill="#585858" xlink:href="#c"></use><g fill="var(--primary)" mask="url(#d)"><path d="M0 0h11.68v11.7H0z"></path></g></g><g transform="translate(24.856 13.916)"><mask id="f" fill="#fff"><use xlink:href="#e"></use></mask><use fill="#585858" xlink:href="#e"></use><g fill="#1A5D88" mask="url(#f)"><path d="M0 0h25.48v25.53H0z"></path></g></g><path fill="#FFF" d="M0 51.066h76.444V66.09a2 2 0 01-2 2H2a2 2 0 01-2-2V51.066z"></path><rect width="14.86" height="1.06" x="46.72" y="51.07" fill="#8b5d50" rx=".53"></rect><rect width="6.37" height="1.06" x="65.83" y="51.07" fill="var(--accent7)" rx=".53"></rect><path fill="#8b5d50" d="M0 51.066h41.937a.532.532 0 010 1.064H0v-1.064z"></path></g><g transform="rotate(-9 233.569 -181.718)"><use fill="#000" filter="url(#g)" xlink:href="#h"></use><rect width="77.44" height="69.09" x="-.5" y="-.5" fill="#F5F5F5" stroke="#8b5d50" rx="2"></rect><g opacity=".52" transform="translate(61.39 2.707)"><mask id="j" fill="#fff"><use xlink:href="#i"></use></mask><use fill="#585858" xlink:href="#i"></use><g fill="var(--primary)" mask="url(#j)"><path d="M0 0h11.68v11.7H0z"></path></g></g><g transform="translate(24.856 13.916)"><mask id="l" fill="#fff"><use xlink:href="#k"></use></mask><use fill="#585858" xlink:href="#k"></use><g fill="#1A5D88" mask="url(#l)"><path d="M0 0h25.48v25.53H0z"></path></g></g><path fill="#FFF" d="M0 51.066h76.444V66.09a2 2 0 01-2 2H2a2 2 0 01-2-2V51.066z"></path><rect width="14.86" height="1.06" x="46.72" y="51.07" fill="#8b5d50" rx=".53"></rect><rect width="6.37" height="1.06" x="65.83" y="51.07" fill="var(--accent7)" rx=".53"></rect><path fill="#8b5d50" d="M0 51.066h41.937a.532.532 0 010 1.064H0v-1.064z"></path></g><g transform="translate(52.025 42.555)"><use fill="#000" filter="url(#m)" xlink:href="#n"></use><rect width="77.44" height="69.09" x="-.5" y="-.5" fill="#F5F5F5" stroke="#8b5d50" rx="2"></rect><path fill="#8b5d50" d="M45.654 20.615l-2.123-1.654v-1.727h2.123v3.381zm0 13.642h-4.247v-6.118a.266.266 0 00-.265-.266h-5.84a.266.266 0 00-.265.266v6.118H30.79V23.31l7.432-5.793 7.432 5.793v10.946zm-6.37 0H37.16V30h2.124v4.256zm8.858-11.703l-.364-.283v-6.898a.266.266 0 00-.266-.266h-5.84a.266.266 0 00-.265.266v1.933l-3.022-2.356a.264.264 0 00-.325 0l-9.758 7.604h-.445a.251.251 0 00-.252.244v1.64c0 .134.114.244.246.244h.816v11.436c0 .147.119.266.265.266h18.58a.266.266 0 00.266-.266V24.682h.815a.249.249 0 00.246-.245v-1.64a.246.246 0 00-.251-.243h-.446z"></path><path fill="#FFF" d="M0 51.066h76.444V66.09a2 2 0 01-2 2H2a2 2 0 01-2-2V51.066z"></path><rect width="14.86" height="1.06" x="46.72" y="51.07" fill="#8b5d50" rx=".53"></rect><rect width="6.37" height="1.06" x="65.83" y="51.07" fill="var(--accent7)" rx=".53"></rect><path fill="#8b5d50" d="M0 51.066h41.937a.532.532 0 010 1.064H0v-1.064z"></path></g><g fill="#8b5d50" stroke="#8b5d50" stroke-width=".5" transform="scale(-1 1) rotate(-45 -26.624 200.835)"><rect width="1.06" height="10.64" x="7.43" rx=".53"></rect><path d="M15.524 7.318a.533.533 0 010 .752l-3.754 3.762a.53.53 0 01-.75 0 .533.533 0 010-.752l3.753-3.762a.53.53 0 01.75 0zm-15.122 0a.53.53 0 01.75 0l3.755 3.762a.532.532 0 01-.751.752L.402 8.07a.532.532 0 010-.752z"></path></g><g opacity=".52" transform="translate(113 46)"><mask id="p" fill="#fff"><use xlink:href="#o"></use></mask><use fill="#585858" xlink:href="#o"></use><g fill="var(--primary)" mask="url(#p)"><path d="M0 0h11v11H0z"></path></g></g></g></svg>' +
                "<span class='nr-title'>We couldn't find a match for " + '<b>' + "<span id='keywordsearch'>" + '"' + searchinput + '"' + "</span>" + '</b>.</span>' +
                'Please make sure your keywords are spelled correctly, or try rephrasing and using less specific keywords.' +
                '</div>'
              );
              $("#no-results").show();
            }
            timeout = setTimeout(function () {
              isSearching = false;
              $(".loading-body").fadeOut(200);
              $("#module-info").html(`${flattenedResults.length} ${flattenedResults.length === 1 ? ' Resource' : ' Resources'}`);
            }, 200);
          }
        }, 200);
      });