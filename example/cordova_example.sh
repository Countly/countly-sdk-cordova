#!/bin/sh

# This is a shell script to create example app for Cordova.

rm -rf app_cordova
cordova create app_cordova com.countly.demo app_cordova
cd app_cordova/www

rm index.html
curl https://raw.githubusercontent.com/Countly/countly-sdk-cordova-example/master/app_cordova/www/index.html --output index.html

cordova plugin add https://github.com/Countly/countly-sdk-cordova.git

read -p 'Enter your server URL: ' serverURL
read -p 'Enter your App Key: ' appKey

sed -i'.bak' -e "s/YOUR_API_KEY/$appKey/g" index.html
sed -i'.bak' -e "s+\"https://try.count.ly\"+"\"${serverURL}\""+g" index.html

rm index.html.bak

cd ..
npm install
cordova platform add android
cordova platform add ios
