const { src, dest, parallel } = require('gulp')
const concat = require("gulp-concat")
const eslint = require('gulp-eslint')
const iife = require("gulp-iife")
const insert = require("gulp-insert")
const rename = require('gulp-rename')
const sass = require('gulp-sass')(require('sass'))
const uglify = require("gulp-uglify")

const settings = {
	dest: "build",
	src: {
		additionalhtml: ["additionalhtml/*.js"],
		mobile: ["mobile-css/index.scss"]
	}
}

function moodleMobile() {
	return src(settings.src.mobile, { sourcemaps: false })
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(rename('mobile.css'))
		.pipe(dest(settings.dest));
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

// same as above but no GTM script
function addlhtmlDev() {
	return src(settings.src.additionalhtml)
		.pipe(concat('footer.js'))
		.pipe(iife())
		.pipe(uglify())
		.pipe(insert.prepend(`<script>\n// minified ${new Date().toLocaleString()} - see https://github.com/cca/moodle-styles\n`))
		.pipe(insert.append('\n</script>'))
		.pipe(dest(settings.dest))
}

function lint() {
	return src(settings.src.additionalhtml)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
}

// by default, do all builds in parallel
module.exports = {
	addlhtml: addlhtml,
	addlhtmlDev: addlhtmlDev,
	default: parallel([moodleMobile]),
	lint: lint,
	mobile: moodleMobile,
	test: lint,
}
