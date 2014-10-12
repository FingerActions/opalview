'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsUnauthenticated
 * @description
 * # fingActsUnauthenticated
 */
angular.module('fing.acts.directives')
  .directive('fingActsUnauthenticated', function () {
    return {
      templateUrl: 'templates/account/fing-acts-unauthenticated.html',
      restrict: 'E'
    };
  });
