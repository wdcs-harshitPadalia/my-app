/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import fonts from '../../../theme/fonts';
import {height} from '../../../theme/metrics';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	headerText: {
		fontFamily: fonts.type.Krona_Regular,
		fontWeight: '400',
		color: colors.white,
		fontSize: 30
	},
	copyText: {
		color: colors.white,
		//padding: 10,
		textAlign: 'left',
		flex: 1,
		fontSize: 14,
		fontFamily: fonts.type.Inter_Bold,
		marginLeft: horizontalScale(12)
	},
	copyTextContainer: {
		backgroundColor: defaultTheme.backGroundColor,
		marginTop: horizontalScale(30),
		borderRadius: 8,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 12
	},
	title: {
		color: colors.white,
		//padding: 10,
		textAlign: 'center',
		//flex: 1,
		fontSize: 18,
		fontFamily: fonts.type.Krona_Regular,
		marginLeft: horizontalScale(12)
	},
	rootView: {
		backgroundColor: colors.black,
		marginVertical: verticalScale(20),
		marginHorizontal: horizontalScale(16),
		padding: 20,
		borderRadius: 8,
		flex: 1
	},
	flatListView: {
		flex: 1,
		paddingBottom: 20
	},
	flatListContainer: {marginHorizontal: 0, flex: 1},
	dateTitleContainer: {
		alignItems: 'center',
		paddingTop: verticalScale(20),
		backgroundColor: colors.black,
		paddingBottom: verticalScale(5)
	},
	dateTitleTextStyle: {
		color: colors.textTitle,
		fontFamily: Fonts.type.Inter_Medium,
		fontSize: 12
	},
	subTitleText: {
		fontFamily: fonts.type.Inter_Regular,
		fontSize: 12,
		color: colors.white,
		opacity: 0.7,
		marginBottom: 5
	},
	titleText: {
		fontFamily: fonts.type.Inter_ExtraBold,
		fontSize: 12,
		color: colors.white,
		flex: 1,
		textAlign: 'left',
		marginBottom: 5
	},
	amountText: {
		fontFamily: fonts.type.Inter_ExtraBold,
		fontSize: 12,
		color: colors.white
	},
	titleViewStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	noDataStyle: {
		fontSize: moderateScale(16),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginVertical: verticalScale(24),
		textAlign: 'center'
	},
	noDataContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		zIndex: -1
	}
});
export default styles;
