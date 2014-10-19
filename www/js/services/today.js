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
          var className = infoList[length].className;
          console.log(className);
          var infoNodeRaw = infoRowDoc.getElementsByTagName('td');
          var nodelength = infoNodeRaw.length;
          var statusIndex = nodelength - 1;
          var isExternal = infoRowDoc.getElementsByTagName('td')[statusIndex].innerHTML !== "Good service";
          var infoNode = {
            className:className,
            lineName: infoRowDoc.getElementsByTagName('td')[0].innerHTML,
            serviceStatus: isExternal ? infoRowDoc.getElementsByTagName('td')[statusIndex].getElementsByTagName('a')[0].innerHTML : infoRowDoc.getElementsByTagName('td')[statusIndex].innerHTML,
            exteralLink: isExternal ?  infoRowDoc.getElementsByTagName('td')[statusIndex].getElementsByTagName('a')[0] : ''
          };
          info.push(infoNode);
        }
        info.reverse();
        cb(null, info, status, headers, config);
      }).error(function(data) {
        cb(new Error(data.errorMessage), data);
      });
    };
  });
