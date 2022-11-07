// fix "formatnotsupported" messaging error
// https://github.com/cca/moodle-styles/issues/16
if (location.pathname.match('/user/index.php')) {
    // better error message
    let courseEditLink = () => {
        let params = new URLSearchParams(location.search)
        let id = params.get('id')
        if (id) {
            return `https://${location.host}/course/edit.php?id=${params.get('id')}`
        }
        return 'https://portal.cca.edu/knowledge-base/moodle/hiding-unhiding-courses/'
    }
    let msg = `<p class="moodle-exception-message" style="max-width: 500px">Errors sending messages can occur when a course is hidden or if there are issues with a user account. Try checking that <a href="${courseEditLink()}" target="_blank">your course visibility</a> is set to "show", or <a href="https://portal.cca.edu/teaching/teaching-lab/teaching-resources/teaching-and-learning-technologies/course-section-pages-portal-faculty/#emailing-your-class" target="_blank">using Portal</a> to email your class. If you need further assistance, <a href="https://portal.cca.edu/help-desk/" target="_blank">contact the Help Desk</a>.</p>`

    // runs every time DOM mutates, jQuery should be available
    let onModalAppear = () => {
        let header = document.getElementById('moodle-dialogue-undefined-header-text')
        if (header && header.innerText.trim() === 'formatnotsupported') {
            header.innerText = 'Error sending message'
            document.getElementsByClassName('moodle-dialogue-bd yui3-widget-bd')[0].innerHTML = msg
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
}
