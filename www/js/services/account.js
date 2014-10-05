'use strict';
angular.module('starter.services')
  .factory('account', function($http, url, $window) {
    var init = function(cb) {
      $http.get(url.opal)
        .success(function() {
          var credential = load();
          if(credential) {
            login(credential.username, credential.password, cb);
          }
        })
        .error(function(data, status, headers, config) {
          cb(new Error(data.errorMessage), data, status, headers, config);
        });
    };

    var login = function(username, password, cb) {
      $http.post(url.opal + 'login/registeredUserUsernameAndPasswordLogin' +
        '?h_username=' + username +
        '&h_password=' + password
      )
        .success(function(data, status, headers, config) {
          if (data.validationFailure) {
            cb(new Error(data.errorMessage), data, status, headers, config);
          } else {
            save(username, password);
            cb(null, data, status, headers, config);
          }
        })
        .error(function(data, status, headers, config) {
          cb(new Error(data.errorMessage), data, status, headers, config);
        });
    };

    var logout = function(cb) {
      $http.get(url.opal + 'registered/logout')
        .success(function(data, status, headers, config) {
          cb(null, data, status, headers, config);
        })
        .error( function(data, status, headers, config) {
          cb(new Error(data.errorMessage), data, status, headers, config);
        });
    };

    var save = function(username, password) {
      $window.localStorage.setItem('opal', username + ';' + password);
    };

    var load = function() {
      var localOpalCredential = $window.localStorage.getItem('opal');
      if (localOpalCredential){
        var credential = localOpalCredential.split(';');
        return {
          username: credential[0],
          password: credential[1]
        };
      }
      else {
        return null;
      }
    };

    // Public API
    return {
      init: init,
      login: login,
      logout: logout
    };
  });
