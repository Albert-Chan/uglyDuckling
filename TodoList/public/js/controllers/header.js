'use strict';

angular.module('planBIG.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'TodoList',
        'link': 'todos'
    }, {
        'title': 'Group',
        'link': 'group'
    }, {
        'title': 'Articles',
        'link': 'articles'
    }, {
        'title': 'Create New Article',
        'link': 'articles/create'
    }];
    
    $scope.isCollapsed = false;
}]);