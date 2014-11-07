'use strict';
angular.module('fgts.controllers')
  .controller('NewsCtrl', function($scope, $location, $ionicLoading, $ionicPopup, news, $interval) {

    $scope.doRefresh = function() {

      news.travelInfo(function(error, data) {
        if (error) {
          $ionicPopup.alert({
            title: 'Sorry',
            template: "Cannot connect to the Internet now."
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
					template: "Cannot connect to the Internet now."
				});
			} else {
				$scope.serviceInfo = data;
				console.log($scope.serviceInfo);
			}
		});

		var updateClock = function(){
			$scope.date = new Date();
		};
		$interval(updateClock, 1000);
		updateClock();
    $scope.moreNews = function(link,linename,status){
      var exteralLink = link.getAttribute('href');
      console.log("externalLink"+ exteralLink);
      var newsID = exteralLink.split('?')[1];
      news.getDetailNews(exteralLink,linename,status,function(error){
        if (error) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Sorry',
            template: error.message
          });
        }else{
          var moreDetailPath = '/tab/news/' + newsID;
          console.log(moreDetailPath);
          $location.path(moreDetailPath);
        }
      });
    };
  });
