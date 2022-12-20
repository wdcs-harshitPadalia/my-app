import {StyleSheet} from 'react-native';
import {horizontalScale} from '../../../theme';
import {defaultTheme} from '../../../theme/defaultTheme';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	viewSubContain: {
		marginHorizontal: horizontalScale(16),
		marginVertical: horizontalScale(4),
		marginBottom: horizontalScale(60)
	}
});
export default styles;
