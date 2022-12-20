import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../../../theme';
import {defaultTheme} from '../../../../theme/defaultTheme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	button: {
		marginVertical: verticalScale(10),
		marginHorizontal: horizontalScale(20),
		height: 60,
		borderRadius: 8,
		justifyContent: 'center'
	}
});
