(function() {
    'use strict';

    angular.module('seed.services')
        .factory('userService', userService);

    /**
     * An example service that provides user-related services. Note that all
     * services are singletions, i.e. once injected into a function, their
     * local variables are always the same.
     *
     * If you need to reset local variables, you will need to add logic for that.
     */
    function userService($window, $http) {
        var user = {};

        return {
            initialize: initialize,
            getUser: getUser,
            getUserAccessLevel: getUserAccessLevel
        };

        function initialize(id) {
            // TODO: initialize the user service before usage.
            return $http({
                url: 'http://localhost:8080/user/' + id,
                method: 'GET'
            }).then(function success(response) {
                    user = response.data;
                }, function failure(message) {
                    $window.alert(message);
                });
        }

        function getUser() {
            return user;
        }

        function getUserAccessLevel() {
            return user.accessLevel;
        }
    }
}());
