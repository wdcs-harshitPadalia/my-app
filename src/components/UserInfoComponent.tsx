/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	Text,
	ImageSourcePropType
} from 'react-native';
import {Badge} from 'react-native-elements/dist/badge/Badge';
import {Image} from 'react-native-elements/dist/image/Image';
import ExpoFastImage from 'expo-fast-image';
import {LinearGradient} from 'expo-linear-gradient';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';
import GradientText from './GradientText';

interface Props extends TextInputProps {
	activeBets?: string;
	followersCount?: string;
	followingCount?: string;
	createBtnText?: string;
	walletBtnText?: string;

	onActiveBetsPress?: () => void;
	onFollowersPress?: () => void;
	onFollowingPress?: () => void;
	onCreatePress?: () => void;
	onWalletPress?: () => void;
	isSendMsgShow?: boolean;
	isShowPlusIcon?: boolean;
	colorArray?: string[];
	walletBtnColorArray?: string[];
	onVideosBtnPress?: () => void;
	videosCount: number;
}

const UserInfoComponent: React.FC<Props> = props => {
	const {
		activeBets,
		followersCount,
		followingCount,
		onActiveBetsPress,
		onFollowersPress,
		onFollowingPress,
		onCreatePress,
		onWalletPress,
		colorArray,
		walletBtnText,
		createBtnText,
		isSendMsgShow,
		isShowPlusIcon,
		walletBtnColorArray,
		onVideosBtnPress,
		videosCount
	} = props;

	return (
		<View style={styles.container}>
			<View style={styles.viewRowStyle}>
				<TouchableOpacity
					onPress={onActiveBetsPress}
					style={styles.viewContainStyle}>
					<GradientText
						colors={defaultTheme.textGradientColor}
						style={styles.gradientText}>
						{activeBets}
					</GradientText>
					<Text style={styles.followingText}>{Strings.activeBets}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={onVideosBtnPress}
					style={[
						styles.viewContainStyle,
						{
							marginHorizontal: verticalScale(6)
						}
					]}>
					<Text style={styles.followingCountText}>{videosCount}</Text>
					<Text style={styles.followingText}>
						{videosCount <= 1 ? Strings.video : Strings.video + 's'}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={onFollowersPress}
					style={[
						styles.viewContainStyle,
						{
							marginRight: verticalScale(6),
							marginHorizontal: verticalScale(6)
						}
					]}>
					<Text style={styles.followingCountText}>{followersCount}</Text>
					<Text style={styles.followingText}>{Strings.followers}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={onFollowingPress}
					style={styles.viewContainStyle}>
					<Text style={styles.followingCountText}>{followingCount}</Text>
					<Text style={styles.followingText}>{Strings.following}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.viewSecondRowStyle}>
				<TouchableOpacity
					onPress={onCreatePress}
					style={styles.viewContainStyle}>
					<LinearGradient
						style={styles.circleGradient}
						useAngle={true}
						angle={gradientColorAngle}
						colors={colorArray}>
						{isShowPlusIcon && (
							<ExpoFastImage
								resizeMode={'contain'}
								source={icons.plusRound}
								style={styles.leftImg}
							/>
						)}

						<Text style={styles.inputStyle}>{createBtnText}</Text>
					</LinearGradient>
				</TouchableOpacity>
				{isSendMsgShow && (
					<TouchableOpacity
						onPress={onWalletPress}
						style={[
							styles.viewContainStyle,
							{
								marginLeft: verticalScale(6)
							}
						]}>
						<LinearGradient
							style={styles.circleGradient}
							useAngle={true}
							angle={gradientColorAngle}
							colors={walletBtnColorArray}>
							<Text style={styles.inputStyle}>{walletBtnText}</Text>
						</LinearGradient>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 20,
		overflow: 'hidden'
	},
	viewRowStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	viewSecondRowStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 60,
		marginTop: verticalScale(6)
	},
	viewContainStyle: {
		// flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		backgroundColor: colors.black,
		borderRadius: 6,
		justifyContent: 'center',
		paddingVertical: verticalScale(2)
	},
	viewBGStyle: {
		flexDirection: 'column',
		alignItems: 'center',
		flex: 1
	},
	gradientText: {
		fontSize: moderateScale(20),
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginRight: horizontalScale(4),
		color: colors.greenLight
	},
	followingText: {
		fontSize: moderateScale(10),
		fontFamily: Fonts.type.Inter_ExtraBold,
		color: colors.placeholderColor,
		marginTop: verticalScale(6),
		textAlign: 'center'
	},
	followingCountText: {
		fontSize: moderateScale(20),
		fontFamily: Fonts.type.Inter_ExtraBold,
		color: colors.white,
		marginRight: horizontalScale(4)
	},
	inputStyle: {
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Bold,
		textAlign: 'center',
		color: colors.white
	},
	circleGradient: {
		// flex: 1,
		height: '100%',
		width: '100%',
		borderRadius: 6,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	leftImg: {
		height: 25,
		width: 25,
		marginRight: verticalScale(20)
	}
});

export default UserInfoComponent;
