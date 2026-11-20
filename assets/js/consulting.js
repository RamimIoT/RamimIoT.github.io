/* Consulting page: booking form → pre-filled e-mail or WhatsApp message (no server needed),
   and package / service buttons that pre-select the form. */
(function () {
  'use strict';

  var EMAIL = 'ramim.cse.uctc@gmail.com';
  var WHATSAPP = '8801836655062';

  var form = document.getElementById('book-form');
  if (!form) return;
  var service = form.elements.service;

  document.addEventListener('click', function (e) {
    var pick = e.target.closest('[data-package]');
    if (!pick) return;
    var value = pick.getAttribute('data-package');
    for (var i = 0; i < service.options.length; i++) {
      if (service.options[i].value === value) { service.selectedIndex = i; break; }
    }
  });

  function message() {
    var f = form.elements;
    var lines = [
      'Hi Ramim,',
      '',
      "I'd like to book a consultation.",
      '',
      'Name: ' + f.name.value.trim(),
      'Company: ' + (f.company.value.trim() || '-'),
      'E-mail: ' + f.email.value.trim(),
      'Interested in: ' + f.service.value,
      'Timeline: ' + f.timeline.value,
      'Budget: ' + f.budget.value,
      '',
      'Project:',
      f.details.value.trim()
    ];
    return lines.join('\n');
  }

  function track(channel) {
    if (window.gtag) window.gtag('event', 'generate_lead', { method: channel, service: form.elements.service.value });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var subject = 'Consultation request: ' + form.elements.service.value;
    track('email');
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message());
  });

  document.getElementById('book-whatsapp').addEventListener('click', function () {
    if (!form.reportValidity()) return;
    track('whatsapp');
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(message()), '_blank', 'noopener');
  });
})();
