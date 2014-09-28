'use strict';
angular.module('starter.services')
  .factory('account', function($http, opalUrl) {
    var init = function(cb) {
      $http.get(opalUrl)
        .success(function(data, status, headers, config) {
          if (cb) {
            cb(null, data, status, headers, config);
          }
        })
        .error(function(data, status, headers, config) {
          cb(new Error(data.errorMessage), data, status, headers, config);
        });
    };

    var login = function(username, password, cb) {
      $http.post(opalUrl + 'login/registeredUserUsernameAndPasswordLogin' +
        '?h_username=' + username +
        '&h_password=' + password
      )
        .success(function(data, status, headers, config) {
          if (data.validationFailure) {
            cb(new Error(data.errorMessage), data, status, headers, config);
          } else {
            cb(null, data, status, headers, config);
          }
        })
        .error(function(data, status, headers, config) {
          cb(new Error(data.errorMessage), data, status, headers, config);
        });
    };

    var logout = function(cb) {
      $http.get(opalUrl + 'registered/logout')
        .success(function(data, status, headers, config) {
          cb(null, data, status, headers, config);
        })
        .error( function(data, status, headers, config) {
          cb(new Error(data.errorMessage), data, status, headers, config);
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
