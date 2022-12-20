/* eslint-disable prettier/prettier */
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
		marginTop: verticalScale(20),
		marginHorizontal: horizontalScale(16),
		flexDirection: 'column'
	},
	nameStyle: {
		fontSize: moderateScale(33),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center'
	},
	userNameStyle: {
		fontSize: moderateScale(18),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center'
	},
	noobNameStyle: {
		fontSize: moderateScale(14),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center',
		marginTop: verticalScale(4)
	},
	viewUserInfo: {
		borderRadius: verticalScale(10),
		marginTop: verticalScale(16)
	},
	userGroupStyle: {
		marginTop: verticalScale(16)
	},
	userBetsViewStyle: {
		marginTop: verticalScale(16),
		marginBottom: verticalScale(16)
	},
	viewChart: {
		backgroundColor: defaultTheme.secondaryBackGroundColor,
		borderRadius: verticalScale(10),
		marginTop: verticalScale(16),
		paddingBottom: verticalScale(16)
	},
	statisticsTitleStyle: {
		fontSize: moderateScale(18),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center',
		margin: verticalScale(16)
	},
	categoryStyle: {
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_Bold,
		textAlign: 'left',
		margin: verticalScale(16)
	},
	currencyStyle: {
		// marginTop: verticalScale(16),
		marginBottom: verticalScale(16)
	},
	betsStyle: {
		// marginTop: verticalScale(16),
		// marginBottom: verticalScale(16),
	},
	viewMoreBetStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginBottom: verticalScale(16)
	},
	viewMoreTestStyle: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Krona_Regular,
		marginLeft: horizontalScale(14)
	},
	positionAbsolute: {
		// position: 'absolute',
		top: 0,
		left: 0,
		right: 0
	},
	bioGraphyStyle: {
		fontSize: moderateScale(12),
		color: colors.textTitle,
		fontFamily: Fonts.type.Inter_Regular,
		textAlign: 'center',
		marginTop: verticalScale(20)
	}
});
export default styles;
