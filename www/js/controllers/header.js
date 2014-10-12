'use strict';
angular.module('starter.controllers')
  .controller('HeaderCtrl', function ($scope, $stateParams, card) {

    card.get($stateParams.cardNumber, function(error, data){
      $scope.card = data;
    });
  });
