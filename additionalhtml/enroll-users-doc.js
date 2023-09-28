// when users go to make manual enrollment changes, point them to our
// documentation since we know manual enrollments are frequently misused
// https://github.com/cca/moodle-styles/issues/15
if (location.pathname.match('/user/index.php')) {
    let d = document
    let id = 'js-cca-enrol-docs'
    let msg = d.createElement('div')
    msg.innerHTML = `<div id="${id}" class="alert-primary" style="margin:6px;padding-left: 20px;padding-top: 12px;padding-right: 20px;padding-bottom: 12px;">Please do not <strong><a href="https://portal.cca.edu/knowledge-base/moodle/managing-enrollment-in-moodle-courses/" target="_blank">manually enroll students</a></strong>.</div>`

    // runs every time DOM mutates, jQuery should be available
    let onModalAppear = () => {
        let header = d.querySelector('.modal-title')
        if (header && header.innerText.trim() === 'Enroll users') {
            let legend = d.querySelector('.ftoggler h3')
            let doc = d.getElementById(id)
            // only insert msg if we haven't already, otherwise => infinite loop
            if (!doc && legend && legend.innerText.trim() === 'Enrollment options') {
                legend.parentElement.insertAdjacentElement('afterend', msg)
            }
        }
    }

    // set up Mutation Observer, no jQuery available
    d.addEventListener('DOMContentLoaded', () => {
        if (MutationObserver) {
            let observer = new MutationObserver(onModalAppear)
            let options = {
                attributeFilter: ['id', 'class'],
                childList: true,
                subtree: true
            }
            // the modal isn't on DOM yet so we just have to observe the whole body
            observer.observe(d.querySelector('body'), options)
        }
    })
}
