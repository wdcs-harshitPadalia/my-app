import {StyleSheet} from 'react-native';
import {verticalScale} from '../../../theme';
import {defaultTheme} from '../../../theme/defaultTheme';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	buttonInputStyle: {
		margin: verticalScale(20)
	},
	noDataContainer: {
		flex: 1,
		paddingHorizontal: verticalScale(5)
	}
});

export default styles;
