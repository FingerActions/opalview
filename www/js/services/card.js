'use strict';
angular.module('fgts.services')
  .factory('card', function($http, account, url, $window) {
    var cards = [];
    var regetCardsDetails = function (cb) {
      $http.get(url.opal + 'registered/getJsonCardDetailsArray?_=1433081759347')
        .success(function (data, status, headers, config) {

          console.log(url.opal + 'registered/getJsonCardDetailsArray' + data);

          if (data.indexOf('<!DOCTYPE') === 0) {
            account.login(function(error, data, status, headers, config) {
              if(error) {
                cb(error, data, status, headers, config);
              }
              else{
                $http.get(url.opal + 'registered/getJsonCardDetailsArray?_=1433081759347')
                  .success(function (data, status, headers, config) {
                    //console.log(data);
                    cb(null, data, status, headers, config);
                    
                  })
                  .error(function (data, status, headers, config) {
                    cb(new Error('Please check your network and try again'), data, status, headers, config);
                  });
              }
            });
          } else {
            cards = data;
            cb(null, data, status, headers, config);
          }
        })
        .error(function (data, status, headers, config) {
          cb(new Error('Please check your network and try again'), data, status, headers, config);
        });
    };

    var getCardsDetails = function (cb) {
      var length = cards.length;
      console.log("------"+length);
      if (length !== 0) {
        cb(null, cards);
      }
      else {
        console.log("*********");
        regetCardsDetails(cb);
      }
    };

    function setCardActivitiesData(cb, data, status, headers, config) {
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
        var dateTime = activityRowDoc[1].innerHTML.replace(reBr, ' ');
        var dateArr = dateTime.split(' ')[1].split('/');
        var date = new Date(dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0]);
        var modeDoc = activityRowDoc[2].children[0];
        var mode = '';
        var fare = activityRowDoc[6].innerHTML;
        if(modeDoc) {
          mode = modeDoc.getAttribute('src').replace(/^\/images\/icons\/mode-(.*).png$/, '$1');
        }
        var details = activityRowDoc[3].innerHTML;
        if (details.indexOf('Auto top up') !== -1) {
          mode = 'auto-top-up';
        }
        else if (details.indexOf('Top up') !== -1) {
          mode = 'manual-top-up';
        }else if(details.indexOf('Tap on reversal') !== -1)
        {
          mode = 'tap-on-reversal';
        }
        var activity = {
          transactionNumber: activityRowDoc[0].innerHTML,
          dateTime: dateTime,
          date: date,
          mode: mode,
          details: details,
          journeyNumber: activityRowDoc[4].innerHTML,
          fareApplied: activityRowDoc[5].innerHTML,
          fare: fare,
          fareNum: parseFloat(fare.replace('$', '')),
          discount: activityRowDoc[7].innerHTML,
          amount: activityRowDoc[8].innerHTML
        };
        activities.push(activity);
      }
      activities.reverse();
      cb(null, activities, status, headers, config);
    }

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
          if (data.indexOf('You are not logged into the Opal website.') !== -1) {
            $http.get(url.opal + 'registered/opal-card-activities-list?AMonth=' +
              month + '&AYear=' + year + '&cardIndex=' + cardId + '&pageIndex=' + pageIndex)
              .success(function (data, status, headers, config) {
                setCardActivitiesData(cb, data, status, headers, config);
              })
              .error(function (data, status, headers, config) {
                cb(new Error(data.errorMessage), data, status, headers, config);
              });
          }
          else {
            setCardActivitiesData(cb, data, status, headers, config);
          }
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

    var getCardActivitiesBy = function(unit, cb) {
      if(unit === 'day') {

        cb();
      }

      else if(unit === 'week') {
        cb();
      }

      else if(unit === 'month') {
        cb();
      }
    };

    var getTimeStamp = function() {
      return $window.localStorage.getItem('timeStamp');
    };

    var setTimeStamp = function(timeStamp) {
      $window.localStorage.setItem('timeStamp', timeStamp);
    };

    return {
      getCardsDetails: getCardsDetails,
      regetCardsDetails: regetCardsDetails,
      getCardDetails: getCardDetails,
      getCardActivities: getCardActivities,
      getCardActivitiesBy: getCardActivitiesBy,
      getTimeStamp: getTimeStamp,
      setTimeStamp: setTimeStamp
    };
  });
