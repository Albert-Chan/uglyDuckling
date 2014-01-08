'use strict';

/* Services */

angular.module('planBIG.group').factory('GroupService', [ '$resource', function ($resource) {
    return $resource('groups/:groupId',
        {groupId: '@_id'},
        {update: {method: 'PUT'}}
    );
} ]);

angular.module('planBIG.group').factory('GroupJoinService', function($http) {
    return {
        joinGroup: function() {
            //return the promise directly.
            return $http.get('/foos')
                .then(function(result) {
                    //resolve the promise as the data
                    return result.data;
                });
        }
    }
});
