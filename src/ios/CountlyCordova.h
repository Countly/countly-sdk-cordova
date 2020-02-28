#import <Cordova/CDV.h>

@interface CountlyCordova : CDVPlugin

- (void)init:(CDVInvokedUrlCommand*)command;
- (void)event:(CDVInvokedUrlCommand*)command;
- (void)recordEvent:(CDVInvokedUrlCommand*)command;
- (void)setloggingenabled:(CDVInvokedUrlCommand*)command;
- (void)setuserdata:(CDVInvokedUrlCommand*)command;
// - (void)getDeviceID:(CDVInvokedUrlCommand*)command;
- (void)sendRating:(CDVInvokedUrlCommand*)command;
- (void)start:(CDVInvokedUrlCommand*)command;
- (void)update:(CDVInvokedUrlCommand*)command;
- (void)manualSessionHandling:(CDVInvokedUrlCommand*)command;
- (void)stop:(CDVInvokedUrlCommand*)command;
- (void)updateSessionPeriod:(CDVInvokedUrlCommand*)command;
- (void)eventSendThreshold:(CDVInvokedUrlCommand*)command;
- (void)storedRequestsLimit:(CDVInvokedUrlCommand*)command;
- (void)recordView:(CDVInvokedUrlCommand*)command;
- (void)resume:(CDVInvokedUrlCommand*)command;
- (void)suspend:(CDVInvokedUrlCommand*)command;


- (void)setHttpPostForced:(CDVInvokedUrlCommand*)command;
- (void)setLocation:(CDVInvokedUrlCommand*)command;
- (void)enableCrashReporting:(CDVInvokedUrlCommand*)command;
- (void)addCrashLog:(CDVInvokedUrlCommand*)command;
- (void)logException:(CDVInvokedUrlCommand*)command;
- (void)sendPushToken:(CDVInvokedUrlCommand*)command;
//- (void)askForNotificationPermission:(CDVInvokedUrlCommand*)command;
//- (void)pushTokenType:(CDVInvokedUrlCommand*)command;

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
- (void)userData_pushUniqueValue:(CDVInvokedUrlCommand*)command;
- (void)userData_pushValue:(CDVInvokedUrlCommand*)command;
- (void)userData_pullValue:(CDVInvokedUrlCommand*)command;
- (void)setOptionalParametersForInitialization:(CDVInvokedUrlCommand*)command;

// - (void)setRequiresConsent:(CDVInvokedUrlCommand*)command;
// - (void)giveConsent:(CDVInvokedUrlCommand*)command;
// - (void)removeConsent:(CDVInvokedUrlCommand*)command;
// - (void)giveAllConsent:(CDVInvokedUrlCommand*)command;
// - (void)removeAllConsent:(CDVInvokedUrlCommand*)command;

- (void)setRemoteConfigAutomaticDownload:(CDVInvokedUrlCommand*)command;
- (void)remoteConfigUpdate:(CDVInvokedUrlCommand*)command;
- (void)updateRemoteConfigForKeysOnly:(CDVInvokedUrlCommand*)command;
- (void)updateRemoteConfigExceptKeys:(CDVInvokedUrlCommand*)command;
- (void)remoteConfigClearValues:(CDVInvokedUrlCommand*)command;
- (void)getRemoteConfigValueForKey:(CDVInvokedUrlCommand*)command;
- (void)askForFeedback:(CDVInvokedUrlCommand*)command;
- (void)askForStarRating:(CDVInvokedUrlCommand*)command;

@end
