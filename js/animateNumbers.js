function animateNumbersTo(target, newPercent) {
    var currentPercent = parseInt(document.querySelector(target).textContent) || 0;
    var stepTime = 10;
    var stepSize = newPercent > currentPercent ? 1 : -1;

    var interval = setInterval(function() {
        while (true) {
            if (stepSize === 1) {
                if (currentPercent + stepSize > newPercent) {
                    break;
                }
            } else {
                if (currentPercent + stepSize < newPercent) {
                    break;
                }
            }

            currentPercent += stepSize;
            break;
        }

        if ((stepSize === 1 && currentPercent === newPercent) ||
            (stepSize === -1 && currentPercent === newPercent)) {
            clearInterval(interval);
        }
    }, stepTime);
}