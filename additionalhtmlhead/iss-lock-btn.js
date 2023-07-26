// specifically for the ILA Assignment where the IC needs to lock the assignment
// and then ISS recieves a notice from an event monitor, they unlock and grade
let params = new URLSearchParams(location.search)
if (location.pathname.match('/mod/assign/view.php') && params.get('action') === 'grader') {
    const id = 'cca-iss-btn'

    const makebtn = () => {
        // the query string can change without the page reloading if you arrow to another student
        params = new URLSearchParams(location.search)
        // lock URLs look like
        // https://moodle.cca.edu/mod/assign/view.php?id=236146&userid=4453&action=lock&sesskey=vKW7E2y8Kn&page=0
        // where ID appears to be the Assignment ID and user ID is the student's ID
        const html = `<a href="/mod/assign/view.php?id=${params.get('id')}&userid=${params.get('userid')}&action=lock&sesskey=${M.cfg.sesskey}" class="btn btn-primary" title="This button disallows further student submissions and triggers an email notification to ISS. Push it AFTER you have Saved the grade.">Lock Submissions & Notify ISS</a>`
        let div = document.createElement('div')
        div.className = "form-group row fitem py-1"
        div.innerHTML = html
        div.id = id
        return div
    }

    const monitorAndAddButton = () => {
        let target = document.getElementById('fitem_id_currentgrade')
        let ourbtn = document.getElementById(id)
        let locked = document.querySelector('.submissionnoteditable')
        // target exists, there's no button, & assignment isn't already locked
        if (target && !ourbtn && !locked) {
            target.insertAdjacentElement('beforebegin', makebtn())
        }
    }

    const checkForISSScale = () => {
        // grading scale is like: No grade, ISS Review, ISS Approved, Incomplete
        let grading_scale = Array.from(document.querySelectorAll('#id_grade option'))
        if (grading_scale && grading_scale.some(g => g.textContent.trim().toLowerCase() === 'iss approved')) {
            clearInterval(interval)
            // make sure we have all the parameters we need
            if (params.get('id') && params.get('userid') && M && M.cfg && M.cfg.sesskey) {
                // grading UI is quite dynamic, check DOM every second and add our button if it's not there
                setInterval(monitorAndAddButton, 1000)
            }
        }
    }

    const interval = setInterval(checkForISSScale, 500)
}
