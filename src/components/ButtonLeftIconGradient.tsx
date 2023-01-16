import React from 'react';
import {
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	ImageSourcePropType,
	Text,
	ViewStyle
} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';
// import FastImage, {ImageStyle} from 'react-native-fast-image';
import {gradientColorAngle} from '../theme/metrics';
import ExpoFastImage from 'expo-fast-image';

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
	activeOpacity?: number;
	btnGradientStyle?: ViewStyle;
}

const ButtonLeftIconGradient: React.FC<Props> = props => {
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
		activeOpacity,
		btnGradientStyle
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
				style={[styles.circleGradient, {...btnGradientStyle}]}
				useAngle={true}
				angle={angle ? angle : gradientColorAngle}
				colors={colorArray}>
				<ExpoFastImage
					resizeMode={'contain'}
					source={leftIconPath}
					style={[styles.leftImg, leftIconStyle]}
				/>

				<Text
					style={[
						styles.inputStyle,
						{
							color: buttonTextcolor,
							textTransform: textType === undefined ? 'uppercase' : textType,
							fontSize:
								textSize === undefined
									? moderateScale(12)
									: moderateScale(textSize),
							paddingVertical: paddingVertical
								? verticalScale(paddingVertical)
								: verticalScale(16)
						}
					]}
					numberOfLines={numberOfLines ?? 0}>
					{buttonText}
				</Text>
			</LinearGradient>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputStyle: {
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		textTransform: 'uppercase',
		// flex: 1,
		textAlignVertical: 'center',
		textAlign: 'center',
		// paddingVertical: verticalScale(16),
		marginHorizontal: 12
	},
	circleGradient: {
		height: '100%',
		width: '100%',
		borderRadius: verticalScale(8),
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	leftImg: {
		height: 25,
		width: 25
	}
});

export default ButtonLeftIconGradient;
