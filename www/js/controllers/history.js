'use strict';
angular.module('fgts.controllers')
  .controller('HistoryCtrl', function(account, $scope, card) {
    var isLoggedin = $scope.isLoggedin = account.isLoggedin();
    if (isLoggedin) {
      card.getCardsDetails(function(error, data) {
        $scope.cards = data;
      });
    }
  });
