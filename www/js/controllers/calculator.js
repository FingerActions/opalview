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

		$scope.result1 = '';
    	$scope.options1 = null;
    	$scope.details1 = '';

    	$scope.result2 = '';
    	$scope.options1 = null;
    	$scope.details1 = '';


	});
