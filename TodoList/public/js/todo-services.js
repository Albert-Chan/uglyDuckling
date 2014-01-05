'use strict';

/* Services */

var todoServices = angular.module('todoServices', [ 'ngResource' ]);

todoServices.factory('ListTodo', [ '$resource', function($resource) {
	return $resource('http://localhost:3000/todos', {}, {
		getTodos : {
			method : 'GET',
			isArray : true
		}
	});
} ]);
