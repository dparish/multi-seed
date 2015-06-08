(function() {
    'use strict';

    angular
        .module('seed.header')
        .controller('headerController', Controller);

    function Controller() {
        var vm = this;

        vm.foo = 'bar';
    }
}());
