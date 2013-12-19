'use strict';

/* Controllers */

var todoControllers = angular.module('todoControllers', []);

todoControllers.controller('TodoCtrl', [ '$scope', 'ListTodo',
		function($scope, ListTodo) {
			$scope.todos = ListTodo.getTodos();

			$scope.addTodo = function() {
				var newTodo = new ListTodo;
				newTodo.summary = $scope.todoText;
				newTodo.done = false;
				newTodo.dismissed = false;
				$scope.todos.push(newTodo);
				$scope.todoText = '';
				newTodo.$save();
			};

			$scope.remaining = function() {
				var count = 0;
				angular.forEach($scope.todos, function(todo) {
					if (!todo.done && !todo.dismissed) {
						count++;
					}
				});
				return count;
			};

			$scope.archive = function() {
				var oldTodos = $scope.todos;
				$scope.todos = [];
				angular.forEach(oldTodos, function(todo) {
					if (!todo.done && !todo.dismissed)
						$scope.todos.push(todo);
				});
			};

			$scope.done = function(todo) {
				todo.done = true;
			};

			$scope.dismiss = function(todo) {
				todo.dismissed = true;
			};

			$scope.$watch('todos', function() {
				$scope.remainingCount = $scope.remaining();
			}, true);

		} ]);