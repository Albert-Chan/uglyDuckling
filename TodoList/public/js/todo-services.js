'use strict';

/* Services */

var todoServices = angular.module('todoServices', [ 'ngResource' ]);

todoServices.factory('TodoService', [ '$resource', function($resource) {
	return $resource('todos/:todoId', {
        todoId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });

} ]);
