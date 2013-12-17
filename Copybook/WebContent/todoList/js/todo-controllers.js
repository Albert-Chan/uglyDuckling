'use strict';

/* Controllers */

var todoControllers = angular.module('todoControllers', []);

todoControllers.controller('TodoCtrl', [ '$scope', 'ListTodo',
		function($scope, ListTodo) {
			$scope.todos = ListTodo.getTodos();

			$scope.addTodo = function() {
				$scope.todos.todo.push({
					summary : $scope.todoText,
					done : "false",
					dismissed : "false"
				});
				$scope.todoText = '';
			};

			$scope.remaining = function() {
				var count = 0;
				angular.forEach($scope.todos.todo, function(todo) {
					if (todo.done == "false" && todo.dismissed == "false") {
						count++;
					}
				});
				return count;
			};

			$scope.archive = function() {
				var oldTodos = $scope.todos.todo;
				$scope.todos.todo = [];
				angular.forEach(oldTodos, function(todo) {
					if (todo.done == "false" && todo.dismissed == "false")
						$scope.todos.todo.push(todo);
				});
			};

			$scope.done = function(todo) {
				todo.done = true;
			};

			$scope.dismiss = function(todo) {
				todo.dismissed = true;
			};

			$scope.$watch('todos.todo', function() {
				$scope.remainingCount = $scope.remaining();
			}, true);

		} ]);