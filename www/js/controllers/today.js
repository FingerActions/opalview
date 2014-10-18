'use strict';
angular.module('fgts.controllers')
  .controller('TodayCtrl', function($scope, $ionicLoading, $ionicPopup, today) {

    $scope.doRefresh = function() {

      today.travelInfo(function(error, data) {
        if (error) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Sorry',
            template: error.message
          });
        } else {
          $scope.serviceInfo = data;
          console.log($scope.serviceInfo);
					$scope.$broadcast('scroll.refreshComplete');
        }
      });
    };
  });
