import {Platform, StyleSheet} from 'react-native';
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
	viewSearch: {
		marginHorizontal: horizontalScale(16),
		paddingTop: verticalScale(4),
		alignItems: 'center'
	},
	viewSubContain: {
		marginHorizontal: horizontalScale(16),
		marginBottom: horizontalScale(60),
		...Platform.select({
			web: {
				//height: '100%',
				flex: 1
			}
		})
	},
	dateTitleContainer: {
		alignItems: 'center',
		paddingTop: verticalScale(6),
		backgroundColor: defaultTheme.backGroundColor,
		paddingBottom: verticalScale(5)
	},
	dateTitleTextStyle: {
		color: colors.textTitle,
		fontFamily: Fonts.type.Inter_Medium,
		fontSize: moderateScale(12),
		paddingBottom: verticalScale(16)
	}
});
export default styles;
