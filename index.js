/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, LogBox, Platform} from 'react-native';
import {registerRootComponent} from 'expo';
// import messaging from '@react-native-firebase/messaging';
import App from './App';
import {createRoot}  from 'react-dom/client';

// import {name as appName} from './app.json';
import polyfill from '@amityco/react-native-formdata-polyfill';
window.navigator.userAgent = 'react-native';

// messaging().setBackgroundMessageHandler(async msg => {
// 	console.log('onNotificationOpenedApp : ', msg);
// 	//   if (msg?.data) {
// 	//     notificationRedirection(msg?.data);
// 	//   }
// });
polyfill();

//console.log = () => {};
// LogBox.ignoreAllLogs();
// if ('web' === Platform.OS) {
//     // const rootTag = createRoot(document.getElementById('root') ?? document.getElementById('main'));
//     // rootTag.render(createElement(App));
//     AppRegistry.registerComponent('12', () => App);


//   } else {
//     AppRegistry.registerComponent('23', () => App);

//   }

  registerRootComponent(App);