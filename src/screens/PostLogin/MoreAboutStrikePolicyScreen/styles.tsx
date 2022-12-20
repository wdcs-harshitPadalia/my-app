import {StyleSheet} from 'react-native';
import {horizontalScale, moderateScale, verticalScale} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import fonts from '../../../theme/fonts';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	continueButton: {
		paddingHorizontal: verticalScale(16)
	},
	titleText: {
		color: colors.white,
		fontSize: moderateScale(24),
		fontFamily: fonts.type.Krona_Regular,
		fontWeight: '400',
		textAlign: 'center',
		marginHorizontal: horizontalScale(16)
	},
	descText: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: fonts.type.Inter_Regular,
		fontWeight: '500',
		textAlign: 'center',
		textTransform: 'uppercase'
	}
});
