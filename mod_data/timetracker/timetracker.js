// this JS is loaded on every template so always check for element existence
// before trying to manipulate the DOM
function main() {
    // add template, make the number input type=number (why is it text?!?)
    let input = document.querySelector('.number-input input')
    if (input) fixHoursInput(input)

    let dateSection = document.getElementById('date')
    let params = new URLSearchParams(location.search)
    if (location.pathname.match('edit.php') && dateSection && params.get('rid')) dateRollbackWarning(dateSection)

    timecount()

    let target = document.getElementById('js-csv-export')
    if (target) exposeCSVExport(target)
}

function fixHoursInput(input) {
    // @TODO set a max, cannot work >24 hours in a day
    input.type = 'number'
    input.step = '0.01'
}

function dateRollbackWarning(section) {
    // when you edit an entry, the date is set to one day earlier than it was
    let alert = document.createElement('div')
    alert.className = 'alert alert-danger'
    alert.innerHTML = '<b>Warning:</b> if you edit an entry, the date resets to one day earlier than it was initially. Please double-check the date above is correct.'
    section.appendChild(alert)
}

function timecount() {
    // needs confirmation but Cecilia said 220 hours for all programs
    const THRESHOLD = 220

    // create the counts
    let counts = {}
    document.querySelectorAll('table.data-row tr').forEach(row => {
        let name = row.querySelector('td .name').innerText
        let hours = parseFloat(row.querySelector('td.hours').innerText)
        counts[name] = (counts[name] || 0) + hours
    })

    // add counts to page
    let list = document.querySelector('tbody.totals-list')
    for (var name in counts) {
        let row = document.createElement('tr')

        let nameCell = document.createElement('td')
        nameCell.innerText = name
        row.appendChild(nameCell)

        let countCell = document.createElement('td')
        countCell.innerText = counts[name]
        if (counts[name] >= THRESHOLD) countCell.innerText += ' ✅'
        row.appendChild(countCell)

        list.appendChild(row)
    }
}

function makeCSVBlob() {
    // collect data, jQuery not available yet
    let data = 'Person,Date,Hours\n'
    document.querySelectorAll('.data-row').forEach((row) => {
        row.querySelectorAll('td').forEach((cell, idx) => {
            // 1st 3 cells are data, last 2 are action links
            // if we add more fields then this condition will need to change
            if (idx < 3) {
                // quote & escape quotes to avoid breaking CSV
                data += `"${cell.textContent.trim().replace(/"/g, '""')}",`
            } else if (idx === 3) {
                data += '\n'
            }
        })
    })

    let blob = new Blob([data], { type: 'text/csv;charset=utf-8;' })
    return blob
}

function exposeCSVExport(target) {
    if (document.createElement("a").download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        let url = URL.createObjectURL(makeCSVBlob())
        // @TODO prepend student name to filename? we can't determine if user is student or teacher though
        target.innerHTML = `<p><a href="${url}" download="timesheet.csv">Download CSV</a><br>As with the totals, this exports <b>only the entries visible in the list above</b> so use the "Entries per page" and "Search" settings to ensure you get all the data you need.</p>`
    } else {
        // Browsers that don't support HTML5 download attribute
        target.innerHTML = "<p>Your browser does not support CSV export, please use a modern browser like the latest version of Chrome or Firefox.</p>"
    }
}

document.addEventListener('DOMContentLoaded', main)
