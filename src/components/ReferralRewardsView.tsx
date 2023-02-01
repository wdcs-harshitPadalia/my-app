/* eslint-disable react-native/no-inline-styles */
import {
	Alert,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ViewStyle
} from 'react-native';
import React from 'react';
// import FastImage from 'react-native-fast-image';
import ExpoFastImage from 'expo-fast-image';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import {defaultTheme} from '../theme/defaultTheme';
import colors from '../theme/colors';
import Strings from '../constants/strings';
import {LinearGradient} from 'expo-linear-gradient';
import icons from '../assets/icon';
import {gradientColorAngle} from '../theme/metrics';
import {decimalValue} from '../constants/api';
import ButtonGradient from './ButtonGradient';
import Clipboard from '@react-native-clipboard/clipboard';
import {showErrorAlert} from '../constants/utils/Function';
interface ReferralRewardsViewProps {
	style: ViewStyle;
	affiliateCode: string;
	userAffiliationCount: string;
	onPressNeedHelp?: () => void;
	isShowReferral?: boolean;
	totalMoney: string;
	claimAmount: number;
	onPressClaim?: () => void;
	tokenType: string;
}
export default function ReferralRewardsView(props: ReferralRewardsViewProps) {
	return (
		<View style={[styles.container, {...props?.style}]}>
			<View style={styles.infoView}>
				<Text style={styles.balanceText}>
					{props?.isShowReferral
						? Strings.your_referral_code
						: Strings.your_rewards}
				</Text>
				<TouchableOpacity
					onPress={props?.onPressNeedHelp}
					hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
					<ExpoFastImage
						resizeMode={'contain'}
						source={icons.about}
						style={styles.helpImg}
					/>
				</TouchableOpacity>
			</View>
			{props?.isShowReferral && (
				<View style={styles.viewCode}>
					<Text style={styles.codeText}>{props?.affiliateCode}</Text>
					<TouchableOpacity
						hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
						onPress={async () => {
							await Clipboard.setString(props?.affiliateCode);
							showErrorAlert('', Strings.copy_referral_desc);
						}}>
						<ExpoFastImage style={styles.imageStyle} source={icons.clipboard} />
					</TouchableOpacity>
				</View>
			)}
			<View style={styles.moneyBgView}>
				<Text style={styles.subTitle}>
					{`${
						props?.isShowReferral
							? Strings.total_money_won
							: Strings.your_total_money_won
					}`.toUpperCase()}
				</Text>
				<View
					style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
					{!props?.isShowReferral && (
						<LinearGradient
							style={{
								borderRadius: 3,
								marginRight: 6,
								transform: [
									{
										rotate:
											parseFloat(props?.totalMoney) >= 0 ? '0deg' : '-180deg'
									}
								]
							}}
							colors={
								parseFloat(props?.totalMoney) >= 0
									? defaultTheme.textGradientColor
									: defaultTheme.primaryGradientColor
							}
							start={{x: 0, y: 0}}
							end={{x: 1, y: 0}}>
							<ExpoFastImage source={icons.arrow_Top} style={styles.img} />
						</LinearGradient>
					)}
					<Text style={styles.balanceAmount}>
						{`${parseFloat(props?.totalMoney ?? '0').toFixed(decimalValue)}  ${
							props?.tokenType
						}`}
					</Text>
				</View>
			</View>
			{props?.isShowReferral ? (
				props?.userAffiliationCount > 0 ? (
					<Text style={styles.codeDesText}>
						{`${props?.userAffiliationCount}${Strings.str_reffered_users}`.toUpperCase()}
					</Text>
				) : null
			) : (
				<ButtonGradient
					onPress={props?.onPressClaim}
					colorArray={
						parseFloat(props?.claimAmount) > 0
							? defaultTheme.primaryGradientColor
							: [defaultTheme.backGroundColor, defaultTheme.backGroundColor]
					}
					angle={gradientColorAngle}
					buttonTextcolor={colors.white}
					buttonText={
						parseFloat(props?.claimAmount) > 0 ? (
							<Text>
								{Strings.claim_pending_rewards + ' '}
								<Text style={{fontFamily: Fonts.type.Inter_Regular}}>
									{props?.claimAmount + ' ' + props?.tokenType}
								</Text>
							</Text>
						) : (
							Strings.no_pending_claim
						)
					}
					style={styles.marginInput}
					btnDisabled={!(parseFloat(props?.claimAmount) > 0)}
				/>
			)}
		</View>
	);
}
const styles = StyleSheet.create({
	infoView: {
		flexDirection: 'row',
		marginHorizontal: horizontalScale(16),
		paddingVertical: horizontalScale(20),
		alignItems: 'center',
		justifyContent: 'center'
	},
	helpImg: {
		height: 20,
		width: 20
	},
	moneyBgView: {
		backgroundColor: defaultTheme.backGroundColor,
		marginHorizontal: horizontalScale(16),
		marginBottom: verticalScale(8),
		marginVertical: verticalScale(8),
		padding: verticalScale(10),
		borderRadius: 8
	},
	img: {
		height: 15,
		width: 15,
		margin: 7
	},
	container: {
		backgroundColor: colors.black,
		marginHorizontal: horizontalScale(20),
		marginTop: verticalScale(20),
		paddingBottom: verticalScale(20)
	},
	balanceText: {
		color: colors.white,
		textAlign: 'center',
		flex: 1,
		fontSize: moderateScale(18),
		fontFamily: Fonts.type.Krona_Regular
	},
	subTitle: {
		color: colors.white,
		textAlign: 'left',
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Bold
	},
	balanceAmount: {
		color: colors.white,
		textAlign: 'center',
		fontSize: 22,
		fontFamily: Fonts.type.Inter_Bold
	},
	marginInput: {
		marginTop: verticalScale(20),
		marginHorizontal: horizontalScale(16)
	},
	viewCode: {
		backgroundColor: defaultTheme.backGroundColor,
		borderRadius: 8,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: verticalScale(12),
		marginHorizontal: horizontalScale(16),
		marginBottom: verticalScale(16)
	},
	codeText: {
		color: colors.white,
		textAlign: 'center',
		flex: 1,
		fontSize: moderateScale(14),
		fontFamily: Fonts.type.Inter_Bold,
		marginLeft: horizontalScale(12)
	},
	codeDesText: {
		color: colors.grayLightText,
		textAlign: 'center',
		fontSize: moderateScale(12),
		fontFamily: Fonts.type.Inter_Medium,
		marginTop: verticalScale(8),
		marginHorizontal: horizontalScale(16)
	},
	imageStyle: {
		height: 15,
		width: 13,
		marginLeft: horizontalScale(12)
	}
});
