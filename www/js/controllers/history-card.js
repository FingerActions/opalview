'use strict';
angular.module('fgts.controllers')
  .controller('HistoryCardCtrl', function($scope, account,$stateParams, card, $ionicPopup) {

    var isLoggedin = $scope.isLoggedin = account.isLoggedin();

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

    /*************** place holder function .... need to change to get all data  ***********/
    function getCardsRecent(data, isRefresh) {
      var opals = data;
      var length = opals.length;

      while (length-- > 0) {
        opals[length].activities = [];
        card.getCardActivities(function(error, data, status, headers, config) {
          if (error) {
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Sorry',
              template: error.message
            });
          }
          var cardIndexIndex = config.url.indexOf('cardIndex');
          var index = cardIndexIndex + 10;
          var url = config.url;
          var cardIndex = '';
          var urlLength = url.length;

          var nextChar = url[index];
          while (nextChar !== '&' && ++index < urlLength) {
            cardIndex += nextChar;
            nextChar = url[index];
          }

          if (error || !data) {
            $scope.opals[cardIndex].activities = null;
          } else {
            var now = new Date().getTime();
            if(data[0].details.indexOf('No tap off') !== -1 && now - card.getTimeStamp() > 3600000) {
              card.setTimeStamp(now);
              $ionicPopup.alert({
                title: 'Warning',
                template: 'At your destination stop tap off with your Opal card at an Opal card reader. <br><br>' +
                  'When tapping on or off, it is important to wait for the ‘ding’ tone so you know that your tap has been successful. <br><br>' +
                  'Call <a href="tel:136725">13 67 25</a> (13 OPAL) 24 hours, 7 days a week for assistance if you forgot to tap off when you left your station'
              });
            }
            $scope.opals[cardIndex].activities = data;
          }

          if (isRefresh) {
            $scope.$broadcast('scroll.refreshComplete');
          }
        }, length, 1);
      }
      $scope.opals = opals;
    }

    function renderTextView()
    {

        if (isLoggedin) {
          card.getCardsDetails(function(error, data) {
            if (error) {
              $ionicLoading.hide();
              $ionicPopup.alert({
                title: 'Sorry',
                template: error.message
              });
            } else {
              getCardsRecent(data, false);
            }
          });
      }

    }


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
            renderTextView();
            console.log("display day");
          break;

          case 'week':

            console.log("display week");
          break;

          case 'month':

            console.log("display month");
          break;
        }

        $scope.chartConfig = {

          options: {

            chart: {
              type: 'column'
            },

          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },

          title: {
            text: 'Daily spends'
          },
          subtitle: {
            text: ''
          },
          series: [{
            name: 'spends',
            data: [4.39, 2.56, 0, 12.5, 7.6, 0, 0]

          }],

          xAxis: {
            categories: [
            'Mon',
            'Tue',
            'Wed',
            'Thur',
            'Friday',
            'Staturday',
            'Sunday'
            ],
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: 'expenses ($)'
            }
          },
          plotOptions: {
            column: {
              pointPadding: 2,
              borderWidth: 0
            }
          },
        }

      });
    }; // end of setView

    setView('day');
  });
