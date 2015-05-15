'use strict';
angular.module('fgts.services')
  .factory('news', function($http, url, $window) {
    var travelInfo = function(cb) {
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
          console.log("--------------" + className);
          var infoNodeRaw = infoRowDoc.getElementsByTagName('td');
          var nodelength = infoNodeRaw.length;
          var statusIndex = nodelength - 1;
          var isExternal = infoRowDoc.getElementsByTagName('td')[statusIndex].innerHTML !== 'Good service';
          var infoNode = {
            className: className,
            lineName: infoRowDoc.getElementsByTagName('td')[0].innerHTML,
            serviceStatus: isExternal ? infoRowDoc.getElementsByTagName('td')[statusIndex].getElementsByTagName('a')[0].innerHTML : infoRowDoc.getElementsByTagName('td')[statusIndex].innerHTML,
            exteralLink: isExternal ? infoRowDoc.getElementsByTagName('td')[statusIndex].getElementsByTagName('a')[0] : ''
          };
          info.push(infoNode);
        }
        info.reverse();
        cb(null, info, status, headers, config);
      }).error(function(data) {
        cb(new Error(data.errorMessage), data);
      });
    };

    var getDetailNews = function(externalLink, linename, trstatus, cb) {
      var newLink = url.travelInfoMoreDetails + externalLink;
      console.log("newLink:" + newLink);
      console.log("status:" + status);
      $http.get(newLink).success(function(data, status, headers, config) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, 'text/html');
        //console.log(doc);

        //console.log(trackWorkContent);
        //console.log('track work: '+ trackWorkContent.getElementsByClassName('trkworkLineHeading')[0].innerHTML);
        console.log('status:' + trstatus);
        if (trstatus == 'Delays' || trstatus == 'Major delays' || trstatus == 'Partial Closure') {
          var delayContent = doc.getElementById('serviceInterruptionDetailItemHolder');
          var moreInfoNote = {
            infoType:'delay',
            lineDirection: delayContent.getElementsByClassName('trkworkLineHeading')[0].innerHTML,
            //trackWorkItemHeading: trackWorkContent.getElementsByClassName('trkworkDetailsItemHeading')[0].innerHTML,
            trkworkItemText: delayContent.getElementsByClassName('trkworkItemText')[0].innerHTML
          };

        } else {
          var trackWorkContent = doc.getElementById('trkworkAllItemsHolder');

          Array.prototype.forEach.call(trackWorkContent,function(el){

            console.log(el.tagName);
            
          });
          var moreInfoNote = {
            infoType:'trackwork',
            lineDirection: trackWorkContent.getElementsByClassName('trkworkLineHeading')[0].innerHTML,
            trackWorkItemHeading: trackWorkContent.getElementsByClassName('trkworkItemHeading')[0].innerHTML,
            trackWorkContentHolder: trackWorkContent.getElementsByClassName('trkworkItemText')[0].innerHTML
          };
        }
        remove();
        save(JSON.stringify(moreInfoNote), linename);
        cb(null, moreInfoNote, status, headers, config);
      }).error(function(data) {
        cb(new Error(data.errorMessage), data);
      });
    };

    var save = function(moreInfoNote, lineName) {
      //alert(JSON.stringify(moreInfoNote));
      $window.localStorage.setItem('trackWorkContent', moreInfoNote);
      $window.localStorage.setItem('lineName', lineName);
    };

    var remove = function() {
      $window.localStorage.removeItem('trackWorkContent');
      $window.localStorage.removeItem('lineName');
    };

    return {
      travelInfo: travelInfo,
      getDetailNews: getDetailNews,
    };

  });
