'use strict';
angular.module('fgts.controllers')
	.controller('CalculatorCtrl', function ($scope, calculator,stations) {
		calculator.train('Ashfield', 'Town Hall', function(error, data){
			console.log(data);
		});

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
	});
