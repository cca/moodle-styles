// fix "formatnotsupported" messaging error
// https://github.com/cca/moodle-styles/issues/16
if (location.pathname.match('/user/index.php')) {
    // runs every time DOM mutates, jQuery _should_ be available
    let onModalAppear = () => {
        // detect modal with error message
        // replace message with a useful one
        return null
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
}
