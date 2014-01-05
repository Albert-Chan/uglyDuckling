'use strict';

/* App Module */

var todoApp = angular.module('todoApp', [
  'ngRoute',
  'todoControllers',
  'todoFilters',
  'todoServices'
]);

todoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/todos', {
        templateUrl: 'views/index.html'
      }).
      when('/todos/:todoId', {
        templateUrl: 'views/todo-detail.html'
      }).
      otherwise({
        redirectTo: 'views/index.html'
      });
  }]);
