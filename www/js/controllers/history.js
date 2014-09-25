'use strict';
angular.module('starter.controllers')
	.controller('HistoryCtrl', function ($scope, card) {
		$scope.cards = card.all();
		$scope.config1 = {
			labels: false,
			title: "Products",
			legend: {
				display: true,
				position: 'left'
			},
			innerRadius: 0
		};
		$scope.data1 = {
			series: ['Sales', 'Income', '<i>Expense</i>', 'Laptops', 'Keyboards'],
			data: [{
				x: "Sales",
				y: [100, 500, 0],
				tooltip: "this is tooltip"
			}, {
				x: "Not Sales",
				y: [300, 100, 100]
			}, {
				x: "Tax",
				y: [351]
			}, {
				x: "Not Tax",
				y: [54, 0, 879]
			}]
		};
	});