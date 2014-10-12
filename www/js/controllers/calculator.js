'use strict';
angular.module('starter.controllers')
	.controller('CalculatorCtrl', function ($scope, calculator) {
		calculator.calculate('Ashfield', 'Town Hall', function(error, data){
			console.log(data);
		});

		$scope.type = 'By Map';
		$scope.setType = function(event) {
			$scope.type = angular.element(event.target).text();
			console.log($scope.type);
		};
	});
