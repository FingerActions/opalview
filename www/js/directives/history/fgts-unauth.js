'use strict';

/**
 * @ngdoc directive
 * @name fgts.directive:fgtsUnauth
 * @description
 * # fgtsUnauth
 */
angular.module('fgts.directives')
  .directive('fgtsUnauth', function () {
    return {
      templateUrl: 'templates/history/fgts-unauth.html',
      restrict: 'E'
    };
  });
