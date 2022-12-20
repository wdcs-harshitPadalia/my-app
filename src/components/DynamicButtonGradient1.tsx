import React from 'react';
import {
	StyleSheet,
	TextInputProps,
	ImageSourcePropType,
	Text,
	ViewStyle,
	TextStyle,
	View,
	//TouchableOpacity,
	Pressable,
	TouchableWithoutFeedbackBase,
	TouchableWithoutFeedback
} from 'react-native';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';
import ExpoFastImage from 'expo-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {gradientColorAngle} from '../theme/metrics';

interface Props extends TextInputProps {
	leftIconPath?: ImageSourcePropType;
	style?: any;
	buttonText?: string;
	buttonTextcolor?: string;
	onPress?: () => void;
	textType?: string;
	textSize?: number;
	colorArray?: string[];
	angle?: number;
	fontOpacity?: number;
	gradientViewStyle?: ViewStyle;
	textStyle?: TextStyle;
	fontFamily?: string;
	set2Text?: Boolean;
	buttonText2?: string;
}

const DynamicButtonGradient1: React.PropsWithChildren<Props> = props => {
	const {
		leftIconPath,
		buttonText,
		buttonTextcolor,
		textType,
		textSize,
		onPress,
		colorArray,
		angle,
		fontOpacity,
		gradientViewStyle,
		textStyle,
		fontFamily,
		set2Text,
		buttonText2
	} = props;

	return (
		<TouchableOpacity
			onPress={() => {
				if (onPress) onPress();
			}}
			activeOpacity={0.8}
			style={[{...props.style}, styles.container]}>
			<LinearGradient
				style={[styles.circleGradient, gradientViewStyle]}
				useAngle={true}
				angle={angle ? angle : gradientColorAngle}
				colors={colorArray}>
				{leftIconPath !== undefined ? (
					<ExpoFastImage
						resizeMode={'contain'}
						source={leftIconPath}
						style={styles.leftImg}
					/>
				) : (
					<></>
				)}
				<View>
					<Text
						numberOfLines={1}
						style={[
							styles.inputStyle,
							{
								color: buttonTextcolor,
								textTransform: textType === undefined ? 'uppercase' : textType,
								fontSize: textSize === undefined ? moderateScale(12) : textSize,
								opacity: fontOpacity ? fontOpacity : 1,
								fontFamily: fontFamily
									? fontFamily
									: styles.inputStyle.fontFamily
							},
							textStyle
						]}>
						{buttonText}
					</Text>
					{set2Text ? (
						<Text
							numberOfLines={1}
							style={[
								styles.inputStyle,
								{
									color: buttonTextcolor,
									textTransform:
										textType === undefined ? 'uppercase' : textType,
									fontSize:
										textSize === undefined ? moderateScale(12) : textSize,
									opacity: fontOpacity ? fontOpacity : 1,
									fontFamily: fontFamily
										? fontFamily
										: styles.inputStyle.fontFamily
								},
								textStyle
							]}>
							{buttonText2}
						</Text>
					) : null}
				</View>

				{props.children}
			</LinearGradient>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '98%'
		//width: '100%',
	},
	inputStyle: {
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Bold,
		textTransform: 'uppercase',
		//paddingHorizontal: 16,
		// paddingVertical: 16,
		// flex: 1,
		textAlign: 'center'
		//backgroundColor: 'red',
	},
	circleGradient: {
		//flex: 1,
		//height: verticalScale(30),
		paddingVertical: 10,
		//marginHorizontal: 12,
		borderRadius: verticalScale(8),
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		paddingHorizontal: horizontalScale(16)
	},
	leftImg: {
		height: 25,
		width: 25,
		marginLeft: verticalScale(20)
	}
});

export default DynamicButtonGradient1;
