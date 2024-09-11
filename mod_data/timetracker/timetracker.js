// This number changes depending on program. It's 225 for most required internships.
// Set to null if not needed.
const THRESHOLD = 225

// this JS is loaded on every template so always check for element existence
// before trying to manipulate the DOM
function main() {
    // add template, make the number input type=number (why is it text?!?)
    let input = document.querySelector('.number-input input')
    if (input) fixHoursInput(input)

    let pagination = document.querySelector('form nav.pagination')
    if (pagination) paginationWarning()

    let dateSection = document.getElementById('date')
    let params = new URLSearchParams(location.search)
    if (location.pathname.match('edit.php') && dateSection && params.get('rid')) dateRollbackWarning(dateSection)

    timecount()

    let target = document.getElementById('js-csv-export')
    if (target) exposeCSVExport(target)
}

function fixHoursInput(input) {
    input.type = 'number'
    input.step = '0.01'
}

function paginationWarning() {
    let alert = document.createElement('div')
    alert.className = 'alert alert-warning mt-2'
    alert.innerHTML = 'You are seeing this warning because not all entries are shown on this page and only visible entries count towards the <a href="#hours-totals">Totals</a>. Use the <strong>Entries per page</strong> input above to ensure you have the data you want.'
    document.querySelector('.datapreferences').appendChild(alert)
}

function dateRollbackWarning(section) {
    // when you edit an entry, the date is set to one day earlier than it was
    let alert = document.createElement('div')
    alert.className = 'alert alert-danger'
    alert.innerHTML = '<b>Warning:</b> if you edit an entry, the date resets to one day earlier than it was initially. Please double-check the date above is correct.'
    section.appendChild(alert)
}

function timecount() {
    // create the counts
    let counts = {}
    document.querySelectorAll('.js-data-row').forEach(row => {
        let name = row.querySelector('.js-data-cell .name').innerText
        let hours = parseFloat(row.querySelector('.js-data-cell .hours').innerText)
        counts[name] = parseFloat(((counts[name] || 0) + hours).toFixed(2))
    })

    // add counts to page
    let list = document.querySelector('.js-totals-list')
    for (var name in counts) {
        let row = document.createElement('tr')

        let nameCell = document.createElement('td')
        nameCell.innerText = name
        row.appendChild(nameCell)

        let countCell = document.createElement('td')
        countCell.innerText = counts[name]
        if (THRESHOLD && counts[name] >= THRESHOLD) countCell.innerText += ' ✅'
        row.appendChild(countCell)

        list.appendChild(row)
    }
}

function makeCSVBlob() {
    // collect data, jQuery not available yet
    let csvString = 'Person,Date,Hours\n'
    document.querySelectorAll('.js-data-row').forEach((row) => {
        row.querySelectorAll('.js-data-cell').forEach((cell, idx) => {
            let datum = cell.querySelector('.js-datum')
            if (datum) {
                // quote & escape quotes to avoid breaking CSV
                csvString += `"${datum.textContent.trim().replace(/"/g, '""')}",`
            }
            // if we add more fields then this condition will need to change
            if (idx === 3) {
                csvString += '\n'
            }
        })
    })

    let blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
    return blob
}

function exposeCSVExport(target) {
    if (document.createElement("a").download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        let url = URL.createObjectURL(makeCSVBlob())
        target.innerHTML = `<p><a class="btn btn-primary" href="${url}" download="timesheet.csv">Download CSV</a></p><p>As with the totals, this exports <b>only the entries visible in the list above</b> so use the "Entries per page" and "Search" settings to ensure you get all the data you need.</p>`
    } else {
        // Browsers that don't support HTML5 download attribute
        target.innerHTML = "<p>Your browser does not support CSV export, please use a modern browser like the latest version of Chrome or Firefox.</p>"
    }
}

document.addEventListener('DOMContentLoaded', main)
