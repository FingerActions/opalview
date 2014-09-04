'use strict';
angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  // Public API
  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  };
})

.factory('account', function($http){
  var baseUrl = 'https://www.opal.com.au/';
  var init = function(cb) {
    $http.get(baseUrl)
      .success(function(data, status, header) {
        cb(data, status, header);
      });
  };

  var login = function(username, password, cb) {
    $http.post(baseUrl + 'login/registeredUserUsernameAndPasswordLogin' +
      '?h_username=' + username +
      '&h_password=' + password
    )
      .success(function(data, status, header) {
        cb(data, status, header);
      });
  };

  var logout = function(cb) {
    $http.post('')
      .success(function(data, status, header) {
        cb(data, status, header);
      });
  };

  // Public API
  return {
    init: init,
    login: login,
    logout: logout
  };
});
