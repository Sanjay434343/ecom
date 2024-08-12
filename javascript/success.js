const illustration = document.getElementById('illustration');

function resetAnimation() {
  illustration.classList.add('no-animation')
  
  setTimeout(function() {
      illustration.classList.remove('no-animation')
  }, 500)
}