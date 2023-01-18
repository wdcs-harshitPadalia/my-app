import {StyleSheet} from 'react-native';
import {Fonts} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import fonts from '../../../theme/fonts';
import {
	horizontalScale,
	moderateFontScale,
	verticalScale
} from '../../../theme/metrics';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	img: {
		height: 6.59,
		width: 11.18
	},
	buttonTitleText: {
		color: colors.white,
		textAlign: 'center',
		flex: 1,
		fontSize: moderateFontScale(18),
		fontFamily: fonts.type.Krona_Regular
	},
	buttonContainerStyle: {
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: verticalScale(16),
		flex: 1
	},
	creditCardViewStyle: {
		backgroundColor: colors.black,
		marginTop: verticalScale(12),
		marginHorizontal: verticalScale(16),
		borderRadius: 8,
		paddingHorizontal: verticalScale(16)
	},
	transferAmount: {
		color: colors.textTitle,
		textAlign: 'left',
		marginVertical: verticalScale(8),
		fontSize: moderateFontScale(12),
		fontFamily: fonts.type.Inter_Bold
	},
	payOutStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: verticalScale(16)
	},
	buttonInputStyle: {
		flex: 1
	},
	dropDown: {
		marginLeft: horizontalScale(12),
		flex: 0.7
	},
	desText: {
		color: colors.textTitle,
		textAlign: 'left',
		marginVertical: verticalScale(20),
		fontSize: moderateFontScale(14),
		fontFamily: fonts.type.Inter_Regular
	},
	imgIconStyle: {
		width: verticalScale(20),
		height: verticalScale(20),
		marginRight: horizontalScale(10)
	},
	viewCheckboxStyle: {
		flexDirection: 'row',
		marginTop: verticalScale(16),
		marginBottom: verticalScale(4)
		// backgroundColor: colors.white,
	},
	acceptStyle: {
		fontSize: verticalScale(14),
		color: colors.textTitle,
		fontFamily: Fonts.type.Inter_Medium
	},
	priceTextStyle: {
		fontSize: verticalScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_ExtraBold
	},
	priceViewStyle: {
		marginTop: verticalScale(-8),
		marginBottom: verticalScale(10)
	}
});
export default styles;
