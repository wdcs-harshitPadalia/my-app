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
		paddingBottom: verticalScale(20),
		paddingTop: verticalScale(16),
		paddingHorizontal: verticalScale(16),

		marginVertical: verticalScale(10),
		marginHorizontal: horizontalScale(16),
		flexDirection: 'column',
		backgroundColor: defaultTheme.secondaryBackGroundColor,
		borderRadius: verticalScale(10)
	},
	marginInput: {
		marginHorizontal: verticalScale(16)
	}
});
export default styles;
