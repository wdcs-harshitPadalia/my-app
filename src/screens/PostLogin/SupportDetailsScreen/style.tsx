import {Platform, StyleSheet} from 'react-native';
import {
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import {screenBottomNavHeight, width} from '../../../theme/metrics';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		//marginTop: verticalScale(20),
		//marginHorizontal: horizontalScale(12),
		marginBottom: verticalScale(
			Platform.OS === 'web' ? 0 : screenBottomNavHeight
		),
		backgroundColor: defaultTheme.backGroundColor
	},
	container1: {
		flex: 1,
		marginBottom: Platform.OS === 'web' ? 0 : verticalScale(screenBottomNavHeight),
		//marginTop: verticalScale(20),
		//marginHorizontal: horizontalScale(12),
		//marginBottom: verticalScale(screenBottomNavHeight),
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
	},
	chatContainer: {
		borderRadius: 8,
		overflow: 'hidden'
	}
});
export default styles;
