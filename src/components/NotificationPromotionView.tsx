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
import {
	dateTimeStreamingConvert,
	getLevelRank
} from '../constants/utils/Function';
import moment from 'moment';
import {gradientColorAngle} from '../theme/metrics';

interface Props extends TextInputProps {
	onPress?: () => void;
	colorArray?: [];
	data?: Object;
}

const NotificationPromotionView: React.FC<Props> = props => {
	const {onPress, colorArray, data} = props;

	const AnimatedTouchableOpacity =
		Animated.createAnimatedComponent(TouchableOpacity);
	const fadeAnim = useRef(new Animated.Value(0)).current;

	const fadeIn = () => {
		Animated.timing(fadeAnim, {
			//value: 1,
			toValue: 1,
			useNativeDriver: false
		}).start();
	};

	// useEffect(() => {
	//   if (onPress && data?.notificationStatus === 'UNREAD') {
	//     fadeIn();
	//   }
	// }, [onPress]);

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
						source={icons.appLogo}
					/>
				</View>
				<View style={styles.viewLabelContainer}>
					<Text style={styles.usernameStyle}>
						{data?.type === 'NOT_SELECTED_JURY' ||
						data?.type === 'VOTE_NOT_CONSIDERED' ||
						data?.type === 'SUPPORT_TICKET'
							? data?.body
							: data?.body ?? data?.type}
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
				{/* <ExpoFastImage
          style={styles.imgIconStyle}
          resizeMode="cover"
          // source={{uri: profileImgPath}}
          source={icons.appLogo}
        /> */}
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
	}
});

export default NotificationPromotionView;
