var CALLBACK_TYPES = {
  RECEIVED: 'received',
  CLICKED: 'clicked'
};
var DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

var SERVER_URL = 'http://domain.tld';
var SERVER_REGISTRATION_URL = SERVER_URL + '/devices';
var SERVER_CALLBACK_URL = SERVER_URL + '/callbacks';

function sendRegistrationId(id) {
  var url = SERVER_REGISTRATION_URL;
  var body = {
    type: 'mobile',
    service: 'firebase',
    service_token: id
  };
  var data = JSON.stringify(body);

  function callback(response) {
    console.log('[Server] Registration response', response);
  }

  postRequest(url, data, callback);
}

function sendReceivedCallback(notificationData) {
  var body = {
    notificationId: notificationData.notificationId,
    type: CALLBACK_TYPES.RECEIVED
  };

  function callback(response) {
    console.log('[Server] Callback received response', response);
  }

  return sendCallback(body, callback);
}

function sendClickedCallback(notificationId) {
  var body = {
    notificationId: notificationId,
    type: CALLBACK_TYPES.CLICKED
  };

  function callback(response) {
    console.log('[Server] Callback clicked response', response);
  }

  return sendCallback(body, callback);
}

function sendCallback(body, callback) {
  var url = SERVER_CALLBACK_URL;
  var data = JSON.stringify(body);

  postRequest(url, data, callback);
}

function postRequest(url, data, callback) {
  if (self.fetch) {
    fetch(url, {
      method: 'POST',
      body: data,
      headers: DEFAULT_HEADERS
    })
      .then(function(response) {
        response.json().then(function(json) {
          callback(json);
        });
      });
  } else if (self.XMLHttpRequest) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        var response = JSON.parse(xhttp.responseText);
        callback(response);
      }
    };
    xhttp.open('POST', url, true);
    for (var key in DEFAULT_HEADERS) {
      xhttp.setRequestHeader(key, DEFAULT_HEADERS[key]);
    }
    xhttp.send(data);
  }
}