/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {Fonts, horizontalScale, verticalScale} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import fonts from '../../../theme/fonts';
import { width } from '../../../theme/metrics';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor,
	},
	wrapper: {
		marginHorizontal: horizontalScale(16),
	},
	headerText: {
		fontFamily: fonts.type.Krona_Regular,
		fontWeight: '400',
		color: colors.white,
		fontSize: 30,
	},
	img: {
		height: 6.59,
		width: 11.18,
		//alignSelf: 'center'
	},
	tagViewContainer: {
		flexDirection: 'row',
		backgroundColor: colors.black,
		marginTop: verticalScale(10),
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: verticalScale(10),
		justifyContent: 'space-between',
	},
	durationChipImage :{
		height: 15,
		width: 15,
		marginRight: horizontalScale(10),
	},
	doneButton: {
		flex: 1,
		marginTop: verticalScale(30),
		marginBottom: verticalScale(16),
		paddingVertical: verticalScale(20),
		justifyContent: 'center',
	},
	tagsStyle: {
		//marginLeft: horizontalScale(8),
		paddingVertical: verticalScale(13),
		width: width / 3 - 70 / 3,
		justifyContent: 'center',
		paddingHorizontal: 0,
		//marginRight: 8,
	},
	buttonTitleText: {
		color: colors.white,
		//padding: 10,
		//textAlign: 'center',
		//flex: 1,
		fontSize: 18,
		fontFamily: fonts.type.Krona_Regular,
		marginTop: verticalScale(20),
		//marginLeft: horizontalScale(12),
	},
	buttonSubTitleText: {
		color: colors.white,
		paddingHorizontal: 16,
		//textAlign: 'center',
		//paddingTop: 30,
		// flex: 1,
		fontSize: 12,
		paddingBottom: 8,
		fontFamily: fonts.type.Inter_ExtraBold,
		textAlign: 'left',
	},
	buttonContainerStyle: {
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 16,
		//marginTop: 20,
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	creditCardViewStyle: {
		backgroundColor: colors.black,
		//paddingVertical: 20,
		marginTop: 12,
		marginHorizontal: 16,
		borderRadius: 8,
		//paddingBottom: 20,
	},
	textStyle: {
		alignSelf: 'center',
		paddingTop: 16,
		color: colors.white,
		//paddingHorizontal: 20,
		//textAlign: 'center',
		//paddingTop: 30,
		// flex: 1,
		fontFamily: Fonts.type.Inter_ExtraBold,
		fontSize: 10,
		opacity: 0.7,
	},
});
export default styles;
