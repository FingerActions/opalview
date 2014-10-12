'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsHistoryMonth
 * @description
 * # fingActsHistoryWeek
 */
angular.module('fing.acts.directives')
  .directive('fingActsHistoryMonth', function () {
    return {
      templateUrl: 'templates/history/fing-acts-history-month.html',
      restrict: 'E'
    };
  });
