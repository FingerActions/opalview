'use strict';
angular.module('starter.controllers', [])

.controller('CardCtrl', function (account, $ionicPopup, $http, $scope, $ionicModal) {
	account.init();

	$scope.login = function () {
		account.login($scope.username, $scope.password, function (error, data) {
			if (error) {
				$ionicPopup.alert({
					title: 'Sorry',
					template: error.message
				});
			} else {
				console.log(data);
			}
		});
	};

	$ionicModal.fromTemplateUrl('templates/account/fing-acts-login.html', {
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

.controller('HistoryCtrl', function ($scope, card) {
	$scope.cards = card.all();
})

.controller('CardDetailCtrl', function ($scope, $stateParams, card) {
	$scope.cards = card.get($stateParams.cardId);
})

.controller('CalculatorCtrl', function () {})

.controller('AboutCtrl', function () {})

.controller('TodayCtrl', function () {});
