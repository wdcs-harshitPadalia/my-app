import {StyleSheet} from 'react-native';
import {
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../../../../theme';
import colors from '../../../../theme/colors';
import {defaultTheme} from '../../../../theme/defaultTheme';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	titleStyle: {
		color: colors.placeholderColor,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		paddingVertical: verticalScale(16)
	},
	gameTitleStyle: {
		fontFamily: Fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateScale(25),
		textAlign: 'left'
	},
	reviewTitleStyle: {
		fontSize: moderateScale(24),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginTop: verticalScale(30),
		marginBottom: verticalScale(20),

		textAlign: 'center'
	},
	categoryLabelStyle: {
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_ExtraBold,
		paddingRight: verticalScale(8)
	},
	viewTag: {
		flexDirection: 'row',
		paddingTop: verticalScale(20),
		// justifyContent: 'center',
		alignItems: 'center'
	},
	marginInput: {
		marginTop: horizontalScale(16)
	},
	viewContain: {
		paddingVertical: verticalScale(8),
		paddingHorizontal: verticalScale(16),
		flexDirection: 'column',
		flex: 1
	},
	sportsFlatList: {marginTop: horizontalScale(8), marginLeft: -6},
	viewBackButton: {
		flexDirection: 'row',
		paddingVertical: verticalScale(10),
		paddingHorizontal: verticalScale(16)
	},
	continueFeedButton: {
		marginVertical: verticalScale(16),
		marginHorizontal: horizontalScale(16)
	},
	continueFeedButtonOpacity: {
		marginVertical: verticalScale(16),
		marginHorizontal: horizontalScale(16),
		opacity: 0.5
	},

	backButton: {
		flex: 0.5
	},
	nextButton: {
		marginLeft: verticalScale(16),
		flex: 0.5
	},

	userInviteStyle: {
		marginTop: verticalScale(20)
	},
	titleDoneStyle: {
		fontSize: moderateScale(24),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center'
	},
	viewDoneStyle: {
		flex: 1,
		justifyContent: 'center'
	},
	viewNeedHelpStyle: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		marginVertical: verticalScale(10)
	},
	helpImg: {
		height: 16,
		width: 16,
		marginRight: verticalScale(8)
	},
	underlineStyle: {
		textDecorationLine: 'underline',
		fontSize: moderateScale(12),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_Bold
	}
});
export default styles;
