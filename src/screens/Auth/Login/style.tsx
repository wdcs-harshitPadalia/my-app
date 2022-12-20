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
		flex: 1
	},

	imageStyle: {width: '100%', height: '100%', position: 'absolute', top: 0},
	viewLogo: {
		paddingTop: verticalScale(80),
		marginHorizontal: horizontalScale(24),
		flexDirection: 'row',
		alignItems: 'center'
		//backgroundColor: 'red',
		//flexWrap: 'wrap',
	},
	imgLogo: {
		height: 60,
		width: 60
	},
	descriptionStyle: {
		fontSize: moderateScale(18),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		flexWrap: 'wrap',
		flex: 1,
		marginHorizontal: horizontalScale(20)
	},
	viewContain: {
		marginTop: verticalScale(20),
		marginHorizontal: horizontalScale(16),
		flexDirection: 'column',
		backgroundColor: defaultTheme.secondaryBackGroundColor,
		borderRadius: 20
	},
	marginInput: {
		marginHorizontal: horizontalScale(16),
		marginTop: horizontalScale(20)
	},
	loginButtonStyle: {
		marginHorizontal: horizontalScale(16),
		marginTop: verticalScale(16),
		marginBottom: verticalScale(24)
	},
	loginButtonSocial: {
		marginHorizontal: verticalScale(16),
		marginTop: verticalScale(16)
	},
	orConnectWithStyle: {
		fontSize: moderateScale(12),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_Regular,
		marginTop: verticalScale(40),
		textAlign: 'center'
	}
});
export default styles;
