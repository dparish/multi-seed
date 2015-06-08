(function() {
    'use strict';

    /**
     * Style Y021 (https://github.com/johnpapa/angular-styleguide#style-y021)
     *
     * Perform module declaration here without using any variables. Chaining
     * helps with achieving cleaner code.
     *
     * NOTE: Module definitions in *.module.js and app.js files need to have
     * this format. If you have no imports, leave the angled brackets blank.
     * For example: .module('seed', [])
     */
    angular
        .module('seed', [
            'ui.router',
            'seed.home',
            'seed.header',
            'seed.footer'
        ])
        .config(appConfiguration)
        .run(appSetup);

    /**
     * Perform application-wide configuration here. Router configuration should
     * be performed in a separate file with the *.router.js extension.
     */
    function appConfiguration() {
    }

    /**
     * Style Y171 (https://github.com/johnpapa/angular-styleguide#style-y171)
     *
     * Perform application setup here. Any code that needs to run here should be
     * declared in a factory, then initialized here. This will reduce code clutter
     * and make it easier to identify potential errors.
     */
    function appSetup() {
        // TODO: Perform application setup
    }
}());
