const { src, dest, parallel, watch } = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const exec = require('child_process').exec;

const settings = {
	dest: {
		mobile: "build"
	},
	src: {
		mobile: ["mobile-css/index.scss"]
	}
}

function moodleMobile() {
	return src(settings.src.mobile, { sourcemaps: false })
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(rename('mobile.css'))
		.pipe(dest(settings.dest.mobile));
}

function scp() {
	return exec(`scp build/mobile.css libraries.cca.edu:/opt/moodle38/local`, (err, stdout, stderr) => {
		if (err) throw err
		stdout.pipe(process.stdout)
		stderr.pipe(process.stderr)
	})
}

// @TODO https://www.npmjs.com/package/gulp-exec
// scp file into place, echo instruction to `manage.py collectstatic`, ssh into server

// watch each main set of files & run its associated task
function watchTask() {
	return watch(settings.src.mobile, moodleMobile)
}

// by default, do all builds in parallel
exports.default = parallel([moodleMobile])
exports.mobile = moodleMobile
exports.scp = scp
exports.watch = watchTask
