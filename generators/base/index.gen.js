/**
 * @name test
 * */
module.exports = function(gulp, install, conflict, template, rename, _, inquirer, path) {
    'use strict';

    /*function format(string) {
        var username = string.toLowerCase();
        return username.replace(/\s/g, ''); //remove spaces
    }*/

    var defaults = (function () {
        var workingDirName = path.basename(process.cwd());

        return {
            appName: workingDirName
        };
    })();

    gulp.task('default', function (done) {
        var prompts = [{
            name: 'appName',
            message: 'What is the name of your project?',
            default: defaults.appName
        }, {
            name: 'appDescription',
            message: 'What is the description?'
        }, {
            name: 'appVersion',
            message: 'What is the version of your project?',
            default: '0.1.0'
        }, {
            name: 'authorName',
            message: 'What is the author name?'
        }, {
            name: 'authorEmail',
            message: 'What is the author email?'
        }, {
            name: 'userName',
            message: 'What is the github username?'
        }, {
            type: 'confirm',
            name: 'moveon',
            message: 'Continue?'
        }];
        //Ask
        inquirer.prompt(prompts,
            function (answers) {
                if (!answers.moveon) {
                    setTimeout(function() { // Allow task_stop listeners to get attached
                        done();
                    });
                    return;
                }
                answers.appNameSlug = _.slugify(answers.appName);
                gulp.src([__dirname + '/**', '!' + __dirname + '/**/*.gen.js', '!' + __dirname + '/**/*.spec.js'])
                    .pipe(template(answers))
                    .pipe(rename(function (file) {
                        if (file.basename[0] === '_') {
                            file.basename = '.' + file.basename.slice(1);
                        }
                    }))
                    .pipe(conflict('./'))
                    .pipe(gulp.dest('./'))
                    .on('finish', function () {
                        done();
                    });
            });
    });
    return gulp;
};
