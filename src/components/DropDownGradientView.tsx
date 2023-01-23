import React from 'react';
import {
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	ImageSourcePropType,
	Text
} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../theme';
import {LinearGradient} from 'expo-linear-gradient';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import {gradientColorAngle} from '../theme/metrics';
import ExpoFastImage from 'expo-fast-image';

interface Props extends TextInputProps {
	rightIconPath?: ImageSourcePropType;
	style?: any;
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
	leftIconPath?: string;
}

const DropDownGradientView: React.FC<Props> = props => {
	const {
		rightIconPath,
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
		leftIconPath
	} = props;

	return (
		<TouchableOpacity
			onPress={() => {
				if (onPress) onPress();
			}}
			activeOpacity={0.8}
			disabled={btnDisabled}
			style={[styles.container, {...props.style}]}>
			<LinearGradient
				style={styles.circleGradient}
				useAngle={true}
				angle={angle ? angle : gradientColorAngle}
				colors={colorArray}>
				{leftIconPath && (
					<ExpoFastImage
						resizeMode={'contain'}
						source={{uri: leftIconPath}}
						style={styles.leftImg}
					/>
				)}

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
					]}>
					{buttonText}
				</Text>
				{rightIconPath ? (
					<ExpoFastImage
						resizeMode={'contain'}
						source={rightIconPath}
						style={[styles.rightImg, leftIconStyle]}
					/>
				) : null}
			</LinearGradient>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
		//height: verticalScale(60),
		//padding: 10,
		//flex: 1,
	},
	inputStyle: {
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		textTransform: 'uppercase',
		flex: 1,
		textAlign: 'left',
		paddingVertical: verticalScale(16),
		marginHorizontal: 16
	},
	circleGradient: {
		height: '100%',
		width: '100%',
		borderRadius: verticalScale(8),
		alignItems: 'center',
		flexDirection: 'row'
	},
	rightImg: {
		height: 12,
		width: 12,
		marginRight: verticalScale(20)
	},
	leftImg: {
		height: verticalScale(16),
		width: verticalScale(16),
		marginLeft: verticalScale(8)
	}
});

export default DropDownGradientView;
