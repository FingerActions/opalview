'use strict';
angular.module('starter.controllers')
	.controller('HistoryCtrl', function ($scope, card) {
		card.getAll(function (error, data) {
			$scope.cards = data;
		});
	});
