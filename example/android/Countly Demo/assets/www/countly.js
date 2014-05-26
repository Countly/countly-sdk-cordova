function SegmentationObject()
{
    this.Key;
    this.Value

    this.Init = function(key, value)
    {
        this.Key = key;
        this.Value = value;
    }
}

function CountlyEvent()
{
    /// <summary>
    /// String describing the event that has occured. (Mandatory)
    /// </summary>
    this.Key;

    /// <summary>
    /// The number of times this event has occured. (Mandatory)
    /// </summary>
    this.Count;

    /// <summary>
    /// Flags if Sum will be used in the event call. Automatically set
    /// when Sum is modified.
    /// </summary>
    this.UsingSum;

    /// <summary>
    /// Value used in the summation of similar event. For example the price
    /// of an in app purchase, so total revenue can be monitored. (Optional)
    /// </summary>
    this.Sum;

    /// <summary>
    /// Flags if Segmentation will be used in the event call. Automatically
    /// set when Segmentation is modified.
    /// </summary>
    this.UsingSegmentation;

    /// <summary>
    /// Used to define characteristics of the event which can be filtered by. (Optional)
    /// </summary>
    this.Segmentation = [];
}

CountlyEvent.prototype.Init = function(key, count, usingSum, sum, usingSegmentation, segmentation)
{
    
}

function DeviceInformation()
{
    this.UDID = 7;
    this.OS;
    this.OSVersion;
    this.Device;
    this.Resolution;
    this.Carrier = null;
    this.Locale;
    this.ScreenWidth = screen.width;
    this.ScreenHeight = screen.height;
}
 
DeviceInformation.prototype.DetectDevice = function()
{
    var UserAgent = navigator.userAgent;

    if (window.devicePixelRatio > 1)
    {
        this.ScreenWidth *= window.devicePixelRatio;
        this.ScreenHeight *= window.devicePixelRatio;
    }

    this.Resolution = (this.ScreenWidth > this.ScreenHeight) ? "{0}x{1}".format(this.ScreenWidth, this.ScreenHeight) : "{0}x{1}".format(this.ScreenHeight, this.ScreenWidth);

    this.Locale = window.navigator.userLanguage || window.navigator.language;

    //alert(UserAgent + "Res:" + Resolution + "Pixel ratio: " + window.devicePixelRatio);
    if ((/iPhone|iPad|iPod/i).test(UserAgent))
    {
        this.OS = "iOS";
        this.OSVersion = (/(i[PSa-z\s]+);.*?CPU\s([OSPa-z\s]+(?:([\d_]+)|;))/i).exec(UserAgent).lenght > 3 ? (UserAgent.match(/(i[PSa-z\s]+);.*?CPU\s([OSPa-z\s]+(?:([\d_]+)|;))/i)[3]).replaceAll("_", ".") : "Unknown";

        if ((/iPhone/i).test(UserAgent))
        {
            switch (this.Resolution)
            {
                case "1136x640": this.Device = "iPhone 5"; break;
                case "480x320": this.Device = "iPhone 3G/S"; break;
                case "960x640": this.Device = "iPhone 4G/S"; break;
                default: this.Device = "iPhone"; break;
            }
        }

        else if ((/iPad/i).test(UserAgent))
        {
            switch (window.devicePixelRatio)
            {
                case 1 : this.Device = "iPad 1/2"; break;
                case 2 : this.Device = "iPad 3"; break;
                default: this.Device = "iPad"; break;
            }
        }
        else if ((/iPod/i).test(UserAgent))
            this.Device = "iPod";
    }
    else if ((/Android/i).test(UserAgent))
    {
        this.Device = "Android";
        this.OS = "Android OS";
        this.OSVersion = ((/Android\s+([\d\.]+)/).test(UserAgent)) ? UserAgent.match(/Android\s+([\d\.]+)/)[1] : "Unknown";
    }
    else if ((/blackberry|BB10|rim tablet os/i).test(UserAgent))
    {
        this.Device = "Blackberry";
        this.OS = "BlackBerry OS";
        this.OSVersion = "Unknown";
    }
    else if ((/Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\bS60\b/i).test(UserAgent))
    {
        this.Device = "Symbian";
        this.OS = "Symbian OS";
        this.OSVersion = "Unknown";
    }
    else if ((/Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Window Mobile|Windows Phone [0-9.]+|WCE;/i).test(UserAgent))
    {
        this.Device = "Windows Mobile";
        this.OS = "Windows Mobile OS";
        this.OSVersion = "Unknown";
    }
    else if ((/Windows Phone OS|XBLWP7|ZuneWP7/i).test(UserAgent))
    {
        this.Device = "Windows Phone";
        this.OS = "Windows Phone OS";
        this.OSVersion = ((/Windows Phone OS\s+([\d\.]+)/).test(UserAgent)) ? UserAgent.match(/Windows Phone OS\s+([\d\.]+)/)[1] : "Unknown";
    }
    else if ((/PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino/i).test(UserAgent))
    {
        this.Device = "Palm";
        this.OS = "Palm OS";
        this.OSVersion = "Unknown";
    }
    else if ((/Windows/i).test(UserAgent))
    {
        this.Device = "PC";
        this.OS = "Windows";

        if ((/Windows NT\s+([\d\.]+)/).test(UserAgent))
        {
            switch ((/Windows NT\s+([\d\.]+)/).exec(UserAgent)[1])
            {
                case "5.1" : this.OSVersion = "XP"; break;
                case "6.0" : this.OSVersion = "Vista"; break;
                case "6.1" : this.OSVersion = "7"; break;
                case "6.2" : this.OSVersion = "8"; break;
                default: this.OSVersion = "Unknown"; break;
            }
        }
        else
            this.OSVersion = "Unknown";
    }

    else if ((/Mac/i).test(UserAgent))
    {
        this.Device = "Mac";
        this.OS = "Mac OS X";

        if ((/Mac OS X\s+([\w._]+)/).test(UserAgent))
        {
            switch ((/Mac OS X\s+([\w._]+)/).exec(UserAgent)[1])
            {
                case "10_4" : this.OSVersion = "Tiger"; break;
                case "10_5" : this.OSVersion = "Leopard"; break;
                case "10_6" : this.OSVersion = "Snow Leopard"; break;
                case "10_7" : this.OSVersion = "Mountain Lion"; break;
                case "10_8" : this.OSVersion = "Mountain Lion 8"; break;
                default: this.OSVersion = "Unknown"; break;
            }
        }
        else
            this.OSVersion = "Unknown";
    }

    else if ((/X11/i).test(UserAgent))
    {
        this.Device = "PC";
        this.OS = "Unix";
        this.OSVersion = "Unknown";
    }
    else if ((/Linux/i).test(UserAgent))
    {
        this.Device = "PC";
        this.OS = "Linux";
        this.OSVersion = "Unknown";
    }

    Countly.Log("OS:{0}, OS Version:{1}, Device:{2}, UDID:{6} Resolution:{3}, Carrier:{4}, Locale:{5}".format(this.OS, this.OSVersion, this.Device, this.Resolution, this.Carrier, this.Locale, this.UDID))


}

DeviceInformation.prototype.GetMetrics = function(appVersion)
{
    var jSONSeriliazation = "{";

    jSONSeriliazation += "\"" + "_device" + "\"" + ":" + "\"" + this.Device + "\"";
    jSONSeriliazation += "," + "\"" + "_os" + "\"" + ":" + "\"" + this.OS + "\"";
    jSONSeriliazation += "," + "\"" + "_os_version" + "\"" + ":" + "\"" + this.OSVersion + "\"";
    jSONSeriliazation += "," + "\"" + "_carrier" + "\"" + ":" + "\"" + this.Carrier + "\"";
    jSONSeriliazation += "," + "\"" + "_resolution" + "\"" + ":" + "\"" + this.Resolution + "\"";
    jSONSeriliazation += "," + "\"" + "_local" + "\"" + ":" + "\"" + this.Locale + "\"";
    jSONSeriliazation += "," + "\"" + "_app_version" + "\"" + ":" + "\"" + appVersion + "\"";
    jSONSeriliazation += "}";

    //Countly.Log(("DEVICE DETECTED:\nDevice: {0}\nOS: {1}\nOS Version: {2}\nCarrier: {3}\nResolution: {4}\nLocal: {5}\nApp Version: {6}").format(this.Device, this.OS, this.OSVersion, this.Carrier, this.Resolution, this.Locale, appVersion));
    Countly.Log(jSONSeriliazation);
    
    return jSONSeriliazation;
}

function Sleep(ms)
{
    var dt = new Date();
    dt.setTime(dt.getTime() + ms);
    while (new Date().getTime() < dt.getTime());
}

//first, checks if it isn't implemented yet
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

String.prototype.replaceAll = function (replace, with_this) {
    return this.replace(new RegExp(replace, 'g'),with_this);
}

var Countly = new function()
{
    /// <summary>
    /// Server URL: Set your server URL.
    /// Enter https://cloud.count.ly for Countly Cloud.
    /// </summary>
    this.ServerURL = "https://cloud.count.ly";

    /// <summary>
    /// Your Application Key.
    /// You can get it from Countly web site after login. "Management -> Application -> Your Application -> Application Key"
    /// </summary>
    this.AppKey = "";

    /// <summary>
    /// Your application version.
    /// </summary>
    this.AppVersion = "1.01";

    /// <summary>
    /// Countly sends kind of Keep Alive messages to server to calculate session lengths.
    /// You can change the period by changing this value. (Default: 10)
    /// </summary>
    this.DataCheckPeriod = 10;

    /// <summary>
    /// Countly checks that is there any data waiting to send server and sends them with this period.
    /// </summary>
    this.KeepAliveSendPeriod = 30;

    /// <summary>
    /// Allows you to see what is going on.
    /// </summary>
    this.IsDebugModeOn = true;

    /// <summary>
    /// Calls OnStart() and OnStop() methods automatically.
    /// </summary>
    //this.AutoStart = true;

    this.ConnectionQueue = [];
    this.IsCountlyWorking;
    this.PackageSizeForEvents = 5;

    this._eventQueue = [];
    
    this.Duration;

    /// <summary>
    /// Can countly send data to server
    /// </summary>
    this.CanSendDataToServer;
    
    this.DeviceInfo;

    this.Log = function(message)
    {
        if (this.IsDebugModeOn)
        {
            console.log("Countly -> {0}".format(message));
        }
    }

    this.SendDataToServer = function()
    {
        var data;
        
        if (this.CanSendDataToServer)
        {
            while(this.ConnectionQueue.length > 0)
            {
                data = this.ConnectionQueue.pop();
                this.Send(data);
            }
            
            setTimeout(function(){Countly.SendDataToServer()},Countly.DataCheckPeriod*1000);
            
        }
    }

    this.Send = function(data, callback)
    {
        this.Log("call -> {0}".format(data));
        $.ajax({
            type: "POST",
            url: "{0}/i?{1}".format(this.ServerURL, data),
            //parameters: parameters,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data)
            {
                Countly.Log("Data send successfully.");
            },
            error: function(data)
            {
                Countly.ConnectionQueue.push(data);
            }
        });
    }

    this.SeriliazeEvents = function(events)
    {
        var jSONSeriliazation = "";

        var first1 = true;

        jSONSeriliazation += "[";
        for (var i in events)
        {
            if (first1)
            {
                first1 = false;
            }
            else
            {
                jSONSeriliazation += ",";
            }
Countly.Log("Event:  " + events[i].Key)
            jSONSeriliazation += "{";
            jSONSeriliazation += "\"" + "key" + "\"" + ":" + "\"" + events[i].Key + "\"" + ",";
            jSONSeriliazation += "\"" + "count" + "\"" + ":" + events[i].Count;
            if (events[i].UsingSum)
            {
                jSONSeriliazation += ",";
                jSONSeriliazation += "\"" + "sum" + "\"" + ":" + events[i].Sum;
            }
            if (events[i].UsingSegmentation)
            {
                jSONSeriliazation += ",";
                jSONSeriliazation += "\"" + "segmentation" + "\"" + ":" + "{";

                first2 = true;
                for (var y in events[i].Segmentation)
                {
                    if (first2)
                    {
                        first2 = false;
                    }
                    else
                    {
                        jSONSeriliazation += ",";
                    }
                    jSONSeriliazation += "\"" + events[i].Segmentation[y].Key + "\"" + ":" + "\"" + events[i].Segmentation[y].Value + "\"";
                }

                jSONSeriliazation += "}";
            }
            jSONSeriliazation += "}";
        }

        jSONSeriliazation += "]";
Countly.Log(jSONSeriliazation);
        
        return jSONSeriliazation;
    }

    this.Init = function(serverURL, appKey, appVersion)
    {
        this.ServerURL = serverURL;
        this.AppKey = appKey;
        this.AppVersion = appVersion;
        
        this.DeviceInfo = new DeviceInformation();
        this.DeviceInfo.DetectDevice();

    }
    
    this.Init = function(serverURL, appKey, appVersion, udID)
    {
        this.ServerURL = serverURL;
        this.AppKey = appKey;
        this.AppVersion = appVersion;
        
        this.DeviceInfo = new DeviceInformation();
        this.DeviceInfo.DetectDevice();
        this.DeviceInfo.UDID = udID;
    }

    /*this.AutoStartProc = function()
    {
        if (this.AutoStart)
        {
            if (this.ServerURL == "" || this.AppKey == "" || this.AppVersion =="")
            {
                this.Log("Please fill ServerURL, AppKey and AppVersion values with Init() method.");
                return;
            }

            //AUTO START
            this.OnStart();
        }
    }*/

    /// <summary>
    /// Starts Countly (Manual Mode)
    /// </summary>
    this.OnStart = function()
    {
        if (this.IsCountlyWorking) return;
        
        this.Log("Starting...");

        if (this.ServerURL == "" || this.AppKey == "" || this.AppVersion =="")
        {
            this.Log("Please fill ServerURL, AppKey and AppVersion values with Init() method.");
            return;
        }

        this.BeginSession();
        this.IsCountlyWorking = true;
        
        setTimeout(function(){Countly.KeepAlive()},Countly.KeepAliveSendPeriod*1000);
        
        this.CanSendDataToServer = true;
        this.Duration = 0;
        this.UpdateDuration();
        this.SendDataToServer();
    }

    /// <summary>
    /// Stops Countly (Manual Mode)
    /// </summary>
    this.OnStop = function()
    {
        if (!this.IsCountlyWorking) return;
        
        this.Log("Stopping...");
        this.IsCountlyWorking = false;
        this.EndSession();
    }

    /// <summary>
    /// Posts events
    /// </summary>
    /// <param name="Event">Event to post</param>
    this.PostEvent = function(countlyEvent)
    {
        if (countlyEvent == null)
        {
            return;
        }

        this.Log("Event Queued -> " + countlyEvent.Key + " : " + countlyEvent.Count);

        this._eventQueue.push(countlyEvent);

        if (this._eventQueue.length >= this.PackageSizeForEvents)
        {
            this.QueueEvents();
            this._eventQueue = [];
        }
    }

    this.KeepAlive = function()
    {
        if (!this.IsCountlyWorking) return;
        
        this.Log("Keeping Alive...");
        this.UpdateSession();
        setTimeout(function(){Countly.KeepAlive()},Countly.KeepAliveSendPeriod*1000);
    }
    
    this.UpdateDuration = function()
    {        
        if (this.IsCountlyWorking)
        {
            this.Duration++;
            setTimeout(function(){Countly.UpdateDuration()},1000);
        }
    }

    this.BeginSession = function()
    {
        var data = ("app_key={0}&device_id={1}&sdk_version=1.0&begin_session=1&metrics={2}".format(this.AppKey, this.DeviceInfo.UDID, encodeURIComponent(this.DeviceInfo.GetMetrics(this.AppVersion))));

        this.Log("Begin Session");

        this.ConnectionQueue.push(data);
    }

    this.UpdateSession = function()
    {
        var data = ("app_key={0}&device_id={1}&session_duration={2}").format(this.AppKey, this.DeviceInfo.UDID, this.Duration);

        if (this._eventQueue.length > 0)
        {
            var events = this.SeriliazeEvents(this._eventQueue);
            this._eventQueue = [];

            data += "&events=" + encodeURIComponent(events);
        }

        this.Duration = 0;
        this.Log("Update Session");

        this.ConnectionQueue.push(data);
    }

    this.EndSession = function()
    {
        var data = ("app_key={0}&device_id={1}&end_session=1&session_duration={2}").format(this.AppKey, this.DeviceInfo.UDID, this.Duration);

        if (this._eventQueue.length > 0)
        {
            var events = this.SeriliazeEvents(this._eventQueue);
            this._eventQueue = [];

            data += "&events=" + encodeURIComponent(events);
        }

        this.Log("End Session");

        this.Send(data, function()
        {
            this.CanSendDataToServer = false;
            this.ConnectionQueue = [];
            this.Duration = 0;
        });

    }

    this.QueueEvents = function()
    {
        var data = ("app_key={0}&device_id={1}&events={2}").format(this.AppKey, this.DeviceInfo.UDID, encodeURIComponent(this.SeriliazeEvents(this._eventQueue)));

        this.Log("Events are packaged. Package is sending...");

        this.ConnectionQueue.push(data);
    }
}




/*
$(document).ready(function ()
{
    //Countly.AutoStartProc();
});

$(document).unload(function() {
    Countly.OnStop();
});
*/