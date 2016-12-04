var pushManager = {
  requestPermissionCallback: null,

  setRegistrationId: function(id) {
    console.log('set registration id: ' + id);

    schulcloud.sendRegistrationId(id);
  },

  error: function(error, msg) {
    console.log(msg || 'Push error: ', error);
  },

  handleNotification: function(data) {
    console.log('notification event', data);
  },

  requestPermission: function() {
    if (this.requestPermissionCallback) {
      this.requestPermissionCallback();
    }
  },

  registerSuccessfulSetup: function(service, requestPermissionCallback) {
    console.log('server ', service, ' is set up!');
    this.requestPermissionCallback = requestPermissionCallback;
  }
};

var schulcloud = {

  sendRegistrationId: function(id) {
    var url = 'http://localhost:3030/devices';
    var method = 'POST';
    var body = {
      "service": "firebase",
      "type": "mobile",
      "name": "test2",
      "user_token": "usertoken1",
      "service_token": id,
      "OS": "android7"
    };
    var data = JSON.stringify(body);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 201) {
        console.log(JSON.parse(xhr.responseText));
      }
    };
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);

    // Alternative implementation with fetch()
    // fetch(url, {
    //   method: method,
    //   body: data,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(function(response) {
    //     response.json().then(function(json) {
    //       console.log(json);
    //     })
    //   });
  }

};
