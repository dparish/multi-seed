(function(require, __dirname) {
    'use strict';

    var gulp = require('gulp');
    var del = require('del');
    var concat = require('gulp-concat');
    var html2js = require('gulp-html2js');
    var less = require('gulp-less');
    var rename = require('gulp-rename');
    var minifyCSS = require('gulp-minify-css');
    var minifyHTML = require('gulp-minify-html');
    var uglify = require('gulp-uglify');
    var path = require('path');
    var inject = require('gulp-inject');
    var plumber = require('gulp-plumber');
    var jshint = require('gulp-jshint');
    var jscs = require('gulp-jscs');
    var ngAnnotate = require('gulp-ng-annotate');
    var args = require('yargs').argv;

    var production = args.type === 'production';

    var paths = {
        src: {
            javascript: [
                'src/**/*.module.js',
                'src/**/**/**/*.js',
                'src/**/**/*.js',
                'src/**/*.js',
                'src/*.js',
                '!src/**/*_test.js'
            ],
            otherJavascript: [
                '*.js',
                'e2e-tests/**/*.js',
                'src/**/*_test.js'
            ],
            less: ['src/*.less'],
            lessContributions: ['src/**/*.less', 'src/**/**/*.less'],
            images: ['src/images/**'],
            templates: ['src/**/**/**/*.html', 'src/**/**/*.html', 'src/**/*.html', '!src/*.html'],
            html: ['src/*.html'],
            components: [
                'bower_components/angular/angular.js',
                'bower_components/angular-animate/angular-animate.js',
                'bower_components/angular-bootstrap/ui-bootstrap.js',
                'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                'bower_components/angular-route/angular-route.js',
                'bower_components/angular-ui-router/release/angular-ui-router.js',
                'bower_components/angular-touch/angular-touch.js',
                'bower_components/angular-smart-table/dist/smart-table.js',
                'bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
                'bower_components/ng-tags-input/ng-tags-input.js'
            ],
            fonts: ['bower_components/bootstrap/fonts/*']
        },
        target: {
            base: 'build/app',
            javascript: 'build/app/js',
            images: 'build/app/images',
            css: 'build/app/css',
            fonts: 'build/app/fonts'
        }
    };

    gulp.task('bower_components', [], function() {
        var stream = gulp.src(paths.src.components);
        if (production) {
            stream = stream.pipe(concat('third-party.min.js'));
            stream = stream.pipe(uglify({
                mangle: true,
                compress: {'pure_funcs': ['console.log', 'console.debug']} //this eliminates console.log and console.debug calls
            }));
        }
        return stream.pipe(gulp.dest(paths.target.javascript + '/third-party'));
    });

    gulp.task('images', function() {
        return gulp.src(paths.src.images)
            .pipe(gulp.dest(paths.target.images));
    });

    gulp.task('fonts', function() {
        return gulp.src(paths.src.fonts)
            .pipe(gulp.dest(paths.target.fonts));
    });

    gulp.task('style', function() {
        var stream = gulp.src(paths.src.less);
        if (!production) {
            stream = stream.pipe(plumber()); // prevent compilation errors from killing gulp
        }
        stream = stream.pipe(less({
                paths: [path.join(__dirname, 'less', 'includes')]
            }));
        if (production) {
            stream = stream.pipe(minifyCSS({noAdvanced: true}));
        }
        return stream.pipe(rename({dirname: ''}))
            .pipe(gulp.dest(paths.target.css));
    });

    gulp.task('jscs', function() {
        return gulp.src(paths.src.javascript.concat(paths.src.otherJavascript))
            .pipe(jscs());
    });
    gulp.task('lint', function() {
        return gulp.src(paths.src.javascript.concat(paths.src.otherJavascript))
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'));
    });

    gulp.task('angular_app', ['lint', 'jscs'], function() {
        var stream = gulp.src(paths.src.javascript, {base: 'src'});
        stream = stream.pipe(ngAnnotate({'single_quotes': true}));
        if (production) {
            stream = stream.pipe(concat('gem.min.js'));
            stream = stream.pipe(uglify({
                    mangle: true,
                    compress: {'pure_funcs': ['console.log', 'console.debug']} //this eliminates console.log and console.debug calls
                }));
        }
        return stream.pipe(gulp.dest(paths.target.javascript));
    });

    // Read all the HTML templates and put them in to a single JS file
    gulp.task('templates', function() {
        return gulp.src(paths.src.templates)
            .pipe(minifyHTML({empty: true}))
            .pipe(html2js({base: 'src'}))
            .pipe(concat('templates.js'))
            .pipe(gulp.dest(paths.target.javascript));
    });

    gulp.task('html', ['angular_app', 'bower_components'], function() {
        var stream = gulp.src(paths.src.html);
        // Inject the references to the third party javascript files
        var thirdPartyPaths;
        if (production) {
            thirdPartyPaths = [paths.target.javascript + '/third-party/third-party.min.js'];
        } else {
            thirdPartyPaths = [paths.target.javascript + '/third-party/angular.js', // angular.js has to be specified here so its injected first
                paths.target.javascript + '/third-party/ui-bootstrap.js', // and ui-bootstrap.js has to be injected second
                paths.target.javascript + '/third-party/*.js'
            ];
        }
        stream = stream.pipe(inject(
            gulp.src(thirdPartyPaths, {read: false}),
            {addRootSlash: false, ignorePath: paths.target.base, starttag: '<!-- inject:third-party:{{ext}} -->'}
        ));

        // Inject the references to the application's javascript files
        if (production) {
            stream = stream.pipe(inject(gulp.src(paths.target.javascript + '/gem.min.js', {read: false})
                    .pipe(rename({dirname: '../../../js'})), {addRootSlash: false}));
        } else {
            stream = stream.pipe(inject(gulp.src(paths.src.javascript, {read: false})
                    .pipe(rename(function(path) {
                        path.dirname = 'js/' + path.dirname;
                    })
                ), {addRootSlash: false, ignorePath: 'src'}));
        }
        if (production) {
            stream = stream.pipe(minifyHTML({empty: true}));
        }
        return stream.pipe(gulp.dest(paths.target.base));
    });

    gulp.task('clean', function(cb) {
        del([paths.target.base], cb);
    });

    gulp.task('default', ['clean'], function() {
        gulp.start('images', 'fonts', 'style', 'bower_components', 'lint', 'jscs', 'angular_app', 'templates', 'html');
    });

    gulp.task('watch', ['default'], function() {
        gulp.watch(paths.src.images, ['images']);
        gulp.watch(paths.src.lessContributions, ['style']);
        gulp.watch(paths.src.javascript, ['angular_app', 'html']);
        gulp.watch(paths.src.templates, ['templates']);
        gulp.watch(paths.src.html, ['html']);
        gulp.watch(paths.src.otherJavascript, ['lint', 'jscs']);
    });

    /* global require */
    /* global __dirname */
}(require, __dirname));
