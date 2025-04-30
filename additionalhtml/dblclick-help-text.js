// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
function copyHelpToClipboard(event) {
    let content = event.target.parentElement.dataset.content
    if (content) {
        // strip HTML tags
        content = content.replace(/(<([^>]+)>)/gi, '')
        navigator.clipboard.writeText(content).then(()=>{
            if (require) {
                require(['core/modal'], (Modal) => {
                    Modal.create({
                        title: 'Help text copied',
                        body: 'Double-clicking a help icon <i class="icon fa fa-question-circle text-info fa-fw"></i>copies its text to your clipboard.'
                    }).then((modal) => {
                        modal.show()
                    })
                })
            }
        }, ()=>{
            console.error('error in copying text to clipboard')
        })
    }
}

document.querySelectorAll('.fa-question-circle.text-info').forEach(el => {
    el.addEventListener('dblclick', copyHelpToClipboard)
})
