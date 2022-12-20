import {StyleSheet} from 'react-native';
import {
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import fonts from '../../../theme/fonts';
import {height} from '../../../theme/metrics';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	innerContainer: {
		flex: 1,
		marginTop: verticalScale(16),
		marginHorizontal: horizontalScale(16)
	},
	headerText: {
		marginBottom: horizontalScale(8),
		color: colors.white,
		fontSize: moderateScale(24),
		fontFamily: fonts.type.Krona_Regular,
		fontWeight: '400'
	},
	subTitleText: {
		marginBottom: horizontalScale(8),
		color: colors.white,
		fontSize: moderateScale(16),
		fontFamily: fonts.type.Inter_Regular,
		fontWeight: '500',
		opacity: 0.65
	},
	notPartJuryContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	hammerImg: {
		height: 175,
		width: '100%'
	},
	notPartJuryTitleText: {
		marginBottom: verticalScale(8),
		color: colors.white,
		fontSize: moderateScale(24),
		fontFamily: fonts.type.Krona_Regular,
		fontWeight: '400',
		textAlign: 'center'
	},
	notPartJuryDescText: {
		color: colors.white,
		fontSize: moderateScale(16),
		fontFamily: fonts.type.Inter_Regular,
		fontWeight: '500',
		textAlign: 'center',
		opacity: 0.65
	}
});

export default styles;
