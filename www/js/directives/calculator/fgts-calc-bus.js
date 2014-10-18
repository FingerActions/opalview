'use strict';

/**
 * @ngdoc directive
 * @name fgts.directive:fgtsCalcBus
 * @description
 * # fgtsCalcBus
 */
angular.module('fgts.directives')
  .directive('fgtsCalcBus', function () {
    return {
      templateUrl: 'templates/calculator/fgts-calc-bus.html',
      restrict: 'E'
    };
  });
