'use strict';
angular.module('starter.controllers')
	.controller('HistoryCtrl', function ($scope, card) {
		$scope.cards = card.all();
	});