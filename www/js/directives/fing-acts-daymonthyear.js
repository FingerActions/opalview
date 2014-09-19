'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsdaymonthyear
 * @description
 * # fingActsdaymonthyear
 */
angular.module('fing.acts.directives')
	.directive('fingActsDaymonthyear', function () {
		return {
			templateUrl: 'templates/button/fing-acts-daymonthyear.html',
			restrict: 'E'
		};
	});