function animateNumbersTo(target, newPercent) {
    let currentPercent = parseInt(document.querySelector(target).textContent) || 0;
    const stepTime = 25; // in ms
    const stepSize = newPercent > currentPercent ? 1 : -1;
    console.log(target)
    console.log(newPercent)
    const interval = setInterval(() => {
        if ((stepSize > 0 && currentPercent >= newPercent) || 
            (stepSize < 0 && currentPercent <= newPercent)) {
            clearInterval(interval);
        } else {
            currentPercent += stepSize;
        }
    }, stepTime);
  }