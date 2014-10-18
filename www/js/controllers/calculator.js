'use strict';
angular.module('fgts.controllers')
	.controller('CalculatorCtrl', function ($scope, calculator) {
		calculator.train('Ashfield', 'Town Hall', function(error, data){
			console.log(data);
		});

		$scope.type = 'map';

		$scope.setType = function(type) {
			$scope.type = type;
		};

	});
