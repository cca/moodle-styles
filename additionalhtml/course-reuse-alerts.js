// #34 warn users about backing up user data
if (location.pathname.match('/backup/backup.php')) {
    let includeusers = document.getElementById('id_setting_root_users')
    if (includeusers) {
        let msg = `<div class="alert alert-warning col-md-9 mx-auto">Uncheck "Include enrolled users" if you are restoring this backup for a new semester. If you create a backup with user data, be sure its storage complies with <a href="https://portal.cca.edu/teaching/teaching-lab/teaching-resources/student-policies-faculty/ferpa-tutorial-for-faculty/" target="_blank">FERPA regulations</a>.</div>`
        let div = document.createElement('div')
        div.innerHTML = msg
        let target = document.getElementById('id_rootsettingscontainer')
        if (target) target.insertAdjacentElement('afterbegin', div)
    }
}
// #37 warn users about import mistakes
// only if course ID is in the path, otherwise shows up at end of successful import
if (location.pathname.match('/backup/import.php') && location.search.match(/id=\d+/)) {
    let msg = `<div class="alert alert-warning col-md-9 mx-auto">
Before import, make sure you are in your destination course, not your origin course.<br>
If you previously attempted to import and can't find your course content, double check your destination and origin courses before trying to import again. This helps avoid accidentally importing a course twice.<br>
Visit <a href="https://portal.cca.edu/knowledge-base/moodle/importing-a-course-or-course-content-into-moodle/">Importing a Course or Course Content into Moodle</a> on Portal for a detailed guide.</div>`
    let div = document.createElement('div')
    div.innerHTML = msg
    let target = document.getElementById('maincontent')
    if (target) target.insertAdjacentElement('beforebegin', div)
}
