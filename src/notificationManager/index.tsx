import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
	updateChatBadgeStatus,
	updateDeviceToken,
	updateFCMToken,
	updateNotificationBadgeStatus
} from '../redux/reducerSlices/userInfo';
import {showMessage, MessageOptions} from 'react-native-flash-message';
import {verticalScale} from '../theme';
import {navigationRef} from '../navigation/navigationHelper';
import ScreenNames from '../navigation/screenNames';
import {updateDeviceTokenApi} from '../redux/apiHandler/apiActions';
import {RootState} from '../redux/store';
import Strings from '../constants/strings';

export const notificationRedirection = async (notificationData: any) => {
	console.log('TYPE : ', notificationData?.data?.type);
	if (notificationData?.data?.type === Strings.NOTIFICATION_CHAT_MESSAGE) {
		await navigationRef.current.navigate(ScreenNames.ChatListScreen);
	} else {
		await navigationRef.current.navigate(ScreenNames.NotificationScreen);
	}
	//   try {
	//     console.log('TYPE : ', notificationData?.type);
	//     switch (notificationData?.type) {
	//       case constValues.NOTIFICATION_FOLLOW:
	//         navigate(Navigation.UserProfileScreen, {
	//           userId: notificationData?.fromUserId,
	//         });
	//         break;
	//       case constValues.NOTIFICATION_POST:
	//         console.log('OPEN Post Detail Screen : ');
	//         navigate(Navigation.ViewVideoPostScreen, {
	//           postId: notificationData?.userPostId,
	//         });
	//         break;
	//       case constValues.NOTIFICATION_COMMENT:
	//         console.log('OPEN Post Comment Screen : ');
	//         navigate(Navigation.ViewVideoPostScreen, {
	//           postId: notificationData?.userPostId,
	//         });
	//         break;
	//       case constValues.NOTIFICATION_LIKE:
	//         console.log('OPEN Post Like Screen : ');
	//         navigate(Navigation.ViewVideoPostScreen, {
	//           postId: notificationData?.userPostId,
	//         });
	//         break;
	//       case constValue.NOTIFICATION_STREAK_EXPIRED:
	//         navigate(Navigation.StreaksChallengesScreen);
	//         break;
	//       case constValue.NOTIFICATION_DRLL_ADD:
	//         navigate(Navigation.SubSkillScreen, {
	//           skillID: notificationData?.subskillvideo_skillId,
	//           subSkillName: notificationData?.subskillvideo_skillName,
	//         });
	//         break;
	//       case constValue.NOTIFICATION_DRLL_ADD:
	//         navigate(Navigation.SubSkillScreen, {
	//           skillID: notificationData?.subskillvideo_skillId,
	//           subSkillName: notificationData?.subskillvideo_skillName,
	//         });
	//         break;
	//       case constValue.Strings.NOTIFICATION_CHAT_MESSAGE:
	//         // console.log("UserDetails : ", notificationData?.userDetails)
	//         let userDetails = JSON.parse(notificationData?.userDetails);
	//         global.currentGrpChatId = userDetails?.groupId;
	//         let currentGrpId = store.getState().preLogin.currentChatGrpId;
	//         let grpId = userDetails?.groupId;
	//         if (currentGrpId !== '' && grpId !== currentGrpId) {
	//           navigateBack();
	//           setTimeout(() => {
	//             navigatePush(Navigation.ChatDetailsScreen, {
	//               userDetails: userDetails,
	//             });
	//           }, 500);
	//         } else {
	//           navigatePush(Navigation.ChatDetailsScreen, {
	//             userDetails: userDetails,
	//           });
	//         }
	//         break;
	//       default:
	//         console.log('Default Case Type: ', notificationData?.type);
	//         break;
	//     }
	//   } catch (err) {
	//     console.log('Notification Redirection : ', err);
	//   }
};

export const getNotificationPermission = async () => {
	const authorizationStatus = await messaging().requestPermission();
	// console.log('Permission Status : ', authorizationStatus);
};

const NotificationManager = () => {
	const dispatch = useDispatch();

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const getFCMToken = async () => {
		try {
			let token = await messaging().getToken();
			if (userInfo.token) {
				dispatch(updateFCMToken({fcmToken: token}));
				updateDeviceTokenApi({deviceToken: token});
			}
		} catch {}

		//console.log('TOKEN getToken:', token);
		//fcmDeviceToken.token = token;
	};

	useEffect(() => {
		// console.log(
		//   'navigationRef.current.getCurrentRoute()>?>>',
		//   navigationRef.current.getCurrentRoute().name === 'SplashScreen',
		// );
		if (
			navigationRef.current.getCurrentRoute().name !== 'SplashScreen' &&
			global.notificationData
		) {
			console.log('Notification Data : ', global.notificationData);
			if (global.notificationData?.type === Strings.NOTIFICATION_CHAT_MESSAGE) {
				navigationRef.current.navigate(ScreenNames.BottomTabScreen, {
					screen: 'FeedsRouter',
					params: {
						screen: ScreenNames.ChatListScreen
					}
				});
				global.notificationData = null;
			} else {
				navigationRef.current.navigate(ScreenNames.BottomTabScreen, {
					screen: 'FeedsRouter',
					params: {
						screen: ScreenNames.NotificationScreen
					}
				});
				global.notificationData = null;
			}
		}
	}, [navigationRef.current]);

	useEffect(() => {
		getFCMToken();

		messaging().onTokenRefresh(fcmToken => {
			console.log('New token refresh: ', fcmToken);
			if (userInfo.token && fcmToken !== userInfo.fcmToken) {
				dispatch(updateFCMToken({fcmToken: fcmToken}));
				updateDeviceTokenApi({deviceToken: fcmToken});
			}
		});
		// getNotificationPermission();

		messaging()
			.getInitialNotification()
			.then(remoteMessage => {
				//console.log('getInitialNotification Msg  : ', remoteMessage);
				if (remoteMessage) {
					navigateKillRedirect(remoteMessage?.data);
				}
			})
			.catch(err => {
				console.log('getInitialNotification Err : ', err);
			});

		messaging().onMessage(async remoteMessage => {
			if (remoteMessage?.data?.type === Strings.NOTIFICATION_CHAT_MESSAGE) {
				dispatch(updateChatBadgeStatus(true));
			} else {
				dispatch(updateNotificationBadgeStatus(true));
			}
			showNotificationBanner(remoteMessage);

			console.log('On Message LOG : ', remoteMessage);
		});

		messaging().onNotificationOpenedApp(msg => {
			console.log('onNotificationOpenedApp : ', msg);
			notificationRedirection(msg);
			//   if (msg?.data) {
			//     notificationRedirection(msg?.data);
			//   }
		});
	}, []);

	//Redirect the screen when app open from kill state.
	const navigateKillRedirect = async (notificationData: any) => {
		console.log('TYPE : ', notificationData?.type);
		global.notificationData = notificationData;
		// navigation.navigate('Root', {
		//   screen: 'Settings',
		// params: {
		//   screen: 'Sound',
		//   params: {
		//     screen: 'Media',
		//   },
		// },
		// });
		//setTimeout(() => {
		console.log(
			'OPEN Post Detail Screen : ',
			navigationRef.current.getCurrentRoute()
		);
		// await navigationRef.current.navigate(ScreenNames.BottomTabScreen, {
		//   screen: 'FeedsRouter',
		//   params: {
		//     screen: ScreenNames.NotificationScreen,
		//     // params: {
		//     //   screen: 'Media',
		//     // },
		//   },
		// });
		//navigationRef.current.navigate('LiveTabRoutes');
		//}, 2000);
	};

	const showNotificationBanner = (notificationData: any) => {
		let message = notificationData?.notification.body;
		console.log('TYPE : ', notificationData);

		// if (notificationData?.type === constValue.Strings.NOTIFICATION_CHAT_MESSAGE) {
		//   let userDetails = JSON.parse(notificationData?.userDetails);
		//   if (userDetails?.groupId === global?.currentGrpChatId) {
		//     return;
		//   }
		// }
		// let messageOptions: MessageOptions = {
		//   //icon: 'info',
		//   message: notificationData?.notification?.title,
		//   description: notificationData?.notification?.body,
		//   type: 'info',
		//   duration: 3000,
		//   statusBarHeight: verticalScale(30),
		//   onPress: () => {
		//     notificationRedirection(notificationData);
		//   },
		// };
		// showMessage(messageOptions);
	};

	return null;
};

export default NotificationManager;
