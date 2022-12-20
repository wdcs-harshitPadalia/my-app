import {StyleSheet} from 'react-native';
import {
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
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
		flex: 1,
		marginHorizontal: horizontalScale(12)
	},
	userGroupStyle: {
		marginTop: verticalScale(16),
		marginBottom: verticalScale(16),
		marginHorizontal: verticalScale(6)
	},
	userProfileView: {
		paddingHorizontal: verticalScale(10)
	},
	noDataStyle: {
		fontSize: moderateScale(16),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginVertical: verticalScale(24),
		textAlign: 'center',
		marginTop: verticalScale(200)
	},
	loginButtonSocial: {
		marginVertical: verticalScale(16)
		// marginHorizontal: horizontalScale(8),
		// marginBottom: horizontalScale(4),
	}
});
export default styles;
