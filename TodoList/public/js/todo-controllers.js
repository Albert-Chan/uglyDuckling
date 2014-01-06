'use strict';

/* Controllers */

var todoControllers = angular.module('todoControllers', []);

todoControllers.controller('TodoCtrl', [ '$scope', '$location', 'TodoService',
		function($scope, $location, TodoService) {
			$scope.todos = TodoService.query();

			$scope.addTodo = function() {
				if ($scope.todoText == undefined || $scope.todoText == "") {
					return;
				}
				var newTodo = new TodoService;
				newTodo.summary = $scope.todoText;
				newTodo.done = false;
				newTodo.dismissed = false;
				newTodo.createdTime = (new Date()).valueOf();
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
				// var updatedTodo = new TodoService{
				// 	_id : todo._id,
				// 	createdTime : (new Date()).valueOf()
				// 	summary: todo.summary,
				// 	done: todo.done,
				// 	dismissed: todo.dismissed,
				// };
				// updatedTodo.$update();
				todo.$update();
				// todo.$update((function() {
    //         		$location.path('todos/' + todo._id);
    //         	});
			};

			$scope.dismiss = function(todo) {
				todo.dismissed = true;
				// todo.$update((function() {
    //         		$location.path('todos/' + todo._id);
    //         	});
			};

			$scope.$watch('todos', function() {
				$scope.remainingCount = $scope.remaining();
			}, true);

		} ]);