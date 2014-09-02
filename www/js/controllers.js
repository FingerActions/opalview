angular.module('starter.controllers', [])

.controller('CardCtrl', function ($scope) {})

.controller('HistoryCtrl', function ($scope, Friends) {
	$scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
	$scope.friend = Friends.get($stateParams.friendId);
})

.controller('CalculatorCtrl', function ($scope) {})

.controller('AboutCtrl', function ($scope) {});