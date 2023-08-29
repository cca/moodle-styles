// run when anyone edits a profile
let page = location.pathname
if (page.match('/user/edit.php') || page.match('/user/editadvanced.php')) {
    // if it's a "ghost" user with no names or email, don't bother warning them
    const d = document
    const notGhost = d.getElementById('id_firstname').value || d.getElementById('id_lastname').value
    if (notGhost) {
        const showNameChangeWarning = (ev) => {
            const html = '<div class="col-md-9 alert alert-primary" style="margin:6px;"><button type="button" class="close" data-dismiss="alert">×</button> We recommend notifying your instructors or students after changing your name, to avoid any confusion.</div>'
            // we should have jQuery by the time this happens
            $(ev.target.parentElement).after(html)
        }
        d.querySelectorAll('#id_firstname, #id_lastname').forEach(el => {
            el.addEventListener('change', showNameChangeWarning, { once: true })
        })
    }
}
