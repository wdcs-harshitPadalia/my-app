import React from 'react';
import {
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	Text,
	View
} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import ButtonGradient from './ButtonGradient';
import moment from 'moment';
import {gradientColorAngle} from '../theme/metrics';

interface Props extends TextInputProps {
	onPress?: () => void;
	colorArray?: [];
	data: Object;
}

const NotificationRevealJuryResultView: React.FC<Props> = props => {
	const {onPress, colorArray, data, onConfirm} = props;
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
					<Text style={[styles.usernameStyle]}>{data?.body}</Text>

					<Text style={styles.userTypeStyle}>
						{moment(parseFloat(new Date(data?.createdAt).getTime())).fromNow(
							true
						) + ' ago'}
					</Text>
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

export default NotificationRevealJuryResultView;
