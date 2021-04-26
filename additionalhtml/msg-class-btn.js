// https://github.com/cca/moodle-styles/issues/6
// button to message the whole class
// if 1) we're on class roster page & 2) we have the "send a message" option in
// the "with selected users..." menu
let qs = e => document.querySelector(e)
let sendMsgOption = '#formactionid option[value="#messageselect"]'
if (location.pathname.match('user/index.php') && qs(sendMsgOption)) {
    let msgBtn = document.createElement('button')
    msgBtn.className = 'btn btn-secondary my-2 js-msg-class'
    msgBtn.innerText = 'Message Class'
    let msgClass = function() {
        if (!qs('#select-all-participants').checked) {
            // by now we should have jQuery
            $('#select-all-participants').click()
        }
        // we wait for other JS events to catch up, mimic a real user
        setTimeout(()=>{
            $('#formactionid').click()
            setTimeout(() => $(sendMsgOption).select() && $(sendMsgOption).click(), 200)
        }, 200)
    }

    qs('#enrolusersbutton-1').after(msgBtn)
    qs('.js-msg-class').addEventListener('click', msgClass)
}
