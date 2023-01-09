/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React, {useEffect, useState} from 'react';
import {Alert, BackHandler, View, Platform} from 'react-native';
import {Text} from 'react-native-elements';
import icons from '../../../../assets/icon';
import Strings from '../../../../constants/strings';
import styles from './style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HeaderComponent from '../../../../components/HeaderComponent';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import ButtonGradient from '../../../../components/ButtonGradient';
import {defaultTheme} from '../../../../theme/defaultTheme';
import colors from '../../../../theme/colors';
import CreateLeaguePopup from '../../../../components/CreateLeaguePopup';
import BetsDetailsView from '../../../../components/BetsDetailsView';
import InformationPopUpView from '../../../../components/InformationPopUpView';
import {
	declineFriendRequest,
	getTokenType,
	getUserBetDetails,
	logout,
	takeBet,
	validateBets
} from '../../../../redux/apiHandler/apiActions';
import {useDispatch, useSelector} from 'react-redux';
import {useBetCreateContract} from '../../../../components/CustomHooks/SmartContract';
import {
	dateConvert,
	getMetamaskBalance,
	getRoundDecimalValue,
	timeConvert
} from '../../../../constants/utils/Function';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootState} from '../../../../redux/store';
import ConformationPopupComponet from '../../../../components/ConformationPopupComponet';
import {updateApiLoader} from '../../../../redux/reducerSlices/preLogin';
import {Fonts, moderateScale} from '../../../../theme';
import {magic} from '../../../../navigation/routes';
import {
	resetProfileData,
	updateDeviceToken
} from '../../../../redux/reducerSlices/userInfo';
import TokenConfirmationModel from '../../../../components/TokenConfirmationModel';
import useUpdateEffect from '../../../../components/CustomHooks/useUpdateEffect';
import {decimalValue, nullAddress} from '../../../../constants/api';
import {gradientColorAngle} from '../../../../theme/metrics';
import LottieView from 'lottie-react-native';
import {updateDiscoverRefreshOnFocus} from '../../../../redux/reducerSlices/dashboard';

const JoinBetCreateScreen: React.FC<any> = () => {
	const navigation = useNavigation();
	const {params} = useRoute(); // betCreationType New Bet = 0 , Events bet = 1
	const dispatch = useDispatch();

	const {isFromNotificationScreen, notification_id, betId} = params;
	const [step, setStep] = useState(1);

	const [eventBetData, setEventBetData] = useState();

	const [isBackButtonDisable, setIsBackButtonDisable] = useState(true);

	const [infoPopUpType, setInfoPopUpType] = useState(0); // 0 for back and 1 decline

	const [isSelectedCategory, setIsSelectedCategory] = useState('');

	const [isSelectedSubCategory, setIsSelectedSubCategory] = useState('');

	const [isSelectedLeague, setIsSelectedLeague] = useState('');

	const [modalLeagueVisible, setModalLeagueVisible] = useState(false);
	const [isSelectedLeagueType, setIsSelectedLeagueType] = useState(
		eventBetData?.bet_type
	); // 0 for Browse Leagues and 1 for create your own

	const [isSelectBetsType, setIsSelectBetsType] = useState({});

	const [selectedGame, setSelectedGame] = useState();

	const [isSelectChooseSideType, setIsSelectChooseSideType] = useState(null);

	const [isSelectCurrency, setIsSelectCurrency] = useState();
	const [betAmount, setBetAmount] = useState();
	const [betUsdAmount, setBetUsdAmount] = useState('0.00');
	const [myBalance, setMyBalance] = useState('0');
	const [convertCurrency, setConvertCurrency] = useState();

	const [opposite_odds, setOpposite_odds] = useState();
	const [odds, setOdds] = useState();

	const [winningPercentage, setWinningPercentage] = useState(0);

	const [question, setQuestion] = useState('');

	const [betWinningHelpTitle, setBetWinningHelpTitle] = useState('');
	const [betWinningHelp, setBetWinningHelp] = useState('');

	const [modalNeedHelpVisible, setModalNeedHelpVisible] = useState(false);

	const [modalIsBetJoin, setModalIsBetJoin] = useState(false);
	const [betJoinMessage, setBetJoinMessage] = useState('');

	const [isTokenConfirmationModelVisible, setIsTokenConfirmationModelVisible] =
		useState(false);

	const [customeSelectTokenId, setCustomeSelectTokenId] = useState(0);

	const {
		bet_id,
		getBalanceFromContract,
		handleJoinContract,
		tokenBalance,
		getContractAllowance,
		allowedToken,
		dbethBalance,
		allowanceAddress,
		getBetDetails,
		approveContract,
		betTakerLiquidity,
		betTakerAddress
	} = useBetCreateContract(false);
	const connector = useWalletConnect();

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	//useBetCreateContract

	const getBalanceAsync = async address => {
		getBalanceFromContract(address);
		//approveContract('');
		//getContractAllowance('');
	};

	useEffect(() => {
		getUserBetDetailsData();
	}, [betId]);

	const getUserBetDetailsData = () => {
		dispatch(updateApiLoader({apiLoader: true}));
		getUserBetDetails(betId)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				// console.log('getUserBetDetails Response : ', JSON.stringify(res));
				const betObj = res?.data?.bet;
				setEventBetData(betObj);
				setIsSelectedLeagueType(betObj?.bet_type);
				setSelectedGame(betObj?.match);
				switch (betObj?.tokentypes?.short_name) {
					case 'MATIC':
						setCustomeSelectTokenId(0);
						if (connector.connected) {
							getBalance(connector?.accounts[0]);
						} else {
							getBalance(userInfo.user.walletAddress);
						}
						break;
					case 'DAI':
						getBalanceAsync(betObj?.tokentypes?.contractAddress);
						setCustomeSelectTokenId(1);
						break;
					case 'USDC':
						getBalanceAsync(betObj?.tokentypes?.contractAddress);
						setCustomeSelectTokenId(2);
						break;
					case 'USDT':
						getBalanceAsync(betObj?.tokentypes?.contractAddress);
						setCustomeSelectTokenId(3);
						break;
					case 'WETH':
						getBalanceAsync(betObj?.tokentypes?.contractAddress);
						setCustomeSelectTokenId(4);
						break;
					case 'DBETH':
						getBalanceAsync(betObj?.tokentypes?.contractAddress);
						setCustomeSelectTokenId(5);
						break;
				}
				setBetAmount(
					betObj?.bet_type === 0
						? betObj?.bet_opposite_amount
						: parseFloat(betObj?.bet_amount) * parseFloat(betObj?.odds) -
								parseFloat(betObj?.bet_amount) +
								''
				);
				setIsSelectCurrency(betObj?.tokentypes);

				setBetUsdAmount(
					getRoundDecimalValue(
						parseFloat(betObj?.bet_amount_usd) * parseFloat(betObj?.odds) -
							parseFloat(betObj?.bet_amount_usd)
					) + ''
				);
				setConvertCurrency(betObj?.tokentypes?.tokenPriceUsd ?? 1);

				//setBetAmount(betObj?.bet_opposite_amount);
				setOpposite_odds(betObj?.opposite_odds);
				setOdds(betObj?.odds);

				setIsSelectedCategory(betObj?.categories?.name ?? '');

				setIsSelectedSubCategory(betObj?.subcategories?.name ?? '');

				setIsSelectedLeague(betObj?.match?.leagueName);

				setIsSelectBetsType(betObj?.bettypes);

				setIsSelectChooseSideType(betObj?.bet_opposite_side_option);

				setQuestion(betObj?.betQuestion);

				const uploadData = {
					matchId: betObj?.match_id,
					marketId: betObj?.market_id,
					market: betObj?.market_sub_name
				};
				getTokenTypeData(uploadData);

				// getConvertCurrency(betObj?.bet_amount);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getUserBetDetails Data Err : ', err);
			});
	};

	useEffect(() => {
		if (bet_id) {
			if (bet_id === 'Error') {
				console.log('User denied metamask access');
				setIsBackButtonDisable(false);
			} else {
				addBetData();
			}
			console.log(bet_id, 'bet_id?>>>');
		}
	}, [bet_id]);

	useEffect(() => {
		if (tokenBalance) {
			console.log(tokenBalance, 'tokenBalance?>>>');
			setMyBalance(tokenBalance);
		}
	}, [tokenBalance, dbethBalance]);

	useEffect(() => {
		console.log(allowedToken, 'allowedToken?>>>');
		if (allowedToken) {
			console.log(allowedToken, betAmount, 'allowedToken?>>>');

			if (parseFloat(allowedToken) >= parseFloat(betAmount)) {
				// perform transaction
				console.log('inside if perform transaction>>>');
				handleCustomeTokenContract();
				// handleCustomeTokenContract();
			} else {
				console.log('inside else req contract>>>');
				setIsTokenConfirmationModelVisible(true);
				// req contract
			}
		}
	}, [allowedToken]);

	useEffect(() => {
		console.log(allowanceAddress, 'allowanceAddress?>>>');
		if (allowanceAddress && allowanceAddress !== 'Error') {
			setIsTokenConfirmationModelVisible(false);
			handleCustomeTokenContract();
		}
	}, [allowanceAddress]);

	const handleCustomeTokenContract = async () => {
		if (
			userInfo?.user?.socialLoginType?.toLowerCase() === 'metamask' &&
			!connector.connected
		) {
			Alert.alert('Session expired please login again', '', [
				{
					text: 'Ok',
					onPress: () => {
						dispatch(logout());
						dispatch(updateDeviceToken({deviceToken: ''}));
						dispatch(resetProfileData({}));
					}
				}
			]);
			return;
		} else {
			if (userInfo?.user?.socialLoginType?.toLowerCase() !== 'metamask') {
				const loginStatus = await magic.user.isLoggedIn();
				console.log('loginStatus', loginStatus);
				if (!loginStatus) {
					Alert.alert('Session expired please login again', '', [
						{
							text: 'Ok',
							onPress: () => {
								dispatch(logout());
								dispatch(updateDeviceToken({deviceToken: ''}));
								dispatch(resetProfileData({}));
							}
						}
					]);
					return;
				}
			}
		}
		handleJoinContract({
			_betAmount: betTakerLiquidity,
			_betContractId: eventBetData?.bet_id,
			// _selectedBetTackerOption:
			//   eventBetData?.bet_opposite_side_option_index + 1,
			_selectedBetTackerOption: eventBetData?.bet_opposite_side_option_index,
			_tokenId: customeSelectTokenId,
			_betEndTime:
				(selectedGame?.match_end_time ?? eventBetData?.betEndDate) / 1000
		});
	};

	useEffect(() => {
		console.log('----oooo-----', eventBetData);
		setIsSelectedCategory(eventBetData?.categories?.name);

		setIsSelectedSubCategory(eventBetData?.subcategories?.name);

		setIsSelectedLeague(eventBetData?.matches?.leagueName);

		setIsSelectBetsType(eventBetData?.bettypes);

		setIsSelectChooseSideType(eventBetData?.bet_opposite_side_option);

		setQuestion(eventBetData?.betQuestion);
		setIsBackButtonDisable(true);
	}, [eventBetData]);

	const backAction = () => {
		if (step === 3) {
			navigation.dispatch(StackActions.popToTop());
		} else {
			setInfoPopUpType(0);
			setModalLeagueVisible(true);
		}
		return true;
	};

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', backAction);

		return () =>
			BackHandler.removeEventListener('hardwareBackPress', backAction);
	}, []);

	const getBalance = async address => {
		try {
			let res = await getMetamaskBalance(address);
			console.log('res balance', res);
			setMyBalance(getRoundDecimalValue(res) + ' MATIC');
		} catch (error) {
			setMyBalance(0 + '');
		}
	};

	const getTokenTypeData = uploadData => {
		getTokenType(uploadData)
			.then(res => {
				console.log('getTokenTypeData Response : ', JSON.stringify(res));
				setWinningPercentage(res?.data?.winningPercentage);
				setBetWinningHelpTitle(res?.data?.tokenContent?.title);
				setBetWinningHelp(res?.data?.tokenContent?.content);
				setIsBackButtonDisable(false);
				if (!connector.connected) {
					// setInfoPopUpType(2);
					// setModalLeagueVisible(true);
				}
			})
			.catch(err => {
				setIsBackButtonDisable(false);
				console.log('getTokenTypeData Data Err : ', err);
			});
	};

	const addBetData = () => {
		dispatch(updateApiLoader({apiLoader: true}));

		let uploadData = {
			opposite_bet_amount: betAmount,
			opposite_bet_amount_usd: betUsdAmount,
			bet_id: eventBetData?.bet_id,
			bet_list_id: eventBetData?._id
		};

		takeBet(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				dispatch(updateDiscoverRefreshOnFocus(true));
				console.log('addBetData Response : ', res);
				setStep(2);
				setIsBackButtonDisable(false);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				setIsBackButtonDisable(false);
				console.log('addBetData Data Err : ', err);
			});
	};

	// useUpdateEffect(() => {
	//   getConvertCurrency(betAmount);
	// }, [isSelectCurrency]);

	// const getConvertCurrency = async bet_Amount => {
	//   console.log('betObj?.bet_amount >> ', isSelectCurrency);
	//   console.log('betObj?.bet_amount >> ', betAmount);
	//   getConvertCurrencyData(isSelectCurrency?.short_name.toUpperCase())
	//     .then(async res => {
	//       console.log('getConvertCurrencyData Response : ', res);
	//       setBetUsdAmount((parseFloat(res) * parseFloat(bet_Amount)).toFixed(decimalValue));
	//       setConvertCurrency(res);
	//       setIsBackButtonDisable(false);
	//     })
	//     .catch(err => {
	//       setIsBackButtonDisable(false);
	//       console.log('getConvertCurrencyData Data Err : ', err);
	//     });
	// };

	const validateBetsData = () => {
		let uploadData = {
			type: 'join',
			bet_id: eventBetData?._id
		};
		dispatch(updateApiLoader({apiLoader: true}));
		validateBets(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('validateBetsData Response : ', res);
				setBetJoinMessage(res?.data?.message);
				setTimeout(async () => {
					if (res?.data?.isBet === true) {
						//Alert.alert('dfshjk');
						//TODO: call contract
						// if (!connector.connected) {
						//   setInfoPopUpType(2);
						//   setModalLeagueVisible(true);
						// } else {

						console.log('====================================');
						console.log('betTakerAddress :: ', betTakerAddress);
						console.log(
							'userInfo?.user?.walletAddress :: ',
							userInfo?.user?.walletAddress
						);

						console.log('====================================');

						setIsBackButtonDisable(true);
						if (
							betTakerAddress.toLowerCase() ===
							userInfo?.user?.walletAddress.toLowerCase()
						) {
							addBetData();
						} else if (betTakerAddress.toLowerCase() !== nullAddress) {
							Alert.alert('', Strings.this_bet_already_joined);
						} else {
							if (isSelectCurrency?.name !== 'MATIC') {
								if (parseFloat(betAmount) > parseFloat(dbethBalance)) {
									setIsBackButtonDisable(false);
									Alert.alert(
										'Insufficient Balance'.toUpperCase(),
										'Please add more funds.'
									);
									return;
								}
								getContractAllowance(isSelectCurrency?.contractAddress);
								return;
							}

							if (parseFloat(betAmount) > parseFloat(myBalance)) {
								setIsBackButtonDisable(false);
								Alert.alert(
									'Insufficient Balance'.toUpperCase(),
									'Please add more funds.'
								);
								return;
							}
							if (
								userInfo?.user?.socialLoginType?.toLowerCase() === 'metamask' &&
								!connector.connected
							) {
								Alert.alert('Session expired please login again', '', [
									{
										text: 'Ok',
										onPress: () => {
											dispatch(logout());
											dispatch(updateDeviceToken({deviceToken: ''}));
											dispatch(resetProfileData({}));
										}
									}
								]);
								return;
							} else {
								if (
									userInfo?.user?.socialLoginType?.toLowerCase() !== 'metamask'
								) {
									const loginStatus = await magic.user.isLoggedIn();
									console.log('loginStatus', loginStatus);
									if (!loginStatus) {
										Alert.alert('Session expired please login again', '', [
											{
												text: 'Ok',
												onPress: () => {
													dispatch(logout());
													dispatch(updateDeviceToken({deviceToken: ''}));
													dispatch(resetProfileData({}));
												}
											}
										]);
										return;
									}
								}
							}
							handleJoinContract({
								_betAmount: betTakerLiquidity,
								_betContractId: eventBetData?.bet_id,
								_selectedBetTackerOption:
									eventBetData?.bet_opposite_side_option_index,
								_tokenId: customeSelectTokenId,
								_betEndTime:
									(selectedGame?.match_end_time ?? eventBetData?.betEndDate) /
									1000
							});
						}
					} else {
						setModalIsBetJoin(true);
					}
				}, 500);
			})
			.catch(err => {
				setIsBackButtonDisable(false);
				console.log('validateBetsData Data Err : ', err);
				dispatch(updateApiLoader({apiLoader: false}));
			});
	};

	const showViews = () => {
		console.log('showViews ', step);

		switch (step) {
			case 1:
				return (
					<KeyboardAwareScrollView
						bounces={false}
						showsVerticalScrollIndicator={false}>
						<Text style={styles.reviewTitleStyle}>
							{Strings.review_your_bet}
						</Text>
						<BetsDetailsView
							popupTitle={Strings.bet_details}
							betType={
								isSelectedLeagueType === 0
									? isSelectBetsType?.name?.toUpperCase()
									: isSelectedLeagueType === 2
									? isSelectBetsType?.name?.toUpperCase()
									: Strings.custom.toUpperCase()
							}
							categoryName={
								isSelectedCategory?.toUpperCase() +
								(isSelectedSubCategory === '' ? '' : ' - ') +
								isSelectedSubCategory?.toUpperCase() +
								(isSelectedLeagueType === 0
									? ' - ' + isSelectedLeague?.toUpperCase()
									: isSelectedLeagueType === 2
									? ' - ' + isSelectedLeague?.toUpperCase()
									: '')
							}
							question={question}
							selectMainMarket={
								isSelectedLeagueType === 0
									? eventBetData?.mainmarkets?.market_name +
									  (eventBetData?.market_sub_name
											? ' : ' + eventBetData?.market_sub_name
											: '')
									: question
							}
							isSelectedLeagueType={isSelectedLeagueType}
							localTeamName={eventBetData?.bet_creator_side_option}
							visitorTeamName={eventBetData?.bet_opposite_side_option}
							isSelectCurrency={isSelectCurrency}
							betAmount={betAmount}
							paysBetAmount={
								getRoundDecimalValue(
									parseFloat(betAmount) * parseFloat(opposite_odds)
								) + ''
							}
							paysBetUsdAmount={
								getRoundDecimalValue(
									parseFloat(betUsdAmount) * parseFloat(opposite_odds)
								) + ''
							}
							betUsdAmount={betUsdAmount}
							betOdds={opposite_odds}
							oppositeBetOdds={odds}
							winningPercentage={winningPercentage + ''}
							selectMySideType={isSelectChooseSideType}
							selectedGameData={selectedGame}
							gameEndTime={timeConvert(
								selectedGame?.match_end_time ?? eventBetData?.betEndDate
							)}
							gameEndDate={dateConvert(
								selectedGame?.match_end_time ?? eventBetData?.betEndDate,
								'DD MMM YYYY - '
							)}
							onPressNeedHelp={() => {
								setModalNeedHelpVisible(true);
							}}
							oppositeBetAmount={
								getRoundDecimalValue(eventBetData?.bet_amount) + ''
							}
							oppositeBetUsdAmount={
								getRoundDecimalValue(
									parseFloat(eventBetData?.bet_amount) *
										parseFloat(convertCurrency)
								) + ''
							}
							isShowOpponent={true}
							profileImgPath={userInfo?.user?.picture}
							joinEndTime={
								isSelectedLeagueType === 0
									? dateConvert(
											selectedGame?.gmt_timestamp,
											'DD MMM YYYY - ',
											5
									  ) + timeConvert(selectedGame?.gmt_timestamp, 5)
									: eventBetData?.betParticipationEndDate !== 'NaN'
									? dateConvert(
											selectedGame?.gmt_timestamp ??
												eventBetData?.betParticipationEndDate,
											'DD MMM YYYY - ',
											isSelectedLeagueType === 1 ? 0 : 5
									  ) +
									  timeConvert(
											selectedGame?.gmt_timestamp ??
												eventBetData?.betParticipationEndDate,
											isSelectedLeagueType === 1 ? 0 : 5
									  )
									: dateConvert(
											selectedGame?.gmt_timestamp ?? eventBetData?.betEndDate,
											'DD MMM YYYY - ',
											isSelectedLeagueType === 1 ? 0 : 5
									  ) +
									  timeConvert(
											selectedGame?.gmt_timestamp ?? eventBetData?.betEndDate,
											isSelectedLeagueType === 1 ? 0 : 5
									  )
							}
						/>
					</KeyboardAwareScrollView>
				);
			case 2:
				dispatch(updateApiLoader({apiLoader: false}));
				return (
					<View style={styles.viewDoneStyle}>
						<Text style={styles.titleDoneStyle}>
							{Strings.well_done_bet_has_been_joined.replace(
								'%s',
								userInfo.user.userName
							)}
						</Text>

						{Platform.OS !== 'web' && (
							<LottieView
								style={{
									height: 300,
									width: 300,
									alignSelf: 'center',
									position: 'absolute'
								}}
								source={require('../../../../assets/animations/confetti_day.json')}
								autoPlay
								loop={false}
							/>
						)}
					</View>
				);
		}
	};

	useUpdateEffect(() => {
		if (betTakerAddress) {
			validateBetsData();
		}
	}, [betTakerAddress]);

	const connectMetaMask = async () => {
		const success = await connector.connect();
		if (success) {
			console.log('success?.accounts[0]', success?.accounts[0]);
			getBalance(success?.accounts[0]);
			// console.log('res balance', res);
			// setCurrentBalance(parseFloat(res).toPrecision(5));
		} else {
			getBalance(userInfo.user.walletAddress);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						if (step === 3) {
							navigation.dispatch(StackActions.popToTop());
						} else {
							setInfoPopUpType(0);
							setModalLeagueVisible(true);
						}
					}}
					onLeftIconPath={icons.back}
					name={Strings.join_bet}
				/>

				{eventBetData && <View style={styles.viewContain}>{showViews()}</View>}

				{eventBetData &&
					(step === 1 ? (
						<View style={styles.viewBackButton}>
							<ButtonGradient
								onPress={() => {
									setInfoPopUpType(isFromNotificationScreen ? 1 : 0);
									setModalLeagueVisible(true);
								}}
								colorArray={defaultTheme.ternaryGradientColor}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								buttonText={
									isFromNotificationScreen
										? Strings.Decline_invitation
										: Strings.back
								}
								style={styles.backButton}
							/>
							<ButtonGradient
								onPress={() => {
									if (step === 1) {
										getBetDetails(eventBetData?.bet_id);
									} else {
										navigation.dispatch(StackActions.popToTop());
									}
								}}
								colorArray={defaultTheme.secondaryGradientColor}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								buttonText={Strings.place_bet}
								style={styles.nextButton}
								btnDisabled={isBackButtonDisable}
							/>
						</View>
					) : (
						<ButtonGradient
							onPress={() => {
								// dispatch(updateDiscoverRefreshOnFocus(true));
								navigation.dispatch(StackActions.popToTop());
							}}
							colorArray={defaultTheme.secondaryGradientColor}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							buttonText={Strings.continue}
							style={styles.continueFeedButton}
							btnDisabled={isBackButtonDisable}
						/>
					))}
				<CreateLeaguePopup
					popupTitle={
						infoPopUpType === 1 ? Strings.betdecline : Strings.betBack
					}
					buttonOkTitle={infoPopUpType === 1 ? Strings.yes : Strings.ok}
					buttonCancelTitle={infoPopUpType === 1 ? Strings.no : Strings.cancel}
					leftIconPath={null}
					isVisible={modalLeagueVisible}
					onPressOk={() => {
						setModalLeagueVisible(!modalLeagueVisible);

						if (infoPopUpType === 1) {
							dispatch(
								declineFriendRequest({
									bet_id: eventBetData?._id,
									notification_id: notification_id
								})
							);
						}
						navigation.goBack();
					}}
					onPressCancel={() => {
						setModalLeagueVisible(!modalLeagueVisible);
					}}
				/>

				<InformationPopUpView
					popupTitle={betWinningHelpTitle}
					buttonTitle={Strings.got_it}
					description={betWinningHelp}
					onButtonPress={() => {
						setModalNeedHelpVisible(!modalNeedHelpVisible);
					}}
					isVisible={modalNeedHelpVisible}
					colorArray={defaultTheme.ternaryGradientColor}
				/>
				<ConformationPopupComponet
					style={{
						fontSize: moderateScale(14),
						fontFamily: Fonts.type.Inter_Bold
					}}
					popupTitle={betJoinMessage}
					buttonOkTitle={Strings.ok}
					isVisible={modalIsBetJoin}
					onPressOk={() => {
						setModalIsBetJoin(!modalIsBetJoin);
					}}
					onPressCancel={() => {
						setModalIsBetJoin(!modalIsBetJoin);
					}}
				/>

				<TokenConfirmationModel
					title={Strings.approve_allowance}
					infoDescription={Strings.approve_allowance_decs}
					isTokenConfirmationModelVisible={isTokenConfirmationModelVisible}
					tokenPrice={betAmount + ' ' + isSelectCurrency?.name} // tokenPrice
					handleYesButtonClick={() => {
						// contract calling
						// approveDbethTokenAllowance(dbethBalance);

						setIsTokenConfirmationModelVisible(false);
						setTimeout(() => {
							approveContract(
								isSelectCurrency?.contractAddress,
								betTakerLiquidity,
								false
							);
						}, 1000);
					}}
					handleNoButtonClick={() => {
						setIsTokenConfirmationModelVisible(false);
						setIsBackButtonDisable(false);
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default JoinBetCreateScreen;
