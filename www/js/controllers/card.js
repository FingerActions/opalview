'use strict';
angular.module('starter.controllers')
	.controller('CardCtrl', function (account, $ionicPopup, $http, $scope, $ionicModal) {
		$scope.login = function () {
			account.login($scope.username, $scope.password, function (error) {
			if (error) {
				$ionicPopup.alert({
					title: 'Sorry',
					template: error.message
				});
			} else {
				//logged in

				$scope.modal.hide();
				$ionicPopup.alert({
					title: 'Congratulations!',
					template: 'You have added your opal cards.'
				});
			}
		});
		};

		$scope.logout = function () {
			account.logout(function (error) {
				if (error) {
					$ionicPopup.alert({
						title: 'Sorry',
						template: error.message
					});
				}
			});
		};

		$ionicModal.fromTemplateUrl('templates/account/fing-acts-login.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function (modal) {
			$scope.modal = modal;
		});
		$scope.openLoginModal = function () {
			$scope.modal.show();
		};
		$scope.closeLoginModal = function () {
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
	});
