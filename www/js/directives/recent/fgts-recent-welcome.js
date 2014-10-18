'use strict';

/**
 * @ngdoc directive
 * @name fgts.directive:fgtsRecentWelcome
 * @description
 * # fgtsRecentWelcome
 */
angular.module('fgts.directives')
  .directive('fgtsRecentWelcome', function () {
    return {
      templateUrl: 'templates/recent/fgts-recent-welcome.html',
      restrict: 'E'
    };
  });
