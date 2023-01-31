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
		marginVertical: verticalScale(24),
		textAlign: 'center'
	},
	subTitleStyle: {
		fontSize: moderateScale(16),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_Regular,
		marginBottom: verticalScale(16)
	},
	viewContain: {
		paddingVertical: verticalScale(8),
		paddingHorizontal: verticalScale(16),
		flexDirection: 'column',
		flex: 1
	},
	marginInput: {
		marginHorizontal: verticalScale(16)
	},
	viewBackButton: {
		flexDirection: 'row',
		paddingVertical: verticalScale(10),
		paddingHorizontal: verticalScale(16)
	},
	backButton: {
		flex: 0.5
	},
	nextButton: {
		marginLeft: verticalScale(16),
		flex: 0.5
	},
	nextButtonOpacity: {
		marginLeft: verticalScale(16),
		flex: 0.5,
		opacity: 0.5
	},
	errStyle: {
		color: colors.red,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Regular,
		paddingHorizontal: horizontalScale(8),
		paddingTop: 5
	}
});
export default styles;
