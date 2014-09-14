'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsAvatar
 * @description
 * # fingActsAvatar
 */
angular.module('fing.acts.directives')
  .directive('fingActsAvatar', function () {
    return {
      templateUrl: 'templates/card/fing-acts-avatar.html',
      restrict: 'E'
    };
  });
