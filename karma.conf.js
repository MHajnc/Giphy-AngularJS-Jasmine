module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    files: [
      'vendor/angular.min.js',
      'vendor/angular-mocks.js',
      'vendor/angular-ui-router.min.js',
      'vendor/ocLazyLoad.min.js',
      'vendor/loading-bar/loading-bar.min.js',
      'app/mHajncTestApp.js',
      'app/**/*.js',
      'tests/tests.js'
    ],
    proxies: {'/app/': 'http://localhost:666/app/'},
    reporters: ['progress'],
    port: 666, // ;)
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,
  })
}
