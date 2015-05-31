'use strict';

/**
 * @ngdoc directive
 * @name fgts.directive:fgtsHistText
 * @description
 * # fgtsHistText
 */
angular.module('fgts.directives')
  .directive('fgtsHistTxt', function () {
    return {
      templateUrl: 'templates/history/fgts-hist-txt.html',
      restrict: 'E'
    };
  });
