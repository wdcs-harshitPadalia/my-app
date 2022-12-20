/* eslint-disable react-native/no-inline-styles */
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ViewStyle
} from 'react-native';
import React from 'react';
import ExpoFastImage from 'expo-fast-image';
import colors from '../../theme/colors';
import {Fonts, horizontalScale, verticalScale} from '../../theme';
import fonts from '../../theme/fonts';
import icons from '../../assets/icon';
import ButtonGradient from '../ButtonGradient';
import {defaultTheme} from '../../theme/defaultTheme';
import Strings from '../../constants/strings';
import {gradientColorAngle, moderateScale} from '../../theme/metrics';

interface WalletBalanceProps {
	style: ViewStyle;
	onExportPrivateKeyPressed?: Function;
	onDepositButtonPressed?: Function;
	onWithdrawalButtonPressed?: Function;
	balance: number;
	onBalanceReload?: Function;
	userData: any;
	changeToken?: Function;
	onBuyCryptoButtonPressed?: Function;
	isLoading?: Boolean;
	displaySelectedTokenName?: any;
}

export default function WalletBalance(props: WalletBalanceProps) {
	return (
		<View style={[styles.container, {...props.style}]}>
			<Text style={styles.balanceText}>{Strings.Balance}</Text>
			<TouchableOpacity style={styles.contentView} onPress={props.changeToken}>
				{props.isLoading ? (
					<ActivityIndicator size={'small'} color={colors.white} />
				) : (
					<View>
						<Text
							style={
								styles.balanceAmount
							}>{`${Strings.str_dollor}${props.balance}`}</Text>
						<Text style={styles.totalBalanceText}>
							{(props.displaySelectedTokenName || Strings.total) +
								Strings.str_balance}
						</Text>
					</View>
				)}
				<ExpoFastImage
					style={{height: 20, width: 20, transform: [{rotate: '90deg'}]}}
					source={icons.arrowForward}
				/>
			</TouchableOpacity>
			<View>
				<ButtonGradient
					onPress={props.onBuyCryptoButtonPressed}
					colorArray={defaultTheme.primaryGradientColor}
					angle={gradientColorAngle}
					buttonTextcolor={colors.white}
					style={{marginTop: 30}}
					paddingVertical={20}>
					<View
						style={{
							width: '100%',
							paddingVertical: verticalScale(8)
						}}>
						<Text
							style={{
								fontSize: moderateScale(12),
								fontFamily: Fonts.type.Inter_ExtraBold,
								textTransform: 'uppercase',
								flex: 1,
								color: colors.white,
								textAlign: 'center'
							}}>
							{Strings.buy_crypto_btn}
						</Text>

						<ExpoFastImage
							resizeMode={'contain'}
							source={icons.ic_buy_crypto}
							style={{
								height: 22
							}}
						/>
					</View>
				</ButtonGradient>
				<View style={{flexDirection: 'row', marginTop: 10}}>
					<ButtonGradient
						onPress={props.onDepositButtonPressed}
						colorArray={defaultTheme.ternaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						buttonText={Strings.deposit}
						style={{flex: 1, marginRight: 10}}
						paddingVertical={20}
					/>
					<ButtonGradient
						onPress={props.onWithdrawalButtonPressed}
						colorArray={defaultTheme.ternaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						buttonText={Strings.withdrawal}
						style={{flex: 1}}
						paddingVertical={20}
					/>
				</View>
				{props?.userData?.socialLoginType?.toLowerCase() !== 'metamask' && (
					<ButtonGradient
						onPress={props.onExportPrivateKeyPressed}
						colorArray={defaultTheme.ternaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						buttonText={Strings.Reveal_Private_Key}
						style={{marginTop: 10}}
						paddingVertical={20}
					/>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	imageStyle: {
		height: 15,
		width: 13,
		marginLeft: horizontalScale(12)
	},
	marketStatusImageStyle: {
		height: 5,
		width: 10,
		marginLeft: horizontalScale(12)
	},
	container: {
		backgroundColor: colors.black,
		marginTop: verticalScale(20),
		marginHorizontal: horizontalScale(20),
		padding: 20
	},
	balanceText: {
		color: colors.white,
		//padding: 10,
		textAlign: 'center',
		//flex: 1,
		fontSize: 18,
		fontFamily: fonts.type.Krona_Regular,
		marginLeft: horizontalScale(12),
		marginBottom: verticalScale(30)
	},
	contentView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	balanceAmount: {
		color: colors.white,
		//padding: 10,
		textAlign: 'left',
		fontSize: 22,
		fontFamily: fonts.type.Inter_ExtraBold
	},
	totalBalanceText: {
		color: colors.white,
		marginTop: 8,
		textAlign: 'left',
		fontSize: 16,
		fontFamily: fonts.type.Inter_Bold
	},
	percentView: {
		color: colors.white,
		//padding: 10,
		textAlign: 'center',
		fontSize: 12,
		fontFamily: fonts.type.Inter_Medium,
		opacity: 0.78,
		marginLeft: horizontalScale(6)
	}
});
