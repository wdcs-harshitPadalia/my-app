import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Text,
	TouchableOpacity
} from 'react-native';
import Strings from '../constants/strings';

import {Fonts, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';

interface Props extends TextInputProps {
	onPress?: () => void;
}

const OpenDisputeView: React.FC<Props> = props => {
	const {onPress} = props;

	return (
		<View style={styles.viewDetails}>
			<Text style={styles.titleStyle}>{Strings.problem_with_this_result}</Text>
			<TouchableOpacity onPress={onPress}>
				<Text style={styles.openDisputeStyle}>{Strings.open_dispute}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	viewDetails: {
		backgroundColor: defaultTheme.secondaryBackGroundColor,
		borderRadius: verticalScale(10),
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: verticalScale(20),
		marginVertical: verticalScale(8)
	},
	titleStyle: {
		color: colors.placeholderColor,
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Inter_Medium,
		textAlign: 'center',
		paddingHorizontal: verticalScale(16)
	},
	openDisputeStyle: {
		color: colors.placeholderColor,
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Inter_ExtraBold,
		textAlign: 'center',
		paddingHorizontal: verticalScale(16),
		marginTop: verticalScale(2),
		textDecorationLine: 'underline'
	}
});

export default OpenDisputeView;
