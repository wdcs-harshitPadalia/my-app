import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {styles} from './styles';
import {defaultTheme} from '../../../../theme/defaultTheme';

import icons from '../../../../assets/icon';
import ButtonGradient from '../../../../components/ButtonGradient';
import HeaderComponent from '../../../../components/HeaderComponent';
import Strings from '../../../../constants/strings';
import colors from '../../../../theme/colors';
import GradientText from '../../../../components/GradientText';
import ScreenNames from '../../../../navigation/screenNames';
import {updateApiLoader} from '../../../../redux/reducerSlices/preLogin';
import {editProfile, logout} from '../../../../redux/apiHandler/apiActions';
import {RootState} from '../../../../redux/store';
import useUpdateEffect from '../../../../components/CustomHooks/useUpdateEffect';
import {useBetCreateContract} from '../../../../components/CustomHooks/SmartContract';
import {DebethTokenContractAddress} from '../../../../constants/SmartContract';
import {
	resetProfileData,
	updateDeviceToken
} from '../../../../redux/reducerSlices/userInfo';
import {magic} from '../../../../navigation/routes';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {
	getMetamaskBalance,
	showErrorAlert
} from '../../../../constants/utils/Function';
import {SafeAreaView} from 'react-native-safe-area-context';
import TokenConfirmationModel from '../../../../components/TokenConfirmationModel';
import {gradientColorAngle} from '../../../../theme/metrics';
import {decimalValue} from '../../../../constants/api';

const JuryPayChargeScreen: React.FC<any> = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const connector = useWalletConnect();

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const [myBalance, setMyBalance] = useState('0');

	const [juryEscrowDeposit, setJuryEscrowDeposit] = useState('');

	const [isTokenConfirmationModelVisible, setIsTokenConfirmationModelVisible] =
		useState(false);

	const {
		userInitialStake,
		lastWithdrawalAmount,
		juryDbethToken,
		getDisputeConfigDbethToken,
		tokenSymbol,
		getSymbol,
		dbethBalance,
		getBalanceFromContract,
		approveDbethTokenAllowance,
		allowanceAddress,
		addDbethStakeToken,
		approveTnsAddress
	} = useBetCreateContract(false);

	const getBalance = async address => {
		try {
			let res = await getMetamaskBalance(address);
			console.log('res balance', res);
			setMyBalance(parseFloat(res).toFixed(decimalValue));
		} catch (error) {
			setMyBalance(0 + '');
		}
	};

	useEffect(() => {
		userInitialStake();

		if (connector.connected) {
			getBalance(connector?.accounts[0]);
		} else {
			getBalance(userInfo?.user?.walletAddress);
		}
		getBalanceFromContract(DebethTokenContractAddress);
		getSymbol();
	}, []);

	useUpdateEffect(() => {
		if (juryDbethToken) {
			dispatch(
				updateApiLoader({
					apiLoader: false
				})
			);
			setJuryEscrowDeposit(juryDbethToken);
		}
	}, [juryDbethToken]);

	useUpdateEffect(() => {
		if (lastWithdrawalAmount) {
			if (lastWithdrawalAmount === 'Error' || lastWithdrawalAmount === '') {
				console.log('User denied metamask access');
			} else {
				if (lastWithdrawalAmount === '0') {
					dispatch(
						updateApiLoader({
							apiLoader: true
						})
					);
					getDisputeConfigDbethToken(userInfo.user.walletAddress);
				} else {
					setJuryEscrowDeposit(lastWithdrawalAmount);
				}
			}
		}
	}, [lastWithdrawalAmount]);

	useUpdateEffect(() => {
		if (allowanceAddress) {
			if (allowanceAddress === 'Error' || allowanceAddress === '') {
				console.log('User denied metamask access');
			} else {
				addDbethStakeToken();
			}
			console.log(allowanceAddress, 'allowanceAddress?>>>');
		}
	}, [allowanceAddress]);

	useUpdateEffect(() => {
		if (approveTnsAddress) {
			if (approveTnsAddress === 'Error' || approveTnsAddress === '') {
				console.log('User denied metamask access');
				navigation.pop(2);
			} else {
				const requestObject = {
					isJury: true,
					juryEscrowDeposit: juryDbethToken,
					juryEscrowContractAddress: approveTnsAddress
				};
				dispatch(editProfile(requestObject));
			}
		}
	}, [approveTnsAddress]);

	const handlePayButtonClick = async () => {
		console.log(
			'aaaaaaaaa',
			parseFloat(juryEscrowDeposit),
			parseFloat(dbethBalance),
			parseFloat(myBalance)
		);
		if (
			parseFloat(juryEscrowDeposit) >= parseFloat(dbethBalance) ||
			parseFloat(myBalance) <= 0
		) {
			showErrorAlert(
				Strings.txt_insufficient_balance,
				Strings.txt_add_more_fund
			);
			return;
		}
		if (
			userInfo?.user?.socialLoginType?.toLowerCase() === 'metamask' &&
			!connector.connected
		) {
			if (Platform.OS === 'web') {
				let retVal = confirm(Strings.txt_session_expire_msg);
				if (retVal == true) {
					dispatch(logout());
					dispatch(updateDeviceToken({deviceToken: ''}));
					dispatch(resetProfileData({}));
					return true;
				} else {
					return false;
				}
			} else {
				Alert.alert(Strings.txt_session_expire_msg, '', [
					{
						text: 'Ok',
						onPress: () => {
							dispatch(logout());
							dispatch(updateDeviceToken({deviceToken: ''}));
							dispatch(resetProfileData({}));
						}
					}
				]);
			}

			return;
		} else {
			if (userInfo?.user?.socialLoginType?.toLowerCase() !== 'metamask') {
				const loginStatus = await magic.user.isLoggedIn();
				console.log('loginStatus', loginStatus);
				if (!loginStatus) {
					if (Platform.OS === 'web') {
						let retVal = confirm(Strings.txt_session_expire_msg);
						if (retVal == true) {
							dispatch(logout());
							dispatch(updateDeviceToken({deviceToken: ''}));
							dispatch(resetProfileData({}));
							return true;
						} else {
							return false;
						}
					} else {
						Alert.alert(Strings.txt_session_expire_msg, '', [
							{
								text: 'Ok',
								onPress: () => {
									dispatch(logout());
									dispatch(updateDeviceToken({deviceToken: ''}));
									dispatch(resetProfileData({}));
								}
							}
						]);
					}

					return;
				}
			}
		}

		approveDbethTokenAllowance(juryEscrowDeposit);
	};

	useUpdateEffect(() => {
		navigation.navigate(ScreenNames.JuryCongratulationScreen);
	}, [userInfo]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					onLeftIconPath={icons.back}
					name={Strings.escrow_deposit}
				/>
				<View style={styles.middleRootContainer}>
					{/* <Text style={styles.titleText}>{Strings.escrow_deposit}</Text> */}
					{Platform.OS === 'web' ? (
						<Text
							style={[
								styles.amountText,
								{color: defaultTheme.primaryGradientColor[0]}
							]}>
							{juryEscrowDeposit ? juryEscrowDeposit + ' ' + tokenSymbol : ''}
						</Text>
					) : (
						<GradientText
							colors={defaultTheme.primaryGradientColor}
							style={styles.amountText}>
							{juryEscrowDeposit ? juryEscrowDeposit + ' ' + tokenSymbol : ''}
						</GradientText>
					)}
					<Text style={styles.descriptionText}>
						{juryEscrowDeposit
							? Strings.you_will_be_charged.replace(
									'%d',
									juryEscrowDeposit + ' ' + tokenSymbol
							  )
							: ''}
					</Text>

					<TouchableOpacity
						activeOpacity={0.6}
						onPress={() => {
							navigation.navigate(ScreenNames.CMSScreen, {
								screenName: 'privacy-policy'
							});
							// Linking.openURL('https://google.com');
						}}>
						<Text style={styles.termsLinkText}>
							{Strings.terms_and_politics}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<ButtonGradient
				style={styles.button}
				buttonText={Strings.pay + juryEscrowDeposit + ' ' + tokenSymbol}
				buttonTextcolor={colors.white}
				colorArray={defaultTheme.secondaryGradientColor}
				angle={gradientColorAngle}
				onPress={() => {
					setIsTokenConfirmationModelVisible(true);
				}}
			/>
			<TokenConfirmationModel
				title={Strings.approve_allowance}
				infoDescription={Strings.approve_allowance_decs}
				isTokenConfirmationModelVisible={isTokenConfirmationModelVisible}
				tokenPrice={juryEscrowDeposit + ' ' + tokenSymbol} // tokenPrice
				handleYesButtonClick={() => {
					// contract calling
					// approveDbethTokenAllowance(dbethBalance);

					setIsTokenConfirmationModelVisible(false);
					setTimeout(() => {
						handlePayButtonClick();
					}, 1000);
				}}
				handleNoButtonClick={() => {
					setIsTokenConfirmationModelVisible(false);
				}}
			/>
		</SafeAreaView>
	);
};

export default JuryPayChargeScreen;
