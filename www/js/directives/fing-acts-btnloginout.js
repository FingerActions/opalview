'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsbtnloginout
 * @description
 * # fingActsBtnloginout
 */
angular.module('fing.acts.directives')
  .directive('fingActsBtnloginout', function () {
    return {
      templateUrl: 'templates/button/fing-acts-btnloginout.html',
      restrict: 'E'
    };
  });
