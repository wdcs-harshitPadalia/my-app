/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import fonts from '../../../theme/fonts';
import {height} from '../../../theme/metrics';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	headerText: {
		fontFamily: fonts.type.Krona_Regular,
		fontWeight: '400',
		color: colors.white,
		fontSize: 30,
		textAlign: 'center'
	},
	noDataStyle: {
		fontSize: moderateScale(16),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginVertical: verticalScale(24),
		textAlign: 'center'
	},
	noDataContainer: {
		height: height * 0.6
		// backgroundColor: 'red',
		// justifyContent: 'center',
	},
	trendUserContainerStyle: {
		flex: 1,
		marginHorizontal: 16
	},
	trendUserTextContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 14
	},
	trendUserTextStyle: {
		fontFamily: Fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: 14
	},
	seeAllTextStyle: {
		fontFamily: Fonts.type.Inter_Bold,
		color: colors.whiteFour50,
		fontSize: 14
	}
});
export default styles;
