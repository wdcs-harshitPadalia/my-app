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
		backgroundColor: defaultTheme.backGroundColor,
		paddingBottom: verticalScale(28)
	},
	viewReferral: {
		backgroundColor: colors.black,
		marginTop: verticalScale(20),
		marginHorizontal: horizontalScale(20),
		paddingHorizontal: horizontalScale(16),
		borderRadius: verticalScale(8)
	},
	textTitle: {
		color: colors.white,
		textAlign: 'center',
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular,
		margin: verticalScale(20)
	},
	viewCode: {
		backgroundColor: defaultTheme.backGroundColor,
		borderRadius: 8,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: verticalScale(12)
	},
	codeText: {
		color: colors.white,
		textAlign: 'center',
		flex: 1,
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Inter_Bold,
		marginLeft: horizontalScale(12)
	},
	codeDesText: {
		color: colors.grayLightText,
		textAlign: 'left',
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Medium,
		marginVertical: verticalScale(20)
	},
	referralText: {
		color: colors.white,
		textAlign: 'center',
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Krona_Regular
	},
	imageStyle: {
		height: 15,
		width: 13,
		marginLeft: horizontalScale(12)
	},
	marginInput: {
		marginVertical: verticalScale(20)
		// marginHorizontal: horizontalScale(16)
	},
	viewAlreadyReferral: {
		backgroundColor: colors.black,
		marginTop: verticalScale(20),
		marginHorizontal: horizontalScale(20),
		padding: horizontalScale(16),
		borderRadius: verticalScale(8),
		flexDirection: 'row',
		justifyContent: 'center',
		flexWrap: 'wrap'
	}
});
export default styles;
