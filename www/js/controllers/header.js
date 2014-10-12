'use strict';
angular.module('starter.controllers')
  .controller('HeaderCtrl', function ($scope, $stateParams, card) {

    card.getCard($stateParams.cardNumber, function(error, data){
      $scope.card = data;
    });
  });
