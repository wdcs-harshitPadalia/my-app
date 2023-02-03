import React from 'react';
import {
	View,
	StyleSheet,
	TextInputProps,
	Text,
	TouchableOpacity,
	Platform
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import {decimalValue} from '../constants/api';
import Strings from '../constants/strings';
import {
	dateConvert,
	getRoundDecimalValue,
	timeConvert
} from '../constants/utils/Function';

import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';
import ButtonGradientWithRightIcon from './ButtonGradientWithRightIcon';
import GameSelectionView from './GameSelectionView';
import GradientText from './GradientText';

interface Props extends TextInputProps {
	popupTitle?: string;
	betType?: string;
	categoryName?: string;
	localTeamName?: string;
	visitorTeamName?: string;
	betAmount?: string;
	paysBetAmount?: string;
	betUsdAmount?: string;
	paysBetUsdAmount?: string;
	gameEndDate?: string;
	gameEndTime?: string;
	betOdds?: string;
	isSelectCurrency?: any;
	selectMySideType?: string;
	onPressNeedHelp?: () => void;
	winningPercentage?: string;
	oppositeBetOdds?: string;
	question?: string;
	selectMainMarket?: string;
	selectedGameData?: any;
	isShowOpponentPays?: boolean;
	opponentTitle?: string;
	oppositeBetAmount?: string;
	oppositeBetUsdAmount?: string;
	isShowOpponent?: boolean;
	isSelectedLeagueType?: number;
	profileImgPath: string;
	joinEndTime?: string;
}

const BetsDetailsView: React.FC<Props> = props => {
	const {
		popupTitle,
		betType,
		categoryName,
		localTeamName,
		visitorTeamName,
		betOdds,
		isSelectCurrency,
		selectMySideType,
		betUsdAmount,
		gameEndDate,
		gameEndTime,
		onPressNeedHelp,
		winningPercentage,
		oppositeBetOdds,
		question,
		selectedGameData,
		oppositeBetUsdAmount,
		selectMainMarket,
		isSelectedLeagueType,
		profileImgPath,
		joinEndTime
	} = props;

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
						time={timeConvert(
							selectedGameData.gmt_timestamp ?? selectedGameData?.end_date_time
						)}
						date={dateConvert(
							selectedGameData.gmt_timestamp ?? selectedGameData?.end_date_time
						)}
					/>
				) : null}
				<GameSelectionView
					colorArray={defaultTheme.ternaryGradientColor}
					visitorTeamName={''}
					localTeamName={
						isSelectedLeagueType === 1 || isSelectedLeagueType === 2
							? question
							: selectMainMarket
					}
					time={''}
					date={Strings.markets}
				/>
			</View>
			<View style={styles.viewDetails}>
				<View style={styles.viewProfile}>
					<ExpoFastImage
						style={styles.imgIconStyle}
						resizeMode="cover"
						// source={{uri: profileImgPath}}
						source={{uri: profileImgPath}}
					/>
					<Text style={styles.yourBetsStyle}>{Strings.yourBet}</Text>
				</View>
				<ButtonGradient
					colorArray={defaultTheme.primaryGradientColor}
					angle={gradientColorAngle}
					buttonTextcolor={colors.white}
					buttonText={
						selectMySideType === localTeamName ? localTeamName : visitorTeamName
					}
					style={styles.buttonInputStyle}
				/>
				<Text style={styles.betsTypeStyle}>
					{Strings.you_are_betting.toUpperCase() + ':'}
				</Text>
				<ButtonGradientWithRightIcon
					colorArray={defaultTheme.ternaryGradientColor}
					angle={gradientColorAngle}
					// rightIconPath={isSelectCurrency?.tokenImageUrl}
					short_name={
						'≈ ' +
						isSelectCurrency?.short_name +
						' ' +
						getRoundDecimalValue(
							betUsdAmount?.replace(',', '.') /
								(isSelectCurrency?.tokenPriceUsd ?? 1)
						)
					}
					editable={false}
					textValue={Strings.str_dollor + getRoundDecimalValue(betUsdAmount)}
					btnDisabled={true}
					short_nameTextStyle={{fontFamily: Fonts.type.Inter_ExtraBold}}
					style={styles.inputStyle}
				/>

				<Text style={styles.betsTypeStyle}>
					{Strings.total_payout.toUpperCase() + ':'}
				</Text>
				<ButtonGradientWithRightIcon
					colorArray={defaultTheme.ternaryGradientColor}
					angle={gradientColorAngle}
					editable={false}
					textValue={
						Strings.str_dollor +
						getRoundDecimalValue(betUsdAmount?.replace(',', '.') * betOdds)
					}
					btnDisabled={true}
					short_nameTextStyle={{fontFamily: Fonts.type.Inter_ExtraBold}}
				/>

				<View style={styles.rawContainer}>
					<Text style={[styles.AmountStyle, {color: colors.placeholderColor}]}>
						{Strings.you_will_win + ': '}
					</Text>

					<GradientText
						colors={defaultTheme.textGradientColor}
						style={styles.AmountStyle}>
						{Strings.str_dollor +
							getRoundDecimalValue(
								betUsdAmount?.replace(',', '.') * betOdds -
									betUsdAmount?.replace(',', '.')
							)}
					</GradientText>
				</View>

				<Text style={styles.betsTypeStyle}>
					{`${Strings.resolution_date}: ${gameEndDate}${gameEndTime}`.toUpperCase()}
				</Text>
				<Text style={styles.betsTypeStyle}>
					{`${Strings.JOINING_DEADLINE}: ${joinEndTime}`.toUpperCase()}
				</Text>
				<Text style={styles.betsTypeStyle}>
					{isSelectedLeagueType === 0
						? Strings.resolution_method_api.toUpperCase()
						: Strings.resolution_method_manual.toUpperCase()}
				</Text>
				<View style={styles.rawContainer}>
					<Text style={styles.betsTypeStyle}>
						{`${Strings.fee_over_the_winnings}: ${winningPercentage}%`.toUpperCase()}
					</Text>
					<TouchableOpacity onPress={onPressNeedHelp}>
						<ExpoFastImage
							resizeMode={'contain'}
							source={icons.help}
							style={styles.helpImg}
						/>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.viewDetails}>
				<View style={styles.viewProfile}>
					<ExpoFastImage
						style={styles.imgIconStyle}
						resizeMode="cover"
						// source={{uri: profileImgPath}}
						source={icons.userDummy}
					/>
					<Text style={styles.yourBetsStyle}>{Strings.your_opponents_bet}</Text>
				</View>
				<ButtonGradient
					colorArray={defaultTheme.primaryGradientColor}
					angle={gradientColorAngle}
					buttonTextcolor={colors.white}
					buttonText={
						selectMySideType !== localTeamName ? localTeamName : visitorTeamName
					}
					style={styles.buttonInputStyle}
				/>
				<Text style={styles.betsTypeStyle}>
					{Strings.your_opponent_is_betting.toUpperCase()}
				</Text>
				<ButtonGradientWithRightIcon
					colorArray={defaultTheme.ternaryGradientColor}
					angle={gradientColorAngle}
					short_name={
						'≈ ' +
						isSelectCurrency?.short_name +
						' ' +
						getRoundDecimalValue(
							parseFloat(
								oppositeBetUsdAmount?.replace(',', '.') /
									(isSelectCurrency?.tokenPriceUsd ?? 1)
							)
						)
					}
					editable={false}
					textValue={
						Strings.str_dollor +
						getRoundDecimalValue(oppositeBetUsdAmount?.replace(',', '.'))
					}
					btnDisabled={true}
					short_nameTextStyle={{fontFamily: Fonts.type.Inter_ExtraBold}}
					style={styles.inputStyle}
				/>

				<Text style={styles.betsTypeStyle}>
					{Strings.total_payout.toUpperCase() + ':'}
				</Text>
				<ButtonGradientWithRightIcon
					colorArray={defaultTheme.ternaryGradientColor}
					angle={gradientColorAngle}
					editable={false}
					textValue={
						Strings.str_dollor +
						getRoundDecimalValue(
							oppositeBetUsdAmount?.replace(',', '.') * oppositeBetOdds
						)
					}
					btnDisabled={true}
					short_nameTextStyle={{fontFamily: Fonts.type.Inter_ExtraBold}}
				/>

				<View style={styles.rawContainer}>
					<Text style={[styles.AmountStyle, {color: colors.placeholderColor}]}>
						{Strings.your_opponent_will_win + ': '}
					</Text>

					<GradientText
						colors={defaultTheme.textGradientColor}
						style={styles.AmountStyle}>
						{Strings.str_dollor +
							getRoundDecimalValue(
								oppositeBetUsdAmount?.replace(',', '.') * oppositeBetOdds -
									oppositeBetUsdAmount?.replace(',', '.')
							)}
					</GradientText>
				</View>
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
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row'
	},
	yourBetsStyle: {
		color: colors.white,
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular,
		marginHorizontal: horizontalScale(16)
	},
	imgIconStyle: {
		width: 40,
		height: 40,
		borderRadius: 20
	},
	rawContainer: {flexDirection: 'row'},
	AmountStyle: {
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginVertical: horizontalScale(16)
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
	}
});

export default BetsDetailsView;
