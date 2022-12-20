import React from 'react';
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
import Strings from '../constants/strings';
import colors from '../theme/colors';
import ProfileComponent from './ProfileComponent';
import {defaultTheme} from '../theme/defaultTheme';
import {
	dateTimeStreamingConvert,
	getLevelRank
} from '../constants/utils/Function';
import fonts from '../theme/fonts';
import moment from 'moment';
import ButtonGradient from './ButtonGradient';
import {gradientColorAngle} from '../theme/metrics';

interface Props extends TextInputProps {
	onPress?: () => void;
	onConfirm?: () => void;
	onReject?: () => void;
	colorArray?: [];
	data: Object;
}

const NotificationView: React.FC<Props> = props => {
	const {onPress, colorArray, data, onConfirm, onReject} = props;

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
					<ExpoFastImage
						style={styles.profileIconStyle}
						resizeMode="cover"
						source={{uri: data.user?.picture}}
					/>

					<ExpoFastImage
						style={styles.viewBadgeStyle}
						resizeMode="contain"
						source={getLevelRank(data?.user?.level)?.image}
					/>
				</View>
				<View style={styles.viewLabelContainer}>
					<Text style={styles.usernameStyle}>
						{'your friend '}
						<Text
							style={[
								styles.usernameStyle,
								{fontFamily: fonts.type.Inter_ExtraBold}
							]}>
							{data.user?.userName}
						</Text>
						{' invited you to join this bet '}
						<Text
							style={[
								styles.usernameStyle,
								{fontFamily: fonts.type.Inter_ExtraBold}
							]}>
							{data?.bet?.betQuestion ?? data?.bet?.opposite_team_name}
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
				<ExpoFastImage
					style={styles.imgIconStyle}
					resizeMode="cover"
					source={{uri: data?.subcategory?.imageUrl}}
					//source={icons.appLogo}
				/>
			</TouchableOpacity>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingVertical: verticalScale(16),
		paddingHorizontal: verticalScale(14),
		alignItems: 'center'
	},
	nextButton: {
		marginLeft: verticalScale(16),
		flex: 1
	},
	circleGradient: {
		borderRadius: verticalScale(8),
		alignItems: 'center',
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
		borderRadius: 8
	},
	viewBackButton: {
		flexDirection: 'row',
		marginTop: verticalScale(16)
	},
	backButton: {
		flex: 1
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
	}
});

export default NotificationView;
