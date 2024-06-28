// https://github.com/cca/moodle-styles/issues/41
// improvements to Feedback activities in internships courses
if (location.pathname.match('/mod/feedback/complete.php')) {
    const d = document
    // how can we tell if it's one of the right Feedbacks in an internships course?
    // 1) it's in anonymous mode, 2) course label matches an "INTRN" shortname
    let anonymous = d.getElementById('fitem_id_anonymousmode')
    let course = d.querySelector('.info-course')

    const isInternshipCourse = () => {
        let shortname = course && course.querySelector('.felement') && course.querySelector('.felement').textContent.trim()
        const patterns = [/^INTRN-/, 'TEMPLATE-INTRN', 'SANDBOX-ephetteplace']
        if (shortname && patterns.some(p => shortname.match(p))) {
            return true
        }
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
            if (label.textContent.toLowerCase().includes(str.toLowerCase())) {
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
        if (name && nameField) {
            nameField.value = name
            nameField.disabled = true
        }

        // better input validation
        let internEmailField = getInputFromLabel('your email')
        if (internEmailField) internEmailField.type = 'email'
        // student ID is numeric
        let studentID = getInputFromLabel('your student id')
        if (studentID) {
            studentID.pattern = '[0-9]+'
            studentID.title = 'Enter your numeric student ID.'
        }
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel
        let internPhone = getInputFromLabel('your phone number')
        if (internPhone) internPhone.type = 'tel'
        let superEmailField = getInputFromLabel('supervisor email')
        if (superEmailField) superEmailField.type = 'email'
        let superPhone = getInputFromLabel('supervisor phone number')
        if (superPhone) superPhone.type = 'tel'
        let startDate = getInputFromLabel('anticipated start date')
        if (startDate) startDate.type = 'date'
        let endDate = getInputFromLabel('anticipated end date')
        if (endDate) endDate.type = 'date'
    }
}
