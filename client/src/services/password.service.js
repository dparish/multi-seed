(function() {
    'use strict';

    angular.module('seed.services')
        .factory('passwordService', Service);

    /**
     * An example service that provides user-related services. Note that all
     * services are singletions, i.e. once injected into a function, their
     * local variables are always the same.
     *
     * If you need to reset local variables, you will need to add logic for that.
     */
    function Service() {
        return {
            checkPassword: checkPassword
        };

        function checkPassword(password) {
            if (!password) {
                return false;
            }
            return true;
        }
    }
}());
