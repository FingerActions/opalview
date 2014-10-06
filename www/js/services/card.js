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

      $http.get(url.opal + 'registered/opal-card-activities-list?AMonth=' + month + '&AYear=' + year + '&cardIndex=' + cardId + '&pageIndex=' + pageIndex)
        .success(function (data, status, headers, config) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(data, 'text/html');
          var activitiesDoc = doc.getElementById('transaction-data').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
          var length = activitiesDoc.length;
          var activities = [];
          var reBr = /<br>/g;
          while (length-- > 0) {
            var activityRowDoc = activitiesDoc[length].getElementsByTagName('td');
            var activity = {
              transactionNumber: activityRowDoc[0].innerHTML,
              dateTime: activityRowDoc[1].innerHTML.replace(reBr, ' '),
              mode: activityRowDoc[2].innerHTML,
              details: activityRowDoc[3].innerHTML,
              journeyNumber: activityRowDoc[4].innerHTML,
              fareApplied: activityRowDoc[5].innerHTML,
              fare: activityRowDoc[6].innerHTML,
              discount: activityRowDoc[7].innerHTML,
              amount: activityRowDoc[8].innerHTML
            };
            activities.push(activity);
          }
          //activities.reverse();
          cb(null, activities, status, headers, config);
        })
        .error(function (data, status, headers, config) {
          cb(new Error(data.errorMessage), data, status, headers, config);
        });
    };

    var getAll = function (cb) {
      var length = cards.length;
      if (length !== 0) {
        cb(null, cards);
      }
      else {
        getJsonCardDetailsArray(cb);
      }
    };

    var get = function (cardNumber, cb) {
      getAll(function (){
        var length = cards.length;
        if (length !== 0) {
          while (length-- > 0) {
            var card = cards[length];
            if (card.cardNumber === cardNumber) {
              cb(null, card);
              break;
            }
          }
        }
      });
    };

    return {
      getJsonCardDetailsArray: getJsonCardDetailsArray,
      loadCardActivities: loadCardActivities,
      getAll: getAll,
      get: get
    };
  });
