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
    path = require('path');

gulp = require('./generators/base/base.js')(gulp, install, conflict, template, rename, _, inquirer, path);
