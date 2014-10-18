'use strict';
angular.module('fgts.controllers')
  .controller('HistoryCardCtrl', function($scope, $stateParams, card) {
    card.getCardDetails($stateParams.cardNumber, function(error, data) {
      var card = data;
      $scope.title = card.cardNickName;

      $scope.viewBy = 'day';

      $scope.setView = function(view) {
        $scope.viewBy = view;
      };
    });
  });
