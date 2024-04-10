// Staging lacks the GTM script tag so gtag() calls just sit in the dataLayer array
window.dataLayer = window.dataLayer || []
window.gtag = function(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-9KK2VCY0TM', { 'anonymize_ip': true, 'transport_type': 'beacon' });

// event tracking, we currently only use the custom category "cca_resources"
// we track clicks on any link in the resources block
// their "action" is set to the link's URL
// their "label" is set to the text label of the square
// we also track usage of the Summon search box
// the "action" is "Summon search" and the "label" is the query text
const trackEvent = (name, category, label) => {
    return gtag('event', 'cca_' + name, {
        event_category: category,
        event_label: label
    })
}
, d = document
, qsa = d.querySelectorAll.bind(d)
, qs = d.querySelector.bind(d);
// jquery hasn't loaded yet so we need to use vanilla JS
qsa('.js-resources a') && qsa('.js-resources a').forEach(el => {
    el.addEventListener('click', () => {
        // return text of the _second_ link (the label)
        return trackEvent('resources', el.href, el.parentElement.querySelectorAll('a')[1].textContent.trim())
    })
})
// track Summon queries
qs('#summon-search') && qs('#summon-search').addEventListener('submit', () => {
    let q = $('#summon-search .js-query').val().trim()
    return trackEvent('resources', 'Summon search', q)
})
