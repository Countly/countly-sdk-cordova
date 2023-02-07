/********* Countly.h Countly Plugin Implementation *******/

#import "CountlyCordova.h"
#import "Countly.h"
#import "CountlyConfig.h"
//#import "CountlyPushNotifications.h"
#import <Cordova/CDV.h>
//#import "CountlyCommon.h"
#import "CountlyNative.h"

CountlyNative *countlyNative = nil;

//@interface CountlyPushNotifications()
//- (void)sendToken;
//@property (nonatomic, strong) NSString* token;
//@end

@implementation CountlyCordova
- (void)init:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"init"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)isInitialized:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"isInitialized"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)recordEvent:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"recordEvent"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}
- (void)recordView:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"recordView"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}
- (void)setLoggingEnabled:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"setLoggingEnabled"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)setuserdata:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"setuserdata"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
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

- (void)start:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"start"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)stop:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"stop"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)halt:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"halt"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}
- (void)update:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"update"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
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

- (void)getCurrentDeviceId:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"getCurrentDeviceId"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)getDeviceIdAuthor:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"getDeviceIdAuthor"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)changeDeviceId:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"changeDeviceId"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)setHttpPostForced:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"setHttpPostForced"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)enableParameterTamperingProtection:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"enableParameterTamperingProtection"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)startEvent:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"startEvent"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)cancelEvent:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"cancelEvent"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)endEvent:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"endEvent"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)setLocationInit:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"setLocationInit"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)setLocation:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"setLocation"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)enableCrashReporting:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"enableCrashReporting"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)addCrashLog:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"addCrashLog"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)logException:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"logException"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)sendPushToken:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"sendPushToken"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)askForNotificationPermission:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"askForNotificationPermission"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}
- (void)registerForNotification:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"registerForNotification"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [pluginResult setKeepCallbackAsBool:YES];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}
- (void)pushTokenType:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"pushTokenType"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)userData_setProperty:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"userData_setProperty"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)userData_increment:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"userData_increment"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)userData_incrementBy:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"userData_incrementBy"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)userData_multiply:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"userData_multiply"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)userData_saveMax:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"userData_saveMax"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)userData_saveMin:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"userData_saveMin"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)userData_setOnce:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"userData_setOnce"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)userData_pushUniqueValue:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"userData_pushUniqueValue"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)userData_pushValue:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"userData_pushValue"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)userData_pullValue:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"userData_pullValue"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)setRequiresConsent:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"setRequiresConsent"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)giveConsentInit:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"giveConsentInit"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)giveConsent:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"giveConsent"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)removeConsent:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"removeConsent"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)giveAllConsent:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"giveAllConsent"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)removeAllConsent:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"removeAllConsent"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)setOptionalParametersForInitialization:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"setOptionalParametersForInitialization"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)setRemoteConfigAutomaticDownload:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"setRemoteConfigAutomaticDownload"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}
- (void)remoteConfigUpdate:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"remoteConfigUpdate"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}
- (void)updateRemoteConfigForKeysOnly:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"updateRemoteConfigForKeysOnly"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}
- (void)updateRemoteConfigExceptKeys:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"updateRemoteConfigExceptKeys"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}
- (void)remoteConfigClearValues:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"remoteConfigClearValues"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}
- (void)getRemoteConfigValueForKey:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"getRemoteConfigValueForKey"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}
- (void)askForFeedback:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"askForFeedback"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)setStarRatingDialogTexts:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"setStarRatingDialogTexts"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)askForStarRating:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"askForStarRating"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)getFeedbackWidgets:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"getFeedbackWidgets"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)presentFeedbackWidget:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"presentFeedbackWidget"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)replaceAllAppKeysInQueueWithCurrentAppKey:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"replaceAllAppKeysInQueueWithCurrentAppKey"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)removeDifferentAppKeysFromQueue:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"removeDifferentAppKeysFromQueue"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)enableAttribution:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"enableAttribution"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)recordAttributionID:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"recordAttributionID"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)startTrace:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"startTrace"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)cancelTrace:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"cancelTrace"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)clearAllTraces:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"clearAllTraces"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)endTrace:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"endTrace"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)recordNetworkTrace:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"recordNetworkTrace"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)enableApm:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"enableApm"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

- (void)appLoadingFinished:(CDVInvokedUrlCommand *)command {
    if (countlyNative == nil) {
        countlyNative = CountlyNative.new;
    }
    [countlyNative onCall:@"appLoadingFinished"
            commandString:command.arguments
                 callback:^(NSString *theResult) {
                   CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:theResult];
                   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
                 }];
}

@end
