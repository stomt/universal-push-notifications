
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