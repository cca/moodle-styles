// Activity descriptions for LTIS are plain-text only but we want to use
// clickable URLs. This code monitors the DOM for the appropriate modal dialogs
// and, when it sees them, does a simple text replace to hyperlink the URLs.

// Escape HTML first to guard against XSS attacks
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, (char) => {
        switch (char) {
            case '&': return '&amp;'
            case '<': return '&lt;'
            case '>': return '&gt;'
            case '"': return '&quot;'
            case "'": return '&#39;'
            default: return char
        }
    })
}

// given plain text with included URLs like 'search https://google.com' into
// hyperlinks like 'search <a href="https://google.com/">https://google.com</a>'
function hyperlinkText(str) {
    str = escapeHTML(str)
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

    // we will have jQuery by the time someone clicks into a description
    if (window.jQuery && $(descSelector).length && !$(descSelector).hasClass(hypeClass)) {
        let $desc = $(descSelector)
        $desc.find('p').each((idx, el) => {
            let $p = $(el)
            let html = hyperlinkText($p.text())
            $p.html(html)
        })
        $desc.addClass(hypeClass)
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
