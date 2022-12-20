import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Text,
	TouchableOpacity,
	Platform,
	ViewStyle
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import Strings from '../constants/strings';

import {Fonts, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle, horizontalScale, width} from '../theme/metrics';
import ButtonBorderGradient from './ButtonBorderGradient';
import ButtonGradient from './ButtonGradient';
import DeviceInfo from 'react-native-device-info';

interface Props extends TextInputProps {
	popupTitle?: string;
	buttonTitle?: string;
	onNextPress?: () => void;
	onSkipPress?: () => void;
	textType?: string;
	description?: string;
	isShowPlusIcon: boolean;
	isShowEventImg: boolean;
	isShowTitle: boolean;
	isLast: boolean;
	style?: ViewStyle;
}

const TutorialView: React.FC<Props> = props => {
	const {
		popupTitle,
		buttonTitle,
		onNextPress,
		textType,
		description,
		onSkipPress,
		isShowPlusIcon,
		isShowEventImg,
		isShowTitle,
		isLast,
		style
	} = props;

	return (
		<View style={[styles.bgView, {...style}]}>
			{isShowPlusIcon && (
				<>
					<ExpoFastImage
						resizeMode={'contain'}
						source={icons.plusSquare}
						style={styles.plusImg}
					/>
					<ExpoFastImage
						resizeMode={'contain'}
						source={icons.arrow_up}
						style={styles.arrowImg}
					/>
				</>
			)}

			<View style={styles.centeredView}>
				<View style={styles.viewDetails}>
					{isShowEventImg && (
						<ExpoFastImage source={icons.eventDammy} style={styles.eventImg} />
					)}
					{isShowTitle && <Text style={styles.titleStyle}>{popupTitle}</Text>}
					<Text style={styles.descriptionStyle}>{description}</Text>
					{isLast ? (
						<ButtonGradient
							onPress={onNextPress}
							colorArray={defaultTheme.secondaryGradientColor}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							buttonText={buttonTitle}
							style={styles.loginButtonSocial}
							textType={textType}
						/>
					) : (
						<ButtonBorderGradient
							onPress={onNextPress}
							colorArray={defaultTheme.secondaryGradientColor}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							buttonText={buttonTitle}
							style={styles.loginButtonSocial}
							textType={textType}
						/>
					)}
					{!isLast && (
						<TouchableOpacity onPress={onSkipPress}>
							<Text style={styles.skipBtn}>
								{Strings.str_tut_btn_skip_tutorial}
							</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	bgView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.8)',
		marginTop: 0,
		marginBottom: 0,
		width: width
	},
	centeredView: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	viewDetails: {
		// backgroundColor: defaultTheme.backGroundColor,
		borderRadius: verticalScale(10),
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: verticalScale(20)
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(24),
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center'
		// textTransform: 'capitalize'
	},
	descriptionStyle: {
		color: colors.textTitle,
		fontSize: moderateScale(16),
		fontFamily: Fonts.type.Inter_Medium,
		textAlign: 'center',
		marginTop: verticalScale(10)
	},
	loginButtonSocial: {
		marginTop: verticalScale(16)
	},
	skipBtn: {
		color: colors.textTitle,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Medium,
		textAlign: 'center',
		padding: verticalScale(16)
	},
	plusImg: {
		height: 40,
		width: 40,
		position: 'absolute',
		top: DeviceInfo.hasNotch()
			? verticalScale(60)
			: Platform.OS === 'ios'
			? verticalScale(35)
			: verticalScale(12),
		right: horizontalScale(105)
	},
	arrowImg: {
		height: 50,
		width: 50,
		position: 'absolute',
		top: DeviceInfo.hasNotch()
			? verticalScale(115)
			: Platform.OS === 'ios'
			? verticalScale(110)
			: verticalScale(90),
		right: horizontalScale(100)
	},
	eventImg: {
		height: width,
		width: width - horizontalScale(20),
		margin: 0
	}
});

export default TutorialView;
