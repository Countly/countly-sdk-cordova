#import "CountlyNative.h"
#import "Countly.h"
#import "CountlyConfig.h"
//#import "CountlyDeviceInfo.h"
//#import "CountlyRemoteConfig.h"
//
//@interface CountlyNative ()
//{
//    NSTimer* timer;
//    BOOL isSuspended;
//}
//@end

@interface CountlyNative ()
{
}
@end

@implementation CountlyNative

    CountlyConfig* config = nil;

- (void) onCall:(NSString *)method commandString:(NSArray *)command callback:(Result) result{

    if(config == nil){
        config = CountlyConfig.new;
    }

    if([@"init" isEqualToString:method]){

        NSString* serverurl = [command  objectAtIndex:0];
        NSString* appkey = [command objectAtIndex:1];
        NSString* deviceID = @"";

        config.appKey = appkey;
        config.host = serverurl;

        config.sendPushTokenAlways = YES;
        config.features = @[CLYCrashReporting, CLYPushNotifications, CLYAutoViewTracking];

        if(command.count == 3){
            deviceID = [command objectAtIndex:2];
            config.deviceID = deviceID;
        }

        if (serverurl != nil && [serverurl length] > 0) {
            [[Countly sharedInstance] startWithConfig:config];
            result(@"initialized.");
        } else {
            result(@"initialization failed!");
        }
    }else if ([@"recordEvent" isEqualToString:method]) {
        NSString* key = [command objectAtIndex:0];
        NSString* countString = [command objectAtIndex:1];
        int count = [countString intValue];
        NSString* sumString = [command objectAtIndex:2];
        float sum = [sumString floatValue];
        NSString* durationString = [command objectAtIndex:1];
        int duration = [durationString intValue];
        NSMutableDictionary *segmentation = [[NSMutableDictionary alloc] init];

        if((int)command.count > 4){
            for(int i=4,il=(int)command.count;i<il;i+=2){
                segmentation[[command objectAtIndex:i]] = [command objectAtIndex:i+1];
            }
        }
        [[Countly sharedInstance] recordEvent:key segmentation:segmentation count:count  sum:sum duration:duration];
        NSString *resultString = @"recordEvent for: ";
        resultString = [resultString stringByAppendingString: key];
        result(resultString);
    }else if ([@"recordView" isEqualToString:method]) {
        NSString* recordView = [command objectAtIndex:0];
        [Countly.sharedInstance recordView:recordView];
        result(@"recordView Sent!");
    }else if ([@"setLoggingEnabled" isEqualToString:method]) {
        config.enableDebug = YES;
        result(@"setLoggingEnabled!");

    }else if ([@"setuserdata" isEqualToString:method]) {
        NSString* name = [command objectAtIndex:0];
        NSString* username = [command objectAtIndex:1];
        NSString* email = [command objectAtIndex:2];
        NSString* organization = [command objectAtIndex:3];
        NSString* phone = [command objectAtIndex:4];
        NSString* picture = [command objectAtIndex:5];
        //NSString* picturePath = [command objectAtIndex:6];
        NSString* gender = [command objectAtIndex:7];
        NSString* byear = [command objectAtIndex:8];

        Countly.user.name = name;
        Countly.user.username = username;
        Countly.user.email = email;
        Countly.user.organization = organization;
        Countly.user.phone = phone;
        Countly.user.pictureURL = picture;
        Countly.user.gender = gender;
        Countly.user.birthYear = @([byear integerValue]);

        [Countly.user save];
        result(@"setuserdata!");

    }else if ([@"getDeviceID" isEqualToString:method]) {
        NSString* deviceID = Countly.sharedInstance.deviceID;
        result(@"default!");

    // }else if ([@"sendRating" isEqualToString:method]) {
//        NSString* ratingString = [command objectAtIndex:0];
//        int rating = [ratingString intValue];
//        NSString* const kCountlySRKeyPlatform       = @"platform";
//        NSString* const kCountlySRKeyAppVersion     = @"app_version";
//        NSString* const kCountlySRKeyRating         = @"rating";
//        NSString* const kCountlyReservedEventStarRating = @"[CLY]_star_rating";
//
//        if (rating != 0)
//        {
//            NSDictionary* segmentation =
//            @{
//              kCountlySRKeyPlatform: CountlyDeviceInfo.osName,
//              kCountlySRKeyAppVersion: CountlyDeviceInfo.appVersion,
//              kCountlySRKeyRating: @(rating)
//              };
//            //            [Countly.sharedInstance recordReservedEvent:kCountlyReservedEventStarRating segmentation:segmentation];
//        }
//        result(@"sendRating!");

    }else if ([@"start" isEqualToString:method]) {
        [Countly.sharedInstance beginSession];
        result(@"start!");

    }else if ([@"update" isEqualToString:method]) {
        [Countly.sharedInstance updateSession];
        result(@"update!");

    // }else if ([@"manualSessionHandling" isEqualToString:method]) {
    //     // NSString* manualSessionHandling = [command objectAtIndex:0];
    //     config.manualSessionHandling = YES;
    //     result(@"manualSessionHandling!");

    }else if ([@"stop" isEqualToString:method]) {
        [Countly.sharedInstance endSession];
        result(@"stop!");

    // }else if ([@"updateSessionPeriod" isEqualToString:method]) {
    //     config.updateSessionPeriod = [[command objectAtIndex:0] intValue];
    //     result(@"updateSessionPeriod!");

    // }else if ([@"eventSendThreshold" isEqualToString:method]) {
    //     config.eventSendThreshold = [[command objectAtIndex:0] intValue];
    //     result(@"eventSendThreshold!");

    // }else if ([@"storedRequestsLimit" isEqualToString:method]) {
    //     // NSString* storedRequestsLimit = [command objectAtIndex:0];
    //     config.storedRequestsLimit = 1;
    //     result(@"storedRequestsLimit!");

    }else if ([@"changeDeviceId" isEqualToString:method]) {
        NSString* newDeviceID = [command objectAtIndex:0];
        NSString* onServerString = [command objectAtIndex:1];

        if ([onServerString  isEqual: @"1"]) {
            [Countly.sharedInstance setNewDeviceID:newDeviceID onServer: YES];
        }else{
            [Countly.sharedInstance setNewDeviceID:newDeviceID onServer: NO];
        }

        result(@"changeDeviceId!");

    }else if ([@"setHttpPostForced" isEqualToString:method]) {
        config.alwaysUsePOST = YES;
        result(@"setHttpPostForced!");

    }else if ([@"enableParameterTamperingProtection" isEqualToString:method]) {
        NSString* salt = [command objectAtIndex:0];
        config.secretSalt = salt;
        result(@"enableParameterTamperingProtection!");

    }else if ([@"startEvent" isEqualToString:method]) {
        NSString* eventName = [command objectAtIndex:0];
        [Countly.sharedInstance startEvent:eventName];
        result(@"startEvent!");

    }else if ([@"endEvent" isEqualToString:method]) {

        NSString* key = [command objectAtIndex:0];
        NSString* countString = [command objectAtIndex:1];
        int count = [countString intValue];
        NSString* sumString = [command objectAtIndex:2];
        float sum = [sumString floatValue];
        NSMutableDictionary *segmentation = [[NSMutableDictionary alloc] init];

        if((int)command.count > 3){
            for(int i=3,il=(int)command.count;i<il;i+=2){
                segmentation[[command objectAtIndex:i]] = [command objectAtIndex:i+1];
            }
        }
        [[Countly sharedInstance] endEvent:key segmentation:segmentation count:count  sum:sum];
        NSString *resultString = @"endEvent for: ";
        resultString = [resultString stringByAppendingString: key];
        result(resultString);
    }else if ([@"setLocation" isEqualToString:method]) {
        NSString* latitudeString = [command objectAtIndex:0];
        NSString* longitudeString = [command objectAtIndex:1];

        double latitudeDouble = [latitudeString doubleValue];
        double longitudeDouble = [longitudeString doubleValue];

        config.location = (CLLocationCoordinate2D){latitudeDouble,longitudeDouble};

        result(@"setLocation!");

    }else if ([@"enableCrashReporting" isEqualToString:method]) {
        // config.features = @[CLYCrashReporting];
        result(@"enableCrashReporting!");

    }else if ([@"addCrashLog" isEqualToString:method]) {
        NSString* record = [command objectAtIndex:0];
        [Countly.sharedInstance recordCrashLog: record];
        result(@"addCrashLog!");

    }else if ([@"logException" isEqualToString:method]) {
        NSString* execption = [command objectAtIndex:0];
        NSString* nonfatal = [command objectAtIndex:1];
        NSArray *nsException = [execption componentsSeparatedByString:@"\n"];

        NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];

        for(int i=2,il=(int)command.count;i<il;i+=2){
            dict[[command objectAtIndex:i]] = [command objectAtIndex:i+1];
        }
        [dict setObject:nonfatal forKey:@"nonfatal"];

        NSException* myException = [NSException exceptionWithName:@"Exception" reason:execption userInfo:dict];

        [Countly.sharedInstance recordHandledException:myException withStackTrace: nsException];
        result(@"logException!");

    }else if ([@"sendPushToken" isEqualToString:method]) {
        NSString* token = [command objectAtIndex:0];
        int messagingMode = [[command objectAtIndex:1] intValue];

        [Countly.sharedInstance sendPushToken:token messagingMode: messagingMode];
        result(@"sendPushToken!");

    }else if ([@"askForNotificationPermission" isEqualToString:method]) {
        UNAuthorizationOptions authorizationOptions = UNAuthorizationOptionProvisional;

        [Countly.sharedInstance askForNotificationPermissionWithOptions:authorizationOptions completionHandler:^(BOOL granted, NSError *error)
         {
             NSLog(@"granted: %d", granted);
             NSLog(@"error: %@", error);
         }];
        // [Countly.sharedInstance askForNotificationPermission];
        result(@"askForNotificationPermission!");
    }else if ([@"pushTokenType" isEqualToString:method]) {
        //            config.sendPushTokenAlways = YES;
        //            NSString* tokenType = [command objectAtIndex:0];
        //            if([tokenType isEqualToString: @"1"]){
        //                config.pushTestMode = @"CLYPushTestModeDevelopment";
        //            }else if([tokenType isEqualToString: @"2"]){
        //                config.pushTestMode = @"CLYPushTestModeTestFlightOrAdHoc";
        //            }else{
        //
        //            }
        result(@"pushTokenType!");
    }else if ([@"userData_setProperty" isEqualToString:method]) {
        NSString* keyName = [command objectAtIndex:0];
        NSString* keyValue = [command objectAtIndex:1];

        [Countly.user set:keyName value:keyValue];
        [Countly.user save];

        result(@"userData_setProperty!");

    }else if ([@"userData_increment" isEqualToString:method]) {
        NSString* keyName = [command objectAtIndex:0];

        [Countly.user increment:keyName];
        [Countly.user save];

        result(@"userData_increment!");

    }else if ([@"userData_incrementBy" isEqualToString:method]) {
        NSString* keyName = [command objectAtIndex:0];
        NSString* keyValue = [command objectAtIndex:1];
        int keyValueInteger = [keyValue intValue];

        [Countly.user incrementBy:keyName value:[NSNumber numberWithInt:keyValueInteger]];
        [Countly.user save];

        result(@"userData_incrementBy!");

    }else if ([@"userData_multiply" isEqualToString:method]) {
        NSString* keyName = [command objectAtIndex:0];
        NSString* keyValue = [command objectAtIndex:1];
        int keyValueInteger = [keyValue intValue];

        [Countly.user multiply:keyName value:[NSNumber numberWithInt:keyValueInteger]];
        [Countly.user save];

        result(@"userData_multiply!");

    }else if ([@"userData_saveMax" isEqualToString:method]) {
        NSString* keyName = [command objectAtIndex:0];
        NSString* keyValue = [command objectAtIndex:1];
        int  keyValueInteger = [keyValue intValue];

        [Countly.user max:keyName value:[NSNumber numberWithInt:keyValueInteger]];
        [Countly.user save];
        result(@"userData_saveMax!");

    }else if ([@"userData_saveMin" isEqualToString:method]) {
        NSString* keyName = [command objectAtIndex:0];
        NSString* keyValue = [command objectAtIndex:1];
        int keyValueInteger = [keyValue intValue];

        [Countly.user min:keyName value:[NSNumber numberWithInt:keyValueInteger]];
        [Countly.user save];

        result(@"userData_saveMin!");

    }else if ([@"userData_setOnce" isEqualToString:method]) {
        NSString* keyName = [command objectAtIndex:0];
        NSString* keyValue = [command objectAtIndex:1];

        [Countly.user setOnce:keyName value:keyValue];
        [Countly.user save];

        result(@"userData_setOnce!");

    }else if ([@"userData_pushUniqueValue" isEqualToString:method]) {
        NSString* type = [command objectAtIndex:0];
        NSString* pushUniqueValueString = [command objectAtIndex:1];

        [Countly.user pushUnique:type value:pushUniqueValueString];
        [Countly.user save];

        result(@"userData_pushUniqueValue!");

    }else if ([@"userData_pushValue" isEqualToString:method]) {
        NSString* type = [command objectAtIndex:0];
        NSString* pushValue = [command objectAtIndex:1];

        [Countly.user push:type value:pushValue];
        [Countly.user save];

        result(@"userData_pushValue!");

    }else if ([@"userData_pullValue" isEqualToString:method]) {
        NSString* type = [command objectAtIndex:0];
        NSString* pullValue = [command objectAtIndex:1];

        [Countly.user pull:type value:pullValue];
        [Countly.user save];

        result(@"userData_pullValue!");

        //setRequiresConsent
    }else if ([@"setRequiresConsent" isEqualToString:method]) {
        BOOL consentFlag = [[command objectAtIndex:0] boolValue];
        config.requiresConsent = consentFlag;
        result(@"setRequiresConsent!");

    }else if ([@"giveConsent" isEqualToString:method]) {
        NSString* consent = @"";
        // NSMutableDictionary *giveConsentAll = [[NSMutableDictionary alloc] init];
        for(int i=0,il=(int)command.count; i<il;i++){
            consent = [command objectAtIndex:i];
            if([@"sessions" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentSessions];
            }
            if([@"events" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentEvents];
            }
            if([@"users" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentUserDetails];
            }
            if([@"crashes" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentCrashReporting];
            }
            if([@"push" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentPushNotifications];
            }
            if([@"location" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentLocation];
            }
            if([@"views" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentViewTracking];
            }
            if([@"attribution" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentAttribution];
            }
            if([@"star-rating" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentStarRating];
            }
            if([@"accessory-devices" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentAppleWatch];
            }
        }


        NSString *resultString = @"giveConsent for: ";
        result(@"giveConsent!");

    }else if ([@"removeConsent" isEqualToString:method]) {
        NSString* consent = @"";
        //        NSMutableDictionary *removeConsent = [[NSMutableDictionary alloc] init];
        for(int i=0,il=(int)command.count; i<il;i++){
            consent = [command objectAtIndex:i];
            if([@"sessions" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentSessions];
            }
            if([@"events" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentEvents];
            }
            if([@"users" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentUserDetails];
            }
            if([@"crashes" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentCrashReporting];
            }
            if([@"push" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentPushNotifications];
            }
            if([@"location" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentLocation];
            }
            if([@"views" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentViewTracking];
            }
            if([@"attribution" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentAttribution];
            }
            if([@"star-rating" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentStarRating];
            }
            if([@"accessory-devices" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentAppleWatch];
            }
        }

        NSString *resultString = @"removeConsent for: ";
        result(@"removeConsent!");

    }else if ([@"giveAllConsent" isEqualToString:method]) {
        //        [Countly.sharedInstance giveConsentForAllFeatures];

        [Countly.sharedInstance giveConsentForFeature:CLYConsentSessions];
        [Countly.sharedInstance giveConsentForFeature:CLYConsentEvents];
        [Countly.sharedInstance giveConsentForFeature:CLYConsentUserDetails];
        [Countly.sharedInstance giveConsentForFeature:CLYConsentCrashReporting];
        [Countly.sharedInstance giveConsentForFeature:CLYConsentPushNotifications];
        [Countly.sharedInstance giveConsentForFeature:CLYConsentViewTracking];
        [Countly.sharedInstance giveConsentForFeature:CLYConsentAttribution];
        [Countly.sharedInstance giveConsentForFeature:CLYConsentStarRating];
        [Countly.sharedInstance giveConsentForFeature:CLYConsentAppleWatch];
        result(@"giveAllConsent!");

    }else if ([@"removeAllConsent" isEqualToString:method]) {
        //        [Countly.sharedInstance cancelConsentForAllFeatures];

        [Countly.sharedInstance cancelConsentForFeature:CLYConsentSessions];
        [Countly.sharedInstance cancelConsentForFeature:CLYConsentEvents];
        [Countly.sharedInstance cancelConsentForFeature:CLYConsentUserDetails];
        [Countly.sharedInstance cancelConsentForFeature:CLYConsentCrashReporting];
        [Countly.sharedInstance cancelConsentForFeature:CLYConsentPushNotifications];
        [Countly.sharedInstance cancelConsentForFeature:CLYConsentViewTracking];
        [Countly.sharedInstance cancelConsentForFeature:CLYConsentAttribution];
        [Countly.sharedInstance cancelConsentForFeature:CLYConsentStarRating];
        [Countly.sharedInstance cancelConsentForFeature:CLYConsentAppleWatch];
        result(@"removeAllConsent!");

    }else if ([@"setOptionalParametersForInitialization" isEqualToString:method]) {
        NSString* city = [command objectAtIndex:0];
        NSString* country = [command objectAtIndex:1];

        NSString* latitudeString = [command objectAtIndex:2];
        NSString* longitudeString = [command objectAtIndex:3];
        NSString* ipAddress = [command objectAtIndex:3];

        double latitudeDouble = [latitudeString doubleValue];
        double longitudeDouble = [longitudeString doubleValue];

        [Countly.sharedInstance recordLocation:(CLLocationCoordinate2D){latitudeDouble,longitudeDouble}];
        [Countly.sharedInstance recordCity:city andISOCountryCode:country];
        [Countly.sharedInstance recordIP:ipAddress];
        result(@"setOptionalParametersForInitialization!");

    }else if ([@"setRemoteConfigAutomaticDownload" isEqualToString:method]) {
        config.enableRemoteConfig = YES;
        config.remoteConfigCompletionHandler = ^(NSError * error)
        {
            if (!error){
                result(@"Success!");
            } else {
                result([@"Error :" stringByAppendingString: error.localizedDescription]);
            }
        };

    }else if ([@"remoteConfigUpdate" isEqualToString:method]) {
        [Countly.sharedInstance updateRemoteConfigWithCompletionHandler:^(NSError * error)
         {
             if (!error){
                 result(@"Success!");
             } else {
                 result([@"Error :" stringByAppendingString: error.localizedDescription]);
             }
         }];

    }else if ([@"updateRemoteConfigForKeysOnly" isEqualToString:method]) {
        NSMutableArray *randomSelection = [[NSMutableArray alloc] init];
        for (int i = 0; i < (int)command.count; i++){
            [randomSelection addObject:[command objectAtIndex:i]];
        }
        NSArray *keysOnly = [randomSelection copy];

        // NSArray * keysOnly[] = {};
        // for(int i=0,il=(int)command.count;i<il;i++){
        //     keysOnly[i] = [command objectAtIndex:i];
        // }
        [Countly.sharedInstance updateRemoteConfigOnlyForKeys: keysOnly completionHandler:^(NSError * error)
         {
             if (!error){
                 result(@"Success!");
             } else {
                 result([@"Error :" stringByAppendingString: error.localizedDescription]);
             }
         }];

    }else if ([@"updateRemoteConfigExceptKeys" isEqualToString:method]) {
        NSMutableArray *randomSelection = [[NSMutableArray alloc] init];
        for (int i = 0; i < (int)command.count; i++){
            [randomSelection addObject:[command objectAtIndex:i]];
        }
        NSArray *exceptKeys = [randomSelection copy];

        // NSArray * exceptKeys[] = {};
        // for(int i=0,il=(int)command.count;i<il;i++){
        //     exceptKeys[i] = [command objectAtIndex:i];
        // }
        [Countly.sharedInstance updateRemoteConfigExceptForKeys: exceptKeys completionHandler:^(NSError * error)
         {
             if (!error){
                 result(@"Success!");
             } else {
                 result([@"Error :" stringByAppendingString: error.localizedDescription]);
             }
         }];

    }else if ([@"remoteConfigClearValues" isEqualToString:method]) {
//        [CountlyRemoteConfig.sharedInstance clearCachedRemoteConfig];
        result(@"Success!");

    }else if ([@"getRemoteConfigValueForKey" isEqualToString:method]) {
        id value = [Countly.sharedInstance remoteConfigValueForKey:[command objectAtIndex:0]];
        if(!value){
            value = @"Default Value";
        }
        NSString *theType = NSStringFromClass([value class]);
        if([theType isEqualToString:@"NSTaggedPointerString"]){
            result(value);
        }else{
            result([value stringValue]);
        }
    }else if ([@"askForFeedback" isEqualToString:method]) {
        NSString* widgetId = [command objectAtIndex:0];
        [Countly.sharedInstance presentFeedbackWidgetWithID:widgetId completionHandler:^(NSError* error){
            if (error){
                NSString *theError = [@"Feedback widget presentation failed: " stringByAppendingString: error.localizedDescription];
                result(theError);
            }
            else{
                result(@"Feedback widget presented successfully");
            }
        }];

    }else if ([@"askForStarRating" isEqualToString:method]) {
        [Countly.sharedInstance askForStarRating:^(NSInteger rating){
            result([NSString stringWithFormat: @"Rating:%d", (int)rating]);
        }];
    }else if ([@"getPlatformVersion" isEqualToString:method]) {
        result([@"iOS " stringByAppendingString:[[UIDevice currentDevice] systemVersion]]);
    }
    else {
        result(@"FlutterMethodNotImplemented");
    }
}

@end


