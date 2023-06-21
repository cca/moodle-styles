// #34 warn users about backing up user data
if (location.pathname.match('/backup/backup.php')) {
    let includeusers = document.getElementById('id_setting_root_users')
    if (includeusers) {
        let msg = `<div class="alert alert-warning col-md-9 mx-auto">Uncheck "Include enrolled users" if you are restoring this backup for a new semester. If you create a backup with user data, be sure its storage complies with <a href="https://portal.cca.edu/teaching/teaching-lab/teaching-resources/student-policies-faculty/ferpa-tutorial-for-faculty/" target="_blank">FERPA regulations</a>.</div>`
        let div = document.createElement('div')
        div.innerHTML = msg
        document.getElementById('id_rootsettingscontainer').insertAdjacentElement('afterbegin', div)
    }
}
