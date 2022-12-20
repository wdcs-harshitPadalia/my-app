import {useWalletConnect} from '@walletconnect/react-native-dapp';
import React, {useEffect, useState} from 'react';
import {
	Text,
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import {LinearGradient} from 'expo-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import icons from '../assets/icon';
import {decimalValue} from '../constants/api';
import Strings from '../constants/strings';
import {getMetamaskBalance} from '../constants/utils/Function';
import {getTokenType} from '../redux/apiHandler/apiActions';
import {updateTotalBalance} from '../redux/reducerSlices/userInfo';
import {RootState} from '../redux/store';

import {Colors, Fonts, horizontalScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {moderateFontScale} from '../theme/metrics';
import {useBetCreateContract} from './CustomHooks/SmartContract';
import useUpdateEffect from './CustomHooks/useUpdateEffect';

interface Props extends TextInputProps {
	onPress?: () => void;
}
let totalBalance = 0;

const TotalBalanceComponent: React.FC<Props> = props => {
	const connector = useWalletConnect();
	const [currencyData, setCurrencyData] = useState([{}]);
	const {getBalanceFromContract, tokenBalance} = useBetCreateContract(false);
	const [currentBalance, setCurrentBalance] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [tokenCount, setTokenCount] = useState(0);
	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});
	const dispatch = useDispatch();
	useEffect(() => {
		totalBalance = 0;
		getTokenTypeData();
	}, [connector]);

	const getTokenTypeData = () => {
		getTokenType({})
			.then(res => {
				console.log('getTokenTypeData Response >>> ', JSON.stringify(res));
				setCurrencyData(res?.data?.tokens);
			})
			.catch(err => {
				console.log('getTokenTypeData Data Err >>> ', JSON.stringify(err));
			});
	};

	useUpdateEffect(() => {
		handleGetBalance();
	}, [currencyData]);

	const handleGetBalance = async () => {
		totalBalance = 0;
		for (let i = 0; i < currencyData.length; i++) {
			if (currencyData[i]?.short_name?.toLowerCase() === 'matic') {
				let res = await getMetamaskBalance(userInfo?.user?.walletAddress);
				const totalMaticBalance =
					parseFloat(res).toFixed(decimalValue) *
					currencyData[i]?.tokenPriceUsd;
				console.log('totalMaticBalance ::', totalMaticBalance);
				totalBalance = totalBalance + totalMaticBalance;
				setTokenCount(tokenCount + 1);
			} else {
				getBalanceAsync(currencyData[i]?.contractAddress);
			}
		}
	};

	const getBalanceAsync = async address => {
		getBalanceFromContract(address);
	};

	useUpdateEffect(() => {
		if (tokenBalance) {
			// console.log(
			//   'tokenBalance ::' + tokenBalance,
			//   '[0] ::' + tokenBalance.split(' ')[0],
			//   '[1] :: ' + tokenBalance.split(' ')[1],
			// );

			// let lastIndex = 0;
			const filteredCurrencyObj = currencyData.filter(
				(currencyDataObj: any) => {
					// lastIndex = index;

					return (
						currencyDataObj.short_name.toLowerCase() ===
						tokenBalance.split(' ')[1].toLowerCase()
					);
				}
			);

			const tokenTotalBalance =
				tokenBalance.split(' ')[0] *
				(filteredCurrencyObj[0]?.tokenPriceUsd ?? 1);

			totalBalance = totalBalance + tokenTotalBalance;

			// console.log(
			//   'lastIndex :: ' + lastIndex,
			//   'tokenTotalBalance :: ' + tokenTotalBalance,
			//   'totalBalance :: ' + totalBalance,
			// );
			dispatch(updateTotalBalance(parseFloat(totalBalance).toFixed(2)));
			//setCurrentBalance(parseFloat(totalBalance).toFixed(2));
			setTokenCount(tokenCount + 1);
		}
	}, [tokenBalance]);

	useEffect(() => {
		if (tokenCount === currencyData.length) {
			setIsLoading(false);
		}
	}, [tokenCount]);

	return (
		<LinearGradient
			useAngle={true}
			colors={defaultTheme.primaryGradientColor}
			style={styles.container}>
			<TouchableOpacity
				onPress={props.onPress}
				activeOpacity={0.9}
				style={styles.flexRawContainer}>
				<ExpoFastImage
					style={styles.imgIconStyle}
					source={icons.wallet}
					resizeMode={'contain'}
				/>
				{!isLoading ? (
					<Text style={styles.textStyle}>
						{Strings.str_dollor + userInfo?.totalBalance}
					</Text>
				) : (
					<ActivityIndicator
						size={'small'}
						color={colors.white}
						style={styles.textStyle}
					/>
				)}
			</TouchableOpacity>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 26
	},
	flexRawContainer: {flexDirection: 'row', alignItems: 'center'},
	imgIconStyle: {
		width: 20,
		height: 20,
		marginVertical: verticalScale(6),
		marginStart: horizontalScale(12),
		marginEnd: horizontalScale(4)
	},
	countStyle: {
		width: 20,
		height: 20,
		marginVertical: verticalScale(6),
		marginStart: horizontalScale(12),
		marginEnd: horizontalScale(4),
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textStyle: {
		marginVertical: verticalScale(4),
		marginStart: horizontalScale(4),
		marginEnd: horizontalScale(12),
		fontFamily: Fonts.type.Inter_Regular,
		fontWeight: '800',
		fontSize: moderateFontScale(12),
		color: Colors.white
	},
	countTextStyle: {
		fontFamily: Fonts.type.Inter_Regular,
		fontWeight: '800',
		fontSize: moderateFontScale(12),
		color: Colors.white
	}
});

export default TotalBalanceComponent;
