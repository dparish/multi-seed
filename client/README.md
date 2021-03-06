# BP3AngularSeed #
Angular Seed used by BP3 Global, Inc. for starting new Angular projects. It is designed to help people new to Angular as a guide for their projects and as a style guide for people experienced in Angular.

Most of these styles were adapted from the [John Papa Angular Style Guide](https://github.com/johnpapa/angular-styleguide)

All Packages and Components used in this project come from other Open Source projects. When using these components,
you need to follow the guidelines outlined by licenses provided by those projects, giving proper attributions when
needed.

# License #
Please refer to LICENSE file for the license of this project, which uses GPLv2.

# Installing Dependencies #
First of all, you will need to install NodeJS which comes with `npm`, the package manager for JavaScript related projects. [Instructions are available on the NodeJS website](https://nodejs.org/download/).

The rest of the commands, you will need to run through the terminal (or command prompt if you're on Windows).

Next, navigate to the location you cloned this project to and run `npm install`. This will install all the modules defined in the `package.json` file (If you would like to learn more about this file, you can [read the npm Documentation](https://docs.npmjs.com/files/package.json). It's always a good idea to install `gulp` globally because then it can be run from anywhere on your system. This can be done using the `npm install -g gulp` command.

<TODO>

## Building the Application ##

# NPM Modules #
The following NPM modules are used in this seed:
* JSCS - Javascript code style checker. Catches style errors, but not bugs or errors.
* JSHint - Javascript bug and error catcher.
* Bower - Package manager for front-end related components.
* Gulp - Task and build manager.

# Bower Components #
The following Bower components are used in this seed:
* Angular - Client-side dynamic web application framework.
* UI Router - Client-side page routing for Angular.
* UI Bootstrap - Angular wrapper around Bootstrap components.
* Bootstrap - Dynamic and modern CSS definitions component.

# Structure of the Seed #
The following folder structure with files is used in this seed:

* _root_ - The root folder, usually containing application-wide NPM component configuration and build files.
    * _.gitignore_ - GitHub file ignore configuration. When committing to GitHub, Git ignores file patterns defined in 
     this file.
    * _.jscsrc_ - Configuration file for JSCS Style Checker.
    * _.jshintrc_ - Configuration file for JSHint.
    * _bower.json_ - Bower configuration file used by `bower` during component installation and updates. 
    * _gulpfile.js_ - Gulp definition file, used by `gulp` to run tasks for building the application.
    * _LICENSE_ - License file. GPLv2 for this project.
    * _package.json_ - NPM configuration file used by `npm` during module installation and updates
    * _README.md_ - The readme, i.e. instruction manual for this seed. It is included in most subdirectories if
     explanation is required.
    * **build** - Folder generated by gulp tasks. **This folder should be served by the server**.
    * _app_ - Contains Angular files to be used by gulp tasks.
        * _components_ - Contains reusable components for the application
            * _footer_ Footer template that will be used by all the pages.
            * _header_ - Header template that will be used by all the pages.
            * _typeahead_ - Typeahead directive that can be reused anywhere in the application.
        * _home_ - Contains one of the pages' content to be displayed by the application. Other pages should go into
         their respective subfolders.
        * _services_ - Contains services available to the entire application. Usually these services are HTTP REST calls.
        * _app.js_ - The main application module. All other modules should use the base module name defined in this file.
        * _app.less_ - The main CSS LESS file to be compiled with `gulp`. All other LESS files should be imported by
         this less file. 
        * _app.router.js_ - The entry point to app routing. The base route should be defined here and all other routes
         should preferably inherit that base route (in this case, the 'seed' route).
        * _index.html_ - Only static file that needs to be served by the server. All other HTML pages are Angular templates
         that will be handled by UI Router.
    
All other files/folders not mentioned here have explanations in README files, inside their respective directories.
