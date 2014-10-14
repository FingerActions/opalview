'use strict';
angular.module('starter.controllers')
	.controller('CalculatorCtrl', function ($scope, calculator) {
		calculator.calculate('Ashfield', 'Town Hall', function(error, data){
			console.log(data);
		});

		$scope.type = 'map';
		$scope.setType = function(type) {
			$scope.type = type;
		};

	});
