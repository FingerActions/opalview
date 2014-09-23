'use strict';
angular.module('starter.controllers')
	.controller('HistoryCtrl', function ($scope, card) {
		$scope.cards = card.all();
		$scope.config = {
			title: '',
			tooltips: true,
			labels: false,
			mouseover: function () {},
			mouseout: function () {},
			click: function () {},
			legend: {
				display: true,
				position: 'left',
				htmlEnabled: false
			},
			colors: [],
			innerRadius: 0,
			lineLegend: 'lineEnd',
			lineCurveType: 'cardinal',
			isAnimate: true,
			yAxisTrickFormat: 's'
		};

		$scope.data = {
			"series": [
				"Sales",
				"Income",
				"Expense"
			],
			"data": [{
				"x": "Computers",
				"y": [
					54,
					0,
					879
				],
				"tooltip": "This is a tooltip"
			}]
		};
	});