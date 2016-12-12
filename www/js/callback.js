
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

  function callback(response) {
    console.log(response);
  }

  return sendCallback(body, callback);
}

function sendClickedCallback(notificationData) {
  var body = {
    notificationId: notificationData.notificationId,
    type: CALLBACK_TYPES.CLICKED
  };

  function callback(response) {
    console.log(response);
  }

  return sendCallback(body, callback);
}

function sendCallback(body, callback) {
  var url = 'http://localhost:3030/callback';
  var data = JSON.stringify(body);

  postRequest(url, data, callback);
}

function postRequest(url, data, callback) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 201) {
      callback(this);
    }
  };
  xhttp.open('POST', url, true);
  xhttp.setRequestHeader("Content-type", DEFAULT_HEADERS['Content-Type']);
  xhttp.send(data);
}
