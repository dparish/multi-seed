(function() {
    'use strict';

    /**
     * An Angular Directive that wraps a custom filter around the Angular UI Bootstrap Typeahead.
     */
    angular.module('seed.typeahead')
        .directive('seedTypeahead', typeaheadDirective)
        .controller('TypeaheadController', TypeaheadController);

    function typeaheadDirective() {
        return {
            restrict: 'E',
            templateUrl: 'components/typeahead/typeahead.html',
            scope: {
                ngModel: '=',
                ngDisabled: '=?',
                placeholder: '@?'
            },
            controller: TypeaheadController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    function TypeaheadController($timeout, typeaheadSearch) {
        var vm = this;
        var potentialUsers;

        function filterMatches(val, limitTo) {
            var matches = [];
            if (potentialUsers) {
                for (var i = 0; i < potentialUsers.length; i++) {
                    if (potentialUsers[i].name.toLowerCase().search(val.toLowerCase()) !== -1) {
                        matches.push(potentialUsers[i]);
                        if (matches.length === limitTo) {
                            break;
                        }
                    }
                }
            }
            return matches;
        }

        vm.setUser = function(user) {
            vm.ngModel = user;
        };

        vm.getPotentialUsers = function(viewValue, limitTo) {
            return $timeout(function() {
                return typeaheadSearch.getPotentialTeamMembers(viewValue)
                    .then(function success(data) {
                        potentialUsers = data;
                        return filterMatches(viewValue, limitTo);
                    }, function error() {
                        console.log('Error', 'Unable to retrieve the list of available users');
                    });
            }, 200);
        };
    }
}());
