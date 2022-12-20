import React from 'react';
import {StyleSheet, TextInputProps, Text, View, Dimensions} from 'react-native';
import {
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../../theme';
import colors from '../../theme/colors';

interface Props extends TextInputProps {
	data: any;
}

const AnswerOptionView: React.FC<Props> = props => {
	const {data} = props;
	return (
		<View style={styles.container}>
			<Text style={styles.answerTxtStyle} numberOfLines={1}>
				{data.answer}
			</Text>
			<Text style={styles.priceTxtStyle} numberOfLines={1}>
				{data.price}
			</Text>
			<Text style={styles.yourSharesTxtStyle} numberOfLines={1}>
				{'YOUR SHARES: ' + data.shares}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: (Dimensions.get('window').width - horizontalScale(52)) / 2,
		alignItems: 'center',
		flexDirection: 'column',
		paddingVertical: verticalScale(10),
		borderRadius: verticalScale(5),
		backgroundColor: colors.black
	},
	answerTxtStyle: {
		fontSize: moderateScale(10),
		color: colors.greenLight,
		fontFamily: Fonts.type.Inter_ExtraBold
	},
	priceTxtStyle: {
		fontSize: moderateScale(15),
		color: colors.white,
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginVertical: verticalScale(8)
	},
	yourSharesTxtStyle: {
		fontSize: moderateScale(10),
		color: colors.whiteFour50,
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginBottom: 6
	}
});

export default AnswerOptionView;
