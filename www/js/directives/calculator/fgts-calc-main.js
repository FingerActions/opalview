'use strict';

/**
 * @ngdoc directive
 * @name fgts.directive:fgtsCalcMain
 * @description
 * # fgtsCalcMain
 */
angular.module('fgts.directives')
  .directive('fgtsCalcMain', function () {
    return {
      templateUrl: 'templates/calculator/fgts-calc-main.html',
      restrict: 'E'
    };
  });
