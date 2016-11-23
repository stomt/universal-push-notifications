# universal-push-notifications
Web app template which can handle push notifications on most platforms

## Chrome/Firefox Support

- serve the `www` folder on localhost and click the request permissions button

## Safari Support

TODO

## Install Phonegap Support

- install phonegap

### Android

- run `phonegap run android --device`

- open chrome to inspect the app running in Android chrome://inspect/#devices
[more](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/)

- find registration event in the console logs


### iOS

- run `phonegap run ios --device` (push notifications do not work in the simulator)

- open Safari to inspect the app running in iOS (Develop -> [device name])

- find registration event in the console logs

(If you build and run the app using Xcode can see the logs there too.)

https://firebase.google.com/docs/cloud-messaging/ios/certs
