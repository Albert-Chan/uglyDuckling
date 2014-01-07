'use strict';

/* Services */

angular.module('groupServices', [ 'ngResource' ]).factory('GroupService', [ '$resource', function ($resource) {
    return $resource('group/:groupId', {
        todoId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });

} ]);
