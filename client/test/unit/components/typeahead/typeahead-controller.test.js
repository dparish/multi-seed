(function() {
    describe('Type Ahead Controller Test', function() {
        'use strict';

        var controller;

        beforeEach(module('seed.typeahead'));

        beforeEach(inject(function($controller) {
            var scope = {};
            controller = $controller('TypeaheadController', { $scope: scope });
        }));

        it('not a real test', function() {
            expect(angular.isObject(controller)).toBeTruthy();
        })

    });
}());
