import {StyleSheet} from 'react-native';
import { verticalScale } from '../../../theme';
import {defaultTheme} from '../../../theme/defaultTheme';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor,
		paddingBottom: verticalScale(25)
	}
});
export default styles;
