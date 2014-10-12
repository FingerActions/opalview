'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsCalculatorfooter
 * @description
 * # fingActsdaymonthyear
 */
angular.module('fing.acts.directives')
  .directive('fingActsCalculatortabbtn', function () {
    return {
      templateUrl: 'templates/button/fing-acts-calculatortabbtn.html',
      restrict: 'E'
    };
  });
