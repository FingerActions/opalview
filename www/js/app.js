// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'fgts' is the name of this angular module fingerActions (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'fgts.services' is found in services.js
// 'fgts.controllers' is found in controllers.js
'use strict';
angular.module('fgts', ['ionic', 'fgts.controllers', 'fgts.services', 'fgts.directives'])

.run(function ($ionicPlatform, $ionicPopup, $window) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if ($window.cordova && $window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if ($window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.recent', {
    url: '/recent',
    views: {
      'tab-recent': {
        templateUrl: 'templates/recent/tab-recent.html',
        controller: 'RecentCtrl'
      }
    }
  })

  .state('tab.history', {
    url: '/history',
    views: {
      'tab-history': {
        templateUrl: 'templates/history/tab-history.html',
        controller: 'HistoryCtrl'
      }
    }
  })

  .state('tab.history-card', {
    url: '/history/:cardNumber',
    views: {
      'tab-history': {
        templateUrl: 'templates/history/fgts-hist-card.html',
        controller: 'HistoryCardCtrl'
      }
    }
  })

  .state('tab.calculator', {
    url: '/calculator',
    views: {
      'tab-calculator': {
        templateUrl: 'templates/calculator/tab-calculator.html',
        controller: 'CalculatorCtrl'
      }
    }
  })

  .state('tab.calculator.bus',{
    url:'/calculator/bus',
    views:{
        'fgts-calculator-bus':{
          templateUrl: 'templates/calculator/fgts-calc-bus.html'
        }
    }
  })

  .state('tab.today', {
    url: '/today',
    views: {
      'tab-today': {
        templateUrl: 'templates/today/tab-today.html',
        controller: 'TodayCtrl'
      }
    }
  })

  .state('tab.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'templates/about/tab-about.html',
        controller: 'AboutCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/recent');

});
