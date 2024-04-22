// Work around https://tracker.moodle.org/browse/MDL-78886
// Page back/forward links in annotated bib viewer don't work
// We simply remove the link (students can download the PDF)
const params = new URLSearchParams(location.search)
if (location.pathname.match('/mod/assign/view.php') && params.get('action') === 'view') {
    document.querySelectorAll('[class*="summary_assignfeedback_editpdf"] .visibleifjs a').forEach(a => {
        if (a.textContent.toLowerCase().match('view annotated pdf')) a.remove()
    })
}
