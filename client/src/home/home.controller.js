(function() {
    'use strict';

    /**
     * Controllers have a lot of style definitions. Please see https://github.com/johnpapa/angular-styleguide#controllers
     * for all the controller styles that should be used.
     */
    angular.module('seed.home')
        .controller('homeController', HomeController);

    /**
     * IMPORTANT: For controllers to work properly, you will need to use the following syntax when defining controllers
     * for routes:
     *
     * controller: 'controllerName as vm'
     *
     * Please see the readme for more details.
     *
     */
    function HomeController() {
        var vm = this;

        vm.session = session;
        vm.refresh = refresh;
        vm.search = search;
        vm.title = 'Home';
        vm.physicalAddress = 'Address, Austin, TX';

        function session() {
        }
        function refresh() {
        }
        function search() {
        }
    }
}());
