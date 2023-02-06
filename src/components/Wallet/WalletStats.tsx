/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import ExpoFastImage from 'expo-fast-image';
import colors from '../../theme/colors';
import {
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../../theme';
import fonts from '../../theme/fonts';
import icons from '../../assets/icon';
import {defaultTheme} from '../../theme/defaultTheme';
import Strings from '../../constants/strings';
import MonthSelection from '../MonthSelection';
import {LinearGradient} from 'expo-linear-gradient';
import GradientText from '../GradientText';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {gradientColorAngle} from '../../theme/metrics';
import {decimalValue} from '../../constants/api';
interface WalletStatsProps {
	style: ViewStyle;
	onViewDetailsButtonClicked?: Function;
	onFilterChanged: (value: any) => void;
	filterType?: any;
	// lossBets: string;
	// winBets: string;
	totalMoney: string;
	moneyType: string;
	changeToken?: Function;
	passiveIncomeEarnings?: string;
	juryEarnings?: string;
}

export default function WalletStats(props: WalletStatsProps) {
	return (
		<View style={[styles.container, {...props.style}]}>
			<Text style={styles.balanceText}>{Strings.Stats}</Text>
			<View style={styles.contentView}>
				<MonthSelection
					onPress={type => {
						if (type) {
							props?.onFilterChanged(type);
						}
						console.log('dskdskdshjdsjkd>><<<<<<');
						// handleSubmit();
						// navigation.replace(ScreenNames.BottomTabScreen);
						//  navigation.navigate(ScreenNames.ProfileSetupScreen);
					}}
					colorArray={defaultTheme.ternaryGradientColor}
					angle={gradientColorAngle}
					buttonText={props?.filterType}
					rightIcon={true}
					leftIconPath={' '}
					dataSource={[
						'All',
						'Today',
						// 'Yesterday',
						'Last week',
						'Last month',
						'Custom date range'
					]}
				/>
			</View>
			<TouchableOpacity style={styles.moneyBgView} onPress={props.changeToken}>
				<Text style={styles.subTitle}>
					{`${Strings.str_money_won}/${Strings.Lost}`.toUpperCase()}
				</Text>
				<View
					style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
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
					{/* <Text style={styles.balanceAmount}>
						{`${parseFloat(props?.totalMoney ?? '0').toFixed(decimalValue)} ${
							props?.moneyType
						}`.toUpperCase()}
					</Text> */}
					<Text style={styles.balanceAmount}>
						{`${Strings.str_dollor}${parseFloat(
							props?.totalMoney ?? '0'
						).toFixed(decimalValue)}`}
					</Text>
					{/* <View
						style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
						<ExpoFastImage
							style={{height: 20, width: 20, transform: [{rotate: '90deg'}]}}
							source={icons.arrowForward}
						/>
					</View> */}
				</View>
			</TouchableOpacity>

			<View style={{flexDirection: 'row', marginHorizontal: 12}}>
				<View style={styles.contentBgView}>
					<Text style={styles.subTitle}>
						{Strings.str_passive_income_earnings.toUpperCase()}
					</Text>
					<View style={styles.betsNumberText}>
						<GradientText
							colors={defaultTheme.textGradientColor}
							style={styles.gradientText}>
							{Strings.str_dollor + (props?.passiveIncomeEarnings ?? 0)}
						</GradientText>
					</View>
				</View>
				<View style={styles.contentBgView}>
					<Text style={styles.subTitle}>
						{Strings.str_jury_earnings.toUpperCase()}
					</Text>
					<View style={styles.betsNumberText}>
						<GradientText
							colors={defaultTheme.primaryGradientColor}
							style={styles.gradientText}>
							{Strings.str_dollor + (props?.juryEarnings ?? 0)}
						</GradientText>
					</View>
				</View>
			</View>

			<TouchableOpacity
				style={styles.viewDetailsButton}
				onPress={props.onViewDetailsButtonClicked}>
				<Text style={styles.viewDetailsText}>{Strings.View_details}</Text>
				<ExpoFastImage source={icons.arrow_Top} style={styles.imgViewDetails} />
			</TouchableOpacity>

			<View style={{backgroundColor: 'white'}}>
				{/* <DateRangePicker
          onSelectDateRange={range => {
            setRange(range);
          }}
          blockSingleDateSelection={true}
          responseFormat="YYYY-MM-DD"
          maxDate={moment()}
          minDate={moment().subtract(30, 'days')}
          selectedDateContainerStyle={styles.selectedDateContainerStyle}
          selectedDateStyle={styles.selectedDateStyle}
          onSSetDateClicked={response => {
            console.log('onSSetDateClicked?>>>>>', response);
          }}
        /> */}
				{/* <DateRangePickerModel
          onPress={() => {
            console.log('dsikjdfskjdfkjdf');
          }}
        /> */}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	viewDetailsButton: {
		justifyContent: 'flex-end',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 20,
		marginRight: 20
	},
	imageStyle: {
		height: 15,
		width: 13
		//marginLeft: horizontalScale(12),
	},
	betsNumberText: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10
	},
	contentBgView: {
		backgroundColor: defaultTheme.backGroundColor,
		marginHorizontal: 5,
		padding: 10,
		borderRadius: 8,
		flex: 1,
		justifyContent: 'space-between'
	},
	gradientText: {
		fontSize: moderateScale(20),
		fontFamily: Fonts.type.Inter_ExtraBold,
		marginRight: horizontalScale(6)
	},
	moneyBgView: {
		backgroundColor: defaultTheme.backGroundColor,
		marginHorizontal: 16,
		marginBottom: 10,
		marginTop: 16,
		padding: 10,
		borderRadius: 8
	},
	img: {
		height: 15,
		width: 15,
		margin: 7
	},
	imgViewDetails: {
		height: 12,
		width: 12,
		margin: 7,
		transform: [{rotate: '90deg'}]
	},
	marketStatusImageStyle: {
		height: 5,
		width: 10,
		marginLeft: horizontalScale(12)
	},
	container: {
		backgroundColor: colors.black,
		margin: 20,
		paddingVertical: 20
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
	subTitle: {
		color: colors.white,
		//padding: 10,
		textAlign: 'left',
		//flex: 1,
		fontSize: 12,
		fontFamily: fonts.type.Inter_Bold
		//marginLeft: horizontalScale(12),
		// marginBottom: verticalScale(30),
	},
	viewDetailsText: {
		color: colors.white,
		//padding: 10,
		textAlign: 'left',
		//flex: 1,
		fontSize: 11,
		fontFamily: fonts.type.Inter_Medium
		//marginLeft: horizontalScale(12),
		// marginBottom: verticalScale(30),
	},
	contentView: {flexDirection: 'row', alignItems: 'center'},
	balanceAmount: {
		color: colors.white,
		//padding: 10,
		textAlign: 'center',
		fontSize: 22,
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
	},
	selectedDateContainerStyle: {
		height: 35,
		width: '125%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: defaultTheme.primaryColor,
		borderRadius: 8
	},
	selectedDateStyle: {
		fontWeight: 'bold',
		color: 'white',
		backgroundColor: defaultTheme.primaryColor,
		width: 25,
		// height: 30,
		padding: 4,
		textAlign: 'center',
		borderRadius: 8,
		overflow: 'hidden'
	}
});
