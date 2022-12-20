import {StyleSheet} from 'react-native';

import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import fonts from '../../../theme/fonts';

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
		fontSize: 18,
		fontFamily: fonts.type.Krona_Regular
	},
	buttonContainerStyle: {
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 16,
		flex: 1
	},
	creditCardViewStyle: {
		backgroundColor: colors.black,
		marginTop: 12,
		marginHorizontal: 16,
		borderRadius: 8,
		paddingHorizontal: 16
	}
});
export default styles;
