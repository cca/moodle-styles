// https://github.com/cca/moodle-styles/issues/40
// translate ILA assignment numeric scale values on grade history page into official text
// ISS no longer grades in Moodle but this is useful for historical ILAs
if (location.pathname.match('/grade/report/history/index.php')) {
    // normalize (trim, lowercase) string for comparisons
    const n = (s) => s.trim().toLowerCase()
    // translate Moodle scale values into official statements
    const t = (s) => {
        // use strict regex to avoid replacing "3.00" in grade like "23.00"
        return s.replace(/^2\.00$/, 'The academic department has given approval for this internship.')
            // ISS no longer grades submissions to 3, their approvals happen outside of Moodle, but
            // this ensures historical ILAs from 2023-24 are translated
            .replace(/^3\.00$/, 'International Student Services approved this internship.')
    }
    const d = document

    // look for activities in the grade item dropdown from the internships course
    const select = d.getElementById('id_itemid')
    if (select) {
        const hasILAs = Array.from(select.querySelectorAll('option')).some(o => {
            return n(o.textContent).match('submit your internship form')
        })

        const ghTable = d.querySelector('table.gradereport_history')
        if (hasILAs && ghTable) {
            // find international ILA assignments in table & translate their grade columns
            ghTable.querySelectorAll('tr').forEach(row => {
                let cells = row.querySelectorAll('td')
                let activity = n(cells[4] ? cells[4].textContent : '')
                if (activity.match('internship form') && activity.match('international students')) {
                    // translate both "original" and "revised" grade columns
                    cells[5].textContent = t(cells[5].textContent)
                    cells[6].textContent = t(cells[6].textContent)
                }
            })
        }
    }
}
