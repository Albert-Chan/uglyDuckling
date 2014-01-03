'use strict';

/* App Module */

var todoApp = angular.module('todoApp', [
  'ngRoute',
  'todoAnimations',

  'todoControllers',
  'todoFilters',
  'todoServices'
]);

todoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);
