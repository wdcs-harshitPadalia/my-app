import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, Platform, View} from 'react-native';
import ButtonGradient from '../../../../components/ButtonGradient';
import HeaderComponent from '../../../../components/HeaderComponent';
import Strings from '../../../../constants/strings';
import {styles} from './style';
import icons from '../../../../assets/icon';
import colors from '../../../../theme/colors';
import ExpoFastImage from 'expo-fast-image';
import {defaultTheme} from '../../../../theme/defaultTheme';
import {Text} from 'react-native-elements';
import ButtonGradientWithRightIcon from '../../../../components/ButtonGradientWithRightIcon';
import {ScrollView} from 'react-native-gesture-handler';
import ScreenNames from '../../../../navigation/screenNames';
import {useBetCreateContract} from '../../../../components/CustomHooks/SmartContract';
import {
	getMetamaskBalance,
	getRoundDecimalValue,
	showErrorAlert
} from '../../../../constants/utils/Function';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {DebethTokenContractAddress} from '../../../../constants/SmartContract';
import useUpdateEffect from '../../../../components/CustomHooks/useUpdateEffect';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../../redux/apiHandler/apiActions';
import {
	resetProfileData,
	updateDeviceToken
} from '../../../../redux/reducerSlices/userInfo';
import {RootState} from '../../../../redux/store';
import {magic} from '../../../../navigation/routes';
import TokenConfirmationModel from '../../../../components/TokenConfirmationModel';
import {SafeAreaView} from 'react-native-safe-area-context';
import {gradientColorAngle} from '../../../../theme/metrics';
import {decimalValue} from '../../../../constants/api';

const OpenDisputeInfoScreen: React.FC<any> = () => {
	const navigation = useNavigation();
	const {params} = useRoute();
	const {bet_id, bet_contract_address} = params;
	const dispatch = useDispatch();
	const [isTokenConfirmationModelVisible, setIsTokenConfirmationModelVisible] =
		useState(false);
	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const [myBalance, setMyBalance] = useState('0');
	const {
		disputeDbethToken,
		tokenSymbol,
		getSymbol,
		dbethBalance,
		getBalanceFromContract,
		approveDbethTokenAllowance,
		allowanceAddress,
		approveTnsAddress,
		getUserStrike,
		strike,
		getTokensPerStrike
	} = useBetCreateContract(false);

	const connector = useWalletConnect();

	const getBalance = async address => {
		try {
			let res = await getMetamaskBalance(address);
			console.log('res balance', res);
			setMyBalance(getRoundDecimalValue(res));
		} catch (error) {
			setMyBalance(0 + '');
		}
	};

	useEffect(() => {
		if (connector.connected) {
			getBalance(connector?.accounts[0]);
		} else {
			getBalance(userInfo?.user?.walletAddress);
		}

		getBalanceFromContract(DebethTokenContractAddress);
		getUserStrike(userInfo.user.walletAddress);
		getSymbol();
	}, []);

	useUpdateEffect(() => {
		if (strike) {
			console.log('strike level', strike);
			getTokensPerStrike(strike);
		}
	}, [strike]);

	useUpdateEffect(() => {
		if (allowanceAddress) {
			if (allowanceAddress === 'Error' || allowanceAddress === '') {
				console.log('User denied metamask access');
			} else {
				// addDbethStakeToken();
				navigation.navigate(ScreenNames.OpenDisputeScreen, {
					bet_id: bet_id,
					amount: disputeDbethToken,
					contractAddress: allowanceAddress,
					bet_contract_address: bet_contract_address
				});
			}
			console.log(allowanceAddress, 'allowanceAddress?>>>');
		}
	}, [allowanceAddress]);

	useUpdateEffect(() => {
		if (approveTnsAddress) {
			if (approveTnsAddress === 'Error' || approveTnsAddress === '') {
				console.log('User denied metamask access');
			} else {
				navigation.navigate(ScreenNames.OpenDisputeScreen, {
					bet_id: bet_id,
					amount: disputeDbethToken,
					contractAddress: approveTnsAddress,
					bet_contract_address: bet_contract_address
				});
			}
		}
	}, [approveTnsAddress]);

	const handlePayButtonClick = async () => {
		console.log('aaaaaaaaa', disputeDbethToken, dbethBalance, myBalance);
		if (
			parseFloat(disputeDbethToken) >= parseFloat(dbethBalance) ||
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

		approveDbethTokenAllowance(disputeDbethToken);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					name={Strings.dispute_info}
					onLeftIconPath={icons.back}
				/>
				<ScrollView>
					<ExpoFastImage
						resizeMode={'contain'}
						source={icons.emojiThinking}
						style={styles.imgLogo}
					/>
					<View style={styles.containerInner}>
						<Text style={styles.headerText}>{Strings.open_dispute_text}</Text>
						<Text style={styles.subTitleText}>
							{Strings.open_dispute_text_2}
						</Text>
						<Text style={[styles.subTitleText, styles.subTitleMarginUppercase]}>
							Cost of the dispute
						</Text>
						<ButtonGradientWithRightIcon
							colorArray={defaultTheme.ternaryGradientColor}
							angle={gradientColorAngle}
							//rightIconPath={}
							//onPress={}
							style={styles.marginInput}
							short_name={tokenSymbol}
							onChangeText={() => {}}
							onSubmitText={() => {}}
							textValue={disputeDbethToken}
							editable={false}
							maxLength={10}
						/>
						{/* <Text style={styles.AmountStyle}>{`≈ USD ${(
              parseFloat(amount) * parseFloat(usdPrice)
            ).toFixed(decimalValue)}`}</Text> */}
						<Text
							style={[
								styles.subTitleText,
								styles.subTitleMarginHorizontalUppercase
							]}>
							{Strings.open_dispute_text_3}
						</Text>
						<Text
							style={[styles.subTitleText, styles.subTitleUpperCaseBoldFont]}>
							{Strings.open_dispute_text_4}
						</Text>
						<Text
							style={[styles.subTitleText, styles.subTitleUpperCaseBoldFont]}>
							{Strings.open_dispute_text_5}
						</Text>
					</View>
				</ScrollView>
			</View>
			<View style={styles.viewBackButton}>
				<ButtonGradient
					colorArray={defaultTheme.ternaryGradientColor}
					angle={gradientColorAngle}
					onPress={() => {
						navigation.goBack();
					}}
					buttonTextcolor={colors.white}
					buttonText={Strings.no}
					style={styles.backButton}
				/>
				<ButtonGradient
					colorArray={defaultTheme.primaryGradientColor}
					angle={gradientColorAngle}
					style={styles.nextButton}
					buttonTextcolor={colors.white}
					buttonText={Strings.yes}
					onPress={() => {
						setIsTokenConfirmationModelVisible(true);
					}}
				/>
			</View>
			<TokenConfirmationModel
				title={Strings.approve_allowance}
				infoDescription={Strings.approve_allowance_decs}
				isTokenConfirmationModelVisible={isTokenConfirmationModelVisible}
				tokenPrice={disputeDbethToken + ' ' + tokenSymbol} // tokenPrice
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

export default OpenDisputeInfoScreen;
