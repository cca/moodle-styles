// Moodle has a few places (activity descriptions for LTIs, text in user tours)
// where descriptions are plain-text only but we want to use clikable URLs. This
// code monitors the DOM for the appropriate modal dialogs and, when it sees
// them, does a simple text replace to hyperlink the URLs.

// given plain text with included URLs like 'google https://google.com' into
// hyperlinks like 'google <a href="https://google.com/">https://google.com</a>'
function hyperlinkText(str) {
    return str.replace(/([^\S]|^)(https?\:\/\/[^\s]*)/gi, (match, space, url) => {
        // try to validate the URL a little
        try {
            let u = new URL(url)
            return `${space}<a href="${u.toString()}">${url}</a>`
        } catch(e) {
            console.error('Regex captured a malformed URL:', e)
            // send the original text
            return before + url + after
        }
    })
}

// now that we have modal text on the page, hyperlink it if it hasn't already
// been hyperlinked. We will definitely have jQuery available by now.
function onModalAppear(mutation) {
    let hypeClass = 'js-hyperlinked'
    let descSelector = '[id^="optionsumary_desc-"]'

    // check that we haven't hyperlinked this text already
    if ($(descSelector).length && !$(descSelector).hasClass(hypeClass)) {
        let $desc = $(descSelector)
        $desc.find('p').each((idx, el) => {
            let $p = $(el)
            let text = $p.text()
            $p.html(hyperlinkText(text))
        })
        $desc.addClass(hypeClass)
    }
}

// set up Mutation Observer, no jQuery available
document.addEventListener('DOMContentLoaded', () => {
    if (MutationObserver) {
        let observer = new MutationObserver(onModalAppear)
        // the modal isn't on DOM yet so we just have to observe the whole body
        observer.observe(document.querySelector('body'), {subtree: true, childList: true})
    }
})
