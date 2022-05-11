// helper info for users who signed in before their Moodle account was ready
// they have no profile info, but cannot edit their read-only but required
// profile fields like email, so they end up stuck on the "Edit profile" page
// @TODO can Eric set up a report to email when there are "ghost" users, too?
if (location.pathname.match('/user/edit.php')) {
    let d = document
        , surname = d.getElementById('id_lastname').value
        , email = d.getElementById('id_email').value;
    if (surname === "" || email === "") {
        let alert = document.createElement('div')
        alert.className = 'alert alert-danger'
        alert.innerHTML = "Seeing empty profile fields you're unable to edit? This happens when you sign into Moodle before your account has been created. It is common for students and faculty who have a CCA account but are not yet enrolled in or teaching any courses. We recommend waiting until you're in a course, as there's nothing to do before then. Contact <a href='https://portal.cca.edu/help-desk/'>the Help Desk</a> and mention this error message if you have questions."
        d.getElementById('id_moodle').prepend(alert)
    }
}
