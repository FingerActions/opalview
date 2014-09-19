'use strict';
angular.module('starter.controllers')
	.controller('CardDetailCtrl', function ($scope, $stateParams, card) {
		$scope.cards = card.get($stateParams.cardId);
	});