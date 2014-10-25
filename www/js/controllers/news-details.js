'use strict';
angular.module('fgts.controllers')
  .controller('NewsDetailsCtrl', function($scope,$window) {

    var localTrackWorkContent = JSON.parse($window.localStorage.getItem('trackWorkContent'));
    var localTrackWorkLineName = $window.localStorage.getItem('lineName');

    $scope.lineName = localTrackWorkLineName;
    $scope.trackWorkContent = localTrackWorkContent;
    console.log('moreInfoNote2: ' + localTrackWorkContent.lineDirection);

  });
