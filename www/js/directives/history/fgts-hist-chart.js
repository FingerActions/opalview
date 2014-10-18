'use strict';

/**
 * @ngdoc directive
 * @name fgts.directive:fgtsHistWeek
 * @description
 * # fgtsHistWeek
 */
angular.module('fgts.directives')
  .directive('fgtsHistWeek', function () {
    return {
      templateUrl: 'templates/history/fgts-hist-week.html',
      restrict: 'E'
    };
  });
