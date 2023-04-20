// run on course home pages
// we don't have jQuery yet so use vanilla JS
if (location.pathname.match('/course/view.php')) {

    let d = document

    // better section highlighting. Find highlighted section's name
    let highlightedSection = d.querySelector('.course-content li.section.current')

    if (highlightedSection) {
        let name = highlightedSection.querySelector('.sectionname').textContent.trim()

        d.querySelectorAll('#nav-drawer li').forEach(item => {
            if (item.querySelector('.media-body').textContent.trim() === name) {
                item.querySelector('a').classList.add('active')
                item.querySelector('.media-body').classList.add('font-weight-bold')
            }
        })
    }
}
