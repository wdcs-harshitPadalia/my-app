/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {Fonts, horizontalScale} from '../../../theme';
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
	},
	img: {
		height: 6.59,
		width: 11.18,
		//alignSelf: 'center'
	},
	buttonTitleText: {
		color: colors.white,
		//padding: 10,
		textAlign: 'center',
		flex: 1,
		fontSize: 18,
		fontFamily: fonts.type.Krona_Regular,
		//marginLeft: horizontalScale(12),
	},
	buttonSubTitleText: {
		color: colors.white,
		// paddingHorizontal: 16,
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
		//marginHorizontal: 16,
		//marginTop: 20,
		//paddingHorizontal: 16,
		paddingVertical: 16,
		flex: 1,
	},
	creditCardViewStyle: {
		backgroundColor: colors.black,
		//paddingVertical: 20,
		marginTop: 12,
		marginHorizontal: 16,
		borderRadius: 8,
		//paddingBottom: 20,
		paddingHorizontal: 16,
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
	imgStyle: {
		height: 21.5,
		width: 21.5,
		alignSelf: 'center',
		marginVertical: 16,
	},
	inputView: {flexDirection: 'row', marginTop: 16},
	marginInput: {
		marginHorizontal: horizontalScale(16),
	},
});
export default styles;
