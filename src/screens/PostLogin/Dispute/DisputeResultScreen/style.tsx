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
	nextButton: {
		paddingHorizontal: verticalScale(16)
	},
	nextButtonOpacity: {
		marginLeft: verticalScale(16),
		flex: 0.5,
		opacity: 0.5
	},

	containerInner: {
		marginTop: verticalScale(25),
		marginBottom: verticalScale(25),
		padding: 20
	},
	containerBottom: {
		marginStart: horizontalScale(20),
		marginEnd: horizontalScale(20),
		marginBottom: horizontalScale(20)
	},
	headerText: {
		color: colors.white,
		textAlign: 'center',
		fontSize: moderateScale(24),
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
	progress: {
		marginHorizontal: horizontalScale(20)
	},
	continueButton: {
		paddingHorizontal: horizontalScale(16),
		marginBottom: verticalScale(16)
		// position: 'absolute',
		// bottom: 10,
		// alignSelf: 'center',
	},
	resultViewContainer: {
		marginVertical: verticalScale(20)
	},
	resultViewMiddleContainer: {
		paddingVertical: verticalScale(20),
		paddingHorizontal: horizontalScale(20),
		marginBottom: horizontalScale(0)
	},
	resultViewMiddleTitleText: {
		marginBottom: verticalScale(20),
		textAlign: 'center',
		fontWeight: '700',
		fontSize: moderateScale(10),
		fontFamily: fonts.type.Inter_Regular,
		color: colors.white,
		textTransform: 'uppercase'
	},
	resultViewMiddleSubTitleText: {
		marginBottom: verticalScale(16),
		textAlign: 'center',
		fontSize: moderateScale(24),
		fontWeight: '400',
		fontFamily: fonts.type.Krona_Regular,
		color: colors.white
	},
	subTitilText: {
		color: colors.white,
		textAlign: 'center',
		fontSize: moderateScale(12),
		fontFamily: fonts.type.Inter_Regular,
		marginBottom: verticalScale(20)
	},
	contentStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: verticalScale(10),
		paddingHorizontal: horizontalScale(20)
	},
	resultStrikeText: {
		marginBottom: verticalScale(10),
		fontSize: moderateScale(10),
		fontFamily: fonts.type.Inter_Regular,
		fontWeight: '700',
		color: colors.white,
		textAlign: 'center'
	},
	moreAboutLinkText: {
		marginVertical: verticalScale(20),
		fontSize: moderateScale(12),
		fontFamily: fonts.type.Inter_Regular,
		fontWeight: '500',
		textDecorationLine: 'underline',
		color: colors.white,
		textAlign: 'center'
	},
	scollViewContainer: {marginHorizontal: horizontalScale(16), flex: 1},
	btnRightIcon: {
		height: 16,
		width: 16,
		marginLeft: horizontalScale(10),
		marginVertical: verticalScale(0)
	},
	rightIcon: {
		height: 35,
		width: 35
	},
	rightIconStyle: {
		// for ios
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOffset: {width: -2, height: 4},
		shadowOpacity: 0.4,
		shadowRadius: 3,
		// for android
		elevation: 20
	}
});
