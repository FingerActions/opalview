'use strict';
angular.module('fgts.controllers')
  .controller('HistoryCtrl', function(account, $scope, card, $stateParams) {
    var isLoggedin = $scope.isLoggedin = account.isLoggedin();
    if (isLoggedin) {
      card.getCardsDetails(function(error, data) {
        $scope.cards = data;
      });
    }

    card.getCardDetails($stateParams.cardNumber, function(error, data) {
      $scope.card = data;
    });

    $scope.type = 'day';

    $scope.setType = function(type) {
      $scope.type = type;
    };
  });
