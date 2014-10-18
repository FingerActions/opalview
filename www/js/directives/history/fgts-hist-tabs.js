'use strict';

/**
 * @ngdoc directive
 * @name fgts.directive:fgtsHistTabs
 * @description
 * # fgtsHistTabs
 */
angular.module('fgts.directives')
	.directive('fgtsHistTabs', function () {
		return {
			templateUrl: 'templates/history/fgts-hist-tabs.html',
			restrict: 'E'
		};
	});
