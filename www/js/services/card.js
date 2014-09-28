'use strict';
angular.module('starter.services')
  .factory('card', function($http, opalUrl) {

    var getJsonCardDetailsArray = function(cb) {
      $http.get(opalUrl + 'registered/getJsonCardDetailsArray')
        .success(function (data, status, headers, config) {
          cb(null, data, status, headers, config);
        })
        .error(function (data, status, headers, config) {
          cb(new Error(data.errorMessage), data, status, headers, config);
        });
    };

    var loadCardActivities = function(cb, month, year, cardId, pageIndex) {
      $http.get(opalUrl + 'opal-card-activities-list?AMonth=' + month + '&AYear=' + year + '&cardIndex=' + cardId + '&pageIndex=' + pageIndex)
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
