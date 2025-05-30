// Work around https://tracker.moodle.org/browse/MDL-78886
// Page back/forward links in annotated bib viewer don't work
// Bug is fixed but not in a release (as of 4.4.8) yet
// We simply remove the link (students can download the PDF)
if (location.pathname.match('/mod/assign/view.php')) {
    document.querySelectorAll('[class*="summary_assignfeedback_editpdf"] a').forEach(a => {
        if (a.textContent.toLowerCase().match('view annotated pdf')) a.remove()
    })
}
