'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get('/#/tab/card');
    page = require('./main.po');
  });

  it('should have correct title name', function() {
    expect(page.body.element(by.className('title')).getText()).toBe('Card');
  });

});
