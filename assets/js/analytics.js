/* Google Analytics 4 for every page.
   Set GA_ID to the site's Measurement ID (Admin → Data streams → Web → "G-…").
   While GA_ID is empty, or the page is opened locally, nothing is loaded or sent. */
(function () {
  'use strict';

  var GA_ID = 'G-NZH0PT68TB';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  var local = location.protocol === 'file:' || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  if (!GA_ID || local) return;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  gtag('js', new Date());
  gtag('config', GA_ID);

  /* Visits that arrive from an AI assistant or AI search engine. GA also records these as
     referrals; this event makes them easy to count in one place (Reports → Engagement → Events). */
  var AI_SOURCES = /(^|\.)(chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai|anthropic\.com|gemini\.google\.com|bard\.google\.com|copilot\.microsoft\.com|you\.com|phind\.com|poe\.com|deepseek\.com|meta\.ai|grok\.com|x\.ai|mistral\.ai)$/i;
  var source = '';
  try {
    var utm = new URLSearchParams(location.search).get('utm_source') || '';
    var ref = document.referrer ? new URL(document.referrer).hostname : '';
    if (AI_SOURCES.test(utm)) source = utm;
    else if (ref && ref !== location.hostname && AI_SOURCES.test(ref)) source = ref;
  } catch (e) {}
  if (source) gtag('event', 'ai_referral', { ai_source: source.toLowerCase() });

  /* Contact and engagement clicks. CV downloads and other outbound links are already
     recorded by GA4's enhanced measurement (file_download, click). */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button');
    if (!el) return;
    var href = el.getAttribute('href') || '';
    if (/^mailto:/i.test(href)) gtag('event', 'contact', { method: 'email' });
    else if (/^tel:/i.test(href)) gtag('event', 'contact', { method: 'phone' });
    else if (/wa\.me\//i.test(href)) gtag('event', 'contact', { method: 'whatsapp' });
    else if (/linkedin\.com\//i.test(href)) gtag('event', 'contact', { method: 'linkedin' });
    else if (el.id === 'copy-email') gtag('event', 'contact', { method: 'copy_email' });
    else if (el.classList.contains('filter')) gtag('event', 'filter_projects', { filter: el.dataset.filter });
    else if (/(^|\/)projects\/[\w-]+\/?$/.test(href) || /^\.\.\/[\w-]+\/$/.test(href)) {
      gtag('event', 'select_content', { content_type: 'project', item_id: href.replace(/^.*?([\w-]+)\/?$/, '$1') });
    }
  });
})();
