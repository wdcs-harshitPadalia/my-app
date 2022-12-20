import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../../../theme';
import colors from '../../../../theme/colors';
import {defaultTheme} from '../../../../theme/defaultTheme';
import fonts from '../../../../theme/fonts';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	txtEvidence: {
		color: colors.white,
		fontSize: 24,
		fontWeight: '400',
		fontFamily: fonts.type.Krona_Regular,
		textAlign: 'center'
	},
	txtTimeLeft: {
		color: colors.white,
		fontSize: 10,
		fontWeight: '300',
		fontFamily: fonts.type.Inter_Regular,
		textAlign: 'center',
		textTransform: 'uppercase',
		marginVertical: verticalScale(20)
	},
	txtTimeDuration: {
		color: colors.white,
		fontSize: 24,
		fontWeight: '400',
		fontFamily: fonts.type.Krona_Regular,
		textAlign: 'center',
		textTransform: 'uppercase'
	},
	disputeCasesRootContainer: {
		backgroundColor: colors.black,
		marginTop: verticalScale(20),
		borderRadius: 8
	},
	iosShadow: {
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOffset: {width: -2, height: 4},
		shadowOpacity: 0.2,
		shadowRadius: 3
	},
	androidShadow: {
		elevation: 20,
		shadowColor: 'rgba(0,0,0,0.5)'
	},
	disputeCasesChildContainer: {
		marginHorizontal: horizontalScale(20),
		marginVertical: verticalScale(20),
		paddingBottom: verticalScale(8)
	},
	disputeCaseTitle: {
		color: colors.white,
		fontSize: 18,
		fontWeight: '400',
		fontFamily: fonts.type.Krona_Regular,
		textAlign: 'center',
		textTransform: 'capitalize'
	},
	disputeLinkPreviewContainer: {
		marginTop: verticalScale(20)
	},
	disputeLinkIcon: {
		width: 36,
		height: 36,
		marginRight: horizontalScale(4)
	},
	sendButton: {
		// position: 'absolute',
		// bottom: 10,
		// paddingHorizontal : horizontalScale(16),

		paddingHorizontal: horizontalScale(16),
		marginBottom: verticalScale(16)
	}
});

export default styles;
