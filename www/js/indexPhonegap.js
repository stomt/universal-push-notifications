var setupPhonegapPush = function() {
  if (!window.PushNotification) {
    return;
  }

  var push = window.PushNotification.init({
    "android": {
      "senderID": "604077393164"
    },
    "browser": {},
    "ios": {
      "sound": true,
      "vibration": true,
      "badge": true,
      // use fcm to push via APNs (not received)
      "senderID": "604077393164",
      "gcmSandbox": "false"
    },
    "windows": {}
  });

  push.on('registration', function(data) {
    pushManager.setRegistrationId(data.registrationId);
    pushManager.registerSuccessfulSetup('phonegap');
  });

  push.on('error', function(error) {
    pushManager.error(error);
  });

  push.on('notification', function(data) {
    pushManager.handleNotification(data);

    // This function is not called different on Android and iOS.
    var isIOS = false;
    if (data.additionalData && data.additionalData['gcm.message_id']) {
      // the message was send using firebase(gcm) to APNs
      isIOS = true;
    }

    if (isIOS) {

      if (data.additionalData.foreground) {
        // on iOS this function is called while the app was open
        console.log('notification received', data);
        sendShownCallback(data.additionalData);
      } else {
        // on iOS this function is called as click callback
        console.log('notification clicked', data);
        sendClickedCallback(data.additionalData);
      }

      if (push.finish) {
        push.finish(function() {
          console.log('success');
        }, function() {
          console.log('error');
        }, 'push-1');
      }

    } else {

      sendShownCallback(data.additionalData);

      if (data.additionalData.news && !data.additionalData.foreground) {
        // https://github.com/katzer/cordova-plugin-local-notifications/wiki/04.-Scheduling
        cordova.plugins.notification.local.schedule({
          title: data.additionalData.news.title,
          text: data.additionalData.news.body,
          data: data.additionalData
        });
      }

    }
  });

  cordova.plugins.notification.local.on('click', function (notification, state) {
    notification.data = JSON.parse(notification.data);
    console.log('notification clicked', notification, state);
    sendClickedCallback(notification.data);
  }, this)

};
