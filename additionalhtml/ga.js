// Staging lacks the GTM script tag so gtag() calls just sit in the dataLayer array
window.dataLayer = window.dataLayer || []
window.gtag = function(){dataLayer.push(arguments)}
gtag('js', new Date())
gtag('config', 'G-9KK2VCY0TM', { 'anonymize_ip': true, 'transport_type': 'beacon' })

// event tracking, we currently only use custom "cca_resources" events
// we track clicks on any link in the resources block
// their category is set to the link's URL
// their label is set to the text label of the square
// we also track usage of the Summon search box
// the category is "Summon search" and the label is the query text
const trackEvent = (category, label) => {
        return gtag('event', 'cca_resources', {
            event_category: category,
            event_label: label
        })
    }
    , d = document
// jquery hasn't loaded yet so we need to use vanilla JS
d.querySelectorAll('.js-resources a').forEach(el => {
    el.addEventListener('click', () => {
        // return text of the _second_ link (the label)
        return trackEvent(el.href, el.parentElement.querySelectorAll('a')[1].textContent.trim())
    })
})
// track Summon queries
const search = d.getElementById('summon-search')
if (search) search.addEventListener('submit', () => {
    let q = search.querySelector('.js-query').value.trim()
    return trackEvent('Summon search', q)
})
