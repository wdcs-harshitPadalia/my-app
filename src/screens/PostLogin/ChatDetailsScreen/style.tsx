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
	viewContain: {
		marginHorizontal: horizontalScale(16),
		flex: 1
	},
	titleText: {
		fontFamily: Fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateScale(18),
		textAlign: 'left',
		marginVertical: horizontalScale(12)
	},
	item: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8
	},
	header: {
		fontFamily: Fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateScale(18),
		backgroundColor: defaultTheme.backGroundColor,
		paddingVertical: verticalScale(10)
	},
	title: {
		fontSize: 24
	},
	imgIconStyle: {
		width: 46,
		height: 46,
		borderRadius: 23,
		marginLeft: horizontalScale(10)
	},
	viewBadgeStyle: {
		width: 26,
		height: 26,
		borderRadius: 13,
		right: -10,
		top: -5,
		position: 'absolute',
		backgroundColor: colors.white,
		justifyContent: 'center',
		alignItems: 'center'
	},
	badgeIconStyle: {
		width: 16,
		height: 16
	}
});
export default styles;
