// Orphaned sections warning text is misleading
// Occurs only in Grid format courses with more sections than in course settings
if (window.location.pathname == '/course/view.php') {
    document.querySelectorAll('div.bg-warning.text-white').forEach((element) => {
        const text = element.textContent
        if (text.match(/Warning: Course has \d+ orphaned section\(s\) with content/)) {
            element.textContent = text.replace(/Resolve as soon as possible.*/, 'Fix: In Settings (see above) > Course format, increase Number of sections to match the total sections in the course.')
            element.classList.remove('text-white') // black font has better contrast
        }
    })
}
