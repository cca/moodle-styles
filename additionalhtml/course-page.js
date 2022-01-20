// run on course home pages
// we don't have jQuery yet so use vanilla JS
if (location.pathname.match('/course/view.php')) {

    let d = document

    // better section highlighting. Find highlighted section's name
    let highlightedSection = d.querySelector('.course-content li.section.current')

    if (highlightedSection) {
        let name = highlightedSection.querySelector('.sectionname').textContent.trim()

        // REM: QSA => NodeList & not Array, but forEach is widely supported now
        d.querySelectorAll('#nav-drawer li').forEach(item => {
            if (item.querySelector('.media-body').textContent.trim() === name) {
                item.querySelector('a').classList.add('active')
                item.querySelector('.media-body').classList.add('font-weight-bold')
            }
        })
    }

    // hide Restore, Filter, & Reset links in course "edit settings" menu
    [
        '/backup/restorefile.php?contextid=',
        '/filter/manage.php?contextid=',
        '/course/reset.php?id='
    ].forEach(u => {
        let el = d.querySelector(`.context-header-settings-menu .dropdown-item [href*="${u}"]`)
        if (el) {
            el.parentElement.parentElement.removeChild(el.parentElement)
        }
    })
}
