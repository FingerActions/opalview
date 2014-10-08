'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsNeedlogin
 * @description
 * # fingActsNeedlogin
 */
angular.module('fing.acts.directives')
  .directive('fingActsNeedlogin', function () {
    return {
      templateUrl: 'templates/card/fing-acts-needlogin.html',
      restrict: 'E'
    };
  });
