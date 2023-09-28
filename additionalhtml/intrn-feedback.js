// https://github.com/cca/moodle-styles/issues/41
// improvements to Feedback activities in internships courses
if (location.pathname.match('/mod/feedback/complete.php')) {
    const d = document
    // how can we tell if it's one of the right Feedbacks in an internships course?
    // 1) it's in anonymous mode, 2) course label matches an "INTRN-" shortname
    let anonymous = d.getElementById('fitem_id_anonymousmode')
    let course = d.querySelector('.info-course')

    const isInternshipCourse = () => {
        let shortname = course && course.querySelector('.felement') && course.querySelector('.felement').textContent.trim()
        // while testing do not run on actual internships courses, just Eric's sandbox
        if (shortname &&
            // shortname.match(/^INTRN-/) ||
            shortname.match('SANDBOX-ephetteplace')) return true
        return false
    }

    const labels = Array.from(d.querySelectorAll('form label'))
    const numLabels = labels.length
    /**
     * given text label return the labelled input (or other html) element
     * label comparison is case insensitive
     *
     * @param   {string}  label
     *
     * @return  {HTMLElement}
     */
    const getInputFromLabel = (str) => {
        for (let i = 0; i < numLabels; i++) {
            let label = labels[i]
            if (label.textContent.trim().toLowerCase() === str.toLowerCase()) {
                return label.parentElement.parentElement.querySelector('input')
            }
        }
        return null
    }

    if (anonymous && isInternshipCourse()) {
        // hide "Mode: anonymous" & course short name, these mean nothing to users
        anonymous.classList.add('hidden')
        course.classList.add('hidden')
        // autofill intern name
        let name = d.querySelector('.logininfo .logininfo a[title]').textContent
        let nameField = getInputFromLabel('your name')
        if (name && nameField) nameField.value = name
        // better input validation
        // intern email is an email
        let internEmailField = getInputFromLabel('your email')
        if (internEmailField) internEmailField.type = 'email'
        // @TODO student ID is numeric
        // @TODO phone number? is it too hard to validate international phone numbers?
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel
        // supervisor email is an email
        let superEmailField = getInputFromLabel('supervisor email')
        if (superEmailField) superEmailField.type = 'email'
        // @TODO supervisor phone number
        // @TODO start date & end date (use datepicker?)
    }
}
