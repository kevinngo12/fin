var getPageTitle = $("h1.article-title").attr("title");
var totalReadTime = 0;
$(".heading-section").each(function(index) {
    var getDataType = $(this).attr("data-type");
    if(getDataType.includes("Min")) {
        var getReadTime = parseInt(getDataType.split(" ")[0]);
        totalReadTime += getReadTime;
    }
});
if(totalReadTime > 0) {

$(".side-nav").prepend(
    `
    	<div class="sideNav-main-container">
        <div class="sideNav-title-header">
          <div class="progress-parent">
            <svg class="progress-circle-container" viewBox="0 0 640 640">
            <circle class="progress-circle" fill="none" cx="300" cy="300" r="281.25"/>
            <path class="outline" fill="none" d="M300 9.375c160.508 0 290.625 130.117 290.625 290.625s-130.117 290.625-290.625 290.625-290.625-130.117-290.625-290.625 130.117-290.625 290.625-290.625"/>
            </svg>
            <text id="scrollPercentLabel">0%</text>
          </div>
          <h1 class="sideNav-title">${getPageTitle}</h1>
        </div>
      	<span class="title-label"><span class="content"><span class="bold-700">Time Commitment:</span> ${totalReadTime} Min</span></span>
      </div>
    `
  );

var progressPath = document.querySelector( '.outline' ),
    pathLength   = progressPath.getTotalLength(),
    lastPosition = -1;

progressPath.style.stroke = '#c82021';
progressPath.style.strokeWidth = 20;
progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
progressPath.style.strokeDashoffset = pathLength;
progressPath.getBoundingClientRect();

function updateProgress() {
  var progress = pathLength - ( window.pageYOffset * pathLength / ( document.body.scrollHeight - window.innerHeight ) );

  // Update dashOffset
  progressPath.style.strokeDashoffset = progress;
}

function loop() {
  if ( lastPosition == window.pageYOffset ) {
    window.requestAnimationFrame( loop );
    return false;
  } else {
    lastPosition = window.pageYOffset;
    updateProgress();
  }
  window.requestAnimationFrame( loop );
}
  $(window).scroll(function(e){
    var scrollPercentRounded;
    var scrollTop = $(window).scrollTop();
    var docHeight = $(document).height();
    var winHeight = $(window).height();
    var scrollPercent = (scrollTop) / (docHeight - winHeight);
    var calculateScroll = Math.round(scrollPercent*100);
    if(calculateScroll < 0) {
    	scrollPercentRounded = 0;
    } else {
    	scrollPercentRounded = calculateScroll;
    }
    if(scrollPercentRounded <= 100) {
      $("#scrollPercentLabel").html(scrollPercentRounded + "%");
    }
  });
	   
// Call the loop for the first time
loop();
}