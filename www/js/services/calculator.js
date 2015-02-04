'use strict';
angular.module('fgts.services')
  .service('calculator', function($http, url, stations) {
    this.train = function(departure, arrive, cb) {
      var hDeparture = stations.findId(stations.fareCalcFrom, departure),
      hArrive = stations.findId(stations.fareCalcTo, arrive);

      $http.post(url.calculator +
        '&hDeparture=' + hDeparture +
        '&hArrive=' + hArrive
      ).success(function(data) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, 'text/html');
        var fareDoc = doc.getElementById('frmFareCalculator:farelist2').
          getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        var singlePeakDoc = fareDoc[0].getElementsByTagName('td'),
        singleOffPeakDoc = fareDoc[1].getElementsByTagName('td'),
        dailyCapMonToSatDoc = fareDoc[2].getElementsByTagName('td'),
        dailyCapSunDoc = fareDoc[3].getElementsByTagName('td'),
        defaultFarePeakDoc = fareDoc[4].getElementsByTagName('td'),
        defaultFareOffPeakDoc = fareDoc[5].getElementsByTagName('td');

        var adult = {},
          child = {},
          senior = {},
          concession = {};
        adult.singlePeak = singlePeakDoc[1].innerHTML;
        adult.singleOffPeak = singleOffPeakDoc[1].innerHTML;
        adult.dailyCapMonToSat = dailyCapMonToSatDoc[1].innerHTML;
        adult.dailyCapSun = dailyCapSunDoc[1].innerHTML;
        adult.defaultPeak = defaultFarePeakDoc[1].innerHTML;
        adult.defaultOffPeak = defaultFareOffPeakDoc[1].innerHTML;

        child.singlePeak = singlePeakDoc[2].innerHTML;
        child.singleOffPeak = singleOffPeakDoc[2].innerHTML;
        child.dailyCapMonToSat = dailyCapMonToSatDoc[2].innerHTML;
        child.dailyCapSun = dailyCapSunDoc[2].innerHTML;
        child.defaultPeak = defaultFarePeakDoc[2].innerHTML;
        child.defaultOffPeak = defaultFareOffPeakDoc[2].innerHTML;

        senior.singlePeak = singlePeakDoc[3].innerHTML;
        senior.singleOffPeak = singleOffPeakDoc[3].innerHTML;
        senior.dailyCapMonToSat = dailyCapMonToSatDoc[3].innerHTML;
        senior.dailyCapSun = dailyCapSunDoc[3].innerHTML;
        senior.defaultPeak = defaultFarePeakDoc[3].innerHTML;
        senior.defaultOffPeak = defaultFareOffPeakDoc[3].innerHTML;

        concession.singlePeak = singlePeakDoc[4].innerHTML;
        concession.singleOffPeak = singleOffPeakDoc[4].innerHTML;
        concession.dailyCapMonToSat = dailyCapMonToSatDoc[4].innerHTML;
        concession.dailyCapSun = dailyCapSunDoc[4].innerHTML;
        concession.defaultPeak = defaultFarePeakDoc[4].innerHTML;
        concession.defaultOffPeak = defaultFareOffPeakDoc[4].innerHTML;

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
