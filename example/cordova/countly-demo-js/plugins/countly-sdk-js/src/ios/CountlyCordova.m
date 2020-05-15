/********* Countly.h Countly Plugin Implementation *******/

#import "Countly.h"
#import "CountlyCordova.h"
#import "CountlyConfig.h"
//#import "CountlyPushNotifications.h"
#import <Cordova/CDV.h>
//#import "CountlyCommon.h"
#import "CountlyNative.h"

CountlyNative* countlyNative = nil;

//@interface CountlyPushNotifications()
//- (void)sendToken;
//@property (nonatomic, strong) NSString* token;
//@end

@implementation CountlyCordova
- (void)init:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"init" commandString: command.arguments callback: ^(NSString * theResult)
     {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)recordEvent:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"recordEvent" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}
- (void)recordView:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"recordView" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}
- (void)setloggingenabled:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"setloggingenabled" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)setuserdata:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"setuserdata" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

// - (void)getDeviceID:(CDVInvokedUrlCommand*)command
// {
//     if(countlyNative == nil){
//         countlyNative = CountlyNative.new;
//     }
//     [countlyNative onCall: @"getDeviceID" commandString: command.arguments callback: ^(NSString * theResult)
//      {
//          CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
//          [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
//      }];
// }


// - (void)sendRating:(CDVInvokedUrlCommand*)command
// {
//     if(countlyNative == nil){
//         countlyNative = CountlyNative.new;
//     }
//     [countlyNative onCall: @"sendRating" commandString: command.arguments callback: ^(NSString * theResult)
//      {
//          CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
//          [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
//      }];
// }

- (void)start:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"start" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}


- (void)stop:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"stop" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}


- (void)halt:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"halt" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}
- (void)update:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"update" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

// - (void)manualSessionHandling:(CDVInvokedUrlCommand*)command
// {
//     if(countlyNative == nil){
//         countlyNative = CountlyNative.new;
//     }
//     [countlyNative onCall: @"manualSessionHandling" commandString: command.arguments callback: ^(NSString * theResult)
//      {
//          CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
//          [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
//      }];
// }


// - (void)updateSessionPeriod:(CDVInvokedUrlCommand*)command
// {
//     if(countlyNative == nil){
//         countlyNative = CountlyNative.new;
//     }
//     [countlyNative onCall: @"updateSessionPeriod" commandString: command.arguments callback: ^(NSString * theResult)
//      {
//          CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
//          [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
//      }];
// }

// - (void)eventSendThreshold:(CDVInvokedUrlCommand*)command
// {
//     if(countlyNative == nil){
//         countlyNative = CountlyNative.new;
//     }
//     [countlyNative onCall: @"eventSendThreshold" commandString: command.arguments callback: ^(NSString * theResult)
//      {
//          CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
//          [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
//      }];
// }

// - (void)storedRequestsLimit:(CDVInvokedUrlCommand*)command
// {
//     if(countlyNative == nil){
//         countlyNative = CountlyNative.new;
//     }
//     [countlyNative onCall: @"storedRequestsLimit" commandString: command.arguments callback: ^(NSString * theResult)
//      {
//          CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
//          [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
//      }];
// }

- (void)changeDeviceId:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"changeDeviceId" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)setHttpPostForced:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"setHttpPostForced" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)enableParameterTamperingProtection:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"enableParameterTamperingProtection" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)startEvent:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"startEvent" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)cancelEvent:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"cancelEvent" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)endEvent:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"endEvent" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)setLocation:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"setLocation" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)enableCrashReporting:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"enableCrashReporting" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)addCrashLog:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"addCrashLog" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)logException:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"logException" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)sendPushToken:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"sendPushToken" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)askForNotificationPermission:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"askForNotificationPermission" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)pushTokenType:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"pushTokenType" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)userData_setProperty:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"userData_setProperty" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)userData_increment:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"userData_increment" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)userData_incrementBy:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"userData_incrementBy" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)userData_multiply:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"userData_multiply" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)userData_saveMax:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"userData_saveMax" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)userData_saveMin:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"userData_saveMin" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)userData_setOnce:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"userData_setOnce" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)userData_pushUniqueValue:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"userData_pushUniqueValue" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)userData_pushValue:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"userData_pushValue" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)userData_pullValue:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"userData_pullValue" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)setRequiresConsent:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"setRequiresConsent" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)giveConsent:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"giveConsent" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)removeConsent:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"removeConsent" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)giveAllConsent:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"giveAllConsent" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)removeAllConsent:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"removeAllConsent" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)setOptionalParametersForInitialization:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"setOptionalParametersForInitialization" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)setRemoteConfigAutomaticDownload:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"setRemoteConfigAutomaticDownload" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}
- (void)remoteConfigUpdate:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"remoteConfigUpdate" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}
- (void)updateRemoteConfigForKeysOnly:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"updateRemoteConfigForKeysOnly" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}
- (void)updateRemoteConfigExceptKeys:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"updateRemoteConfigExceptKeys" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}
- (void)remoteConfigClearValues:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"remoteConfigClearValues" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}
- (void)getRemoteConfigValueForKey:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"getRemoteConfigValueForKey" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}
- (void)askForFeedback:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"askForFeedback" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}

- (void)askForStarRating:(CDVInvokedUrlCommand*)command
{
    if(countlyNative == nil){
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall: @"askForStarRating" commandString: command.arguments callback: ^(NSString * theResult)
     {
         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: theResult];
         [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
     }];
}


@end
