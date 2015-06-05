(function() {
    'use strict';

    angular.module('seed.typeahead')
        .factory('typeaheadSearch', typeaheadSearch);

    function typeaheadSearch($http) {
        return {
            getPotentialTeamMembers: getPotentialTeamMembers
        };

        function getPotentialTeamMembers(value) {
            return $http({method: 'GET', url: 'seed/lookup?partialText=' + value})
                .then(function(successResponse) {
                    return successResponse.data;
                }
            );
        }
    }
}());
