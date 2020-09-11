cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "countly-sdk-cordova.Countly",
      "file": "plugins/countly-sdk-cordova/Countly.js",
      "pluginId": "countly-sdk-cordova",
      "clobbers": [
        "window.plugins.Countly"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-support-google-services": "1.4.0",
    "countly-sdk-cordova": "20.4.0"
  };
});