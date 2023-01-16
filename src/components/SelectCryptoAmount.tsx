/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {decimalValue} from '../constants/api';
import Strings from '../constants/strings';
import {getMetamaskBalance} from '../constants/utils/Function';
import {updateApiLoader} from '../redux/reducerSlices/preLogin';
import {RootState} from '../redux/store';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import CurrencyBalanceVIew from './CurrencyBalanceVIew';
import {useBetCreateContract} from './CustomHooks/SmartContract';

interface Props {
	data: any;
	selectedObj: (objData: any) => void;
	pervSelectedID?: string;
	pervSelectedObj?: any;
	addedAmount?: string;
}

const SelectCryptoAmount: React.FC<Props> = props => {
	const {data} = props;

	const {getBalanceFromContract, tokenBalance} = useBetCreateContract(false);

	const dispatch = useDispatch();

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const [currencyDataArray, setCurrencyDataArray] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [tokenCount, setTokenCount] = useState(0);
	const [isShowNote, setIsShowNote] = useState(false);

	useEffect(() => {
		dispatch(updateApiLoader({apiLoader: true}));
		handleGetBalance();
	}, [data]);

	const handleGetBalance = async () => {
		for (let i = 0; i < data.length; i++) {
			if (data[i].short_name.toLowerCase() === 'matic') {
				let res = await getMetamaskBalance(userInfo?.user?.walletAddress);
				setIsShowNote(parseFloat(res).toFixed(decimalValue) <= 0.5);
				console.log('qqqqqqqq', res, data[i]?.tokenPriceUsd);

				const totalMaticBalance =
					parseFloat(res).toFixed(decimalValue) +
					parseFloat(0.5) * data[i]?.tokenPriceUsd;
				if (parseFloat(totalMaticBalance) > props?.addedAmount) {
					const tempDataObj = currencyDataArray.concat({
						...data[i],
						...{
							totalBalance: parseFloat(res).toFixed(decimalValue),
							totalUsdAmount: totalMaticBalance
						}
					});

					// const tempDataObj = currencyDataArray.concat(data[i]);
					setCurrencyDataArray(tempDataObj);
				}
				setTokenCount(tokenCount + 1);
			} else {
				getBalanceAsync(data[i]?.contractAddress);
			}
		}
	};

	const getBalanceAsync = async address => {
		getBalanceFromContract(address);
	};

	useEffect(() => {
		if (tokenBalance) {
			// console.log(
			//   'tokenBalance ::' + tokenBalance,
			//   '[0] ::' + tokenBalance.split(' ')[0],
			//   '[1] :: ' + tokenBalance.split(' ')[1],
			// );

			const filteredCurrencyObj = data.filter((currencyDataObj: any) => {
				return (
					currencyDataObj.short_name.toLowerCase() ===
					tokenBalance.split(' ')[1].toLowerCase()
				);
			});
			console.log('filteredCurrencyObj', filteredCurrencyObj);

			const tokenTotalBalance =
				tokenBalance?.split(' ')[0] *
				(filteredCurrencyObj[0]?.tokenPriceUsd ?? 1);

			if (parseFloat(tokenTotalBalance) >= parseFloat(props?.addedAmount)) {
				// const tempDataObj = currencyDataArray.concat(filteredCurrencyObj);
				const tempobj = {
					...filteredCurrencyObj[0],
					...{
						totalBalance: tokenBalance.split(' ')[0],
						totalUsdAmount: tokenTotalBalance
					}
				};
				const tempDataObj = currencyDataArray.concat(tempobj);

				// setCurrencyDataArray({
				//   ...tempDataObj,
				//   ...{
				//     totalBalance: parseFloat(res).toFixed(decimalValue),
				//     totalAmount: totalMaticBalance,
				//   },
				// });

				setCurrencyDataArray(tempDataObj);
			}
			setTokenCount(tokenCount + 1);
		}
	}, [tokenBalance]);

	useEffect(() => {
		if (tokenCount === props?.data.length) {
			setIsLoading(false);
			dispatch(updateApiLoader({apiLoader: false}));
			console.log('currencyDataArray ::', currencyDataArray);

			if (currencyDataArray.length < 1) {
				Alert.alert(
					'Insufficient Balance'.toUpperCase(),
					Strings.enough_balance,
					[
						{
							text: 'OK',
							onPress: () => {
								props?.selectedObj();
							}
						}
					]
				);
			}
		}
	}, [tokenCount]);

	return (
		<>
			<Text style={styles.desStyle}>
				{`You are betting ${Strings.str_dollor}${props?.addedAmount}. So, you have balance in these crypto to make this bet.`}
			</Text>
			<>
				{!isLoading && currencyDataArray?.length ? (
					<View style={styles.viewDetails}>
						{isShowNote && (
							<Text style={styles.noteStyle}>{Strings.enough_gas_fee}</Text>
						)}

						<FlatList
							data={currencyDataArray}
							contentContainerStyle={styles.flatListContentStyle}
							showsHorizontalScrollIndicator={false}
							renderItem={({item}) => (
								<LinearGradient
									style={styles.circleGradient}
									useAngle={true}
									colors={
										item?._id === props?.pervSelectedID
											? defaultTheme.primaryGradientColor
											: defaultTheme.ternaryGradientColor
									}>
									{/* <CurrencyBalanceVIew
										onPress={() => {
											console.log(item);
											props?.selectedObj(item ?? props?.pervSelectedObj);
										}}
										leftIconPath={item?.tokenImageUrl}
										subtitle={
											item?.short_name +
											' ' +
											parseFloat(
												props?.addedAmount * (item?.tokenPriceUsd ?? 1)
											).toFixed(decimalValue)
										}
										subTitleTextStyle={styles.flatListItemSubTitle}
									/> */}

									<CurrencyBalanceVIew
										onPress={() => {
											console.log(item);
											props?.selectedObj(item ?? props?.pervSelectedObj);
										}}
										leftIconPath={item?.tokenImageUrl}
										title={item?.totalBalance}
										// title={
										//   parseFloat(
										//     props?.addedAmount / (item?.tokenPriceUsd ?? 1),
										//   ).toFixed(decimalValue) + ''
										// }
										subtitle={item?.short_name}
										subTitleTextStyle={styles.flatListItemSubTitle}
										currentUsdBalance={item?.totalUsdAmount + ''}
									/>
								</LinearGradient>
							)}
							keyExtractor={(item, index) => item?._id + index + ''}
							//bounces={false}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				) : (
					<></>
				)}
			</>
		</>
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
	contentStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: horizontalScale(16)
	},
	circleGradient: {
		// width: '90%',
		borderRadius: verticalScale(8),
		alignItems: 'center',
		flexDirection: 'row',
		marginHorizontal: horizontalScale(16),
		marginVertical: horizontalScale(8)
	},
	desStyle: {
		fontSize: moderateScale(16),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_SemiBold
	},
	flatListItemSubTitle: {
		color: colors.white,
		fontFamily: Fonts.type.Inter_SemiBold,
		fontSize: moderateScale(16),
		marginVertical: horizontalScale(8)
	},

	flatListContentStyle: {
		marginTop: horizontalScale(16),
		marginBottom: horizontalScale(16)
	},
	noteStyle: {
		fontSize: moderateScale(16),
		color: colors.placeholderColor,
		fontFamily: Fonts.type.Inter_SemiBold,
		marginHorizontal: horizontalScale(16),
		marginTop: horizontalScale(16)
	}
});

export default SelectCryptoAmount;
