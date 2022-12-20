/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import fonts from '../../../theme/fonts';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor,
	},
	headerText: {
		fontFamily: fonts.type.Krona_Regular,
		fontWeight: '400',
		color: colors.white,
		fontSize: 30,
		textAlign: 'center',
	},
	tagViewStyle: {
		// marginHorizontal: horizontalScale(16),
		marginBottom: verticalScale(16),
		flexDirection: 'row',
	},
	tagViewContainerStyle: {
		marginHorizontal: horizontalScale(16),
		flex: 1,
	},
	noDataStyle: {
		fontSize: moderateScale(16),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginVertical: verticalScale(24),
		textAlign: 'center',
	},
	noDataContainer: {
		zIndex : -1
	},
});
export default styles;
