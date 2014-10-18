'use strict';

/**
 * @ngdoc directive
 * @name fgts.directive:fgtsRecent
 * @description
 * # fgtsRecent
 */
angular.module('fgts.directives')
  .directive('fgtsRecent', function () {
    return {
      templateUrl: 'templates/recent/fgts-recent.html',
      restrict: 'E'
    };
  });
