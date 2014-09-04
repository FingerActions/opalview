'use strict';
angular.module('starter.controllers', [])

.controller('CardCtrl', function (account) {
	account.init(function (){
		account.login('', '', function(data, status, header){
			console.log(data);
			console.log(status);
			console.log(header);
		});
	});
})

.controller('HistoryCtrl', function ($scope, friends) {
	$scope.friends = friends.all();
})

.controller('FriendDetailCtrl', function ($scope, $stateParams, friends) {
	$scope.friend = friends.get($stateParams.friendId);
})

.controller('CalculatorCtrl', function () {})

.controller('AboutCtrl', function () {});
