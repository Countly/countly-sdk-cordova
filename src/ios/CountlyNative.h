
#import "AppDelegate.h"
@import UserNotifications;

extern NSString *_Nullable const pushPluginApplicationDidBecomeActiveNotification;

@interface AppDelegate (notification) <UNUserNotificationCenterDelegate>
- (void)application:(UIApplication *_Nullable)application didReceiveRemoteNotification:(NSDictionary *_Nullable)userInfo fetchCompletionHandler:(void (^_Nullable)(UIBackgroundFetchResult))completionHandler;
- (id _Nullable)getCommandInstance:(NSString *_Nullable)className;
- (void)pushPluginOnApplicationDidBecomeActive:(UIApplication *_Nullable)application;

@property(nonatomic, retain) NSDictionary *_Nullable launchNotification;
@property(nonatomic, retain) NSNumber *_Nullable coldstart;

@end

@interface CountlyNative : NSObject
typedef void (^Result)(id _Nullable result);
- (void)onCall:(NSString *_Nullable)method commandString:(NSArray *_Nullable)commandString callback:(Result _Nullable)result;
+ (void)onNotification:(NSDictionary *)notificationMessage; // :(Boolean *)isInline :(Boolean *)coldstart
- (void)recordPushAction;
@end
