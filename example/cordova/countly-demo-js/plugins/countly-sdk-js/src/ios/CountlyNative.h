////
////  CountlyNative.h
////  countly_flutter
////
////  Created by Trinisoft Technologies on 28/11/19.
////
//#import <Foundation/Foundation.h>
//
@interface CountlyNative: NSObject
typedef void (^Result)(id _Nullable result);
- (void) onCall:(NSString *  _Nullable)method commandString:(NSArray *  _Nullable)commandString callback:(Result) result;
@end
