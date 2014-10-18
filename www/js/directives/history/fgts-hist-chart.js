'use strict';

/**
 * @ngdoc directive
 * @name fgts.directive:fgtsHistChart
 * @description
 * # fgtsHistChart
 */
angular.module('fgts.directives')
  .directive('fgtsHistChart', function () {
    return {
      templateUrl: 'templates/history/fgts-hist-chart.html',
      restrict: 'E'
    };
  });
