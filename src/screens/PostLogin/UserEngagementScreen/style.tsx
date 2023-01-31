import {StyleSheet} from 'react-native';
import { colors } from 'react-native-elements';
import {Fonts, moderateScale, verticalScale} from '../../../theme';
import {defaultTheme} from '../../../theme/defaultTheme';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
    buttonView: {
		justifyContent: 'flex-end'
	},
	nextButton: {
		padding: verticalScale(16)
	},
	titleSkip: {
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_ExtraBold,
		textAlign: 'center',
        paddingTop: verticalScale(10),
		paddingBottom: verticalScale(20)
	},
});
export default styles;
