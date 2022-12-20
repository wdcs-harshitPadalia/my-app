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
	subTitleText: {
		fontFamily: Fonts.type.Krona_Regular,
		color: colors.textTitle,
		fontSize: moderateScale(16),
		textAlign: 'left',
		marginBottom: horizontalScale(4)
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
	emptyText: {
		fontFamily: Fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateScale(16),
		textAlign: 'center'
	},
	emptyView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
export default styles;
