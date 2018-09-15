// CountlyPushNotifications.m
//
// This code is provided under the MIT License.
//
// Please visit www.count.ly for more information.

#import "CountlyCommon.h"

NSString* const kCountlyReservedEventPushOpen = @"[CLY]_push_open";
NSString* const kCountlyReservedEventPushAction = @"[CLY]_push_action";
NSString* const kCountlyTokenError = @"kCountlyTokenError";

#if TARGET_OS_IOS
@interface CountlyPushNotifications () <UNUserNotificationCenterDelegate>
@property (nonatomic) NSString* token;
@property (nonatomic, copy) void (^permissionCompletion)(BOOL granted, NSError * error);
#else
@interface CountlyPushNotifications ()
#endif
@end

#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wdeprecated-declarations"

@implementation CountlyPushNotifications

+ (instancetype)sharedInstance
{
    if (!CountlyCommon.sharedInstance.hasStarted)
        return nil;

    static CountlyPushNotifications* s_sharedInstance;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{s_sharedInstance = self.new;});
    return s_sharedInstance;
}

- (instancetype)init
{
    if (self = [super init])
    {

    }

    return self;
}

#pragma mark ---

#if TARGET_OS_IOS

- (void)startPushNotifications
{
    if (!self.isEnabledOnInitialConfig)
        return;

    if (!CountlyConsentManager.sharedInstance.consentForPushNotifications)
        return;

    if (@available(iOS 10.0, *))
        UNUserNotificationCenter.currentNotificationCenter.delegate = self;

    [self swizzlePushNotificationMethods];

    [UIApplication.sharedApplication registerForRemoteNotifications];
}

- (void)stopPushNotifications
{
    if (!self.isEnabledOnInitialConfig)
        return;

    if (@available(iOS 10.0, *))
    {
        if (UNUserNotificationCenter.currentNotificationCenter.delegate == self)
            UNUserNotificationCenter.currentNotificationCenter.delegate = nil;
    }

    [UIApplication.sharedApplication unregisterForRemoteNotifications];
}

- (void)swizzlePushNotificationMethods
{
    static BOOL alreadySwizzled;
    if (alreadySwizzled)
        return;

    alreadySwizzled = YES;

    Class appDelegateClass = UIApplication.sharedApplication.delegate.class;
    NSArray* selectors = @[@"application:didRegisterForRemoteNotificationsWithDeviceToken:",
                           @"application:didFailToRegisterForRemoteNotificationsWithError:",
                           @"application:didRegisterUserNotificationSettings:",
                           @"application:didReceiveRemoteNotification:fetchCompletionHandler:"];

    for (NSString* selectorString in selectors)
    {
        SEL originalSelector = NSSelectorFromString(selectorString);
        Method originalMethod = class_getInstanceMethod(appDelegateClass, originalSelector);

        if (originalMethod == NULL)
        {
            Method method = class_getInstanceMethod(self.class, originalSelector);
            IMP imp = method_getImplementation(method);
            const char* methodTypeEncoding = method_getTypeEncoding(method);
            class_addMethod(appDelegateClass, originalSelector, imp, methodTypeEncoding);
            originalMethod = class_getInstanceMethod(appDelegateClass, originalSelector);
        }

        SEL countlySelector = NSSelectorFromString([@"Countly_" stringByAppendingString:selectorString]);
        Method countlyMethod = class_getInstanceMethod(appDelegateClass, countlySelector);
        method_exchangeImplementations(originalMethod, countlyMethod);
    }
}

- (void)askForNotificationPermissionWithOptions:(NSUInteger)options completionHandler:(void (^)(BOOL granted, NSError * error))completionHandler
{
    if (!CountlyConsentManager.sharedInstance.consentForPushNotifications)
        return;

    if (@available(iOS 10.0, *))
    {
        if (options == 0)
            options = UNAuthorizationOptionBadge | UNAuthorizationOptionSound | UNAuthorizationOptionAlert;

        [UNUserNotificationCenter.currentNotificationCenter requestAuthorizationWithOptions:options completionHandler:^(BOOL granted, NSError* error)
        {
            if (completionHandler)
                completionHandler(granted, error);
        }];
    }
    else
    {
        self.permissionCompletion = completionHandler;

        if (options == 0)
            options = UIUserNotificationTypeBadge | UIUserNotificationTypeSound | UIUserNotificationTypeAlert;

        UIUserNotificationType userNotificationTypes = (UIUserNotificationType)options;
        UIUserNotificationSettings* settings = [UIUserNotificationSettings settingsForTypes:userNotificationTypes categories:nil];
        [UIApplication.sharedApplication registerUserNotificationSettings:settings];
    }
}

- (void)sendToken
{
    if (!CountlyConsentManager.sharedInstance.consentForPushNotifications)
        return;

    if (!self.token)
        return;

    if ([self.token isEqualToString:kCountlyTokenError])
    {
        [CountlyConnectionManager.sharedInstance sendPushToken:@""];
        return;
    }

    if (self.sendPushTokenAlways)
    {
        [CountlyConnectionManager.sharedInstance sendPushToken:self.token];
        return;
    }

    BOOL hasNotificationPermissionBefore = [CountlyPersistency.sharedInstance retrieveNotificationPermission];

    if (@available(iOS 10.0, *))
    {
        [UNUserNotificationCenter.currentNotificationCenter getNotificationSettingsWithCompletionHandler:^(UNNotificationSettings* settings)
        {
            if (settings.authorizationStatus == UNAuthorizationStatusAuthorized)
            {
                [CountlyConnectionManager.sharedInstance sendPushToken:self.token];
                [CountlyPersistency.sharedInstance storeNotificationPermission:YES];
            }
            else if (hasNotificationPermissionBefore)
            {
                [CountlyConnectionManager.sharedInstance sendPushToken:@""];
                [CountlyPersistency.sharedInstance storeNotificationPermission:NO];
            }
        }];
    }
    else
    {
        if (UIApplication.sharedApplication.currentUserNotificationSettings.types != UIUserNotificationTypeNone)
        {
            [CountlyConnectionManager.sharedInstance sendPushToken:self.token];
            [CountlyPersistency.sharedInstance storeNotificationPermission:YES];
        }
        else if (hasNotificationPermissionBefore)
        {
            [CountlyConnectionManager.sharedInstance sendPushToken:@""];
            [CountlyPersistency.sharedInstance storeNotificationPermission:NO];
        }
    }
}

- (void)handleNotification:(NSDictionary *)notification
{
    if (!CountlyConsentManager.sharedInstance.consentForPushNotifications)
        return;

    COUNTLY_LOG(@"Handling remote notification %@", notification);

    NSDictionary* countlyPayload = notification[kCountlyPNKeyCountlyPayload];
    NSString* notificationID = countlyPayload[kCountlyPNKeyNotificationID];

    if (!notificationID)
    {
        COUNTLY_LOG(@"Countly payload not found in notification dictionary!");
        return;
    }

    COUNTLY_LOG(@"Countly Push Notification ID: %@", notificationID);

    [Countly.sharedInstance recordReservedEvent:kCountlyReservedEventPushOpen segmentation:@{kCountlyPNKeyNotificationID: notificationID}];

    if (self.doNotShowAlertForNotifications)
    {
        COUNTLY_LOG(@"doNotShowAlertForNotifications flag is set!");
        return;
    }


    id alert = notification[@"aps"][@"alert"];
    NSString* message = nil;
    NSString* title = nil;

    if ([alert isKindOfClass:NSDictionary.class])
    {
        message = alert[@"body"];
        title = alert[@"title"];
    }
    else
    {
        message = (NSString*)alert;
        title = [NSBundle.mainBundle objectForInfoDictionaryKey:@"CFBundleDisplayName"];
    }

    if (!message)
    {
        COUNTLY_LOG(@"Message not found in notification dictionary!");
        return;
    }


    __block UIAlertController* alertController = [UIAlertController alertControllerWithTitle:title message:message preferredStyle:UIAlertControllerStyleAlert];


    CLYButton* defaultButton = nil;
    NSString* defaultURL = countlyPayload[kCountlyPNKeyDefaultURL];
    if (defaultURL)
    {
        defaultButton = [CLYButton buttonWithType:UIButtonTypeCustom];
        defaultButton.frame = alertController.view.bounds;
        defaultButton.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        defaultButton.onClick = ^(id sender)
        {
            [Countly.sharedInstance recordReservedEvent:kCountlyReservedEventPushAction segmentation:@{kCountlyPNKeyNotificationID: notificationID, kCountlyPNKeyActionButtonIndex: @(0)}];

            [self openURL:defaultURL];

            [alertController dismissViewControllerAnimated:YES completion:^
            {
                alertController = nil;
            }];
        };
        [alertController.view addSubview:defaultButton];
    }


    CLYButton* dismissButton = [CLYButton dismissAlertButton];
    dismissButton.onClick = ^(id sender)
    {
        [alertController dismissViewControllerAnimated:YES completion:^
        {
            alertController = nil;
        }];
    };
    [alertController.view addSubview:dismissButton];


    NSArray* buttons = countlyPayload[kCountlyPNKeyButtons];
    [buttons enumerateObjectsUsingBlock:^(NSDictionary* button, NSUInteger idx, BOOL * stop)
    {
        //NOTE: Add space to force buttons to be laid out vertically
        NSString* actionTitle = [button[kCountlyPNKeyActionButtonTitle] stringByAppendingString:@"                       "];
        NSString* URL = button[kCountlyPNKeyActionButtonURL];

        UIAlertAction* visit = [UIAlertAction actionWithTitle:actionTitle style:UIAlertActionStyleDefault handler:^(UIAlertAction * action)
        {
            [Countly.sharedInstance recordReservedEvent:kCountlyReservedEventPushAction segmentation:@{kCountlyPNKeyNotificationID: notificationID, kCountlyPNKeyActionButtonIndex: @(idx + 1)}];

            [self openURL:URL];

            alertController = nil;
        }];

        [alertController addAction:visit];
    }];

    [CountlyCommon.sharedInstance.topViewController presentViewController:alertController animated:YES completion:nil];

    const CGFloat kCountlyActionButtonHeight = 44.0;
    CGRect tempFrame = defaultButton.frame;
    tempFrame.size.height -= buttons.count * kCountlyActionButtonHeight;
    defaultButton.frame = tempFrame;
}

- (void)openURL:(NSString *)URLString
{
    if (!URLString)
        return;

    dispatch_async(dispatch_get_main_queue(), ^
    {
        [UIApplication.sharedApplication openURL:[NSURL URLWithString:URLString]];
    });
}

- (void)recordActionForNotification:(NSDictionary *)userInfo clickedButtonIndex:(NSInteger)buttonIndex;
{
    if (!CountlyConsentManager.sharedInstance.consentForPushNotifications)
        return;

    NSDictionary* countlyPayload = userInfo[kCountlyPNKeyCountlyPayload];
    NSString* notificationID = countlyPayload[kCountlyPNKeyNotificationID];

    if (!notificationID)
        return;

    [Countly.sharedInstance recordReservedEvent:kCountlyReservedEventPushAction segmentation:@{kCountlyPNKeyNotificationID: notificationID, kCountlyPNKeyActionButtonIndex: @(buttonIndex)}];
}

#pragma mark ---

- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler API_AVAILABLE(ios(10.0))
{
    COUNTLY_LOG(@"userNotificationCenter:willPresentNotification:withCompletionHandler:");
    COUNTLY_LOG(@"%@", notification.request.content.userInfo.description);

    if (!self.doNotShowAlertForNotifications)
    {
        NSDictionary* countlyPayload = notification.request.content.userInfo[kCountlyPNKeyCountlyPayload];
        NSString* notificationID = countlyPayload[kCountlyPNKeyNotificationID];

        if (notificationID)
            completionHandler(UNNotificationPresentationOptionAlert);
    }

    id<UNUserNotificationCenterDelegate> appDelegate = (id<UNUserNotificationCenterDelegate>)UIApplication.sharedApplication.delegate;

    if ([appDelegate respondsToSelector:@selector(userNotificationCenter:willPresentNotification:withCompletionHandler:)])
        [appDelegate userNotificationCenter:center willPresentNotification:notification withCompletionHandler:completionHandler];
    else
        completionHandler(UNNotificationPresentationOptionNone);
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler API_AVAILABLE(ios(10.0))
{
    COUNTLY_LOG(@"userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:");
    COUNTLY_LOG(@"%@", response.notification.request.content.userInfo.description);

    if (CountlyConsentManager.sharedInstance.consentForPushNotifications)
    {
        NSDictionary* countlyPayload = response.notification.request.content.userInfo[kCountlyPNKeyCountlyPayload];
        NSString* notificationID = countlyPayload[kCountlyPNKeyNotificationID];

        if (notificationID)
        {
            [Countly.sharedInstance recordReservedEvent:kCountlyReservedEventPushOpen segmentation:@{kCountlyPNKeyNotificationID: notificationID}];

            NSInteger buttonIndex = -1;
            NSString* URL = nil;

            COUNTLY_LOG(@"Action Identifier: %@", response.actionIdentifier);

            if ([response.actionIdentifier isEqualToString:UNNotificationDefaultActionIdentifier])
            {
                if (countlyPayload[kCountlyPNKeyDefaultURL])
                {
                    buttonIndex = 0;
                    URL = countlyPayload[kCountlyPNKeyDefaultURL];
                }
            }
            else if ([response.actionIdentifier hasPrefix:kCountlyActionIdentifier])
            {
                buttonIndex = [[response.actionIdentifier stringByReplacingOccurrencesOfString:kCountlyActionIdentifier withString:@""] integerValue];
                URL = countlyPayload[kCountlyPNKeyButtons][buttonIndex - 1][kCountlyPNKeyActionButtonURL];
            }

            if (buttonIndex >= 0)
            {
                [Countly.sharedInstance recordReservedEvent:kCountlyReservedEventPushAction segmentation:@{kCountlyPNKeyNotificationID: notificationID, kCountlyPNKeyActionButtonIndex: @(buttonIndex)}];
            }

            [self openURL:URL];
        }
    }

    id<UNUserNotificationCenterDelegate> appDelegate = (id<UNUserNotificationCenterDelegate>)UIApplication.sharedApplication.delegate;

    if ([appDelegate respondsToSelector:@selector(userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:)])
        [appDelegate userNotificationCenter:center didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
    else
        completionHandler();
}

#pragma mark ---

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{}
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error{}
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings{}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
    completionHandler(UIBackgroundFetchResultNewData);
}
#endif
@end


#if TARGET_OS_IOS
@implementation UIResponder (CountlyPushNotifications)
- (void)Countly_application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    COUNTLY_LOG(@"App didRegisterForRemoteNotificationsWithDeviceToken: %@", deviceToken);
    const char* bytes = [deviceToken bytes];
    NSMutableString *token = NSMutableString.new;
    for (NSUInteger i = 0; i < deviceToken.length; i++)
        [token appendFormat:@"%02hhx", bytes[i]];

    CountlyPushNotifications.sharedInstance.token = token;

    [CountlyPushNotifications.sharedInstance sendToken];

    [self Countly_application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)Countly_application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
    COUNTLY_LOG(@"App didFailToRegisterForRemoteNotificationsWithError: %@", error);

    CountlyPushNotifications.sharedInstance.token = kCountlyTokenError;

    [CountlyPushNotifications.sharedInstance sendToken];

    [self Countly_application:application didFailToRegisterForRemoteNotificationsWithError:error];
}

- (void)Countly_application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
    COUNTLY_LOG(@"App didRegisterUserNotificationSettings: %@", notificationSettings);

    [CountlyPushNotifications.sharedInstance sendToken];

    BOOL granted = UIApplication.sharedApplication.currentUserNotificationSettings.types != UIUserNotificationTypeNone;

    if (CountlyPushNotifications.sharedInstance.permissionCompletion)
        CountlyPushNotifications.sharedInstance.permissionCompletion(granted, nil);

    [self Countly_application:application didRegisterUserNotificationSettings:notificationSettings];
}

- (void)Countly_application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
{
    COUNTLY_LOG(@"App didReceiveRemoteNotification:fetchCompletionHandler");

    [CountlyPushNotifications.sharedInstance handleNotification:userInfo];

    [self Countly_application:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
@end
#endif
#pragma GCC diagnostic pop
