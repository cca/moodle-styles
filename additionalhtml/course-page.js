// run on course home pages
// we don't have jQuery yet so use vanilla JS
if (location.pathname.match('/course/view.php')) {

    let d = document

    // better section highlighting. Find highlighted setion's name
    let highlightedSection = d.querySelector('.course-content li.section.current')

    if (highlightedSection) {
        let name = highlightedSection.ariaLabel.trim()

        // REM: QSA => NodeList & not Array, but forEach is widely supported now
        d.querySelectorAll('#nav-drawer li').forEach(item => {
            if (item.querySelector('.media-body').textContent.trim() === name) {
                item.querySelector('a').classList.add('active')
                item.querySelector('.media-body').classList.add('font-weight-bold')
            }
        })
    }

    // hide "restore" link in main actions menu
    let restore = d.querySelector('.context-header-settings-menu .dropdown-item [href*="/backup/restorefile.php?contextid="]').parentElement
    restore.parentElement.removeChild(restore)
}
