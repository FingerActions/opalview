'use strict';

/**
 * @ngdoc directive
 * @name fgts.directive:fgtsRecentAcc
 * @description
 * # fgtsRecentAcc
 */
angular.module('fgts.directives')
  .directive('fgtsRecentAcc', function () {
    return {
      templateUrl: 'templates/recent/fgts-recent-acc.html',
      restrict: 'E'
    };
  });
