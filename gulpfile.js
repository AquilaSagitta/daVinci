/**
 * # Developing This Generator
 *
 * Things you need to know if contributing.
 * */

/**
 * It is not necessary to have `gulp` installed globally. Use
 *
 * ```bash
 * npm run task -- [taskname]
 * ```
 *
 * Otherwise use gulp as normal.
 *
 * ```bash
 * gulp [taskname]
 * ```
 * */
var gulp = require('gulp'),
    istanbul = require('gulp-istanbul'),
    mocha = require('gulp-mocha'),
    markdox = require('gulp-markdox'),
    concat = require('gulp-concat'),
    es = require('event-stream');

gulp.task('docs', docs);
gulp.task('test', test);
/////////////////////

/**
 * @name docs
 * @description Generate documentation. This task searches all js files for inline
 * documentation and generates markdown. It then concatenates the markdown with `PREFACE.md` and finally writes that to
 * `README.md`.
 *
 * ### Example
 *
 * ```bash
 * npm run task -- docs
 * # or if you have gulp installed globally
 * gulp docs
 * ```
 *
 * @see [Markdox#Quickstart](https://github.com/cbou/markdox#quick-start)
 * */
function docs() {
    es.merge(gulp.src('PREFACE.md'),
        gulp.src(['./generators/**/*.js', '!./generators/**/*.spec.js', 'gulpfile.js'])
            .pipe(markdox())
            .pipe(concat('DOCUMENTATION.md')))
        .pipe(concat('README.md'))
        .pipe(gulp.dest('./'));
}

/**
 * @name test
 * @description Starts tests. [Mocha](http://mochajs.org/) is the testing framework used with [Chai](http://chaijs.com/) assertion library.
 *
 * ### Example
 *
 * ```bash
 * npm test
 * # or if you have gulp installed globally
 * gulp test
 * ```
 * */
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



