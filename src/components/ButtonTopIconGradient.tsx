import React from 'react';
import {
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	ImageSourcePropType,
	Text,
	ViewStyle,
	Platform
} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';
import ExpoFastImage from 'expo-fast-image';
import {gradientColorAngle} from '../theme/metrics';
import colors from '../theme/colors';
import GradientText from './GradientText';

interface Props extends TextInputProps {
	topIconPath?: ImageSourcePropType;
	style?: ViewStyle;
	buttonText?: string;
	onPress?: () => void;
	colorArray?: string[];
	buttonTextGradientncolor?: string[];
	angle?: number;
	activeOpacity?: number;
	textType?: string;
}

const ButtonTopIconGradient: React.FC<Props> = props => {
	const {
		topIconPath,
		buttonText,
		onPress,
		colorArray,
		buttonTextGradientncolor,
		angle,
		activeOpacity
	} = props;

	return (
		<TouchableOpacity
			onPress={() => {
				if (onPress) onPress();
			}}
			activeOpacity={activeOpacity}
			style={[styles.container, {...props.style}]}>
			<LinearGradient
				style={styles.circleGradient}
				useAngle={true}
				angle={angle ? angle : gradientColorAngle}
				colors={colorArray}>
				<ExpoFastImage
					resizeMode={'contain'}
					source={topIconPath}
					style={styles.topImg}
				/>
				{buttonTextGradientncolor ? (
					Platform.OS === 'web' ? (
						<Text
							style={[
								styles.btnTextStyle,
								{color: buttonTextGradientncolor[0]}
							]}>
							{buttonText}
						</Text>
					) : (
						<GradientText
							colors={buttonTextGradientncolor}
							style={styles.btnTextStyle}>
							{buttonText}
						</GradientText>
					)
				) : (
					<Text style={styles.btnTextStyle}>{buttonText}</Text>
				)}
			</LinearGradient>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 0.5,
		flexDirection: 'row'
	},
	btnTextStyle: {
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		color: colors.white
	},
	circleGradient: {
		flex: 1,
		borderRadius: verticalScale(10),
		alignItems: 'center',
		paddingVertical: verticalScale(10)
	},
	topImg: {
		height: 25,
		width: 25,
		marginVertical: verticalScale(4)
	}
});

export default ButtonTopIconGradient;
