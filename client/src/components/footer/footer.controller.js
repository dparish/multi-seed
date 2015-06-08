/**
 * Created by atugay on 4/23/15.
 */
(function() {
    'use strict';

    angular
        .module('seed.footer')
        .controller('footerController', Controller);

    function Controller() {
        var vm = this;

        vm.foo = 'bar';
    }
}());
