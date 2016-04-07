/**
 * @name default
 * @description The default generator. It generates everything in `generators/base/template`.
 *
 * ### Example
 *
 * ```bash
 * slush davinci
 *
 * # Requested User Input
 * # appName: Name of application to be used in package.json and other generated files.
 * # appDescription: Description of application to be used in package.json and other generated files.
 * # appVersion: Semantic Version number of generated application.
 * # authorName:
 * # authorEmail:
 * # userName: GitHub username.
 * # moveon: Confirms generator configuration values and starts generation if `true`.
 * ```
 *
 * #### Outputs
 *
 * ```
 * /appName
 * |--.gitignore
 * |--index.html
 * |--README.md
 * ```
 * */
module.exports = function(gulp, install, conflict, template, rename, _, inquirer, path) {
    'use strict';

    var defaultValue = defaults();

    gulp.task('default', defaultTask);

    return gulp;
    /////////////////////

    function defaultTask(done) {
        var prompts = [{
            name: 'appName',
            message: 'What is the name of your project?',
            default: defaultValue.appName
        }, {
            name: 'appDescription',
            message: 'What is the project\'s description?'
        }, {
            name: 'appVersion',
            message: 'What is the version of your project?',
            default: '0.1.0'
        }, {
            name: 'authorName',
            message: 'What is the author\'s name?'
        }, {
            name: 'authorEmail',
            message: 'What is the author\'s email?'
        }, {
            name: 'userName',
            message: 'What is the github username?'
        }, {
            type: 'confirm',
            name: 'moveon',
            message: 'Continue?'
        }];

        //Ask
        inquirer.prompt(prompts, function (answers) {
            if (!answers.moveon) {
                setTimeout(function () { // Allow task_stop listeners to get attached
                    done();
                });
                return;
            }
            answers.appNameSlug = _.slugify(answers.appName);
            gulp.src([__dirname + '/template/**'])
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
    }

    // Helpers
    function defaults() {
        var workingDirName = path.basename(process.cwd());

        return {
            appName: workingDirName
        };
    }
};
