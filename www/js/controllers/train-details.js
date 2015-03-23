/**
 * Created by changhaotian on 25/02/2015.
 */
'use strict';
angular.module('fgts.controllers')
    .controller('trainDetailsCtrl', function($scope, $window) {

        var fareInfo = JSON.parse($window.localStorage.getItem('fare.trainFareOpal'));
        var cardType = $window.localStorage.getItem('fare.cardType');
        var fromStation = $window.localStorage.getItem('fare.fromStation');
        var toStation = $window.localStorage.getItem('fare.toStation');

        console.log('cardType: ' + cardType);
        console.log(fareInfo.adult.singlePeak);
        //console.log(fareInfo.adult.dailyCapMonToSat);

        $scope.fareInfo = fareInfo;
        $scope.fromStation = fromStation;
        $scope.toStation = toStation;

        
    });
