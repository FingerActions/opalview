'use strict';
angular.module('fgts.controllers')
	.controller('CalculatorCtrl', function ($scope,$window,$location,$ionicPopup,calculator,stations) {

		//calculator.train('Ashfield', 'Town Hall', function(error, data){
		//	console.log(data);
		//});

        var fromStation,toStation;

		$scope.type = 'map';
		$scope.setType = function(type) {
			$scope.type = type;
		};
        var stationsArray = stations.fareCalcFrom;
        var length = stations.fareCalcFrom.length;
        console.log(length);
        $scope.stationFrom = [];
        $scope.stationTo = [];
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
        

        $scope.search = function(){

            if(fromStation == undefined || toStation == undefined)
            {
                $ionicPopup.alert({
                    title: '',
                    template: 'Please type in station names.'
                });

            }
            else {
                console.log("Calculate: " + fromStation + " to " + toStation);
                calculator.train(fromStation, toStation, function (error, data) {

                    console.log(data.adult.dailyCapMonToSat);

                    console.log(JSON.stringify(data));

                    // save data to localstorage
                    $window.localStorage.setItem('trainFareOpal', JSON.stringify(data));

                    var moreDetailPath = '/tab/calculator/train/details';
                    console.log(moreDetailPath);
                    $location.path(moreDetailPath);

                });
            }
        };

	});
