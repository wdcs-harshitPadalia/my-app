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
import colors from '../theme/colors';
import moment from 'moment';
import {gradientColorAngle} from '../theme/metrics';

interface Props extends TextInputProps {
	onPress?: () => void;

	colorArray?: [];
	data: Object;
}

const NotificationBetDisputeResultView: React.FC<Props> = props => {
	const {onPress, colorArray, data} = props;
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
				<View style={styles.matchIconStyle}>
					<ExpoFastImage
						style={styles.matchIconStyle}
						resizeMode="cover"
						source={icons.ellipse}
					/>
				</View>
				<View style={styles.viewLabelContainer}>
					<Text style={[styles.usernameStyle]}>
						{data?.body}
						<Text
							style={[
								styles.usernameStyle,
								{fontFamily: Fonts.type.Inter_ExtraBold}
							]}>
							{' See the final result.'}
						</Text>
					</Text>
					<Text style={styles.userTypeStyle}>
						{/* {dateTimeStreamingConvert(
              parseFloat(new Date(data?.createdAt).getTime()),
            ).toUpperCase()} */}
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
		borderRadius: 20,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center'
	},
	matchIconStyle: {
		width: 40,
		height: 40,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imgIconStyle: {
		width: 25,
		height: 25
		// borderRadius: 5,
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
		marginLeft: verticalScale(16),
		flex: 1,
		borderColor: colors.white,
		borderWidth: 1,
		borderRadius: 8
	}
});

export default NotificationBetDisputeResultView;
