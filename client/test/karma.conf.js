module.exports = function(config){
    config.set({

        basePath : '..',

        preprocessors: {
            'src/**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/'
        },

        files : [
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-bootstrap/ui-bootstrap.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'src/**/*.module.js',
            'src/**/*.js',
            'src/**/*.html',
            'test/**/*.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage',
            'karma-ng-html2js-preprocessor'
        ],

        junitReporter : {
            outputFile: 'build/test/karma/unit.xml',
            suite: 'unit'
        }

    });
};