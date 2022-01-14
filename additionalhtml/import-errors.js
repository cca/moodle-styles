// suppress two useless error messages that occur after an otherwise-successful import
// 1) "Exception - Call to undefined method format_topcoll::get_contextid()
// UPDATE: this was fixed as I was writing thie code
// 2) "Insufficient capability to assign capability 'block/panopto:provision_asteacher' to role!"
// @TODO all of this is untested
if (location.pathname.match('/backup/import.php')) {
    let msgs = [
        'Exception - Call to undefined method format_topcoll::get_contextid()'
    ]
    if (MutationObserver) {
        const observer = new MutationObserver(mutations => {
            console.log('mutations', mutations)
            let errmsg = $('.errormessage')
            if (errmsg.length) {
                // if we have a useless error message: remove it, link back to course, fix appearance, & stop observing
                if (msgs.some(m => errmsg.text().match(m))) {
                    errmsg.parent().remove()
                    let url = $('a[data-key="coursehome"]').attr('href') || location.origin
                    $('.continuebutton').html(`<a href="${url}" class="btn btn-primary">Continue</a>`)
                    $('.wibbler').css('border', 0).find('.wibble').hide()
                    observer.disconnect()
                }
                return true
            }
        })
        observer.observe(document.getElementById('executionprogress'), {
            attributes: false,
            childList: true,
            characterData: false
        })
    }
}
