import {StyleSheet} from 'react-native';
import {
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import {moderateFontScale} from '../../../theme/metrics';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	titleStyle: {
		fontSize: moderateScale(24),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginVertical: verticalScale(10),
		textAlign: 'center'
	},
	subTitleStyle: {
		fontSize: moderateScale(18),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginTop: verticalScale(16),
		marginBottom: verticalScale(16),
		textAlign: 'center'
	},
	viewContain: {
		marginHorizontal: horizontalScale(12),
		flex: 1
	},
	userGroupStyle: {
		marginTop: verticalScale(16),
		marginBottom: verticalScale(16),
		marginHorizontal: verticalScale(6)
	},
	titleText: {
		fontFamily: Fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateFontScale(24),
		textAlign: 'center',
		marginVertical: horizontalScale(12)
	}
});
export default styles;
