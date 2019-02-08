// Feedback
Countly.feedback = {};
Countly.feedback.config = {

}
var feedback_data = {
    "_id": "5b2ceb1b6b71e62eb22d6a46",
    "popup_header_text": "Widget 1",
    "popup_button_callout": "Submit feedback",
    "popup_comment_callout": "Add comment",
    "popup_thanks_message": "Thank you for your feedback",
    "trigger_position": "center-left",
    "trigger_bg_color": "132f1d",
    "trigger_button_text": "Feedback",
    "trigger_font_color": "#FFFFFF",
    "target_devices": "[\"mobile\",\"desktop\",\"tablet\"]",
    "target_page": "selected",
    "target_pages": "[\"/\"]",
    "is_active": "true"
};
Countly.feedback.enable = function(widgetId){
    // Ajax.post('/o/feedback/widgets', {
    //     api_key: Countly.appKey,
    //     app_id: '58b7aa77f13890219ea20ad6'
    // }, function(result){
    //     console.log(result);
    // });
    
};
// Feedback