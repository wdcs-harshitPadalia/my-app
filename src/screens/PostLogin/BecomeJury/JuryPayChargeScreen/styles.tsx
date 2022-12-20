import {StyleSheet} from 'react-native';
import {Fonts, horizontalScale, verticalScale} from '../../../../theme';
import colors from '../../../../theme/colors';
import {defaultTheme} from '../../../../theme/defaultTheme';
import {moderateFontScale, moderateScale} from '../../../../theme/metrics';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	button: {
		marginVertical: verticalScale(10),
		marginHorizontal: horizontalScale(20),
		height: 60,
		borderRadius: 8,
		justifyContent: 'center'
	},
	middleRootContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	titleText: {
		marginHorizontal: horizontalScale(60),
		color: colors.white,
		fontSize: moderateFontScale(24),
		fontFamily: Fonts.type.Krona_Regular,
		fontWeight: '400',
		textAlign: 'center'
	},
	amountText: {
		marginVertical: verticalScale(16),
		marginHorizontal: horizontalScale(31),
		fontSize: moderateFontScale(30),
		fontFamily: Fonts.type.Krona_Regular,
		fontWeight: '400',
		textAlign: 'center',
		textTransform: 'uppercase'
	},
	descriptionText: {
		marginHorizontal: horizontalScale(32),
		color: colors.textTitle,
		fontSize: moderateFontScale(16),
		fontFamily: Fonts.type.Inter_Regular,
		fontWeight: '500',
		textAlign: 'center'
	},
	termsLinkText: {
		marginTop: verticalScale(28),
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Regular,
		fontWeight: '500',
		textAlign: 'center',
		textDecorationLine: 'underline',
		opacity: 0.65
	}
});
