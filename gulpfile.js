const { src, dest, parallel, watch } = require('gulp')
const babel = require("gulp-babel")
const concat = require("gulp-concat")
const iife = require("gulp-iife")
const insert = require("gulp-insert")
const rename = require('gulp-rename')
const sass = require('gulp-sass')
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
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(uglify())
        .pipe(insert.prepend(`<script>\n// minified ${Date()} - see https://github.com/cca/moodle-styles\n`))
        .pipe(insert.append('\n</script>'))
        .pipe(dest(settings.dest))
}

// watch each main set of files & run its associated task
function watchTask() {
	return watch(settings.src.mobile, moodleMobile)
}

// by default, do all builds in parallel
exports.addlhtml = addlhtml
exports.default = parallel([moodleMobile])
exports.mobile = moodleMobile
exports.scp = scp
exports.watch = watchTask
