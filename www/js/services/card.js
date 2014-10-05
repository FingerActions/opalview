'use strict';
angular.module('starter.services')
  .factory('card', function($http, account, url) {
    var cards = [];
    var getJsonCardDetailsArray = function (cb) {
      $http.get(url.opal + 'registered/getJsonCardDetailsArray')
        .success(function (data, status, headers, config) {
          if (data.indexOf('<!DOCTYPE') === 0) {
            account.init(cb);
          } else {
            cards = data;
            cb(null, data, status, headers, config);
          }
        })
        .error(function (data, status, headers, config) {
          cb(new Error(data.errorMessage), data, status, headers, config);
        });
    };

    var loadCardActivities = function (cb, cardId, pageIndex, month, year) {
      // month is zero based, year is full year, they are optional
      if (!month || !year) {
        //make both them equals zero i.e. load the default page
        month = -1;
        year = -1;
      }

      $http.get(url.opal + 'opal-card-activities-list?AMonth=' + month + '&AYear=' + year + '&cardIndex=' + cardId + '&pageIndex=' + pageIndex)
        .success(function (data, status, headers, config) {
          cb(null, data, status, headers, config);
        })
        .error(function (data, status, headers, config) {
          cb(new Error(data.errorMessage), data, status, headers, config);
        });
    };

    var get = function (cardNumber) {
      var length = cards.length;
      if (length !== 0) {
        while (length-- > 0) {
          var card = cards[length];
          if (card.cardNumber === cardNumber) {
            return card;
          }
        }
      } else {
        getJsonCardDetailsArray(function () {
          var length = cards.length;
          while (length-- > 0) {
            var card = cards[length];
            if (card.cardNumber === cardNumber) {
              return card;
            }
          }
        });
      }
    };

    return {
      getJsonCardDetailsArray: getJsonCardDetailsArray,
      loadCardActivities: loadCardActivities,
      get: get
    };
  });
