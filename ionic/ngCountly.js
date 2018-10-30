// install   :      cordova plugin add https://github.com/Countly/countly-sdk-js.git
// link      :      https://github.com/Countly/countly-sdk-js

angular.module('ngCordova.plugins.countly', [])
  .factory('$cordovaCountly', ['$q', '$window', function ($q, $window) {
    return Countly;
  }]);