import {StyleSheet} from 'react-native';
import {
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import {width} from '../../../theme/metrics';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	viewContain: {
		flex: 1,
		marginVertical: verticalScale(10),
		marginHorizontal: horizontalScale(16)
	},
	noDataStyle: {
		fontSize: moderateScale(16),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginVertical: verticalScale(24),
		textAlign: 'center',
		textAlignVertical: 'center',
		marginTop: verticalScale(250),
		width: width
	}
});
export default styles;
