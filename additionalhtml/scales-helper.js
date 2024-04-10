// if an instructor chooses a Grade > "Type: Scale" on an activity we wamt to
// show them extra help text because scales can be very misleading
if (location.pathname.match('/course/modedit.php')) {
    let d = document
    let id = 'cca-scale-warning'
    let warning = `<div id="${id}" class="alert alert-warning hidden">Attention: Please read <a href="https://portal.cca.edu/teaching/teaching-lab/teaching-resources/teaching-and-learning-technologies/moodle/grading-tracking/using-scales-when-grading-faculty/#how-does-moodle-calculate-a-scale" target="_blank">How Moodle Calculates Scales</a> before using a scale.</div>`

    d.addEventListener('DOMContentLoaded', () => {
        let gtElement = d.getElementById('id_grade_modgrade_type') || d.getElementById('id_grade_forum_modgrade_type')
        // if we want to warn against only certain specific scales we need to
        // listen to the #id_grade_modgrade_scale select for its blur event
        // and then check the textContent of its selected <option>

        if (gtElement) {
            gtElement.addEventListener('blur', function(event) {
                let gradeType = $(event.target).val().trim()

                // add hidden warning to DOM on first blur
                if (!d.getElementById(id)) $('#fitem_fgroup_id_grade .form-inline, #fitem_fgroup_id_grade_forum .form-inline').append(warning)

                if (gradeType === 'scale') {
                    return $(`#${id}`).show()
                }
                $(`#${id}`).hide()
            })
        }
    })
}
