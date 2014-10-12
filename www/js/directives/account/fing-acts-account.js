'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsAccount
 * @description
 * # fingActsAccount
 */
angular.module('fing.acts.directives')
  .directive('fingActsAccount', function () {
    return {
      templateUrl: 'templates/account/fing-acts-account.html',
      restrict: 'E'
    };
  });
