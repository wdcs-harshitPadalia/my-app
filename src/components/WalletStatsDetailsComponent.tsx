import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {decimalValue} from '../constants/api';
import Strings from '../constants/strings';
import {Fonts, horizontalScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import GradientText from './GradientText';

interface WalletStatsProps {
	itemData: Object;
}

const WalletStatsDetailsComponent: React.FC<WalletStatsProps> = props => {
	const WalletStatsWinLossComponent = (props: any) => {
		const {transactionType, usdAmount, tokenAmount} = props;

		console.log('====================================');
		console.log('itemData :: ', JSON.stringify(itemData));
		console.log('====================================');

		return (
			<View>
				<Text style={styles.WalletStatsInnerSubTitleTextStyle}>
					{itemData?.bet_type === 'resultClaimJury'
						? Strings.str_jury_earnings
						: transactionType === Strings.str_credit_transaction
						? Strings.str_money_won
						: Strings.str_money_lost}
				</Text>
				<View style={styles.rawContainer}>
					<GradientText
						colors={
							transactionType === Strings.str_credit_transaction
								? defaultTheme.textGradientColor
								: defaultTheme.primaryGradientColor
						}
						style={styles.WalletStatsUsdAmountStyle}>
						{usdAmount}
					</GradientText>
					<Text style={styles.WalletStatsTokenAmountStyle}>{tokenAmount}</Text>
				</View>
			</View>
		);
	};

	const WalletStatsPassiveIncomeComponent = (props: any) => {
		const {title, transactionType, usdAmount, tokenAmount} = props;
		return (
			<View>
				<Text style={styles.WalletStatsInnerSubTitleTextStyle}>{title}</Text>
				<View style={styles.rawContainer}>
					<GradientText
						colors={
							transactionType === Strings.str_credit_transaction
								? parseInt(tokenAmount) > 0
									? defaultTheme.textGradientColor
									: defaultTheme.whiteGredientColor
								: parseInt(tokenAmount) > 0
								? defaultTheme.primaryGradientColor
								: defaultTheme.whiteGredientColor
						}
						style={styles.WalletStatsUsdAmountStyle}>
						{usdAmount}
					</GradientText>
					<Text style={styles.WalletStatsTokenAmountStyle}>{tokenAmount}</Text>
				</View>
			</View>
		);
	};

	const {itemData} = props;

	return (
		<View style={styles.container}>
			{/* <View style={styles.dateTitleContainer}>
				<Text style={styles.dateTitleTextStyle}>{'Today'}</Text>
			</View> */}
			<View style={styles.WalletStatsDetailsCard}>
				<View
					style={{
						marginHorizontal: horizontalScale(10),
						marginTop: verticalScale(10)
					}}>
					<Text style={styles.WalletStatsMainTitleStyle}>
						{` ${itemData?.categories?.name} > ${
							itemData?.subcategories
								? itemData?.subcategories?.name + ' > '
								: ''
						} ${itemData?.matches?.leagueName ?? Strings.custom}`}
					</Text>
				</View>

				<View
					style={{
						marginHorizontal: horizontalScale(10),
						marginTop: verticalScale(5)
					}}>
					<Text style={styles.WalletStatsQuestionTitleStyle} numberOfLines={2}>
						{itemData?.bets?.betQuestion ??
							itemData?.mainmarkets?.market_name +
								(itemData?.bets?.market_sub_name
									? ' : ' + itemData?.bets?.market_sub_name
									: '')}
					</Text>
				</View>

				<View style={styles.WalletStatsInnerRootContainer}>
					<WalletStatsWinLossComponent
						transactionType={itemData?.transaction_type?.toLowerCase()}
						usdAmount={`${Strings.str_dollor}${parseFloat(
							itemData?.dollar_amount
						).toFixed(1)}`.toUpperCase()}
						tokenAmount={` ${parseFloat(itemData?.bet_amount).toFixed(1)} ${
							itemData?.tokentypes?.name
						}`.toUpperCase()}
					/>
					{itemData?.bet_type !== 'resultClaimJury' && (
						<WalletStatsPassiveIncomeComponent
							title={Strings.str_generated_passive_income}
							transactionType={itemData?.transaction_type.toLowerCase()}
							usdAmount={`${Strings.str_dollor}${parseFloat(
								itemData?.passive_income ?? 0
							).toFixed(2)}`.toUpperCase()}
							tokenAmount={` ${parseFloat(
								itemData?.passive_income ?? 0
							).toFixed(3)} ${itemData?.tokentypes?.name}`.toUpperCase()}
						/>
					)}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	rawContainer: {
		flexDirection: 'row'
	},
	// dateTitleContainer: {
	// 	alignItems: 'center',
	// 	marginTop: verticalScale(20),
	// 	marginBottom: verticalScale(10)
	// },
	// dateTitleTextStyle: {
	// 	color: colors.textTitle,
	// 	fontFamily: Fonts.type.Inter_Medium,
	// 	fontSize: 12
	// },
	WalletStatsDetailsCard: {
		backgroundColor: defaultTheme.backGroundColor,
		borderRadius: 10,
		marginTop: verticalScale(20)
	},
	WalletStatsMainTitleStyle: {
		color: colors.textTitle,
		fontFamily: Fonts.type.Inter_Medium,
		fontSize: 12
	},
	WalletStatsQuestionTitleStyle: {
		color: colors.white,
		fontFamily: Fonts.type.Inter_ExtraBold,
		fontSize: 12,
		textTransform: 'uppercase'
	},
	WalletStatsInnerRootContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
		backgroundColor: colors.black,
		borderRadius: 10,
		margin: verticalScale(10)
	},
	WalletStatsInnerSubTitleTextStyle: {
		color: colors.textTitle,
		fontFamily: Fonts.type.Inter_Regular,
		fontSize: 10
	},
	WalletStatsUsdAmountStyle: {
		fontFamily: Fonts.type.Inter_ExtraBold,
		fontSize: 12
	},
	WalletStatsTokenAmountStyle: {
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_Regular,
		fontSize: 12
	}
});

export default WalletStatsDetailsComponent;
