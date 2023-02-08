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
import {useSelector} from 'react-redux';

import icons from '../assets/icon';
import {decimalValue} from '../constants/api';
import {RootState} from '../redux/store';
import Strings from '../constants/strings';
import {getRoundDecimalValue} from '../constants/utils/Function';

import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';
import ButtonGradientWithRightIcon from './ButtonGradientWithRightIcon';
import GradientText from './GradientText';

interface Props extends TextInputProps {
	localTeamName?: string;
	visitorTeamName?: string;
	betAmount?: string;
	paysBetAmount?: string;
	betUsdAmount?: string;
	paysBetUsdAmount?: string;
	betOdds?: string;
	isSelectCurrency?: any;
	selectMySideType?: string;
	onPressNeedHelp?: () => void;
	winningPercentage?: string;
	oppositeBetAmount?: string;
	oppositeBetUsdAmount?: string;
	isShowFee?: boolean;
	isShowLost?: boolean;
	bottomTitle?: boolean;
	betData?: any;
	visitProfileUserId?: any;
	isFromResult?: boolean;
}

const BetsResultView: React.FC<Props> = props => {
	const {
		localTeamName,
		visitorTeamName,
		betOdds,
		isSelectCurrency,
		selectMySideType,
		betUsdAmount,
		onPressNeedHelp,
		winningPercentage,
		isShowFee,
		isShowLost,
		bottomTitle,
		betData,
		visitProfileUserId,
		isFromResult
	} = props;

	const userProfileInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const getUserName = userName => {
		const userNameLastChar = userName.slice(-1);
		console.log('userNameLastChar ::', userNameLastChar);
		let newUserName;
		if (userNameLastChar === 's') {
			newUserName = userName;
		} else {
			newUserName = userName + `'s`;
		}
		return newUserName;
	};

	return (
		<View style={styles.container}>
			<View style={styles.viewDetails}>
				<Text style={styles.yourBetsStyle}>
					{isFromResult
						? Strings.yourBet
						: betData?.bet?.users?._id === userProfileInfo?.user?._id
						? Strings.yourBet
						: betData?.betTakerData?._id === userProfileInfo?.user?._id
						? Strings.yourBet
						: betData?.bet?.users?._id === visitProfileUserId
						? Strings.yourBet.replace(
								'Your',
								getUserName(
									betData?.bet?.users?.displayName ||
										betData?.bet?.users?.userName
								)
						  )
						: Strings.yourBet.replace(
								'Your',
								getUserName(
									betData?.betTakerData?.displayName ||
										betData?.betTakerData?.userName
								)
						  )}
				</Text>
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
					{isFromResult
						? Strings.you_are_betting.toUpperCase() + ':'
						: betData?.bet?.users?._id === userProfileInfo?.user?._id
						? Strings.you_are_betting.toUpperCase() + ':'
						: betData?.betTakerData?._id === userProfileInfo?.user?._id
						? Strings.you_are_betting.toUpperCase() + ':'
						: betData?.bet?.users?._id === visitProfileUserId
						? (betData?.bet?.users?.displayName ||
								betData?.bet?.users?.userName) +
						  Strings.is_challenging +
						  ':'
						: (betData?.betTakerData?.displayName ||
								betData?.betTakerData?.userName) +
						  Strings.is_challenging +
						  ':'}
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
							betUsdAmount / (isSelectCurrency?.tokenPriceUsd ?? 1)
						)
					}
					editable={false}
					textValue={Strings.str_dollor + betUsdAmount}
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
						Strings.str_dollor + getRoundDecimalValue(betUsdAmount * betOdds)
					}
					btnDisabled={true}
					short_nameTextStyle={{fontFamily: Fonts.type.Inter_ExtraBold}}
				/>
				{!isShowLost && (
					<View style={styles.rawContainer}>
						<Text
							style={[styles.winAmountStyle, {color: colors.placeholderColor}]}>
							{isFromResult
								? Strings.you_will_win + ': '
								: betData?.bet?.users?._id === userProfileInfo?.user?._id
								? Strings.you_will_win + ': '
								: betData?.betTakerData?._id === userProfileInfo?.user?._id
								? Strings.you_will_win + ': '
								: betData?.bet?.users?._id === visitProfileUserId
								? (betData?.bet?.users?.displayName ||
										betData?.bet?.users?.userName) +
								  ' will win' +
								  ': '
								: (betData?.betTakerData?.displayName ||
										betData?.betTakerData?.userName) +
								  ' will win' +
								  ': '}
						</Text>

						<GradientText
							colors={defaultTheme.textGradientColor}
							style={styles.winAmountStyle}>
							{Strings.str_dollor +
								getRoundDecimalValue(betUsdAmount * betOdds - betUsdAmount)}
						</GradientText>
					</View>
				)}
			</View>
			{isShowLost ? (
				<View style={styles.viewDetails}>
					<Text style={styles.yourBetsStyle}>{bottomTitle}</Text>

					{/* <ButtonGradientWithRightIcon
            colorArray={defaultTheme.ternaryGradientColor}
            angle={gradientColorAngle}
            rightIconPath={isSelectCurrency?.tokenImageUrl}
            short_name={isSelectCurrency?.short_name}
            editable={false}
            textValue={parseFloat(oppositeBetAmount).toFixed(decimalValue)}
            btnDisabled={true}
            style={styles.inputTopStyle}
          /> */}

					<ButtonGradientWithRightIcon
						colorArray={defaultTheme.ternaryGradientColor}
						angle={gradientColorAngle}
						// rightIconPath={isSelectCurrency?.tokenImageUrl}
						short_name={
							'≈ ' +
							isSelectCurrency?.short_name +
							' ' +
							getRoundDecimalValue(
								isShowFee
									? (betUsdAmount * betOdds - betUsdAmount) /
											(isSelectCurrency?.tokenPriceUsd ?? 1)
									: betUsdAmount / (isSelectCurrency?.tokenPriceUsd ?? 1)
							)
						}
						editable={false}
						textValue={
							isShowFee
								? Strings.str_dollor +
								  getRoundDecimalValue(betUsdAmount * betOdds - betUsdAmount)
								: Strings.str_dollor + getRoundDecimalValue(betUsdAmount)
						}
						btnDisabled={true}
						short_nameTextStyle={{fontFamily: Fonts.type.Inter_ExtraBold}}
						style={styles.inputTopStyle}
					/>
					{isShowFee ? (
						<View style={styles.rawWithCenterContainer}>
							<Text
								style={[styles.betsTypeStyle, {marginTop: verticalScale(16)}]}>
								{`fee over the winnings: ${winningPercentage}%`.toUpperCase()}
							</Text>
							<TouchableOpacity onPress={onPressNeedHelp}>
								<ExpoFastImage
									resizeMode={'contain'}
									source={icons.help}
									style={styles.helpImg}
								/>
							</TouchableOpacity>
						</View>
					) : null}
				</View>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		...Platform.select({
			ios: {
				flex: 1
			},
			android: {
				flex: 1
			}
		})
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
		marginHorizontal: horizontalScale(16),
		textAlign: 'center'
	},
	imgIconStyle: {
		width: 40,
		height: 40,
		borderRadius: 20
	},

	AmountStyle: {
		fontSize: moderateScale(12),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginVertical: horizontalScale(16)
	},
	buttonInputStyle: {
		marginVertical: verticalScale(20)
	},
	inputStyle: {
		marginBottom: verticalScale(16)
	},
	inputTopStyle: {
		marginTop: verticalScale(16)
	},
	helpImg: {
		height: 16,
		width: 16,
		marginRight: verticalScale(8)
	},
	rawContainer: {
		flexDirection: 'row'
	},
	rawWithCenterContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	winAmountStyle: {
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginVertical: horizontalScale(16)
	}
});

export default BetsResultView;
