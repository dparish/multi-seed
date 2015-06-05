# Common Services Directory #

## Factories vs Services in Angular ##
According to the style guide, Factories should be preferred over Services, 
since Services are very similar to factories. This is just for consistency.
Note that some of the files will still be called "services" even though they
are implemented as Angular Factories.

See [Style Y040](https://github.com/johnpapa/angular-styleguide#style-y040).

**Important**: ALL Services need to have a single responsibility. For example,
 a user service should only deal with user related functionality. Once it exceeds
 that role, a new Service/Factory should be created to handle that functionality.

## Contents of the Services Folder ##
This folder should only contain the common services, i.e. services used 
application-wide. For example, it can contain a "user.service.js" Service
that provides authentication variables and functions to modules.

# Asynchronous Calls
JavaScript is a highly asynchrounous language, meaning that it can run several actions 
in parallel. However, this can cause unwanted behavior and eventually lead to a lot frustration.
This is when [JavaScript Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) come into play, which allow you to run operations after this asynchronous call you've
been waiting for is done.

## HTTP Services
An Angular app will almost always need Services that make back-end REST calls that
get the required data for display in your application. These REST calls can be made
using the Angular provided [$http service](https://docs.angularjs.org/api/ng/service/$http),
which has conveniecne functions to perform REST calls.

The one you will use the most is providing a configuration to `$http()`. For example:
```js
$http({
  url: 'http://localhost:8080/user/0',
  method: 'GET'
})
```

There are several other configuration options available to you, which can be found in the
documentation.

Since HTTP calls are asynchronous, they need to have a way of notifying the user when their
request is fullfilled (or otherwise). They use the object called `Promise` described above.

### Example
Consider a function that gets user information in the `userService` Service:

```js
function getUser(id) {
 var promise = $http({
     url: 'http://localhost:8080/user/' + id,
     method: 'GET'
 });
 
 promise.then(function success(response) {
         user = response.data;
     }, function failure(message) {
         $window.alert(message);
     }, function ongoing(notification) {
         console.log(notification);
     });
}
```

The first few lines are simple; the function creates an HTTP request and sends it to the address specified in the URL. But what happens while waiting for the response? To handle the wait time between when the request is made and when the response is received, `$http` uses a `Promise`, which you can get a reference to. The `Promise` object has a `.then` function that accepts 3 functions in this order:
* A function to handle a successful outcome (called 'resolving' the promise)
* A function to handle a failed outcome (called 'rejecting' the promise)
* A function to handle an ongoing process, i.e. no success or failure has occurred yet. (called 'notifying' the promise).

Using this specification, we know to pass a success function that sets our local `user` variable to the information received from the server, a failure function to tell the webapp user that the user information could not be retrieved, and a 'ongoing' function to show a developer on the JavaScript console while this HTTP call is still being processed by the server

The `user.service.js` features a simple scenario where $http can be used.

## Using a custom Promise
There might be cases when you need to perform an action that takes a while and you would like to run it asynchronously. Here are some examples where `Promise` might be useful.

### Example 1: Externally Waiting for HTTP Requests to Resolve
Consider the `getUser` function from above and assume it's called by a Controller for the user information page:

In the Page Controller:
```js
function UserInfoController($scope, userService) {
  userService.getUser(0);
  $scope.user = userService.user;
}
```

In the `userService`:
```js
var user;

function getUser(id) {
  // Same as the getUser function above
}
```

It's very likely that the userService.user will return ```undefined``` because `userService` will not have had enough time to receive a response from the server and save the response to the `user` variable by the time `getUser` is called. This is where a Promise becomes useful, helping us improve the `getUser` function:
```js
function getUser(id) {
  var deferred = $q.defer();
 
  var waitForHTTP = $http({
      url: 'http://localhost:8080/user/' + id,
      method: 'GET'
  });
  
  waitForHTTP.then(function success(response) {
          user = response.data;
          deferred.resolve(user); // New
      }, function failure(message) {
          //$window.alert(message);
          deferred.reject(message);
      }, function ongoing(notification) {
          //console.log(notification);
          deferred.notify(notification);
      });
      
  return deferred.promise
}
```

There are two major additions to `getUser`:
* `var deferred = $q.defer();` -> The `defer()` function gets an object that represents a task that will finish sometime in the future.
* `return deferred.promise` -> Returns `Promise` object of the task, promising to the caller that the task running in the `getUser` function will be resolved or rejected, and that it will notify you of its progress.

Now you can change your page controller to use this new feature:
```js
function UserInfoController($scope, $window, userService) {
  userService.getUser(0)
    .then(function success(user) {
      $scope.user = userService.user;
    }, function failure(message) {
      $window.alert(message);
    });
}
```
This new version of the controller and `getUser` function have several advantages:
* Better readability
* Error handling is passed on to the caller (customizability)
* Less 'hacks' and increased stability. Without a `Promise` object, you would have to put a `sleep` function to wait for the HTTP request to be fulfilled.

### Example 2: Custom Asynchronous Function
Using a `Promise` becomes more complicated when you have to write a custom function that needs to run asynchronously. Consider a case where you need a function to approximate the value of &pi;. If you want to approximate &pi; to a 100,000 decimal points, your function will take a while to complete. Since you don't want to wait for this function to complete and show the user how the progress is going, you will want to use a Promise to make your own asynchronous function.

Here's a [Plunkr](http://plnkr.co/edit/Y0Jbd5n9xcJ3Vjgx5BV7?p=preview) that shows this case.
