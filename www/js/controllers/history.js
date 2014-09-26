'use strict';
angular.module('starter.controllers')
	.controller('HistoryCtrl', function ($scope, card) {
		$scope.cards = card.all();
		$scope.chartType = 'bar'
		$scope.config1 = {
			labels: false,
			title: "Weekly",
			legend: {
				display: false,
				position: 'left'
			},
			innerRadius: 0
		};
		$scope.data1 = {

			data: [{
				x: "M",
				y: [2.75]
			}, {
				x: "T",
				y: [3.5]
			}, {
				x: "W",
				y: [2.75]
			}, {
				x: "T",
				y: [6.8]
			}, {
				x: "F",
				y: [5.5]
			}]
		};
	});