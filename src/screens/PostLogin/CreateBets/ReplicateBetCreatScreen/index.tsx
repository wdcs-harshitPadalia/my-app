/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React, {useEffect, useState} from 'react';
import {Alert, BackHandler, Linking, Share, View} from 'react-native';
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
import InformationPopUpView from '../../../../components/InformationPopUpView';
import {
	addBet,
	getRandomNumber,
	getTokenType,
	getUserBetDetails,
	logout,
	validateBets
} from '../../../../redux/apiHandler/apiActions';
import {useDispatch, useSelector} from 'react-redux';
import {useBetCreateContract} from '../../../../components/CustomHooks/SmartContract';
import {
	createJoinBetShareMessage,
	createJoinBetShareUrl,
	dateConvert,
	getMetamaskBalance,
	getRoundDecimalValue,
	timeConvert
} from '../../../../constants/utils/Function';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootState} from '../../../../redux/store';
import useDebounce from '../../../../components/CustomHooks/useDebounce';
import TokenSelection from '../../../../components/TokenSelection';
import useUpdateEffect from '../../../../components/CustomHooks/useUpdateEffect';
import moment from 'moment';
import InviteFriendView from '../../../../components/InviteFriendView';
import ShareOptionView from '../../../../components/ShareOptionView';
import BetsPrivacyView from '../../../../components/BetsPrivacyView';
import analytics from '@react-native-firebase/analytics';
import Clipboard from '@react-native-clipboard/clipboard';
import {updateApiLoader} from '../../../../redux/reducerSlices/preLogin';
import ConformationPopupComponet from '../../../../components/ConformationPopupComponet';
import {Fonts, moderateScale} from '../../../../theme';
import {magic} from '../../../../navigation/routes';
import {
	resetProfileData,
	updateDeviceToken
} from '../../../../redux/reducerSlices/userInfo';
import TokenConfirmationModel from '../../../../components/TokenConfirmationModel';
import {gradientColorAngle} from '../../../../theme/metrics';
import BetsMatchDetailsView from '../../../../components/BetsMatchDetailsView';
import BetsEndDetailsView from '../../../../components/BetsEndDetailsView';
import BetsOptionWithAmountView from '../../../../components/BetsOptionWithAmountView';
import {decimalValue} from '../../../../constants/api';
import LottieView from 'lottie-react-native';
import {updateDiscoverRefreshOnFocus} from '../../../../redux/reducerSlices/dashboard';

const ReplicateBetCreatScreen: React.FC<any> = () => {
	const navigation = useNavigation();
	const {params} = useRoute(); // betCreationType New Bet = 0 , Events bet = 1
	const dispatch = useDispatch();

	const [eventBetData, setEventBetData] = useState();

	const [step, setStep] = useState(-1);

	const [infoPopUpType, setInfoPopUpType] = useState(0); // 0 for back and 1 for league 2 for metamask

	const [isCategoryId, setIsCategoryId] = useState('');
	const [isSelectedCategory, setIsSelectedCategory] = useState('');

	const [isSelectedSubCategory, setIsSelectedSubCategory] = useState('');
	const [isSubCategoryId, setIsSubCategoryId] = useState('');

	const [isSelectedLeague, setIsSelectedLeague] = useState('');
	const [isLeagueId, setIsLeagueId] = useState('');

	const [modalLeagueVisible, setModalLeagueVisible] = useState(false);
	const [isSelectedLeagueType] = useState(params?.eventBetData?.bet_type); // 0 for Browse Leagues and 1 for create your own

	const [isSelectBetsType, setIsSelectBetsType] = useState({});

	const [selectedGame, setSelectedGame] = useState();

	const [isSelectMainMarket] = useState(params?.eventBetData?.mainmarkets);

	const [isSelectChooseSideType, setIsSelectChooseSideType] = useState(null);

	const [currencyData, setCurrencyData] = useState();
	const [isSelectCurrency, setIsSelectCurrency] = useState({});
	const [betAmount, setBetAmount] = useState('');
	const [betUsdAmount, setBetUsdAmount] = useState('0');
	const [myBalance, setMyBalance] = useState('0');
	const [betOdds, setBetOdds] = useState();
	const [selectedBetOdds, setSelectedBetOdds] = useState();
	const [selectedOddsIndex, setSelectedOddsIndex] = useState(0);

	const [winningPercentage, setWinningPercentage] = useState(0);
	const [isAmountError, setAmountError] = useState(false);
	const [isAmountErrorMessage, setAmountErrorMessage] = useState('');

	const [isViewNextBackBtn, setIsViewNextBackBtn] = useState(false); // 0 for not selected and 1 for selected
	const [nextBtnTitle, setNextBtnTitle] = useState(Strings.next);
	const [isBackButtonDisable, setIsBackButtonDisable] = useState(false);

	const [question, setQuestion] = useState('');

	const [options1, setOptions1] = useState('');
	const [options2, setOptions2] = useState('');

	const [betWinningHelpTitle, setBetWinningHelpTitle] = useState('');
	const [betWinningHelp, setBetWinningHelp] = useState('');

	const [modalNeedHelpVisible, setModalNeedHelpVisible] = useState(false);
	const [modalVisibleType, setModalVisibleType] = useState(0); // 0 for need help and 1 for winning help and 2 for about bet and 3 for odds

	const [betAboutHelpTitle, setBetAboutHelpTitle] = useState('');
	const [betAboutHelp, setBetAboutHelp] = useState('');

	const [betOddHelpTitle, setBetOddHelpTitle] = useState('');
	const [betOddHelp, setBetOddHelp] = useState('');

	const debouncedValue = useDebounce<string>(betAmount, 500);
	const [showTokenSelectionPopup, setShowTokenSelectionPopup] = useState(false);
	const [uniqId, setUniqId] = useState('');

	const [isPrivacy, setIsPrivacy] = useState(-1);

	const [isSelectFollowUser, setIsSelectFollowUser] = useState({});

	const [modalIsBetJoin, setModalIsBetJoin] = useState(false);
	const [betJoinMessage, setBetJoinMessage] = useState('');

	const [shareUrl, setShareUrl] = useState('');
	const [shareMessage, setShareMessage] = useState('');

	const [opposite_bet_amount, setOpposite_bet_amount] = useState('');

	const [isTokenConfirmationModelVisible, setIsTokenConfirmationModelVisible] =
		useState(false);

	const [customeSelectTokenId, setCustomeSelectTokenId] = useState(0);

	const {
		bet_id,
		handleChange,
		getBalanceFromContract,
		tokenBalance,
		getContractAllowance,
		allowedToken,
		approveContract,
		dbethBalance,
		allowanceAddress
	} = useBetCreateContract(false);
	const connector = useWalletConnect();

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	//useBetCreateContract

	// useEffect(() => {
	//   if (connector.connected) {
	//     getBalanceAsync();
	//   }
	// }, [getBalanceFromContract]);

	const getBalanceAsync = async address => {
		getBalanceFromContract(address);
		//approveContract('');
		//getContractAllowance('');
	};

	useUpdateEffect(() => {
		// Do fetch here...
		// Triggers when "debouncedValue" changes
		// getConvertCurrency();
	}, [debouncedValue]);

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
		if (allowedToken) {
			console.log('allowedToken?>>>', allowedToken);

			if (allowedToken >= betAmount) {
				// perform transaction
				console.log('inside if perform transaction>>>');
				handleCustomeTokenContract();
			} else {
				console.log('inside else req contract>>>');
				setIsTokenConfirmationModelVisible(true);
				// req contract
			}
		}
	}, [allowedToken]);

	useEffect(() => {
		console.log('allowanceAddress >> ', allowanceAddress);
		if (allowanceAddress && allowanceAddress !== 'Error') {
			setIsTokenConfirmationModelVisible(false);
			handleCustomeTokenContract();
		}
	}, [allowanceAddress]);

	const handleCustomeTokenContract = async () => {
		if (isPrivacy === 0) {
			console.log('====================================');
			console.log('betAmount > dbethBalance >> ', betAmount > dbethBalance);
			console.log('====================================');

			if (parseFloat(betAmount.replace(',', '.')) > parseFloat(dbethBalance)) {
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
				return;
			} else {
				if (userInfo?.user?.socialLoginType?.toLowerCase() !== 'metamask') {
					const loginStatus = await magic.user.isLoggedIn();
					console.log('loginStatus', loginStatus);
					if (!loginStatus) {
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
						return;
					}
				}
			}
			let betEndDate = Date.parse(moment.utc(eventBetData?.betEndDate));
			console.log('betEndDate>>3', betEndDate);

			const isSelectSubMainMarket = eventBetData?.mainmarkets?.sub_market[0];
			const type0Odds =
				isSelectSubMainMarket === undefined
					? isSelectMainMarket
					: isSelectSubMainMarket;
			//TODO: call contract
			handleChange({
				_opponentAmount:
					isSelectedLeagueType === 0
						? `${parseFloat(opposite_bet_amount) + ''}`
						: `${
								parseFloat(betAmount.replace(',', '.')) *
									parseFloat(selectedBetOdds?.decimal) -
								parseFloat(betAmount.replace(',', '.')) +
								''
						  }`,
				_matchId: isSelectedLeagueType === 1 ? uniqId : selectedGame?._id,
				_tokenId: customeSelectTokenId,
				// _winningAmount: `${(
				//   parseFloat(betAmount) * parseFloat(selectedBetOdds?.decimal)
				// ).toFixed(decimalValue)}`,
				_winningAmount: `${(
					parseFloat(betAmount.replace(',', '.')) *
					parseFloat(
						isSelectedLeagueType === 0
							? isSelectChooseSideType === type0Odds?.decimalName
								? type0Odds?.decimal
								: type0Odds?.oppositeDecimal
							: selectedBetOdds?.decimal
					)
				).toFixed(decimalValue)}`,
				_betEndingDate:
					isSelectedLeagueType === 1
						? betEndDate / 1000
						: selectedGame?.match_end_time / 1000,
				_betAmount: betAmount.replace(',', '.'),
				_parentBetId: eventBetData?.bet_id,
				_totalBetOption: 3,
				_selectedBetMakerOption:
					isSelectChooseSideType === (type0Odds?.decimalName || options1)
						? 0
						: 1,
				_ISCUSTOMIZED: isSelectedLeagueType !== 0
			});
		} else {
			if (parseFloat(betAmount.replace(',', '.')) > parseFloat(dbethBalance)) {
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
				return;
			} else {
				if (userInfo?.user?.socialLoginType?.toLowerCase() !== 'metamask') {
					const loginStatus = await magic.user.isLoggedIn();
					console.log('loginStatus', loginStatus);
					if (!loginStatus) {
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
						return;
					}
				}
			}
			const isSelectSubMainMarket =
				eventBetData?.mainmarkets?.sub_market.filter(
					item => item.oddName === eventBetData?.market_sub_name
				)[0];
			const type0Odds =
				isSelectSubMainMarket === undefined
					? isSelectMainMarket
					: isSelectSubMainMarket;
			let betEndDate = Date.parse(moment.utc(eventBetData?.betEndDate));
			console.log('betEndDate>>3', betEndDate);
			console.log('betEndDate>>4', selectedGame?.match_end_time);

			//TODO: call contract
			handleChange({
				_opponentAmount:
					isSelectedLeagueType === 0
						? `${parseFloat(opposite_bet_amount) + ''}`
						: `${
								parseFloat(betAmount.replace(',', '.')) *
									parseFloat(selectedBetOdds?.decimal) -
								parseFloat(betAmount.replace(',', '.')) +
								''
						  }`,
				_matchId: isSelectedLeagueType === 1 ? uniqId : selectedGame?._id,
				_tokenId: customeSelectTokenId,
				_winningAmount: `${(
					parseFloat(betAmount.replace(',', '.')) *
					parseFloat(
						isSelectedLeagueType === 0
							? isSelectChooseSideType === type0Odds?.decimalName
								? type0Odds?.decimal
								: type0Odds?.oppositeDecimal
							: selectedBetOdds?.decimal
					)
				).toFixed(decimalValue)}`,
				_betEndingDate:
					isSelectedLeagueType === 1
						? betEndDate / 1000
						: selectedGame?.match_end_time / 1000,
				_betAmount: betAmount.replace(',', '.'),
				_parentBetId: eventBetData?.bet_id,
				_totalBetOption: 3,
				_selectedBetMakerOption:
					isSelectChooseSideType === (type0Odds?.decimalName || options1)
						? 0
						: 1,
				_ISCUSTOMIZED: isSelectedLeagueType !== 0
			});
		}
	};

	useEffect(() => {
		console.log('eventBetData >> stringify >>', JSON.stringify(eventBetData));

		getUserBetDetailsData();
	}, [params?.eventBetData]);

	const getUserBetDetailsData = () => {
		dispatch(updateApiLoader({apiLoader: true}));
		getUserBetDetails(params?.eventBetData?._id)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				// console.log('getUserBetDetails Response : ', JSON.stringify(res));
				const betObj = res?.data?.bet;
				setEventBetData(betObj);
				setSelectedGame(betObj?.match);
				setBetAmount(
					betObj?.bet_type === 0
						? betObj?.bet_opposite_amount
						: parseFloat(betObj?.bet_amount) * parseFloat(betObj?.odds) -
								parseFloat(betObj?.bet_amount) +
								''
				);
				setIsSelectCurrency(betObj?.tokentypes);

				setIsSelectedCategory(betObj?.categories?.name ?? '');

				setIsSelectedSubCategory(betObj?.subcategories?.name ?? '');

				setIsSelectedLeague(betObj?.match?.leagueName);

				setIsCategoryId(betObj?.categories?._id);
				setIsSubCategoryId(betObj?.subcategories?._id ?? '');
				setIsLeagueId(betObj?.matches?.leagueId);

				setIsSelectBetsType(betObj?.bettypes);

				setIsSelectChooseSideType(betObj?.bet_creator_side_option);

				setQuestion(betObj?.betQuestion);
				setOptions1(betObj?.betOptionOne);
				setOptions2(betObj?.betOptionTwo);

				setBetUsdAmount(betObj?.bet_amount_usd + '');

				setBetAmount(
					getRoundDecimalValue(
						betObj?.bet_amount_usd / (betObj?.tokentypes?.tokenPriceUsd ?? 1)
					) + ''
				);

				if (connector.connected) {
					getBalance(connector?.accounts[0]);
				} else {
					getBalance(userInfo.user.walletAddress);
				}

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

	const backAction = () => {
		if (step === 1) {
			navigation.goBack();
		} else if (step === 5 || step === 6) {
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

	const getTokenTypeData = () => {
		const uploadData = {
			matchId: selectedGame?.matchId,
			marketId: eventBetData?.market_id,
			market: eventBetData?.market_sub_name
		};
		getTokenType(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));

				console.log('getTokenTypeData Data : ', res?.data);

				setCurrencyData(res?.data.tokens);
				setIsSelectCurrency(res?.data.tokens[0]);
				setBetOdds(res?.data.odds);
				if (isSelectedLeagueType !== 0) {
					let copy = [...res?.data.odds];
					let temp = copy.sort((a, b) => {
						return (
							Math.abs(2 - parseFloat(a?.decimal)) -
							Math.abs(2 - parseFloat(b?.decimal))
						);
					});
					console.log('sdddad', temp[0]);

					let index1 = 0;
					console.log(
						'oddsData.findIndex(temp)....',
						res?.data.odds.filter((item, index) => {
							if (item?._id === temp[0]._id) {
								index1 = index;
								console.log(index, 'dfkhdjkdfkdfhfd');
							}
						})
					);

					console.log('index1>>>>', index1);

					setSelectedBetOdds(res?.data.odds[index1]);
					setSelectedOddsIndex(index1);
				}
				console.log('-----', res?.data.odds[0]);
				setWinningPercentage(res?.data.winningPercentage);
				setBetWinningHelpTitle(res?.data.tokenContent?.title);
				setBetWinningHelp(res?.data.tokenContent?.content);

				setBetAboutHelpTitle(res?.data.betContent?.title);
				setBetAboutHelp(res?.data.betContent?.content);

				setBetOddHelpTitle(res?.data.oddsContent?.title);
				setBetOddHelp(res?.data.oddsContent?.content);

				setStep(1);
			})
			.catch(err => {
				console.log('getTokenTypeData Data Err : ', err);
			});
	};

	const getRandomNumberData = () => {
		getRandomNumber('bet')
			.then(res => {
				console.log('getRandomNumberData Response : ', res);
				setUniqId(res?.data);
			})
			.catch(err => {
				console.log('getRandomNumberData Data Err : ', err);
			});
	};

	const addBetData = async () => {
		let uploadData = {};

		if (isSelectedLeagueType === 0) {
			const isSelectSubMainMarket = eventBetData?.mainmarkets?.sub_market[0];
			const type0Odds =
				isSelectSubMainMarket === undefined
					? isSelectMainMarket
					: isSelectSubMainMarket;
			uploadData = {
				category_id: isCategoryId,
				sub_category_id: isSubCategoryId,
				league_id: isLeagueId,
				bet_type_id: isSelectBetsType?._id,
				isLiveBet: eventBetData?.isLiveBet,
				match_id: selectedGame?._id,
				market_id: isSelectMainMarket?._id,
				market_sub_name: eventBetData?.market_sub_name,
				coin_id: isSelectCurrency?._id,
				bet_amount: betAmount.replace(',', '.'),
				bet_amount_usd: betUsdAmount,
				odds:
					isSelectChooseSideType === type0Odds?.decimalName
						? type0Odds?.decimal + ''
						: type0Odds?.oppositeDecimal + '',
				opposite_odds:
					isSelectChooseSideType !== type0Odds?.decimalName
						? type0Odds?.decimal + ''
						: type0Odds?.oppositeDecimal + '',
				betQuestion:
					isSelectSubMainMarket === undefined
						? isSelectMainMarket?.market_name
						: isSelectMainMarket?.market_name +
						  ' : ' +
						  isSelectSubMainMarket?.oddName,
				betOptionOne: type0Odds?.decimalName,
				betOptionTwo: type0Odds?.oppositeDecimalName,
				opposite_team_name:
					isSelectChooseSideType === selectedGame.visitorTeamId
						? selectedGame.localTeamName
						: selectedGame.visitorTeamName,
				local_team_name:
					isSelectChooseSideType === selectedGame.localTeamId
						? selectedGame.localTeamName
						: selectedGame.visitorTeamName,
				is_public: isPrivacy === 0 ? true : false,
				invited_friends_id:
					isPrivacy === 1 ? isSelectFollowUser?.user?._id : '',
				bet_id: bet_id,
				opposite_bet_amount: opposite_bet_amount + '',
				bet_type: '0',
				parent_bet_id: eventBetData?.bet_id,
				bet_creator_side_option_index:
					isSelectChooseSideType === type0Odds?.decimalName ? 0 : 1,
				bet_opposite_side_option_index:
					isSelectChooseSideType === type0Odds?.decimalName ? 1 : 0,
				bet_creator_side_option:
					isSelectChooseSideType === type0Odds?.decimalName
						? type0Odds?.decimalName + ''
						: type0Odds?.oppositeDecimalName + '',
				bet_opposite_side_option:
					isSelectChooseSideType !== type0Odds?.decimalName
						? type0Odds?.decimalName + ''
						: type0Odds?.oppositeDecimalName + ''
			};
			// await analytics().logEvent('calledP2pBetApi', {
			// 	id: bet_id,
			// 	item: 'p2pBetSmartContractCalled',
			// 	description: JSON.stringify(uploadData)
			// });
		} else if (isSelectedLeagueType === 1) {
			let betEndDate = Date.parse(moment.utc(eventBetData?.betEndDate));
			let participationEndDate = Date.parse(
				moment.utc(eventBetData?.betParticipationEndDate)
			);

			uploadData = {
				custom_unique_id: uniqId,
				category_id: isCategoryId,
				sub_category_id: isSubCategoryId || undefined,
				coin_id: isSelectCurrency?._id,
				bet_amount: betAmount.replace(',', '.'),
				bet_amount_usd: betUsdAmount,
				odds: selectedBetOdds?.decimal + '',
				isLiveBet: eventBetData?.isLiveBet,
				opposite_odds: selectedBetOdds?.oppositeDecimal + '',
				is_public: isPrivacy === 0 ? true : false,
				invited_friends_id:
					isPrivacy === 1 ? isSelectFollowUser?.user?._id : '',
				bet_id: bet_id,
				betQuestion: question,
				betOptionOne: options1,
				betOptionTwo: options2,
				betEndDate: betEndDate + '',
				bet_creator_side_option: isSelectChooseSideType,
				bet_creator_side_option_index:
					isSelectChooseSideType === options2 ? 1 : 0,
				bet_opposite_side_option_index:
					isSelectChooseSideType === options2 ? 0 : 1,
				bet_opposite_side_option:
					isSelectChooseSideType === options2 ? options1 : options2,
				bet_type: '1',
				betParticipationEndDate: participationEndDate + '',
				opposite_bet_amount:
					(
						parseFloat(betAmount.replace(',', '.')) *
							parseFloat(selectedBetOdds?.decimal) -
						parseFloat(betAmount.replace(',', '.'))
					).toFixed(decimalValue) + '',
				parent_bet_id: eventBetData?.bet_id
			};
			// await analytics().logEvent('calledP2pBetApi', {
			// 	id: bet_id,
			// 	item: 'p2pBetSmartContractCalled',
			// 	description: JSON.stringify(uploadData)
			// });
		} else {
			uploadData = {
				category_id: isCategoryId,
				sub_category_id: isSubCategoryId,
				league_id: isLeagueId,
				bet_type_id: isSelectBetsType?._id,
				match_id: selectedGame?._id,
				coin_id: isSelectCurrency?._id,
				bet_amount: betAmount.replace(',', '.'),
				bet_amount_usd: betUsdAmount,
				isLiveBet: eventBetData?.isLiveBet,
				odds: selectedBetOdds?.decimal + '',
				opposite_odds: selectedBetOdds?.oppositeDecimal + '',
				is_public: isPrivacy === 0 ? true : false,
				invited_friends_id:
					isPrivacy === 1 ? isSelectFollowUser?.user?._id : '',
				bet_id: bet_id,
				betQuestion: question,
				betOptionOne: options1,
				betOptionTwo: options2,
				bet_creator_side_option: isSelectChooseSideType,
				bet_opposite_side_option:
					isSelectChooseSideType === options2 ? options1 : options2,
				bet_creator_side_option_index:
					isSelectChooseSideType === options2 ? 1 : 0,
				bet_opposite_side_option_index:
					isSelectChooseSideType === options2 ? 0 : 1,
				opposite_bet_amount:
					(
						parseFloat(betAmount.replace(',', '.')) *
							parseFloat(selectedBetOdds?.decimal) -
						parseFloat(betAmount.replace(',', '.'))
					).toFixed(decimalValue) + '',
				bet_type: '2',
				parent_bet_id: eventBetData?.bet_id
			};
			// await analytics().logEvent('calledP2pBetApi', {
			// 	id: bet_id,
			// 	item: 'p2pBetSmartContractCalled',
			// 	description: JSON.stringify(uploadData)
			// });
		}

		addBet(uploadData)
			.then(res => {
				console.log('addBetData Response : ', res);
				dispatch(updateDiscoverRefreshOnFocus(true));
				if (isPrivacy === 0) {
					setNextBtnTitle(Strings.continue);
					setIsBackButtonDisable(false);
					setStep(3);
					setShareUrl(createJoinBetShareUrl(res?.data?.bets?._id));
					setIsViewNextBackBtn(false);
					setShareMessage(
						createJoinBetShareMessage(
							userInfo?.user?.displayName || userInfo?.user?.userName,
							res?.data?.bets?.betQuestion,
							res?.data?.bets?._id
						)
					);
				} else if (isPrivacy === 1) {
					setIsBackButtonDisable(false);
					setNextBtnTitle(Strings.continue);
					setIsViewNextBackBtn(false);
					setStep(4);
				}
				dispatch(updateApiLoader({apiLoader: false}));
			})
			.catch(err => {
				setIsBackButtonDisable(false);
				console.log('addBetData Data Err : ', err);
				dispatch(updateApiLoader({apiLoader: false}));
			});
	};

	const validateBetsData = () => {
		const isSelectSubMainMarket = eventBetData?.mainmarkets?.sub_market.filter(
			item => item.oddName === eventBetData?.market_sub_name
		)[0];
		const type0Odds =
			isSelectSubMainMarket && Object.keys(isSelectSubMainMarket).length > 0
				? isSelectSubMainMarket
				: isSelectMainMarket;

		let uploadData = {
			type: 'create',
			match_id: selectedGame?._id,
			bet_amount: betAmount.replace(',', '.'),
			opposite_odds:
				isSelectChooseSideType !== type0Odds?.decimalName
					? type0Odds?.decimal + ''
					: type0Odds?.oppositeDecimal + '',
			odds:
				isSelectChooseSideType === type0Odds?.decimalName
					? type0Odds?.decimal + ''
					: type0Odds?.oppositeDecimal + '',
			bet_id: eventBetData?._id
		};
		dispatch(updateApiLoader({apiLoader: true}));
		validateBets(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('validateBetsData Response : ', res);
				console.log(
					'validateBetsData Response opposite : ',
					res.data?.bet_opposite_amount
				);
				setOpposite_bet_amount(res.data?.bet_opposite_amount);
				setBetJoinMessage(res?.data?.message);
				getRandomNumberData();
				setTimeout(() => {
					if (res.data.isBet === true) {
						setIsBackButtonDisable(true);
						setIsViewNextBackBtn(true);
						setStep(2);
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

	const eventInfo = () => {
		return (
			<>
				<Text style={styles.titleStyle}>
					{isSelectedCategory?.toUpperCase() +
						(isSelectedSubCategory === '' ? '' : ' - ') +
						isSelectedSubCategory?.toUpperCase() +
						(isSelectedLeagueType === 0
							? ' - ' + isSelectedLeague?.toUpperCase()
							: isSelectedLeagueType === 2
							? ' - ' + isSelectedLeague?.toUpperCase()
							: '')}
				</Text>
				<Text style={styles.gameTitleStyle}>
					{isSelectedLeagueType === 0
						? `${selectedGame.localTeamName ?? selectedGame?.matchName} ${
								selectedGame?.matchName ? '' : 'vs.'
						  } ${selectedGame.visitorTeamName}`
						: question}
				</Text>
				<Text style={styles.titleStyle}>
					{isSelectedLeagueType === 1
						? `${dateConvert(eventBetData?.betEndDate)} ${timeConvert(
								eventBetData?.betEndDate
						  )}`.toUpperCase()
						: selectedGame &&
						  ` ${dateConvert(selectedGame?.gmt_timestamp)} ${timeConvert(
								selectedGame?.gmt_timestamp
						  )}`.toUpperCase()}
				</Text>
			</>
		);
	};

	const onShare = async (url: string) => {
		try {
			const result = await Share.share({
				message: url
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			Alert.alert(error.message);
		}
	};

	const showViews = () => {
		console.log('showViews ', step);
		const isSelectSubMainMarket = eventBetData?.mainmarkets?.sub_market.filter(
			item => item.oddName === eventBetData?.market_sub_name
		)[0];
		const type0Odds =
			isSelectSubMainMarket && Object.keys(isSelectSubMainMarket).length > 0
				? isSelectSubMainMarket
				: isSelectMainMarket;
		console.log('type0Odds >> ', type0Odds);

		switch (step) {
			case 1:
				return isSelectedLeagueType === 0 ? (
					<KeyboardAwareScrollView
						bounces={false}
						showsVerticalScrollIndicator={false}>
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
							isShowUserProfile={true}
						/>
						<BetsEndDetailsView
							isSelectedLeagueType={isSelectedLeagueType}
							winningPercentage={winningPercentage + ''}
							gameEndTime={timeConvert(
								selectedGame?.match_end_time ?? eventBetData?.betEndDate
							)}
							gameEndDate={dateConvert(
								selectedGame?.match_end_time ?? eventBetData?.betEndDate,
								'DD MMM YYYY - '
							)}
							onPressNeedHelp={() => {
								setModalVisibleType(1);
								setModalNeedHelpVisible(true);
							}}
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
						<BetsOptionWithAmountView
							color1Array={
								isSelectChooseSideType === type0Odds?.decimalName
									? defaultTheme.primaryGradientColor
									: defaultTheme.ternaryGradientColor
							}
							color2Array={
								isSelectChooseSideType === type0Odds?.oppositeDecimalName
									? defaultTheme.primaryGradientColor
									: defaultTheme.ternaryGradientColor
							}
							popupTitle={
								isSelectMainMarket?.market_name +
								(eventBetData?.market_sub_name
									? ' : ' + eventBetData?.market_sub_name
									: '')
							}
							button1Title={type0Odds?.decimalName}
							button2Title={type0Odds?.oppositeDecimalName}
							isShowSecondButton={true}
							onButton1Press={() => {
								// console.log('onButton1Press', JSON.stringify(eventBetData));
								// setIsSelectChooseSideType(selectedGame.localTeamId);
								// setIsBackButtonDisable(false);
								setIsSelectChooseSideType(
									isSelectSubMainMarket === undefined
										? isSelectMainMarket?.decimalName
										: isSelectSubMainMarket?.decimalName
								);
								setSelectedBetOdds(isSelectMainMarket);
								setIsBackButtonDisable(false);
							}}
							onButton2Press={() => {
								// setIsSelectChooseSideType(selectedGame.visitorTeamId);
								setSelectedBetOdds(isSelectMainMarket);
								setIsSelectChooseSideType(
									isSelectSubMainMarket?.oppositeDecimalName ??
										isSelectMainMarket?.oppositeDecimalName
								);
								setIsBackButtonDisable(false);
							}}
							textType={'capitalize'}
							profileImgPath={userInfo?.user?.picture}
							addedAmount={betUsdAmount}
							betAmount={amount => {
								setBetUsdAmount(amount);
								const condition = new RegExp(/^\d+([,.]\d{1,5})?$/gm); // new accept dot and comma
								if (
									condition.test(amount.replace(',', '.')) &&
									parseFloat(amount.replace(',', '.')) >= 1
								) {
									setAmountError(false);
									setIsBackButtonDisable(false);
								} else {
									setAmountErrorMessage(Strings.please_enter_valid_amount);
									setAmountError(true);
									setIsBackButtonDisable(true);
								}
							}}
							isShowError={isAmountError}
							errMessage={isAmountErrorMessage}
							oddsData={betOdds}
							previousData={selectedBetOdds}
							selectedBetOdds={(item: any) => {
								setSelectedBetOdds(item);
							}}
							oddsIndex={selectedOddsIndex}
							selectedOddsIndex={(item: any) => {
								setSelectedOddsIndex(item);
							}}
							isEditOdds={isSelectedLeagueType === 0 ? false : true}
							betOdds={
								isSelectedLeagueType === 0
									? isSelectChooseSideType === type0Odds?.decimalName
										? type0Odds?.decimal + ''
										: type0Odds?.oppositeDecimal + ''
									: selectedBetOdds?.decimal + ''
							}
							onPressNeedHelp={(item: any) => {
								setModalVisibleType(item === 'betInfo' ? 2 : 3);
								setModalNeedHelpVisible(true);
							}}
							isSelectCurrency={isSelectCurrency}
							onPressCurrency={() => {
								setShowTokenSelectionPopup(!showTokenSelectionPopup);
							}}
						/>
					</KeyboardAwareScrollView>
				) : (
					<KeyboardAwareScrollView
						bounces={false}
						showsVerticalScrollIndicator={false}>
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
							isShowUserProfile={true}
						/>
						<BetsEndDetailsView
							isSelectedLeagueType={isSelectedLeagueType}
							winningPercentage={winningPercentage + ''}
							gameEndTime={timeConvert(
								selectedGame?.match_end_time ?? eventBetData?.betEndDate
							)}
							gameEndDate={dateConvert(
								selectedGame?.match_end_time ?? eventBetData?.betEndDate,
								'DD MMM YYYY - '
							)}
							onPressNeedHelp={() => {
								setModalVisibleType(1);
								setModalNeedHelpVisible(true);
							}}
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
						<BetsOptionWithAmountView
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
							button1Title={options1.trim()}
							button2Title={options2.trim()}
							isShowSecondButton={true}
							onButton1Press={() => {
								setIsSelectChooseSideType(options1);
								setIsBackButtonDisable(false);
							}}
							onButton2Press={() => {
								setIsSelectChooseSideType(options2);
								setIsBackButtonDisable(false);
							}}
							textType={'capitalize'}
							profileImgPath={userInfo?.user?.picture}
							addedAmount={betUsdAmount}
							betAmount={amount => {
								setBetUsdAmount(amount);
								const condition = new RegExp(/^\d+([,.]\d{1,5})?$/gm); // new accept dot and comma
								if (
									condition.test(amount.replace(',', '.')) &&
									parseFloat(amount.replace(',', '.')) >= 1
								) {
									setAmountError(false);
									setIsBackButtonDisable(false);
								} else {
									setAmountErrorMessage(Strings.please_enter_valid_amount);
									setAmountError(true);
									setIsBackButtonDisable(true);
								}
							}}
							isShowError={isAmountError}
							errMessage={isAmountErrorMessage}
							oddsData={betOdds}
							previousData={selectedBetOdds}
							selectedBetOdds={(item: any) => {
								setSelectedBetOdds(item);
							}}
							oddsIndex={selectedOddsIndex}
							selectedOddsIndex={(item: any) => {
								setSelectedOddsIndex(item);
							}}
							isEditOdds={isSelectedLeagueType === 0 ? false : true}
							betOdds={
								isSelectedLeagueType === 0
									? isSelectChooseSideType === type0Odds?.decimalName
										? type0Odds?.decimal + ''
										: type0Odds?.oppositeDecimal + ''
									: selectedBetOdds?.decimal + ''
							}
							onPressNeedHelp={(item: any) => {
								setModalVisibleType(item === 'betInfo' ? 2 : 3);
								setModalNeedHelpVisible(true);
							}}
							isSelectCurrency={isSelectCurrency}
							onPressCurrency={() => {
								setShowTokenSelectionPopup(!showTokenSelectionPopup);
							}}
						/>
					</KeyboardAwareScrollView>
				);
			case 2:
				return (
					<>
						{eventInfo()}
						<BetsPrivacyView
							popupTitle={Strings.bet_privacy}
							isSelected={isPrivacy}
							onPrivatePress={() => {
								setIsPrivacy(1);
								setIsBackButtonDisable(false);
							}}
							onPublicPress={() => {
								setIsPrivacy(0);
								setIsBackButtonDisable(false);
							}}
						/>
					</>
				);
			case 3:
				return isPrivacy === 0 ? (
					<KeyboardAwareScrollView
						bounces={false}
						showsVerticalScrollIndicator={false}>
						{eventInfo()}
						<ShareOptionView
							onPressShare={text => {
								if (text === Strings.share_on_whatsapp) {
									Linking.openURL('whatsapp://send?text=' + shareMessage);
								} else if (text === Strings.share_on_telegram) {
									Linking.openURL('tg://msg?text=' + shareMessage);
								} else if (text === Strings.share_on_twitter) {
									Linking.openURL('twitter://post?message=' + shareMessage);
								} else if (text === Strings.copy_link) {
									Clipboard.setString(shareUrl);
									Alert.alert(Strings.copy_link_desc);
								} else {
									onShare(shareMessage);
								}
							}}
						/>
					</KeyboardAwareScrollView>
				) : (
					<>
						{eventInfo()}
						<InviteFriendView
							title={Strings.add_participants}
							style={styles.userInviteStyle}
							pervSelectedID={isSelectFollowUser?._id}
							selectedObj={item => {
								setIsSelectFollowUser(item);
								setIsBackButtonDisable(false);
							}}
						/>
					</>
				);
			case 4:
				return (
					<View style={styles.viewDoneStyle}>
						<Text style={styles.titleDoneStyle}>
							{Strings.well_done_bet_has_been_created.replace(
								'%s',
								userInfo?.user?.displayName || userInfo?.user?.userName
							)}
						</Text>
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
					</View>
				);
		}
	};

	const callNext = async () => {
		console.log('callNext step ', step);

		switch (step) {
			case 1:
				setBetAmount(
					getRoundDecimalValue(
						betUsdAmount / (isSelectCurrency?.tokenPriceUsd ?? 1)
					) + ''
				);
				validateBetsData();
				//setIsBackButtonDisable(true);
				//setStep(4);
				break;
			case 2:
				if (isSelectCurrency.name !== 'MATIC') {
					getBalanceAsync(isSelectCurrency.contractAddress);
				} else {
					getBalance(userInfo.user.walletAddress ?? connector?.accounts[0]);
				}
				if (isPrivacy === 0) {
					setIsBackButtonDisable(true);

					if (isSelectCurrency.name !== 'MATIC') {
						if (
							parseFloat(betAmount.replace(',', '.')) > parseFloat(dbethBalance)
						) {
							setIsBackButtonDisable(false);
							Alert.alert(
								'Insufficient Balance'.toUpperCase(),
								'Please add more funds.'
							);
							return;
						}
						getContractAllowance(isSelectCurrency.contractAddress);
						return;
					}

					if (parseFloat(betAmount.replace(',', '.')) > parseFloat(myBalance)) {
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
						return;
					} else {
						if (userInfo?.user?.socialLoginType?.toLowerCase() !== 'metamask') {
							const loginStatus = await magic.user.isLoggedIn();
							console.log('loginStatus', loginStatus);
							if (!loginStatus) {
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
								return;
							}
						}
					}
					let betEndDate = Date.parse(moment.utc(eventBetData?.betEndDate));
					console.log('betEndDate>>1', betEndDate);

					const isSelectSubMainMarket =
						eventBetData?.mainmarkets?.sub_market[0];
					console.log('betAmount>>', betAmount.replace(',', '.'));
					const type0Odds =
						isSelectSubMainMarket === undefined
							? isSelectMainMarket
							: isSelectSubMainMarket;
					//TODO: call contract
					handleChange({
						_opponentAmount:
							isSelectedLeagueType === 0
								? `${parseFloat(opposite_bet_amount) + ''}`
								: `${
										parseFloat(betAmount.replace(',', '.')) *
											parseFloat(selectedBetOdds?.decimal) -
										parseFloat(betAmount.replace(',', '.')) +
										''
								  }`,
						_matchId: isSelectedLeagueType === 1 ? uniqId : selectedGame?._id,
						_tokenId: customeSelectTokenId,
						// _winningAmount: `${(
						//   parseFloat(betAmount) * parseFloat(selectedBetOdds?.decimal)
						// ).toFixed(decimalValue)}`,
						_winningAmount: `${(
							parseFloat(betAmount.replace(',', '.')) *
							parseFloat(
								isSelectedLeagueType === 0
									? isSelectChooseSideType === type0Odds?.decimalName
										? type0Odds?.decimal
										: type0Odds?.oppositeDecimal
									: selectedBetOdds?.decimal
							)
						).toFixed(decimalValue)}`,
						_betEndingDate:
							isSelectedLeagueType === 1
								? betEndDate / 1000
								: selectedGame?.match_end_time / 1000,
						_betAmount: betAmount.replace(',', '.'),
						_parentBetId: eventBetData?.bet_id,
						_totalBetOption: 3,
						_selectedBetMakerOption:
							isSelectChooseSideType === (type0Odds?.decimalName || options1)
								? 0
								: 1,
						_ISCUSTOMIZED: isSelectedLeagueType !== 0
					});
				} else if (isPrivacy === 1) {
					setIsBackButtonDisable(true);
					setNextBtnTitle(Strings.send_invite);
					setStep(3);
					setIsSelectFollowUser({});
				}
				break;
			case 3:
				if (isSelectCurrency.name !== 'MATIC') {
					getBalanceAsync(isSelectCurrency.contractAddress);
				} else {
					getBalance(userInfo.user.walletAddress ?? connector?.accounts[0]);
				}

				setIsBackButtonDisable(true);

				if (isSelectCurrency.name !== 'MATIC') {
					if (
						parseFloat(betAmount.replace(',', '.')) > parseFloat(dbethBalance)
					) {
						setIsBackButtonDisable(false);
						Alert.alert(
							'Insufficient Balance'.toUpperCase(),
							'Please add more funds.'
						);
						return;
					}
					getContractAllowance(isSelectCurrency.contractAddress);
					return;
				}
				if (parseFloat(betAmount.replace(',', '.')) > parseFloat(myBalance)) {
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
					return;
				} else {
					if (userInfo?.user?.socialLoginType?.toLowerCase() !== 'metamask') {
						const loginStatus = await magic.user.isLoggedIn();
						console.log('loginStatus', loginStatus);
						if (!loginStatus) {
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
							return;
						}
					}
				}
				let betEndDate = Date.parse(moment.utc(eventBetData?.betEndDate));
				console.log('betEndDate>>2', betEndDate);

				const isSelectSubMainMarket =
					eventBetData?.mainmarkets?.sub_market.filter(
						item => item.oddName === eventBetData?.market_sub_name
					)[0];
				const type0Odds =
					isSelectSubMainMarket === undefined
						? isSelectMainMarket
						: isSelectSubMainMarket;
				//TODO: call contract
				handleChange({
					_opponentAmount:
						isSelectedLeagueType === 0
							? `${parseFloat(opposite_bet_amount) + ''}`
							: `${
									parseFloat(betAmount.replace(',', '.')) *
										parseFloat(selectedBetOdds?.decimal) -
									parseFloat(betAmount.replace(',', '.')) +
									''
							  }`,
					_matchId: isSelectedLeagueType === 1 ? uniqId : selectedGame?._id,
					_tokenId: customeSelectTokenId,
					_winningAmount: `${(
						parseFloat(betAmount.replace(',', '.')) *
						parseFloat(
							isSelectedLeagueType === 0
								? isSelectChooseSideType === type0Odds?.decimalName
									? type0Odds?.decimal
									: type0Odds?.oppositeDecimal
								: selectedBetOdds?.decimal
						)
					).toFixed(decimalValue)}`,
					_betEndingDate:
						isSelectedLeagueType === 1
							? betEndDate / 1000
							: selectedGame?.match_end_time / 1000,
					_betAmount: betAmount.replace(',', '.'),
					_parentBetId: eventBetData?.bet_id,
					_totalBetOption: 3,
					_selectedBetMakerOption:
						isSelectChooseSideType === (type0Odds?.decimalName || options1)
							? 0
							: 1,
					_ISCUSTOMIZED: isSelectedLeagueType !== 0
				});
				break;
		}
	};

	const callBackButton = () => {
		console.log('callBackButton step ', step);

		switch (step) {
			// case 2:
			//   setIsViewNextBackBtn(false);
			//   setIsBackButtonDisable(false);
			//   setStep(1);
			//   break;
			// case 3:
			//   setStep(2);
			//   break;
			// case 4:
			//   setIsBackButtonDisable(false);
			//   setStep(3);
			//   break;
			case 2:
				setIsBackButtonDisable(false);
				setIsViewNextBackBtn(false);
				setStep(1);
				setIsPrivacy(-1);
				break;
			case 3:
				setStep(2);
				setIsBackButtonDisable(isPrivacy === -1 ? true : false);
				setIsViewNextBackBtn(true);
				setNextBtnTitle(Strings.next);
				break;
		}
	};
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
						if (step === 1) {
							navigation.goBack();
						} else if (step === 5 || step === 6) {
							navigation.dispatch(StackActions.popToTop());
						} else {
							setInfoPopUpType(0);
							setModalLeagueVisible(true);
						}
					}}
					onLeftIconPath={icons.back}
					name={Strings.replicate_bet}
				/>

				{step !== -1 && <View style={styles.viewContain}>{showViews()}</View>}
				{isViewNextBackBtn ? (
					<View style={styles.viewBackButton}>
						<ButtonGradient
							onPress={callBackButton}
							colorArray={defaultTheme.ternaryGradientColor}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							buttonText={Strings.back}
							style={styles.backButton}
						/>
						<ButtonGradient
							onPress={callNext}
							colorArray={defaultTheme.secondaryGradientColor}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							buttonText={nextBtnTitle}
							style={
								!isBackButtonDisable
									? styles.nextButton
									: styles.nextButtonOpacity
							}
							btnDisabled={isBackButtonDisable}
						/>
					</View>
				) : step !== -1 ? (
					<ButtonGradient
						onPress={() => {
							if (step === 1) {
								callNext();
							} else {
								// dispatch(updateDiscoverRefreshOnFocus(true));
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
				) : (
					<></>
				)}

				<CreateLeaguePopup
					popupTitle={
						infoPopUpType === 0
							? Strings.betBack
							: Strings.Metamask_does_not_connected
					}
					buttonOkTitle={infoPopUpType === 0 ? Strings.ok : Strings.Connect}
					buttonCancelTitle={
						infoPopUpType === 0 ? Strings.cancel : Strings.cancel
					}
					leftIconPath={null}
					isVisible={modalLeagueVisible}
					onPressOk={() => {
						setModalLeagueVisible(!modalLeagueVisible);

						if (infoPopUpType === 2) {
							connectMetaMask();
						} else {
							navigation.goBack();
						}
					}}
					onPressCancel={() => {
						setModalLeagueVisible(!modalLeagueVisible);
					}}
				/>

				<InformationPopUpView
					popupTitle={
						modalVisibleType === 1
							? betWinningHelpTitle
							: modalVisibleType === 2
							? betAboutHelpTitle
							: betOddHelpTitle
					}
					description={
						modalVisibleType === 1
							? betWinningHelp
							: modalVisibleType === 2
							? betAboutHelp
							: betOddHelp
					}
					onButtonPress={() => {
						setModalNeedHelpVisible(!modalNeedHelpVisible);
					}}
					isVisible={modalNeedHelpVisible}
					iconPath={modalVisibleType === 1 ? icons.help : null}
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
								betAmount.replace(',', '.'),
								true
							);
						}, 1000);
					}}
					handleNoButtonClick={() => {
						setIsTokenConfirmationModelVisible(false);
						setIsBackButtonDisable(false);
					}}
				/>

				{showTokenSelectionPopup && (
					<TokenSelection
						data={currencyData}
						onClose={item => {
							if (item) {
								console.log('item>>>', item);
								if (item._id === currencyData[0]._id) {
									setCustomeSelectTokenId(0);
									getBalance(
										userInfo.user.walletAddress ?? connector?.accounts[0]
									);
									setIsSelectCurrency(item);
									setIsBackButtonDisable(true);
									setBetAmount('');
									setBetUsdAmount('0.00');
								} else {
									switch (item.short_name) {
										case 'DAI':
											setCustomeSelectTokenId(1);
											break;
										case 'USDC':
											setCustomeSelectTokenId(2);
											break;
										case 'USDT':
											setCustomeSelectTokenId(3);
											break;
										case 'WETH':
											setCustomeSelectTokenId(4);
											break;
										case 'DBETH':
											setCustomeSelectTokenId(5);
											break;
									}
									getBalanceAsync(item.contractAddress);
									setIsSelectCurrency(item);
									// setIsBackButtonDisable(true);
									// setBetAmount('');
									// setBetUsdAmount('0');
								}
							}
							setShowTokenSelectionPopup(false);
						}}
						pervSelectedID={isSelectCurrency?._id}
						pervSelectedObj={isSelectCurrency}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};

export default ReplicateBetCreatScreen;
