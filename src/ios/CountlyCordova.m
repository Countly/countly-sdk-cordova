/********* Echo.m Cordova Plugin Implementation *******/

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
    NSString* myresult = @"ok";
    
    if (serverurl != nil && [serverurl length] > 0) {
        [[Countly sharedInstance] start:appkey withHost:serverurl];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:myresult];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)event:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* key = [command.arguments objectAtIndex:0];
    NSString* countString = [command.arguments objectAtIndex:1];
    int countInt = [countString intValue];
    if (key != nil && [key length] > 0) {
        
        [[Countly sharedInstance] recordEvent:key count:countInt];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"ok"];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end