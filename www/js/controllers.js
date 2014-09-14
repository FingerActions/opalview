'use strict';
angular.module('starter.controllers', [])

.controller('CardCtrl', function (account, $http, $scope, $ionicModal) {
	account.init(function () {
		account.login('', '', function (data, status, header) {
			console.log(data);
			console.log(status);
			console.log(header());
			$http.get('https://www.opal.com.au/registered/index').success(function (data, status) {
				console.log(data);
				console.log(status);
			});
		});
	});

	$ionicModal.fromTemplateUrl('loginModal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function (modal) {
		$scope.modal = modal;
	});
	$scope.openModal = function () {
		$scope.modal.show();
	};
	$scope.closeModal = function () {
		$scope.modal.hide();
	};
	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function () {
		$scope.modal.remove();
	});
	// Execute action on hide modal
	$scope.$on('modal.hidden', function () {
		// Execute action
	});
	// Execute action on remove modal
	$scope.$on('modal.removed', function () {
		// Execute action
	});
})

.controller('HistoryCtrl', function ($scope, friends) {
	$scope.friends = friends.all();
})

.controller('FriendDetailCtrl', function ($scope, $stateParams, friends) {
	$scope.friend = friends.get($stateParams.friendId);
})

.controller('CalculatorCtrl', function () {})

.controller('AboutCtrl', function () {})

.controller('TodayCtrl', function () {});