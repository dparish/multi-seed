(function() {
    'use strict';

    /**
     * Router configuration file, separate from the module file. All router configurations
     * in the folder should be performed in a file with *.router.js extension.
     *
     * For more information on how to use UI Router, visit:
     * GitHub page: https://github.com/angular-ui/ui-router
     * GitHub Wiki: https://github.com/angular-ui/ui-router/wiki
     * Detailed Documentation: http://angular-ui.github.io/ui-router/site/#/api/ui.router
     */
    angular.module('seed')
        .config(router)
        .run(redirections);

    /**
     * Place simple routing configurations in the router config
     */
    function router($urlRouterProvider, $stateProvider) {
        $urlRouterProvider
            .when('', '/home')
            .otherwise('/');

        $stateProvider
            .state('seed', {
                url: '/',
                abstract: true, // This route is never directly accessible
                views: {
                    'header': {
                        templateUrl: 'components/header/header.html',
                        controller: 'headerController as vm'
                    },
                    'content': {
                        templateUrl: 'home/home.html',
                        controller: 'contentController as vm'
                    },
                    'footer': {
                        templateUrl: 'components/footer/footer.html',
                        controller: 'footerController as vm'
                    }
                }
            })
            .state('seed.not-found', {
                url: 'notFound',
                views: {
                    'view@': {
                        templateUrl: 'not-found/not-found.html'
                    }
                }
            });
    }

    /**
     * Place more advanced redirections here, the ones that cannot be defined in the router
     * config above.
     *
     * NOTE: All your redirection configurations should be performed in app.router.js,
     * otherwise, you may experience unintended behavior.
     */
    function redirections($rootScope, $state, $timeout) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if (toState.name === 'seed') {
                $timeout(function() {
                    // Location: 'Replace' is essential for redirections when you want to
                    // overwrite the previous history record.
                    $state.go('app.main', null, {location: 'replace'});
                });
            }
        });
    }
}());
