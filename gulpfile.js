var gulp = require('gulp'),
    istanbul = require('gulp-istanbul'),
    mocha = require('gulp-mocha'),
    markdox = require('gulp-markdox'),
    concat = require('gulp-concat'),
    es = require('event-stream');

gulp.task('docs', docs);
gulp.task('test', test);

/**
 *
 * */
function docs() {
    es.merge(gulp.src('PREFACE.md'),
        gulp.src(['gulpfile.js', './generators/**/*.js', '!./generators/**/*.spec.js'])
            .pipe(markdox())
            .pipe(concat('DOCUMENTATION.md')))
        .pipe(concat('README.md'))
        .pipe(gulp.dest('./'));
}

function test(cb) {
    gulp.src(['slushfile.js', 'generators/**/*.js', '!generators/**/*.spec.js'])
        .pipe(istanbul()) // Covering files
        .pipe(istanbul.hookRequire()) // Force `require` to return covered files
        .on('finish', function () {
            gulp.src(['generators/**/*.spec.js'])
                .pipe(mocha())
                .pipe(istanbul.writeReports()) // Creating the reports after tests ran
                .on('end', cb);
        });
}



