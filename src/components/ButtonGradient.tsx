import React from 'react';
import {
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	ImageSourcePropType,
	Text,
	ViewStyle,
	View
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';

import {Fonts, moderateScale, verticalScale} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';
// import FastImage, {ImageStyle} from 'react-native-fast-image';
import {gradientColorAngle, horizontalScale} from '../theme/metrics';
import fonts from '../theme/fonts';

interface Props extends TextInputProps {
	leftIconPath?: ImageSourcePropType;
	style?: ViewStyle;
	buttonText?: string;
	buttonTextcolor?: string;
	onPress?: () => void;
	textType?: string;
	textSize?: number;
	colorArray?: string[];
	angle?: number;
	btnDisabled?: boolean;
	paddingVertical?: number;
	leftIconStyle?: ImageStyle;
	numberOfLines?: number;
	rightIconPath?: ImageSourcePropType;
	rightIconStyle?: ImageStyle;
	activeOpacity?: number;
	fontFamily?: any;
	flex?: number;
	isShowRightIcon?: number;
	rightIconPress?: () => void;
}

const ButtonGradient: React.FC<Props> = props => {
	const {
		leftIconPath,
		buttonText,
		buttonTextcolor,
		textType,
		textSize,
		onPress,
		colorArray,
		angle,
		btnDisabled,
		paddingVertical,
		leftIconStyle,
		numberOfLines,
		rightIconPath,
		rightIconStyle,
		activeOpacity,
		children,
		fontFamily,
		flex = 1,
		isShowRightIcon,
		rightIconPress
	} = props;

	return (
		<TouchableOpacity
			onPress={() => {
				if (onPress) onPress();
			}}
			activeOpacity={0.8}
			disabled={btnDisabled}
			style={[
				styles.container,
				{opacity: btnDisabled ? (activeOpacity ? activeOpacity : 0.5) : 1.0},
				{...props.style}
			]}>
			<LinearGradient
				style={styles.circleGradient}
				useAngle={true}
				angle={angle ? angle : gradientColorAngle}
				colors={colorArray}>
				{leftIconPath ? (
					<ExpoFastImage
						resizeMode={'contain'}
						source={leftIconPath}
						style={[styles.leftImg, leftIconStyle]}
					/>
				) : null}

				{children}

				<Text
					style={[
						styles.inputStyle(flex),
						{
							color: buttonTextcolor,
							textTransform: textType === undefined ? 'uppercase' : textType,
							fontSize:
								textSize === undefined
									? moderateScale(12)
									: moderateScale(textSize),
							paddingVertical: paddingVertical
								? verticalScale(paddingVertical)
								: verticalScale(16),
							fontFamily: fontFamily ? fontFamily : fonts.type.Inter_ExtraBold
						}
					]}
					numberOfLines={numberOfLines ?? 0}>
					{buttonText}
				</Text>

				{rightIconPath ? (
					<TouchableOpacity
						style={[
							styles.rightIconContainer,
							{marginRight: horizontalScale(isShowRightIcon ? 20 : 0)}
						]}
						onPress={rightIconPress}>
						<ExpoFastImage
							resizeMode={'contain'}
							source={rightIconPath}
							style={[
								styles.rightImg,
								rightIconStyle,
								{
									display: isShowRightIcon ? 'flex' : 'none'
								}
							]}
						/>
					</TouchableOpacity>
				) : null}
			</LinearGradient>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	inputStyle: (flex: number) => ({
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		textTransform: 'uppercase',
		flex: flex,
		textAlignVertical: 'center',
		textAlign: 'center',
		paddingVertical: verticalScale(16),
		marginHorizontal: 8
	}),
	circleGradient: {
		height: '100%',
		width: '100%',
		borderRadius: verticalScale(8),
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	leftImg: {
		height: 25,
		width: 25,
		marginLeft: verticalScale(20)
	},
	rightIconContainer: {
		height: 25,
		width: 25
	},
	rightImg: {
		height: 25,
		width: 25
		// marginRight: verticalScale(20),
		// display: 'none'
	}
});

export default ButtonGradient;
