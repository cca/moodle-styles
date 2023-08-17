// #36 SCORM progress doesn't work in Safari
// two questions: 1) should we _prevent_ users from even starting the SCORM?
// 2) should we target the "Personal Skills for a Diverse Campus" SCORM specifically, by checking against the page title, or all SCORMs?
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
if (location.pathname.match('/mod/scorm/view.php') && isSafari) {
    // let some of the page load before interrupting it
    // using window.addEventListener('load',...) can cause an AJAX error in Moodle
    document.addEventListener('DOMContentLoaded', () => {
        alert('This activity does not work on Safari. Please use another browser, such as Mozilla Firefox or Google Chrome.')
        // track this, use an event meant for games lol
        // https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#unlock_achievement
        if (typeof gtag === 'function') gtag('event', 'unlock_achievement', { achievement_id: "safari_scorm" })
        // monitor for button and disable it
        const interval = setInterval(() => {
            let btn = document.getElementById('n')
            if (btn) {
                btn.disabled = true
                clearInterval(interval)
            }
        }, 500)
    })
}
