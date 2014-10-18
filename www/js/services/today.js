'use strict';
angular.module('fgts.services')
  .service('today', function($http, url) {
    this.travelInfo = function(cb) {
      $http.get(url.travelInfo).success(function(data, status, headers, config) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, 'text/html');
        //console.log(doc.getElementsByClassName('rightColItemHolder')[0]);
        var infoList = doc.getElementsByClassName('rightColItemHolder')[0].
        getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        //console.log(infoList);
        var length = infoList.length;
        var info = [];
        while (length-- > 0) {
          var infoRowDoc = infoList[length];
          if (infoRowDoc.length === 1) {
            cb(null, null, status, headers, config);
            return;
          }
          var infoNodeRaw = infoRowDoc.getElementsByTagName('td');
          var nodelength = infoNodeRaw.length;
          var statusIndex = nodelength -1;
          var infoNode = {
            lineName:infoRowDoc.getElementsByTagName('td')[0].innerHTML,
            serviceStatus:infoRowDoc.getElementsByTagName('td')[statusIndex].innerHTML
          };
          info.push(infoNode);
        }
        cb(null, info, status, headers, config);
      }).error(function(data) {
        cb(new Error(data.errorMessage), data);
      });
    };
  });
