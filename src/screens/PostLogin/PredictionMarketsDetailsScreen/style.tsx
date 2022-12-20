import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	containerSubView: {
		marginHorizontal: horizontalScale(16),
		marginVertical: verticalScale(10)
	},
	liquidityNumberView: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: verticalScale(25),
		paddingTop: verticalScale(20),
		borderRadius: verticalScale(8)
	},
	itemSeparatorView: {
		width: horizontalScale(20),
		backgroundColor: colors.transparent
	}
});
export default styles;
