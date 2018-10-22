/********* Echo.h Cordova Plugin Header *******/

#import <Cordova/CDV.h>

@interface CountlyCordova : CDVPlugin

- (void)init:(CDVInvokedUrlCommand*)command;
- (void)event:(CDVInvokedUrlCommand*)command;
- (void)setloggingenabled:(CDVInvokedUrlCommand*)command;
- (void)setuserdata:(CDVInvokedUrlCommand*)command;
- (void)onregistrationid:(CDVInvokedUrlCommand*)command;
- (void)getDeviceIdentifier:(CDVInvokedUrlCommand*)command;
- (void)start:(CDVInvokedUrlCommand*)command;
- (void)stop:(CDVInvokedUrlCommand*)command;
- (void)recordView:(CDVInvokedUrlCommand*)command;
- (void)resume:(CDVInvokedUrlCommand*)command;
- (void)suspend:(CDVInvokedUrlCommand*)command;


- (void)setHttpPostForced:(CDVInvokedUrlCommand*)command;
- (void)setLocation:(CDVInvokedUrlCommand*)command;
- (void)enableCrashReporting:(CDVInvokedUrlCommand*)command;
- (void)addCrashLog:(CDVInvokedUrlCommand*)command;
- (void)logException:(CDVInvokedUrlCommand*)command;

- (void)changeDeviceId:(CDVInvokedUrlCommand*)command;
- (void)enableParameterTamperingProtection:(CDVInvokedUrlCommand*)command;
- (void)startEvent:(CDVInvokedUrlCommand*)command;
- (void)endEvent:(CDVInvokedUrlCommand*)command;

- (void)userData_setProperty:(CDVInvokedUrlCommand*)command;
- (void)userData_increment:(CDVInvokedUrlCommand*)command;
- (void)userData_incrementBy:(CDVInvokedUrlCommand*)command;
- (void)userData_multiply:(CDVInvokedUrlCommand*)command;
- (void)userData_saveMax:(CDVInvokedUrlCommand*)command;
- (void)userData_saveMin:(CDVInvokedUrlCommand*)command;
- (void)userData_setOnce:(CDVInvokedUrlCommand*)command;
- (void)setOptionalParametersForInitialization:(CDVInvokedUrlCommand*)command;
- (void)demo:(CDVInvokedUrlCommand*)command;

@end
