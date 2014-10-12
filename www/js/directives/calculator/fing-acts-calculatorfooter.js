'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsCalculatorfooter
 * @description
 * # fingActsdaymonthyear
 */
angular.module('fing.acts.directives')
  .directive('fingActsCalculatorfooter', function () {
    return {
      templateUrl: 'templates/button/fing-acts-calculatorfooter.html',
      restrict: 'E'
    };
  });
