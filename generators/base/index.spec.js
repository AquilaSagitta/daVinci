'use strict';
var chai = require('chai'),
    gulp = require('gulp'),
    mockGulpDest = require('mock-gulp-dest')(gulp),
    expect = chai.expect,
    mockPrompt = require('../../components/mockPrompt'),
    fs = require('fs');

require('../../slushfile');

describe('Generator Base', function() {
    var filesToExist = [
        'index.html',
        'README.md'
        ],
        filesToNotExist = [
            'index.js',
            'index.spec.js'
        ];

    before(function() {
        fs.stat('temp', function (er, s) {
            if(!er && s.isDirectory()) {
                process.chdir('temp');
            } else {
                fs.mkdir('temp');
                process.chdir('temp');
            }
        });
    });

    beforeEach(function() {
        mockPrompt({
            appName: 'test-app',
            userName: 'the-simian',
            authorName: 'Fancypants Harlin',
            authorEmail: 'derp@derp.derp',
            appDescription: 'some description',
            moveon: true
        });
    });

    filesToExist.forEach(function(file) {
        it('it should generate '+file, function(done) {
            assertGeneratedFile(file, done);
        });
    });
    filesToNotExist.forEach(function(file) {
        it('it should NOT generate '+file, function(done) {
            assertUnGeneratedFile(file, done);
        });
    });
    /*it('should exit if moveon is false', function(done) {
        mockPrompt({
            appName: 'test-app',
            userName: 'the-simian',
            authorName: 'Fancypants Harlin',
            authorEmail: 'derp@derp.derp',
            appDescription: 'some description',
            moveon: false
        });
        gulp
            .start('default')
            .once('finished', function() {
                mockGulpDest.assertDestNotContains(filesToExist);
                done();
            });
    });*/
    /////////////////////

    function assertGeneratedFile(file, cb) {
        gulp
            .start('default')
            .once('task_stop', function() {
                mockGulpDest.assertDestContains(file);
                cb();
            });
    }
    function assertUnGeneratedFile(file, cb) {
        gulp
            .start('default')
            .once('task_stop', function() {
                mockGulpDest.assertDestNotContains(file);
                cb();
            });
    }
});