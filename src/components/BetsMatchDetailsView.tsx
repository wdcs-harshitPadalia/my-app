import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Text,
	TouchableOpacity
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import {useSelector} from 'react-redux';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import {
	dateConvert,
	getLevelRank,
	timeConvert
} from '../constants/utils/Function';
import {RootState} from '../redux/store';

import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import GameSelectionView from './GameSelectionView';

interface Props extends TextInputProps {
	popupTitle?: string;
	betType?: string;
	categoryName?: string;
	question?: string;
	selectedGameData?: any;
	selectMainMarket?: string;
	isSelectedLeagueType?: number;
	betData?: any;
	isShowUserProfile?: boolean;
	handleRedirectUser?: () => void;
	visitProfileUserId?: any;
}

const BetsMatchDetailsView: React.FC<Props> = props => {
	const {
		popupTitle,
		betType,
		categoryName,
		question,
		selectedGameData,
		selectMainMarket,
		isSelectedLeagueType,
		betData,
		isShowUserProfile,
		handleRedirectUser,
		visitProfileUserId
	} = props;

	const userProfileInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	return (
		<View style={styles.container}>
			<View style={styles.viewDetails}>
				<Text style={styles.titleStyle}>{popupTitle}</Text>
				<Text style={styles.betsTypeStyle}>
					{Strings.betType.toUpperCase() + ': ' + betType}
				</Text>
				<Text style={styles.betsTypeStyle}>{categoryName}</Text>
				{selectedGameData !== undefined && selectedGameData !== null ? (
					<GameSelectionView
						colorArray={defaultTheme.ternaryGradientColor}
						visitorTeamName={selectedGameData.visitorTeamName}
						localTeamName={
							selectedGameData.localTeamName ?? selectedGameData?.matchName
						}
						time={timeConvert(selectedGameData.gmt_timestamp)}
						date={dateConvert(selectedGameData.gmt_timestamp)}
					/>
				) : null}
				<GameSelectionView
					colorArray={defaultTheme.ternaryGradientColor}
					visitorTeamName={''}
					localTeamName={question}
					time={''}
					date={Strings.markets}
				/>
				{!isShowUserProfile ? (
					<View style={styles.viewProfile}>
						<View>
							<Text style={styles.betTakenStyle}>
								{betData?.bet?.users?._id === userProfileInfo?.user?._id
									? Strings.taken_by.toUpperCase()
									: betData?.betTakerData?._id === userProfileInfo?.user?._id
									? Strings.maker_by.toUpperCase()
									: betData?.bet?.users?._id === visitProfileUserId
									? Strings.maker_by.toUpperCase()
									: Strings.taken_by.toUpperCase()}
							</Text>
						</View>

						<TouchableOpacity
							onPress={handleRedirectUser}
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								flex: 1
							}}>
							<View style={styles.viewImageStyle}>
								<ExpoFastImage
									style={styles.imgIconStyle}
									resizeMode="cover"
									source={{
										uri:
											betData?.bet?.users?._id === userProfileInfo?.user?._id
												? betData?.betTakerData?.picture
												: betData?.betTakerData?._id ===
												  userProfileInfo?.user?._id
												? betData?.bet?.users?.picture
												: betData?.bet?.users?._id === visitProfileUserId
												? betData?.bet?.users?.picture
												: betData?.betTakerData?.picture
									}}
								/>
								<ExpoFastImage
									style={styles.viewBadgeStyle}
									resizeMode="contain"
									source={
										getLevelRank(
											betData?.bet?.users?._id === userProfileInfo?.user?._id
												? betData?.betTakerData?.level
												: betData?.betTakerData?._id ===
												  userProfileInfo?.user?._id
												? betData?.bet?.users?.level
												: betData?.bet?.users?._id === visitProfileUserId
												? betData?.bet?.users?.level
												: betData?.betTakerData?.level
										)?.image
									}
								/>
							</View>

							<Text style={styles.betUserNameStyle}>
								{betData?.bet?.users?._id === userProfileInfo?.user?._id
									? betData?.betTakerData?.userName
									: betData?.betTakerData?._id === userProfileInfo?.user?._id
									? betData?.bet?.users?.userName
									: betData?.bet?.users?._id === visitProfileUserId
									? betData?.bet?.users?.userName
									: betData?.betTakerData?.userName}
							</Text>
						</TouchableOpacity>
					</View>
				) : null}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	viewDetails: {
		backgroundColor: defaultTheme.secondaryBackGroundColor,
		borderRadius: verticalScale(10),
		justifyContent: 'center',
		marginVertical: verticalScale(8),
		padding: horizontalScale(16)
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center',
		paddingTop: verticalScale(4),
		paddingBottom: verticalScale(16)
	},
	betsTypeStyle: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		paddingBottom: verticalScale(14),
		marginRight: verticalScale(4)
	},
	viewProfile: {
		marginTop: verticalScale(14),
		alignItems: 'center',
		flexDirection: 'row'
	},
	betTakenStyle: {
		color: colors.white,
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Inter_ExtraBold
		// marginHorizontal: horizontalScale(16),
	},
	betUserNameStyle: {
		color: colors.white,
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Krona_Regular
		// marginHorizontal: horizontalScale(16),
	},
	imgIconStyle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginHorizontal: horizontalScale(16)
	},

	buttonInputStyle: {
		marginVertical: verticalScale(20)
	},
	inputStyle: {
		marginBottom: verticalScale(16)
	},
	helpImg: {
		height: 16,
		width: 16,
		marginRight: verticalScale(8)
	},
	viewBadgeStyle: {
		width: 30,
		height: 30,
		right: -10,
		top: -2,
		position: 'absolute'
	},
	viewImageStyle: {
		width: 46,
		height: 46,
		borderRadius: 23,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: horizontalScale(12)
	}
});

export default BetsMatchDetailsView;
