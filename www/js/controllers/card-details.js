'use strict';
angular.module('starter.controllers')
	.controller('CardDetailsCtrl', function ($scope, $stateParams, card) {
		card.getCard($stateParams.cardNumber, function(error, data){
			$scope.card = data;
		});
	});
