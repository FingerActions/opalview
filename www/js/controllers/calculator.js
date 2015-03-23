'use strict';
angular.module('fgts.controllers')
	.controller('CalculatorCtrl', function ($scope,$window,$location,$ionicPopup,calculator,stations) {

		//calculator.train('Ashfield', 'Town Hall', function(error, data){
		//	console.log(data);
		//});

        var fromStation,toStation,cardTypeSelected;

		$scope.type = 'map';
		$scope.setType = function(type) {
			$scope.type = type;
		};
        var stationsArray = stations.fareCalcFrom;
        var length = stations.fareCalcFrom.length;
        console.log(length);

        $scope.stationFrom = [];
        $scope.stationTo = [];
        $scope.cardType = [];

        while(length>0)
        {
            length--;
            $scope.stationFrom.push(stationsArray[length].name);
            $scope.stationTo.push(stationsArray[length].name);
        }

        $scope.updateFrom = function(typed){

            console.log(typed);
            fromStation = typed;
        }

        $scope.updateTo = function(typed){
            console.log(typed);
            toStation = typed;
        }

        $scope.cardTypes = ["none","adult","child","senior","concession"];

        $scope.cardType = $scope.cardTypes[0];

        $scope.updateType = function(type){
            cardTypeSelected = type;
        };

        $scope.search = function($scope){


            if(fromStation == undefined || toStation == undefined)
            {
                $ionicPopup.alert({
                    title: '',
                    template: 'Please type in station names.'
                });
            }
            else {

                console.log("Calculate: " + fromStation + " to " + toStation);
                console.log("selected card type: " + cardTypeSelected);

                calculator.train(fromStation, toStation, function (error, data) {

                    console.log(data.adult.dailyCapMonToSat);
                    console.log(JSON.stringify(data));

                    // save data to localstorage
                    $window.localStorage.setItem('fare.trainFareOpal', JSON.stringify(data));
                    $window.localStorage.setItem('fare.cardType',cardTypeSelected);
                    $window.localStorage.setItem('fare.fromStation',fromStation);
                    $window.localStorage.setItem('fare.toStation',toStation);


                    var moreDetailPath = '/tab/calculator/train/details';
                    console.log(moreDetailPath);
                    $location.path(moreDetailPath);

                });
            }
        };

	});
