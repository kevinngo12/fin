function animateNumbersTo(target, newPercent, duration, suffix) {
    const elmTarget = document.querySelector(target);
    let currentPercent = parseInt(elmTarget.textContent) || 0;
    const targetPercent = newPercent;
    const duration = duration;
    const startTime = performance.now();
  
    const animate = () => {
      const currentTime = performance.now();
      const elapsedTime = currentTime - startTime;
      const progress = elapsedTime / duration;
  
      currentPercent = Math.round(currentPercent + (targetPercent - currentPercent) * progress);
      elmTarget.textContent = `${currentPercent}${suffix}`;
  
      if (elapsedTime < duration) {
        requestAnimationFrame(animate);
      }
    };
  
    requestAnimationFrame(animate);
}