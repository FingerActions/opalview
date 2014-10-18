'use strict';
angular.module('fgts.controllers')
	.controller('TodayCtrl', function ($scope, today) {
	today.travelInfo(function(error, data){
		$scope.serviceInfo = data;
		console.log($scope.serviceInfo);
	});
});
