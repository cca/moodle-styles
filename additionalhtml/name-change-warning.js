// run when anyone edits a profile
let page = location.pathname
if (page.match('/user/edit.php') || page.match('/user/editadvanced.php')) {
    const d = document
    let div = d.createElement('div')
    div.innerHTML = '<p class="col-md-9 alert alert-primary" style="margin:6px;"><button type="button" class="close" data-dismiss="alert">×</button> Your name and email come from Workday and cannot be edited here. <a href="https://portal.cca.edu/essentials/workday-student/my-profile-information/updating-name-and-personal-information-step-step-guide/#-edit-your-preferred-name-">See Portal for information on changing your preferred name</a>. If your preferred name in Workday is not shown below, <a href="https://portal.cca.edu/help-desk/">contact the Help Desk.</a></p>'
    d.getElementById('id_moodlecontainer').prepend(div)
}
