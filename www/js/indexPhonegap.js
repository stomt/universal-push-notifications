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

    sendShownCallback(data.additionalData);

    if (data.additionalData.news && !data.additionalData.foreground) {
      // https://github.com/katzer/cordova-plugin-local-notifications/wiki/04.-Scheduling
      cordova.plugins.notification.local.schedule({
        title: data.additionalData.news.title,
        text: data.additionalData.news.body,
        data: data.additionalData
      });
    }

    if (push.finish) {
      push.finish(function() {
        console.log('success');
      }, function() {
        console.log('error');
      }, 'push-1');
    }
  });

  cordova.plugins.notification.local.on('click', function (notification, state) {
    notification.data = JSON.parse(notification.data);
    console.log('notification clicked', notification, state);
    sendClickedCallback(notification.data);
  }, this)

};
