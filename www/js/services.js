'use strict';
angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('cards', function () {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var cards = [{
    id: 0,
    name: 'Haotian',
    cardNumber: 432898429423492
  }, {
    id: 1,
    name: 'Mao',
    cardNumber: 723842794273842
  }, {
    id: 2,
    name: 'Mark Zurkburg',
    cardNumber: 647242897489237
  }, {
    id: 3,
    name: 'Bill Gates',
    cardNumber: 152371638271638
  }];

  // Public API
  return {
    all: function () {
      return cards;
    },
    get: function (cardId) {
      // Simple index lookup
      return cards[cardId];
    }
  };
})

.factory('account', function ($http) {
  var baseUrl = 'https://www.opal.com.au/';
  var init = function (cb) {
    $http.get(baseUrl)
      .success(function (data, status, header) {
        if(cb){
          cb(data, status, header);
        }
      });
  };

  var login = function (username, password, cb) {
    $http.post(baseUrl + 'login/registeredUserUsernameAndPasswordLogin' +
      '?h_username=' + username +
      '&h_password=' + password
    )
      .success(function (data) {
        if(data.validationFailure) {
          cb(new Error(data.errorMessage), null);
        }
        else {
          $http.get('https://www.opal.com.au/registered/index').success(function (data) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, 'text/html');
            var info = {};
            info.balance = doc.getElementById('dashboard-active-cards').getElementsByTagName('td')[1].innerHTML;
            cb(null, info);
          });
        }
      })
      .error(function () {
        cb(new Error('Please check your network or try again later'), null);
      });
  };

  var logout = function (cb) {
    $http.post('')
      .success(function (data, status, header) {
        cb(data, status, header);
      });
  };

  var save = function (username, password) {
    window.localStorage.setItem('opal', username + ';' + password);
  };

  var load = function () {
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
})

.factory('errorhandle', function () {
  var errorhandle = function (title, message) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: message
    });
    alertPopup.then(function (res) {
      console.log("error detected!");
    });
  };
  return {
    errorhandle: errorhandle
  };
});