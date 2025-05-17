// script.js
function scrollToPro() {
  document.getElementById("pro").scrollIntoView({ behavior: "smooth" });
}

window.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
      });
    });