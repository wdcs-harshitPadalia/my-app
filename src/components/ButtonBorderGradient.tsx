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
// import {ImageStyle} from 'react-native-fast-image';
import {gradientColorAngle} from '../theme/metrics';

interface Props extends TextInputProps {
	buttonText?: string;
	buttonTextcolor?: string;
	onPress?: () => void;
	textType?: string;
	colorArray?: string[];
	angle?: number;
	btnDisabled?: boolean;
	paddingVertical?: number;
	numberOfLines?: number;
	activeOpacity?: number;
	textSize?: number;
}

const ButtonBorderGradient: React.FC<Props> = props => {
	const {
		buttonText,
		buttonTextcolor,
		textType,
		textSize,
		onPress,
		colorArray,
		angle,
		btnDisabled,
		paddingVertical,
		numberOfLines,
		activeOpacity
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
		alignItems: 'center'
	},
	inputStyle: {
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		textTransform: 'uppercase',
		flex: 1,
		textAlignVertical: 'center',
		textAlign: 'center',
		paddingVertical: verticalScale(16),
		margin: 2,
		backgroundColor: 'rgba(0,0,0,0.8)',
		borderRadius: verticalScale(8),
		overflow: 'hidden'
	},
	circleGradient: {
		height: '100%',
		width: '100%',
		borderRadius: verticalScale(8),
		alignItems: 'center',
		flexDirection: 'row'
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
		width: 25,
		marginRight: verticalScale(20),
		display: 'none'
	}
});

export default ButtonBorderGradient;
