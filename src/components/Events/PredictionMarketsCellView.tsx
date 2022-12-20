import React from 'react';
import {StyleSheet, TextInputProps, TouchableOpacity, Text} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../../theme';
import {LinearGradient} from 'expo-linear-gradient';
import colors from '../../theme/colors';
import {defaultTheme} from '../../theme/defaultTheme';
import {gradientColorAngle, horizontalScale} from '../../theme/metrics';

interface Props extends TextInputProps {
	itemData?: any;
	questionText: string;
	onQuestionTextPress?: () => void;
}

const PredictionMarketsCellView: React.FC<Props> = props => {
	const {questionText, onQuestionTextPress} = props;

	return (
		<LinearGradient
			style={styles.circleGradient}
			useAngle={true}
			angle={gradientColorAngle}
			colors={defaultTheme.ternaryGradientColor}>
			<TouchableOpacity activeOpacity={0.9} onPress={onQuestionTextPress}>
				<Text style={styles.userNameStyle} numberOfLines={0}>
					{questionText}
				</Text>
			</TouchableOpacity>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	circleGradient: {
		width: '100%',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(10),
		borderRadius: verticalScale(8)
	},
	userNameStyle: {
		fontSize: moderateScale(18),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular
	}
});

export default PredictionMarketsCellView;
