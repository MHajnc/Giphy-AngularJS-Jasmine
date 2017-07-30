'use strict';

/**
 * @class SwrveTest.mHajncTestApp.thumbController
 * @description A controller that manages the display and handling of video
 */
angular.module('mHajncTestApp')
.controller('thumbController', function ($scope, constantsService, thumbService) {
  $scope.keywords = ['Cats', 'Dogs', 'Software Developers'];
  $scope.thumbLimit = 25;
  $scope.currGifObj = null;

  /**
    * @name resetState
    * @function
    * @memberOf SwrveTest.mHajncTestApp.thumbController
    * @description Initializing variables on startup and after keyword change
    */
  function resetState() {
    $scope.gifsListTotalCount = 0;
    $scope.gifsListOffset = 0;
    $scope.gifsList = null;
    $scope.errorInfo = null;
  }
  resetState();

  /* Check whether the session has values. Used on return from another site. */
  if (sessionStorage.getItem('currKeyword')) {
    $scope.currKeyword = sessionStorage.getItem('currKeyword');
  }
  else {
    $scope.currKeyword = $scope.keywords[0];
  }
  if (sessionStorage.getItem('gifsListOffset')) {
    $scope.gifsListOffset = sessionStorage.getItem('gifsListOffset');
  }

  /**
    * @name getData
    * @function
    * @memberOf SwrveTest.mHajncTestApp.thumbController
    * @description Downloading portions of data from an external API. Runs at start and after clicking next / previous
    */
  function getData() {
    sessionStorage.setItem('currKeyword', $scope.currKeyword);
    sessionStorage.setItem('gifsListOffset', $scope.gifsListOffset);

    thumbService.getGiphyThumbs(
      constantsService.giphy.dataURL,
      constantsService.giphy.apiKey,
      $scope.currKeyword,
      $scope.gifsListOffset,
      $scope.thumbLimit
    )
    .then(
      function (giphyRes) {
        $scope.gifsList = giphyRes.data;
        $scope.gifsListTotalCount = giphyRes.pagination.total_count;
        $scope.gifsListOffset = giphyRes.pagination.offset;
        window.scrollTo(0, 0);
      },
      function (error) {
        $scope.errorInfo = 'An error occurred while retrieving: ' + dataSource;
      }
    );
  }
  getData();

  /**
    * @name $scope.getListPart
    * @function
    * @memberOf SwrveTest.mHajncTestApp.thumbController
    * @description Start downloading the next / previous portion of the data after the events in the template
    * @param {Number} dir -1 or 1, Specifies the direction of the offset
    */
  $scope.getListPart = function (dir) {
    if (dir > 0) {
      $scope.gifsListOffset += $scope.thumbLimit;
    }
    else if (dir < 0) {
      $scope.gifsListOffset -= $scope.thumbLimit;
    }
    else {
      return;
    }
    getData();
  }

  /**
    * @name $scope.switchKeyword
    * @function
    * @memberOf SwrveTest.mHajncTestApp.thumbController
    * @description Starts loading data for the new keyword and resets the offset
    * @param {String} keyword Defines a new keyword
    */
  $scope.switchKeyword = function (keyword) {
    $scope.currKeyword = keyword;
    resetState();
    getData();
  }

  /**
    * @name $scope.showImgPopup
    * @function
    * @memberOf SwrveTest.mHajncTestApp.thumbController
    * @description Runs a video popup or loads a video page depending on screen resolution
    * @param {Object} gifData Video file data
    */
  $scope.showImgPopup = function (gifData) {
    if (window.innerWidth <= 320) {
      window.location.href = gifData.images.original.mp4;
    }
    else {
      $scope.currGifObj = gifData;
    }
  }

  /**
    * @name $scope.onVideoClose
    * @function
    * @memberOf SwrveTest.mHajncTestApp.thumbController
    * @description clear viedeo after hiding popup
    */
  $scope.onVideoClose = function () {
    var vidPlayer = document.getElementById('vid-player');
    vidPlayer.removeAttribute('src');
    vidPlayer.load();
  }
})
