'use strict';
angular.module('fgts.controllers')
  .controller('NewsDetailsCtrl', function($scope, $window) {
    var localTrackWorkContent = JSON.parse($window.localStorage.getItem('trackWorkContent'));
    var localTrackWorkLineName = $window.localStorage.getItem('lineName');
    $scope.lineName = localTrackWorkLineName;
    //$scope.trackWorkContent = localTrackWorkContent;
    console.log('moreInfoNote2: ' + localTrackWorkContent.trackWorkItemHeading);
    //trackWorkItemHeading
    //trackWorkContent
    //lineName
    if(localTrackWorkContent.infoType === 'trackwork')
    {
        $scope.type = localTrackWorkContent.infoType;
        $scope.timeInfo = localTrackWorkContent.trackWorkItemHeading;
        $scope.content =  localTrackWorkContent.trackWorkContentHolder;
    }else{
        console.log('content: ===> ' + localTrackWorkContent.trkworkItemText);
        $scope.type = localTrackWorkContent.infoType;
        $scope.timeInfo = localTrackWorkContent.trackWorkItemHeading;
        $scope.content =  localTrackWorkContent.trkworkItemText;
    }

  });
