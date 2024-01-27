// specifically for the ILA Assignment where the IC needs to lock the assignment
// and then ISS recieves a notice from an event monitor, they unlock and grade
// grading scale is: -1 No grade, 1 Incomplete, 2 ISS Review, 3 ISS Approved
let params = new URLSearchParams(location.search)
if (location.pathname.match('/mod/assign/view.php') && params.get('action') === 'grader') {
    const handler = (event) => {
        // only lock if grade is ISS Review
        if (document.querySelector('#id_grade').value.trim().toLowerCase() !== '2') {
            console.log('Not locking because grade is not ISS Review')
            return
        }
        // prevent the form from submitting
        event.preventDefault()
        // the query string can change without the page reloading if you arrow to another student
        params = new URLSearchParams(location.search)
        // lock URLs look like
        // https://moodle.cca.edu/mod/assign/view.php?id=236146&userid=4453&action=lock&sesskey=vKW7E2y8Kn&page=0
        // where ID appears to be the Assignment ID and user ID is the student's ID
        const url = `https://${location.hostname}/mod/assign/view.php?id=${params.get('id')}&userid=${params.get('userid')}&action=lock&sesskey=${M.cfg.sesskey}`
        fetch(url)
            .then(response => {
                if (response.ok) {
                    console.log('Locking successful')
                    // do not submit the form, the form that wraps the buttons has no inputs or action URL
                    // leads to an error page if you submit it
                } else {
                    // TODO show a modal alert
                    console.error('Locking failed')
                    console.error(response)
                    alert("Locking failed")
                }
            })
            .catch(error => {
                console.error(error)
                // TODO show a modal alert
                alert("Locking failed")
            })
    }

    // TODO it might be safest to add our own "save" button to the DOM
    // we don't know if messing with the existing buttons has side effects
    const monitorAndAddHandler = () => {
        let target = document.querySelector('button[name="savechanges"]')
        let locked = document.querySelector('.submissionnoteditable')
        // target exists, there's no button, & assignment isn't already locked
        if (target && !locked) {
            // reset the handler (could have navigated to another student)
            target.removeEventListener('click', handler)
            target.addEventListener('click', handler)
            // do the same for the "Save and show next" button
            let saveandshownext = document.querySelector('button[name="saveandshownext"]')
            saveandshownext.removeEventListener('click', handler)
            saveandshownext.addEventListener('click', handler)
        }
    }

    const checkForISSScale = () => {
        let grading_scale = Array.from(document.querySelectorAll('#id_grade option'))
        if (grading_scale && grading_scale.some(g => g.textContent.trim().toLowerCase() === 'iss approved')) {
            clearInterval(interval)
            // ensure we have parameters we need, redefine url params b/c userid not always there on page load
            params = new URLSearchParams(location.search)
            if (params.get('id') && params.get('userid') && M && M.cfg && M.cfg.sesskey) {
                // grading UI is quite dynamic, check DOM every second and add our button if it's not there
                setInterval(monitorAndAddHandler, 1000)
            }
        }
    }

    const interval = setInterval(checkForISSScale, 500)
}
