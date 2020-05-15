# Cordova plugin to add support for google services

[![NPM version][npm-version]][npm-url] [![NPM downloads][npm-downloads]][npm-url] [![Twitter][twitter-follow]][twitter-url]

| [![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)][donate-url] | Your help is appreciated. Create a PR, submit a bug or just grab me :beer: |
|-|-|

As part of enabling Google APIs or Firebase services in your Android application you may have to add the [google-services plugin](https://developers.google.com/android/guides/google-services-plugin) to your `build.gradle` file.

## Index

<!-- MarkdownTOC levels="2" autolink="true" -->

- [Installation](#installation)
- [FAQ](#faq)

<!-- /MarkdownTOC -->

## Installation

    cordova plugin add cordova-support-google-services --save

You also need to download `google-services.json` on Android and `GoogleService-Info.plist` on iOS from Firebase console and put them into the cordova project root folder. Then use [`<resource-file>`](http://cordova.apache.org/docs/en/latest/config_ref/index.html#resource-file) to copy those files into appropriate folders:

```xml
<platform name="android">
    <resource-file src="google-services.json" target="app/google-services.json" />
    ...
</platform>
<platform name="ios">
    <resource-file src="GoogleService-Info.plist" />
    ...
</platform>
```

Note: if you use cordova-android below version 7 specify `target="google-services.json"` instead.

## FAQ

#### Build Error: Failed to apply plugin [class 'com.google.gms.googleservices.GoogleServicesPlugin']
It looks like you have another dependency on a google play services lib with a generic verison `*`. You have to fix ALL dependency version(s) to be more more specific like `11.0.+`. In order to do that fix version strings for any play services library you have in `platforms/android/project.properties`.

#### Build Error: Could not generate a proxy class for class com.google.gms.googleservices.GoogleServicesTask.
Open `platform/android/build.gradle` and change version of the first `com.android.tools.build:gradle`:

    classpath 'com.android.tools.build:gradle:1.2.3+'

#### Duplicate resources: .../platforms/android/build/generated/res/google-services/armv7/debug/values/values.xml:string/google_api_key, .../platforms/android/res/values/strings.xml:string/google_api_key
Remove `google_api_key` and `google_app_id` from any existing xml file from `platform/android/res/` folder. Those values now come from an automatically generated `values.xml`.

[npm-url]: https://www.npmjs.com/package/cordova-support-google-services
[npm-version]: https://img.shields.io/npm/v/cordova-support-google-services.svg
[npm-downloads]: https://img.shields.io/npm/dm/cordova-support-google-services.svg
[twitter-url]: https://twitter.com/chemerisuk
[twitter-follow]: https://img.shields.io/twitter/follow/chemerisuk.svg?style=social&label=Follow%20me
[donate-url]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UEJW557C3S7EQ&source=url