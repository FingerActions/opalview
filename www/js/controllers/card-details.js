'use strict';
angular.module('starter.controllers')
	.controller('CardDetailsCtrl', function ($scope, $stateParams, card) {
		card.getCard($stateParams.cardNumber, function(error, data) {
			$scope.card = data;
		});

		$scope.type = 'Day';

		$scope.setType = function(type) {
			$scope.type = type;
		};
	});
