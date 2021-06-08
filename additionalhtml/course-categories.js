// run on course management page
// we don't have jQuery yet so use vanilla JS
if (location.pathname.match('/course/management.php')) {
    // make course titles link to course view instead of same page we're on
    document.querySelectorAll('#course-category-listings #course-listing .coursename').forEach(course => {
        let link = new URL(course.href)
        course.href = `/course/view.php?id=${link.searchParams.get('courseid')}`
    })
}
