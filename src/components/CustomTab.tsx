import React, {useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';
import {useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import Strings from '../constants/strings';
import {getLevelRank} from '../constants/utils/Function';
import {RootState} from '../redux/store';
import {horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import fonts from '../theme/fonts';
import ConformationPopupComponet from './ConformationPopupComponet';
import ScreenNames from '../navigation/screenNames';
import SelectImageComponet from './SelectImageComponet';
// import {openSettings, PERMISSIONS, req} from 'expo-permissions';
import * as ImagePicker from 'react-native-image-picker';
import {videoMaximumDuration} from '../constants/api';

/*
const customBadgeView = props => {
  const userInfo = useSelector((state1: RootState) => {
    return state1.userInfo.data;
  });
  return (
    <View style={styles().badgeStyle}>
      <Image
        resizeMode={'contain'}
        source={getLevelRank(userInfo?.user?.level)?.image}
        style={[styles().badgeImageStyle]}
      />
    </View>
  );
};
*/

const CustomeBadge = props => {
	const userInfo = useSelector((state1: RootState) => {
		return state1.userInfo.data;
	});

	const {label, isFocused} = props;

	return (
		<View style={styles().badgeStyle}>
			<Image
				resizeMode={label === Strings.bottomTabProfile ? 'cover' : 'contain'}
				source={getLevelRank(userInfo?.user?.level)?.image}
				style={[
					label === Strings.bottomTabProfile && isFocused
						? styles().badgeImageWithBorderStyle
						: styles().badgeImageStyle
				]}
			/>
		</View>
	);
};

export const CustomTabBar = ({state, descriptors, navigation}) => {
	const focusedOptions = descriptors[state.routes[state.index].key].options;

	const routeName = state.routes ? state.routes[state.index] : '';
	//console.log('routeName????', routeName);
	// if (focusedOptions.tabBarVisible === false || routeName?.state?.index) {
	//   return <></>;
	// }
	const userInfo = useSelector((state1: RootState) => {
		return state1.userInfo.data;
	});

	const isShowTutorial = useSelector((state1: RootState) => {
		return state1.dashboard.isShowTutorial;
	});

	const isShowCreateHighlights = useSelector((state1: RootState) => {
		return state1.dashboard.isShowCreateHighlights;
	});

	const isHideBottomTab = useSelector((state2: RootState) => {
		return state2.dashboard.isHideBottomTab;
	});

	let hasNotch = DeviceInfo.hasNotch();

	const pickVideoRef = React.useRef();

	const [modalVisible, setModalVisible] = useState(false);
	const [isMediaTypeVisible, setIsMediaTypeVisible] = useState(false);

	const pickVideoFromGallery = async () => {
		setTimeout(() => {
			if (Platform.OS === 'web') {
				pickVideoRef.current.click(function () {
					changeHandler();
				});
			} else {
				ImagePicker.launchImageLibrary(
					{
						mediaType: 'video',
						includeBase64: true,
						maxHeight: 800,
						maxWidth: 800,
						videoQuality: 'medium'
					},
					async response => {
						console.log({response});
						setIsMediaTypeVisible(false);
						if (response.didCancel) {
							console.log(' Photo picker didCancel');
						} else if (response.error) {
							console.log('ImagePicker Error: ', response.error);
						} else {
							//checkVideoValidation(response?.assets[0]);
						}
					}
				);
			}
		}, 200);
	};

	const changeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsMediaTypeVisible(false);

		if (!event.target.files) {
			return;
		}
		// sendImageMessage(event.target.files[0])
		// let blobURL = URL.createObjectURL(
		// 	event.target.files[0] ? URL.createObjectURL(event.target.files[0]) : 'default.mp4'
		// );

		// const videoMetaData = await getVideoDuration(event.target.files[0]);
		// console.log(videoMetaData.src, 'dslklskdlk<>>');
		// navigation.navigate(ScreenNames.MediaPage, {
		// 	path: duration.src,
		// 	type:  event.target.files[0].type,
		// 	from: 'launchImageLibrary'
		// });

		if (event.target.files[0].type) {
			navigation.navigate(ScreenNames.MediaPage, {
				path: event.target.files[0],
				type: event.target.files[0].type,
				from: 'launchImageLibrary'
			});
			// navigation.navigate(ScreenNames.VideoCreationScreen, {
			// 	path: event.target.files[0],
			// 	type: event.target.files[0].type,
			// 	from: 'launchImageLibrary'
			// });
		}
	};

	// const checkVideoValidation = async responseData => {
	// 	const {type, fileName, fileSize, duration, uri} = responseData;

	// 	if (type === 'video/mp4') {
	// 		if (parseInt(duration) > videoMaximumDuration) {
	// 			Alert.alert(Strings.upload_video_15s);
	// 		} else {
	// 			navigation.navigate(ScreenNames.MediaPage, {
	// 				path: uri,
	// 				type: type,
	// 				from: 'launchImageLibrary'
	// 			});
	// 		}
	// 	}
	// };
	// const checkCameraPermissions = async () => {
	// 	let reqPermission = await request(
	// 		Platform.OS === 'android'
	// 			? PERMISSIONS.ANDROID.CAMERA
	// 			: PERMISSIONS.IOS.CAMERA
	// 	);
	// 	if (reqPermission === 'granted') {
	// 		checkMicrophonePermissions();
	// 	} else {
	// 		Alert.alert('Alert', Strings.cameraAccess, [
	// 			{
	// 				text: 'Open Settings',
	// 				onPress: () => openSettings(),
	// 				style: 'destructive'
	// 			},
	// 			{
	// 				text: 'Cancel',
	// 				onPress: () => console.log('Cancel Pressed')
	// 			}
	// 		]);
	// 	}
	// 	console.log(reqPermission);
	// };

	// const checkMicrophonePermissions = async () => {
	// 	let reqPermission = await request(
	// 		Platform.OS === 'android'
	// 			? PERMISSIONS.ANDROID.RECORD_AUDIO
	// 			: PERMISSIONS.IOS.MICROPHONE
	// 	);
	// 	if (reqPermission === 'granted') {
	// 		setIsMediaTypeVisible(false);
	// 		navigation.navigate(ScreenNames.CameraPage);
	// 	} else {
	// 		Alert.alert('Alert', Strings.audioAccess, [
	// 			{
	// 				text: 'Open Settings',
	// 				onPress: () => openSettings(),
	// 				style: 'destructive'
	// 			},
	// 			{
	// 				text: 'Cancel',
	// 				onPress: () => console.log('Cancel Pressed')
	// 			}
	// 		]);
	// 	}
	// 	console.log('reqPermission', reqPermission);
	// };

	return (
		<LinearGradient
			colors={['rgba(38, 38, 38, 0)', 'rgba(0, 0, 0, 0.8)']}
			// useAngle={true}
			// angle={gradientColorAngle}
			style={
				focusedOptions.tabBarVisible === false ||
				routeName?.state?.index ||
				isHideBottomTab
					? {display: 'none'}
					: {
							paddingTop: verticalScale(0),
							// paddingBottom:
							//     Platform.OS === 'ios'
							//       ? hasNotch
							//         ? verticalScale(20)
							//         : verticalScale(16)
							//       : verticalScale(20),
							paddingHorizontal: horizontalScale(8),
							position: 'absolute',
							bottom: 0,
							left: 0,
							right: 0,
							overflow: 'visible'
					  }
			}>
			<View
				style={
					focusedOptions.tabBarVisible === false || routeName?.state?.index
						? {display: 'none'}
						: styles({
								hasNotch: hasNotch
						  }).container
				}>
				{state.routes.map((route, index) => {
					const {options} = descriptors[route.key];
					const label =
						options.tabBarLabel !== undefined
							? options.tabBarLabel
							: options.title !== undefined
							? options.title
							: route.name;

					const isFocused =
						(isShowCreateHighlights ? 2 : state.index) === index;

					const onPress = () => {
						// if (isShowTutorial) {
						// 	return;
						// }
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true
						});

						if (!isFocused && !event.defaultPrevented) {
							if (label === Strings.bottomTabCreate) {
								setModalVisible(true);
							} else {
								navigation.navigate(route.name);
							}
						}
					};

					const onLongPress = () => {
						navigation.emit({
							type: 'tabLongPress',
							target: route.key
						});
					};

					return (
						<TouchableOpacity
							activeOpacity={isShowTutorial && isFocused ? 1 : 0}
							key={route.key}
							accessibilityRole="button"
							accessibilityState={isFocused ? {selected: true} : {}}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							testID={options.tabBarTestID}
							onPress={onPress}
							onLongPress={onLongPress}
							style={styles().tabViewContainer}>
							<View
								style={[
									label === Strings.bottomTabProfile && isFocused
										? styles().containerWithShadow
										: styles().containerWithOutShadow,
									{
										justifyContent: 'center',
										alignItems: 'center',
										opacity: isFocused ? 1 : isShowTutorial ? 0.05 : 1
									}
								]}>
								{label === Strings.bottomTabCreate ? (
									<View
										style={{
											position: 'absolute',
											bottom: 0
										}}>
										<Image
											resizeMode={'contain'}
											source={options.selectedIconName}
											style={styles().imageCreateBetStyle}
										/>
									</View>
								) : (
									<Image
										resizeMode={
											label === Strings.bottomTabProfile ? 'cover' : 'contain'
										}
										source={
											label === Strings.bottomTabProfile
												? {uri: userInfo?.user?.picture}
												: isFocused
												? options.selectedIconName
												: options.unSelectedIconName
										}
										style={[
											label === Strings.bottomTabProfile && isFocused
												? styles().imageWithBorderStyle
												: styles().imageStyle
										]}
									/>
								)}
							</View>

							{options.badgeIconName && (
								// <Badge
								//   // status="success"
								//   containerStyle={styles().badgeStyle}
								//   Component={customBadgeView}
								// />
								<View
									style={{
										position: 'absolute',
										top: 0,
										right: 0,
										opacity: isShowTutorial && isFocused ? 1 : 0.05
									}}>
									<CustomeBadge label={label} isFocused={isFocused} />
								</View>
							)}
							<Text
								style={
									styles({
										color: !isFocused
											? isShowTutorial
												? colors.blackFour
												: colors.lightOrange
											: colors.white,
										fontFamily: !isFocused
											? fonts.type.Inter_Regular
											: fonts.type.Inter_Bold,
										// marginLeft: label === Strings.live ? -12 : 0,
										marginLeft: 0
									}).bottomTextStyle
								}>
								{/* {label === Strings.live ? ' ' + label : '' + label} */}
								{label}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>

			<ConformationPopupComponet
				popupTitle={Strings.whatDoYouWantToCreate}
				buttonOkTitle={Strings.p2pBet}
				isVisible={modalVisible}
				onPressOk={() => {
					setModalVisible(!modalVisible);
					navigation.navigate(ScreenNames.BetsCategoryScreen);
				}}
				onPressCancel={() => {
					setModalVisible(!modalVisible);
				}}
				isShowSecondButton={true}
				onPressSecondButton={() => {
					setModalVisible(!modalVisible);
					setIsMediaTypeVisible(true);
				}}
			/>
			<SelectImageComponet
				isVisible={isMediaTypeVisible}
				setIsVisible={setIsMediaTypeVisible}
				onPressGallery={pickVideoFromGallery}
				onPressCamera={() =>
					Platform.OS === 'web'
						? pickVideoFromGallery()
						: navigation.navigate(ScreenNames.CameraPage)
				}
				isHideAvatar={true}
			/>
			<View style={{opacity: 0}}>
				<input
					ref={pickVideoRef}
					id="input"
					type="file"
					name="file"
					accept="video/*"
					onChange={changeHandler}
				/>
			</View>
		</LinearGradient>
	);
};

const styles = (
	props = {color: '', fontFamily: '', marginLeft: 0, hasNotch: false}
) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			backgroundColor: colors.blackTransparent,
			paddingVertical: verticalScale(20),
			paddingHorizontal: horizontalScale(8),
			//paddingTop: verticalScale(24),
			// position: 'absolute',
			borderRadius: 20,
			...Platform.select({
				ios: {
					marginBottom: props.hasNotch ? verticalScale(20) : verticalScale(16)
				},
				android: {
					marginBottom: verticalScale(20)
				}
			}),
			// left: 8,
			// right: 8,
		},
		tabViewContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
			//backgroundColor: colors.black,
		},
		bottomTextStyle: {
			color: props.color,
			textAlign: 'center',
			fontFamily: props.fontFamily,
			fontSize: moderateScale(12),
			paddingTop: 6,
			marginLeft: horizontalScale(props.marginLeft)
		},
		badgeStyle: {
			position: 'absolute',
			top: -6,
			right: 12
			// backgroundColor: 'red',
		},
		imageCreateBetStyle: {
			height: 60,
			width: 60,
			borderRadius: 30
		},
		imageStyle: {
			height: 30,
			width: 30,
			borderRadius: 15
		},
		imageWithBorderStyle: {
			height: 30,
			width: 30,
			borderRadius: 15,
			borderWidth: 2,
			borderColor: colors.white
		},
		badgeImageStyle: {
			height: 20,
			width: 20,
			borderRadius: 10
		},
		badgeImageWithBorderStyle: {
			height: 20,
			width: 20,
			borderRadius: 10,
			borderWidth: 2,
			borderColor: colors.white
		},
		containerWithShadow: {
			shadowColor: colors.greenLight,
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowOpacity: 0.8,
			elevation: 3,
			shadowRadius: 5,
			...Platform.select({
				web: {
					height: 26.22,
					width: 32,
					borderRadius: 16
				},
				ios: {
					height: 26.22,
					width: 40
				},
				android: {
					height: 26.22,
					width: 40
				}
			})
		},
		containerWithOutShadow: {
			shadowColor: colors.black,
			shadowOffset: {
				width: 0,
				height: 5
			},
			shadowOpacity: 0.9,
			elevation: 5,
			height: 26.22,
			width: 40
		}
	});
