'use strict';
angular.module('starter.services')
  .factory('card', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    /*var cards = [{
    id: 0,
    name: 'Haotian',
    cardNumber: 432898429423492
  }, {
    id: 1,
    name: 'Mao',
    cardNumber: 723842794273842
  }, {
    id: 2,
    name: 'Mark Zurkburg',
    cardNumber: 647242897489237
  }, {
    id: 3,
    name: 'Bill Gates',
    cardNumber: 152371638271638
  }];*/

    var cards = [];

    // Public API
    return {
      all: function() {
        return cards;
      },
      get: function(cardId) {
        // Simple index lookup
        return cards[cardId];
      }
    };
  });
