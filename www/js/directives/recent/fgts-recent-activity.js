'use strict';

/**
 * @ngdoc directive
 * @name fgts.directive:fgtsRecentActivity
 * @description
 * # fgtsRecentActivity
 */
angular.module('fgts.directives')
  .directive('fgtsRecentActivity', function () {
    return {
      templateUrl: 'templates/recent/fgts-recent-activity.html',
      restrict: 'E'
    };
  });
