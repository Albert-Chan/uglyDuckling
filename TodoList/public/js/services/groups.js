'use strict';

/* Services */

angular.module('planBIG.group').factory('GroupService', [ '$resource', function ($resource) {
    return $resource('groups/:groupId', {
        todoId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });

} ]);
