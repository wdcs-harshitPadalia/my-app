/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {Fonts, moderateScale, verticalScale} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
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
		textAlign: 'center',
	},

	noDataContainer: {flex: 1, marginBottom: 90},
});
export default styles;
