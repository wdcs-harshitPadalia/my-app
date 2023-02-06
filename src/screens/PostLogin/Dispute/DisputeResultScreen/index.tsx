import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import icons from '../../../../assets/icon';
import ButtonGradient from '../../../../components/ButtonGradient';
import ButtonGradientWithRightIcon from '../../../../components/ButtonGradientWithRightIcon';
import CustomeProgressBar from '../../../../components/CustomeProgressBar';
import {useBetCreateContract} from '../../../../components/CustomHooks/SmartContract';
import useUpdateEffect from '../../../../components/CustomHooks/useUpdateEffect';
import HeaderComponent from '../../../../components/HeaderComponent';
import InformationPopUpView from '../../../../components/InformationPopUpView';
import ResultCaseView from '../../../../components/ResultCaseView';
import ResultHeaderTextView from '../../../../components/ResultHeaderTextView';
import {decimalValue, nullAddress} from '../../../../constants/api';
import Strings from '../../../../constants/strings';
import {
	getMetamaskBalance,
	getRoundDecimalValue,
	showErrorAlert
} from '../../../../constants/utils/Function';
import ScreenNames from '../../../../navigation/screenNames';
import {
	claimAmount,
	getConvertCurrencyData,
	getDisputeResult,
	getUserAncestor
} from '../../../../redux/apiHandler/apiActions';
import {updateApiLoader} from '../../../../redux/reducerSlices/preLogin';
import {RootState} from '../../../../redux/store';
import {verticalScale} from '../../../../theme';
import colors from '../../../../theme/colors';
import {defaultTheme} from '../../../../theme/defaultTheme';
import {gradientColorAngle, horizontalScale} from '../../../../theme/metrics';
import {styles} from './style';

const DisputeResultScreen: React.FC<any> = props => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const {params} = useRoute();
	const {betId, redirectType, betObj} = params;

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const connector = useWalletConnect();

	const [modalNeedHelpVisible, setModalNeedHelpVisible] = useState(false);
	const [betWinningHelpTitle] = useState('betWinningHelpTitle');
	const [betWinningHelp] = useState('betWinningHelp');

	const [resultData, setResultData] = useState();
	const [resultType, setResultType] = useState('');
	const [caseAValue, setCaseAValue] = useState(0);
	const [caseBValue, setCaseBValue] = useState(0);
	const [caseCValue, setCaseCValue] = useState(0);
	const [betWinningAmount, setBetWinningAmount] = useState(0);
	const [myBalance, setMyBalance] = useState('0');
	const [betUsdAmount, setBetUsdAmount] = useState('0');
	const [strikeLevel, setStrikeLevel] = useState(0);
	const [totalParts, setTotalParts] = useState(0);
	const [tokenType, setTokenType] = useState('');
	const [convertCurrency, setConvertCurrency] = useState();
	const [betLiquidyAmount, setBetLiquidyAmount] = useState({});

	const {
		resolveBetAddress,
		resolveBetResult,
		getBalanceFromContract,
		tokenBalance,
		resolvedBetEvent,
		betLiquidity,
		getForwardGetBetData,
		betStatus,
		getPassiveIncome,
		passiveIncomeAmount,
		liquidity,
		claimUserData
	} = useBetCreateContract(false);

	let isResultViewHide;

	if (
		redirectType === 'ADMIN_RESULT' ||
		redirectType === 'ADMIN_RESULT_DISPUTE'
	) {
		isResultViewHide = true;
	} else {
		isResultViewHide = false;
	}

	useEffect(() => {
		getForwardGetBetData(betObj?.bet_id);

		if (resultData?.isWinner === 'draw' || resultData?.isWinner === 'win') {
			resolvedBetEvent(betObj?.bet_id, resultData?.isWinner === 'draw');
		}
	}, [betObj, resultData]);

	useUpdateEffect(() => {
		if (betLiquidity?.length > 0) {
			setBetLiquidyAmount(betLiquidity?.length && betLiquidity[0]);
		}
	}, [betLiquidity]);

	useEffect(() => {
		if (
			redirectType === 'DISPUTE_RESULT' ||
			redirectType === 'ADMIN_RESULT_DISPUTE'
		) {
			setTotalParts(5);
		} else {
			setTotalParts(4);
		}
		getPassiveIncome();
	}, [redirectType]);

	useUpdateEffect(() => {
		const tokenName = resultData?.tokenType?.short_name?.toUpperCase();
		let decimals;
		if (tokenName === 'USDC' || tokenName === 'USDT') {
			decimals = 6;
		} else {
			decimals = 18;
		}
		const winningAmount =
			parseFloat(betLiquidyAmount?.returnValues?.winnerAmount_) /
			10 ** decimals;
		console.log(
			'betLiquidyAmount:::::::????',
			betLiquidyAmount,
			betLiquidyAmount?.returnValues,
			parseFloat(betLiquidyAmount?.returnValues?.winnerAmount_) / 10e18
		);
		if (betObj?.resultClaim_contract_address) {
			return;
		}

		const tempDifference =
			liquidity?.receivedLiquidityFromAave - liquidity?.totalAvailableLiquidity;
		let passiveIncome = 0;
		if (tempDifference > 0) {
			passiveIncome = tempDifference / 10 ** decimals;
		}

		if (betLiquidyAmount) {
			// if (resultData?.isWinner === 'draw') {
			//   const uploadData = {
			//     bet_id: betId,
			//     contractAddress: betLiquidyAmount?.transactionHash,
			//     // bet_winning_amount:
			//     //   parseFloat(betLiquidyAmount?.['returnValues']?.winnerAmount_) /
			//     //   10e18,
			//     // bet_winning_amount_usd: (
			//     //   parseFloat(
			//     //     betLiquidyAmount?.['returnValues']?.winnerAmount_ / 10e18,
			//     //   ) * parseFloat(convertCurrency)
			//     // ).toFixed(decimalValue),
			//     Taker_winning_amount:
			//       parseFloat(betLiquidyAmount?.['returnValues']?.winnerAmount_) /
			//       10e18,
			//     maker_winning_amount:
			//       parseFloat(
			//         betLiquidyAmount?.['returnValues']?.winnerAmount_ / 10e18,
			//       ) * parseFloat(convertCurrency),
			//   };

			//   claimAmount(uploadData)
			//     .then(res => {
			//       dispatch(updateApiLoader({apiLoader: false}));
			//       console.log('claimAmount Response : ', JSON.stringify(res));
			//       dispatch(deleteItemById(notification_id));
			//       //Alert.alert('Claimamount api success', JSON.stringify(res));
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
			//     bet_id: betId,
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
			if (betLiquidyAmount) {
				if (resultData?.isWinner === 'draw') {
					const betTakerWinningAmount =
						parseFloat(betLiquidyAmount?.returnValues?.betTakerAmount_) /
						10 ** decimals;

					const betMakerWinningAmount =
						parseFloat(betLiquidyAmount?.returnValues?.betMakerAmount_) /
						10 ** decimals;

					uploadData = {
						bet_id: betId,
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
						passive_income: passiveIncome * (passiveIncomeAmount / 100),
						referral: claimUserData
					};
				} else {
					const winningAmount =
						parseFloat(betLiquidyAmount?.returnValues?.winnerAmount_) /
						10 ** decimals;
					uploadData = {
						bet_id: betId,
						contractAddress: betLiquidyAmount?.transactionHash,
						bet_winning_amount: winningAmount,
						bet_winning_amount_usd: (
							winningAmount * parseFloat(convertCurrency)
						).toFixed(decimalValue),
						passive_income: passiveIncome * (passiveIncomeAmount / 100),
						referral: claimUserData
					};
				}

				console.log('uploadData?????>><', uploadData);

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
		}
	}, [betLiquidyAmount]);

	useEffect(() => {
		getDisputeResultData();
	}, [betId]);

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

	const getDisputeResultData = () => {
		dispatch(updateApiLoader({apiLoader: true}));
		getDisputeResult({bet_id: betId})
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));

				const dataObj = res?.data;
				console.log('dataObj???????', JSON.stringify(dataObj));
				setResultData(dataObj);
				setResultType(dataObj.isWinner);

				setCaseAValue(
					redirectType === 'DISPUTE_RESULT' ||
						redirectType === 'ADMIN_RESULT_DISPUTE'
						? dataObj.inYourFavour
						: dataObj.caseAvotes
				);
				setCaseBValue(
					redirectType === 'DISPUTE_RESULT' ||
						redirectType === 'ADMIN_RESULT_DISPUTE'
						? dataObj.againstYou
						: dataObj.caseBvotes
				);
				setCaseCValue(
					redirectType === 'DISPUTE_RESULT' ||
						redirectType === 'ADMIN_RESULT_DISPUTE'
						? dataObj.voidVotes
						: dataObj.caseVoidvotes
				);

				setStrikeLevel(dataObj?.strikeLevel);

				setBetWinningAmount(dataObj?.betWinningAmount);

				getConvertCurrency(
					dataObj.tokenType?.short_name,
					dataObj?.betWinningAmount
				);
				setTokenType(dataObj.tokenType);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getDisputeResult Data Err : ', err);
			});
	};

	useEffect(() => {
		if (resolveBetAddress && resolveBetAddress !== 'Error') {
			// console.log('resolveBetAddress', resolveBetAddress);
			// // setStep(1);
			// dispatch(updateApiLoader({apiLoader: true}));
			// const betClaimAmount = betWinningAmount;

			// const uploadData = {
			//   bet_id: betId,
			//   contractAddress: resolveBetAddress,
			//   bet_amount: betClaimAmount,
			//   bet_amount_usd: (
			//     parseFloat(betClaimAmount) * parseFloat(convertCurrency)
			//   ).toFixed(decimalValue),
			// };

			// claimAmount(uploadData)
			//   .then(res => {
			//     dispatch(updateApiLoader({apiLoader: false}));
			//     console.log('claimAmount Response : ', JSON.stringify(res));
			//     if (res?.statusCode.toString().includes('200')) {
			//       navigation.goBack();
			//     }
			//   })
			//   .catch(err => {
			//     dispatch(updateApiLoader({apiLoader: false}));
			//     console.log('claimAmount Data Err : ', err);
			//   });
			resolvedBetEvent(betObj?.bet_id, resultData?.isWinner === 'draw');
		}
	}, [resolveBetAddress]);

	const getConvertCurrency = async (tokenName, bet_Amount) => {
		getConvertCurrencyData(tokenName?.toUpperCase())
			.then(async res => {
				setConvertCurrency(res);
				console.log('getConvertCurrencyData Response : ', res);
				setBetUsdAmount(
					getRoundDecimalValue(parseFloat(res ?? '0') * parseFloat(bet_Amount))
				);
			})
			.catch(err => {
				console.log('getConvertCurrencyData Data Err : ', err);
			});
	};

	useUpdateEffect(() => {
		if (tokenType?.short_name === 'MATIC') {
			getBalance(userInfo.user.walletAddress ?? connector?.accounts[0]);
		} else {
			getBalanceAsync(tokenType?.contractAddress);
		}
	}, [tokenType]);

	const getBalance = async address => {
		try {
			let res = await getMetamaskBalance(address);
			setMyBalance(getRoundDecimalValue(res) + ' MATIC');
		} catch (error) {
			setMyBalance(0 + '');
		}
	};

	const getBalanceAsync = async address => {
		getBalanceFromContract(address);
	};

	useEffect(() => {
		if (tokenBalance) {
			console.log('tokenBalance >>> ', tokenBalance);
			setMyBalance(tokenBalance);
		}
	}, [tokenBalance]);

	const handleStrickPolicy = () => {
		navigation.navigate(ScreenNames.MoreAboutStrikePolicyScreen);
	};

	const handleClaimWinningAmount = userData => {
		console.log('handleClaimWinningAmount??', betObj);
		let bet_type = betObj?.bet_type;
		let result =
			resultData?.isWinner === 'win'
				? betObj?.user_id === userInfo.user?._id
					? betObj?.bet_creator_side_option_index + 1
					: betObj?.bet_opposite_side_option_index + 1
				: 0;
		//0
		console.log('result??????????', bet_type);
		console.log('resultData???', JSON.stringify(resultData));

		if (bet_type === '0') {
			resolveBetResult(
				betObj?.bet_id,
				result,
				['0x0000000000000000000000000000000000000000000000000000000000000000'],
				'0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
				'0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
				userData?.users?.length === 0 ? [nullAddress] : userData?.users,
				userData?.rewardPercentage?.length === 0
					? [0]
					: userData?.rewardPercentage
			);
		} else {
			resolveBetResult(
				betObj?.bet_id,
				result,
				resultData?.HashSignatureObject?.hash,
				resultData?.HashSignatureObject?.makerSignature,
				resultData?.HashSignatureObject?.takerSignature,
				userData?.users?.length === 0 ? [nullAddress] : userData?.users,
				userData?.rewardPercentage?.length === 0
					? [0]
					: userData?.rewardPercentage
			);
		}

		//resolveBetResult()
		// dispatch(updateApiLoader({apiLoader: true}));
	};

	const shouldShowClaimButton = () => {
		// const isMaker = betObj?.user_id === userInfo.user?._id;
		// if (isMaker) {
		//   if (betObj?.bet_creator_contract_address) {
		//     return false;
		//   } else {
		//     return true;
		//   }
		// } else {
		//   if (betObj?.bet_opposite_contract_address) {
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
		if (resultData?.isBetJury) {
			return false;
		} else {
			return betStatus;
		}
	};
	// const handleClaimWinningAmount = () => {
	//   dispatch(updateApiLoader({apiLoader: true}));

	//   let uploadData;
	//   if (
	//     redirectType === 'DISPUTE_RESULT' ||
	//     redirectType === 'ADMIN_RESULT_DISPUTE'
	//   ) {
	//     uploadData = {
	//       bet_id: betId,
	//       contractAddress: '0x00000',
	//       bet_amount: betWinningAmount,
	//       bet_amount_usd: betUsdAmount,
	//     };
	//   } else {
	//     uploadData = {
	//       bet_id: betId,
	//       contractAddress: '0x00000',
	//       bet_amount: betWinningAmount,
	//       bet_amount_usd: betUsdAmount,
	//     };
	//   }

	//   claimAmount(uploadData)
	//     .then(res => {
	//       dispatch(updateApiLoader({apiLoader: false}));
	//       console.log('claimAmount Response : ', JSON.stringify(res));
	//       if (res?.statusCode.toString().includes('200')) {
	//         navigateReset('FeedsRouter');
	//       }
	//     })
	//     .catch(err => {
	//       dispatch(updateApiLoader({apiLoader: false}));
	//       console.log('claimAmount Data Err : ', err);
	//     });
	// };

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					name={Strings.dispute_result}
					onLeftIconPath={icons.back}
				/>
				<ScrollView
					style={styles.scollViewContainer}
					showsVerticalScrollIndicator={false}>
					<View style={styles.resultViewContainer}>
						<ResultHeaderTextView
							headerTitle={Strings.result_of_dispute}
							title={
								resultType === Strings.LOSE
									? Strings.you_are_losing_side
									: Strings.you_are_winnig_side
							}
							subTitle={
								resultType === Strings.LOSE
									? Strings.your_case_least_vote
									: Strings.you_provide_evidence_true
							}
							image={
								resultType === Strings.LOSE ? icons.emojiSad : icons.celebration
							}
						/>
						{/* <ResultCaseView caseAValue={2} caseBValue={1} caseCValue={0} /> */}

						{!isResultViewHide ? (
							<ResultCaseView
								caseATitle={
									redirectType === 'DISPUTE_RESULT' ||
									redirectType === 'ADMIN_RESULT_DISPUTE'
										? Strings.your_favour
										: Strings.caseA
								}
								caseBTitle={
									redirectType === 'DISPUTE_RESULT' ||
									redirectType === 'ADMIN_RESULT_DISPUTE'
										? Strings.against_you
										: Strings.caseB
								}
								caseCTitle={
									redirectType === 'DISPUTE_RESULT' ||
									redirectType === 'ADMIN_RESULT_DISPUTE'
										? Strings.caseVoid
										: Strings.void
								}
								// caseATitle={Strings.your_favour}
								// caseBTitle={Strings.against_you}
								// caseCTitle={Strings.caseVoid}
								caseAValue={caseAValue}
								caseBValue={caseBValue}
								caseCValue={caseCValue}
								redirectType={redirectType}
							/>
						) : null}
					</View>

					<View style={styles.resultViewMiddleContainer}>
						<Text style={styles.resultViewMiddleTitleText}>
							{resultType === Strings.WIN
								? Strings.so_you_are
								: resultType === Strings.LOSE
								? Strings.you_loosing_side
								: resultType === Strings.VOID || resultType === Strings.DRAW
								? Strings.so_bet_fund_are
								: null}
						</Text>
						<Text style={styles.resultViewMiddleSubTitleText}>
							{resultType === Strings.WIN
								? Strings.bet_winner
								: resultType === Strings.LOSE
								? Strings.so_you_obtained
								: resultType === Strings.VOID || resultType === Strings.DRAW
								? Strings.return_you
								: null}
						</Text>

						{resultType === Strings.WIN || resultType === Strings.DRAW ? (
							<>
								<ButtonGradientWithRightIcon
									colorArray={defaultTheme.ternaryGradientColor}
									angle={gradientColorAngle}
									rightIcon={icons.downGray}
									rightIconPath={tokenType?.tokenImageUrl} //need to change
									styleOfRightIcon={styles.btnRightIcon}
									// rightIconPath={data?.tokenImageUrl}
									// onPress={onPressWallets}
									style={styles.marginInput}
									short_name={tokenType?.short_name}
									onChangeText={(text: string) => {
										// betAmount({number: text.replace(/^\d+(?:[.,]\d+)*$/gm)});
										// betAmount(text);
									}}
									onSubmitText={(text: any) => {
										// betUsdAmount(text);
									}}
									textValue={getRoundDecimalValue(betWinningAmount) + ''}
									keyboardType="numeric"
									maxLength={10}
									editable={false}
									btnDisabled={true}
									// errMessage={errMessage}
									// isShowError={isShowError}
								/>
								<View style={styles.contentStyle}>
									<Text style={styles.AmountStyle}>
										{tokenType?.short_name !== 'DBETH' &&
											`≈ USD ${betUsdAmount}`}
									</Text>
									<Text style={styles.AmountStyle}>
										{Strings.balance}: {myBalance}
									</Text>
								</View>
							</>
						) : null}
					</View>

					{resultData && Object.keys(resultData).includes('strikeLevel') && (
						<View
							style={{
								marginBottom: verticalScale(16),
								marginHorizontal: horizontalScale(16)
							}}>
							<ButtonGradientWithRightIcon
								colorArray={defaultTheme.ternaryGradientColor}
								angle={gradientColorAngle}
								rightIcon={icons.info}
								styleOfRightIcon={styles.rightIcon}
								style={styles.rightIconStyle}
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
						</View>
					)}

					{strikeLevel !== 0 &&
						resultData &&
						Object.keys(resultData).includes('strikeLevel') && (
							<View style={{marginHorizontal: horizontalScale(4)}}>
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
								<TouchableOpacity
									onPress={handleStrickPolicy}
									activeOpacity={0.5}>
									<Text style={styles.moreAboutLinkText}>
										{Strings.more_about_strike_policy}
									</Text>
								</TouchableOpacity>
							</View>
						)}

					{/* {resultType === Strings.LOSE ? (
            <View>
              <Text
                style={[styles.resultStrikeText, {textTransform: 'uppercase'}]}>
                {Strings.srike.replace('%d', strikeLevel)}
              </Text>
              <CustomeProgressBar
                progress={parseFloat(strikeLevel / 4)}
                totalParts={4}
                startColor={colors.progressStart}
                endColor={colors.progressEnd}
              />
              <TouchableOpacity
                onPress={handleStrickPolicy}
                activeOpacity={0.5}>
                <Text style={styles.moreAboutLinkText}>
                  {Strings.more_about_strike_policy}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null} */}
				</ScrollView>
				{((resultType === Strings.WIN && shouldShowClaimButton()) ||
					((resultType === Strings.VOID || resultType === Strings.DRAW) &&
						shouldShowClaimButton()) ||
					resultType === Strings.LOSE) && (
					<ButtonGradient
						colorArray={defaultTheme.secondaryGradientColor}
						angle={gradientColorAngle}
						onPress={() => {
							switch (resultType) {
								case Strings.WIN:
									if (
										redirectType === 'DISPUTE_RESULT' ||
										redirectType === 'ADMIN_RESULT_DISPUTE'
									) {
										getUserAncestorData();
									} else {
										navigation.dispatch(StackActions.popToTop());
									}
									//TODO: call contract for claim won amount
									break;
								case Strings.LOSE:
									// navigateReset('FeedsRouter');
									navigation.dispatch(StackActions.popToTop());
									break;
								case Strings.VOID:
								case Strings.DRAW:
									if (
										redirectType === 'DISPUTE_RESULT' ||
										redirectType === 'ADMIN_RESULT_DISPUTE'
									) {
										getUserAncestorData();
									} else {
										navigation.dispatch(StackActions.popToTop());
									}
									//TODO: call contract for claim his amount
									break;
								default:
									break;
							}
						}}
						buttonTextcolor={colors.white}
						buttonText={
							resultType === Strings.WIN
								? redirectType === 'DISPUTE_RESULT' ||
								  redirectType === 'ADMIN_RESULT_DISPUTE'
									? Strings.claim_winning
									: Strings.continue_to_feed
								: resultType === Strings.LOSE
								? Strings.continue_to_feed
								: resultType === Strings.VOID || resultType === Strings.DRAW
								? redirectType === 'DISPUTE_RESULT' ||
								  redirectType === 'ADMIN_RESULT_DISPUTE'
									? Strings.claim_bet_funds
									: Strings.continue_to_feed
								: null
						}
						style={styles.continueButton}
					/>
				)}
				{resultData?.isBetJury &&
					(resultType === Strings.WIN ||
						resultType === Strings.DRAW ||
						resultType === Strings.VOID) && (
						<ButtonGradient
							colorArray={defaultTheme.secondaryGradientColor}
							angle={gradientColorAngle}
							onPress={() => {
								navigation.dispatch(StackActions.popToTop());
							}}
							buttonTextcolor={colors.white}
							buttonText={Strings.continue_to_feed}
							style={styles.continueButton}
						/>
					)}
			</View>
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
		</SafeAreaView>
	);
};

export default DisputeResultScreen;
