'use strict';
angular.module('starter.services')
  .factory('card', function($http, url) {

    var getJsonCardDetailsArray = function(cb) {
      $http.get(url.opal + 'registered/getJsonCardDetailsArray')
        .success(function (data, status, headers, config) {
          cb(null, data, status, headers, config);
        })
        .error(function (data, status, headers, config) {
          cb(new Error(data.errorMessage), data, status, headers, config);
        });
    };

    var loadCardActivities = function(cb, cardId, pageIndex, month, year) {
      // month is zero based, year is full year, they are optional
      if(!month || !year){
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

    return {
      getJsonCardDetailsArray: getJsonCardDetailsArray,
      loadCardActivities: loadCardActivities
    };
  });
