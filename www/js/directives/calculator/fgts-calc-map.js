'use strict';

/**
 * @ngdoc directive
 * @name fgts.directive:fgtsCalcMap
 * @description
 * # fgtsCalcMap
 */
angular.module('fgts.directives')
  .directive('fgtsCalcMap', function () {
    return {
      templateUrl: 'templates/calculator/fgts-calc-map.html',
      restrict: 'E'
    };
  });
