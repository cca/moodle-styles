// run on user profile pages
if (location.pathname.match('/user/profile.php')) {
    // make course titles -> course instead of essentially the same profile page
    document.querySelectorAll('.node_category .contentnode li a').forEach(link => {
        let url = new URL(link.href)
        let course = url.searchParams.get('course')
        // check that the link is to a user profile in the context of a course
        if (url.pathname === '/user/view.php' && course) {
            link.href = `/course/view.php?id=${course}`
        }
    })
}
