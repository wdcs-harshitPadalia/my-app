import {StyleSheet} from 'react-native';
import {
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../../../../theme';
import colors from '../../../../theme/colors';
import {defaultTheme} from '../../../../theme/defaultTheme';
import fonts from '../../../../theme/fonts';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	viewBackButton: {
		flexDirection: 'row',
		paddingVertical: verticalScale(10),
		paddingHorizontal: verticalScale(20)
	},
	backButton: {
		flex: 1,
		marginEnd: verticalScale(16)
	},
	nextButton: {
		flex: 1
	},
	nextButtonOpacity: {
		marginLeft: verticalScale(16),
		flex: 0.5,
		opacity: 0.5
	},
	imgLogo: {
		alignSelf: 'center',
		marginTop: verticalScale(30),
		height: 50,
		width: 50
	},
	containerInner: {
		borderRadius: 10,
		backgroundColor: colors.black,
		marginTop: verticalScale(25),
		marginBottom: verticalScale(25),
		marginHorizontal: horizontalScale(20),
		padding: 20
	},
	headerText: {
		color: colors.white,
		textAlign: 'center',
		fontSize: moderateScale(18),
		fontFamily: fonts.type.Krona_Regular,
		marginBottom: horizontalScale(20)
	},
	subTitleText: {
		color: colors.white,
		textAlign: 'center',
		fontSize: moderateScale(12),
		fontFamily: fonts.type.Inter_Regular,
		marginBottom: horizontalScale(20)
	},
	marginInput: {
		opacity: 0.7
	},
	AmountStyle: {
		fontSize: moderateScale(12),
		marginTop: horizontalScale(10),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_ExtraBold
	},
	subTitleUpperCaseBoldFont: {
		textTransform: 'uppercase',
		fontFamily: fonts.type.Inter_Bold
	},
	subTitleMarginUppercase: {marginTop: 20, textTransform: 'uppercase'},
	subTitleMarginHorizontalUppercase: {
		marginTop: 20,
		textTransform: 'uppercase',
		marginHorizontal: horizontalScale(20)
	}
});
