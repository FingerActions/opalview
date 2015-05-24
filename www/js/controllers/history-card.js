'use strict';
angular.module('fgts.controllers')
  .controller('HistoryCardCtrl', function($scope, $stateParams, card, $ionicPopup) {
    $scope.chartType = 'bar';

    $scope.acConfig = {
      labels: true,
      legend: {
        display: false,
        position: 'left'
      }
    };

    $scope.acData = [];

    $scope.viewType = 'chart';

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

    var setView = $scope.setView = function(view) {
      $scope.viewBy = view;
      console.log("viewby: " + view);
      card.getCardActivitiesBy(view, function(error, data) {
        if(error) {
          $ionicPopup.alert({
            title: 'Sorry',
            template: error.message
          });
        }
        var opalActivities = data;

        switch(view)
        {
          case 'day':

            console.log("display day");
          break;

          case 'week':

            console.log("display week");
          break;

          case 'month':

            console.log("display month");
          break;
        }

        // $scope.acData = {
        //   data: [{
        //     x: 'M',
        //     y: [2.75]
        //   }, {
        //     x: 'T',
        //     y: [3.5]
        //   }, {
        //     x: 'W',
        //     y: [2.75]
        //   }, {
        //     x: 'TS',
        //     y: [6.8]
        //   }, {
        //     x: 'F',
        //     y: [5.5]
        //   }, {
        //     x: 'SA',
        //     y: [6.8]
        //   }, {
        //     x: 'SU',
        //     y: [6.8]
        //   }]
        // };

      });
    }; // end of setView
  });
