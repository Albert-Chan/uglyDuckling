'use strict';

/* Controllers */
angular.module('planBIG.group').controller('GroupCtrl', [ '$scope', '$location', '$http', 'GroupService',
    function($scope, $location, $http, GroupService) {
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
            $scope.groupsMatched = GroupService.query({
                groupName: $scope.queryText
            });
        };

        $scope.joinGroup = function (group) {
            $http.get('/join?groupId=' + group._id).
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        };

    } ]);
