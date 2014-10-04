'use strict';
angular.module('starter.controllers')
	.controller('CalculatorCtrl', function ($scope, calculator) {
		calculator.init(function (){
			calculator.calculate('Ashfield', 'Town Hall', function(error, data){
			});
		});

	});
