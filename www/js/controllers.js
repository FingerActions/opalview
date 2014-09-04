'use strict';
angular.module('starter.controllers', [])

.controller('CardCtrl', function () {})

.controller('HistoryCtrl', function ($scope, Friends) {
	$scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
	$scope.friend = Friends.get($stateParams.friendId);
})

.controller('CalculatorCtrl', function () {})

.controller('AboutCtrl', function () {});
