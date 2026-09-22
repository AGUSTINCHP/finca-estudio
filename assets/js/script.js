// Finca Estudio — interacciones base (menú mobile + mega menú táctil)
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('is-open');
      toggle.classList.toggle('is-open');
    });
  }

  // En pantallas táctiles, el mega menú se abre con un click en vez de hover
  var navItem = document.querySelector('.nav-item');
  if (navItem) {
    var trigger = navItem.querySelector('a');
    trigger.addEventListener('click', function (e) {
      if (window.matchMedia('(max-width: 760px)').matches) {
        e.preventDefault();
        navItem.classList.toggle('is-open');
      }
    });
  }

  // Cierra el menú mobile al elegir una sección
  document.querySelectorAll('.nav-links a:not(.nav-item a)').forEach(function (a) {
    a.addEventListener('click', function () {
      if (links) links.classList.remove('is-open');
    });
  });
});
