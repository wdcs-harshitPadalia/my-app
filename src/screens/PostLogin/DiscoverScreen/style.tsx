/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {Fonts, horizontalScale, verticalScale} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import {moderateFontScale, safeAreaInsets} from '../../../theme/metrics';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	viewContain: {
		marginTop: horizontalScale(16)
	},
	viewSearch: {
		marginHorizontal: horizontalScale(16),
		marginTop: verticalScale(12)
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
	viewFriend: {
		marginHorizontal: horizontalScale(8),
		flex: 1
		// marginVertical: horizontalScale(16),
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
		marginHorizontal: horizontalScale(16)
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
		alignItems: 'center'
	},
	swipeImage: {
		height: 30,
		width: 30
	}
});
export default styles;
