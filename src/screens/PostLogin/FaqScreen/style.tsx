import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../../theme';
import {defaultTheme} from '../../../theme/defaultTheme';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	marginInput: {
		marginVertical: verticalScale(10),
		marginHorizontal: horizontalScale(16),
		marginBottom: verticalScale(40)
	}
});
export default styles;
