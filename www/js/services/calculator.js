'use strict';
angular.module('starter.services')
  .service('calculator', function($http, url, stations) {
    this.init = function (cb) {
      $http.get(url.calculator)
        .success(function(data, status, headers, config) {
          if (cb) {
            cb(null, data, status, headers, config);
          }
        })
        .error(function(data, status, headers, config) {
          cb(new Error(data.errorMessage), data, status, headers, config);
        });
    };

    this.calculate = function(departure, arrive, cb) {
      var hDeparture = stations.findId(stations.fareCalcFrom, departure),
      hArrive = stations.findId(stations.fareCalcTo, arrive);

      $http.post(url.calculator +
        '&hDeparture=' + hDeparture +
        '&hArrive=' + hArrive
      ).success(function(data) {
        cb(null, data);
      }).error(function(data) {
        cb(new Error(data.errorMessage), data);
      });
    };
  });
