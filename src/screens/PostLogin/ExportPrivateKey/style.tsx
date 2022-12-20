/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import { horizontalScale, verticalScale } from '../../../theme';
import colors from '../../../theme/colors';
import { defaultTheme } from '../../../theme/defaultTheme';
import fonts from '../../../theme/fonts';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor,
	},
	headerText: {
		fontFamily: fonts.type.Krona_Regular,
		fontWeight: '400',
		color: colors.white,
		fontSize: 30,
	},
	copyText: {
		color: colors.white,
		//padding: 10,
		textAlign: 'left',
		flex: 1,
		fontSize: 14,
		fontFamily: fonts.type.Inter_Bold,
		marginLeft: horizontalScale(12),
	},
	copyTextContainer: {
		backgroundColor: defaultTheme.backGroundColor,
		marginTop: horizontalScale(30),
		borderRadius: 8,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 12,
	},
	title: {
		color: colors.white,
		//padding: 10,
		textAlign: 'center',
		//flex: 1,
		fontSize: 18,
		fontFamily: fonts.type.Krona_Regular,
		marginLeft: horizontalScale(12),
	},
	rootViewStyle:  {
		backgroundColor: colors.black,
		marginTop: verticalScale(20),
		marginHorizontal: horizontalScale(20),
		padding: 20,
		borderRadius: 8,
	},
	subContainer: {flexDirection: 'row', alignItems: 'center'}
});
export default styles;
