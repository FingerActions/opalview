'use strict';
angular.module('fgts.services')
  .factory('account', function($http, url, $window) {
    var login = function(cb, username, password) {
      if (!username) {
        var credential = load();
        username = credential.username;
        password = credential.password;
      }
      $http.post(url.opal + 'login/registeredUserUsernameAndPasswordLogin' +
        '?h_username=' + username +
        '&h_password=' + password
      ).success(function(data, status, headers, config) {
        if (data.validationFailure) {
          remove();
          cb(new Error(data.errorMessage), data, status, headers, config);
        } else {
          save(username, password);
          cb(null, data, status, headers, config);
        }
      }).error(function(data, status, headers, config) {
        remove();
        cb(new Error(data.errorMessage), data, status, headers, config);
      });
    };

    var logout = function(cb) {
      remove();
      $http.get(url.opal + 'registered/logout')
        .success(function(data, status, headers, config) {
          cb(null, data, status, headers, config);
        })
        .error(function(data, status, headers, config) {
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
      return null;
    };

    var remove = function() {
      $window.localStorage.removeItem('opal');
    };

    // Public API
    return {
      login: login,
      logout: logout,
      isLoggedin: function() {
        return !!load();
      }
    };
  });
