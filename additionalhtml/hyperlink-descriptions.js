// Moodle has a few places (activity descriptions for LTIs, text in user tours)
// where descriptions are plain-text only but we want to use clickable URLs. This
// code monitors the DOM for the appropriate modal dialogs and, when it sees
// them, does a simple text replace to hyperlink the URLs.

// given plain text with included URLs like 'search https://google.com' into
// hyperlinks like 'search <a href="https://google.com/">https://google.com</a>'
function hyperlinkText(str) {
    return str.replace(/([^\S]|^)(https?:\/\/[^\s]*)/gi, (match, space, url) => {
        // try to validate the URL a little
        try {
            let u = new URL(url)
            return `${space}<a href="${u.toString()}" target="_blank">${url}</a>`
        } catch(e) {
            console.error('Regex captured a malformed URL:', e)
            // send the original text
            return str
        }
    })
}

// now that we have modal text on the page, hyperlink it if it hasn't already
// been hyperlinked
function onModalAppear() {
    let hypeClass = 'js-hyperlinked'
    let descSelector = '[id^="optionsumary_desc-"]'
    let tourSelector = '[id^="tour-step-tool_usertours_"] .modal-body'
    let tour = document.querySelector(tourSelector)

    // we will have jQuery by the time someone clicks into a description
    if (window.jQuery && $(descSelector).length && !$(descSelector).hasClass(hypeClass)) {
        let $desc = $(descSelector)
        $desc.find('p').each((idx, el) => {
            let $p = $(el)
            let html = hyperlinkText($p.text())
            $p.html(html)
        })
        $desc.addClass(hypeClass)
    // tours appear immediately, even before jQuery is loaded, somehow
    } else if (tour && !tour.classList.contains(hypeClass)) {
        let html = hyperlinkText(tour.textContent)
        tour.innerHTML = html
        tour.classList.add(hypeClass)
    }
}

// set up Mutation Observer, no jQuery available
document.addEventListener('DOMContentLoaded', () => {
    if (MutationObserver) {
        let observer = new MutationObserver(onModalAppear)
        let options = {
            attributeFilter: ['id', 'class'],
            childList: true,
            subtree: true
        }
        // the modal isn't on DOM yet so we just have to observe the whole body
        observer.observe(document.querySelector('body'), options)
    }
})
