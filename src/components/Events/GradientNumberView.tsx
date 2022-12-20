import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {defaultTheme} from '../../theme/defaultTheme';
import colors from '../../theme/colors';
import {Fonts, moderateScale} from '../../theme';
import fonts from '../../theme/fonts';
import {gradientColorAngle} from '../../theme/metrics';

const GradientNumberView = ({
	selectedCount,
	gradientColor,
	cornerRadius,
	fontSize
}) => {
	return (
		<LinearGradient
			useAngle={true}
			angle={gradientColorAngle}
			colors={gradientColor ?? defaultTheme.primaryGradientColor}
			style={[styles.countGradient, {borderRadius: cornerRadius}]}>
			<Text style={[styles.titleStyle, {fontSize: fontSize}]}>
				{selectedCount}{' '}
			</Text>
		</LinearGradient>
	);
};

export default GradientNumberView;

const styles = StyleSheet.create({
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: fonts.type.Inter_Bold,
		textAlign: 'center',
		marginHorizontal: 2
	},

	countGradient: {
		//width: 24,
		//height: 24,
		//position: 'absolute',
		padding: 4,
		opacity: 1,
		borderRadius: 12,
		justifyContent: 'center'
		// right: 5,
		// top: 5,
	}
});
