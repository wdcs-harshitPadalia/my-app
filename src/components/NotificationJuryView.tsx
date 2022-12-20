import React, {useEffect, useRef} from 'react';
import {
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	ImageSourcePropType,
	Text,
	View,
	Animated
} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import colors from '../theme/colors';
import ProfileComponent from './ProfileComponent';
import {defaultTheme} from '../theme/defaultTheme';
import ButtonGradient from './ButtonGradient';
import {
	dateTimeStreamingConvert,
	getLevelRank
} from '../constants/utils/Function';
import moment from 'moment';
import {gradientColorAngle} from '../theme/metrics';

interface Props extends TextInputProps {
	onPress?: () => void;
	onConfirm?: () => void;
	onReject?: () => void;
	colorArray?: [];
	data: Object;
}

const NotificationJuryView: React.FC<Props> = props => {
	const {onPress, colorArray, data, onConfirm, onReject} = props;

	// const fadeAnim = useRef(new Animated.Value(0)).current;

	// const fadeIn = () => {
	//   Animated.timing(fadeAnim, {
	//     //value: 1,
	//     toValue: 1,
	//     useNativeDriver: false,
	//   }).start();
	// };

	// useEffect(() => {
	//   if (data?.isAccepted === true) {
	//     fadeIn();
	//   }
	// }, [data?.isAccepted]);

	return (
		<LinearGradient
			style={styles.circleGradient}
			useAngle={true}
			angle={gradientColorAngle}
			colors={colorArray}>
			<TouchableOpacity
				activeOpacity={0.8}
				style={styles.container}
				onPress={onPress}>
				<View>
					<View>
						<ExpoFastImage
							style={styles.profileIconStyle}
							resizeMode="cover"
							source={icons.appLogo}
						/>
					</View>
				</View>
				<View style={styles.viewLabelContainer}>
					{data?.type !== 'JURY' ? (
						<Text style={[styles.usernameStyle]}>
							{'You’ve been selected to be'}
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{' the jury '}
							</Text>
							{'of an opened dispute.'}
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{' You have 1 hour to accept the case!'}
							</Text>
						</Text>
					) : (
						<Text
							style={[
								styles.usernameStyle
								// {opacity: fadeAnim},
								//{fontFamily: Fonts.type.Inter_ExtraBold},
							]}>
							{'You are jury for the bet '}
							<Text
								style={[
									styles.usernameStyle,
									{fontFamily: Fonts.type.Inter_ExtraBold}
								]}>
								{data.bet?.betQuestion}
							</Text>
							{' you have 24 hours to declare your result.'}
						</Text>
					)}

					<Text style={styles.userTypeStyle}>
						{/* {dateTimeStreamingConvert(
              parseFloat(new Date(data?.createdAt).getTime()),
            ).toUpperCase()} */}
						{moment(parseFloat(new Date(data?.createdAt).getTime())).fromNow(
							true
						) + ' ago'}
					</Text>
					{data?.type !== 'JURY' ? (
						<View style={styles.viewBackButton}>
							<ButtonGradient
								onPress={onReject}
								colorArray={[colors.blackGray, colors.blackGray]}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								buttonText={Strings.cancel}
								style={styles.nextButton}
								paddingVertical={verticalScale(10)}
							/>
							<ButtonGradient
								onPress={onConfirm}
								colorArray={defaultTheme.primaryGradientColor}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								buttonText={Strings.accept}
								style={styles.nextButton}
								paddingVertical={verticalScale(10)}
							/>
						</View>
					) : null}
				</View>
			</TouchableOpacity>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingVertical: verticalScale(16),
		paddingHorizontal: verticalScale(14)
		// alignItems: 'center',
	},
	circleGradient: {
		borderRadius: verticalScale(8),
		marginTop: verticalScale(8),
		marginBottom: verticalScale(8)
	},
	profileIconStyle: {
		width: 40,
		height: 40,
		borderRadius: 20
	},
	imgIconStyle: {
		width: 40,
		height: 40,
		borderRadius: 5
	},
	viewBadgeStyle: {
		width: 30,
		height: 30,
		right: -10,
		top: -5,
		position: 'absolute'
	},

	viewLabelContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		paddingLeft: verticalScale(20)
	},
	usernameStyle: {
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_Medium,
		textAlign: 'left'
	},

	userTypeStyle: {
		fontSize: moderateScale(10),
		color: colors.whiteFour10,
		fontFamily: Fonts.type.Inter_Regular,
		marginTop: verticalScale(2)
	},
	viewBackButton: {
		flexDirection: 'row',
		marginTop: verticalScale(16)
	},
	backButton: {
		flex: 1
	},
	nextButton: {
		marginLeft: verticalScale(8),
		flex: 1,
		borderColor: colors.white,
		borderWidth: 1,
		borderRadius: 8
	}
});

export default NotificationJuryView;
