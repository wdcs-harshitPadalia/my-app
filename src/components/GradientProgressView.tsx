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

interface Props extends TextInputProps {
	progress: string;
}

const GradientProgressView: React.FC<Props> = props => {
	const {progress} = props;
	return (
		<View style={styles.container}>
			<LinearGradient
				useAngle={true}
				angle={180}
				colors={defaultTheme.ternaryGradientColor}
				style={styles.bgGradient}>
				<LinearGradient
					useAngle={true}
					angle={80}
					colors={defaultTheme.textGradientColor}
					style={[
						styles.countGradient,
						{
							width: progress
						}
					]}
				/>
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		// flex: 1,
		alignItems: 'center'
	},

	bgGradient: {
		flex: 1,
		borderRadius: 12,
		height: verticalScale(8)
	},
	countGradient: {
		flex: 1,
		borderRadius: 12
	}
});

export default GradientProgressView;
