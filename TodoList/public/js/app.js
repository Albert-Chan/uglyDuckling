'use strict';

angular.module('planBIG',
    ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'planBIG.system', 'planBIG.articles', 'planBIG.todoList', 'planBIG.group']);

angular.module('planBIG.system', []);
angular.module('planBIG.articles', []);

angular.module('planBIG.todoList', [
  'ngRoute',
  'todoControllers',
  'todoServices'
]);

angular.module('planBIG.group', []);