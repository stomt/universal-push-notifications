// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.6.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.6/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '604077393164'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.body,
    icon: '/img/logo.png'
  };

  // sendShownCallback(payload);

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
// [END background_handler]

// [START notificationClick_handler]
self.addEventListener('notificationclick', function(event) {
  console.log('[firebase-messaging-sw.js] Notification clicked ', event);
  // sendClickedCallback({
  //   notificationId: event.notification.data.notificationId
  // });
  event.notification.close();
});
// [END notificationClick_handler]
