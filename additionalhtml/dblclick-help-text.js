// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
function copyHelpToClipboard(event) {
    let content = event.target.parentElement.dataset.content
    if (content) {
        // strip HTML tags
        content = content.replace(/(<([^>]+)>)/gi, "")
        navigator.clipboard.writeText(content).then(()=>{
            if (M && M.core && M.core.alert) {
                new M.core.alert({
                    'title': 'Help text copied',
                    'message': 'Double-clicking a help icon <i class="icon fa fa-question-circle text-info fa-fw"></i>will copy its text to your clipboard.'
                })
            }
        }, ()=>{
            console.error('error in copying text to clipboard')
        })
    }
}

document.querySelectorAll('.fa-question-circle.text-info').forEach(el => {
    el.addEventListener('dblclick', copyHelpToClipboard)
});
