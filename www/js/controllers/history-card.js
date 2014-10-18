'use strict';
angular.module('fgts.controllers')
  .controller('HistoryCardCtrl', function($scope, $stateParams, card) {
    $scope.viewType = 'chart';

    $scope.chartType = 'bar';

    $scope.acConfig = {
      labels: true,
      legend:{
        display:false,
        position:'left'
      }
    };

    $scope.acData = [];

    $scope.toggleButtonImage = 'https://c2.staticflickr.com/4/3214/2699906907_a0d5efa66f.jpg';

    $scope.toggleViewType = function() {
      if ($scope.viewType === 'chart') {
        $scope.viewType = 'text';
        $scope.toggleButtonImage = 'http://pandas-xlsxwriter-charts.readthedocs.org/en/latest/_images/chart_grouped_column_farms.png';
      }
      else {
        $scope.viewType = 'chart';
        $scope.toggleButtonImage = 'https://c2.staticflickr.com/4/3214/2699906907_a0d5efa66f.jpg';
      }
    };

    $scope.acData = {
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
 				x: "TS",
				y: [6.8]
 			}, {
 				x: "F",
			  y: [5.5]
      }, {
        x: "SA",
        y: [6.8]
      }, {
        x: "SU",
        y: [6.8]
      }]
    };

    card.getCardDetails($stateParams.cardNumber, function(error, data) {
      var opal = data;
      $scope.title = opal.cardNickName;

      $scope.viewBy = 'day';

      $scope.setView = function(view) {
        $scope.viewBy = view;
      };



    });
  });
