// hide Feedback activity's "Preview questions" button from students
// https://tracker.moodle.org/browse/MDL-70586
// only show if "Settings" menu link is not present (as for students)
if (location.pathname.match('/mod/feedback/view.php') && !document.querySelector('.secondary-navigation .moremenu li[data-key="modedit"]')) {
    document.querySelector('.feedback_description .tertiary-navigation a[href*="/mod/feedback/print.php?id="]').remove()
}
