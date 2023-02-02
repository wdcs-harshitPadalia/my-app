import React, {useEffect, useMemo} from 'react';
import {
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	ImageSourcePropType,
	Text,
	View
} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import DynamicButtonGradient from './DynamicButtonGradient';
import ButtonGradient from './ButtonGradient';
import Strings from '../constants/strings';
import {gradientColorAngle} from '../theme/metrics';
import {getRoundDecimalValue} from '../constants/utils/Function';

interface Props extends TextInputProps {
	userArray: any;
	desText?: string;
	userCount?: any;
	colorArray?: string[];
	angle?: number;
	onLeftButtonPress?: () => void;
	onRightButtonPress?: () => void;
	shouldShowBottomButtons?: boolean;
	shouldShowCloseButton?: Boolean;
	showWatchButton?: Boolean;
	rightBtnText?: string;
	rightBtnTextColorArray?: [];
	onWatchButtonClicked?: Function;
	onCloseButtonPress?: () => void;
	onPressViewAll?: () => void;
	userID?: string;
	isCustomBet?: boolean;
	volume?: string;
	openbet?: number;
	isCallFromSuggestedUser?: boolean;
	prefixText?: string;
	isFromLive?: boolean;
	isFromLiveDiscover?: boolean;
}

const UserGroupView: React.FC<Props> = props => {
	const {
		userArray,
		desText,
		userCount,
		colorArray,
		angle,
		showWatchButton,
		onLeftButtonPress,
		onRightButtonPress,
		shouldShowBottomButtons,
		shouldShowCloseButton,
		rightBtnText,
		rightBtnTextColorArray,
		onWatchButtonClicked,
		onCloseButtonPress,
		onPressViewAll,
		userID,
		isCustomBet,
		openbet,
		volume,
		isCallFromSuggestedUser,
		prefixText,
		isFromLive,
		isFromLiveDiscover
	} = props;

	// const getUsersName = () => {
	//   let userName = '';
	//   userArray.map((item, index) => {
	//     if (index === 0) {
	//       userName = item.userName;
	//     } else {
	//       userName = userName + ', ' + item.userName;
	//     }
	//   });
	//   return userName;
	// };

	const getUsersName = useMemo(() => {
		let userName = '';
		userArray?.map((item, index) => {
			if (item?._id === userID) {
				if (index === 0) {
					userName = 'You';
				} else {
					userName = userName + ', ' + 'you';
				}
			} else {
				if (index === 0 || isCallFromSuggestedUser) {
					userName =
						item?.userName ??
						(item?.following_user_display_name ||
							'@' + item?.following_user_username);
				} else {
					userName =
						userName + ', ' + item?.userName ??
						(item?.following_user_display_name ||
							'@' + item?.following_user_username);
				}
			}
		});

		return userName;
	}, [userArray]);

	if (!userArray?.length) {
		return (
			<View style={styles.container}>
				<LinearGradient
					style={styles.circleGradient}
					useAngle={true}
					angle={angle ? angle : gradientColorAngle}
					colors={colorArray}>
					<View style={styles.parentView}>
						<TouchableOpacity
							activeOpacity={0.9}
							onPress={onPressViewAll}
							style={{alignItems: 'flex-end'}}>
							{showWatchButton ? (
								<ButtonGradient
									style={{
										width: '100%'
									}}
									buttonText={rightBtnText ?? 'Watch'}
									buttonTextcolor={colors.white}
									onPress={onWatchButtonClicked}
									colorArray={
										rightBtnTextColorArray ?? defaultTheme.textGradientColor
									}
								/>
							) : (
								<TouchableOpacity onPress={onCloseButtonPress}>
									{shouldShowCloseButton && (
										<ExpoFastImage
											style={styles.btnClose}
											source={icons.closeBlack}
											// resizeMode={'cover'}
										/>
									)}
								</TouchableOpacity>
							)}
						</TouchableOpacity>
						{shouldShowBottomButtons && (
							<>
								<View style={styles.totalVolumeView}>
									<View style={styles.usersView}>
										<Text style={styles.totalVolumeViewText(colors.textTitle)}>
											{Strings.total_volume.toUpperCase() + ' '}
										</Text>
										<Text style={styles.totalVolumeViewText(colors.white)}>
											{getRoundDecimalValue(volume) + ' ' + Strings.us_dollar}
										</Text>
									</View>

									<View style={styles.usersView}>
										<Text style={styles.totalVolumeViewText(colors.textTitle)}>
											{Strings.open_bets.toUpperCase() + ' '}
										</Text>
										<Text style={styles.totalVolumeViewText(colors.white)}>
											{openbet}
										</Text>
									</View>
								</View>

								<View style={styles.bottomButtonsView}>
									<ButtonGradient
										style={styles.bottomButtonFirst}
										buttonText={Strings.discover_bets}
										buttonTextcolor={colors.white}
										paddingVertical={8}
										onPress={onLeftButtonPress}
										textSize={12}
										colorArray={[
											defaultTheme.backGroundColor,
											defaultTheme.backGroundColor
										]}
									/>

									<ButtonGradient
										style={styles.bottomButtonSecond}
										buttonText={
											isCustomBet ? Strings.replicate_bet : Strings.create_bet
										}
										buttonTextcolor={colors.white}
										paddingVertical={8}
										onPress={onRightButtonPress}
										textSize={12}
										colorArray={defaultTheme.primaryGradientColor}
									/>
								</View>
							</>
						)}
					</View>

					{/* ) : null} */}
				</LinearGradient>
			</View>
		);
	} else {
		return (
			<View style={[styles.container, {...props.style}]}>
				<LinearGradient
					style={[
						styles.circleGradient,
						{padding: isFromLiveDiscover ? 0 : verticalScale(8)}
					]}
					useAngle={true}
					angle={angle ? angle : gradientColorAngle}
					colors={colorArray}>
					<View style={styles.parentView}>
						<TouchableOpacity
							activeOpacity={0.9}
							onPress={onPressViewAll}
							style={[
								styles.childView,
								{margin: isFromLiveDiscover ? 0 : verticalScale(8)}
							]}>
							{userArray?.length > 0 && (
								<ExpoFastImage
									resizeMode={'cover'}
									source={{
										uri:
											userArray[0]?.picture ??
											userArray[0]?.following_profile_picture
									}}
									style={styles.left1Img}
								/>
							)}

							{userArray?.length > 1 && (
								<ExpoFastImage
									resizeMode={'cover'}
									source={{
										uri:
											userArray[1]?.picture ??
											userArray[1]?.following_profile_picture
									}}
									style={styles.left2Img}
								/>
							)}

							{userArray?.length > 2 && (
								<ExpoFastImage
									resizeMode={'cover'}
									source={{
										uri:
											userArray[2]?.picture ??
											userArray[2]?.following_profile_picture
									}}
									style={styles.left3Img}
								/>
							)}

							<View
								style={
									userArray?.length === 1
										? styles.acceptArraysTextViewStyle
										: styles.acceptTextViewStyle
								}>
								<Text numberOfLines={2}>
									<Text style={styles.userNameStyle}>{getUsersName}</Text>
									{userCount > 0 ? (
										<>
											<Text
												style={[
													styles.andLabelStyle,
													isFromLiveDiscover
														? {fontFamily: Fonts.type.Inter_Regular}
														: {}
												]}>
												{' and '}
											</Text>
											<Text
												style={[
													styles.userNameStyle,
													isFromLiveDiscover
														? {fontFamily: Fonts.type.Inter_Regular}
														: {}
												]}>{`${userCount}  more`}</Text>
										</>
									) : null}
									{desText ? (
										<Text
											style={[
												styles.andLabelStyle,
												!desText?.includes('visited')
													? {}
													: {fontFamily: Fonts.type.Inter_Regular}
											]}>
											{desText}
										</Text>
									) : (
										<Text
											style={[
												styles.andLabelStyle,
												isFromLiveDiscover
													? {fontFamily: Fonts.type.Inter_Regular}
													: {}
											]}>
											{`${
												!userCount
													? getUsersName === 'You'
														? ' are'
														: ' is'
													: ' are'
											} ${
												isFromLive
													? Strings.watching
													: Strings.betting_on_this_event
											} `}
										</Text>
									)}
								</Text>
							</View>

							{/* {leftIconPath !== undefined ? ( */}
							{shouldShowCloseButton && (
								<TouchableOpacity onPress={onCloseButtonPress}>
									<ExpoFastImage
										style={styles.btnClose}
										source={icons.closeBlack}
										// resizeMode={'cover'}
									/>
								</TouchableOpacity>
							)}
						</TouchableOpacity>

						{showWatchButton && (
							<ButtonGradient
								style={{width: '100%'}}
								buttonText={rightBtnText ?? 'Watch'}
								buttonTextcolor={colors.white}
								onPress={onWatchButtonClicked}
								colorArray={
									rightBtnTextColorArray ?? defaultTheme.textGradientColor
								}
							/>
						)}

						{shouldShowBottomButtons && (
							<>
								<View style={styles.totalVolumeView}>
									<View style={styles.usersView}>
										<Text style={styles.totalVolumeViewText(colors.textTitle)}>
											{Strings.total_volume.toUpperCase() + ' '}
										</Text>
										<Text style={styles.totalVolumeViewText(colors.white)}>
											{getRoundDecimalValue(volume) + ' ' + Strings.us_dollar}
										</Text>
									</View>

									<View style={styles.usersView}>
										<Text style={styles.totalVolumeViewText(colors.textTitle)}>
											{Strings.open_bets.toUpperCase() + ' '}
										</Text>
										<Text style={styles.totalVolumeViewText(colors.white)}>
											{openbet}
										</Text>
									</View>
								</View>

								<View style={styles.bottomButtonsView}>
									<ButtonGradient
										style={styles.bottomButtonFirst}
										buttonText={Strings.discover_bets}
										buttonTextcolor={colors.white}
										paddingVertical={8}
										onPress={onLeftButtonPress}
										textSize={12}
										colorArray={[
											defaultTheme.backGroundColor,
											defaultTheme.backGroundColor
										]}
									/>

									<ButtonGradient
										style={styles.bottomButtonSecond}
										buttonText={
											isCustomBet ? Strings.replicate_bet : Strings.create_bet
										}
										buttonTextcolor={colors.white}
										paddingVertical={8}
										onPress={onRightButtonPress}
										textSize={12}
										colorArray={defaultTheme.primaryGradientColor}
									/>
								</View>
							</>
						)}
					</View>

					{/* ) : null} */}
				</LinearGradient>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		//flexDirection: 'row',
		alignItems: 'center',
		borderRadius: verticalScale(8)
		//overflow: 'hidden',
		//flex: 1
	},

	bottomButtonFirst: {marginRight: verticalScale(12), flex: 1},
	bottomButtonSecond: {flex: 1},
	bottomButtonsView: {flexDirection: 'row', justifyContent: 'space-between'},
	parentView: {
		flexDirection: 'column',
		flex: 1,
		alignSelf: 'center',
		justifyContent: 'space-between'
	},
	childView: {
		flexDirection: 'row',
		margin: moderateScale(8),
		alignItems: 'center'
	},

	circleGradient: {
		width: '100%',
		//height: verticalScale(60),
		//borderRadius: verticalScale(8),
		alignItems: 'center',
		flexDirection: 'row',
		padding: moderateScale(8)
	},
	left1Img: {
		height: 26,
		width: 26,
		// marginLeft: verticalScale(20),
		borderRadius: 13
	},
	left2Img: {
		height: 26,
		width: 26,
		borderRadius: 13,
		left: verticalScale(-13)
	},
	left3Img: {
		height: 26,
		width: 26,
		borderRadius: 13,
		left: verticalScale(-26),
		marginRight: -16
	},
	btnClose: {
		height: 26,
		width: 26,
		borderRadius: 13,
		marginLeft: moderateScale(4)
		//marginHorizontal: verticalScale(12),
	},
	userNameStyle: {
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_ExtraBold
	},
	andLabelStyle: {
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_Bold
	},
	acceptTextViewStyle: {
		flex: 1,
		// marginLeft: -4,
		justifyContent: 'center'
	},
	acceptArraysTextViewStyle: {
		flex: 1,
		marginLeft: 8,
		justifyContent: 'center'
	},
	totalVolumeView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: colors.blackGray,
		paddingHorizontal: moderateScale(25),
		paddingVertical: verticalScale(7),
		marginBottom: verticalScale(10),
		borderRadius: verticalScale(8)
	},
	usersView: {
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	totalVolumeViewText: (color: string) => ({
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		color: color
	})
});

export default UserGroupView;
