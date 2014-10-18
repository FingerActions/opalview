'use strict';

/**
 * @ngdoc directive
 * @name fgts.directive:fgtsCalcTabs
 * @description
 * # fgtsCalcTabs
 */
angular.module('fgts.directives')
  .directive('fgtsCalcTabs', function () {
    return {
      templateUrl: 'templates/calculator/fgts-calc-tabs.html',
      restrict: 'E'
    };
  });
