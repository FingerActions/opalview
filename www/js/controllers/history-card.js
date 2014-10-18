'use strict';
angular.module('fgts.controllers')
  .controller('HistoryCardCtrl', function($scope, $stateParams, card) {
    card.getCardDetails($stateParams.cardNumber, function(error, data) {
      var opal = data;
      $scope.title = opal.cardNickName;

      $scope.viewBy = 'day';

      $scope.setView = function(view) {
        $scope.viewBy = view;
      };
    });
  });
