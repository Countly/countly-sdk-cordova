cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "countly-sdk-js.Countly",
      "file": "plugins/countly-sdk-js/Countly.js",
      "pluginId": "countly-sdk-js",
      "clobbers": [
        "window.plugins.Countly"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-support-google-services": "1.4.0",
    "countly-sdk-js": "20.4.0"
  };
});