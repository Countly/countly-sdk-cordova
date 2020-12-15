#!/bin/sh

# This is a shell script to create example app for Ionic.

rm -rf app_ionic
ionic start app_ionic blank
cd app_ionic/src/app/home/

rm home.page.ts
curl https://raw.githubusercontent.com/Countly/countly-sdk-cordova-example/master/app_ionic/src/app/home/home.page.ts --output home.page.ts

ionic cordova plugin add https://github.com/Countly/countly-sdk-cordova.git

read -p 'Enter your server URL: ' serverURL
read -p 'Enter your App Key: ' appKey

sed -i'.bak' -e "s/YOUR_API_KEY/$appKey/g" home.page.ts
sed -i'.bak' -e "s+\"https://try.count.ly\"+"\"${serverURL}\""+g" home.page.ts

rm home.page.ts.bak

cd ..
cd ..
cd ..

npm install
npm run build

ionic cordova platform add android
ionic cordova platform add ios

ionic cordova prepare android
ionic cordova prepare ios