'use strict';

 /**
  * @function thumbService
  * @memberOf SwrveTest.mHajncTestApp
  * @description This Service provides communication with an external API
  */
angular.module('mHajncTestApp')
.factory('thumbService', function ($http, $q) {
  return {
    getGiphyThumbs: function (dataURL, apiKey, keyword, offset, limit) {
      var deferred = $q.defer();
      $http.get(
        [
          dataURL,
          'api_key=', apiKey,
          '&q=', keyword,
          '&offset=', offset,
          '&limit=', limit
        ].join('')
      )
        .then(
          function (result) {
            deferred.resolve(result.data);
          }, 
          function (error) {
            deferred.reject(error);
          }
        )
      return deferred.promise;
    }
  }
})