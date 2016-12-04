// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.6.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.2/firebase-messaging.js');

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
  payload.data.notification = JSON.parse(payload.data.notification);
  // Customize notification here
  const notificationTitle = 'Max: ' + payload.data.notification.title;
  const notificationOptions = {
    body: payload.data.notification.body,
    icon: '/img/logo.png',
    data: payload.data
  };

  sendShownCallback(payload.data);

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
// [END background_handler]

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification);
  sendClickedCallback({
    notificationId: event.notification.data.notificationId
  });
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow('/');
  }));
});

var CALLBACK_TYPES = {
  RECEIVED: 'received',
  CLICKED: 'clicked'
};
var DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

function sendShownCallback(notificationData) {
  var body = {
    notificationId: notificationData.notificationId,
    type: CALLBACK_TYPES.RECEIVED
  };
  return sendCallback(body)
    .then(function(response) {
      console.log(response);
    });
}

function sendClickedCallback(notificationData) {
  var body = {
    notificationId: notificationData.notificationId,
    type: CALLBACK_TYPES.CLICKED
  };
  return sendCallback(body)
    .then(function(response) {
      console.log(response);
    });
}

function sendCallback(body) {
  var url = 'http://localhost:3030/callback';
  var method = 'POST';
  var data = JSON.stringify(body);

  return fetch(url, {
    method: method,
    body: data,
    headers: DEFAULT_HEADERS
  })
    .then(function(response) {
      return response.json();
    });
}

