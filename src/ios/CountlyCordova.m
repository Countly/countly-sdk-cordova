/********* Countly.h Countly Plugin Implementation *******/

#import "Countly.h"
#import "CountlyCordova.h"
#import <Cordova/CDV.h>

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
    
    if (serverurl != nil && [serverurl length] > 0) {
        [[Countly sharedInstance] start:appkey withHost:serverurl];
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
    //NSInteger byearint = [byear intValue];
        [Countly.sharedInstance recordUserDetails: @{
                                                    kCLYUserName: name,
                                                    kCLYUserEmail: email,
                                                    kCLYUserBirthYear: byear,
                                                    kCLYUserGender: gender,
                                                    kCLYUserOrganization: org,
                                                    kCLYUserPhone: phone,
                                                    kCLYUserUsername: username,
                                                    kCLYUserPicture: picture
                                                                 }];
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
    [Countly.sharedInstance didRegisterForRemoteNotificationsWithDeviceToken:tokenByte];
    
    // [[CountlyConnectionQueue sharedInstance] tokenSession:token];
    
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"onregistrationid!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)start:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"start!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)stop:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"stop!"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end