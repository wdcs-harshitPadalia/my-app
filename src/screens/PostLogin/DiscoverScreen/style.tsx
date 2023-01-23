/* eslint-disable prettier/prettier */
import {Platform, StatusBar, Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts, horizontalScale, verticalScale} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import fonts from '../../../theme/fonts';
import {
	height,
	Metrics,
	moderateFontScale,
	screenWidth
} from '../../../theme/metrics';

const screen_Height =
	Platform.OS === 'android'
		? Metrics.hasNotch
			? height + (StatusBar.currentHeight ?? verticalScale(24))
			: height
		: height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},

	viewSearch: {
		marginHorizontal: horizontalScale(16),
		// marginTop: verticalScale(12),
		backgroundColor: defaultTheme.backGroundColor
	},
	viewSubContain: {
		// marginHorizontal: horizontalScale(16),
		marginVertical: horizontalScale(8),
		flex: 1
	},
	titleText: {
		fontFamily: Fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateFontScale(18),
		textAlign: 'left',
		marginVertical: horizontalScale(12),
		marginHorizontal: horizontalScale(18)
	},
	loginButtonSocial: {
		marginTop: verticalScale(16),
		marginHorizontal: horizontalScale(16),
		marginBottom: horizontalScale(4)
	},
	viewRecentFriend: {
		marginHorizontal: horizontalScale(16),
		marginVertical: horizontalScale(16),
		flex: 1
	},
	btnSearch: {
		position: 'absolute',
		right: 0
	},
	tabView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		left: 0,
		right: 0,
		marginHorizontal: horizontalScale(16),
		zIndex: 100
	},
	iconSearch: {
		height: 30,
		width: 30
	},
	swipeText: {
		fontFamily: Fonts.type.Inter_Medium,
		color: colors.placeholderColor,
		fontSize: moderateFontScale(12),
		marginVertical: verticalScale(10)
	},
	swipeView: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 100,
		alignSelf: 'center'
	},
	swipeImage: {
		height: 30,
		width: 30
	},
	fullScreenImageBg: {
		height: screen_Height,
		width: screenWidth,
		justifyContent: 'center',
		alignItems: 'center'
		// paddingHorizontal: 16
	},
	innerRootView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	innerTopView: {
		flex: 0.5,
		width: screenWidth - horizontalScale(24),
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginBottom: verticalScale(4)
	},
	innerBottomView: {
		flex: 0.5,
		width: screenWidth - horizontalScale(16),
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: verticalScale(4)
	},
	errorInfoView: {
		justifyContent: 'center',
		alignItems: 'center',
		height: Dimensions.get('screen').height
	},
	tryAgainTextStyle: {
		fontSize: verticalScale(14),
		fontFamily: fonts.type.Inter_Medium,
		color: Colors.white,
		textDecorationLine: 'underline'
	},
	errorText: {
		fontSize: verticalScale(14),
		fontFamily: fonts.type.Inter_Medium,
		color: Colors.white
	},
	img: {
		height: verticalScale(44),
		width: verticalScale(44)
	},
	errorView: {
		marginTop: verticalScale(20)
	}
});
export default styles;
