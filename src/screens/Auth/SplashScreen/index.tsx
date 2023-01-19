import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
// import FingerprintScanner from 'react-native-fingerprint-scanner';
import {useDispatch, useSelector} from 'react-redux';
import AnimatedLinearGradient from '../../../components/thirdParty/react-native-animated-linear-gradient';
import Strings from '../../../constants/strings';
import ScreenNames from '../../../navigation/screenNames';
import {RootState} from '../../../redux/store';
import {useTheme} from '../../../theme/createTheme';
import styles from './style';
import RNExitApp from 'react-native-exit-app';
import Splash from 'react-native-splash-screen';
import icons from '../../../assets/icon';
import {
	showCreateHighlights,
	showTutorial
} from '../../../redux/reducerSlices/dashboard';
import ExpoFastImage from 'expo-fast-image';


const SplashScreen: React.FC<any> = () => {
	const theme = useTheme();
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const [biometryType, setBiometryType] = useState();

	// const detectFingerprintAvailable = () => {
	// 	FingerprintScanner.isSensorAvailable()
	// 		.then(biometry => {
	// 			setBiometryType(biometry);
	// 			FingerprintScanner.release();
	// 		})
	// 		.catch(error => {
	// 			console.log('isSensorAvailable error => ', error);
	// 			FingerprintScanner.release();
	// 		});
	// };

	const getMessage = () => {
		if (biometryType == 'Face ID') {
			return 'Scan your Face on the device to continue';
		} else {
			return 'Scan your Fingerprint on the device scanner to continue';
		}
	};

	const showAuthenticationDialog = () => {
		// FingerprintScanner.authenticate({
		// 	description: getMessage(),
		// 	fallbackEnabled: false
		// })
		// 	.then(() => {
		// 		console.log('biometric authentication Success');
		// 		FingerprintScanner.release();
		// 		navigation.replace(ScreenNames.BottomTabScreen);
		// 	})
		// 	.catch(error => {
		// 		console.log('biometric authentication error => ', error.toString());

		// 		if (
		// 			error?.toString().includes('FingerprintScannerNotEnrolled') === true
		// 		) {
		// 			Alert.alert(
		// 				'',
		// 				'Biometric Scanner has not enrolled. please enroll biometric in your device and continue!!',
		// 				[
		// 					{
		// 						text: 'Exit',
		// 						onPress: () => {
		// 							RNExitApp.exitApp();
		// 						},
		// 						style: 'destructive'
		// 					}
		// 				]
		// 			);
		// 		} else if (
		// 			error?.toString().includes('DeviceLockedPermanent') === true ||
		// 			error?.toString().includes('AuthenticationFailed') === true
		// 		) {
		// 			Alert.alert(
		// 				'',
		// 				'Maximum attempts reached please lock your device and unlock it to continue!!',
		// 				[
		// 					{
		// 						text: 'Exit',
		// 						onPress: () => {
		// 							RNExitApp.exitApp();
		// 						},
		// 						style: 'destructive'
		// 					}
		// 				]
		// 			);
		// 		} else if (error?.toString().includes('DeviceLocked') === true) {
		// 			Alert.alert(
		// 				'',
		// 				'Maximum attempts reached please try after 30 seconds!!',
		// 				[
		// 					{
		// 						text: 'Exit',
		// 						onPress: () => {
		// 							RNExitApp.exitApp();
		// 						},
		// 						style: 'destructive'
		// 					}
		// 				]
		// 			);
		// 		} else if (error?.toString().includes('UserCancel') === true) {
		// 			Alert.alert('', 'Authentication was canceled by the user!!', [
		// 				{
		// 					text: 'Try Again',
		// 					onPress: () => {
		// 						showAuthenticationDialog();
		// 					}
		// 				}
		// 			]);
		// 		} else if (
		// 			error?.toString().includes('FingerprintScannerNotAvailable') === true
		// 		) {
		// 			Alert.alert(Strings.biometricAccess, '', [
		// 				{
		// 					text: 'Open Settings',
		// 					onPress: () => openSettings()
		// 				},
		// 				{
		// 					text: 'Exit',
		// 					onPress: () => {
		// 						RNExitApp.exitApp();
		// 					},
		// 					style: 'destructive'
		// 				}
		// 			]);
		// 		}
		// 		FingerprintScanner.release();
		// 	});
	};

	// useEffect(() => {
	//   const subscription = AppState.addEventListener('change', nextAppState => {
	//     if (
	//       appState.current.match(/inactive|background/) &&
	//       nextAppState === 'active'
	//     ) {
	//       userInfo?.isBiometric && showAuthenticationDialog();
	//       console.log('App has come to the foreground!');
	//     }

	//     appState.current = nextAppState;
	//     setAppStateVisible(appState.current);
	//     console.log('AppState', appState.current);
	//   });
	//   return () => {
	//     subscription.remove();
	//   };
	// }, []);

	useEffect(() => {
		// dispatch(showTutorial({isShowTutorial: true}));
		// dispatch(showCreateHighlights({isShowCreateHighlights: true}));
		globalThis.firstTime = false;
		// detectFingerprintAvailable();
	}, []);

	useEffect(() => {
		// Splash.hide();

		const timeOut = setTimeout(() => {
			userInfo.token && !userInfo.isNewUser
				?  navigation.replace(ScreenNames.BottomTabScreen)
				: navigation.replace(ScreenNames.Login);
		}, 3000);
		return () => {
			clearTimeout(timeOut);
		};
	}, [navigation]);

	return (
		<AnimatedLinearGradient
			style={styles.container}
			customColors={theme.splashGradientColor}
			speed={5000}
			angle={178}>
			<View style={styles.textContainer}>
				{/* <Text style={styles.smallTextStyle}>{Strings.welcome}</Text>
        <View style={styles.spacerViewStyle} />
        <Text style={styles.largeTextStyle}>{Strings.defibetHouse}</Text> */}
				<ExpoFastImage
					source={icons.splash_text}
					resizeMode={'contain'}
					style={{width: 250, height: 250}}
				/>
			</View>
			{userInfo?.isBiometric ? (
				<TouchableOpacity
					style={styles.useBiometricStyle}
					onPress={() => {
						userInfo?.isBiometric && showAuthenticationDialog();
					}}>
					<Text style={styles.biometricTextStyle}>{Strings.use_Biometric}</Text>
				</TouchableOpacity>
			) : null}
		</AnimatedLinearGradient>
	);
};

export default SplashScreen;
