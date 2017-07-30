'use strict';

describe('mHajncTestApp', function() {
  beforeEach(module('mHajncTestApp'));

  var $controller;
  var constantsService;
  var thumbService;
  var httpBackend;

  beforeEach(
    inject(function($httpBackend, _$controller_, $injector) {
      constantsService = $injector.get('constantsService');
      thumbService = $injector.get('thumbService');
      httpBackend = $httpBackend;
      $controller = _$controller_;
    }
  ));

  it('should reset the thumbs offset and set it to first `thumbLimit`', function() {
    var $scope = {};
    var thumbController = $controller('thumbController', { $scope: $scope });
    $scope.gifsListOffset = 0;
    $scope.getListPart(1);
    expect($scope.gifsListOffset).toBe($scope.thumbLimit);
  });

  it('should have a `giphy` object', function() {
    expect(constantsService.giphy).toBeDefined();
  });

  it('should send the request to `thumbService` and return the response', function() {
    var returnData = true;
    var result;

    httpBackend.whenGET(
        [
          constantsService.giphy.dataURL,
          'api_key=', constantsService.giphy.apiKey,
          '&q=mocks&offset=0&limit=25'
        ].join('')
      )
      .respond(returnData);

    thumbService.getGiphyThumbs(
        constantsService.giphy.dataURL,
        constantsService.giphy.apiKey,
        'mocks', 0, 25
      )
      .then(function(response) {
        result = response;
      });

    httpBackend.flush();

    expect(result).toBe(returnData);
  });
});