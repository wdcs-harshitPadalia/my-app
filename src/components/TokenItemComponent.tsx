import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useSelector} from 'react-redux';
import {decimalValue} from '../constants/api';
import {getMetamaskBalance} from '../constants/utils/Function';
import {RootState} from '../redux/store';
import {Fonts, moderateScale, verticalScale} from '../theme';
import {defaultTheme} from '../theme/defaultTheme';
import CurrencyBalanceVIew from './CurrencyBalanceVIew';
import {useBetCreateContract} from './CustomHooks/SmartContract';
import useUpdateEffect from './CustomHooks/useUpdateEffect';
interface TokenItemComponentPropsTypes {
	itemData: any;
	isSelectedIndexId: any;
	handleSetIsSelectedIndexId: (objData: any) => void;
	handleSetSelectedItem: (objData?: any) => void;
}

const TokenItemComponent: React.FC<TokenItemComponentPropsTypes> = props => {
	const {
		itemData,
		isSelectedIndexId,
		handleSetIsSelectedIndexId,
		handleSetSelectedItem
	} = props;

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const {getBalanceFromContract, dbethBalance} = useBetCreateContract(false);

	const [currentBalance, setCurrentBalance] = useState(0);
	const [currentUsdBalance, setCurrentUsdBalance] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		handleGetTokenWiseBalance(itemData);
	}, [itemData]);

	useUpdateEffect(() => {
		if (dbethBalance) {
			const totalBalance =
				parseFloat(dbethBalance).toFixed(decimalValue) *
				(itemData?.tokenPriceUsd ?? 1);
			setCurrentBalance(parseFloat(dbethBalance).toFixed(1));
			setCurrentUsdBalance(totalBalance);
			setIsLoading(false);
		} else {
			setIsLoading(false);
		}
	}, [dbethBalance]);

	const handleGetTokenWiseBalance = (item: any) => {
		if (item.short_name?.toLowerCase() === 'matic') {
			getBalance(userInfo.user.walletAddress);
		} else {
			getBalanceAsync(item.contractAddress);
		}
	};

	const getBalance = async address => {
		try {
			let res = await getMetamaskBalance(address);
			const totalBalance =
				parseFloat(res).toFixed(decimalValue) * itemData?.tokenPriceUsd;
			setCurrentBalance(parseFloat(res).toFixed(1));
			setCurrentUsdBalance(totalBalance);
			setIsLoading(false);
		} catch (error) {
			setCurrentBalance(0 + '');
			setCurrentUsdBalance(0 + '');
			setIsLoading(false);
		}
	};

	const getBalanceAsync = async address => {
		getBalanceFromContract(address);
	};

	return (
		<View>
			{itemData._id === isSelectedIndexId ? (
				<LinearGradient
					style={styles.circleGradient}
					useAngle={true}
					colors={defaultTheme.primaryGradientColor}>
					<CurrencyBalanceVIew
						onPress={() => {
							handleSetIsSelectedIndexId(itemData._id);
							handleSetSelectedItem(itemData);
						}}
						leftIconPath={itemData.tokenImageUrl}
						title={itemData.name}
						subtitle={itemData.short_name}
						balance={currentBalance}
						currentUsdBalance={currentUsdBalance}
						balanceTextStyle={styles.flatListItemBalance}
						titleTextStyle={styles.flatListItemTitle}
						subTitleTextStyle={styles.flatListItemSubTitle}
						usdBalanceTextStyle={styles.flatListItemCurrency}
						isLoading={isLoading}
					/>
				</LinearGradient>
			) : (
				<CurrencyBalanceVIew
					onPress={() => {
						handleSetIsSelectedIndexId(itemData._id);
						handleSetSelectedItem(itemData);
					}}
					leftIconPath={itemData.tokenImageUrl}
					title={itemData.name}
					subtitle={itemData.short_name}
					balance={currentBalance}
					currentUsdBalance={currentUsdBalance}
					balanceTextStyle={styles.flatListItemBalance}
					titleTextStyle={styles.flatListItemTitle}
					subTitleTextStyle={styles.flatListItemSubTitle}
					usdBalanceTextStyle={styles.flatListItemCurrency}
					isLoading={isLoading}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	circleGradient: {
		width: '100%',
		borderRadius: verticalScale(8),
		alignItems: 'center',
		flexDirection: 'row'
	},
	flatListItemBalance: {
		color: 'white',
		fontFamily: Fonts.type.Inter_SemiBold,
		fontSize: moderateScale(12)
		// opacity: 0.7,
	},
	flatListItemTitle: {
		color: 'white',
		fontFamily: Fonts.type.Inter_SemiBold,
		fontSize: moderateScale(12)
		// opacity: 0.7,
	},
	flatListItemSubTitle: {
		color: 'white',
		fontFamily: Fonts.type.Inter_Medium,
		fontSize: moderateScale(12),
		opacity: 0.7
	},
	flatListItemCurrency: {
		color: 'white',
		fontFamily: Fonts.type.Inter_ExtraBold,
		fontSize: moderateScale(10)
	}
});

export default TokenItemComponent;
