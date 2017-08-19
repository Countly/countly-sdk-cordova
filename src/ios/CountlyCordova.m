/********* Countly.h Countly Plugin Implementation *******/

#import "Countly.h"
#import "CountlyCordova.h"
#import "CountlyConfig.h"
#import "CountlyPushNotifications.h"
#import <Cordova/CDV.h>

CountlyConfig* config = nil;

@interface CountlyPushNotifications()
- (void)sendToken;
@property (nonatomic, strong) NSString* token;
@end

@implementation CountlyCordova

- (void)echo:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* echo = [command.arguments objectAtIndex:0];

    if (echo != nil && [echo length] > 0) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:echo];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)init:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* serverurl = [command.arguments objectAtIndex:0];
    NSString* appkey = [command.arguments objectAtIndex:1];

    if(config == nil){
        config = CountlyConfig.new;
    }
    config.appKey = appkey;
    config.host = serverurl;

    if (serverurl != nil && [serverurl length] > 0) {
        [[Countly sharedInstance] startWithConfig:config];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"initialized!"];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }


    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)event:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* eventType = [command.arguments objectAtIndex:0];
    if (eventType != nil && [eventType length] > 0) {
        if ([eventType  isEqual: @"event"]) {
            NSString* eventName = [command.arguments objectAtIndex:1];
            NSString* countString = [command.arguments objectAtIndex:2];
            int countInt = [countString intValue];
            [[Countly sharedInstance] recordEvent:eventName count:countInt];
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"event sent!"];
        }
        else if ([eventType  isEqual: @"eventWithSum"]){
            NSString* eventName = [command.arguments objectAtIndex:1];
            NSString* countString = [command.arguments objectAtIndex:2];
            int countInt = [countString intValue];
            NSString* sumString = [command.arguments objectAtIndex:3];
            float sumFloat = [sumString floatValue];
            [[Countly sharedInstance] recordEvent:eventName count:countInt  sum:sumFloat];
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"eventWithSum sent!"];
        }
        else if ([eventType  isEqual: @"eventWithSegment"]){
            NSString* eventName = [command.arguments objectAtIndex:1];
            NSString* countString = [command.arguments objectAtIndex:2];
            int countInt = [countString intValue];
            NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];

            for(int i=3,il=(int)command.arguments.count;i<il;i+=2){
                dict[[command.arguments objectAtIndex:i]] = [command.arguments objectAtIndex:i+1];
            }
            [[Countly sharedInstance] recordEvent:eventName segmentation:dict count:countInt];
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"eventWithSegment sent!"];
        }
        else if ([eventType  isEqual: @"eventWithSumSegment"]){
            NSString* eventName = [command.arguments objectAtIndex:1];
            NSString* countString = [command.arguments objectAtIndex:2];
            int countInt = [countString intValue];
            NSString* sumString = [command.arguments objectAtIndex:3];
            float sumFloat = [sumString floatValue];
            NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];

            for(int i=4,il=(int)command.arguments.count;i<il;i+=2){
                dict[[command.arguments objectAtIndex:i]] = [command.arguments objectAtIndex:i+1];
            }
            [[Countly sharedInstance] recordEvent:eventName segmentation:dict count:countInt  sum:sumFloat];
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"eventWithSegment sent!"];
        }
        else{
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"none cases!"];
        }
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}
- (void)recordView:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* recordView = [command.arguments objectAtIndex:0];
    [Countly.sharedInstance reportView:recordView];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"recordView Sent!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}
- (void)setloggingenabled:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"setloggingenabled!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setuserdata:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* name = [command.arguments objectAtIndex:0];
    NSString* username = [command.arguments objectAtIndex:1];
    NSString* email = [command.arguments objectAtIndex:2];
    NSString* org = [command.arguments objectAtIndex:3];
    NSString* phone = [command.arguments objectAtIndex:4];
    NSString* picture = [command.arguments objectAtIndex:5];
    //NSString* picturePath = [command.arguments objectAtIndex:6];
    NSString* gender = [command.arguments objectAtIndex:7];
    NSString* byear = [command.arguments objectAtIndex:8];

    Countly.user.name = name;
    Countly.user.username = username;
    Countly.user.email = email;
    Countly.user.organization = org;
    Countly.user.phone = phone;
    Countly.user.pictureURL = picture;
    Countly.user.gender = gender;
    Countly.user.birthYear = @([byear integerValue]);
    //NSInteger byearint = [byear intValue];

    [Countly.user recordUserDetails];
    [Countly.user save];
        // [Countly.sharedInstance recordUserDetails: @{
        //                                             kCLYUserName: name,
        //                                             kCLYUserEmail: email,
        //                                             kCLYUserBirthYear: byear,
        //                                             kCLYUserGender: gender,
        //                                             kCLYUserOrganization: org,
        //                                             kCLYUserPhone: phone,
        //                                             kCLYUserUsername: username,
        //                                             kCLYUserPicture: picture
        //                                                          }];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"setuserdata!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)onregistrationid:(CDVInvokedUrlCommand*)command
{
    NSString* token = [command.arguments objectAtIndex:0];
    NSString* messagingMode = [command.arguments objectAtIndex:1];
    int mode = [messagingMode intValue];
    NSData *tokenByte = [token dataUsingEncoding:NSUTF8StringEncoding];
    if(mode == 1){
      // [[CountlyConnectionQueue sharedInstance] setStartedWithTest:YES];
    }
    CountlyPushNotifications.sharedInstance.token = token;
    [CountlyPushNotifications.sharedInstance sendToken];
    // [Countly.sharedInstance didRegisterForRemoteNotificationsWithDeviceToken:tokenByte];

    // [[CountlyConnectionQueue sharedInstance] tokenSession:token];

    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"onregistrationid!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)start:(CDVInvokedUrlCommand*)command
{
    [Countly.sharedInstance resume];

    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"start!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)stop:(CDVInvokedUrlCommand*)command
{
    [Countly.sharedInstance suspend];

    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"stop!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)changeDeviceId:(CDVInvokedUrlCommand*)command
{
    NSString* newDeviceID = [command.arguments objectAtIndex:0];
    [Countly.sharedInstance setNewDeviceID:newDeviceID onServer:YES];

    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"changeDeviceId!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setHttpPostForced:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"setHttpPostForced!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)enableParameterTamperingProtection:(CDVInvokedUrlCommand*)command
{
    NSString* salt = [command.arguments objectAtIndex:0];
    config.secretSalt = salt;

    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"enableParameterTamperingProtection!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)startEvent:(CDVInvokedUrlCommand*)command
{
    NSString* eventName = [command.arguments objectAtIndex:0];
    [Countly.sharedInstance startEvent:eventName];

    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"startEvent!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)endEvent:(CDVInvokedUrlCommand*)command
{
    NSString* eventType = [command.arguments objectAtIndex:0];
    CDVPluginResult* pluginResult = nil;

    if ([eventType  isEqual: @"event"]) {
        NSString* eventName = [command.arguments objectAtIndex:1];
        [Countly.sharedInstance endEvent:eventName];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"event sent!"];
    }
    else if ([eventType  isEqual: @"eventWithSegment"]){
        NSString* eventName = [command.arguments objectAtIndex:1];
        NSString* countString = [command.arguments objectAtIndex:2];
        int countInt = [countString intValue];
        NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];

        for(int i=3,il=(int)command.arguments.count;i<il;i+=2){
            dict[[command.arguments objectAtIndex:i]] = [command.arguments objectAtIndex:i+1];
        }
        [Countly.sharedInstance endEvent:eventName segmentation:dict count:countInt sum:0];

        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"eventWithSegment sent!"];
    }
    else{
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"none cases!"];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setLocation:(CDVInvokedUrlCommand*)command
{
    NSString* latitudeString = [command.arguments objectAtIndex:0];
    NSString* longitudeString = [command.arguments objectAtIndex:1];

    double latitudeDouble = [latitudeString doubleValue];
    double longitudeDouble = [longitudeString doubleValue];

    config.location = (CLLocationCoordinate2D){latitudeDouble,longitudeDouble};

    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"setLocation!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)enableCrashReporting:(CDVInvokedUrlCommand*)command
{
    config.features = @[CLYCrashReporting];

    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"enableCrashReporting!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)addCrashLog:(CDVInvokedUrlCommand*)command
{
    NSString* record = [command.arguments objectAtIndex:0];
    [Countly.sharedInstance crashLog: record];

    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"addCrashLog!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)userData_setProperty:(CDVInvokedUrlCommand*)command
{
    NSString* keyName = [command.arguments objectAtIndex:0];
    NSString* keyValue = [command.arguments objectAtIndex:1];

    [Countly.user set:keyName value:keyValue];
    [Countly.user save];

    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"userData_setProperty!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)userData_increment:(CDVInvokedUrlCommand*)command
{
    NSString* keyName = [command.arguments objectAtIndex:0];

    [Countly.user increment:keyName];
    [Countly.user save];

    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"userData_incrementBy!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)userData_incrementBy:(CDVInvokedUrlCommand*)command
{
    NSString* keyName = [command.arguments objectAtIndex:0];
    NSString* keyValue = [command.arguments objectAtIndex:1];
    int keyValueInteger = [keyValue intValue];

    [Countly.user incrementBy:keyName value:keyValueInteger];
    [Countly.user save];

    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"userData_incrementBy!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)userData_multiply:(CDVInvokedUrlCommand*)command
{
    NSString* keyName = [command.arguments objectAtIndex:0];
    NSString* keyValue = [command.arguments objectAtIndex:1];
    int keyValueInteger = [keyValue intValue];

    [Countly.user multiply:keyName value:keyValueInteger];
    [Countly.user save];

    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"userData_multiply!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)userData_saveMax:(CDVInvokedUrlCommand*)command
{
    NSString* keyName = [command.arguments objectAtIndex:0];
    NSString* keyValue = [command.arguments objectAtIndex:1];
    int keyValueInteger = [keyValue intValue];

    [Countly.user max:keyName value:keyValueInteger];
    [Countly.user save];

    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"userData_saveMax!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)userData_saveMin:(CDVInvokedUrlCommand*)command
{
    NSString* keyName = [command.arguments objectAtIndex:0];
    NSString* keyValue = [command.arguments objectAtIndex:1];
    int keyValueInteger = [keyValue intValue];

    [Countly.user min:keyName value:keyValueInteger];
    [Countly.user save];

    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"userData_saveMin!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)userData_setOnce:(CDVInvokedUrlCommand*)command
{
    NSString* keyName = [command.arguments objectAtIndex:0];
    NSString* keyValue = [command.arguments objectAtIndex:1];

    [Countly.user setOnce:keyName value:keyValue];
    [Countly.user save];

    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"userData_setOnce!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setOptionalParametersForInitialization:(CDVInvokedUrlCommand*)command
{
    NSString* city = [command.arguments objectAtIndex:0];
    NSString* country = [command.arguments objectAtIndex:1];

    NSString* latitudeString = [command.arguments objectAtIndex:2];
    NSString* longitudeString = [command.arguments objectAtIndex:3];

    double latitudeDouble = [latitudeString doubleValue];
    double longitudeDouble = [longitudeString doubleValue];

    if(config == nil){
        config = CountlyConfig.new;
    }

    config.ISOCountryCode = country;
    config.city = city;
    config.location = (CLLocationCoordinate2D){latitudeDouble,longitudeDouble};

    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"setOptionalParametersForInitialization!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)demo:(CDVInvokedUrlCommand*)command
{
    NSString* token = [command.arguments objectAtIndex:0];
    NSString* messagingMode = [command.arguments objectAtIndex:1];
    int mode = [messagingMode intValue];
    NSData *tokenByte = [token dataUsingEncoding:NSUTF8StringEncoding];
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"demo!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
