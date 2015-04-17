Package.describe({
  name: 'countly:countly-sdk-js',
  version: '0.0.2',
  summary: 'Countly is an innovative, real-time, open source mobile analytics and push notifications platform.',
  git: 'https://github.com/Countly/countly-sdk-js.git',
  documentation: 'README.md'
});

Cordova.depends({
  "ly.count.cordova": "https://github.com/Countly/countly-sdk-js/tarball/bc7ec996924c1beef460d969d0b64ddb4bdb5b8f",
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles(['Countly.js'], ['web.cordova']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('countly:countly-sdk-js');
  api.addFiles('js/countly-sdk-js-tests.js');
});
