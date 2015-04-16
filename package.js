Package.describe({
  name: 'countly:countly-sdk-js',
  version: '0.0.1',
  summary: 'Countly is an innovative, real-time, open source mobile analytics and push notifications platform.',
  git: 'https://github.com/Countly/countly-sdk-js.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('0.8.2');
  api.addFiles(['Countly.js'], ['web.cordova']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('countly:countly-sdk-js');
  api.addFiles('countly-sdk-js-tests.js');
});
