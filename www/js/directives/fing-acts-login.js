'use strict';

/**
 * @ngdoc directive
 * @name fing.acts.directive:fingActsLogin
 * @description
 * # fingActsLogin
 */
angular.module('fing.acts.directives')
	.directive('fingActsLogin', function () {
		return {
			templateUrl: 'templates/login.html',
			restrict: 'E'
		};
	});