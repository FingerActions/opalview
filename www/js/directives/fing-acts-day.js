'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsDay
 * @description
 * # fingActsDay
 */
angular.module('fing.acts.directives')
	.directive('fingActsDay', function () {
		return {
			templateUrl: 'templates/card/fing-acts-day.html',
			restrict: 'E'
		};
	});