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
import {LinearGradient} from 'expo-linear-gradient';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import DropShadow from 'react-native-drop-shadow';
import {getLevelRank} from '../constants/utils/Function';
import {gradientColorAngle} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';

interface Props extends TextInputProps {
	onPress?: () => void;
	shouldShowCloseButton?: boolean;
	userName?: string;
	profilePic?: string;
	displayName?: string;
	onCloseButtonPress?: () => void;
	levelRank?: number;
	isShowFollow?: boolean;
	onFollow?: () => void;
	followUserData?: [];
	totalfollowers?: number;
}

const FollowersUserView: React.FC<Props> = props => {
	const {
		onPress,
		onFollow,
		shouldShowCloseButton,
		displayName,
		profilePic,
		userName,
		onCloseButtonPress,
		levelRank,
		isShowFollow,
		followUserData,
		totalfollowers
	} = props;

	return (
		<TouchableOpacity
			style={[{...props.style}, styles.container]}
			onPress={onPress}>
			{levelRank ? (
				<DropShadow style={styles.profileContainer}>
					<LinearGradient
						style={styles.circleGradient}
						useAngle={true}
						angle={gradientColorAngle}
						colors={defaultTheme.boarderGradientColor}>
						<View style={styles.viewImageStyle}>
							<ExpoFastImage
								style={styles.imgIconStyle}
								resizeMode="cover"
								source={{uri: profilePic}}
								// source={icons.appLogo}
							/>
						</View>
					</LinearGradient>
					<ExpoFastImage
						style={styles.viewBadgeStyle}
						resizeMode="contain"
						source={getLevelRank(levelRank)?.image}
					/>
				</DropShadow>
			) : (
				<ExpoFastImage
					style={styles.onlyImgIconStyle}
					resizeMode="cover"
					source={{uri: profilePic}}
					// source={icons.appLogo}
				/>
			)}

			<View style={styles.viewLabelContainer}>
				<Text style={styles.usernameStyle}>{userName}</Text>
				{followUserData?.length > 0 &&
					(totalfollowers > 1 ? (
						<Text style={styles.userTypeStyle}>
							{Strings.str_follow_user_account.replace(
								'%username',
								followUserData[0]?.following_user_display_name ||
									'@' + followUserData[0]?.following_user_username
							)}
							<Text style={styles.userTypeStyle} numberOfLines={2}>
								{Strings.str_follow_more_account.replace(
									'%count',
									totalfollowers - 1
								)}
							</Text>
						</Text>
					) : (
						<Text style={styles.userTypeStyle}>
							{Strings.str_follow_user_account.replace(
								'%username',
								followUserData[0]?.following_user_display_name ||
									'@' + followUserData[0]?.following_user_username
							)}
							<Text style={styles.userTypeStyle} numberOfLines={2}>
								{Strings.str_follow_account}
							</Text>
						</Text>
					))}

				{displayName ? (
					<Text style={styles.userTypeStyle}>{displayName}</Text>
				) : null}
			</View>
			{shouldShowCloseButton && (
				<TouchableOpacity onPress={onCloseButtonPress}>
					<ExpoFastImage style={{height: 15, width: 15}} source={icons.close} />
				</TouchableOpacity>
			)}
			{isShowFollow && (
				<ButtonGradient
					onPress={onFollow}
					colorArray={defaultTheme.primaryGradientColor}
					angle={gradientColorAngle}
					buttonTextcolor={colors.white}
					buttonText={Strings.follow}
					style={styles.leftButtonStyle}
					paddingVertical={10}
				/>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingVertical: verticalScale(10),
		paddingHorizontal: verticalScale(8)
	},
	profileContainer: {
		shadowColor: colors.greenLight,
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowOpacity: 0.5,
		elevation: 3,
		shadowRadius: 3,
		...Platform.select({
			web: {
				borderRadius: 23
			}
		})
	},
	viewImageStyle: {
		width: 46,
		height: 46,
		borderRadius: 23,
		borderColor: 'rgba(0,0, 0, 0.5)',
		borderWidth: 3,
		margin: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imgIconStyle: {
		width: 40,
		height: 40,
		borderRadius: 20
	},
	onlyImgIconStyle: {
		width: 46,
		height: 46,
		borderRadius: 23
	},
	viewBadgeStyle: {
		width: 30,
		height: 30,
		right: -10,
		position: 'absolute'
	},

	circleGradient: {
		width: 50,
		height: 50,
		borderRadius: 25
	},
	viewLabelContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'baseline',
		justifyContent: 'center',
		paddingLeft: verticalScale(20)
	},
	usernameStyle: {
		fontSize: moderateScale(10),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular
	},

	userTypeStyle: {
		marginTop: verticalScale(4),
		fontSize: moderateScale(10),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Krona_Regular
	},
	leftButtonStyle: {
		height: verticalScale(36),
		flex: 0.4,
		marginLeft: verticalScale(4)
	}
});

export default FollowersUserView;
