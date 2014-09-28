'use strict';
angular.module('starter.services')
  .constant('Card', function(balance, name, accHolder, number, status) {
    this.balance = balance;
    this.name = name;
    this.accHolder = accHolder;
    this.number = number;
    this.status = status;
  });
