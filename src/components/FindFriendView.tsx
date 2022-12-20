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
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import DynamicButtonGradient from './DynamicButtonGradient';
import Strings from '../constants/strings';
import ButtonGradient from './ButtonGradient';
import {gradientColorAngle} from '../theme/metrics';

interface Props extends TextInputProps {
	leftIconPath?: ImageSourcePropType;
	style?: any;
	buttonText?: string;
	buttonTextcolor?: string;
	onPress?: () => void;
	textType?: string;
	textSize?: number;
	colorArray?: [];
	angle?: number;
}

const FindFriendView: React.FC<Props> = props => {
	const {
		leftIconPath,
		buttonText,
		buttonTextcolor,
		textType,
		textSize,
		onPress,
		colorArray,
		angle,
		showWatchButton
	} = props;

	return (
		<View style={[styles.container, {...props.style}]}>
			<Text style={styles.titleStyle}>{Strings.findFriends}</Text>
			<View style={styles.detailsContainer}>
				<ExpoFastImage
					resizeMode={'contain'}
					source={icons.userDummy}
					style={styles.left1Img}
				/>
				<ExpoFastImage
					resizeMode={'contain'}
					source={icons.userDummy}
					style={styles.left2Img}
				/>
				<ExpoFastImage
					resizeMode={'contain'}
					source={icons.userDummy}
					style={styles.left3Img}
				/>

				<View style={styles.acceptTextViewStyle}>
					<Text>
						<Text style={styles.userNameStyle}>{'Anna, Juan, María'}</Text>
						<Text style={styles.andLabelStyle}>{' and'}</Text>
						<Text style={styles.userNameStyle}>{' 24 more '}</Text>
						<Text style={styles.andLabelStyle}>{'more use defibet.'}</Text>
					</Text>
				</View>
			</View>
			<ButtonGradient
				onPress={() => {}}
				colorArray={defaultTheme.ternaryGradientColor}
				angle={gradientColorAngle}
				buttonTextcolor={colors.white}
				rightIcon={true}
				buttonText={Strings.instagramLogin}
				style={styles.loginButtonSocial}
				leftIconPath={icons.instagram}
			/>
			<ButtonGradient
				onPress={() => {
					// handleSubmit();
				}}
				colorArray={defaultTheme.ternaryGradientColor}
				angle={gradientColorAngle}
				buttonTextcolor={colors.white}
				rightIcon={true}
				buttonText={Strings.twitterLogin}
				style={styles.loginButtonSocial}
				leftIconPath={icons.twitter}
			/>
			<ButtonGradient
				onPress={() => {
					// handleSubmit();
				}}
				colorArray={defaultTheme.ternaryGradientColor}
				angle={gradientColorAngle}
				buttonTextcolor={colors.white}
				rightIcon={true}
				buttonText={Strings.facebookLogin}
				style={styles.loginButtonSocial}
				leftIconPath={icons.facebook}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'center',
		borderRadius: verticalScale(10),
		backgroundColor: colors.black,
		overflow: 'hidden',
		paddingBottom: verticalScale(10)
	},
	detailsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: verticalScale(10),
		backgroundColor: colors.black,
		overflow: 'hidden',
		marginBottom: verticalScale(20)
	},
	titleStyle: {
		fontSize: moderateScale(18),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginVertical: verticalScale(24),
		textAlign: 'center'
	},
	circleGradient: {
		width: '100%',
		height: verticalScale(60),
		//borderRadius: verticalScale(8),
		alignItems: 'center',
		flexDirection: 'row'
	},
	left1Img: {
		height: 26,
		width: 26,
		marginLeft: verticalScale(20),
		borderRadius: 13
	},
	left2Img: {
		height: 26,
		width: 26,
		borderRadius: 13,
		left: -13
	},
	left3Img: {
		height: 26,
		width: 26,
		borderRadius: 13,
		left: -26
	},

	userNameStyle: {
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_ExtraBold
	},
	andLabelStyle: {
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_Regular
	},
	acceptTextViewStyle: {
		flex: 1,
		justifyContent: 'space-between',
		marginRight: verticalScale(10),
		marginLeft: verticalScale(-10)
	},
	loginButtonSocial: {
		marginHorizontal: verticalScale(16),
		marginBottom: verticalScale(16)
	}
});

export default FindFriendView;
