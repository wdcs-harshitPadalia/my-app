/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import fonts from '../../../theme/fonts';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor,
	},
	textContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	smallTextStyle: {
		fontFamily: fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateScale(18),
		fontWeight: '400',
	},
	largeTextStyle: {
		fontFamily: fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateScale(28),
		fontWeight: '400',
	},
	spacerViewStyle: {
		height: 24,
	},
	useBiometricStyle: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	biometricTextStyle: {
		fontFamily: fonts.type.Inter_Bold,
		color: colors.white,
		fontSize: moderateScale(16),
		textDecorationLine: 'underline',
		marginBottom: verticalScale(40),
	},
});
export default styles;
