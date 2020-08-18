#import "CountlyNative.h"
#import "Countly.h"
#import "CountlyConfig.h"
#import <objc/runtime.h>


static char launchNotificationKey;
static char coldstartKey;
Result notificationListener = nil;
NSDictionary *lastStoredNotification = nil;
NSMutableArray *notificationIDs = nil;        // alloc here

NSString *const pushPluginApplicationDidBecomeActiveNotification = @"pushPluginApplicationDidBecomeActiveNotification";
@implementation AppDelegate (notification)
- (NSMutableArray *)launchNotification
{
    return objc_getAssociatedObject(self, &launchNotificationKey);
}

- (void)setLaunchNotification:(NSDictionary *)aDictionary
{
    objc_setAssociatedObject(self, &launchNotificationKey, aDictionary, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (NSNumber *)coldstart
{
    return objc_getAssociatedObject(self, &coldstartKey);
}

- (void)setColdstart:(NSNumber *)aNumber
{
    objc_setAssociatedObject(self, &coldstartKey, aNumber, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (void)dealloc
{
    self.launchNotification = nil; // clear the association and release the object
    self.coldstart = nil;
}

- (id) getCommandInstance:(NSString*)className
{
    return [self.viewController getCommandInstance:className];
}

// its dangerous to override a method from within a category.
// Instead we will use method swizzling. we set this up in the load call.
+ (void)load
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Class class = [self class];

        SEL originalSelector = @selector(init);
        SEL swizzledSelector = @selector(pushPluginSwizzledInit);

        Method original = class_getInstanceMethod(class, originalSelector);
        Method swizzled = class_getInstanceMethod(class, swizzledSelector);

        BOOL didAddMethod =
        class_addMethod(class,
                        originalSelector,
                        method_getImplementation(swizzled),
                        method_getTypeEncoding(swizzled));

        if (didAddMethod) {
            class_replaceMethod(class,
                                swizzledSelector,
                                method_getImplementation(original),
                                method_getTypeEncoding(original));
        } else {
            method_exchangeImplementations(original, swizzled);
        }
    });
}

- (AppDelegate *)pushPluginSwizzledInit
{
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    center.delegate = self;

    [[NSNotificationCenter defaultCenter]addObserver:self
                                            selector:@selector(pushPluginOnApplicationDidBecomeActive:)
                                                name:UIApplicationDidBecomeActiveNotification
                                              object:nil];

    // This actually calls the original init method over in AppDelegate. Equivilent to calling super
    // on an overrided method, this is not recursive, although it appears that way. neat huh?
    return [self pushPluginSwizzledInit];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
    NSLog(@"didReceiveNotification with fetchCompletionHandler");

    // app is in the background or inactive, so only call notification callback if this is a silent push
    if (application.applicationState != UIApplicationStateActive) {

        NSLog(@"app in-active");

        // do some convoluted logic to find out if this should be a silent push.
        long silent = 0;
        id aps = [userInfo objectForKey:@"aps"];
        id contentAvailable = [aps objectForKey:@"content-available"];
        if ([contentAvailable isKindOfClass:[NSString class]] && [contentAvailable isEqualToString:@"1"]) {
            silent = 1;
        } else if ([contentAvailable isKindOfClass:[NSNumber class]]) {
            silent = [contentAvailable integerValue];
        }

        if (silent == 1) {
            NSLog(@"this should be a silent push");
            [CountlyNative onNotification:userInfo];
            completionHandler(UIBackgroundFetchResultNewData);
        } else {
            NSLog(@"just put it in the shade");
            //save it for later
            self.launchNotification = userInfo;
            completionHandler(UIBackgroundFetchResultNewData);
        }

    } else {
        completionHandler(UIBackgroundFetchResultNoData);
    }
}
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
    NSLog( @"NotificationCenter Handle push from foreground" );
    // custom code to handle push while app is in the foreground
    [CountlyNative onNotification: notification.request.content.userInfo];

    completionHandler(UNNotificationPresentationOptionNone);
}
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void(^)(void))completionHandler
{
    NSLog(@"Push Plugin didReceiveNotificationResponse: actionIdentifier %@, notification: %@", response.actionIdentifier,
          response.notification.request.content.userInfo);
    NSMutableDictionary *userInfo = [response.notification.request.content.userInfo mutableCopy];
    [userInfo setObject:response.actionIdentifier forKey:@"actionCallback"];
    NSLog(@"Push Plugin userInfo %@", userInfo);
    switch ([UIApplication sharedApplication].applicationState) {
        case UIApplicationStateActive:
        {
            NSLog(@"UIApplicationStateActive");
            [CountlyNative onNotification: response.notification.request.content.userInfo];
            if(notificationListener != nil){
                completionHandler();
            }
            break;
        }
        case UIApplicationStateInactive:
        {
            NSLog(@"UIApplicationStateInactive");
            self.launchNotification = response.notification.request.content.userInfo;
            self.coldstart = [NSNumber numberWithBool:YES];
            break;
        }
        case UIApplicationStateBackground:
        {
            NSLog(@"UIApplicationStateBackground");
            void (^safeHandler)(void) = ^(void){
                dispatch_async(dispatch_get_main_queue(), ^{
                    completionHandler();
                });
            };
            [CountlyNative onNotification: response.notification.request.content.userInfo];
            if(notificationListener != nil){
                completionHandler();
            }
        }
    }
}
- (void)pushPluginOnApplicationDidBecomeActive:(NSNotification *)notification {

    NSLog(@"active");
    
    NSString *firstLaunchKey = @"firstLaunchKey";
    NSUserDefaults *defaults = [[NSUserDefaults alloc] initWithSuiteName:@"phonegap-plugin-push"];
    if (![defaults boolForKey:firstLaunchKey]) {
        NSLog(@"application first launch: remove badge icon number");
        [defaults setBool:YES forKey:firstLaunchKey];
        [[UIApplication sharedApplication] setApplicationIconBadgeNumber:0];
    }
    NSLog(@"pushPluginOnApplicationDidBecomeActive: %@", self.launchNotification);
    [CountlyNative onNotification: self.launchNotification];
    [[NSNotificationCenter defaultCenter] postNotificationName:pushPluginApplicationDidBecomeActiveNotification object:nil];
}
@end



@interface CountlyNative ()
{
}
@end

@implementation CountlyNative

    CountlyConfig* config = nil;
    Boolean isDebug = false;

+ (void)onNotification: (NSDictionary *) notificationMessage{
    NSLog(@"Notification received");
    NSLog(@"The notification %@", notificationMessage);
    if(notificationMessage && notificationListener != nil){
        notificationListener([NSString stringWithFormat:@"%@",notificationMessage]);
    }else{
        lastStoredNotification = notificationMessage;
    }
    if(notificationMessage){
        if(notificationIDs == nil){
            notificationIDs = [[NSMutableArray alloc] init];
        }
        NSDictionary* countlyPayload = notificationMessage[@"c"];
        NSString *notificationID = countlyPayload[@"i"];
        [notificationIDs insertObject:notificationID atIndex:[notificationIDs count]];
    }
}
- (void)recordPushAction
{
    for(int i=0,il = (int) notificationIDs.count;i<il;i++){
        NSString *notificationID = notificationIDs[i];
        NSDictionary* segmentation =
        @{
            @"i": notificationID,
            @"b": @(0)
        };
        [Countly.sharedInstance recordEvent:@"[CLY]_push_action" segmentation: segmentation];
    }
    notificationIDs = nil;
}

- (void) onCall:(NSString *)method commandString:(NSArray *)command callback:(Result) result{
    if(isDebug == true){
        NSLog(@"Countly Native method : %@", method);
        NSLog(@"Countly Native arguments : %@", command);
    }

    if(config == nil){
        config = CountlyConfig.new;
    }

    if([@"init" isEqualToString:method]){

        NSString* serverurl = [command  objectAtIndex:0];
        NSString* appkey = [command objectAtIndex:1];
        NSString* deviceID = @"";

        config.appKey = appkey;
        config.host = serverurl;
        Countly.sharedInstance.isAutoViewTrackingActive = NO;
        config.features = @[CLYCrashReporting, CLYPushNotifications];

        if(command.count == 3){
            deviceID = [command objectAtIndex:2];
            config.deviceID = deviceID;
        }

        if (serverurl != nil && [serverurl length] > 0) {
            [[Countly sharedInstance] startWithConfig:config];
            [self recordPushAction];
            result(@"initialized.");
        } else {
            result(@"initialization failed!");
        }
    }else if ([@"recordEvent" isEqualToString:method]) {
        NSString* key = [command objectAtIndex:0];
        NSString* countString = [command objectAtIndex:1];
        int count = [countString intValue];
        NSString* sumString = [command objectAtIndex:2];
        float sum = [sumString floatValue];
        NSString* durationString = [command objectAtIndex:3];
        int duration = [durationString intValue];
        NSMutableDictionary *segmentation = [[NSMutableDictionary alloc] init];

        if((int)command.count > 4){
            for(int i=4,il=(int)command.count;i<il;i+=2){
                segmentation[[command objectAtIndex:i]] = [command objectAtIndex:i+1];
            }
        }
        [[Countly sharedInstance] recordEvent:key segmentation:segmentation count:count  sum:sum duration:duration];
        NSString *resultString = @"recordEvent for: ";
        resultString = [resultString stringByAppendingString: key];
        result(resultString);
    }else if ([@"recordView" isEqualToString:method]) {
        NSString* recordView = [command objectAtIndex:0];
        [Countly.sharedInstance recordView:recordView];
        result(@"recordView Sent!");
    }else if ([@"setLoggingEnabled" isEqualToString:method]) {
        NSString* loggingEnable = [command objectAtIndex:0];
        if([@"true" isEqualToString:loggingEnable]){
            isDebug = true;
            config.enableDebug = YES;
        }else{
            isDebug = false;
            config.enableDebug = NO;
        }
        result(@"setLoggingEnabled!");
    }else if ([@"setuserdata" isEqualToString:method]) {
        NSString* name = [command objectAtIndex:0];
        NSString* username = [command objectAtIndex:1];
        NSString* email = [command objectAtIndex:2];
        NSString* organization = [command objectAtIndex:3];
        NSString* phone = [command objectAtIndex:4];
        NSString* picture = [command objectAtIndex:5];
        //NSString* picturePath = [command objectAtIndex:6];
        NSString* gender = [command objectAtIndex:7];
        NSString* byear = [command objectAtIndex:8];

        Countly.user.name = name;
        Countly.user.username = username;
        Countly.user.email = email;
        Countly.user.organization = organization;
        Countly.user.phone = phone;
        Countly.user.pictureURL = picture;
        Countly.user.gender = gender;
        Countly.user.birthYear = @([byear integerValue]);

        [Countly.user save];
        result(@"setuserdata!");

    }else if ([@"getDeviceID" isEqualToString:method]) {
        NSString* deviceID = Countly.sharedInstance.deviceID;
        result([NSString stringWithFormat:@"%@", deviceID]);
    }else if ([@"start" isEqualToString:method]) {
        [Countly.sharedInstance beginSession];
        result(@"start!");

    }else if ([@"stop" isEqualToString:method]) {
        [Countly.sharedInstance endSession];
        result(@"stop!");
    }else if ([@"halt" isEqualToString:method]) { // This method is not implemented in iOS SDK
        // [Countly.sharedInstance endSession];
        result(@"No implemntation for halt!");
    }else if ([@"update" isEqualToString:method]) {
        [Countly.sharedInstance updateSession];
        result(@"update!");
    }else if ([@"changeDeviceId" isEqualToString:method]) {
        NSString* newDeviceID = [command objectAtIndex:0];
        NSString* onServerString = [command objectAtIndex:1];

        if ([onServerString  isEqual: @"1"]) {
            [Countly.sharedInstance setNewDeviceID:newDeviceID onServer: YES];
        }else{
            [Countly.sharedInstance setNewDeviceID:newDeviceID onServer: NO];
        }

        result(@"changeDeviceId!");

    }else if ([@"setHttpPostForced" isEqualToString:method]) {
        NSString* isEnabled = [command objectAtIndex:0];
        if ([isEnabled  isEqual: @"1"]) {
            config.alwaysUsePOST = YES;
        }else{
            config.alwaysUsePOST = NO;
        }

        // config.alwaysUsePOST = YES;
        result(@"setHttpPostForced!");

    }else if ([@"enableParameterTamperingProtection" isEqualToString:method]) {
        NSString* salt = [command objectAtIndex:0];
        config.secretSalt = salt;
        result(@"enableParameterTamperingProtection!");

    }else if ([@"startEvent" isEqualToString:method]) {
        NSString* eventName = [command objectAtIndex:0];
        [Countly.sharedInstance startEvent:eventName];
        result(@"startEvent!");

    }else if ([@"cancelEvent" isEqualToString:method]) {
        NSString* eventName = [command objectAtIndex:0];
        [Countly.sharedInstance cancelEvent:eventName];
        result(@"cancelEvent!");

    }else if ([@"endEvent" isEqualToString:method]) {

        NSString* key = [command objectAtIndex:0];
        NSString* countString = [command objectAtIndex:1];
        int count = [countString intValue];
        NSString* sumString = [command objectAtIndex:2];
        float sum = [sumString floatValue];
        NSMutableDictionary *segmentation = [[NSMutableDictionary alloc] init];

        if((int)command.count > 3){
            for(int i=3,il=(int)command.count;i<il;i+=2){
                segmentation[[command objectAtIndex:i]] = [command objectAtIndex:i+1];
            }
        }
        [[Countly sharedInstance] endEvent:key segmentation:segmentation count:count  sum:sum];
        NSString *resultString = @"endEvent for: ";
        resultString = [resultString stringByAppendingString: key];
        result(resultString);
    }else if ([@"setLocation" isEqualToString:method]) {
        NSString* latitudeString = [command objectAtIndex:0];
        NSString* longitudeString = [command objectAtIndex:1];

        double latitudeDouble = [latitudeString doubleValue];
        double longitudeDouble = [longitudeString doubleValue];

        config.location = (CLLocationCoordinate2D){latitudeDouble,longitudeDouble};

        result(@"setLocation!");

    }else if ([@"enableCrashReporting" isEqualToString:method]) {
        // config.features = @[CLYCrashReporting];
        result(@"enableCrashReporting!");

    }else if ([@"addCrashLog" isEqualToString:method]) {
        NSString* record = [command objectAtIndex:0];
        [Countly.sharedInstance recordCrashLog: record];
        result(@"addCrashLog!");

    }else if ([@"logException" isEqualToString:method]) {
        NSString* execption = [command objectAtIndex:0];
        NSString* nonfatal = [command objectAtIndex:1];
        NSArray *nsException = [execption componentsSeparatedByString:@"\n"];

        NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];

        for(int i=2,il=(int)command.count;i<il;i+=2){
            dict[[command objectAtIndex:i]] = [command objectAtIndex:i+1];
        }
        [dict setObject:nonfatal forKey:@"nonfatal"];

        NSException* myException = [NSException exceptionWithName:@"Exception" reason:execption userInfo:dict];

        [Countly.sharedInstance recordHandledException:myException withStackTrace: nsException];
        result(@"logException!");

    }else if ([@"sendPushToken" isEqualToString:method]) {
        if(config != nil){
            NSString* token = [command objectAtIndex:0];
            int messagingMode = [[command objectAtIndex:1] intValue];
            NSString *urlString = [ @"" stringByAppendingFormat:@"%@?device_id=%@&app_key=%@&token_session=1&test_mode=%d&ios_token=%@", config.host, [Countly.sharedInstance deviceID], config.appKey, messagingMode, token];
            NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
            [request setHTTPMethod:@"GET"];
            [request setURL:[NSURL URLWithString:urlString]];
        }
        result(@"sendPushToken!");

    }else if ([@"askForNotificationPermission" isEqualToString:method]) {
        dispatch_async(dispatch_get_main_queue(), ^ {
            [Countly.sharedInstance askForNotificationPermission];
            result(@"askForNotificationPermission!");
        });
    }else if ([@"registerForNotification" isEqualToString:method]) {
        NSLog(@"Countly Native: registerForNotification");
        notificationListener = result;
        if(lastStoredNotification != nil){
            result([lastStoredNotification description]);
            lastStoredNotification = nil;
        }
    }else if ([@"pushTokenType" isEqualToString:method]) {
        NSString* tokenType = [command objectAtIndex:0];
        if([tokenType isEqualToString: @"1"]){
            config.pushTestMode = @"CLYPushTestModeDevelopment";
        }
        else if([tokenType isEqualToString: @"2"]){
            config.pushTestMode = @"CLYPushTestModeTestFlightOrAdHoc";
        }else{
        }
        result(@"pushTokenType!");
    }else if ([@"userData_setProperty" isEqualToString:method]) {
        NSString* keyName = [command objectAtIndex:0];
        NSString* keyValue = [command objectAtIndex:1];

        [Countly.user set:keyName value:keyValue];
        [Countly.user save];

        result(@"userData_setProperty!");

    }else if ([@"userData_increment" isEqualToString:method]) {
        NSString* keyName = [command objectAtIndex:0];

        [Countly.user increment:keyName];
        [Countly.user save];

        result(@"userData_increment!");

    }else if ([@"userData_incrementBy" isEqualToString:method]) {
        NSString* keyName = [command objectAtIndex:0];
        NSString* keyValue = [command objectAtIndex:1];
        int keyValueInteger = [keyValue intValue];

        [Countly.user incrementBy:keyName value:[NSNumber numberWithInt:keyValueInteger]];
        [Countly.user save];

        result(@"userData_incrementBy!");

    }else if ([@"userData_multiply" isEqualToString:method]) {
        NSString* keyName = [command objectAtIndex:0];
        NSString* keyValue = [command objectAtIndex:1];
        int keyValueInteger = [keyValue intValue];

        [Countly.user multiply:keyName value:[NSNumber numberWithInt:keyValueInteger]];
        [Countly.user save];

        result(@"userData_multiply!");

    }else if ([@"userData_saveMax" isEqualToString:method]) {
        NSString* keyName = [command objectAtIndex:0];
        NSString* keyValue = [command objectAtIndex:1];
        int  keyValueInteger = [keyValue intValue];

        [Countly.user max:keyName value:[NSNumber numberWithInt:keyValueInteger]];
        [Countly.user save];
        result(@"userData_saveMax!");

    }else if ([@"userData_saveMin" isEqualToString:method]) {
        NSString* keyName = [command objectAtIndex:0];
        NSString* keyValue = [command objectAtIndex:1];
        int keyValueInteger = [keyValue intValue];

        [Countly.user min:keyName value:[NSNumber numberWithInt:keyValueInteger]];
        [Countly.user save];

        result(@"userData_saveMin!");

    }else if ([@"userData_setOnce" isEqualToString:method]) {
        NSString* keyName = [command objectAtIndex:0];
        NSString* keyValue = [command objectAtIndex:1];

        [Countly.user setOnce:keyName value:keyValue];
        [Countly.user save];

        result(@"userData_setOnce!");

    }else if ([@"userData_pushUniqueValue" isEqualToString:method]) {
        NSString* type = [command objectAtIndex:0];
        NSString* pushUniqueValueString = [command objectAtIndex:1];

        [Countly.user pushUnique:type value:pushUniqueValueString];
        [Countly.user save];

        result(@"userData_pushUniqueValue!");

    }else if ([@"userData_pushValue" isEqualToString:method]) {
        NSString* type = [command objectAtIndex:0];
        NSString* pushValue = [command objectAtIndex:1];

        [Countly.user push:type value:pushValue];
        [Countly.user save];

        result(@"userData_pushValue!");

    }else if ([@"userData_pullValue" isEqualToString:method]) {
        NSString* type = [command objectAtIndex:0];
        NSString* pullValue = [command objectAtIndex:1];

        [Countly.user pull:type value:pullValue];
        [Countly.user save];

        result(@"userData_pullValue!");

        //setRequiresConsent
    }else if ([@"setRequiresConsent" isEqualToString:method]) {
        BOOL consentFlag = [[command objectAtIndex:0] boolValue];
        config.requiresConsent = consentFlag;
        result(@"setRequiresConsent!");

    }else if ([@"giveConsent" isEqualToString:method]) {
        NSString* consent = @"";
        // NSMutableDictionary *giveConsentAll = [[NSMutableDictionary alloc] init];
        for(int i=0,il=(int)command.count; i<il;i++){
            consent = [command objectAtIndex:i];
            if([@"sessions" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentSessions];
            }
            if([@"events" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentEvents];
            }
            if([@"views" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentViewTracking];
            }
            if([@"location" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentLocation];
            }
            if([@"crashes" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentCrashReporting];
            }
            if([@"attribution" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentAttribution];
            }
            if([@"users" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentUserDetails];
            }
            if([@"push" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentPushNotifications];
            }
            if([@"star-rating" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentStarRating];
            }
            if([@"accessory-devices" isEqualToString:consent]){
                [Countly.sharedInstance giveConsentForFeature:CLYConsentAppleWatch];
            }
        }


        NSString *resultString = @"giveConsent for: ";
        result(@"giveConsent!");

    }else if ([@"removeConsent" isEqualToString:method]) {
        NSString* consent = @"";
        //        NSMutableDictionary *removeConsent = [[NSMutableDictionary alloc] init];
        for(int i=0,il=(int)command.count; i<il;i++){
            consent = [command objectAtIndex:i];
            if([@"sessions" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentSessions];
            }
            if([@"events" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentEvents];
            }
            if([@"views" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentViewTracking];
            }
            if([@"location" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentLocation];
            }
            if([@"crashes" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentCrashReporting];
            }
            if([@"attribution" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentAttribution];
            }
            if([@"users" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentUserDetails];
            }
            if([@"push" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentPushNotifications];
            }
            if([@"star-rating" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentStarRating];
            }
            if([@"accessory-devices" isEqualToString:consent]){
                [Countly.sharedInstance cancelConsentForFeature:CLYConsentAppleWatch];
            }
        }

        NSString *resultString = @"removeConsent for: ";
        result(@"removeConsent!");

    }else if ([@"giveAllConsent" isEqualToString:method]) {
        [Countly.sharedInstance giveConsentForFeature:CLYConsentSessions];
        [Countly.sharedInstance giveConsentForFeature:CLYConsentEvents];
        [Countly.sharedInstance giveConsentForFeature:CLYConsentUserDetails];
        [Countly.sharedInstance giveConsentForFeature:CLYConsentCrashReporting];
        [Countly.sharedInstance giveConsentForFeature:CLYConsentPushNotifications];
        [Countly.sharedInstance giveConsentForFeature:CLYConsentLocation];
        [Countly.sharedInstance giveConsentForFeature:CLYConsentViewTracking];
        [Countly.sharedInstance giveConsentForFeature:CLYConsentAttribution];
        [Countly.sharedInstance giveConsentForFeature:CLYConsentStarRating];
        [Countly.sharedInstance giveConsentForFeature:CLYConsentAppleWatch];

        result(@"giveAllConsent!");

    }else if ([@"removeAllConsent" isEqualToString:method]) {
        [Countly.sharedInstance cancelConsentForFeature:CLYConsentSessions];
        [Countly.sharedInstance cancelConsentForFeature:CLYConsentEvents];
        [Countly.sharedInstance cancelConsentForFeature:CLYConsentUserDetails];
        [Countly.sharedInstance cancelConsentForFeature:CLYConsentCrashReporting];
        [Countly.sharedInstance cancelConsentForFeature:CLYConsentPushNotifications];
        [Countly.sharedInstance cancelConsentForFeature:CLYConsentLocation];
        [Countly.sharedInstance cancelConsentForFeature:CLYConsentViewTracking];
        [Countly.sharedInstance cancelConsentForFeature:CLYConsentAttribution];
        [Countly.sharedInstance cancelConsentForFeature:CLYConsentStarRating];
        [Countly.sharedInstance cancelConsentForFeature:CLYConsentAppleWatch];
        result(@"removeAllConsent!");

    }else if ([@"setOptionalParametersForInitialization" isEqualToString:method]) {
        NSString* city = [command objectAtIndex:0];
        NSString* country = [command objectAtIndex:1];

        NSString* latitudeString = [command objectAtIndex:2];
        NSString* longitudeString = [command objectAtIndex:3];
        NSString* ipAddress = [command objectAtIndex:3];

        double latitudeDouble = [latitudeString doubleValue];
        double longitudeDouble = [longitudeString doubleValue];

        [Countly.sharedInstance recordLocation:(CLLocationCoordinate2D){latitudeDouble,longitudeDouble}];
        [Countly.sharedInstance recordCity:city andISOCountryCode:country];
        [Countly.sharedInstance recordIP:ipAddress];
        result(@"setOptionalParametersForInitialization!");

    }else if ([@"setRemoteConfigAutomaticDownload" isEqualToString:method]) {
        config.enableRemoteConfig = YES;
        config.remoteConfigCompletionHandler = ^(NSError * error)
        {
            if (!error){
                result(@"Success!");
            } else {
                result([@"Error :" stringByAppendingString: error.localizedDescription]);
            }
        };

    }else if ([@"remoteConfigUpdate" isEqualToString:method]) {
        [Countly.sharedInstance updateRemoteConfigWithCompletionHandler:^(NSError * error)
         {
             if (!error){
                 result(@"Success!");
             } else {
                 result([@"Error :" stringByAppendingString: error.localizedDescription]);
             }
         }];

    }else if ([@"updateRemoteConfigForKeysOnly" isEqualToString:method]) {
        NSMutableArray *randomSelection = [[NSMutableArray alloc] init];
        for (int i = 0; i < (int)command.count; i++){
            [randomSelection addObject:[command objectAtIndex:i]];
        }
        NSArray *keysOnly = [randomSelection copy];

        // NSArray * keysOnly[] = {};
        // for(int i=0,il=(int)command.count;i<il;i++){
        //     keysOnly[i] = [command objectAtIndex:i];
        // }
        [Countly.sharedInstance updateRemoteConfigOnlyForKeys: keysOnly completionHandler:^(NSError * error)
         {
             if (!error){
                 result(@"Success!");
             } else {
                 result([@"Error :" stringByAppendingString: error.localizedDescription]);
             }
         }];

    }else if ([@"updateRemoteConfigExceptKeys" isEqualToString:method]) {
        NSMutableArray *randomSelection = [[NSMutableArray alloc] init];
        for (int i = 0; i < (int)command.count; i++){
            [randomSelection addObject:[command objectAtIndex:i]];
        }
        NSArray *exceptKeys = [randomSelection copy];

        // NSArray * exceptKeys[] = {};
        // for(int i=0,il=(int)command.count;i<il;i++){
        //     exceptKeys[i] = [command objectAtIndex:i];
        // }
        [Countly.sharedInstance updateRemoteConfigExceptForKeys: exceptKeys completionHandler:^(NSError * error)
         {
             if (!error){
                 result(@"Success!");
             } else {
                 result([@"Error :" stringByAppendingString: error.localizedDescription]);
             }
         }];

    }else if ([@"remoteConfigClearValues" isEqualToString:method]) {
//        [CountlyRemoteConfig.sharedInstance clearCachedRemoteConfig];
        result(@"Success!");

    }else if ([@"getRemoteConfigValueForKey" isEqualToString:method]) {
        id value = [Countly.sharedInstance remoteConfigValueForKey:[command objectAtIndex:0]];
        if(!value){
            value = @"Default Value";
        }
        NSString *theType = NSStringFromClass([value class]);
        if([theType isEqualToString:@"NSTaggedPointerString"]){
            result(value);
        } else if([theType isEqualToString:@"__NSSingleEntryDictionaryI"]){
            NSDictionary *dictionaryOrArrayToOutput = (NSDictionary *) value;
            NSError *error;
            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dictionaryOrArrayToOutput options:NSJSONWritingPrettyPrinted // Pass 0 if you don't care about the readability of the generated string
                                                                 error:&error];

            if (!jsonData) {
                NSLog(@"Got an error: %@", error);
                result(error);
            } else {
                NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
                result(jsonString);
            }
        }else if([theType isEqualToString:@"__NSCFBoolean"]){
            NSString *boolean = [value stringValue];
            if([boolean isEqualToString:@"1"]){
                result(@"true");
            }else{
                result(@"false");
            }
        }else{
            result([value stringValue]);
        }
    }else if ([@"askForFeedback" isEqualToString:method]) {
        NSString* widgetId = [command objectAtIndex:0];
        [Countly.sharedInstance presentFeedbackWidgetWithID:widgetId completionHandler:^(NSError* error){
            if (error){
                NSString *theError = [@"Feedback widget presentation failed: " stringByAppendingString: error.localizedDescription];
                result(theError);
            }
            else{
                result(@"Feedback widget presented successfully");
            }
        }];

    }else if ([@"askForStarRating" isEqualToString:method]) {
        dispatch_async(dispatch_get_main_queue(), ^ {
            [Countly.sharedInstance askForStarRating:^(NSInteger rating){
                result([NSString stringWithFormat: @"Rating:%d", (int)rating]);
            }];
        });
    }else if ([@"startTrace" isEqualToString:method]) {
        dispatch_async(dispatch_get_main_queue(), ^ {
        NSString* traceKey = [command objectAtIndex:0];
        [Countly.sharedInstance startCustomTrace: traceKey];
        });
        result(@"startTrace!");

    }else if ([@"cancelTrace" isEqualToString:method]) {
        dispatch_async(dispatch_get_main_queue(), ^ {
        NSString* traceKey = [command objectAtIndex:0];
        [Countly.sharedInstance cancelCustomTrace: traceKey];
        });
        result(@"cancelTrace!");

    }else if ([@"clearAllTraces" isEqualToString:method]) {
        dispatch_async(dispatch_get_main_queue(), ^ {
        [Countly.sharedInstance clearAllCustomTraces];
        });
        result(@"clearAllTraces!");

    }else if ([@"endTrace" isEqualToString:method]) {
        dispatch_async(dispatch_get_main_queue(), ^ {
        NSString* traceKey = [command objectAtIndex:0];
        NSMutableDictionary *metrics = [[NSMutableDictionary alloc] init];
        for(int i=1,il=(int)command.count;i<il;i+=2){
            @try{
                metrics[[command objectAtIndex:i]] = [command objectAtIndex:i+1];
            }
            @catch(NSException *exception){
                if(isDebug){
                    NSLog(@"[CountlyCordova] Exception occured while parsing metrics: %@", exception);
                }
            }
        }
        [Countly.sharedInstance endCustomTrace: traceKey metrics: metrics];
        });
        result(@"endTrace!");

    }else if ([@"recordNetworkTrace" isEqualToString:method]) {
        dispatch_async(dispatch_get_main_queue(), ^ {
            @try{
                NSString* networkTraceKey = [command objectAtIndex:0];
                int responseCode = [[command objectAtIndex:1] intValue];
                int requestPayloadSize = [[command objectAtIndex:2] intValue];
                int responsePayloadSize = [[command objectAtIndex:3] intValue];
                int startTime = [[command objectAtIndex:4] intValue];
                int endTime = [[command objectAtIndex:5] intValue];
                [Countly.sharedInstance recordNetworkTrace: networkTraceKey requestPayloadSize: requestPayloadSize responsePayloadSize: responsePayloadSize responseStatusCode: responseCode startTime: startTime endTime: endTime];
            }
            @catch(NSException *exception){
                if(isDebug){
                    NSLog(@"[CountlyCordova] Exception occured at recordNetworkTrace method: %@", exception);
                }
            }
        });
        result(@"recordNetworkTrace!");

    }else if ([@"enableApm" isEqualToString:method]) {
        config.enablePerformanceMonitoring = YES;
        result(@"enableApm!");

    } else {
        NSLog(@"Countly Bridge Method Not Implemented %@", method);
        result(@"Countly Bridge Method Not Implemented");
    }
}

@end


