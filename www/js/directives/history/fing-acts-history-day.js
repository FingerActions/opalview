'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsHistoryDay
 * @description
 * # fingActsHistoryDay
 */
angular.module('fing.acts.directives')
  .directive('fingActsHistoryDay', function () {
    return {
      templateUrl: 'templates/history/fing-acts-history-day.html',
      restrict: 'E'
    };
  });
