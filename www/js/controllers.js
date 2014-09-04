'use strict';
angular.module('starter.controllers', [])

.controller('CardCtrl', function () {})

.controller('HistoryCtrl', function ($scope, friends) {
	$scope.friends = friends.all();
})

.controller('FriendDetailCtrl', function ($scope, $stateParams, friends) {
	$scope.friend = friends.get($stateParams.friendId);
})

.controller('CalculatorCtrl', function () {})

.controller('AboutCtrl', function () {});
