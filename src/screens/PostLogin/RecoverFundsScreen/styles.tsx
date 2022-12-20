import {StyleSheet} from 'react-native';
import {Fonts, horizontalScale, verticalScale} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import {moderateFontScale} from '../../../theme/metrics';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	image: {
		height: 300,
		width: 300
	},
	descriptionContainer: {
		backgroundColor: colors.black,
		marginHorizontal: horizontalScale(16),
		marginVertical: verticalScale(20),
		borderRadius: 8,
		// for ios
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOffset: {width: -2, height: 4},
		shadowOpacity: 0.4,
		shadowRadius: 3,
		// for android
		elevation: 20
	},
	titleText: {
		fontSize: moderateFontScale(18),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		fontWeight: '400',
		textAlign: 'center',
		marginVertical: verticalScale(20)
	},
	descriptionText: {
		fontSize: moderateFontScale(12),
		color: colors.textTitle,
		fontFamily: Fonts.type.Inter_Regular,
		fontWeight: '500',
		marginHorizontal: horizontalScale(20),
		marginVertical: verticalScale(10)
	},
	recoverButton: {
		marginHorizontal: horizontalScale(20),
		marginVertical: verticalScale(30)
	}
});
