'use strict';

/**
 * @ngdoc directive
 * @name fgts.directive:fgtsNewsDetails
 * @description
 * # fgtsNewsDetails
 */
angular.module('fgts.directives')
  .directive('fgtsNewsDetails', function () {
    return {
      templateUrl: 'templates/news/fgts-news-details.html',
      restrict: 'E'
    };
  });
