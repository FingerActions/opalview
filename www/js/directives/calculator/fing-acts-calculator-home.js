'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsCalculatorHome
 * @description
 * # fingActsCalculatorHome
 */
angular.module('fing.acts.directives')
  .directive('fingActsCalculatorHome', function () {
    return {
      templateUrl: 'templates/calculator/fing-acts-calculator-home.html',
      restrict: 'E'
    };
  });
