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
		bottomTitle
	} = props;

	return (
		<View style={styles.container}>
			<View style={styles.viewDetails}>
				<Text style={styles.yourBetsStyle}>{Strings.yourBet}</Text>
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
							{Strings.you_will_win + ': '}
						</Text>
						{Platform.OS === 'web' ? (
							<Text
								style={[
									styles.winAmountStyle,
									{color: defaultTheme.textGradientColor[1]}
								]}>
								{Strings.str_dollor +
									getRoundDecimalValue(betUsdAmount * betOdds - betUsdAmount)}
							</Text>
						) : (
							<GradientText
								colors={defaultTheme.textGradientColor}
								style={styles.winAmountStyle}>
								{Strings.str_dollor +
									getRoundDecimalValue(betUsdAmount * betOdds - betUsdAmount)}
							</GradientText>
						)}
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
