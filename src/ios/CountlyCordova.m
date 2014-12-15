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

@end