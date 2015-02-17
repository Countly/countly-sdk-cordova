/********* Echo.h Cordova Plugin Header *******/

#import <Cordova/CDV.h>

@interface CountlyCordova : CDVPlugin

- (void)echo:(CDVInvokedUrlCommand*)command;
- (void)init:(CDVInvokedUrlCommand*)command;
- (void)event:(CDVInvokedUrlCommand*)command;
- (void)setloggingenabled:(CDVInvokedUrlCommand*)command;
- (void)setuserdata:(CDVInvokedUrlCommand*)command;
- (void)onregistrationid:(CDVInvokedUrlCommand*)command;
- (void)start:(CDVInvokedUrlCommand*)command;
- (void)stop:(CDVInvokedUrlCommand*)command;
@end
