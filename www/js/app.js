var pushManager = {
  requestPermissionCallback: null,

  setRegistrationId: function(id) {
    console.log('set registration id: ' + id);

    // TODO: save and submit logic
    // var oldRegId = localStorage.getItem('registrationId');
    // if (oldRegId !== data.registrationId) {
    //   // Save new registration ID
    //   localStorage.setItem('registrationId', data.registrationId);
    //   // Post registrationId to your app server as the value has changed
    // }
  },

  error: function(error, msg) {
    console.log(msg || 'Push error: ', error);
  },

  handleNotification: function(data) {
    console.log('notification event', data);
    navigator.notification.alert(
      data.message,         // message
      null,                 // callback
      data.title,           // title
      'Ok'                  // buttonName
    );
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