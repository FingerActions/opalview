'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsCard
 * @description
 * # fingActsCard
 */
angular.module('fing.acts.directives')
  .directive('fingActsCard', function () {
    return {
      templateUrl: 'templates/card/fing-acts-card.html',
      restrict: 'E'
    };
  });
