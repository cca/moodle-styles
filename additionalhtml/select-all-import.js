// https://github.com/cca/moodle-styles/issues/10
// Make it easier to select all/none on Import page
(function() {
    function waitForjQuery(fn) {
        if (window.jQuery && $('.backup_stage_current').text().match('2. Initial settings')) {
            fn()
        } else {
            setTimeout(() => waitForjQuery(fn), 200)
        }
    }

    if (location.pathname.match('/backup/import.php')) {
        waitForjQuery(addSelectAll)
    }

    function addSelectAll() {
        let html = '<div class="row"><div class="col-md-3"></div><div class="col-md-9"><input id="cca-select-all" name="select-all" type="checkbox" value="" data-state="deselect">&nbsp;&nbsp;<label class="cca-select-all-label" for="select-all">Select none</label></div></div>'
        $('#id_rootsettings .ftoggler').after(html)
        let select_all = $('#cca-select-all')

        select_all.prop("indeterminate", true).add('.cca-select-all-label').on('click', function(ev) {
            ev.preventDefault()
            if (select_all.data('state') === 'select') {
                // check all other boxes
                $('.checkbox input[type="checkbox"]').prop('checked', true)
                // update state
                select_all.data('state', 'deselect').next().text('Select none')
            } else {
                // assume state=deselect
                $('.checkbox input[type="checkbox"]').prop('checked', false)
                select_all.data('state', 'select').next().text('Select all')
            }
        })
    }
})()
