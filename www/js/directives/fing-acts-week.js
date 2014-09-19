'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsWeek
 * @description
 * # fingActsWeek
 */
angular.module('fing.acts.directives')
	.directive('fingActsWeek', function () {
		return {
			templateUrl: 'templates/card/fing-acts-week.html',
			restrict: 'E'
		};
	});