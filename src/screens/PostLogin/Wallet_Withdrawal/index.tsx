import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {Text} from 'react-native-elements';
import ExpoFastImage from 'expo-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LinearGradient} from 'expo-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import icons from '../../../assets/icon';
import ButtonGradient from '../../../components/ButtonGradient';
import ButtonGradientWithRightIcon from '../../../components/ButtonGradientWithRightIcon';
import {useBetCreateContract} from '../../../components/CustomHooks/SmartContract';
import useUpdateEffect from '../../../components/CustomHooks/useUpdateEffect';
import DropDownGradientView from '../../../components/DropDownGradientView';
import HeaderComponent from '../../../components/HeaderComponent';
import InputComponent from '../../../components/InputComponent';
import TokenSelection from '../../../components/TokenSelection';
import WithdrawConformationModal from '../../../components/WithdrawConformationModal';
import Strings from '../../../constants/strings';
import ScreenNames from '../../../navigation/screenNames';
import {getTokenType} from '../../../redux/apiHandler/apiActions';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import {gradientColorAngle} from '../../../theme/metrics';
import styles from './style';
import * as WebBrowser from 'expo-web-browser';
import * as Crypto from 'expo-crypto';
import {RootState} from '../../../redux/store';
import {widgetBaseUrl} from '../../../constants/api';

let shouldNavigate = false;

export default function WalletWithdrawalScreen() {
	const [isCollapsedPolygon, setIsCollapsedPolygon] = useState(true);
	const [isCollapsedWithdraw, setIsCollapsedWithdraw] = useState(true);

	const navigation = useNavigation();
	const dispatch = useDispatch();

	const [currencyData, setCurrencyData] = useState();
	const [isSelectCurrency, setIsSelectCurrency] = useState({});
	const [amount, setAmount] = useState('');
	const [showTokenSelectionPopup, setShowTokenSelectionPopup] = useState(false);

	const [check, setCheck] = useState(false);
	const [address, setAddress] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const {
		transferMaticToken,
		transferERCToken,
		maticTransfer,
		ercTokenTransfer
	} = useBetCreateContract(false);

	const currencyName = 'MATIC';

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	useEffect(() => {
		getTokenTypeData();
	}, []);

	useUpdateEffect(() => {
		if (Object.keys(maticTransfer).length > 0 && shouldNavigate) {
			shouldNavigate = false;
			navigateToSuccessScreen();
		}
	}, [maticTransfer]);

	useUpdateEffect(() => {
		if (Object.keys(ercTokenTransfer).length > 0 && shouldNavigate) {
			shouldNavigate = false;
			navigateToSuccessScreen();
		}
	}, [ercTokenTransfer]);

	const getPaymentUrl = () => {
		const walletAddress = userInfo?.user?.walletAddress;
		const cryptoHash = Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA512,
			'0x8001c03501d88c3Fa61a62786c91f6bdf15CcA0e' +
				'822c9e5f7149734f927c4b77cdc437cb'
		);

		let webUrl =
			widgetBaseUrl +
			'f49448ba-2a9b-438e-8bb6-fdbdb30f5818' +
			'&type=' +
			Strings.sell +
			'&currency=' +
			currencyName +
			'&currencies=' +
			'MATIC' +
			'&return_url=' +
			Strings.defibetHouseUrl +
			'&address=' +
			walletAddress +
			'&signature=' +
			cryptoHash;
		return webUrl;
	};

	const getTokenTypeData = () => {
		dispatch(updateApiLoader({apiLoader: true}));

		const uploadData = {};
		getTokenType(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));

				console.log('getTokenTypeData Data : ', res?.data);
				let filteredTokensData = res?.data?.tokens?.filter(function (item) {
					return item?.short_name.toLowerCase() !== 'dbeth';
				});

				setCurrencyData(filteredTokensData);
				setIsSelectCurrency(res?.data.tokens[0]);
			})
			.catch(err => {
				console.log('getTokenTypeData Data Err : ', err);
			});
	};

	function isBtnDisable() {
		if (
			amount.trim() !== '' &&
			parseFloat(amount.trim()) > 0.0 &&
			address.trim() !== '' &&
			check
		) {
			return false;
		}
		return true;
	}
	function convertAmountToUsDollar() {
		let totalAmount = amount * isSelectCurrency?.tokenPriceUsd;
		return '≈ ' + totalAmount + ' ' + Strings.us_dollar;
	}

	function navigateToSuccessScreen() {
		navigation.navigate(ScreenNames.WithdrawSuccessScreen, {
			amount: amount + ' ' + isSelectCurrency?.short_name
		});
	}

	const handleConfirmWithdrawal = () => {
		shouldNavigate = true;
		setIsModalVisible(!isModalVisible);
		if (isSelectCurrency?.short_name === 'MATIC') {
			transferMaticToken(amount, address);
		} else {
			transferERCToken(isSelectCurrency?.contractAddress, amount, address);
		}
	};

	return (
		<SafeAreaView edges={['right', 'left', 'top']} style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					name={Strings.Withdrawal}
					onLeftIconPath={icons.back}
				/>
				{/* <HeaderView fontSize={24} title={Strings.Withdrawal} /> */}

				<KeyboardAwareScrollView bounces={false}>
					<View style={styles.creditCardViewStyle}>
						<TouchableOpacity
							activeOpacity={1}
							onPress={() => {
								setIsCollapsedPolygon(!isCollapsedPolygon);
							}}>
							<LinearGradient
								style={[styles.buttonContainerStyle]}
								colors={['black', 'black']}
								start={{x: 0, y: 0}}
								end={{x: 1, y: 0}}>
								<Text style={styles.buttonTitleText}>
									{Strings.Polygon_Transfer}
								</Text>
								<ExpoFastImage
									source={!isCollapsedPolygon ? icons.up_gray : icons.downGray}
									style={styles.img}
								/>
							</LinearGradient>
						</TouchableOpacity>
						<Collapsible
							duration={400}
							easing="easeInOutCubic"
							align="center"
							collapsed={isCollapsedPolygon}>
							<View style={{marginBottom: 16}}>
								<Text style={styles.transferAmount}>
									{Strings.transfer_amount}
								</Text>
								<View style={styles.payOutStyle}>
									<ButtonGradientWithRightIcon
										colorArray={defaultTheme.ternaryGradientColor}
										angle={gradientColorAngle}
										style={styles.buttonInputStyle}
										// short_name={'US$'}
										onChangeText={(text: string) => {
											setAmount(text);
										}}
										keyboardType="decimal-pad"
										maxLength={6}
										errMessage={'errMessage'}
										isShowError={false}
										btnDisabled={true}
										isRightIconVisible={false}
									/>

									<DropDownGradientView
										onPress={() => {
											setShowTokenSelectionPopup(!showTokenSelectionPopup);
										}}
										colorArray={defaultTheme.primaryGradientColor}
										angle={gradientColorAngle}
										buttonTextcolor={colors.white}
										buttonText={isSelectCurrency?.short_name}
										style={styles.dropDown}
										rightIconPath={icons.downGray}
										leftIconPath={isSelectCurrency?.tokenImageUrl}
										textSize={10}
									/>
								</View>
								<View style={styles.priceViewStyle}>
									<Text style={styles.priceTextStyle}>
										{convertAmountToUsDollar()}
									</Text>
								</View>
								<Text style={styles.transferAmount}>
									{Strings.recipients_polygon_wallet}
								</Text>
								<InputComponent
									placeholder={Strings.enter_polygon_address}
									textValue={address}
									onChangeText={(text: string) => {
										setAddress(text);
									}}
									returnType={'return'}
								/>
								<Text style={styles.desText}>
									{Strings.withdrawing.replace(
										'%S',
										isSelectCurrency?.short_name
									)}
								</Text>

								<TouchableOpacity
									style={styles.viewCheckboxStyle}
									onPress={() => {
										setCheck(!check);
										//handleChange('isTermsAccepted', value => {
										// values.isTermsAccepted = !values.isTermsAccepted;
										// });
										// navigation.navigate(Navigation.CMSScreen, {
										//   isScreen: 'term',
										// });
									}}>
									<ExpoFastImage
										style={styles.imgIconStyle}
										source={check ? icons.checkbox : icons.unCheck}
										// resizeMode={'cover'}
									/>
									<Text style={styles.acceptStyle}>
										{Strings.i_am_withdrawing_polygon.replace(
											'%s',
											isSelectCurrency?.short_name
										)}
									</Text>
								</TouchableOpacity>

								<ButtonGradient
									colorArray={defaultTheme.secondaryGradientColor}
									angle={gradientColorAngle}
									onPress={() => {
										setIsModalVisible(!isModalVisible);
									}}
									buttonTextcolor={colors.white}
									buttonText={Strings.send}
									style={{marginTop: 16}}
									paddingVertical={20}
									btnDisabled={isBtnDisable()}
								/>
							</View>
						</Collapsible>
					</View>
					<View style={styles.creditCardViewStyle}>
						<TouchableOpacity
							activeOpacity={1}
							onPress={() => {
								setIsCollapsedWithdraw(!isCollapsedWithdraw);
							}}>
							<LinearGradient
								style={[styles.buttonContainerStyle]}
								colors={['black', 'black']}
								start={{x: 0, y: 0}}
								end={{x: 1, y: 0}}>
								<Text style={styles.buttonTitleText}>
									{Strings.withdraw_via_Credit_Card}
								</Text>
								<ExpoFastImage
									source={!isCollapsedWithdraw ? icons.up_gray : icons.downGray}
									style={styles.img}
								/>
							</LinearGradient>
						</TouchableOpacity>
						<Collapsible
							duration={400}
							easing="easeInOutCubic"
							align="center"
							collapsed={isCollapsedWithdraw}>
							<View style={{marginBottom: 16}}>
								<ButtonGradient
									colorArray={defaultTheme.secondaryGradientColor}
									angle={gradientColorAngle}
									onPress={async () => {
										await WebBrowser.openBrowserAsync(getPaymentUrl());
										// navigation.navigate(ScreenNames.TransakWebView, {
										// 	type: Strings.withdrawal
										// });
									}}
									buttonTextcolor={colors.white}
									buttonText={Strings.withdrawal}
									style={{marginTop: 16}}
									paddingVertical={20}
								/>
							</View>
						</Collapsible>
					</View>
				</KeyboardAwareScrollView>
			</View>
			{showTokenSelectionPopup && (
				<TokenSelection
					data={currencyData}
					onClose={item => {
						if (item) {
							console.log('item>>>', item);
							setIsSelectCurrency(item);
						}
						setShowTokenSelectionPopup(false);
					}}
					pervSelectedID={isSelectCurrency?._id}
					pervSelectedObj={isSelectCurrency}
				/>
			)}

			{isModalVisible && (
				<WithdrawConformationModal
					isVisible={isModalVisible}
					onButtonClosePress={() => {
						setIsModalVisible(!isModalVisible);
					}}
					amount={amount + ' ' + isSelectCurrency?.short_name}
					address={address}
					onButtonConfirmPress={() => {
						handleConfirmWithdrawal();
					}}
				/>
			)}
		</SafeAreaView>
	);
}
