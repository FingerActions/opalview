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
  var login = function(username, password) {
    $http.post(''+username+password)
      .then();
  };

  var logout = function() {
    $http.post('')
      .then();
  };

  // Public API
  return {
    login: login,
    logout: logout
  };
});
