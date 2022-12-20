import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import Strings from '../constants/strings';

import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';

const EarningsProfitView: React.FC<Props> = props => {
	return (
		<View style={styles.container}>
			<ExpoFastImage
				style={styles.imgIconStyle}
				resizeMode="cover"
				// source={{uri: profileImgPath}}
				source={icons.currency}
			/>
			<Text style={styles.titleStyle}>
				{Strings.until_your_bet_is_settled_it_will_generate_a_passive_profit}
			</Text>
			<Text style={styles.decsStyle}>
				{
					Strings.when_the_bet_finalizes_you_can_check_your_passive_earnings_in_your_wallet
				}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: defaultTheme.secondaryBackGroundColor,
		borderRadius: verticalScale(10),
		alignItems: 'center',
		justifyContent: 'center',
		padding: horizontalScale(16),
		marginTop: horizontalScale(8)
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center',
		paddingVertical: verticalScale(8),
		marginTop: horizontalScale(8)
	},

	imgIconStyle: {
		width: 100,
		height: 100
	},

	decsStyle: {
		color: colors.placeholderColor,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		textAlign: 'center',
		paddingVertical: verticalScale(8)
	}
});

export default EarningsProfitView;
