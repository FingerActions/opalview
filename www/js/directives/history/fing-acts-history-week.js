'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsHistoryWeek
 * @description
 * # fingActsHistoryWeek
 */
angular.module('fing.acts.directives')
  .directive('fingActsHistoryWeek', function () {
    return {
      templateUrl: 'templates/history/fing-acts-history-week.html',
      restrict: 'E'
    };
  });
