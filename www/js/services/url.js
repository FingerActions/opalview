'use strict';
angular.module('fgts.services')
  .constant('url', {
    opal: 'https://www.opal.com.au/',
    calculator: 'http://www.sydneytrains.info/tickets/fare_calculator.htm?frmFareCalculator:calculate.x&frmFareCalculator_SUBMIT=1&javax.faces.ViewState',
    activateOpal:'http://www.opal.com.au/en/customer-care/about-opal-card-activation/',
    instructions:'http://www.youtube.com/watch?v=2vcvxuR_vXk',
    travelInfo:'http://www.sydneytrains.info/',
    travelInfoMoreDetails:'http://www.sydneytrains.info'
  });
