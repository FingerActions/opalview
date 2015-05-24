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

    $scope.toggleButtonImage = '../../img/charts.png';

    $scope.toggleViewType = function() {
      if ($scope.viewType === 'text') {
        $scope.viewType = 'chart';
        $scope.toggleButtonImage = '../../img/charts.png';
      }
      else {
        $scope.viewType = 'text';
        $scope.toggleButtonImage = '../../img/data.jpg';
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
