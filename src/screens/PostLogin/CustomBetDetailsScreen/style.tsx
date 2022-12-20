/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {Fonts, horizontalScale} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import fonts from '../../../theme/fonts';
import {
	moderateFontScale,
	moderateScale,
	verticalScale
} from '../../../theme/metrics';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: defaultTheme.backGroundColor
	},
	flexOne: {
		flex: 1
	},
	headerText: {
		fontFamily: fonts.type.Krona_Regular,
		fontWeight: '400',
		color: colors.white,
		fontSize: 30
	},
	img: {
		height: 6.59,
		width: 11.18
		//alignSelf: 'center'
	},
	buttonTitleText: {
		color: colors.white,
		//padding: 10,
		textAlign: 'center',
		flex: 1,
		fontSize: 18,
		fontFamily: fonts.type.Krona_Regular
		//marginLeft: horizontalScale(12),
	},
	buttonSubTitleText: {
		color: colors.white,
		paddingHorizontal: 16,
		//textAlign: 'center',
		//paddingTop: 30,
		// flex: 1,
		fontSize: 12,
		paddingBottom: 8,
		fontFamily: fonts.type.Inter_ExtraBold,
		textAlign: 'left'
	},
	buttonContainerStyle: {
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 16,
		//marginTop: 20,
		paddingHorizontal: 16,
		paddingVertical: 16
	},
	creditCardViewStyle: {
		backgroundColor: colors.black,
		//paddingVertical: 20,
		marginTop: 12,
		marginHorizontal: 16,
		borderRadius: 8
		//paddingBottom: 20,
	},
	textStyle: {
		alignSelf: 'center',
		paddingTop: 16,
		color: colors.white,
		//paddingHorizontal: 20,
		//textAlign: 'center',
		//paddingTop: 30,
		// flex: 1,
		fontFamily: Fonts.type.Inter_ExtraBold,
		fontSize: 10,
		opacity: 0.7
	},
	titleText: {
		fontFamily: fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateFontScale(25),
		textAlign: 'left',
		marginBottom: verticalScale(15)
	},
	betTitleText: {
		fontFamily: fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateFontScale(18),
		textAlign: 'left',
		flex: 0.9
	},
	subTitleText: {
		// color: colors.placeholderColor,
		// fontSize: moderateScale(10),
		// fontFamily: Fonts.type.Inter_ExtraBold,
		// paddingVertical: verticalScale(16),
		// textTransform: 'uppercase',

		fontFamily: fonts.type.Inter_ExtraBold,
		color: colors.textTitle,
		fontSize: moderateFontScale(10),
		textAlign: 'left',
		marginTop: verticalScale(4),
		marginBottom: verticalScale(15)
	},
	estimatedTimeText: {
		// fontFamily: fonts.type.Inter_ExtraBold,
		// fontSize: moderateFontScale(10),
		// color: colors.textTitle,
		// marginVertical: verticalScale(16),

		fontFamily: fonts.type.Inter_ExtraBold,
		fontSize: moderateFontScale(10),
		color: colors.textTitle,
		marginBottom: verticalScale(15)
	},
	noDataStyle: {
		fontSize: moderateScale(16),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center',
		textAlignVertical: 'center',
		marginTop: verticalScale(60)
	},
	profileContainer: {
		marginVertical: verticalScale(8),
		//marginHorizontal: horizontalScale(2),
		// shadowColor: colors.greenLight,
		// shadowOffset: {
		//   width: 0,
		//   height: 5,
		// },
		// shadowOpacity: 0.5,
		// elevation: 3,
		// shadowRadius: 5,
		flexDirection: 'row'
	},
	circleGradient: {
		width: 26,
		height: 26,
		borderRadius: 13,
		marginRight: horizontalScale(16)
	},
	rightImage: {
		height: 20,
		width: 20
	},

	oddPickText: {
		fontFamily: fonts.type.Krona_Regular,
		color: colors.white,
		fontSize: moderateFontScale(12),
		textAlign: 'left',
		flex: 1,
		marginRight: 2
	},
	viewImageStyle: {
		width: 22,
		height: 22,
		borderRadius: 11,
		borderColor: 'rgba(0,0, 0, 0.5)',
		borderWidth: 3,
		margin: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imgIconStyle: {
		width: 26,
		height: 26,
		borderRadius: 13
	},
	viewBadgeStyle: {
		width: 20,
		height: 20,
		left: 16,
		top: -2,
		position: 'absolute'
	},

	badgeStyle: {
		position: 'absolute',
		top: -4,
		left: 12
		//backgroundColor: 'red'
	},
	imageStyle: {
		height: 26.22,
		width: 40
	},
	flatListContainer: {
		//paddingHorizontal: 16,
		paddingBottom: verticalScale(70)
	},
	flatListItem: {
		borderWidth: 1,
		//flex: 1,
		marginRight: 10,
		borderRadius: 8
	},
	p2pBetView: {
		backgroundColor: colors.black,
		padding: 12,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: colors.black,
		borderRadius: 8
		//flex: 1,
	},
	p2pBetHeaderText: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems : 'center',
		flex: 1
	},
	replicateBetContainer: {
		paddingTop: verticalScale(10)
	},
	btnShowAllStyle: {
		color: colors.textTitle,
		fontSize: 12,
		fontFamily: Fonts.type.Inter_Medium,
		paddingVertical: verticalScale(8),
		textAlign: 'center'
	}
});
export default styles;
