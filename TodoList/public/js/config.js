'use strict';

//Setting up route
angular.module('planBIG').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/articles', {
                templateUrl: 'views/articles/list.html'
            }).
            when('/articles/create', {
                templateUrl: 'views/articles/create.html'
            }).
            when('/articles/:articleId/edit', {
                templateUrl: 'views/articles/edit.html'
            }).
            when('/articles/:articleId', {
                templateUrl: 'views/articles/view.html'
            }).
            when('/todos', {
                templateUrl: 'views/todolist.html'
            }).
            when('/todos/:todoId', {
                templateUrl: 'views/todo-detail.html'
            }).
            when('/group', {
                templateUrl: 'views/group.html'
            }).
            when('/group/:groupId', {
                templateUrl: 'views/group-detail.html'
            }).
            when('/', {
                templateUrl: 'views/index.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
]);

//Setting HTML5 Location Mode
angular.module('planBIG').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);