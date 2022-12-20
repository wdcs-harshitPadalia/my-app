import {StyleSheet} from 'react-native';
import {
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import {height} from '../../../theme/metrics';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	viewContain: {
		marginHorizontal: horizontalScale(12),
		flex: 1
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
	noDataStyle: {
		fontSize: moderateScale(16),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginVertical: verticalScale(24),
		textAlign: 'center'
	},
	noDataContainer: {
		height: height * 0.5
		//backgroundColor: 'red',
		//justifyContent: 'center',
	},
	usernameStyle: {
		fontSize: moderateScale(16),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginVertical: verticalScale(16)
	}
});
export default styles;
