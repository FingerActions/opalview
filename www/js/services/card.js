'use strict';
angular.module('fgts.services')
  .factory('card', function($http, account, url) {
    var cards = [];
    var regetCardsDetails = function (cb) {
      $http.get(url.opal + 'registered/getJsonCardDetailsArray')
        .success(function (data, status, headers, config) {
          if (data.indexOf('<!DOCTYPE') === 0) {
            account.login(function(error, data, status, headers, config) {
              if(error) {
                cb(error, data, status, headers, config);
              }
              else{
                regetCardsDetails(cb);
              }
            });
          } else {
            cards = data;
            cb(null, data, status, headers, config);
          }
        })
        .error(function (data, status, headers, config) {
          cb(new Error(data.errorMessage), data, status, headers, config);
        });
    };

    var getCardsDetails = function (cb) {
      var length = cards.length;
      if (length !== 0) {
        cb(null, cards);
      }
      else {
        regetCardsDetails(cb);
      }
    };

    var getCardActivities = function (cb, cardId, pageIndex, month, year) {
      // month is zero based, year is full year, they are optional
      if (!month || !year) {
        //make both them equals zero i.e. load the default page
        month = -1;
        year = -1;
      }

      $http.get(url.opal + 'registered/opal-card-activities-list?AMonth=' +
        month + '&AYear=' + year + '&cardIndex=' + cardId + '&pageIndex=' + pageIndex)
        .success(function (data, status, headers, config) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(data, 'text/html');
          var activitiesDoc = doc.getElementById('transaction-data').
            getElementsByTagName('tbody')[0].getElementsByTagName('tr');
          var length = activitiesDoc.length;
          var activities = [];
          var reBr = /<br>/g;
          while (length-- > 0) {
            var activityRowDoc = activitiesDoc[length].getElementsByTagName('td');
            if (activityRowDoc.length === 1) {
              cb(null, null, status, headers, config);
              return;
            }
            var modeDoc = activityRowDoc[2].children[0];
            if(modeDoc) {
              var imgSrc = url.opal + modeDoc.getAttribute('src');
              modeDoc.setAttribute('src', imgSrc);
            }
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
          activities.reverse();
          cb(null, activities, status, headers, config);
        })
        .error(function (data, status, headers, config) {
          cb(new Error(data.errorMessage), data, status, headers, config);
        });
    };

    var getCardDetails = function (cardNumber, cb) {
      getCardsDetails(function () {
        var length = cards.length;
        while (length-- > 0) {
          var card = cards[length];
          if (card.cardNumber === cardNumber) {
            cb(null, card);
            return;
          }
        }
      });
    };

    return {
      getCardsDetails: getCardsDetails,
      regetCardsDetails: regetCardsDetails,
      getCardDetails: getCardDetails,
      getCardActivities: getCardActivities
    };
  });
