// specifically for the ILA Assignment where the IC needs to lock the assignment
// and then ISS recieves a notice from an event monitor, they unlock and grade
const params = new URLSearchParams(location.search)
// @TODO check in document.getElementById('id_grade') for <option>s that match assignment's special scale values
// for now only works on 1 assignment in Internships Demo course
if (location.pathname.match('/mod/assign/view.php') && params.get('action') === 'grader' && params.get('id') == '236146') {
    // lock URLs look like
    // https://moodle.cca.edu/mod/assign/view.php?id=236146&userid=4453&action=lock&sesskey=vKW7E2y8Kn&page=0
    // where ID appears to be the Assignment ID and user ID is the student's ID
    // make sure we have all the parameters we need
    if (params.get('id') && params.get('userid') && M && M.cfg && M.cfg.sesskey) {
        const html = `<a href="/mod/assign/view.php?id=${params.get('id')}&userid=${params.get('userid')}&action=lock&sesskey=${M.cfg.sesskey}" class="btn btn-primary" title="This button disallows further student submissions and triggers an email notification to ISS. Push it AFTER you have Saved the grade.">Lock Submissions & Notify ISS</a>`
        let div = document.createElement('div')
        div.className = "form-group row fitem py-1"
        div.innerHTML = html
        const interval = setInterval(() => {
            let target = document.getElementById('fitem_id_currentgrade')
            if (target) {
                target.insertAdjacentElement('beforebegin', div)
                clearInterval(interval)
            }
        }, 500)
    }
}
