'use strict';

/* Controllers */
angular.module('planBIG.group').controller('GroupCtrl', [ '$scope', '$location', 'GroupService',
    function($scope, $location, GroupService) {
        $scope.groups = GroupService.query();

        $scope.addGroup = function() {
            if ($scope.groupName == undefined || $scope.groupName == "") {
                return;
            }
            var newGroup = new GroupService({
                groupName: $scope.groupName,
                description: $scope.description,
                createdTime: (new Date()).valueOf()});
            $scope.groups.push(newGroup);
            newGroup.$save();
        };

        $scope.searchGroup = function() {
            if ($scope.queryText == undefined || $scope.queryText == "") {
                return;
            }
            GroupService.get({
                groupName: $routeParams.groupName
            }, function(group) {
                $scope.group = group;
            });
        };

    } ]);
