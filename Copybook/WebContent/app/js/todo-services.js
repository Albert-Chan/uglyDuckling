'use strict';

/* Services */

var todoServices = angular.module('todoServices', [ 'ngResource' ]);

todoServices.factory('ListTodo', [ '$resource', function($resource) {
	return $resource('http://localhost:8080/Copybook/rest/todos', {}, {
		getTodos : {
			method : 'GET',
		}
	});
} ]);
