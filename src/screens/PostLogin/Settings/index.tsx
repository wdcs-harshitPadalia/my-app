/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {Alert, Image, Platform, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import icons from '../../../assets/icon';
import Strings from '../../../constants/strings';
import styles from './style';
import HeaderComponent from '../../../components/HeaderComponent';
import SwichView from '../../../components/SwichView';
import {
	useIsFocused,
	useNavigation,
	useScrollToTop
} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../theme/colors';
import {
	editProfile,
	getAllContacts,
	logout
} from '../../../redux/apiHandler/apiActions';
// import {openSettings, PERMISSIONS, request} from 'react-native-permissions';
import {
	resetProfileData,
	updateBiometric,
	updateDeviceToken,
	updateSyncContact
} from '../../../redux/reducerSlices/userInfo';
// import FingerprintScanner from 'react-native-fingerprint-scanner';
import useUpdateEffect from '../../../components/CustomHooks/useUpdateEffect';
import ButtonGradient from '../../../components/ButtonGradient';
import {defaultTheme} from '../../../theme/defaultTheme';
import {magic} from '../../../navigation/routes';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {
	gradientColorAngle,
	horizontalScale,
	moderateFontScale,
	verticalScale
} from '../../../theme/metrics';
import {Fonts} from '../../../theme';
import ScreenNames from '../../../navigation/screenNames';
import {useBetCreateContract} from '../../../components/CustomHooks/SmartContract';
import {RootState} from '../../../redux/store';
import {clearContacts} from '../../../redux/reducerSlices/contactsData';
import DropDownGradientView from '../../../components/DropDownGradientView';
import {ScrollView} from 'react-native-gesture-handler';

const SettingsScreen: React.FC<any> = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const isFocused = useIsFocused();

	const scrollRef = useRef(null);
	useScrollToTop(scrollRef);

	const connector = useWalletConnect();

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const [isDispute, setIsDispute] = useState(userInfo?.user?.isJury);

	const [isBiometric, setIsBiometric] = useState(userInfo?.isBiometric);

	const [isSyncEnable, setIsSyncEnable] = useState(userInfo?.isSyncContact);

	const [biometryType, setBiometryType] = useState();

	const [isNotificationEnabled, setIsNotificationEnabled] = useState(
		userInfo?.user?.push_notifications?.pause_all_notifications
	);

	const {userInitialStake, isJury, juryDbethToken} =
		useBetCreateContract(false);

	useEffect(() => {
		if (isFocused) {
			userInitialStake();
		}
	}, [isFocused]);

	// useUpdateEffect(() => {
	//   if (contactsShowLoading) {
	//     dispatch(
	//       updateApiLoader({
	//         apiLoader: true,
	//         showAlertWithText: Strings.we_re_syncing_your_contacts,
	//       }),
	//     );
	//   } else {
	//     Alert.alert('', Strings.your_contacts_have_been_synced_successfully);
	//     dispatch(
	//       updateApiLoader({
	//         apiLoader: false,
	//       }),
	//     );
	//   }
	// }, [contactsShowLoading]);

	useEffect(() => {
		if (isFocused) {
			userInitialStake();
		}
	}, [isFocused]);

	useUpdateEffect(() => {
		if (isJury && !userInfo?.user?.isJury) {
			const requestObject = {
				isJury: true,
				juryEscrowDeposit: juryDbethToken,
				juryEscrowContractAddress: 'ox'
			};
			dispatch(editProfile(requestObject));
		}
	}, [isJury]);

	useUpdateEffect(() => {
		const requestObject = {
			push_notifications: {
				...userInfo?.user?.push_notifications,
				...{pause_all_notifications: isNotificationEnabled}
			}
		};
		dispatch(editProfile(requestObject));
	}, [isNotificationEnabled]);

	const toggleSwitch = (type: string) => {
		if (type === 'disputes') {
			// setIsDispute(previousState => !previousState);
			if (userInfo?.user?.isJury) {
				// eslint-disable-next-line
				navigation.navigate(ScreenNames.RecoverFundsScreen, {});
			} else {
				// eslint-disable-next-line
				navigation.navigate(ScreenNames.JuryIntroScreen, {});
			}
		} else if (type === 'biometric') {
			showAuthenticationDialog();
		} else if (type === 'sync_contacts') {
			setIsSyncEnable(!isSyncEnable);
		} else if (type === 'notification') {
			setIsNotificationEnabled(!isNotificationEnabled);
		}
	};

	useUpdateEffect(() => {
		setIsDispute(userInfo?.user?.isJury);
	}, [userInfo]);

	useEffect(() => {
		detectFingerprintAvailable();
	}, []);

	useUpdateEffect(() => {
		dispatch(updateBiometric(isBiometric));
	}, [isBiometric]);

	useUpdateEffect(() => {
		dispatch(updateSyncContact(isSyncEnable));

		if (isSyncEnable) {
			getContacts();
		} else {
			dispatch(clearContacts());
		}
	}, [isSyncEnable]);

	const detectFingerprintAvailable = () => {
		// FingerprintScanner.isSensorAvailable()
		// 	.then(biometry => {
		// 		setBiometryType(biometry);
		// 		FingerprintScanner.release();
		// 	})
		// 	.catch(() => {
		// 		FingerprintScanner.release();
		// 	});
	};

	const getMessage = () => {
		if (biometryType == 'Face ID') {
			return 'Scan your Face on the device to continue';
		} else {
			return 'Scan your Fingerprint on the device scanner to continue';
		}
	};

	const showAuthenticationDialog = () => {};

	const handleOnPressJuryArea = () => {
		navigation.navigate(ScreenNames.AfterJuryScreen, {});
	};
	const handleOnPressPushNotification = () => {
		navigation.navigate(ScreenNames.PushNotificationScreen, {});
	};

	const getContacts = async () => {
		// const reqPermission = await request(
		// 	Platform.OS === 'android'
		// 		? PERMISSIONS.ANDROID.READ_CONTACTS
		// 		: PERMISSIONS.IOS.CONTACTS
		// );
		// console.log('reqPermission :: ', reqPermission);
		// if (reqPermission === 'granted') {
		// 	dispatch(getAllContacts());
		// } else {
		// 	// Alert.alert('Alert', Strings.contactAccess, [
		// 	// 	{
		// 	// 		text: 'Open Settings',
		// 	// 		onPress: () => openSettings()
		// 	// 	},
		// 	// 	{
		// 	// 		text: 'Cancel',
		// 	// 		onPress: () => console.log('Cancel Pressed')
		// 	// 	}
		// 	// ]);
		// }
	};

	const handleLogout = async () => {
		// clearTimeout(global.tutorialTimer);
		// dispatch(logout());
		// dispatch(resetProfileData({}));
		// // await magic.user.logout();
		// // connector?.killSession();
		// dispatch(updateDeviceToken({ deviceToken: "" }));

		// magic.user.isLoggedIn().then((value) => {
		//   console.log(value, "magic.user.isLoggedIn()");
		// });
		if (Platform.OS === 'web') {
			let retVal = confirm(Strings.are_you_sure_you_want_to_logout);
			if (retVal == true) {
				clearTimeout(global.tutorialTimer);
				dispatch(logout());
				dispatch(resetProfileData({}));
				await magic.user.logout();
				connector?.killSession();
				magic.user.isLoggedIn().then(value => {
					console.log(value, 'magic.user.isLoggedIn()');
					dispatch(updateDeviceToken({deviceToken: ''}));
				});
				return true;
			} else {
				return false;
			}
		} else {
			Alert.alert('', Strings.are_you_sure_you_want_to_logout, [
				{
					text: Strings.yes,
					onPress: async () => {
						clearTimeout(global.tutorialTimer);
						dispatch(logout());
						dispatch(resetProfileData({}));
						await magic.user.logout();
						connector?.killSession();
						magic.user.isLoggedIn().then(value => {
							console.log(value, 'magic.user.isLoggedIn()');
							dispatch(updateDeviceToken({deviceToken: ''}));
						});
					},
					style: 'destructive'
				},
				{
					text: Strings.no,
					style: 'cancel'
				}
			]);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					onLeftIconPath={icons.back}
					name={Strings.settings}
				/>
				<ScrollView
					ref={scrollRef}
					//contentContainerStyle={{paddingBottom: 0}}
					// enableOnAndroid={false}
					bounces={false}>
					<View>
						{biometryType !== null && biometryType !== undefined && (
							<View style={styles.viewContain}>
								<Text style={styles.subTitleStyle}>
									{Strings.biometric_authentication}
								</Text>
								<SwichView
									toggleSwitch={() => toggleSwitch('biometric')}
									title={Strings.enable_biometric_id_to_open_defibet.toUpperCase()}
									isEnabled={isBiometric}
								/>
							</View>
						)}

						<View style={styles.viewReferralContain}>
							<DropDownGradientView
								onPress={() => {
									navigation.navigate(ScreenNames.ReferralProgramScreen);
								}}
								colorArray={[
									defaultTheme.secondaryBackGroundColor,
									defaultTheme.secondaryBackGroundColor
								]}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								buttonText={Strings.referral_program}
								style={styles.loginButtonSocial}
								rightIconPath={icons.leftGray}
							/>
						</View>
						<View style={styles.viewContain}>
							<Text style={styles.subTitleStyle}>{Strings.support}</Text>
							<DropDownGradientView
								onPress={() => {
									navigation.navigate(ScreenNames.SupportTicketsList, {
										isShowCreate: true
									});
								}}
								colorArray={[
									defaultTheme.secondaryBackGroundColor,
									defaultTheme.secondaryBackGroundColor
								]}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								buttonText={Strings.create_a_new_report}
								style={styles.loginButtonSocial}
								rightIconPath={icons.leftGray}
							/>
							<DropDownGradientView
								onPress={() => {
									navigation.navigate(ScreenNames.FaqScreen);
								}}
								colorArray={[
									defaultTheme.secondaryBackGroundColor,
									defaultTheme.secondaryBackGroundColor
								]}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								buttonText={Strings.frequent_asking_questions}
								style={styles.loginButtonSocial}
								rightIconPath={icons.leftGray}
							/>
						</View>

						<View style={styles.viewContain}>
							<Text style={styles.subTitleStyle}>{Strings.disputes}</Text>
							<SwichView
								toggleSwitch={() => toggleSwitch('disputes')}
								title={Strings.active.toUpperCase()}
								isEnabled={isDispute}
							/>
							{isDispute ? (
								<>
									<TouchableOpacity
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginHorizontal: horizontalScale(16),
											marginTop: verticalScale(12)
										}}
										activeOpacity={0.6}
										onPress={handleOnPressJuryArea}>
										<Text
											style={{
												fontSize: moderateFontScale(12),
												color: colors.white,
												fontFamily: Fonts.type.Inter_Regular,
												fontWeight: '800',
												textTransform: 'uppercase'
											}}>
											{Strings.jury_area}
										</Text>
										<Image
											source={icons.arrowForward}
											style={{height: 18, width: 18}}
										/>
									</TouchableOpacity>
									{/* <TouchableOpacity
                  style={{
                    marginHorizontal: horizontalScale(16),
                    marginTop: verticalScale(12),
                  }}
                  activeOpacity={0.6}
                  onPress={handleOnPressRecoverFunds}>
                  <Text
                    style={{
                      fontSize: moderateFontScale(12),
                      color: colors.white,
                      fontFamily: Fonts.type.Inter_Regular,
                      fontWeight: '800',
                      textTransform: 'uppercase',
                    }}>
                    {Strings.recover_escrow_funds}
                  </Text>
                </TouchableOpacity> */}
								</>
							) : null}
						</View>

						<View style={styles.viewContain}>
							<Text style={styles.subTitleStyle}>{Strings.notifications}</Text>
							<SwichView
								toggleSwitch={() => toggleSwitch('notification')}
								title={Strings.pause_all}
								isEnabled={isNotificationEnabled}
							/>
							{!isNotificationEnabled ? (
								<>
									<TouchableOpacity
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginHorizontal: horizontalScale(16),
											marginTop: verticalScale(12)
										}}
										activeOpacity={0.6}
										onPress={handleOnPressPushNotification}>
										<Text
											style={{
												fontSize: moderateFontScale(12),
												color: colors.white,
												fontFamily: Fonts.type.Inter_Regular,
												fontWeight: '800',
												textTransform: 'uppercase'
											}}>
											{Strings.push_notification.toUpperCase()}
										</Text>
										<Image
											source={icons.arrowForward}
											style={{height: 18, width: 18}}
										/>
									</TouchableOpacity>
								</>
							) : null}
						</View>
						<View style={styles.viewSyncContact}>
							<SwichView
								toggleSwitch={() => toggleSwitch('sync_contacts')}
								title={Strings.sync_contacts.toUpperCase()}
								isEnabled={isSyncEnable}
							/>
						</View>
						<Text style={styles.connectTypeStyle}>
							{Strings.your_are_connected_with + ' '}
							<Text
								style={[
									styles.connectTypeStyle,
									{textTransform: 'capitalize'}
								]}>
								{userInfo?.user?.socialLoginType}
							</Text>
						</Text>
						<ButtonGradient
							onPress={handleLogout}
							colorArray={defaultTheme.ternaryGradientColor}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							buttonText={Strings.logOut}
							style={styles.marginInput}
						/>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default SettingsScreen;
