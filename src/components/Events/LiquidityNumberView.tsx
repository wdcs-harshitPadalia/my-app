import React from 'react';
import {StyleSheet, TextInputProps, Text, View} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../../theme';
import colors from '../../theme/colors';
import {horizontalScale} from '../../theme/metrics';

interface Props extends TextInputProps {
	TitleText: string;
	valueText: string;
}

const LiquidityNumberView: React.FC<Props> = props => {
	const {TitleText, valueText} = props;

	return (
		<View style={styles.container}>
			<Text style={styles.titleTxtStyle} numberOfLines={1}>
				{TitleText}
			</Text>
			<Text style={styles.valueTxtStyle} numberOfLines={1}>
				{valueText}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flexDirection: 'column',
		paddingHorizontal: horizontalScale(10),
		paddingVertical: verticalScale(10),
		borderRadius: verticalScale(8)
	},
	titleTxtStyle: {
		fontSize: moderateScale(10),
		color: colors.whiteFour50,
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginBottom: 5
	},
	valueTxtStyle: {
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_ExtraBold
	}
});

export default LiquidityNumberView;
