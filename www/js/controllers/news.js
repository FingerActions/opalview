'use strict';
angular.module('fgts.controllers')
  .controller('NewsCtrl', function($scope, $ionicLoading, $ionicPopup, news) {

    $scope.doRefresh = function() {

      news.travelInfo(function(error, data) {
        if (error) {
          $ionicPopup.alert({
            title: 'Sorry',
            template: error.message
          });
        } else {
          $scope.serviceInfo = data;
          console.log($scope.serviceInfo);
					$scope.date = new Date();
					$scope.$broadcast('scroll.refreshComplete');
        }
      });
    };

		news.travelInfo(function(error, data) {
			if (error) {
				$ionicLoading.hide();
				$ionicPopup.alert({
					title: 'Sorry',
					template: error.message
				});
			} else {
				$scope.serviceInfo = data;
				console.log($scope.serviceInfo);
			}
		});

		var updateClock = function(){
			$scope.date = new Date();
		};

		setInterval(function(){
			$scope.$apply(updateClock);

		},1000);
		updateClock();

    $scope.moreNews = function(link){

      console.log(link);

    };

  });
