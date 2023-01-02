import {StyleSheet} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	viewContain: {
		paddingVertical: verticalScale(8),
		paddingHorizontal: verticalScale(16),
		flexDirection: 'column',
		flex: 1
	},
	titleStyle: {
		fontSize: moderateScale(24),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		paddingTop: verticalScale(53),
		paddingBottom: verticalScale(20),

		textAlign: 'center'
	},
	buttonView: {
		justifyContent: 'flex-end'
	},
	nextButton: {
		padding: verticalScale(16)
	},
	titleSkip: {
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_ExtraBold,
		textAlign: 'center',
		paddingBottom: verticalScale(20)
	},
	titleDoneStyle: {
		fontSize: moderateScale(24),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		paddingTop: verticalScale(53),
		paddingBottom: verticalScale(10),
		textAlign: 'center'
	},
	viewDoneStyle: {
		flex: 1,
		justifyContent: 'center'
	},
	img: {
		height: verticalScale(200),
		width: verticalScale(200),
		marginTop: verticalScale(20),
		alignSelf: 'center'
	},
	no_data_title: {
		fontSize: moderateScale(14),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		paddingTop: verticalScale(9),
		textAlign: 'center'
	},
	lottieViewStyle: {
		height: verticalScale(300),
		width: verticalScale(300),
		alignSelf: 'center',
		position: 'absolute'
	},
	noDataContainer: {flex: 1, marginBottom: 90}
});
export default styles;
