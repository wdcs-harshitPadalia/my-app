import React from 'react';
import {
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	Text,
	View,
	Platform
} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../theme';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import ButtonGradient from './ButtonGradient';
import {getLevelRank} from '../constants/utils/Function';
import {gradientColorAngle, horizontalScale, width} from '../theme/metrics';
import DropShadow from 'react-native-drop-shadow';
import UserGroupView from './UserGroupView';
import fonts from '../theme/fonts';

interface Props extends TextInputProps {
	style?: any;
	item?: any;
	onPress?: () => void;
	profileImgPath?: string;
	betsCount?: number;
	username?: string;
	onFollow?: () => void;
	onSendMessage?: () => void;
	onClosePress?: () => void;
	isShowDM?: boolean;
	isShowFollow?: boolean;
	levelRank?: number;
	shouldShowCloseButton?: boolean;
	followUserData?: [];
	totalfollowers?: number;
	totalfollowings?: number;
	isFromFeed?: boolean;
}

const cardWidth = width * 0.75;
const cardHeight = width * 0.8;

const FollowingUserView: React.FC<Props> = props => {
	const {
		item,
		onPress,
		profileImgPath,
		betsCount,
		username,
		onFollow,
		onSendMessage,
		onClosePress,
		isShowDM,
		isShowFollow,
		levelRank,
		shouldShowCloseButton,
		followUserData,
		totalfollowers,
		totalfollowings,
		isFromFeed
	} = props;

	const UserProfileComponent = () => {
		return (
			<DropShadow style={styles.profileContainer}>
				<TouchableOpacity onPress={onPress}>
					<ExpoFastImage
						style={styles.profileIcon}
						resizeMode="cover"
						source={{uri: profileImgPath}}
						//source={icons.appLogo}
					/>
				</TouchableOpacity>
				<View>
					<ExpoFastImage
						style={styles.profileBadge}
						resizeMode="contain"
						source={getLevelRank(levelRank)?.image}
					/>
				</View>
			</DropShadow>
		);
	};

	const CloseButtonContainer = () => {
		return (
			<>
				{shouldShowCloseButton && (
					<TouchableOpacity
						onPress={onClosePress}
						style={[styles.closeIconContainer, {opacity: 1.0}]}>
						<ExpoFastImage
							style={styles.closeIcon}
							source={icons.close}
							resizeMode={'contain'}
							// tintColor={colors.gray}
						/>
					</TouchableOpacity>
				)}
			</>
		);
	};

	const UserNameContainer = () => {
		return (
			<TouchableOpacity onPress={onPress}>
				<Text style={styles.usernameStyle} numberOfLines={1}>
					{username}
				</Text>
			</TouchableOpacity>
		);
	};

	const InnerLablesContainer = () => {
		return (
			<View style={styles.innnerLabelsContainer}>
				{betsCount > 0 && (
					<Text style={styles.labelCount}>
						{betsCount + '\n'}
						<Text style={styles.labelText}>
							{betsCount > 1 ? Strings.str_active_bets : Strings.str_active_bet}
						</Text>
					</Text>
				)}

				{totalfollowers > 0 && (
					<Text style={styles.labelCount}>
						{totalfollowers + '\n'}
						<Text style={styles.labelText}>
							{totalfollowers > 1 ? Strings.followers : Strings.str_follower}
						</Text>
					</Text>
				)}

				{totalfollowings > 0 && (
					<Text style={styles.labelCount}>
						{totalfollowings + '\n'}
						<Text style={styles.labelText}>
							{totalfollowings > 1 ? Strings.str_followings : Strings.following}
						</Text>
					</Text>
				)}
			</View>
		);
	};

	const ButtonContainer = () => {
		return (
			<View style={styles.buttonContainer}>
				{isShowFollow && (
					<ButtonGradient
						onPress={onFollow}
						colorArray={defaultTheme.primaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						buttonText={Strings.follow}
						style={styles.leftButtonStyle}
						textSize={11}
						paddingVertical={6}
						fontFamily={fonts.type.Inter_Medium}
					/>
				)}
				{isShowDM && (
					<ButtonGradient
						onPress={onSendMessage}
						colorArray={defaultTheme.ternaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						buttonText={Strings.sendDM}
						style={styles.rightButtonStyle}
						paddingVertical={10}
					/>
				)}
			</View>
		);
	};

	const BottomFollowersDetailsContainer = () => {
		return (
			<>
				{followUserData?.length > 0 && (
					<View style={styles.bottomFollewerDetailsContainer}>
						<UserGroupView
							onPressViewAll={() => {}}
							colorArray={defaultTheme.grayGredientColor}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							rightIcon={true}
							buttonText={Strings.login}
							style={styles.userGroupStyle}
							desText={Strings.str_follow_account}
							userArray={followUserData}
							userCount={'' + totalfollowers - 1}
							userID={''}
							isCallFromSuggestedUser={true}
						/>
					</View>
				)}
			</>
		);
	};

	return (
		<View
			style={[{...props.style}, styles.container, styles.dropShadowContainer]}>
			<UserProfileComponent />
			<CloseButtonContainer />

			<View style={styles.labelsContainer}>
				<View style={styles.buttonLabelsContainer}>
					<UserNameContainer />
					{isShowFollow && isFromFeed && (
						<ButtonGradient
							onPress={onFollow}
							colorArray={defaultTheme.primaryGradientColor}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							buttonText={Strings.follow}
							style={styles.leftButtonStyle}
							textSize={11}
							paddingVertical={6}
							fontFamily={fonts.type.Inter_Medium}
						/>
					)}
				</View>
				{betsCount > 0 || totalfollowers > 0 || totalfollowings > 0 ? (
					<InnerLablesContainer />
				) : null}
			</View>
			{!isFromFeed && <ButtonContainer />}

			<BottomFollowersDetailsContainer />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: cardWidth,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: defaultTheme.backGroundColor,
		borderRadius: verticalScale(10),
		margin: verticalScale(8),
		paddingTop: verticalScale(40),
		paddingHorizontal: verticalScale(4)
	},
	dropShadowContainer: {
		shadowColor: defaultTheme.secondaryBackGroundColor,
		shadowOffset: {
			width: 1,
			height: 1
		},
		shadowOpacity: 0.4,
		shadowRadius: 5,
		elevation: 5
	},
	profileContainer: {
		shadowColor: colors.greenLight,
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.8,
		shadowRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		...Platform.select({
			web: {
				borderRadius: 40
			}
		})
	},
	profileIcon: {
		width: 80,
		height: 80,
		borderRadius: 40
	},
	profileBadge: {
		width: 40,
		height: 40,
		top: -85,
		right: -55,
		position: 'absolute'
	},
	labelsContainer: {
		// flex: 1,
		flexDirection: 'column',
		alignItems: 'center'
	},
	usernameStyle: {
		fontSize: moderateScale(16),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginVertical: verticalScale(16),
		width: 150,
		textAlign: 'center',
		paddingHorizontal: horizontalScale(4)
	},
	innnerLabelsContainer: {
		flexDirection: 'row',
		marginBottom: verticalScale(16),
		justifyContent: 'center',
		alignItems: 'center'
	},
	txtBetCountStyle: {
		fontSize: moderateScale(10),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_Regular,
		marginTop: verticalScale(8),
		width: 140,
		textAlign: 'center'
	},

	labelCount: {
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_Medium,
		textAlign: 'center',
		marginHorizontal: horizontalScale(4)
	},
	labelText: {
		fontSize: moderateScale(10),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_Bold,
		// width: 150,
		textAlign: 'center',
		opacity: 0.8
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		// marginTop: verticalScale(16),
		marginBottom: verticalScale(16)
	},
	leftButtonStyle: {
		// height: verticalScale(30),
		...Platform.select({
			ios: {
				flex: 0.5
			},
			android: {
				flex: 0.5
			},
			web: {
				flex: 1
			}
		})
	},
	rightButtonStyle: {
		// height: verticalScale(30),
		marginLeft: verticalScale(16),
		flex: 0.5
	},
	closeIconContainer: {color: 'red', top: 20, right: 20, position: 'absolute'},
	closeIcon: {
		width: 16,
		height: 16
	},
	userGroupStyle: {
		marginTop: verticalScale(16),
		overflow: 'visible'
	},

	bottomFollewerDetailsContainer: {
		width: cardWidth,
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
		overflow: 'hidden'
	},
	buttonLabelsContainer: {
		flexDirection: 'row',
		//marginVertical: verticalScale(10),
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default FollowingUserView;
