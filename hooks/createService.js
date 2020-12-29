const fs = require('fs');
const xcode = require('xcode');


module.exports = function(context) {
    console.log('Starting hook to add notification extension to project');
    
    const cordovaCommon = context.requireCordovaModule('cordova-common');
    const appConfig = new cordovaCommon.ConfigParser('config.xml');
    const appName = appConfig.name();
    const iosPath = 'platforms/ios/';
    const projPath = `${iosPath}${appName}.xcodeproj/project.pbxproj`;
    const extName = 'CountlyNSE';
    const extFiles = [
        'NotificationService.h',
        'NotificationService.m',
        `${extName}-Info.plist`,
    ];
    // The directory where the source extension files are stored
    const sourceDir = __dirname +`/../src/ios/${extName}/`;

    // Wait a few seconds before parsing the project to let some other
    // asynchronous project file changes complete. Maybe there is a way to get
    // a promise?
    console.log('Waiting a few seconds for other project file changes to finish');
    setTimeout(function () {
        console.log(`Adding ${extName} notification extension to ${appName}`);
        let proj = xcode.project(projPath);
        proj.parse(function (err) {
            if (err) {
                console.log(`Error parsing iOS project: ${err}`);
            }
            // Copy in the extension files
            console.log('Copying in the extension files to the iOS project');
            fs.mkdirSync(`${iosPath}${extName}`);
            extFiles.forEach(function (extFile) {
                let targetFile = `${iosPath}${extName}/${extFile}`;
                console.log(`${sourceDir}${extFile}`);
                fs.createReadStream(`${sourceDir}${extFile}`)
                    .pipe(fs.createWriteStream(targetFile));
            });

            var countlyFiles = [
                __dirname +`/../src/ios/CountlyiOS/` +'CountlyNotificationService.h',
                __dirname +`/../src/ios/CountlyiOS/` +'CountlyNotificationService.m'
            ];
            extFiles.push(countlyFiles[0]);
            extFiles.push(countlyFiles[1]);
            // Create new PBXGroup for the extension
            console.log('Creating new PBXGroup for the extension');
            let extGroup = proj.addPbxGroup(extFiles, extName, extName);
            // Add the new PBXGroup to the CustomTemplate group. This makes the
            // files appear in the file explorer in Xcode.
            console.log('Adding new PBXGroup to CustomTemplate PBXGroup');
            let groups = proj.hash.project.objects['PBXGroup'];
            Object.keys(groups).forEach(function (key) {
                if (groups[key].name === 'CustomTemplate') {
                    proj.addToPbxGroup(extGroup.uuid, key);
                }
            });
            // Add a target for the extension
            console.log('Adding the new target');
            let target = proj.addTarget(extName, 'app_extension');
            
            
            // var bundleId = appConfig.doc._root.attrib.id+"." +extName;
            // var build = target.pbxNativeTarget.buildConfigurationList;
            // // proj.updateBuildProperty("PRODUCT_BUNDLE_IDENTIFIER", bundleId, extName);
            // var configs = proj.pbxXCBuildConfigurationSection();
            // console.log(configs);
            // for (var configName in configs) {
            //     var config = configs[configName];
            //     if(config && config.buildSettings && config.buildSettings){
            //         config.buildSettings["PRODUCT_BUNDLE_IDENTIFIER"] = bundleId;
            //     }
            //     // if ( (build && config.name === build) || (!build) ) {
            //     //     if(!config.buildSettings){
            //     //         config.buildSettings = {};
            //     //     }
            //     // }
            // }
            
            // console.log('bundleId');
            // console.log(bundleId);
            // console.log(target);
            // console.log(JSON.stringify(appConfig, null, 2));
            // Add build phases to the new target
            console.log('Adding build phases to the new target');
            proj.addBuildPhase([ 'NotificationService.m', countlyFiles[0], countlyFiles[1]], 'PBXSourcesBuildPhase', 'Sources', target.uuid); // 'CountlyNotificationService.h', 'CountlyNotificationService.m'
            proj.addBuildPhase([], 'PBXResourcesBuildPhase', 'Resources', target.uuid);
            proj.addBuildPhase([], 'PBXFrameworksBuildPhase', 'Frameworks', target.uuid);
            console.log('Write the changes to the iOS project file');
            fs.writeFileSync(projPath, proj.writeSync());
            console.log(`Added ${extName} notification extension to project`);
        });
    }, 3000);
};