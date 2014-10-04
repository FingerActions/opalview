'use strict';
angular.module('starter.controllers')
	.controller('HistoryCtrl', function ($scope, card) {
		card.getJsonCardDetailsArray(function (error, data) {
			console.log(data);
			$scope.cards = data;
		});
	});