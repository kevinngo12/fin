const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }
  
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
    setTimeout(() => {
      $('html, body').animate({
      	scrollTop: $(this).offset().top
      }, 300);
    }, 400);
  }
}

items.forEach(item => item.addEventListener('click', toggleAccordion));   