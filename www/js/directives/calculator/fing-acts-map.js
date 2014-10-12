'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsmap
 * @description
 * # fingActsmap
 */
angular.module('fing.acts.directives')
  .directive('fingActsMap', function () {
    return {
      templateUrl: 'templates/button/fing-acts-map.html',
      restrict: 'E'
    };
  });
