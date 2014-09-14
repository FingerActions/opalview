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
			templateUrl: 'templates/account/fing-acts-login.html',
			restrict: 'E'
		};
	});