import {StyleSheet} from 'react-native';
import {Fonts, horizontalScale, verticalScale} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import {moderateFontScale, moderateScale} from '../../../theme/metrics';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor,
		justifyContent: 'center'
	},

	imageBg: {
		height: '100%',
		width: '100%',
		justifyContent: 'center'
	},
	bottomButtonContainer: {
		width: '100%',
		position: 'absolute',
		bottom: verticalScale(16)
	},
	bottomButtonView: {
		flex: 1,
		flexDirection: 'row',
		marginHorizontal: verticalScale(20)
	},
	cancleButton: {
		flex: 1,
		marginRight: horizontalScale(10)
	},
	shareButton: {
		flex: 1,
		marginLeft: horizontalScale(10),
		opacity: 1
	},
	eventDetailRootContainer: {
		// backgroundColor: '#000',
		marginHorizontal: horizontalScale(20),
		borderRadius: moderateScale(15),
		overflow: 'hidden'
	},
	eventDetailInnerContainer: {
		marginHorizontal: horizontalScale(10),
		marginVertical: verticalScale(10)
	},
	gradient: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: '100%',
		opacity: 0.4
	},
	estimatedTimeText: {
		fontFamily: Fonts.type.Inter_ExtraBold,
		fontSize: moderateFontScale(10),
		color: colors.textTitle
	},
	titleText: {
		fontFamily: Fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateFontScale(25),
		textAlign: 'left'
	},
	subTitleText: {
		fontFamily: Fonts.type.Inter_ExtraBold,
		color: colors.textTitle,
		fontSize: moderateFontScale(10),
		textAlign: 'left',
		//opacity: 0.7,
		marginTop: verticalScale(4),
		marginBottom: verticalScale(50)
	}
});
