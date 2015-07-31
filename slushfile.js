/*
 * slush-davinci
 * https://github.com/AquilaSagitta/slush-davinci
 *
 * Copyright (c) 2015, AquilaSagitta
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path'),
    markdox = require('gulp-markdox'),
    concat = require('gulp-concat'),
    es = require('event-stream');

gulp = require('./generators/base/index.js')(gulp, install, conflict, template, rename, _, inquirer, path);


gulp.task('docs', function() {
    es.merge(gulp.src('PREFACE.md'),
        gulp.src(['./generators/**/*.js', '!./generators/**/*.spec.js'])
            .pipe(markdox())
            .pipe(concat('DOCUMENTATION.md')))
        .pipe(concat('README.md'))
        .pipe(gulp.dest('./'));
});