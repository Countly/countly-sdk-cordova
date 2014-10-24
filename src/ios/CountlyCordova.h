/********* Echo.h Cordova Plugin Header *******/

#import <Cordova/CDV.h>

@interface CountlyCordova : CDVPlugin

- (void)echo:(CDVInvokedUrlCommand*)command;
- (void)init:(CDVInvokedUrlCommand*)command;
- (void)event:(CDVInvokedUrlCommand*)command;

@end
