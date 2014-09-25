'use strict';
angular.module('starter.controllers', ['angularCharts'])
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
				y: [100, 500, 0]
			}, {
				x: "T",
				y: [300, 100, 100]
			}, {
				x: "W",
				y: [300, 100, 100]
			}, {
				x: "T",
				y: [30, 0, 879]
			}, {
				x: "F",
				y: [54, 0, 879]
			}]
		};
	});