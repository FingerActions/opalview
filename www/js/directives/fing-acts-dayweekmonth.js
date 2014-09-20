'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsdaymonthyear
 * @description
 * # fingActsdaymonthyear
 */
angular.module('fing.acts.directives')
	.directive('fingActsDayweekmonth', function () {
		return {
			templateUrl: 'templates/button/fing-acts-dayweekmonth.html',
			restrict: 'E'
		};
	});