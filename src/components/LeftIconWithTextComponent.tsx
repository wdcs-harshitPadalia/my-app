import React from 'react';
import {
	Text,
	StyleSheet,
	ImageSourcePropType,
	TextInputProps,
	ViewStyle,
	TouchableOpacity
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import {LinearGradient} from 'expo-linear-gradient';

import {Colors, Fonts, horizontalScale, verticalScale} from '../theme';
import {defaultTheme} from '../theme/defaultTheme';
import {moderateFontScale} from '../theme/metrics';

interface Props extends TextInputProps {
	text?: string;
	iconPath?: ImageSourcePropType;
	isApplyFilter?: boolean;
	applyFilterCount?: number;
	borderStyle?: ViewStyle;
	onPress?: () => void;
	gradientColors?: string[];
	enabled?: boolean;
	isSelected?: boolean;
	activeOpacity?: number;
}

const LeftIconWithTextComponent: React.FC<Props> = props => {
	const {text, iconPath, isApplyFilter, activeOpacity, applyFilterCount} =
		props;

	return (
		<LinearGradient
			useAngle={true}
			colors={
				props.isSelected
					? defaultTheme.primaryGradientColor
					: props.gradientColors ?? ['transparent', 'transparent'] ??
					  props.gradientColors ?? ['transparent', 'transparent']
			}
			// colors={defaultTheme.ternaryGradientColor}
			style={[styles.container, props.borderStyle]}>
			<TouchableOpacity
				onPress={props.onPress}
				activeOpacity={activeOpacity ?? 1}
				disabled={props.enabled ? false : true}
				style={{flexDirection: 'row', alignItems: 'center'}}>
				{isApplyFilter ? (
					<LinearGradient
						useAngle={true}
						colors={defaultTheme.primaryGradientColor}
						style={styles.countStyle}>
						<Text style={styles.countTextStyle}>{applyFilterCount}</Text>
					</LinearGradient>
				) : (
					<ExpoFastImage
						style={styles.imgIconStyle}
						source={iconPath}
						resizeMode={'contain'}
					/>
				)}
				<Text style={styles.textStyle}>{text}</Text>
			</TouchableOpacity>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	imgIconStyle: {
		width: 20,
		height: 20,
		marginVertical: verticalScale(6),
		marginStart: horizontalScale(12),
		marginEnd: horizontalScale(4)
	},
	countStyle: {
		width: 20,
		height: 20,
		marginVertical: verticalScale(6),
		marginStart: horizontalScale(12),
		marginEnd: horizontalScale(4),
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textStyle: {
		marginVertical: verticalScale(4),
		marginStart: horizontalScale(4),
		marginEnd: horizontalScale(12),
		fontFamily: Fonts.type.Inter_Regular,
		fontWeight: '800',
		fontSize: moderateFontScale(12),
		color: Colors.white
	},
	countTextStyle: {
		fontFamily: Fonts.type.Inter_Regular,
		fontWeight: '800',
		fontSize: moderateFontScale(12),
		color: Colors.white
	}
});

export default LeftIconWithTextComponent;
