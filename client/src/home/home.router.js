(function() {
    'use strict';

    angular.module('seed.home')
        .config(router);

    function router($stateProvider) {
        $stateProvider
            // Notice the dotted (.) notation of routes. In app.router.js, the base route was named 'seed'.
            // Here, it's named 'seed.home', which implies that home is a child of the 'seed' parent page.
            // All your naming schemes should follow this pattern.
            .state('seed.home', {
                url: 'home',
                views: {
                    'content@': {
                        templateUrl: 'home/home.html',
                        controller: 'homeController as vm'
                    }
                }
            });
    }
}());
