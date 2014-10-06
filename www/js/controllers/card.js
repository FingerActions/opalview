'use strict';
angular.module('starter.controllers')
  .controller('CardCtrl', function(account, $ionicPopup, $http, $scope, $ionicModal, card, $ionicLoading) {
		function loadCardsActivities(data) {
			var cards = data;
			var index = length = cards.length;
			while(length-- > 0) {
        cards[length].activities = [];
				card.loadCardActivities(function(error, data) {
          if (error || !data) {
            $scope.cards[--index].activities = null;
          } else {
            $scope.cards[--index].activities = data;
          }
				}, length, 1);
			}
			$scope.cards = cards;
		}
		card.getAll(function(error, data) {
      if (error) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Sorry',
          template: error.message
        });
      } else {
        loadCardsActivities(data);
      }
    });
    $scope.login = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
      account.login($scope.username, $scope.password, function(error) {
        if (error) {
					$ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Sorry',
            template: error.message
          });
        } else {
          //logged in
          card.getAll(function(error, data) {
						loadCardsActivities(data);
						$ionicLoading.hide();
						$scope.loginModal.hide();
						$ionicPopup.alert({
							title: 'Congratulations!',
							template: 'You have added your opal cards.'
						});
          });
        }
      });
    };

    $scope.logout = function() {
			$ionicLoading.show({
				template: 'Loading...'
			});
      account.logout(function(error) {
        if (error) {
          $ionicPopup.alert({
            title: 'Sorry',
            template: error.message
          });
        } else {
					$ionicLoading.hide();
					$scope.logoutModal.hide();
					$scope.cards = [];
				}
      });
    };

    $ionicModal.fromTemplateUrl('templates/account/fing-acts-login.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.loginModal = modal;
    });
    $scope.openLoginModal = function() {
      $scope.loginModal.show();
    };
    $scope.closeLoginModal = function() {
      $scope.loginModal.hide();
    };

		$ionicModal.fromTemplateUrl('templates/account/fing-acts-logout.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.logoutModal = modal;
		});
		$scope.openLogoutModal = function() {
			$scope.logoutModal.show();
		};
		$scope.closeLogoutModal = function() {
			$scope.logoutModal.hide();
		};
		//Cleanup the modal when we're done with it!
		$scope.$on('$destroy', function() {
			$scope.loginModal.remove();
			$scope.logoutModal.remove();
		});
		// Execute action on hide modal
		$scope.$on('modal.hidden', function() {
			// Execute action
		});
		// Execute action on remove modal
		$scope.$on('modal.removed', function() {
			// Execute action
		});
  });
