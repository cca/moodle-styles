const { src, dest, parallel } = require('gulp')
const concat = require('gulp-concat')
const iife = require('gulp-iife')
const insert = require('gulp-insert')
const rename = require('gulp-rename')
const sass = require('gulp-sass')(require('sass'))
const uglify = require('gulp-uglify')

// silence deprecation warnings due to old gulp plugins
const process = require('process')
process.removeAllListeners('warning')

const settings = {
    dest: 'build',
    src: {
        additionalhtml: ['additionalhtml/*.js'],
        head: ['additionalhtmlhead/*.js'],
        mobile: ['mobile-css/index.scss']
    }
}

function moodleMobile() {
    return src(settings.src.mobile, { sourcemaps: false })
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename('mobile.css'))
        .pipe(dest(settings.dest))
}

function addlhtml() {
    return src(settings.src.additionalhtml)
        .pipe(concat('footer.js'))
        .pipe(iife())
        .pipe(uglify())
        .pipe(insert.prepend(`<script async src="https://www.googletagmanager.com/gtag/js?id=G-9KK2VCY0TM"></script><script>\n// minified ${new Date().toLocaleString()} - see https://github.com/cca/moodle-styles\n`))
        .pipe(insert.append('\n</script>'))
        .pipe(dest(settings.dest))
}

// same as above but no GTM script & don't minify
function addlhtmlDev() {
    return src(settings.src.additionalhtml)
        .pipe(concat('footer.js'))
        .pipe(iife())
        .pipe(insert.prepend(`<script>\n// updated ${new Date().toLocaleString()} - see https://github.com/cca/moodle-styles\n`))
        .pipe(insert.append('\n</script>'))
        .pipe(dest(settings.dest))
}

// defunct since we have no additionalhtmlhead js anymore
function head() {
    return src(settings.src.head)
        .pipe(concat('head.js'))
        .pipe(iife())
        .pipe(uglify())
        .pipe(insert.prepend(`<script>\n// minified ${new Date().toLocaleString()} - see https://github.com/cca/moodle-styles\n`))
        .pipe(insert.append('\n</script>'))
        .pipe(dest(settings.dest))
}

// by default, do all builds in parallel
module.exports = {
    addlhtml: addlhtml,
    addlhtmlDev: addlhtmlDev,
    default: parallel([moodleMobile]),
    head: head,
    mobile: moodleMobile,
}
