'use strict';
angular.module('starter.controllers')
	.controller('CardDetailsCtrl', function ($scope, $stateParams, card) {
		$scope.card = card.get($stateParams.cardNumber);
		console.log($scope.card);
	});
