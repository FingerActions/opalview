'use strict';
angular.module('starter.controllers')
	.controller('CardDetailsCtrl', function ($scope, $stateParams, card) {
		card.get($stateParams.cardNumber, function(data){
			$scope.card = data;
		});
	});
