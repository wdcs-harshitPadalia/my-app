import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../../../theme';
import {defaultTheme} from '../../../../theme/defaultTheme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	bottomButtonContainer: {
		flexDirection: 'row',
		marginHorizontal: horizontalScale(20),
		marginTop: verticalScale(16),
		marginBottom: verticalScale(16)
	},
	cancleButton: {
		flex: 1,
		marginRight: horizontalScale(10)
	},
	sendButton: {
		flex: 1,
		marginLeft: horizontalScale(10),
		opacity: 1
	},
	nextButtonOpacity: {
		marginLeft: verticalScale(16),
		flex: 0.5,
		opacity: 0.5
	}
});
