/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React, {useEffect, useState} from 'react';
import {Alert, BackHandler, Platform, View} from 'react-native';
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
import InformationPopUpView from '../../../../components/InformationPopUpView';
import {
	addCustomBetResult,
	claimAmount,
	getUserAncestor,
	getUserBetResult,
	logout
} from '../../../../redux/apiHandler/apiActions';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootState} from '../../../../redux/store';
import {updateApiLoader} from '../../../../redux/reducerSlices/preLogin';
import BetsMatchDetailsView from '../../../../components/BetsMatchDetailsView';
import OptionSelectionView from '../../../../components/OptionSelectionView';
import OpenDisputeView from '../../../../components/OpenDisputeView';
import BetsResultView from '../../../../components/BetsResultView';
import useUpdateEffect from '../../../../components/CustomHooks/useUpdateEffect';
import ScreenNames from '../../../../navigation/screenNames';
import {useBetCreateContract} from '../../../../components/CustomHooks/SmartContract';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {
	resetProfileData,
	updateDeviceToken
} from '../../../../redux/reducerSlices/userInfo';
import {magic} from '../../../../navigation/routes';
import {deleteItemById} from '../../../../redux/reducerSlices/notification';
import TokenConfirmationModel from '../../../../components/TokenConfirmationModel';
import CustomeProgressBar from '../../../../components/CustomeProgressBar';
import ButtonGradientWithRightIcon from '../../../../components/ButtonGradientWithRightIcon';
import {verticalScale} from '../../../../theme';
import {gradientColorAngle} from '../../../../theme/metrics';
import {decimalValue} from '../../../../constants/api';
import {
	getRoundDecimalValue,
	showErrorAlert
} from '../../../../constants/utils/Function';

const BetMakerResultScreen: React.FC<any> = () => {
	const navigation = useNavigation();
	const {params} = useRoute();
	const dispatch = useDispatch();

	const userProfileInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const {bet_id, redirectType, betObj, notification_id} = params;

	const [eventBetData, setEventBetData] = useState();

	const [step, setStep] = useState(0);

	const [isTitle, seIsTitle] = useState('');

	const [isBackButtonDisable, setIsBackButtonDisable] = useState(true);

	const [isSelectedCategory, setIsSelectedCategory] = useState('');

	const [isSelectedSubCategory, setIsSelectedSubCategory] = useState('');

	const [isSelectedLeague, setIsSelectedLeague] = useState('');

	const [isSelectedLeagueType, setIsSelectedLeagueType] = useState(); // 0 for Browse Leagues and 1 for create your own

	const [isSelectBetsType, setIsSelectBetsType] = useState({});

	const [selectedGame, setSelectedGame] = useState();

	const [isSelectChooseSideType, setIsSelectChooseSideType] = useState(null);

	const [isSelectCurrency, setIsSelectCurrency] = useState();
	const [betAmount, setBetAmount] = useState('');
	const [convertCurrency, setConvertCurrency] = useState();

	const [odds, setOdds] = useState();

	const [winningPercentage, setWinningPercentage] = useState(0);
	const [isViewNextBackBtn, setIsViewNextBackBtn] = useState(true); // 0 for not selected and 1 for selected
	const [nextBtnTitle, setNextBtnTitle] = useState(Strings.next);

	const [question, setQuestion] = useState('');

	const [options1, setOptions1] = useState('');
	const [options2, setOptions2] = useState('');

	const [betWinningHelpTitle, setBetWinningHelpTitle] = useState('');
	const [betWinningHelp, setBetWinningHelp] = useState('');

	const [modalNeedHelpVisible, setModalNeedHelpVisible] = useState(false);

	const [apiHashObj, setApiHashObj] = useState(); // get hash from api
	const [betLiquidyAmount, setBetLiquidyAmount] = useState({});

	const [strikeLevel, setStrikeLevel] = useState(0);
	const [totalParts, setTotalParts] = useState(0);

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	//resolveBetResult
	const {
		resolveBetAddress,
		resolveBetResult,
		resolvedBetEvent,
		betLiquidity,
		getForwardGetBetData,
		betStatus,
		isOpenDispute,
		disputeDbethToken,
		getUserStrike,
		strike,
		getTokensPerStrike,
		getPassiveIncome,
		passiveIncomeAmount,
		liquidity,
		claimUserData
	} = useBetCreateContract(false);

	const {hashObj, personalSign} = useBetCreateContract(false);
	const connector = useWalletConnect();
	const [isTokenConfirmationModelVisible, setIsTokenConfirmationModelVisible] =
		useState(false);

	useUpdateEffect(() => {
		getForwardGetBetData(eventBetData?.bet?.bet_id);
		if (
			eventBetData?.resultData?.isWinner === 'draw' ||
			eventBetData?.resultData?.isWinner === 'win'
		) {
			resolvedBetEvent(
				eventBetData?.bet?.bet_id,
				eventBetData?.resultData?.isWinner === 'draw'
			);
		}
	}, [eventBetData]);

	useUpdateEffect(() => {
		if (betLiquidity?.length > 0) {
			setBetLiquidyAmount(betLiquidity?.length && betLiquidity[0]);
		}
	}, [betLiquidity]);

	useUpdateEffect(() => {
		if (isOpenDispute) {
			console.log('isOpenDispute', isOpenDispute);
			getUserStrike(userInfo.user.walletAddress);
		}
	}, [isOpenDispute]);

	useUpdateEffect(() => {
		if (strike) {
			console.log('strike level', strike);
			getTokensPerStrike(strike);
		}
	}, [strike]);

	useEffect(() => {
		if (redirectType === 'ADMIN_RESULT' && userInfo?.user?.isJury) {
			setTotalParts(4);
		} else {
			setTotalParts(5);
		}
		if (
			redirectType === 'RESULT' ||
			redirectType === 'BET_RESULT_CONFIRMATION'
		) {
			// getPassiveIncome();
		}
	}, [redirectType]);

	useEffect(() => {
		if (resolveBetAddress && resolveBetAddress !== 'Error') {
			console.log('resolveBetAddress', resolveBetAddress);
			// setStep(1);
			//dispatch(updateApiLoader({apiLoader: true}));
			// const betClaimAmount =
			//   eventBetData?.resultData?.isWinner === 'win'
			//     ? (parseFloat(betAmount) * parseFloat(odds)).toFixed(decimalValue)
			//     : betAmount;

			// const uploadData = {
			//   bet_id: bet_id,
			//   contractAddress: resolveBetAddress,
			//   bet_amount: betClaimAmount,
			//   bet_amount_usd: (
			//     parseFloat(betClaimAmount) * parseFloat(convertCurrency)
			//   ).toFixed(decimalValue),
			// };

			// claimAmount(uploadData)
			//   .then(res => {
			//     dispatch(updateApiLoader({apiLoader: false}));
			//     // TODO: remove notification
			//     dispatch(deleteItemById(notification_id));
			//     console.log('claimAmount Response : ', JSON.stringify(res));
			//     if (res?.statusCode.toString().includes('200')) {
			//       navigation.goBack();
			//     }
			//   })
			//   .catch(err => {
			//     dispatch(updateApiLoader({apiLoader: false}));
			//     console.log('claimAmount Data Err : ', err);
			//   });
			setTimeout(() => {
				resolvedBetEvent(
					eventBetData?.bet?.bet_id,
					eventBetData?.resultData?.isWinner === 'draw'
				);
			}, 2000);
		}
	}, [resolveBetAddress]);

	useUpdateEffect(() => {
		const tokenName = eventBetData?.bet?.tokentypes?.short_name?.toUpperCase();
		let decimals;
		if (tokenName === 'USDC' || tokenName === 'USDT') {
			decimals = 6;
		} else {
			decimals = 18;
		}
		console.log(
			'betLiquidyAmount:::::::????',
			betLiquidyAmount,
			betLiquidyAmount?.returnValues,
			parseFloat(betLiquidyAmount?.returnValues?.winnerAmount_) / 10e18
		);
		if (eventBetData?.bet?.resultClaim_contract_address) {
			return;
		}

		const tempDifference =
			liquidity?.receivedLiquidityFromAave - liquidity?.totalAvailableLiquidity;
		let passiveIncome = 0;
		if (tempDifference > 0) {
			passiveIncome = tempDifference / 10 ** decimals;
		}

		if (betLiquidyAmount) {
			// const winningAmount =
			//   parseFloat(betLiquidyAmount?.['returnValues']?.winnerAmount_) /
			//   10 ** 18;
			// if (eventBetData?.resultData?.isWinner === 'draw') {
			//   const uploadData = {
			//     bet_id: bet_id,
			//     contractAddress: betLiquidyAmount?.transactionHash,
			//     // bet_winning_amount:
			//     //   parseFloat(betLiquidyAmount?.['returnValues']?.winnerAmount_) /
			//     //   10e18,
			//     // bet_winning_amount_usd: (
			//     //   parseFloat(
			//     //     betLiquidyAmount?.['returnValues']?.winnerAmount_ / 10e18,
			//     //   ) * parseFloat(convertCurrency)
			//     // ).toFixed(decimalValue),
			//     taker_winning_amount:
			//       parseFloat(betLiquidyAmount?.['returnValues']?.winnerAmount_) /
			//       10e18,
			//     taker_winning_amount_usd:
			//       parseFloat(
			//         betLiquidyAmount?.['returnValues']?.winnerAmount_ / 10e18,
			//       ) * parseFloat(convertCurrency),
			//     maker_winning_amount:
			//       parseFloat(betLiquidyAmount?.['returnValues']?.winnerAmount_) /
			//       10e18,
			//     maker_winning_amount_usd:
			//       parseFloat(
			//         betLiquidyAmount?.['returnValues']?.winnerAmount_ / 10e18,
			//       ) * parseFloat(convertCurrency),
			//   };

			//   claimAmount(uploadData)
			//     .then(res => {
			//       dispatch(updateApiLoader({apiLoader: false}));
			//       console.log('claimAmount Response : ', JSON.stringify(res));
			//       //Alert.alert('Claimamount api success', JSON.stringify(res));
			//       dispatch(deleteItemById(notification_id));
			//       if (res?.statusCode.toString().includes('200')) {
			//         navigation.goBack();
			//       }
			//     })
			//     .catch(err => {
			//       dispatch(updateApiLoader({apiLoader: false}));
			//       Alert.alert('Claimamount api error', JSON.stringify(err));
			//       console.log('claimAmount Data Err : ', err);
			//     });
			// } else {
			//   const uploadData = {
			//     bet_id: bet_id,
			//     contractAddress: betLiquidyAmount?.transactionHash,
			//     bet_winning_amount: winningAmount,
			//     bet_winning_amount_usd: (
			//       winningAmount * parseFloat(convertCurrency)
			//     ).toFixed(decimalValue),
			//   };

			//   claimAmount(uploadData)
			//     .then(res => {
			//       dispatch(updateApiLoader({apiLoader: false}));
			//       console.log('claimAmount Response : ', JSON.stringify(res));
			//       dispatch(deleteItemById(notification_id));
			//       //Alert.alert('Claimamount api success', JSON.stringify(res));
			//       // if (res?.statusCode.toString().includes('200')) {
			//       //   navigation.goBack();
			//       // }
			//     })
			//     .catch(err => {
			//       dispatch(updateApiLoader({apiLoader: false}));
			//       Alert.alert('Claimamount api error', JSON.stringify(err));
			//       console.log('claimAmount Data Err : ', err);
			//     });
			// }
			let uploadData = {};
			if (
				eventBetData?.resultData?.isWinner === 'draw' ||
				eventBetData?.resultData?.isWinner === 'void' ||
				eventBetData?.resultData?.isWinner === 'Void'
			) {
				const betTakerWinningAmount =
					parseFloat(betLiquidyAmount?.returnValues?.betTakerAmount_) /
					10 ** decimals;

				const betMakerWinningAmount =
					parseFloat(betLiquidyAmount?.returnValues?.betMakerAmount_) /
					10 ** decimals;
				uploadData = {
					bet_id: bet_id,
					contractAddress: betLiquidyAmount?.transactionHash,
					// bet_winning_amount:
					//   parseFloat(betLiquidyAmount?.['returnValues']?.winnerAmount_) /
					//   10e18,
					// bet_winning_amount_usd: (
					//   parseFloat(
					//     betLiquidyAmount?.['returnValues']?.winnerAmount_ / 10e18,
					//   ) * parseFloat(convertCurrency)
					// ).toFixed(decimalValue),
					taker_winning_amount: betTakerWinningAmount,
					taker_winning_amount_usd:
						parseFloat(betTakerWinningAmount) * parseFloat(convertCurrency),
					maker_winning_amount: betMakerWinningAmount,
					maker_winning_amount_usd:
						parseFloat(betMakerWinningAmount) * parseFloat(convertCurrency),
					match_cancelled: redirectType === 'MATCH_CANCELLED',
					passive_income: passiveIncome * (passiveIncomeAmount / 100),
					referral: claimUserData
				};
			} else {
				const winningAmount =
					parseFloat(betLiquidyAmount?.returnValues?.winnerAmount_) /
					10 ** decimals;
				uploadData = {
					bet_id: bet_id,
					contractAddress: betLiquidyAmount?.transactionHash,
					bet_winning_amount: winningAmount,
					bet_winning_amount_usd: (
						winningAmount * parseFloat(convertCurrency)
					).toFixed(decimalValue),
					passive_income: passiveIncome * (passiveIncomeAmount / 100),
					referral: claimUserData
				};
			}

			console.log('uploadData?????>><', uploadData, redirectType);
			//TODO: call cancle bet api here
			claimAmount(uploadData)
				.then(res => {
					dispatch(updateApiLoader({apiLoader: false}));
					console.log('claimAmount Response : ', JSON.stringify(res));
					//Alert.alert('Claimamount api success', JSON.stringify(res));
					if (res?.statusCode.toString().includes('200')) {
						//getBetClaimDetails(eventBetData?.bet?.bet_id);
						navigation.goBack();
					}
				})
				.catch(err => {
					dispatch(updateApiLoader({apiLoader: false}));
					showErrorAlert('Claimamount api error', JSON.stringify(err));
					console.log('claimAmount Data Err : ', err);
				});
		}
	}, [betLiquidyAmount]);

	const getUserAncestorData = () => {
		dispatch(
			updateApiLoader({
				apiLoader: true,
				showAlertWithText:
					Strings.just_a_few_more_seconds_your_funds_are_being_transferred_to_your_wallet
			})
		);
		getUserAncestor()
			.then(res => {
				console.log('getUserAncestorData Response >>> ', JSON.stringify(res));
				// dispatch(updateApiLoader({apiLoader: false}));
				handleClaimWinningAmount(res?.data);
			})
			.catch(err => {
				console.log('getTokenTypeData Data Err >>> ', JSON.stringify(err));
				dispatch(updateApiLoader({apiLoader: false}));
			});
	};

	useUpdateEffect(() => {
		console.log('eventBetData???????', JSON.stringify(eventBetData));
		if (eventBetData?.bet?.users?._id === userProfileInfo?.user?._id) {
			setOdds(eventBetData?.bet?.odds);
			setBetAmount(eventBetData?.bet?.bet_amount);
		} else {
			setOdds(eventBetData?.bet?.opposite_odds);
			setBetAmount(eventBetData?.bet?.bet_opposite_amount);

			// setBetAmount(
			//   parseFloat(eventBetData?.bet?.bet_amount) *
			//     parseFloat(eventBetData?.bet?.odds) -
			//     parseFloat(eventBetData?.bet?.bet_amount) +
			//     '',
			// );
		}

		setIsSelectCurrency(eventBetData?.bet?.tokentypes);
		setSelectedGame(eventBetData?.bet?.match);
		setIsSelectedLeagueType(eventBetData?.bet?.bet_type);
		setIsSelectedCategory(eventBetData?.bet?.categories?.name);
		setIsSelectedSubCategory(eventBetData?.bet?.subcategories?.name ?? '');
		setIsSelectedLeague(eventBetData?.bet?.match?.leagueName ?? '');
		setIsSelectBetsType(eventBetData?.bet?.bettypes);

		if (
			redirectType === 'RESULT' ||
			redirectType === 'BET_RESULT_CONFIRMATION' ||
			redirectType === 'MATCH_CANCELLED'
		) {
			// console.log('====================================');
			// console.log(redirectType === 'RESULT');
			// console.log(
			// 	eventBetData?.bet?.users?._id === userProfileInfo?.user?._id
			// 		? eventBetData?.bet?.bet_creator_side_option
			// 		: eventBetData?.bet?.bet_opposite_side_option
			// );

			// console.log('====================================');
			setIsSelectChooseSideType(
				eventBetData?.bet?.users?._id === userProfileInfo?.user?._id
					? eventBetData?.bet?.bet_creator_side_option
					: eventBetData?.bet?.bet_opposite_side_option
			);
		} else if (
			redirectType === 'BET_RESULT_REVIEW' ||
			redirectType === 'DISPUTE_EVIDENCE' ||
			redirectType === 'RESULT_VERIFICATION_BETMAKER'
		) {
			setIsSelectChooseSideType(eventBetData?.resultData?.winnerOption);
		}

		setQuestion(eventBetData?.bet.betQuestion);
		setOptions1(eventBetData?.bet.betOptionOne);
		setOptions2(eventBetData?.bet.betOptionTwo);

		setStrikeLevel(
			eventBetData?.bet?.users?._id === userProfileInfo?.user?._id
				? eventBetData?.bet.bet_maker_strike_level
				: eventBetData?.bet.bet_taker_strike_level
		);

		setConvertCurrency(eventBetData?.bet?.tokentypes?.tokenPriceUsd ?? 1);

		if (redirectType === 'RESULT' || redirectType === 'ADMIN_RESULT') {
			seIsTitle(Strings.this_bet_end);
			setStep(1);
			setIsViewNextBackBtn(false);
			setIsBackButtonDisable(false);

			if (eventBetData?.resultData?.isWinner === 'win') {
				setNextBtnTitle(Strings.claim_winning);
			} else if (eventBetData?.resultData?.isWinner === 'loss') {
				setNextBtnTitle(Strings.continue_to_feed);
			} else if (eventBetData?.resultData?.isWinner === 'draw') {
				setNextBtnTitle(Strings.claim_bet_funds);
			}
		} else if (redirectType === 'MATCH_CANCELLED') {
			seIsTitle(Strings.match_Has_Been_Cancelled);
			setStep(1);
			setIsViewNextBackBtn(false);
			setIsBackButtonDisable(false);
			setNextBtnTitle(Strings.claim_bet_funds);
		} else if (redirectType === 'CUSTOM_BET_RESULT') {
			seIsTitle(Strings.bet_end_verify_result);
			setStep(2);
		} else if (
			redirectType === 'CUSTOM_BET_RESULT_TAKER' ||
			redirectType === 'RESULT_VERIFICATION_BETMAKER'
		) {
			seIsTitle(Strings.bet_end_verify_result);
			setStep(4);
			if (redirectType === 'RESULT_VERIFICATION_BETMAKER') {
				seIsTitle(Strings.bet_end_provide_evidence);
				setIsBackButtonDisable(false);
			}
		} else if (redirectType === 'BET_RESULT_REVIEW') {
			setIsViewNextBackBtn(false);
			seIsTitle(Strings.this_bet_end);
			setStep(3);
			setNextBtnTitle(Strings.accept_result);
			setIsBackButtonDisable(false);
			getForwardGetBetData(eventBetData?.bet?.bet_id);
		} else if (redirectType === 'BET_RESULT_CONFIRMATION') {
			seIsTitle(Strings.accepted_result);
			setStep(1);
			setIsViewNextBackBtn(false);
			setIsBackButtonDisable(false);

			if (eventBetData?.resultData?.isWinner === 'win') {
				setNextBtnTitle(Strings.claim_winning);
			} else if (eventBetData?.resultData?.isWinner === 'loss') {
				setNextBtnTitle(Strings.continue_to_feed);
			} else if (eventBetData?.resultData?.isWinner === 'draw') {
				setNextBtnTitle(Strings.claim_bet_funds);
			}
		} else if (redirectType === 'DISPUTE_EVIDENCE') {
			setIsViewNextBackBtn(false);
			seIsTitle(Strings.provide_evidence);
			setStep(3);
			setNextBtnTitle(Strings.next);
			setIsBackButtonDisable(false);
		}
	}, [eventBetData]);

	const backAction = () => {
		navigation.goBack();
		return true;
	};

	useEffect(() => {
		getUserBetResultData();
		BackHandler.addEventListener('hardwareBackPress', backAction);

		return () =>
			BackHandler.removeEventListener('hardwareBackPress', backAction);
	}, []);

	const getUserBetResultData = () => {
		dispatch(updateApiLoader({apiLoader: true}));
		const uploadData = {
			bet_id: bet_id
		};
		getUserBetResult(uploadData)
			.then(res => {
				// console.log('getUserBetResult????????????', res);

				dispatch(updateApiLoader({apiLoader: false}));
				//console.log('getUserBet Response : ', res);
				setApiHashObj(res?.data?.HashSignatureObject);
				setEventBetData(res.data);
				setWinningPercentage(res?.data.winningPercentage);
				setBetWinningHelpTitle(res?.data.tokenContent.title);
				setBetWinningHelp(res?.data.tokenContent.content);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getUserBet Data Err : ', err);
			});
	};

	const signDispute = async () => {
		if (
			userInfo?.user?.socialLoginType?.toLowerCase() === 'metamask' &&
			!connector.connected
		) {
			showErrorAlert('', Strings.txt_session_expire_msg);
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
		personalSign(bet_id);
	};

	useUpdateEffect(() => {
		if (hashObj?.error) {
			showErrorAlert(Strings.txt_error, Strings.txt_check_internet_connection);
		} else {
			if (step === 3) {
				addCustomBetResultData('accepted');
			} else {
				addCustomBetResultData();
			}
		}
	}, [hashObj]);

	const addCustomBetResultData = (betResult: string) => {
		dispatch(updateApiLoader({apiLoader: true}));
		let uploadData = {};

		if (betResult === 'accepted') {
			uploadData = {
				hash: hashObj?.hash,
				signature: hashObj?.signature,
				bet_id: bet_id,
				isAcceptable: true
			};
		} else {
			uploadData = {
				hash: hashObj?.hash,
				signature: hashObj?.signature,
				bet_id: bet_id,
				winnerOption: isSelectChooseSideType
			};
		}

		addCustomBetResult(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('addCustomBetResultData Response : ', JSON.stringify(res));
				// TODO: remove notification
				setApiHashObj(res?.data?.HashSignatureObject);
				dispatch(deleteItemById(notification_id));
				if (betResult === 'accepted') {
					seIsTitle(
						Strings.well_done_result_has_been_verified.replace(
							'%s',
							userInfo.user.userName
						)
					);
					setStep(1);
					setIsViewNextBackBtn(false);
					setIsBackButtonDisable(false);

					if (eventBetData?.resultData?.isWinner === 'win') {
						setNextBtnTitle(Strings.claim_winning);
					} else if (eventBetData?.resultData?.isWinner === 'loss') {
						setNextBtnTitle(Strings.continue_to_feed);
					} else if (eventBetData?.resultData?.isWinner === 'draw') {
						setNextBtnTitle(Strings.claim_bet_funds);
					}
				} else {
					setIsViewNextBackBtn(false);
					setNextBtnTitle(Strings.continue_to_feed);
					setStep(5);
				}
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('addCustomBetResultData Data Err : ', err);
			});
	};

	const handleRedirectUser = () => {
		navigation.navigate(ScreenNames.OtherUserProfileScreen, {
			userId:
				eventBetData?.bet?.users?._id === userProfileInfo?.user?._id
					? eventBetData?.betTakerData?._id
					: eventBetData?.bet?.users?._id
		});
	};

	const betsMatchDetails = () => {
		return (
			<BetsMatchDetailsView
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
						? eventBetData?.bet?.mainmarkets?.market_name +
						  (eventBetData?.bet?.market_sub_name
								? ' : ' + eventBetData?.bet?.market_sub_name
								: '')
						: question
				}
				isSelectedLeagueType={isSelectedLeagueType}
				selectedGameData={selectedGame}
				betData={eventBetData}
				handleRedirectUser={handleRedirectUser}
			/>
		);
	};

	const showViews = () => {
		console.log('showViews ', step);

		switch (step) {
			case 1:
				return (
					<KeyboardAwareScrollView
						bounces={false}
						showsVerticalScrollIndicator={false}>
						<Text style={styles.titleStyle}>{isTitle}</Text>
						{betsMatchDetails()}
						<BetsResultView
							localTeamName={options1?.trim()}
							// visitorTeamName={
							//   isSelectedLeagueType === 0
							//     ? selectedGame?.visitorTeamName
							//     : options2?.trim()
							// }
							visitorTeamName={
								eventBetData?.bet?.user_id === userInfo?.user?._id
									? eventBetData?.bet?.bet_creator_side_option
									: eventBetData?.bet?.bet_opposite_side_option
							}
							isSelectCurrency={isSelectCurrency}
							betAmount={betAmount}
							betUsdAmount={getRoundDecimalValue(
								parseFloat(betAmount) * parseFloat(convertCurrency)
							)}
							betOdds={odds}
							paysBetAmount={getRoundDecimalValue(
								parseFloat(betAmount) * parseFloat(odds)
							)}
							paysBetUsdAmount={getRoundDecimalValue(
								parseFloat(parseFloat(betAmount) * parseFloat(odds)) *
									parseFloat(convertCurrency)
							)}
							winningPercentage={winningPercentage + ''}
							selectMySideType={isSelectChooseSideType}
							onPressNeedHelp={() => {
								setModalNeedHelpVisible(true);
							}}
							oppositeBetAmount={
								eventBetData?.resultData?.isWinner === 'win'
									? getRoundDecimalValue(
											parseFloat(eventBetData?.bet?.bet_amount) +
												parseFloat(eventBetData?.bet?.bet_opposite_amount)
									  )
									: betAmount
							}
							oppositeBetUsdAmount={
								eventBetData?.resultData?.isWinner === 'win'
									? getRoundDecimalValue(
											parseFloat(parseFloat(betAmount) * parseFloat(odds)) *
												parseFloat(convertCurrency)
									  )
									: getRoundDecimalValue(
											parseFloat(betAmount) * parseFloat(convertCurrency)
									  )
							}
							isShowFee={
								eventBetData?.resultData?.isWinner === 'win' ? true : false
							}
							isShowLost={
								eventBetData?.resultData?.isWinner === 'draw' ? false : true
							}
							bottomTitle={
								eventBetData?.resultData?.isWinner === 'win'
									? Strings.you_won
									: Strings.you_lost
							}
						/>
						{redirectType === 'ADMIN_RESULT' && strikeLevel !== 0 && (
							<View
								style={{
									marginBottom: verticalScale(16),
									marginTop: verticalScale(8)
								}}>
								<ButtonGradientWithRightIcon
									colorArray={defaultTheme.ternaryGradientColor}
									angle={gradientColorAngle}
									rightIcon={icons.info}
									styleOfRightIcon={{
										height: 35,
										width: 35
									}}
									style={{
										// for ios
										shadowColor: 'rgba(0,0,0,0.5)',
										shadowOffset: {width: -2, height: 4},
										shadowOpacity: 0.4,
										shadowRadius: 3,
										// for android
										elevation: 20
									}}
									onChangeText={(text: string) => {}}
									onSubmitText={(text: any) => {}}
									textValue={strikeLevel + ' ' + Strings.STRIKE}
									maxLength={10}
									onPressInfoIcon={() => {
										setModalNeedHelpVisible(true);
									}}
									editable={false}
									btnDisabled={true}
								/>
								<Text
									style={[
										styles.resultStrikeText,
										{textTransform: 'uppercase'}
									]}>
									{Strings.srike
										.replace('%d', strikeLevel)
										.replace('%f', totalParts)}
								</Text>
								<CustomeProgressBar
									progress={parseFloat(strikeLevel / totalParts)}
									totalParts={totalParts}
									startColor={colors.progressStart}
									endColor={colors.purple}
								/>
							</View>
						)}
					</KeyboardAwareScrollView>
				);
			case 2:
				return (
					<KeyboardAwareScrollView
						bounces={false}
						showsVerticalScrollIndicator={false}>
						<Text style={styles.titleStyle}>{isTitle}</Text>
						{betsMatchDetails()}
						<OptionSelectionView
							color1Array={
								isSelectChooseSideType === options1
									? defaultTheme.primaryGradientColor
									: defaultTheme.ternaryGradientColor
							}
							color2Array={
								isSelectChooseSideType === options2
									? defaultTheme.primaryGradientColor
									: defaultTheme.ternaryGradientColor
							}
							color3Array={
								isSelectChooseSideType === Strings.void
									? defaultTheme.primaryGradientColor
									: defaultTheme.ternaryGradientColor
							}
							popupTitle={Strings.Select_the_final_result}
							button1Title={options1.trim()}
							button2Title={options2.trim()}
							button3Title={Strings.void}
							isShowSecondButton={true}
							isShowThirdButton={true}
							onButton1Press={() => {
								setIsSelectChooseSideType(options1);
								setIsBackButtonDisable(false);
							}}
							onButton2Press={() => {
								setIsSelectChooseSideType(options2);
								setIsBackButtonDisable(false);
							}}
							onButton3Press={() => {
								setIsSelectChooseSideType(Strings.void);
								setIsBackButtonDisable(false);
							}}
							textType={'capitalize'}
						/>
					</KeyboardAwareScrollView>
				);
			case 3:
				return (
					<KeyboardAwareScrollView
						bounces={false}
						showsVerticalScrollIndicator={false}>
						<Text style={styles.titleStyle}>{isTitle}</Text>
						{betsMatchDetails()}
						<OptionSelectionView
							color1Array={defaultTheme.primaryGradientColor}
							popupTitle={Strings.results}
							button1Title={
								isSelectedLeagueType === 0
									? eventBetData?.bet?.bet_opposite_side_option
									: isSelectChooseSideType
							}
							onButton1Press={() => {}}
							textType={'capitalize'}
						/>

						{redirectType === 'BET_RESULT_REVIEW' && (
							<OpenDisputeView
								onPress={() => {
									console.log(
										'onPress123?????????????',
										JSON.stringify(eventBetData)
									);
									if (isOpenDispute) {
										navigation.navigate(ScreenNames.OpenDisputeScreen, {
											bet_id: bet_id,
											amount: disputeDbethToken,
											contractAddress: '0x',
											bet_contract_address: eventBetData?.bet?.bet_id,
											isAlreadyPaid: true
										});
									} else {
										navigation.navigate(ScreenNames.OpenDisputeInfoScreen, {
											bet_id: bet_id,
											redirectType: redirectType,
											usdPrice: convertCurrency,
											bet_contract_address: eventBetData?.bet?.bet_id
										});
									}
								}}
							/>
						)}
					</KeyboardAwareScrollView>
				);
			case 4:
				return (
					<KeyboardAwareScrollView
						bounces={false}
						showsVerticalScrollIndicator={false}>
						<Text style={styles.titleStyle}>{isTitle}</Text>
						{betsMatchDetails()}

						{redirectType === 'RESULT_VERIFICATION_BETMAKER' ? (
							<OptionSelectionView
								color1Array={defaultTheme.primaryGradientColor}
								popupTitle={Strings.results}
								button1Title={isSelectChooseSideType}
								onButton1Press={() => {}}
								textType={'capitalize'}
							/>
						) : (
							<OptionSelectionView
								color1Array={
									isSelectChooseSideType === options1
										? defaultTheme.primaryGradientColor
										: defaultTheme.ternaryGradientColor
								}
								color2Array={
									isSelectChooseSideType === options2
										? defaultTheme.primaryGradientColor
										: defaultTheme.ternaryGradientColor
								}
								color3Array={
									isSelectChooseSideType === Strings.void
										? defaultTheme.primaryGradientColor
										: defaultTheme.ternaryGradientColor
								}
								popupTitle={Strings.Select_the_final_result}
								button1Title={options1.trim()}
								button2Title={options2.trim()}
								button3Title={Strings.void}
								isShowSecondButton={true}
								isShowThirdButton={true}
								onButton1Press={() => {
									setIsSelectChooseSideType(options1);
									setIsBackButtonDisable(false);
								}}
								onButton2Press={() => {
									setIsSelectChooseSideType(options2);
									setIsBackButtonDisable(false);
								}}
								onButton3Press={() => {
									setIsSelectChooseSideType(Strings.void);
									setIsBackButtonDisable(false);
								}}
								textType={'capitalize'}
							/>
						)}
					</KeyboardAwareScrollView>
				);
			case 5:
				return (
					<View style={styles.viewDoneStyle}>
						<Text style={styles.titleDoneStyle}>
							{Strings.well_done_result_has_been_verified.replace(
								'%s',
								userInfo.user.userName
							)}
						</Text>
					</View>
				);
		}
	};
	//if bet type 0 then pass hash array null, ISCUSTOMIZED_ = false and maker taker signature as null
	const handleClaimWinningAmount = (userData: any) => {
		let bet_type = betObj?.bet_type;
		let result =
			eventBetData?.resultData?.isWinner === 'win'
				? betObj?.user_id === userInfo.user?._id
					? betObj?.bet_creator_side_option_index + 1
					: betObj?.bet_opposite_side_option_index + 1
				: 0;
		//0
		console.log('result??????????', bet_type);
		if (bet_type == '0') {
			resolveBetResult(
				betObj?.bet_id,
				result,
				['0x0000000000000000000000000000000000000000000000000000000000000000'],
				'0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
				'0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
				userData?.users,
				userData?.rewardPercentage
			);
		} else {
			resolveBetResult(
				betObj?.bet_id,
				result,
				apiHashObj?.hash,
				apiHashObj?.makerSignature,
				apiHashObj?.takerSignature,
				userData?.users,
				userData?.rewardPercentage
			);
		}

		//resolveBetResult()
		// dispatch(updateApiLoader({apiLoader: true}));
	};

	const shouldShowClaimButton = () => {
		// const isMaker = eventBetData?.bet?.user_id === userInfo.user?._id;
		// if (isMaker) {
		//   if (eventBetData?.bet?.bet_creator_contract_address) {
		//     return false;
		//   } else {
		//     return true;
		//   }
		// } else {
		//   if (eventBetData?.bet?.bet_opposite_contract_address) {
		//     return false;
		//   } else {
		//     return true;
		//   }
		// }
		// console.log(
		//   "betLiquidyAmount?.['returnValues']?.winnerAmount_???",
		//   betLiquidyAmount?.['returnValues']?.winnerAmount_,
		// );
		// const flag = betLiquidyAmount?.['returnValues']?.winnerAmount_ > 0;
		return betStatus;
	};

	const renderClaimButton = () => {
		if (step === 5) {
			return (
				<ButtonGradient
					onPress={() => {
						// navigateReset('FeedsRouter');
						navigation.dispatch(StackActions.popToTop());
					}}
					colorArray={defaultTheme.secondaryGradientColor}
					angle={gradientColorAngle}
					buttonTextcolor={colors.white}
					buttonText={nextBtnTitle}
					style={
						!isBackButtonDisable
							? styles.continueFeedButton
							: styles.continueFeedButtonOpacity
					}
					btnDisabled={isBackButtonDisable}
				/>
			);
		} else {
			return (
				((eventBetData?.resultData?.isWinner === 'win' &&
					shouldShowClaimButton()) ||
					(eventBetData?.resultData?.isWinner === 'draw' &&
						shouldShowClaimButton()) ||
					eventBetData?.resultData?.isWinner === 'loss') && (
					<ButtonGradient
						onPress={() => {
							if (step === 1) {
								setIsViewNextBackBtn(false);
								if (eventBetData?.resultData?.isWinner === 'win') {
									getUserAncestorData();
								} else if (eventBetData?.resultData?.isWinner === 'loss') {
									// navigateReset('FeedsRouter');
									navigation.dispatch(StackActions.popToTop());
								} else if (
									eventBetData?.resultData?.isWinner === 'draw' ||
									eventBetData?.resultData?.isWinner === 'Void'
								) {
									getUserAncestorData();
								}
							} else if (step === 3) {
								if (redirectType === 'DISPUTE_EVIDENCE') {
									console.log(
										'dfghksg>???????????',
										JSON.stringify(eventBetData)
									);
									navigation.navigate(ScreenNames.OpenDisputeScreen, {
										bet_id: bet_id,
										bet_contract_address: eventBetData?.bet?.bet_id
									});
								} else {
									setIsTokenConfirmationModelVisible(true);
								}
							} else if (step === 5) {
								// navigateReset('FeedsRouter');
								navigation.dispatch(StackActions.popToTop());
							}
						}}
						colorArray={defaultTheme.secondaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						buttonText={nextBtnTitle}
						style={
							!isBackButtonDisable
								? styles.continueFeedButton
								: styles.continueFeedButtonOpacity
						}
						btnDisabled={isBackButtonDisable}
					/>
				)
			);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					onLeftIconPath={icons.back}
					name={Strings.bet_result}
				/>

				<View style={styles.viewContain}>{showViews()}</View>

				{step !== 0 &&
					(isViewNextBackBtn ? (
						<View style={styles.viewBackButton}>
							<ButtonGradient
								onPress={() => {
									navigation.goBack();
								}}
								colorArray={defaultTheme.ternaryGradientColor}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								buttonText={Strings.back}
								style={styles.backButton}
							/>
							<ButtonGradient
								onPress={() => {
									if (step === 2) {
										setIsTokenConfirmationModelVisible(true);
									} else if (step === 4) {
										console.log(
											'onPress123?????????????',
											JSON.stringify(eventBetData)
										);
										navigation.navigate(ScreenNames.OpenDisputeScreen, {
											bet_id: bet_id,
											winnerOption: isSelectChooseSideType,
											bet_contract_address: eventBetData?.bet?.bet_id,
											isOpenDispute: true
										});
									}
								}}
								colorArray={defaultTheme.secondaryGradientColor}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								buttonText={nextBtnTitle}
								style={styles.nextButton}
								btnDisabled={isBackButtonDisable}
							/>
						</View>
					) : (
						renderClaimButton()
					))}

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
			</View>
			<TokenConfirmationModel
				title={Strings.signature_Request}
				infoDescription={Strings.signature_request_message}
				isTokenConfirmationModelVisible={isTokenConfirmationModelVisible}
				tokenPrice={betObj?.bet_id} // tokenPrice
				handleYesButtonClick={() => {
					// contract calling
					setIsTokenConfirmationModelVisible(false);
					setTimeout(() => {
						signDispute();
					}, 1000);
				}}
				handleNoButtonClick={() => {
					setIsTokenConfirmationModelVisible(false);
				}}
			/>
		</SafeAreaView>
	);
};

export default BetMakerResultScreen;
