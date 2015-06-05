# Usage of Strict Mode #
You will see the string `'use strict';` on top of most of the JavaScript files. This refers to a feature of JavaScript,
as [described by the Mozilla Developer Network (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) as:

> Strict mode makes several changes to normal JavaScript semantics. First, strict mode eliminates some JavaScript silent 
> errors by changing them to throw errors. Second, strict mode fixes mistakes that make it difficult for JavaScript 
> engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not 
> strict mode. Third, strict mode prohibits some syntax likely to be defined in future versions of ECMAScript.

Using strict mode is required if you want to have clean, efficient, and better handled JavaScript code.

# Module #
What packages are to Java, modules are to Angular. Modules can be thought of 'packages' that contain angular components
that need to work together. They are a great way to abstract different parts of the web-application, since they can be easily
connected together via included (import equivalent of Java).

Each folder that defines an "abstractable" set of components should have a module definition.

## Configuration and Setup ##
Modules will sometimes need configuration and setup when they are first started. Module configurations and setup can
be performed in the `*.module.js` files.

# Routing #
Traditionally, pages are served by a server whenever a user changes URLs. An Angular library called UI Router allows
all of this to be done client side, thanks to Angular Templates. Usually Angular router applications lead to a better user
experience, since most of the common page content can be loaded on initial page visit and page switching can be handled
by the client-side code. REST calls are made to the server when needed, such as when images or lookup data need to be
displayed to the user.

Routing configuration and setup is performed in files with `*.router.js` extension. Each folder, if it has templates
that require routing, should have this file.

## Templates ##
Angular templates are HTML files that are stored as a string in JavaScript files, ready to be compiled and served
to the user when needed. Such a method of storage helps Angular combine model and controller data with the DOM, helping
create a dynamic application.

See the Angular Docs on [Templates](https://docs.angularjs.org/guide/templates) for more information.

## Index Page ##
Notice that `index.html` contains two unfamiliar things: a directive called `ui-view` and `inject` comments. The `ui-view`s
are where the views for different routes will be inserted. The rest of the HTML pages will be handled by UI router, so
the server should only be service `index.html`.

`inject` comments are where `gulp` will inject the combined and minified JavaScript files, per it's definition file.

# Controllers #
Controllers, just like their names suggest, control how the view and model should be interacting with each other.

All controllers in route definitions should have the following syntax:

```js
controller: 'controllerName as vm'
```

This naming convention is called 'naming the controller with controllerAs'.

Assigning 'this' to a local variable - the reference to the owner of the function - allows us to expose it to the
template. Using this helps keep the $scope clean, as adding variables and functions to the scope tend to clutter
it and defeat the purpose of prototypical inheritance (the way angular scopes are inherited by child controllers).

$scope should only be used to perform scope related operations, such as watching a variable or manually starting
the $digest cycle.

# Directives #
Directives are a great way of consolidating HTML that needs to be repeated all across your application with dynamic
behavior. For example, if you would like to add a typeahead input box, you will need to do just a little bit more then
including an HTML input tag. A typeahead will need a service to call the server for possible values for the input, as 
well as a mechanism to display all of those typeahead values. It will also need to know when you selected a typeahead
value.

Furthermore, if you need to perform Document Object Model (DOM) manipulation, directives will make your life a whole
lot easier.

So what does a typehead directive give us? It lets us bind any type of information to our typeahead and use it anywhere
in our application we want, i.e. abstraction, reuseability, and flexibility. We can use this typeahead to give input
suggestions for addresses, usernames, flag names, country names, phone numbers, etc. Furthermore, we don't have to copy
and paste all the code needed for a typeahead to function.

We could even publish it as a standalone library if we wanted to!

# General Guidelines you should follow #
* Use descriptive variable, function, module, and component names. For example, if you have a directive called 'user',
that displays a panel with user information, it's not very obvious what this directive's responsibilities are. Naming it
something like 'user-info-display' would make it a lot more easier to understand when, where, and what this directive can
be used for and is doing. **Don't worry about the length of names. During the minification process, all of these
names will be shortened for efficiency anyways**.
* Avoid commenting too much. If you have to put too many comments, that means your code is not clear. Try using better
naming conventions and code structure. That being said, some comments will always be required no matter what.
* Make use of all the angular components described above. They are available for a reason.