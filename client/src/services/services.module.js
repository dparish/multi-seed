(function() {
    'use strict';

    /**
     * Typically, each folder should have a *.module.js, module definition file
     * where the module name is defined and all the imports required for that module
     * are performed. All files in that subdirectory then use angular.module('seed.services')
     * to get a reference to the module and add factories, controllers, directives, etc.
     * to it. This is very good for abstraction of your application.
     *
     * ALL imports to a module should be ONLY performed in the *.module.js file for the
     * directory.
     */
    angular.module('seed.services', []);
}());
