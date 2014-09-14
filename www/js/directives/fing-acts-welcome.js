'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsWelcome
 * @description
 * # fingActsGenetic
 */
angular.module('fing.acts.directives')
  .directive('fingActsWelcome', function () {
    return {
      templateUrl: 'templates/card/fing-acts-welcome.html',
      restrict: 'E'
    };
  });
