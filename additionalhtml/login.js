// Force SSO login if available
// https://github.com/cca/moodle-styles/issues/50
const loginPath = '/login/index.php'
if (window.location.pathname === loginPath) {
    if (document.querySelector('.login-identityproviders')) {
        const loginForm = document.getElementById('login')
        if (loginForm) loginForm.style.setProperty('display', 'none')
    }
}
// We are on a self-enroll page with a form that POSTs to login
// HTML looks like:
// <form autocomplete="off" action="https://moodle-stg-1.cca.edu/login/index.php" method="post" id="mform1_jZBkUBQmQtp5dhn" class="mform">...
//   <div class="continuebutton">
//     <button type="submit" class="btn btn-primary" id="single_button682e1cecc4afc1">Continue</button>
// Neither the <form> nor the <button> have a usable ID
if (window.location.pathname === '/enrol/index.php') {
    const form = document.querySelector(`form[action$=".cca.edu${loginPath}"]`)
    if (form) {
        const btn = document.querySelector('.continuebutton button')
        if (btn) btn.addEventListener('click', (event) => {
            event.preventDefault()
            event.stopPropagation()
            event.stopImmediatePropagation()
            window.location = window.location.origin + loginPath
        })
    }
}
