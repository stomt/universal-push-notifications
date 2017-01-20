var setupPhonegapPush = function() {

  var lastNotification = null;
  var push = window.PushNotification.init({
    android: {
      senderID: '604077393164'
    },
    browser: {},
    ios: {
      sound: true,
      vibration: true,
      badge: true,
      // use fcm to push via APNs
      senderID: '604077393164',
      gcmSandbox: false
    },
    windows: {}
  });

  push.on('registration', onRegistration);
  push.on('error', onError);
  push.on('notification', onNotification);

  if (window.document) {
    window.document.addEventListener('resume', onResume, false);
  }


  function onRegistration(data) {
    pushManager.setRegistrationId(data.registrationId);
    pushManager.registerSuccessfulSetup('phonegap');
  }

  function onError(error) {
    pushManager.error(error);
  }

  function onNotification(data) {
    var state = {
      isIOS: false,
      clicked: false,
      shouldExecute: false,
      background: false
    };
    data.state = state;

    // The message was send using firebase(gcm) to APNs
    state.isIOS = data.additionalData && data.additionalData['gcm.message_id'];

    // Based on the OS notifications are received different
    if (state.isIOS) {
      if (!data.additionalData.foreground) {
        // Notification was shown and clicked
        state.clicked = true;
        state.shouldExecute = true;
        state.background = false;
      } else {
        // App is running
        state.background = true;
      }
    } else {
      if (!data.additionalData.foreground) {
        if (data.additionalData.coldstart) {
          // App was in background
          lastNotification = data;
          state.background = true;
        } else {
          // App was started from notification
          state.clicked = true;
          state.shouldExecute = true;
          state.background = false;
          push.clearAllNotifications();
        }
      } else {
        // App is running
        state.background = true;
      }
    }

    // pass to app
    pushManager.handleNotification(data);

    // callback after finishing handling (iOS)
    push.finish();
  }

  function onResume() {
    setTimeout(function() {
      if (lastNotification) {
        lastNotification.state.clicked = true;
        lastNotification.state.shouldExecute = true;
        pushManager.handleNotification(lastNotification);
      }
    });
  }

};

pushManager.requestPermissionCallback = setupPhonegapPush;