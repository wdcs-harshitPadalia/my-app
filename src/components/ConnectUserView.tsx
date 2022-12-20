import React from 'react';
import {
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	ImageSourcePropType,
	Text,
	View
} from 'react-native';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import colors from '../theme/colors';
import ProfileComponent from './ProfileComponent';
import {defaultTheme} from '../theme/defaultTheme';
import ButtonGradient from './ButtonGradient';
import {generateColor, ImageIndicator} from '../constants/utils/Function';
import {gradientColorAngle} from '../theme/metrics';

interface Props extends TextInputProps {
	leftIconPath?: ImageSourcePropType;
	style?: any;
	buttonText?: string;
	onInvitePress?: () => void;
	onPress?: () => void;
	subTitle?: string;
	username?: string;
	colorArray?: [];
	isInviteVisible?: boolean;
	textImgColor?: any;
	imgText?: string;
	isSelect: boolean;
	ischeckboxView?: boolean;
	onIsSelect?: (isSelect: boolean) => void;
	shouldShowCheckBox?: boolean;
}

const ConnectUserView: React.FC<Props> = props => {
	const {
		leftIconPath,
		buttonText,
		username,
		onInvitePress,
		colorArray,
		isInviteVisible,
		onPress,
		subTitle,
		textImgColor,
		imgText,
		isSelect,
		onIsSelect,
		ischeckboxView,
		shouldShowCheckBox
	} = props;

	return (
		<TouchableOpacity
			hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
			activeOpacity={0.9}
			style={[styles.container, {...props.style}]}
			onPress={onPress}>
			{leftIconPath ? (
				<ImageIndicator
					source={{uri: leftIconPath}}
					defaultSource={icons.userDummy}
					resizeMode="cover"
					style={styles.imgIconStyle}
					indicatorProps={{
						size: 40,
						borderWidth: 0,
						color: colors.gray,
						unfilledColor: colors.grayLightText
					}}
				/>
			) : (
				<View
					style={[
						styles.imgIconStyle,
						{
							backgroundColor: textImgColor,
							justifyContent: 'center',
							alignItems: 'center'
						}
					]}>
					<Text style={styles.imgNameStyle}>{imgText?.toUpperCase()}</Text>
				</View>
			)}

			<View style={styles.viewLabelContainer}>
				<Text style={styles.usernameStyle}>{username}</Text>
				{subTitle ? <Text style={styles.userTypeStyle}>{subTitle}</Text> : null}
			</View>
			{isInviteVisible ? (
				<View style={styles.selectionView}>
					<ButtonGradient
						onPress={onInvitePress}
						colorArray={colorArray}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						buttonText={buttonText}
						style={styles.leftButtonStyle(
							ischeckboxView || !shouldShowCheckBox ? 0 : 15
						)}
						paddingVertical={8}
					/>

					<TouchableOpacity onPress={() => onIsSelect(!isSelect)}>
						{ischeckboxView || !shouldShowCheckBox ? null : (
							<>
								{!isSelect ? (
									<LinearGradient
										style={styles.checkboxView}
										useAngle={true}
										angle={gradientColorAngle}
										colors={defaultTheme.ternaryGradientColor}></LinearGradient>
								) : (
									<ExpoFastImage
										style={styles.imgView}
										source={icons.ic_check_gradiant}
									/>
								)}
							</>
						)}
					</TouchableOpacity>
				</View>
			) : null}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingVertical: verticalScale(12),
		alignItems: 'center'
		// paddingHorizontal: verticalScale(10),
	},

	imgIconStyle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		overflow: 'hidden'
	},

	viewLabelContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		paddingLeft: verticalScale(16)
	},
	usernameStyle: {
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginBottom: verticalScale(3)
	},

	userTypeStyle: {
		fontSize: moderateScale(12),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_ExtraBold
	},
	leftButtonStyle: (padding: number) => ({
		//height: verticalScale(30),
		paddingRight: moderateScale(padding),
		flex: 0.5
	}),
	imgNameStyle: {
		fontSize: moderateScale(18),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_SemiBold
	},
	selectionView: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	imgView: {
		height: verticalScale(20),
		width: verticalScale(20)
	},
	checkboxView: {
		height: verticalScale(20),
		width: verticalScale(20),
		borderRadius: verticalScale(10)
	}
});

export default ConnectUserView;
