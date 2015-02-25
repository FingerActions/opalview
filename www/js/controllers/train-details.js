/**
 * Created by changhaotian on 25/02/2015.
 */
'use strict';
angular.module('fgts.controllers')
    .controller('trainDetailsCtrl', function($scope, $window) {


        var fareInfo = $window.localStorage.getItem('trainFareOpal');

        console.log(fareInfo.adult);

        $scope.fareInfo = fareInfo;


    });
