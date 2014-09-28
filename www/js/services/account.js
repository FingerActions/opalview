'use strict';
angular.module('starter.services')
  .factory('account', function($http, Card) {
    var baseUrl = 'https://www.opal.com.au/';
    var init = function(cb) {
      $http.get(baseUrl)
        .success(function(data, status, header) {
          if (cb) {
            cb(data, status, header);
          }
        });
    };

    var login = function(username, password, cb) {
      $http.post(baseUrl + 'login/registeredUserUsernameAndPasswordLogin' +
        '?h_username=' + username +
        '&h_password=' + password
      )
        .success(function(data) {
          if (data.validationFailure) {
            cb(new Error(data.errorMessage), null);
          } else {
            $http.get('https://www.opal.com.au/registered/index').success(function(data) {
              var parser = new DOMParser();
              var doc = parser.parseFromString(data, 'text/html');

              var domCardDetails = doc.getElementById('card-details').getElementsByTagName('tbody')[0];
              var balance = domCardDetails.getElementsByTagName('tr')[0].getElementsByTagName('strong')[1].innerHTML;
              var name = domCardDetails.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerHTML;
              var accHolder = domCardDetails.getElementsByTagName('tr')[2].getElementsByTagName('td')[1].innerHTML;
              var number = domCardDetails.getElementsByTagName('tr')[3].getElementsByTagName('td')[1].innerHTML;
              var status = domCardDetails.getElementsByTagName('tr')[4].getElementsByTagName('td')[1].innerHTML;
              var card = new Card(balance, name, accHolder, number, status);
              // var card =
              cb(null, card);
            });
          }
        })
        .error(function() {
          cb(new Error('Please check your network or try again later'), null);
        });
    };

    var logout = function(cb) {
      $http.post('')
        .success(function(data, status, header) {
          cb(data, status, header);
        });
    };

    var save = function(username, password) {
      window.localStorage.setItem('opal', username + ';' + password);
    };

    var load = function() {
      var credential = window.localStorage.getItem('opal').split(';');
      return {
        username: credential[0],
        password: credential[1]
      };
    };

    // Public API
    return {
      init: init,
      login: login,
      logout: logout,
      save: save,
      load: load
    };
  });
