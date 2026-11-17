// Finca Estudio — Meta Pixel + eventos de conversión
//
// Para activarlo: pegar el ID del píxel (Administrador de eventos de Meta →
// Orígenes de datos → el píxel → número de 15–16 dígitos) en PIXEL_ID.
// Mientras PIXEL_ID esté vacío, este archivo no hace nada.
//
// Eventos que manda:
//   PageView     → todas las páginas públicas
//   ViewContent  → proyectos.html y servicios.html
//   Contact      → clic en cualquier link de WhatsApp (wa.me) o de mail,
//                  y clic en "Consultar una pieza"
//   Lead         → envío del formulario de contacto (window.fincaTrackLead)
(function () {
  var PIXEL_ID = '';

  if (!PIXEL_ID) return;

  // Código base oficial de Meta
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = !0;
    t.src = v; s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');

  var page = (location.pathname.split('/').pop() || 'index.html').replace('.html', '') || 'index';

  function track(event, params) {
    try {
      fbq('track', event, Object.assign({ content_name: page }, params || {}));
    } catch (e) { /* nunca romper la página por el tracking */ }
  }

  // Lo usa el formulario de contacto cuando el envío sale bien
  window.fincaTrackLead = function (params) { track('Lead', params); };

  document.addEventListener('DOMContentLoaded', function () {
    if (page === 'proyectos' || page === 'servicios') {
      track('ViewContent', { content_category: page });
    }

    // Un solo listener para todos los botones, incluidos los que se agreguen después
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      var label = (a.textContent || '').trim();

      if (href.indexOf('wa.me') !== -1 || href.indexOf('api.whatsapp.com') !== -1) {
        track('Contact', { content_category: 'whatsapp' });
      } else if (href.indexOf('mailto:') === 0) {
        track('Contact', { content_category: 'email' });
      } else if (/consultar una pieza/i.test(label)) {
        track('Contact', { content_category: 'pieza' });
      }
    });
  });
})();
