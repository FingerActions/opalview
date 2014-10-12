'use strict';
angular.module('starter.controllers')
  .controller('HistoryCtrl', function(account, $scope, card) {
    var isLoggedin = $scope.isLoggedin = account.isLoggedin();
    if (isLoggedin) {
      card.getCachedCards(function(error, data) {
        $scope.cards = data;
      });
    }
  });
