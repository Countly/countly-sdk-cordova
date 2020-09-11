#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "Countly.h"
#import "CountlyUserDetails.h"
#import "CountlyConfig.h"
#import "CountlyNotificationService.h"

FOUNDATION_EXPORT double CountlyVersionNumber;
FOUNDATION_EXPORT const unsigned char CountlyVersionString[];

