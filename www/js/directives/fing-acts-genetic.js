'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsGenetic
 * @description
 * # fingActsGenetic
 */
angular.module('fing.acts.directives')
  .directive('fingActsGenetic', function () {
    return {
      templateUrl: 'templates/card/fing-acts-genetic.html',
      restrict: 'E'
    };
  });
