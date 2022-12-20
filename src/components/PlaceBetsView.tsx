/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, TextInputProps, Text} from 'react-native';
import {decimalValue} from '../constants/api';
import Strings from '../constants/strings';
import {getRoundDecimalValue} from '../constants/utils/Function';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {gradientColorAngle} from '../theme/metrics';
import ButtonGradient from './ButtonGradient';
import ButtonGradientWithRightIcon from './ButtonGradientWithRightIcon';
import GradientDropDownComponent from './GradientDropDownComponent';
import GradientInputComponent from './GradientInputComponent';

interface Props extends TextInputProps {
	popupTitle?: string;
	onPressWallets?: () => void;
	data: any;
	betAmount: (amount: string) => void;
	betUsdAmount: (amount: string) => void;
	addedAmount?: string;
	addedUsdAmount?: string;
	myBalance?: number;
	betOdds?: string;
	isShowError?: boolean;
	errMessage?: string;
	oddsData: any[];
	previousData: any;
	selectedBetOdds: (odds: any) => void;
	isEditOdds?: boolean;
	isShowOpponent?: boolean;
	opponentTitle?: string;
}

const PlaceBetsView: React.FC<Props> = props => {
	const {
		popupTitle,
		onPressWallets,
		data,
		betAmount,
		addedAmount,
		addedUsdAmount,
		betUsdAmount,
		myBalance,
		betOdds,
		isShowError,
		errMessage,
		oddsData,
		previousData,
		selectedBetOdds,
		isEditOdds,
		isShowOpponent,
		opponentTitle
	} = props;

	return (
		<View style={styles.viewDetails}>
			<Text style={styles.titleStyle}>{popupTitle}</Text>
			{isShowOpponent ? (
				<>
					<ButtonGradient
						colorArray={defaultTheme.primaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						buttonText={opponentTitle}
						style={styles.buttonInputStyle}
					/>
					{addedAmount > 0 ? (
						<ButtonGradientWithRightIcon
							colorArray={defaultTheme.ternaryGradientColor}
							angle={gradientColorAngle}
							rightIconPath={data?.tokenImageUrl}
							style={styles.marginInput}
							short_name={data?.short_name}
							editable={false}
							textValue={getRoundDecimalValue(addedAmount)}
							btnDisabled={true}
						/>
					) : (
						<></>
					)}
				</>
			) : (
				<ButtonGradientWithRightIcon
					colorArray={defaultTheme.ternaryGradientColor}
					angle={gradientColorAngle}
					rightIconPath={data?.tokenImageUrl}
					onPress={onPressWallets}
					style={styles.marginInput}
					short_name={data?.short_name}
					onChangeText={(text: string) => {
						// betAmount({number: text.replace(/^\d+(?:[.,]\d+)*$/gm)});

						betAmount(text);
					}}
					onSubmitText={(text: any) => {
						betUsdAmount(text);
					}}
					textValue={addedAmount}
					keyboardType="numeric"
					maxLength={10}
					errMessage={errMessage}
					isShowError={isShowError}
				/>
			)}
			<View style={styles.contentStyle}>
				<Text style={styles.AmountStyle}>
					{data?.short_name !== 'DBETH' && `≈ USD ${addedUsdAmount}`}
				</Text>
				<Text style={styles.AmountStyle}>
					{Strings.balance}: {myBalance}
				</Text>
			</View>
			<Text style={styles.titleStyle}>{Strings.odds}</Text>
			{isEditOdds ? (
				<GradientDropDownComponent
					colorArray={defaultTheme.ternaryGradientColor}
					style={styles.marginInput}
					arrayData={oddsData}
					placeholder={Strings.select_odd}
					previousData={previousData}
					selectedBetOdds={(item: any) => {
						selectedBetOdds(item);
					}}
				/>
			) : (
				<GradientInputComponent
					colorArray={defaultTheme.ternaryGradientColor}
					isSecureText={false}
					keyboardType={'number-pad'}
					isShowError={false}
					returnKeyType={'done'}
					placeholderTextColor={'rgba(255, 255, 255, 0.3)'}
					style={styles.marginInput}
					textStyle={{
						fontSize: moderateScale(22),
						fontFamily: Fonts.type.Inter_Bold,
						marginVertical: verticalScale(10)
					}}
					editable={false}
					title={betOdds}
				/>
			)}
			<Text style={styles.titleStyle}>
				{addedAmount > 0 ? Strings.pays : ''}
			</Text>

			{addedAmount > 0 ? (
				<>
					<ButtonGradientWithRightIcon
						colorArray={defaultTheme.ternaryGradientColor}
						angle={gradientColorAngle}
						rightIconPath={data?.tokenImageUrl}
						style={styles.marginInput}
						short_name={data?.short_name}
						editable={false}
						textValue={
							addedAmount === ''
								? '0.00'
								: getRoundDecimalValue(
										parseFloat(addedAmount?.replace(',', '.')) *
											parseFloat(betOdds)
								  )
						}
						btnDisabled={true}
					/>
					<View style={styles.contentStyle}>
						<Text style={styles.AmountStyle}>
							{data?.short_name !== 'DBETH' &&
								`≈ USD ${
									getRoundDecimalValue(addedUsdAmount) === 0
										? '0.00'
										: getRoundDecimalValue(
												parseFloat(addedUsdAmount) * parseFloat(betOdds)
										  )
								}`}
						</Text>
						<Text style={styles.AmountStyle}>
							{Strings.balance}: {myBalance}
						</Text>
					</View>
				</>
			) : (
				<></>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	viewDetails: {
		backgroundColor: defaultTheme.secondaryBackGroundColor,
		borderRadius: verticalScale(10),
		justifyContent: 'center',
		marginVertical: verticalScale(16)
	},
	titleStyle: {
		color: colors.white,
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular,
		textAlign: 'center',
		paddingTop: verticalScale(20),
		paddingBottom: verticalScale(16)
	},
	marginInput: {
		marginHorizontal: horizontalScale(16)
	},
	contentStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: horizontalScale(16)
	},
	AmountStyle: {
		fontSize: moderateScale(12),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_ExtraBold
	},
	buttonInputStyle: {
		marginTop: verticalScale(10),
		marginBottom: verticalScale(16),
		marginHorizontal: horizontalScale(16)
	}
});

export default PlaceBetsView;
