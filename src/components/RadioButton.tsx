import React from 'react';
import {Dimensions} from 'react-native';
import {
	View,
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	Text
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import {LinearGradient} from 'expo-linear-gradient';
import icons from '../assets/icon';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';

interface Props extends TextInputProps {
	title: string;
	onPress?: () => void;
	isSelected?: boolean;
}

const RadioButton: React.FC<Props> = props => {
	const {onPress, title, isSelected} = props;
	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={1}
			onPress={onPress}>
			<LinearGradient
				useAngle={true}
				angle={gradientColorAngle}
				colors={defaultTheme.ternaryGradientColor}
				style={styles.bgGradient}>
				{isSelected ? (
					<LinearGradient
						useAngle={true}
						angle={gradientColorAngle}
						colors={defaultTheme.textGradientColor}
						style={styles.countGradient}
					/>
				) : null}
			</LinearGradient>
			<Text style={styles.titleStyle}>{title} </Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: verticalScale(8)
	},

	bgGradient: {
		width: 24,
		height: 24,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center'
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Bold,
		marginHorizontal: 16,
		flex: 1
	},
	countGradient: {
		width: 14,
		height: 14,
		opacity: 1,
		borderRadius: 7
	}
});

export default RadioButton;
