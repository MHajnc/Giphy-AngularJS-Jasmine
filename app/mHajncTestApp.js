'use strict';

/**
 * @class SwrveTest.mHajncTestApp
 * @memberOf SwrveTest 
 */
angular.module('mHajncTestApp', [
  'ui.router',
  'oc.lazyLoad',
  'angular-loading-bar'
])

.config( function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider ) {
  $ocLazyLoadProvider.config({
    //debug: true,
  });

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state("thumbs", {
    url: "/",
    templateUrl: 'app/views/thumbs.html',
    controller: 'thumbController',
    resolve: {
      loadCtrl: ['$ocLazyLoad',
        function($ocLazyLoad) {
          return $ocLazyLoad.load({
            files: [
              'app/controllers/thumbController.js',
              'app/services/thumbService.js',
              'app/services/constantsService.js',
              'app/directives/modalDirective.js'
            ]
          });
        }
      ]
    }
  })
})

.filter('trusted', function($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
});
