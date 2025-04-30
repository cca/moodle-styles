// add a button to the staging main menu to switch to same page on prod
const stagingDomain = 'moodle-stg-1.cca.edu'
const prodDomain = 'moodle.cca.edu'
if (window.location.hostname === stagingDomain) {
    const url = window.location.href.replace(stagingDomain, prodDomain)
    const menuHtml = `<li class="nav-item" role="none" data-forceintomoremenu="false">
    <a role="menuitem" class="nav-link" href="${url}" data-disableactive="true">Production</a>
</li>`
    document.querySelector('.primary-navigation nav ul').insertAdjacentHTML('beforeend', menuHtml);
}
