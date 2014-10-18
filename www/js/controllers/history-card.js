'use strict';
angular.module('fgts.controllers')
  .controller('HistoryCardCtrl', function($scope, $stateParams, card) {
    $scope.viewType = 'chart';

    $scope.chartType = 'bar';

    $scope.acConfig = {
      labels: true,
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

    card.getCardDetails($stateParams.cardNumber, function(error, data) {
      var opal = data;
      $scope.title = opal.cardNickName;

      $scope.viewBy = 'day';

      $scope.setView = function(view) {
        $scope.viewBy = view;
      };

      $scope.acData = {
        series: ['1 Nov', '2 Nov', '3 Nov'],
        data: [{
          x: 'Days',
          y: [8, 10, 10, 9, 10, 8, 10]
        }]
      };

    });
  });
