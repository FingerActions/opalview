'use strict';

/**
 * @ngdoc directive
 * @name fgts.directive:fgtsHistText
 * @description
 * # fgtsHistText
 */
angular.module('fgts.directives')
  .directive('fgtsHistText', function () {
    return {
      templateUrl: 'templates/history/fgts-hist-text.html',
      restrict: 'E'
    };
  });
