'use strict';
angular.module('fgts.controllers')
  .controller('RecentCtrl', function($cordovaInAppBrowser, account, $ionicPopup, url, $http, $scope, $ionicModal, card, $ionicLoading) {
    var isLoggedin = $scope.isLoggedin = account.isLoggedin();

    function getCardsRecent(data, isRefresh) {
      var opals = data;
      var length = opals.length;
      
     console.log(length);
     //console.log(JSON.stringify(opals));


      while (length-- > 0) {
        opals[length].activities = [];
        card.getCardActivities(function(error, data, status, headers, config) {
          if (error) {
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Sorry',
              template: error.message
            });
          }
          var cardIndexIndex = config.url.indexOf('cardIndex');
          var index = cardIndexIndex + 10;
          var url = config.url;
          var cardIndex = '';
          var urlLength = url.length;

          var nextChar = url[index];
          while (nextChar !== '&' && ++index < urlLength) {
            cardIndex += nextChar;
            nextChar = url[index];
          }

          if (error || !data) {
            $scope.opals[cardIndex].activities = null;
          } else {
            var now = new Date().getTime();
            if(data[0].details.indexOf('No tap off') !== -1 && now - card.getTimeStamp() > 3600000) {
              card.setTimeStamp(now);
              $ionicPopup.alert({
                title: 'Warning',
                template: 'At your destination stop tap off with your Opal card at an Opal card reader. <br><br>' +
                  'When tapping on or off, it is important to wait for the ‘ding’ tone so you know that your tap has been successful. <br><br>' +
                  'Call <a href="tel:136725">13 67 25</a> (13 OPAL) 24 hours, 7 days a week for assistance if you forgot to tap off when you left your station'
              });
            }
            $scope.opals[cardIndex].activities = data;
          }

          if (isRefresh) {
            $scope.$broadcast('scroll.refreshComplete');
          }
        }, length, 1);
      }
      $scope.opals = opals;
    }


    $scope.doRefresh = function() {
      card.regetCardsDetails(function(error, data) {
        if (error) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Sorry',
            template: error.message
          });
          $scope.$broadcast('scroll.refreshComplete');
        } else {
          getCardsRecent(data, true);
        }
      });
    };

    if (isLoggedin) {
      card.getCardsDetails(function(error, data) {
        if (error) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Sorry',
            template: error.message
          });
        } else {
          getCardsRecent(data, false);
        }
      });
    }

    $scope.login = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
      account.login(function(error) {
        if (error) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Sorry',
            template: error.message
          });
        } else {
          //logged in
          isLoggedin = $scope.isLoggedin = true;
          $scope.$root.username = $scope.$root.password = '';
          card.regetCardsDetails(function(error, data) {
            getCardsRecent(data, false);

            console.log(data);

            $ionicLoading.hide();
            $scope.loginModal.hide();
            $ionicPopup.alert({
              title: 'Congratulations!',
              template: 'You have added your opal cards.'
            });
          });
        }
      }, $scope.username, $scope.password);
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
          isLoggedin = $scope.isLoggedin = false;
          $ionicLoading.hide();
          $scope.logoutModal.hide();
          $scope.opals = [];
        }
      });
    };

    $scope.activateURL = url.activateOpal;
    $scope.instructionURL = url.instructions;

    $ionicModal.fromTemplateUrl('templates/recent/fgts-login.html', {
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

    $ionicModal.fromTemplateUrl('templates/recent/fgts-logout.html', {
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
