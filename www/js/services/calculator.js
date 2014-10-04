'use strict';
angular.module('starter.services')
  .service('calculator', function($http, url, stations) {
    this.calculate = function(departure, arrive, cb) {
      var hDeparture = stations.findId(stations.fareCalcFrom, departure),
      hArrive = stations.findId(stations.fareCalcTo, arrive);

      $http.post(url.calculator +
        '&hDeparture=' + hDeparture +
        '&hArrive=' + hArrive
      ).success(function(data) {
        var adult = {},
          child = {},
          senior = {},
          concession = {};
        adult.singlePeak = 4.1;
        adult.singleOffPeak = 2.87;
        adult.dailyCapMonToSat = 15;
        adult.dailyCapSun = 2.5;
        adult.defaultPeak = 8.1;
        adult.defaultOffPeak = 5.67;

        child.singlePeak = 4.1;
        child.singleOffPeak = 2.87;
        child.dailyCapMonToSat = 15;
        child.dailyCapSun = 2.5;
        child.defaultPeak = 8.1;
        child.defaultOffPeak = 5.67;

        senior.singlePeak = 4.1;
        senior.singleOffPeak = 2.87;
        senior.dailyCapMonToSat = 15;
        senior.dailyCapSun = 2.5;
        senior.defaultPeak = 8.1;
        senior.defaultOffPeak = 5.67;

        concession.singlePeak = 4.1;
        concession.singleOffPeak = 2.87;
        concession.dailyCapMonToSat = 15;
        concession.dailyCapSun = 2.5;
        concession.defaultPeak = 8.1;
        concession.defaultOffPeak = 5.67;

        var fare = {
          adult: adult,
          child: child,
          senior: senior,
          concession: concession
        };

        cb(null, fare);
      }).error(function(data) {
        cb(new Error(data.errorMessage), data);
      });
    };
  });
