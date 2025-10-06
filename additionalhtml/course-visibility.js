/**
 * Get a query string parameter from the current URL.
 * @param {string} name
 * @returns {string|null}
 */
function getQueryParam(name) {
    try {
        const params = new URLSearchParams(window.location.search)
        return params.get(name)
    } catch (e) {
        return null
    }
}

/**
 * Retrieve the visibility of a Moodle course. Uses the core AJAX
 * API (core/ajax) and the webservice functioncore_course_get_courses
 * filtered by a single course id.
 * @param {number|string} id The course id (from the "id" query param)
 * @returns {Promise<number>} Resolves to 1 (visible) or 0 (hidden)
 */
function getCourseVisibility(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            return reject(new Error('Course id not found in URL (query param "id")'))
        }

        // we assume we have require, see setInterval below
        require(['core/ajax'], (ajax) => {
            const method = 'core_course_get_courses'
            const promises = ajax.call([
                {
                    methodname: method,
                    args: { options: { ids: [id] } }
                }
            // ajax.call returns an array of promises
            ])
            if (!promises.length) {
                console.error(`ajax.call() did not return any promises for ${method}`)
            } else {
                promises[0].then((courses) => {
                    if (Array.isArray(courses) && courses.length === 1) {
                        if (!Object.prototype.hasOwnProperty.call(courses[0], 'visible')) {
                            return reject(new Error('course data has no visible property, possibly a permissions problem?'))
                        }
                        return resolve(courses[0].visible)
                    } else {
                        console.error('Unexpected course data', courses)
                        reject(new Error('Unexpected course data; we either got a non-array or more than one course from core_course_get_courses.'))
                    }
                }).catch(err => reject(err))
            }
        })
    })
}

/**
 * Adds a 'course is hidden' badge under course title
 * @returns  {void}
 */
function courseHiddenBadge() {
    // ? Will we have jQuery by now?
    $('.page-header-headings').append('<span class="badge rounded-pill bg-info text-light" style="cursor:help" title="Go to Settings &gt; Course visibility to make your course visible."><i class="icon fa fa-eye-slash fa-fw" aria-hidden="true"></i>Hidden from students</span>')
}

// only run on course home page
if (location.pathname.match('/course/view.php')) {
    // wait until require is available or we reach 5 tries
    let tries = 0
    const interval = setInterval(() => {
        if (typeof require === 'function' || tries >= 5) {
            clearInterval(interval)
            if (typeof require !== 'function') {
                return console.error('AMD require/core/ajax not available in this environment')
            }
            getCourseVisibility(getQueryParam('id'))
                .then(visible => {
                    if (visible === 0) courseHiddenBadge()
                })
                .catch(e => console.error(e))
        }
        tries++
    }, 400)
}
