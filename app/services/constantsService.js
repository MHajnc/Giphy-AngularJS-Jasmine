'use strict';

 /**
  * @function constantsService
  * @memberOf SwrveTest.mHajncTestApp
  * @description The service provides constant values for the application.
  */
angular.module('mHajncTestApp').factory('constantsService', function () {
  return {
    giphy: {
      dataURL: 'http://api.giphy.com/v1/gifs/search?',
      apiKey: 'dc6zaTOxFJmzC'
    }
  };
});