Package.describe({
  name: 'countly:countly-sdk-js',
  version: '20.4.0', // Meteor doesn't go with 18.08.1
  summary: 'Countly is an innovative, real-time, open source mobile analytics and push notifications platform. It collects data from mobile devices, and visualizes this information to analyze mobile application usage and end-user behavior. There are two parts of Countly: the server that collects and analyzes data, and mobile SDK that sends this data. Both parts are open source with different licensing terms.',
  git: 'https://github.com/Countly/countly-sdk-js.git',
  documentation: 'README.md'
});

Cordova.depends({
  "countly-sdk-js": "https://github.com/Countly/countly-sdk-js/tarball/fc78daf627464b2e5b63ee945ca5b66d2314c322",
});

Package.onUse(function(api) {
  api.addFiles(['Countly.js'], ['web.cordova']);
});
