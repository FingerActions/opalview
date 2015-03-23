/**
 * Created by changhaotian on 25/02/2015.
 */
'use strict';
angular.module('fgts.controllers')
    .controller('trainDetailsCtrl', function($scope, $window) {

        var fareInfo = JSON.parse($window.localStorage.getItem('trainFareOpal'));
        var cardType = $window.localStorage.getItem('cardType');

        console.log('cardType: ' + cardType);
        console.log(fareInfo.adult.singlePeak);
        //console.log(fareInfo.adult.dailyCapMonToSat);

        $scope.fareInfo = fareInfo;

    });
