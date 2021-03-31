// run when anyone edits a profile
let page = location.pathname
if (page.match('/user/edit.php') || page.match('/user/editadvanced.php')) {
    let showNameChangeWarning = (ev) => {
        const html = '<div class="col-md-9 alert alert-primary" style="margin:6px;"><button type="button" class="close" data-dismiss="alert">×</button> We recommend notifying your instructors or students after changing your name, to avoid any confusion.</div>'
        // we should ahve jQuery by the time this happens
        $(event.target.parentElement).after(html)
    }
    document.querySelectorAll('#id_firstname, #id_lastname').forEach(el => {
        addEventListener('change', showNameChangeWarning, { once: true })
    })
}
