/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
	Alert,
	BackHandler,
	FlatList,
	Keyboard,
	Linking,
	Platform,
	Share,
	TouchableOpacity,
	View
} from 'react-native';
import {Text} from 'react-native-elements';
import icons from '../../../../assets/icon';
import Strings from '../../../../constants/strings';
import styles from './style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HeaderComponent from '../../../../components/HeaderComponent';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import GradientProgressView from '../../../../components/GradientProgressView';
import InputComponent from '../../../../components/InputComponent';
import SportsComponent from '../../../../components/SportsComponent';
import SportsCategory from '../../../../components/SportsCategory';
import ButtonGradient from '../../../../components/ButtonGradient';
import {defaultTheme} from '../../../../theme/defaultTheme';
import colors from '../../../../theme/colors';
import SelecteableTag from '../../../../components/SelecteableTag';
import CreateLeaguePopup from '../../../../components/CreateLeaguePopup';
import LeagueView from '../../../../components/LeagueView';
import GameSelectionView from '../../../../components/GameSelectionView';
import OptionSelectionView from '../../../../components/OptionSelectionView';
import BetsDetailsView from '../../../../components/BetsDetailsView';
import BetsPrivacyView from '../../../../components/BetsPrivacyView';
import ShareOptionView from '../../../../components/ShareOptionView';
import InviteFriendView from '../../../../components/InviteFriendView';
import WriteQuestionView from '../../../../components/WriteQuestionView';
import SetAnsOptionView from '../../../../components/SetAnsOptionView';
import SetDurationView from '../../../../components/SetDurationView';
import ExpoFastImage from 'expo-fast-image';
import InformationPopUpView from '../../../../components/InformationPopUpView';
import DynamicOptionView from '../../../../components/DynamicOptionView';
import {
	addBet,
	getAllMatch,
	getBetType,
	getCategory,
	getConvertCurrencyData,
	getLeagueList,
	getMainMarket,
	getRandomNumber,
	getSubcategory,
	getTokenType,
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
	showErrorAlert,
	timeConvert
} from '../../../../constants/utils/Function';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import {RootState} from '../../../../redux/store';
import useDebounce from '../../../../components/CustomHooks/useDebounce';
import useUpdateEffect from '../../../../components/CustomHooks/useUpdateEffect';
import {Fonts, moderateScale, verticalScale} from '../../../../theme';
import {updateApiLoader} from '../../../../redux/reducerSlices/preLogin';
import ConformationPopupComponet from '../../../../components/ConformationPopupComponet';
import MainMarketOptionSelectionView from '../../../../components/MainMarketOptionSelectionView';
import {magic} from '../../../../navigation/routes';
import {
	resetProfileData,
	updateDeviceToken
} from '../../../../redux/reducerSlices/userInfo';
import {useKeepAwake} from 'expo-keep-awake';
import TokenConfirmationModel from '../../../../components/TokenConfirmationModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateFeedRefreshOnFocus} from '../../../../redux/reducerSlices/dashboard';
import {gradientColorAngle} from '../../../../theme/metrics';
import PlaceBetsAmountView from '../../../../components/PlaceBetsAmountView';
import SelectCryptoAmount from '../../../../components/SelectCryptoAmount';
import EarningsProfitView from '../../../../components/EarningsProfitView';
import {decimalValue} from '../../../../constants/api';
import Lottie from 'lottie-react';

let pageLeague = 0;
let pageGame = 0;

const BetsCategoryScreen: React.FC<any> = () => {
	useKeepAwake();
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const flatListRef = useRef();
	const {params} = useRoute(); // betCreationType New Bet = 0 , Events bet = 1

	const userProfileInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});
	const [isProgress, seIsProgress] = useState('10%');
	const [step, setStep] = useState(1);

	const [isTitle, seIsTitle] = useState(Strings.whatAreYouBettingOn);

	const [isBackButtonDisable, setIsBackButtonDisable] = useState(true);

	const [infoPopUpType, setInfoPopUpType] = useState(0); // 0 for back and 1 for league 2 for metamask

	const [searchCategoryText, setSearchCategoryText] = useState('');
	const [searchCategoryData, setSearchCategoryData] = useState();

	const [categoryData, setCategoryData] = useState();
	const [isCategoryId, setIsCategoryId] = useState('');
	const [isSelectedCategory, setIsSelectedCategory] = useState('');
	const [isCustomCategory, setIsCustomCategory] = useState(false);
	const [isNoCategoryData, setIsNoCategoryData] = useState(false);

	const [searchSubCategoryText, setSearchSubCategoryText] = useState('');
	const [searchSubCategoryData, setSearchSubCategoryData] = useState();

	const [subCategoryData, setSubCategoryData] = useState([]);
	const [isSubCategoryId, setIsSubCategoryId] = useState('');
	const [isSelectedSubCategory, setIsSelectedSubCategory] = useState('');
	const [isNoSubCategoryData, setIsNoSubCategoryData] = useState(false);

	const [leagueData, setLeagueData] = useState();
	const [totalLeagues, setTotalLeagues] = useState(0);
	const [isLeagueId, setIsLeagueId] = useState('');

	const [isSelectedLeague, setIsSelectedLeague] = useState('');

	const [searchLeagueText, setSearchLeagueText] = useState('');
	const debouncedLeagueValue = useDebounce<string>(searchLeagueText, 500);

	const [modalLeagueVisible, setModalLeagueVisible] = useState(false);
	const [isSelectedLeagueType, setIsSelectedLeagueType] = useState(-1); // 0 for Browse Leagues and 1 for create your own
	const [isNoLeagueData, setIsNoLeagueData] = useState(false);

	const [betTypeData, setBetTypeData] = useState();
	const [isSelectBetsType, setIsSelectBetsType] = useState({});
	const [betTypNeedHelpTitle, setBetTypNeedHelpTitle] = useState('');
	const [betTypNeedHelp, setBetTypNeedHelp] = useState('');

	const [durationHelpTitle, setDurationHelpTitle] = useState('');
	const [durationHelp, setDurationdHelp] = useState('');

	const [selectedGame, setSelectedGame] = useState(params?.matchData);
	const [gameData, setGameData] = useState([]);
	const [totalGames, setTotalGames] = useState(0);
	const [isNoGameData, setIsNoGameData] = useState(false);

	const [mainMarketData, setMainMarketData] = useState([]);
	const [isSelectMainMarket, setIsSelectMainMarket] = useState();
	const [isSelectSubMainMarket, setIsSelectSubMainMarket] = useState();

	const [isSelectChooseSideType, setIsSelectChooseSideType] = useState(null);

	const [currencyData, setCurrencyData] = useState();
	const [isSelectCurrency, setIsSelectCurrency] = useState({});
	const [betAmount, setBetAmount] = useState('');
	const [betUsdAmount, setBetUsdAmount] = useState('');
	const [myBalance, setMyBalance] = useState('0');
	const [betOdds, setBetOdds] = useState();
	const [selectedBetOdds, setSelectedBetOdds] = useState();
	const [selectedOddsIndex, setSelectedOddsIndex] = useState(0);

	const [uniqId, setUniqId] = useState('');

	// const [oppositeOdds, setOppositeOdds] = useState(0);

	const [winningPercentage, setWinningPercentage] = useState(0);
	const [isAmountError, setAmountError] = useState(false);
	const [isAmountErrorMessage, setAmountErrorMessage] = useState('');
	const [isViewNextBackBtn, setIsViewNextBackBtn] = useState(true); // 0 for not selected and 1 for selected
	const [nextBtnTitle, setNextBtnTitle] = useState(Strings.next);

	const [question, setQuestion] = useState('');
	const [isSelectResults, setIsSelectResults] = useState(0); // 0 for not selected and 1 for selected

	const [options1, setOptions1] = useState('');
	const [options2, setOptions2] = useState('');
	const [isSameOption, setIsSameOption] = useState(false);

	const [customDate, setCustomDate] = useState();

	const [isPickEndTime, setPickEndTime] = useState(false);
	const [betEndTime, setbetEndTime] = useState();

	const [betWinningHelpTitle, setBetWinningHelpTitle] = useState('');
	const [betWinningHelp, setBetWinningHelp] = useState('');

	const [isPrivacy, setIsPrivacy] = useState(-1);

	const [isSelectFollowUser, setIsSelectFollowUser] = useState({});

	const [modalNeedHelpVisible, setModalNeedHelpVisible] = useState(false);
	const [modalVisibleType, setModalVisibleType] = useState(0); // 0 for need help and 1 for winning help and 2 for about bet and 3 for odds and 4 for duration help

	const [betAboutHelpTitle, setBetAboutHelpTitle] = useState('');
	const [betAboutHelp, setBetAboutHelp] = useState('');

	const [betOddHelpTitle, setBetOddHelpTitle] = useState('');
	const [betOddHelp, setBetOddHelp] = useState('');

	const debouncedValue = useDebounce<string>(betAmount, 500);

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
			console.log('useEffect :: bet_id ::', bet_id);
		}
	}, [bet_id]);

	useEffect(() => {
		if (tokenBalance) {
			console.log('useEffect :: tokenBalance ::', tokenBalance);
			setMyBalance(tokenBalance);
		}
		if (dbethBalance) {
			console.log('useEffect :: dbethBalance ::', dbethBalance);
		}
	}, [tokenBalance, dbethBalance]);

	useEffect(() => {
		console.log('useEffect :: allowedToken ::', allowedToken);
		if (allowedToken) {
			if (allowedToken >= betAmount) {
				console.log('useEffect :: inside if :: perform transaction');
				// perform transaction
				handleCustomeTokenContract();
			} else {
				console.log('useEffect :: inside else :: request contract');
				// req contract
				setIsTokenConfirmationModelVisible(true);
			}
		}
	}, [allowedToken]);

	useEffect(() => {
		console.log('useEffect :: allowanceAddress ::', allowanceAddress);
		if (allowanceAddress && allowanceAddress !== 'Error') {
			setIsTokenConfirmationModelVisible(false);
			handleCustomeTokenContract();
		}
	}, [allowanceAddress]);

	useEffect(() => {
		subCategoryData.forEach((item, index) => {
			if (item?._id === isSubCategoryId) {
				setTimeout(() => {
					flatListRef.current?.scrollToIndex({index: index});
				}, 1000);
			}
		});
	}, [subCategoryData]);

	const handleCustomeTokenContract = async () => {
		if (isPrivacy === 0) {
			// TODO: call contract
			console.log('====================================');
			console.log('betAmount > myBalance >>>> ', betAmount > dbethBalance);
			console.log('====================================');

			if (parseFloat(betAmount.replace(',', '.')) > parseFloat(dbethBalance)) {
				setIsBackButtonDisable(false);
				showErrorAlert(
					Strings.txt_insufficient_balance,
					Strings.txt_add_more_fund
				);
				return;
			}
			let betEndDate = Date.parse(moment.utc(customDate));
			if (Platform.OS === 'web') {
				betEndDate = Date.parse(customDate);
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
					console.log('loginStatus ::', loginStatus);
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
			console.log('betAmount 12::', betAmount);
			const type0Odds =
				isSelectSubMainMarket === undefined
					? isSelectMainMarket
					: isSelectSubMainMarket;

			handleChange({
				_opponentAmount:
					isSelectedLeagueType === 0
						? `${parseFloat(opposite_bet_amount) + ''}`
						: `${
								parseFloat(betAmount?.replace(',', '.')) *
									parseFloat(selectedBetOdds?.decimal) -
								parseFloat(betAmount?.replace(',', '.')) +
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
						: (selectedGame?.match_end_time ?? selectedGame?.end_date_time) /
						  1000,
				_betAmount: betAmount?.replace(',', '.'),
				_parentBetId: '0x0000000000000000000000000000000000000000',
				_totalBetOption: 3,
				_selectedBetMakerOption:
					isSelectChooseSideType === (type0Odds?.decimalName || options1)
						? 0
						: 1,
				_ISCUSTOMIZED: isSelectedLeagueType !== 0
			});
		} else {
			console.log('====================================');
			console.log('betAmount > myBalance >>>> ', betAmount > dbethBalance);
			console.log('====================================');

			if (parseFloat(betAmount.replace(',', '.')) > parseFloat(dbethBalance)) {
				setIsBackButtonDisable(false);
				showErrorAlert(
					Strings.txt_insufficient_balance,
					Strings.txt_add_more_fund
				);
				return;
			}
			let betEndDate = Date.parse(moment.utc(customDate));
			if (Platform.OS === 'web') {
				betEndDate = Date.parse(customDate);
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
					console.log('loginStatus ::', loginStatus);
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
			const type0Odds =
				isSelectSubMainMarket === undefined
					? isSelectMainMarket
					: isSelectSubMainMarket;
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
				_matchId: isSelectedLeagueType === 1 ? uniqId : selectedGame._id,
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
						: (selectedGame?.match_end_time ?? selectedGame?.end_date_time) /
						  1000,
				_betAmount: betAmount.replace(',', '.'),
				_parentBetId: '0x0000000000000000000000000000000000000000',
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
		if (params) {
			console.log('params ::', params);

			setIsSelectedCategory(params?.matchData?.categories?.name);
			setIsCategoryId(params?.matchData?.categories?._id);

			setIsSubCategoryId(params?.matchData?.subcategories?._id);
			setIsSelectedSubCategory(params?.matchData?.subcategories?.name);

			setIsSelectedLeague(params?.matchData?.leagueName);
			setIsLeagueId(params?.matchData?.leagueId);

			setIsSelectBetsType(params?.selectedBetType);

			seIsProgress('40%');
			seIsTitle(Strings.select_a_market);
			setIsBackButtonDisable(true);
			getMainMarketData();
			if (connector.connected) {
				getBalance(connector?.accounts[0]);
			} else {
				getBalance(userInfo?.user?.walletAddress);
			}

			if (params?.isLive) {
				seIsProgress('40%');
				seIsTitle(Strings.select_a_market);
				setIsBackButtonDisable(true);
				getMainMarketData();
				setIsSelectedLeagueType(selectedGame?.gmt_timestamp ? 2 : 1);
				setStep(2);
			} else if (params?.isfromTrendingNotification) {
				if (params?.matchData?.categories?.isCustom === true) {
					if (params?.matchData?.categories?.subCategoryCount >= 0) {
						seIsProgress('20%');
						seIsTitle(Strings.let_create_market);
						setIsBackButtonDisable(true);
						setStep(2);
						setIsSelectedLeagueType(1);
						getCategoryData();
					}
				} else {
					seIsProgress('10%');
					seIsTitle(Strings.whatAreYouBettingOn);
					setIsBackButtonDisable(true);
					setStep(1);
					getCategoryData();
					setIsCustomCategory(params?.matchData?.categories?.isCustom);
					params?.matchData?.issubcategories &&
						getSubCategoryData(params?.matchData?.categories?._id);

					getLeagueData(
						params?.matchData?.subcategories?._id,
						'',
						params?.matchData?.categories?._id
					);
				}
			} else {
				setIsSelectedLeagueType(0);
				setStep(4);
			}
		} else {
			getCategoryData();
			if (connector.connected) {
				getBalance(connector?.accounts[0]);
			} else {
				getBalance(userInfo?.user?.walletAddress);
			}
		}
	}, []);

	const backAction = () => {
		if (isProgress === '10%') {
			navigation.goBack();
		} else if (isProgress === '100%') {
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
			console.log('getBalance :: getMetamaskBalance :: res ::', res);
			setMyBalance(parseFloat(res).toFixed(decimalValue) + ' MATIC');
		} catch (error) {
			setMyBalance(0 + '');
		}
	};

	const getCategoryData = async () => {
		// if (
		// 	userInfo?.user?.socialLoginType?.toLowerCase() === 'metamask' &&
		// 	!connector.connected
		// ) {
		// 	console.log('getCategoryData:::============');
		// 	// Alert.alert(Strings.txt_session_expire_msg);
		// 	Alert.alert(Strings.txt_session_expire_msg, '', [
		// 		{
		// 			text: 'Ok',
		// 			onPress: () => {
		// 				dispatch(logout());
		// 				dispatch(updateDeviceToken({deviceToken: ''}));
		// 				dispatch(resetProfileData({}));
		// 			}
		// 		}
		// 	]);
		// 	return;
		// } else {
		// 	if (userInfo?.user?.socialLoginType?.toLowerCase() !== 'metamask') {
		// 		const loginStatus = await magic.user.isLoggedIn();
		// 		console.log('loginStatus ::', loginStatus);
		// 		if (!loginStatus) {
		// 			Alert.alert(Strings.txt_session_expire_msg, '', [
		// 				{
		// 					text: 'Ok',
		// 					onPress: () => {
		// 						dispatch(logout());
		// 						dispatch(updateDeviceToken({deviceToken: ''}));
		// 						dispatch(resetProfileData({}));
		// 					}
		// 				}
		// 			]);
		// 			return;
		// 		}
		// 	}
		// }
		getCategory()
			.then(res => {
				console.log('getCategoryData :: getCategory :: res ::', res);
				setCategoryData(res?.data?.category);
				setIsNoCategoryData(res?.data?.category?.length === 0 ? true : false);
				setDurationHelpTitle(res?.data?.betParticipationTimeSlug?.title);
				setDurationdHelp(res?.data?.betParticipationTimeSlug?.content);
			})
			.catch(err => {
				console.log('getCategoryData :: getCategory :: catch ::', err);
			});
	};

	const getSubCategoryData = (categoryID: string) => {
		getSubcategory(categoryID)
			.then(res => {
				console.log('getSubCategoryData :: getSubcategory :: res ::', res);
				setSubCategoryData(res?.data?.subcategory);
				setIsNoSubCategoryData(
					res?.data?.subcategory?.length === 0 ? true : false
				);
			})
			.catch(err => {
				console.log('getSubCategoryData :: getSubcategory :: catch ::', err);
			});
	};

	const getLeagueData = (id?: any, searchText?: any, catagoryId?: any) => {
		Keyboard.dismiss();
		if (pageLeague === 0) {
			dispatch(updateApiLoader({apiLoader: true}));
		}
		const uploadData = {
			skip: pageLeague,
			limit: '10',
			category_id: catagoryId ?? catagoryId ?? isCategoryId,
			sub_category_id: id ?? isSubCategoryId,
			search: searchText ?? searchLeagueText
		};
		getLeagueList(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));

				console.log('getLeagueData :: getLeagueList :: res ::', res);
				if (pageLeague !== 0) {
					setLeagueData(leagueData?.concat(res?.data?.leagues));
					setIsNoLeagueData(leagueData?.length === 0 ? true : false);
				} else {
					setLeagueData(res?.data.leagues);
					setIsNoLeagueData(res?.data?.leagues?.length === 0 ? true : false);
				}
				setTotalLeagues(res?.data?.total_leagues);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getLeagueData :: getLeagueList :: catch ::', err);
			});
	};

	const getBetTypeData = () => {
		getBetType()
			.then(res => {
				console.log('getBetTypeData :: getBetType :: res ::', res);
				setBetTypeData(res?.data?.bet);
				setIsSelectBetsType(res?.data?.bet[0]);
				setBetTypNeedHelpTitle(res?.data?.content?.title);
				setBetTypNeedHelp(res?.data?.content?.content);
				seIsProgress('20%');
				seIsTitle(Strings.letSetUPYourBet + userInfo.user.userName);
				setIsNoGameData(false);
				setIsBackButtonDisable(false);
				setStep(2);
			})
			.catch(err => {
				console.log('getBetTypeData :: getBetType :: catch ::', err);
			});
	};

	const getAllMatchData = () => {
		if (pageGame === 0) {
			dispatch(updateApiLoader({apiLoader: true}));
		}

		const uploadData = {
			skip: pageGame,
			limit: '10',
			category_id: isCategoryId,
			sub_category_id: isSubCategoryId,
			league_id: isLeagueId
		};

		getAllMatch(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));

				console.log('getAllMatchData :: getAllMatch :: res ::', res);
				if (pageGame !== 0) {
					setGameData(gameData.concat(res?.data?.matchList));
					setIsNoGameData(gameData.length === 0 ? true : false);
				} else {
					setGameData(res?.data?.matchList);
					setIsNoGameData(res?.data?.matchList?.length === 0 ? true : false);
				}
				setTotalGames(res?.data?.matchCount);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getAllMatchData :: getAllMatch :: catch ::', err);
			});
	};

	const getMainMarketData = () => {
		dispatch(updateApiLoader({apiLoader: true}));

		getMainMarket(selectedGame?._id)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log(
					'getMainMarketData :: getMainMarket :: res ::',
					JSON.stringify(res)
				);
				setMainMarketData(res?.data?.market);
				setBetTypNeedHelpTitle(res?.data?.content?.title);
				setBetTypNeedHelp(res?.data?.content?.content);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getMainMarketData :: getMainMarket :: catch ::', err);
			});
	};

	const getTokenTypeData = () => {
		dispatch(updateApiLoader({apiLoader: true}));

		const uploadData = {
			matchId: selectedGame?.matchId,
			marketId: isSelectMainMarket?._id,
			market: isSelectSubMainMarket?.oddName
		};
		getTokenType(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));

				console.log(
					'getTokenTypeData :: getTokenType :: res ::',
					JSON.stringify(res)
				);
				setCurrencyData(res?.data?.tokens);
				if (Object.keys(isSelectCurrency).length === 0) {
					setIsSelectCurrency(res?.data?.tokens[0]);
				}
				setBetOdds(res?.data?.odds);
				console.log(
					'getTokenTypeData :: getTokenType :: isSelectedLeagueType ::',
					isSelectedLeagueType
				);
				if (isSelectedLeagueType !== 0) {
					let copy = [...res?.data?.odds];
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

					setSelectedBetOdds(res?.data?.odds[index1]);
					setSelectedOddsIndex(index1);
				}
				console.log(
					'getTokenTypeData :: getTokenType :: res :: res?.data.odds[0] ::',
					res?.data?.odds[0]
				);
				setWinningPercentage(res?.data?.winningPercentage);
				setBetWinningHelpTitle(res?.data?.tokenContent?.title);
				setBetWinningHelp(res?.data?.tokenContent?.content);

				setBetAboutHelpTitle(res?.data?.betContent?.title);
				setBetAboutHelp(res?.data?.betContent?.content);

				setBetOddHelpTitle(res?.data?.oddsContent?.title);
				setBetOddHelp(res?.data?.oddsContent?.content);

				seIsProgress('60%');
				seIsTitle(Strings.how_much_do_you_want_to_bet);
				setIsBackButtonDisable(true);
				setBetAmount('');
				setBetUsdAmount('');
				if (!connector.connected) {
					// setInfoPopUpType(2);
					// setModalLeagueVisible(true);
				}
				setStep(6);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getTokenTypeData :: getTokenType :: catch ::', err);
			});
	};

	const getRandomNumberData = () => {
		getRandomNumber('bet')
			.then(res => {
				console.log('getRandomNumberData :: getRandomNumber :: res ::', res);
				setUniqId(res?.data);
			})
			.catch(err => {
				console.log('getRandomNumberData :: getRandomNumber :: catch ::', err);
			});
	};

	const addBetData = async () => {
		let uploadData = {};

		if (isSelectedLeagueType === 0) {
			const type0Odds =
				isSelectSubMainMarket === undefined
					? isSelectMainMarket
					: isSelectSubMainMarket;
			uploadData = {
				category_id: isCategoryId,
				sub_category_id: isSubCategoryId,
				league_id: isLeagueId,
				bet_type_id: isSelectBetsType?._id,
				match_id: selectedGame?.gmt_timestamp ? selectedGame?._id : undefined,
				live_feed_id: params?.live_feed_id ?? undefined,
				market_id: isSelectMainMarket?._id,
				market_sub_name: isSelectSubMainMarket?.oddName,
				coin_id: isSelectCurrency?._id,
				bet_amount: betAmount?.replace(',', '.'),
				bet_amount_usd: betUsdAmount,
				isLiveBet: params?.isLive ?? false,
				betQuestion:
					isSelectSubMainMarket === undefined
						? isSelectMainMarket?.market_name
						: isSelectMainMarket?.market_name +
						  ' : ' +
						  isSelectSubMainMarket?.oddName,
				betOptionOne: type0Odds?.decimalName,
				betOptionTwo: type0Odds?.oppositeDecimalName,
				odds:
					isSelectChooseSideType === type0Odds?.decimalName
						? type0Odds?.decimal + ''
						: type0Odds?.oppositeDecimal + '',
				opposite_odds:
					isSelectChooseSideType !== type0Odds?.decimalName
						? type0Odds?.decimal + ''
						: type0Odds?.oppositeDecimal + '',
				//match_side_id: isSelectChooseSideType,
				// opposite_team_name:
				//   isSelectChooseSideType === selectedGame.visitorTeamId
				//     ? selectedGame.localTeamName
				//     : selectedGame.visitorTeamName,
				// local_team_name:
				//   isSelectChooseSideType === selectedGame.localTeamId
				//     ? selectedGame.localTeamName
				//     : selectedGame.visitorTeamName,
				// match_opposite_side_id:
				//   isSelectChooseSideType === selectedGame.visitorTeamId
				//     ? selectedGame.localTeamId
				//     : selectedGame.visitorTeamId,
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
						: type0Odds?.oppositeDecimalName + '',

				is_public: isPrivacy === 0 ? true : false,
				invited_friends_id:
					isPrivacy === 1 ? isSelectFollowUser?.user?._id : '',
				bet_id: bet_id,
				opposite_bet_amount: opposite_bet_amount + '',
				bet_type: '0',
				parent_bet_id: bet_id
			};
			// await analytics().logEvent('calledP2pBetApi', {
			// 	id: bet_id,
			// 	item: 'p2pBetSmartContractCalled',
			// 	description: JSON.stringify(uploadData)
			// });
		} else if (isSelectedLeagueType === 1) {
			let betEndDate = Date.parse(moment.utc(customDate));
			let participationEndDate = Date.parse(moment.utc(betEndTime));
			if (Platform.OS === 'web') {
				betEndDate = Date.parse(customDate);
				participationEndDate = Date.parse(betEndTime);
			}

			uploadData = {
				custom_unique_id: uniqId,
				category_id: isCategoryId,
				sub_category_id: isSubCategoryId || undefined,
				coin_id: isSelectCurrency?._id,
				bet_amount: betAmount.replace(',', '.'),
				bet_amount_usd: betUsdAmount,
				odds: selectedBetOdds?.decimal + '',
				opposite_odds: selectedBetOdds?.oppositeDecimal + '',
				is_public: isPrivacy === 0 ? true : false,
				invited_friends_id:
					isPrivacy === 1 ? isSelectFollowUser?.user?._id : '',
				bet_id: bet_id,
				isLiveBet: params?.isLive ?? false,
				betQuestion: question,
				betOptionOne: options1,
				betOptionTwo: options2,
				betEndDate: betEndDate + '',
				live_feed_id: params?.live_feed_id ?? undefined,
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
				parent_bet_id: bet_id
			};
			// await analytics().logEvent('calledP2pBetApi', {
			// 	id: bet_id,
			// 	item: 'p2pBetSmartContractCalled',
			// 	description: JSON.stringify(uploadData)
			// });
		} else if (isSelectedLeagueType === 2) {
			uploadData = {
				category_id: isCategoryId,
				sub_category_id: isSubCategoryId,
				league_id: isLeagueId,
				bet_type_id: isSelectBetsType?._id,
				match_id: selectedGame?.gmt_timestamp ? selectedGame._id : undefined,
				coin_id: isSelectCurrency?._id,
				bet_amount: betAmount.replace(',', '.'),
				bet_amount_usd: betUsdAmount,
				odds: selectedBetOdds?.decimal + '',
				isLiveBet: params?.isLive ?? false,
				opposite_odds: selectedBetOdds?.oppositeDecimal + '',
				live_feed_id: params?.live_feed_id ?? undefined,
				is_public: isPrivacy === 0 ? true : false,
				invited_friends_id:
					isPrivacy === 1 ? isSelectFollowUser?.user?._id : '',
				bet_id: bet_id,
				betQuestion: question,
				betOptionOne: options1,
				betOptionTwo: options2,
				bet_creator_side_option: isSelectChooseSideType,
				bet_creator_side_option_index:
					isSelectChooseSideType === options2 ? 1 : 0,
				bet_opposite_side_option_index:
					isSelectChooseSideType === options2 ? 0 : 1,
				bet_opposite_side_option:
					isSelectChooseSideType === options2 ? options1 : options2,
				opposite_bet_amount:
					(
						parseFloat(betAmount.replace(',', '.')) *
							parseFloat(selectedBetOdds?.decimal) -
						parseFloat(betAmount.replace(',', '.'))
					).toFixed(decimalValue) + '',
				bet_type: '2',
				parent_bet_id: bet_id
			};
			// await analytics().logEvent('calledP2pBetApi', {
			// 	id: bet_id,
			// 	item: 'p2pBetSmartContractCalled',
			// 	description: JSON.stringify(uploadData)
			// });
		}

		addBet(uploadData)
			.then(res => {
				dispatch(updateFeedRefreshOnFocus(true));
				console.log('addBetData :: addBet :: res ::', JSON.stringify(res));
				setTimeout(() => {
					if (isPrivacy === 0) {
						seIsProgress('100%');
						seIsTitle(
							Strings.well_done_bet_has_been_created.replace(
								'%s',
								userInfo?.user?.displayName || userInfo?.user?.userName
							)
						);
						setIsBackButtonDisable(true);

						// setShareUrl(createMatchDetailsShareUrl(Strings.feed, selectedGame?._id, 1));
						setShareUrl(createJoinBetShareUrl(res?.data?.bets?._id));

						setStep(10);
						setShareMessage(
							createJoinBetShareMessage(
								userInfo?.user?.displayName || userInfo?.user?.userName,
								res?.data?.bets?.betQuestion,
								res?.data?.bets?._id
							)
						);
						setIsViewNextBackBtn(false);
					} else if (isPrivacy === 1) {
						seIsProgress('100%');
						seIsTitle('');
						setStep(11);
						setIsViewNextBackBtn(false);
					}
					dispatch(updateApiLoader({apiLoader: false}));
				}, 500);
			})
			.catch(err => {
				setIsBackButtonDisable(false);
				console.log('addBetData :: addBet :: catch ::', err);
				dispatch(updateApiLoader({apiLoader: false}));
			});
	};

	useEffect(() => {
		if (searchCategoryText.trim().length > 0) {
			let temList = [...categoryData];
			let filteredData = temList?.filter(function (item) {
				return item?.name
					.toLowerCase()
					.includes(searchCategoryText?.trim().toLowerCase());
			});
			setSearchCategoryData([...filteredData]);
			setIsNoCategoryData(filteredData?.length === 0 ? true : false);
		}
	}, [searchCategoryText]);

	const categoryArray = useMemo(() => {
		return searchCategoryText.trim().length > 0
			? searchCategoryData
			: categoryData;
	}, [searchCategoryText, categoryData, searchCategoryData]);

	useEffect(() => {
		if (searchSubCategoryText.trim().length > 0) {
			let temList = [...subCategoryData];
			let filteredData = temList.filter(function (item) {
				return item?.name
					.toLowerCase()
					.includes(searchSubCategoryText.trim().toLowerCase());
			});
			setSearchSubCategoryData([...filteredData]);
			setIsNoSubCategoryData(filteredData?.length === 0 ? true : false);
		}
	}, [searchSubCategoryText]);

	const subCategoryArray = useMemo(() => {
		return searchSubCategoryText.trim().length > 0
			? searchSubCategoryData
			: subCategoryData;
	}, [searchSubCategoryText, subCategoryData, searchSubCategoryData]);

	useEffect(() => {
		if (searchLeagueText.trim().length > 2) {
			pageLeague = 0;
			getLeagueData();
		} else if (searchLeagueText.trim().length === 0 && isSubCategoryId !== '') {
			pageLeague = 0;
			getLeagueData();
		}
	}, [debouncedLeagueValue]);

	const renderCategoryItem = ({item, index}) => (
		<SportsCategory
			title={item.name.toUpperCase()}
			imgPath={item.imageUrl}
			onPress={() => {
				console.log(item);
				setIsCustomCategory(item?.isCustom);
				if (item?.isCustom && item?.subCategoryCount === 0) {
					setIsCategoryId(item._id);
					setIsSelectedCategory(item.name);
					setIsSelectedLeagueType(1);
					seIsProgress('20%');
					seIsTitle(Strings.let_create_market);
					setIsSelectResults(0);
					setStep(2);
					setQuestion('');
					setIsBackButtonDisable(true);
					setIsSelectMainMarket(undefined);
					setIsSelectSubMainMarket(undefined);
					setIsSelectedSubCategory('');
					setSearchLeagueText('');
					setIsSubCategoryId('');
					setIsLeagueId('');
				} else {
					setIsCategoryId(item._id);
					setIsSelectedCategory(item.name);
					setSubCategoryData([]);
					getSubCategoryData(item._id);
				}
			}}
			isSelected={isCategoryId === item._id ? true : false}
		/>
	);

	const renderSubCategoryItem = ({item, index}) => (
		<SportsComponent
			title={item.name.toUpperCase()}
			imgPath={item.imageUrl}
			onPress={async () => {
				console.log(item);
				if (isCustomCategory) {
					setLeagueData([]);
					setIsNoLeagueData(false);
					setIsLeagueId('');
					setIsSubCategoryId(item._id);
					setIsSelectedSubCategory(item.name);
					setIsSelectedLeagueType(1);
					seIsProgress('20%');
					seIsTitle(Strings.time_to_create_your_market);
					setIsSelectResults(0);
					setStep(2);
					setQuestion('');
					setIsBackButtonDisable(true);
					setIsSelectMainMarket(undefined);
					setIsSelectSubMainMarket(undefined);
				} else {
					setIsBackButtonDisable(true);
					setLeagueData([]);
					setIsNoLeagueData(false);
					setIsLeagueId('');
					await setSearchLeagueText('');
					setIsSubCategoryId(item._id);
					setIsSelectedSubCategory(item.name);
					pageLeague = 0;
					getLeagueData(item._id, '');
					setTimeout(async () => {
						const value = await AsyncStorage.getItem('isLeagueViewVisible');
						console.log('isLeagueViewVisible', value);
						if (value === null) {
							setInfoPopUpType(1);
							setModalLeagueVisible(true);
							AsyncStorage.setItem('isLeagueViewVisible', 'true');
						}
					}, 800);
				}
			}}
			isShadow={isSubCategoryId === item._id ? true : false}
		/>
	);

	const renderLeagueItem = ({item, index}) => (
		<LeagueView
			onPress={() => {
				setIsSelectedLeagueType(0);
				setIsLeagueId(item.leagueId);
				setIsSelectedLeague(item.name);
				setIsBackButtonDisable(false);
			}}
			title={
				item.name.toUpperCase() + (item?.country ? ' - ' + item?.country : '')
			}
			leftIcon={isLeagueId === item.leagueId ? icons.right : null}
		/>
	);

	const getConvertCurrency = async () => {
		// const condition = new RegExp(/^\d+(?:[.,]\d+)*$/gm);

		// const condition = new RegExp(/^\d+(\.\d{1,5})?$/gm); // old only accept dot
		const condition = new RegExp(/^\d+([,.]\d{1,5})?$/gm); // new accept dot and comma

		if (
			condition.test(betAmount.replace(',', '.')) &&
			parseFloat(betAmount.replace(',', '.')) > 0
		) {
			setAmountError(false);
			getConvertCurrencyData(isSelectCurrency?.short_name.toUpperCase())
				.then(async res => {
					console.log(
						'getConvertCurrency :: getConvertCurrencyData :: res ::',
						res
					);
					setBetUsdAmount(
						getRoundDecimalValue(
							parseFloat(res) * parseFloat(betAmount.replace(',', '.'))
						)
					);
					// if (parseFloat(res.rate) * parseFloat(betAmount) < 1) {
					//   await setAmountErrorMessage(
					//     Strings.bet_amount_must_be_more_than_1_USD,
					//   );
					//   setAmountError(true);
					//   return;
					// }
					setIsBackButtonDisable(false);
				})
				.catch(err => {
					setIsBackButtonDisable(false);
					console.log(
						'getConvertCurrency :: getConvertCurrencyData :: catch ::',
						err
					);
				});
		} else {
			await setAmountErrorMessage(Strings.please_enter_valid_amount);
			setAmountError(true);
		}
	};

	const validateBetsData = () => {
		const type0Odds =
			isSelectSubMainMarket === undefined
				? isSelectMainMarket
				: isSelectSubMainMarket;
		let uploadData = {
			type: 'create',
			live: params?.isLive,
			match_id: selectedGame?.gmt_timestamp ? selectedGame._id : undefined,
			bet_amount: betAmount.replace(',', '.'),
			opposite_odds:
				isSelectedLeagueType === 0
					? isSelectChooseSideType !== type0Odds?.decimalName
						? type0Odds?.decimal + ''
						: type0Odds?.oppositeDecimal + ''
					: selectedBetOdds?.decimal + '',
			odds:
				isSelectedLeagueType === 0
					? isSelectChooseSideType === type0Odds?.decimalName
						? type0Odds?.decimal + ''
						: type0Odds?.oppositeDecimal + ''
					: selectedBetOdds?.decimal + ''
		};
		console.log('validateBetsData :: uploadData :: ', uploadData);
		dispatch(updateApiLoader({apiLoader: true}));
		validateBets(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('validateBetsData :: validateBets :: res ::', res);
				setOpposite_bet_amount(res.data?.bet_opposite_amount);

				setBetJoinMessage(res?.data?.message);
				setTimeout(() => {
					if (res.data.isBet === true) {
						seIsProgress('80%');
						seIsTitle(Strings.you_are_almost_done + userInfo.user.userName);
						setIsBackButtonDisable(true);
						setStep(9);
					} else {
						setModalIsBetJoin(true);
					}
				}, 500);
			})
			.catch(err => {
				setIsBackButtonDisable(false);
				console.log('validateBetsData :: validateBets :: catch ::', err);
				dispatch(updateApiLoader({apiLoader: false}));
			});
	};

	const renderGameItem = ({item}) => (
		<GameSelectionView
			colorArray={
				selectedGame?._id === item._id
					? defaultTheme.primaryGradientColor
					: defaultTheme.ternaryGradientColor
			}
			onPress={() => {
				setSelectedGame(item);
				setIsBackButtonDisable(false);
				console.log(item);
			}}
			visitorTeamName={item.visitorTeamName}
			localTeamName={
				item.visitorTeamName && item.localTeamName
					? item.localTeamName
					: item.matchName
			}
			time={timeConvert(item.gmt_timestamp)}
			date={dateConvert(item.gmt_timestamp)}
		/>
	);

	const onShare = async (url: string) => {
		if (Platform.OS === 'web') {
			try {
				await navigator.share({
					url: url
				});
			} catch (error) {
				showErrorAlert('', error?.message);
			}
		} else {
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
				showErrorAlert('', error.message);
			}
		}
	};

	const showViews = () => {
		console.log('showViews ::', step);

		switch (step) {
			case 1:
				return (
					<>
						{isCategoryId !== '' ? (
							<View style={styles.viewTag}>
								<Text style={styles.categoryLabelStyle}>
									{Strings.category.toUpperCase()}
								</Text>

								<SelecteableTag
									text={isSelectedCategory?.toUpperCase()}
									onPress={() => {
										setSearchCategoryText('');
										setSearchSubCategoryText('');
										setSearchLeagueText('');

										setIsCategoryId('');
										setIsSubCategoryId('');
										setIsLeagueId('');

										setIsSelectedCategory('');

										pageLeague = 0;
										setIsSelectedLeagueType(-1);
										setIsBackButtonDisable(true);
									}}
								/>
							</View>
						) : null}

						{isCategoryId === '' ? (
							<>
								<InputComponent
									fontSize={moderateScale(12)}
									style={styles.marginInput}
									placeholder={Strings.searchCategory.toUpperCase()}
									onLeftIconPath={icons.search}
									onChangeText={(text: string) => {
										setSearchCategoryText(text);
									}}
								/>
								<FlatList
									numColumns={2}
									data={categoryArray}
									showsVerticalScrollIndicator={false}
									bounces={false}
									renderItem={renderCategoryItem}
									style={styles.sportsFlatList}
									keyExtractor={item => item._id}
									ListEmptyComponent={() =>
										isNoCategoryData && (
											<Text style={styles.noDataStyle}>
												{Strings.no_Data_Found}
											</Text>
										)
									}
								/>
							</>
						) : null}

						{isCategoryId !== '' ? (
							<View>
								<InputComponent
									fontSize={moderateScale(12)}
									style={styles.marginInput}
									placeholder={(
										Strings.searchText + isSelectedCategory
									).toUpperCase()}
									onLeftIconPath={icons.search}
									onChangeText={(text: string) => {
										setSearchSubCategoryText(text);
									}}
								/>
								<FlatList
									horizontal
									ref={flatListRef}
									data={subCategoryArray}
									showsHorizontalScrollIndicator={false}
									renderItem={renderSubCategoryItem}
									bounces={false}
									keyExtractor={item => item._id}
									contentContainerStyle={{
										height: 126
									}}
									ListEmptyComponent={() =>
										isNoSubCategoryData && (
											<Text
												style={[
													styles.noDataStyle,
													{marginTop: verticalScale(60)}
												]}>
												{Strings.no_Data_Found}
											</Text>
										)
									}
								/>
							</View>
						) : null}

						{isSubCategoryId !== '' &&
							isSubCategoryId !== undefined &&
							!isCustomCategory && (
								<>
									<InputComponent
										placeholder={Strings.searchLeague.toUpperCase()}
										onLeftIconPath={icons.search}
										onChangeText={(text: string) => {
											setSearchLeagueText(text);
										}}
										textValue={searchLeagueText}
									/>
									<LeagueView
										onPress={() => {
											setIsSelectedLeagueType(1);
											seIsProgress('20%');
											seIsTitle(Strings.time_to_create_your_market);
											setIsSelectResults(0);
											setStep(2);
											setQuestion('');
											setIsBackButtonDisable(true);
											setIsSelectMainMarket(undefined);
											setIsSelectSubMainMarket(undefined);
										}}
										leftIcon={icons.plusGradient}
										title={Strings.createYour_Own.toUpperCase()}
										isGradient={true}
									/>
									<FlatList
										style={{
											marginTop: 5,
											marginBottom: 5
											// flex: 1,
										}}
										data={leagueData}
										//showsVerticalScrollIndicator={false}
										renderItem={renderLeagueItem}
										//bounces={false}
										// onEndReachedThreshold={0.1}
										// onEndReached={() => {
										//   if (totalLeagues !== leagueData.length) {
										//     pageLeague = pageLeague + 1;
										//     getLeagueData();
										//   }
										// }}
										onMomentumScrollEnd={e => {
											console.log(
												'onMomentumScrollEnd :: ',
												e.nativeEvent.contentOffset.y
											);
											if (
												totalLeagues !== leagueData.length &&
												e.nativeEvent.contentOffset.y > 0
											) {
												pageLeague = pageLeague + 1;
												getLeagueData();
											}
										}}
										indicatorStyle={'white'}
										keyExtractor={(item, index) => item._id + index}
										ListEmptyComponent={() =>
											isNoLeagueData && (
												<Text
													style={[
														styles.noDataStyle,
														{marginTop: verticalScale(60)}
													]}>
													{Strings.no_Data_Found}
												</Text>
											)
										}
									/>
								</>
							)}
					</>
				);
			case 2:
				return isSelectedLeagueType === 0 ? (
					<>
						<DynamicOptionView
							title={Strings.betType}
							userArray={betTypeData}
							style={styles.userInviteStyle}
							pervSelectedID={isSelectBetsType?._id}
							selectedObj={item => {
								setIsSelectBetsType(item);
								setIsBackButtonDisable(false);
							}}
						/>
						{/* {needHelp()} */}
					</>
				) : (
					<WriteQuestionView
						colorArray={
							isSelectResults === 0
								? defaultTheme.ternaryGradientColor
								: defaultTheme.primaryGradientColor
						}
						buttonTitle={'2 ' + Strings.results}
						onButtonPress={() => {
							setIsSelectResults(1);

							if (question.trim() !== '') {
								setIsBackButtonDisable(false);
							} else {
								setIsBackButtonDisable(true);
							}
						}}
						textValue={question}
						question={que => {
							setQuestion(que);
							if (que.trim() !== '' && isSelectResults === 1) {
								setIsBackButtonDisable(false);
							} else {
								setIsBackButtonDisable(true);
							}
						}}
					/>
				);
			case 3:
				return isSelectedLeagueType === 0 ? (
					<FlatList
						// contentContainerStyle={{flex: 1}}
						data={gameData}
						showsVerticalScrollIndicator={false}
						renderItem={renderGameItem}
						bounces={false}
						// onEndReachedThreshold={0.5}
						// onMomentumScrollEnd={() => {
						//   if (totalGames !== gameData.length) {
						//     pageGame = pageGame + 1;
						//     getAllMatchData();
						//   }
						// }}
						keyExtractor={(item, index) => item._id + index}
						ListEmptyComponent={() =>
							isNoGameData && (
								<Text style={styles.noDataStyle}>{Strings.no_Data_Found}</Text>
							)
						}
						onMomentumScrollEnd={e => {
							console.log(
								'onMomentumScrollEnd????',
								e.nativeEvent.contentOffset.y
							);
							if (
								totalGames !== gameData.length &&
								e.nativeEvent.contentOffset.y > 10
							) {
								pageGame = pageGame + 1;
								getAllMatchData();
							}
						}}
					/>
				) : (
					<SetAnsOptionView
						ansValue1={options1}
						setAns1={ans => {
							setOptions1(ans);
							if (ans.trim() !== '' && options2.trim() !== '') {
								setIsBackButtonDisable(false);
							} else {
								setIsBackButtonDisable(true);
							}
							setIsSameOption(false);
						}}
						ansValue2={options2}
						setAns2={ans => {
							setOptions2(ans);
							if (ans.trim() !== '' && options1.trim() !== '') {
								setIsBackButtonDisable(false);
							} else {
								setIsBackButtonDisable(true);
							}
							setIsSameOption(false);
						}}
						isSameOption={isSameOption}
					/>
				);
			case 4:
				return isSelectedLeagueType === 0 ? (
					<KeyboardAwareScrollView
						bounces={false}
						showsVerticalScrollIndicator={false}>
						{mainMarketData.length > 0 ? (
							<MainMarketOptionSelectionView
								title={Strings.mainMarkets}
								userArray={mainMarketData}
								style={styles.userInviteStyle}
								pervSelectedMarketID={isSelectMainMarket?._id}
								pervSelectedSubMarketID={isSelectSubMainMarket?._id}
								selectedMainMarketObj={item => {
									setIsSelectMainMarket(item);
									setIsSelectSubMainMarket(undefined);

									if (item?.sub_market?.length !== 0) {
										setIsBackButtonDisable(true);
									} else {
										setIsBackButtonDisable(false);
									}
								}}
								selectedSubMainMarketObj={item => {
									console.log('selectedSubMainMarketObj :: item ::', item);
									if (item) {
										setIsSelectSubMainMarket(item);
										setIsBackButtonDisable(false);
									} else {
										if (item?.sub_market?.length !== 0) {
											setIsSelectSubMainMarket(null);
											setIsBackButtonDisable(true);
										} else {
											setIsBackButtonDisable(false);
										}
									}
								}}
							/>
						) : null}
						{needHelp()}
						<OptionSelectionView
							color1Array={defaultTheme.primaryGradientColor}
							popupTitle={Strings.createYour_Own}
							button1Title={Strings.writeInBetDescription}
							onButton1Press={() => {
								setIsSelectMainMarket(undefined);
								setIsSelectSubMainMarket(undefined);

								setIsSelectedLeagueType(2);
								// seIsProgress('20%');
								seIsTitle(Strings.time_to_create_your_market);
								setIsSelectResults(0);
								setQuestion('');
								setOptions1('');
								setOptions2('');
								setStep(2);
								setIsBackButtonDisable(true);
							}}
						/>
					</KeyboardAwareScrollView>
				) : (
					<SetDurationView
						setSelectedDate={date => {
							setCustomDate(date);
							console.log('setSelectedDate ::', date);
							if (date) {
								setIsBackButtonDisable(false);
							} else {
								setIsBackButtonDisable(true);
							}
						}}
						selectedDate={customDate}
						isTimePick={isPickEndTime}
						onTimePress={() => {
							setPickEndTime(previousState => !previousState);
						}}
						setEndSelectedDate={date => {
							setbetEndTime(date);
							console.log('setEndSelectedDate ::', date);
						}}
						selectedEndDate={betEndTime}
						onPressNeedHelp={() => {
							setModalVisibleType(4);
							setModalNeedHelpVisible(true);
						}}
					/>
				);
			case 5:
				return isSelectedLeagueType === 0 ? (
					<OptionSelectionView
						color1Array={
							isSelectChooseSideType ===
							(isSelectSubMainMarket === undefined
								? isSelectMainMarket?.decimalName
								: isSelectSubMainMarket?.decimalName)
								? defaultTheme.primaryGradientColor
								: defaultTheme.ternaryGradientColor
						}
						color2Array={
							isSelectChooseSideType ===
							(isSelectSubMainMarket === undefined
								? isSelectMainMarket?.oppositeDecimalName
								: isSelectSubMainMarket?.oppositeDecimalName)
								? defaultTheme.primaryGradientColor
								: defaultTheme.ternaryGradientColor
						}
						popupTitle={
							isSelectSubMainMarket === undefined
								? isSelectMainMarket?.market_name
								: isSelectMainMarket?.market_name +
								  ' : ' +
								  isSelectSubMainMarket?.oddName
						}
						button1Title={
							isSelectSubMainMarket === undefined
								? isSelectMainMarket?.decimalName
								: isSelectSubMainMarket?.decimalName
						}
						button2Title={
							isSelectSubMainMarket === undefined
								? isSelectMainMarket?.oppositeDecimalName
								: isSelectSubMainMarket?.oppositeDecimalName
						}
						isShowSecondButton={true}
						onButton1Press={() => {
							setIsSelectChooseSideType(
								isSelectSubMainMarket === undefined
									? isSelectMainMarket?.decimalName
									: isSelectSubMainMarket?.decimalName
							);
							setSelectedBetOdds(
								isSelectSubMainMarket === undefined
									? isSelectMainMarket
									: isSelectSubMainMarket
							);
							setIsBackButtonDisable(false);
						}}
						onButton2Press={() => {
							setSelectedBetOdds(
								isSelectSubMainMarket === undefined
									? isSelectMainMarket
									: isSelectSubMainMarket
							);
							setIsSelectChooseSideType(
								isSelectSubMainMarket === undefined
									? isSelectMainMarket?.oppositeDecimalName
									: isSelectSubMainMarket?.oppositeDecimalName
							);
							setIsBackButtonDisable(false);
						}}
						textType={'capitalize'}
					/>
				) : (
					<KeyboardAwareScrollView
						bounces={false}
						showsVerticalScrollIndicator={false}>
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
							popupTitle={question.trim()}
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
						/>
					</KeyboardAwareScrollView>
				);
			case 6: {
				const type0Odds =
					isSelectSubMainMarket === undefined
						? isSelectMainMarket
						: isSelectSubMainMarket;
				return (
					<KeyboardAwareScrollView
						bounces={false}
						showsVerticalScrollIndicator={false}>
						<PlaceBetsAmountView
							popupTitle={Strings.you_are_betting}
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
						/>
					</KeyboardAwareScrollView>
				);
			}
			case 7: {
				return (
					<KeyboardAwareScrollView
						bounces={false}
						showsVerticalScrollIndicator={false}>
						<SelectCryptoAmount
							addedAmount={betUsdAmount}
							data={currencyData}
							pervSelectedID={isSelectCurrency?._id}
							pervSelectedObj={isSelectCurrency}
							selectedObj={(item: any) => {
								if (item) {
									setIsSelectCurrency(item);
									switch (item?.short_name) {
										case 'MATIC':
											setCustomeSelectTokenId(0);
											break;
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
								} else {
									seIsProgress('60%');
									seIsTitle(Strings.how_much_do_you_want_to_bet);
									setIsBackButtonDisable(false);
									setStep(6);
								}
							}}
						/>
					</KeyboardAwareScrollView>
				);
			}
			case 8: {
				const type0Odds =
					isSelectSubMainMarket === undefined
						? isSelectMainMarket
						: isSelectSubMainMarket;
				console.log('type0Odds', type0Odds);
				return (
					<KeyboardAwareScrollView
						bounces={false}
						showsVerticalScrollIndicator={false}>
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
									(!isSelectedSubCategory ? '' : ' - ') +
									(isSelectedSubCategory?.toUpperCase() ?? '') ||
								+(isSelectedLeagueType === 0
									? ' - ' + isSelectedLeague.toUpperCase()
									: isSelectedLeagueType === 2
									? ' - ' + isSelectedLeague.toUpperCase()
									: '')
							}
							question={question}
							selectMainMarket={
								isSelectedLeagueType === 0
									? isSelectSubMainMarket === undefined
										? isSelectMainMarket?.market_name
										: isSelectMainMarket?.market_name +
										  ' : ' +
										  isSelectSubMainMarket?.oddName
									: question
							}
							isSelectedLeagueType={isSelectedLeagueType}
							localTeamName={
								isSelectedLeagueType === 0
									? isSelectChooseSideType !== type0Odds?.decimalName
										? type0Odds?.decimalName + ''
										: type0Odds?.oppositeDecimalName + ''
									: isSelectChooseSideType.trim() === options1.trim()
									? options2.trim()
									: options1.trim()
							}
							visitorTeamName={
								isSelectedLeagueType === 0
									? isSelectChooseSideType === type0Odds?.decimalName
										? type0Odds?.decimalName + ''
										: type0Odds?.oppositeDecimalName + ''
									: isSelectChooseSideType
							}
							isSelectCurrency={isSelectCurrency}
							betAmount={betAmount.replace(',', '.')}
							paysBetAmount={getRoundDecimalValue(
								parseFloat(betAmount.replace(',', '.')) *
									parseFloat(
										isSelectedLeagueType === 0
											? isSelectChooseSideType === type0Odds?.decimalName
												? type0Odds?.decimal + ''
												: type0Odds?.oppositeDecimal + ''
											: selectedBetOdds?.decimal
									)
							)}
							paysBetUsdAmount={getRoundDecimalValue(
								parseFloat(betUsdAmount) *
									parseFloat(
										isSelectedLeagueType === 0
											? isSelectChooseSideType === type0Odds?.decimalName
												? type0Odds?.decimal + ''
												: type0Odds?.oppositeDecimal + ''
											: selectedBetOdds?.decimal
									)
							)}
							betUsdAmount={betUsdAmount}
							betOdds={
								isSelectedLeagueType === 0
									? isSelectChooseSideType === type0Odds?.decimalName
										? type0Odds?.decimal + ''
										: type0Odds?.oppositeDecimal + ''
									: selectedBetOdds?.decimal + ''
							}
							oppositeBetOdds={
								isSelectedLeagueType === 0
									? isSelectChooseSideType !== type0Odds?.decimalName
										? type0Odds?.decimal + ''
										: type0Odds?.oppositeDecimal + ''
									: selectedBetOdds?.oppositeDecimal + ''
							}
							winningPercentage={winningPercentage + ''}
							selectMySideType={
								isSelectedLeagueType === 0
									? isSelectChooseSideType === selectedGame.localTeamId
										? selectedGame.localTeamName
										: selectedGame.visitorTeamName
									: isSelectChooseSideType
							}
							selectedGameData={
								isSelectedLeagueType === 1 ? null : selectedGame
							}
							gameEndTime={
								isSelectedLeagueType === 1
									? moment(customDate).format('HH:mm')
									: timeConvert(
											selectedGame?.match_end_time ??
												selectedGame?.end_date_time
									  )
							}
							gameEndDate={
								isSelectedLeagueType === 1
									? moment(customDate).format('DD MMM YYYY - ')
									: dateConvert(
											selectedGame?.match_end_time ??
												selectedGame?.end_date_time,
											'DD MMM YYYY - '
									  )
							}
							onPressNeedHelp={() => {
								setModalVisibleType(1);
								setModalNeedHelpVisible(true);
							}}
							profileImgPath={userInfo?.user?.picture}
							joinEndTime={
								isSelectedLeagueType === 1
									? isPickEndTime
										? moment(betEndTime).format('DD MMM YYYY - ') +
										  moment(betEndTime).format('HH:mm')
										: moment(customDate).format('DD MMM YYYY - ') +
										  moment(customDate).format('HH:mm')
									: dateConvert(
											selectedGame?.gmt_timestamp ??
												selectedGame?.end_date_time,
											'DD MMM YYYY - ',
											5
									  ) +
									  timeConvert(
											selectedGame?.gmt_timestamp ??
												selectedGame?.end_date_time,
											5
									  )
							}
							oppositeBetUsdAmount={
								parseFloat(betUsdAmount.replace(',', '.')) *
									parseFloat(
										isSelectedLeagueType === 0
											? isSelectChooseSideType === type0Odds?.decimalName
												? type0Odds?.decimal + ''
												: type0Odds?.oppositeDecimal + ''
											: selectedBetOdds?.decimal + ''
									) -
								parseFloat(betUsdAmount.replace(',', '.')) +
								''
							}
						/>
						{isSelectCurrency?.short_name !== 'DBETH' && <EarningsProfitView />}
					</KeyboardAwareScrollView>
				);
			}
			case 9:
				return (
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
				);
			case 10:
				return isPrivacy === 0 ? (
					<KeyboardAwareScrollView
						bounces={false}
						showsVerticalScrollIndicator={false}>
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
									showErrorAlert('', Strings.copy_link_desc);
								} else {
									onShare(shareMessage);
								}
							}}
						/>
					</KeyboardAwareScrollView>
				) : (
					// <KeyboardAwareScrollView
					//   bounces={false}
					//   showsVerticalScrollIndicator={false}>
					<InviteFriendView
						title={Strings.add_participants}
						style={styles.userInviteStyle}
						pervSelectedID={isSelectFollowUser?._id}
						selectedObj={item => {
							setIsSelectFollowUser(item);
							setIsBackButtonDisable(false);
						}}
					/>
					// </KeyboardAwareScrollView>
				);
			case 11:
				return (
					<View style={styles.viewDoneStyle}>
						<Text style={styles.titleDoneStyle}>
							{Strings.well_done_bet_has_been_created.replace(
								'%s',
								userInfo?.user?.displayName || userInfo?.user?.userName
							)}
						</Text>
						{Platform.OS === 'web' ? (
							<Lottie
								style={{
									height: 300,
									width: 300,
									alignSelf: 'center',
									position: 'absolute'
								}}
								animationData={require('../../../../assets/animations/confetti_day.json')}
								loop={false}
							/>
						) : (
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

	const callNext = async () => {
		console.log('callNext :: step ::', step, isSelectedLeagueType);

		switch (step) {
			case 1:
				if (isSelectedLeagueType === 0) {
					getBetTypeData();
				} else if (isSelectedLeagueType === 1 && isCustomCategory) {
					setLeagueData([]);
					setIsNoLeagueData(false);
					setIsLeagueId('');
					seIsProgress('20%');
					seIsTitle(Strings.let_create_market);
					setIsSelectResults(0);
					setStep(2);
					setQuestion('');
					setIsBackButtonDisable(true);
					setIsSelectMainMarket(undefined);
					setIsSelectSubMainMarket(undefined);
				}

				break;
			case 2:
				setIsSelectMainMarket(undefined);
				setIsSelectSubMainMarket(undefined);
				if (isSelectedLeagueType === 0) {
					seIsProgress('30%');
					seIsTitle(Strings.select_a_game);
					setIsBackButtonDisable(true);
					setSelectedGame(null);
					pageGame = 0;
					setGameData([]);
					getAllMatchData();
					setStep(3);
				} else if (isSelectedLeagueType === 1) {
					seIsProgress('30%');
					seIsTitle(Strings.time_to_create_your_market);
					setIsBackButtonDisable(true);
					setStep(3);
					setOptions1('');
					setOptions2('');
				} else if (isSelectedLeagueType === 2) {
					seIsProgress('40%');
					seIsTitle(Strings.time_to_create_your_market);
					setIsBackButtonDisable(true);
					setStep(3);
					setOptions1('');
					setOptions2('');
				}
				break;
			case 3:
				if (isSelectedLeagueType === 0) {
					seIsProgress('40%');
					seIsTitle(Strings.select_a_market);
					setIsBackButtonDisable(true);
					getMainMarketData();
					setStep(4);
				} else if (isSelectedLeagueType === 1) {
					if (options1.toLowerCase().trim() === options2.toLowerCase().trim()) {
						setIsSameOption(true);
						return;
					} else {
						setIsSameOption(false);
					}

					seIsProgress('40%');
					seIsTitle(Strings.when_will_the_bet_end);
					setCustomDate(undefined);
					setPickEndTime(false);
					setIsBackButtonDisable(true);
					setStep(4);
				} else if (isSelectedLeagueType === 2) {
					if (options1.toLowerCase().trim() === options2.toLowerCase().trim()) {
						setIsSameOption(true);
						return;
					} else {
						setIsSameOption(false);
					}
					seIsProgress('50%');
					seIsTitle(Strings.choose_your_side);
					setIsBackButtonDisable(true);
					setStep(5);
					break;
				}
				break;
			case 4:
				seIsProgress('50%');
				seIsTitle(Strings.choose_your_side);
				setIsBackButtonDisable(true);
				setStep(5);
				break;
			case 5:
				getTokenTypeData();
				break;
			case 6:
				seIsProgress('70%');
				seIsTitle(Strings.select_the_crypto_to_use_in_this_bet);
				setIsBackButtonDisable(false);
				setStep(7);
				break;
			case 7:
				seIsProgress('70%');
				seIsTitle(Strings.review_your_bet);
				setIsBackButtonDisable(false);
				setStep(8);
				setBetAmount(
					getRoundDecimalValue(
						betUsdAmount / (isSelectCurrency?.tokenPriceUsd ?? 1)
					) + ''
				);
				getRandomNumberData();
				break;
			case 8:
				validateBetsData();
				break;
			case 9:
				console.log('asdasdasd', betAmount);
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
							showErrorAlert(
								Strings.txt_insufficient_balance,
								Strings.txt_add_more_fund
							);
							return;
						}
						getContractAllowance(isSelectCurrency.contractAddress);
						return;
					}

					//TODO: call contract
					if (parseFloat(betAmount.replace(',', '.')) > parseFloat(myBalance)) {
						setIsBackButtonDisable(false);
						showErrorAlert(
							Strings.txt_insufficient_balance,
							Strings.txt_add_more_fund
						);
						return;
					}
					let betEndDate = Date.parse(moment.utc(customDate));
					if (Platform.OS === 'web') {
						betEndDate = Date.parse(customDate);
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
					console.log('betAmount 12 ::', betAmount.replace(',', '.'));
					const type0Odds =
						isSelectSubMainMarket === undefined
							? isSelectMainMarket
							: isSelectSubMainMarket;

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
						_matchId: isSelectedLeagueType === 1 ? uniqId : selectedGame._id,
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
								: (selectedGame?.match_end_time ??
										selectedGame?.end_date_time) / 1000,
						_betAmount: betAmount.replace(',', '.'),
						_parentBetId: '0x0000000000000000000000000000000000000000',
						_totalBetOption: 3,
						_selectedBetMakerOption:
							isSelectChooseSideType === (type0Odds?.decimalName || options1)
								? 0
								: 1,
						_ISCUSTOMIZED: isSelectedLeagueType !== 0
					});
				} else if (isPrivacy === 1) {
					seIsProgress('90%');
					seIsTitle(Strings.invite_your_friends);
					setIsBackButtonDisable(true);
					setNextBtnTitle(Strings.send_invite);
					setStep(10);
					setIsSelectFollowUser({});
				}
				break;
			case 10:
				if (isSelectCurrency.name !== 'MATIC') {
					getBalanceAsync(isSelectCurrency.contractAddress);
				} else {
					getBalance(userInfo.user.walletAddress ?? connector?.accounts[0]);
				}

				//TODO: call contract
				setIsBackButtonDisable(true);

				if (isSelectCurrency.name !== 'MATIC') {
					if (
						parseFloat(betAmount.replace(',', '.')) > parseFloat(dbethBalance)
					) {
						setIsBackButtonDisable(false);
						showErrorAlert(
							Strings.txt_insufficient_balance,
							Strings.txt_add_more_fund
						);
						return;
					}
					getContractAllowance(isSelectCurrency.contractAddress);
					return;
				}

				//TODO: call contract
				if (parseFloat(betAmount.replace(',', '.')) > parseFloat(myBalance)) {
					setIsBackButtonDisable(false);
					showErrorAlert(
						Strings.txt_insufficient_balance,
						Strings.txt_add_more_fund
					);
					return;
				}

				let betEndDate = Date.parse(moment.utc(customDate));
				if (Platform.OS === 'web') {
					betEndDate = Date.parse(customDate);
				}
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
				const type0Odds =
					isSelectSubMainMarket === undefined
						? isSelectMainMarket
						: isSelectSubMainMarket;
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
					_matchId: isSelectedLeagueType === 1 ? uniqId : selectedGame._id,
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
							: (selectedGame?.match_end_time ?? selectedGame?.end_date_time) /
							  1000,
					_betAmount: betAmount.replace(',', '.'),
					_parentBetId: '0x0000000000000000000000000000000000000000',
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
		console.log('callBackButton :: step ::', step);

		switch (step) {
			case 1:
				if (isCategoryId === '') {
					navigation.goBack();
				}

				if (params?.isfromTrendingNotification) {
					navigation.goBack();
				}

				setSearchCategoryText('');
				setSearchSubCategoryText('');
				// setSearchLeagueText('');

				setIsCategoryId('');
				setIsSubCategoryId('');
				setIsLeagueId('');

				setIsSelectedCategory('');

				pageLeague = 0;
				setIsSelectedLeagueType(0);
				setIsBackButtonDisable(true);

				break;
			case 2:
				if (
					params?.isfromTrendingNotification &&
					params?.matchData?.categories?.isCustom
				) {
					navigation.goBack();
				}
				if (params?.isLive) {
					navigation.goBack();
				} else if (isSelectedLeagueType === 2) {
					seIsProgress('40%');
					seIsTitle(Strings.select_a_market);
					setIsBackButtonDisable(true);
					setIsSelectChooseSideType(null);
					setIsSelectedLeagueType(0);
					setStep(4);
				} else {
					if (isCustomCategory && isSubCategoryId === '') {
						setSearchCategoryText('');
						setSearchSubCategoryText('');
						setSearchLeagueText('');

						setIsCategoryId('');
						setIsSubCategoryId('');
						setIsLeagueId('');

						setIsSelectedCategory('');

						pageLeague = 0;
						setIsSelectedLeagueType(-1);
					}

					seIsProgress('10%');
					setSearchSubCategoryText('');

					seIsTitle(Strings.whatAreYouBettingOn);
					if (isCategoryId === '') {
						setIsBackButtonDisable(true);
					} else if (isSubCategoryId === '') {
						setIsBackButtonDisable(true);
					} else {
						setIsBackButtonDisable(
							isSelectedLeague === '' && isSelectedLeagueType === 0
								? true
								: false
						);
					}

					setIsSelectedLeagueType(isCustomCategory ? 1 : 0);
					setStep(1);
				}

				break;
			case 3:
				if (isSelectedLeagueType === 0) {
					seIsProgress('20%');
					seIsTitle(Strings.letSetUPYourBet + userInfo.user.userName);
					setIsBackButtonDisable(false);
					setSelectedGame(null);
					setStep(2);
				} else if (isSelectedLeagueType === 1) {
					seIsProgress('20%');
					seIsTitle(Strings.let_create_market);
					setIsBackButtonDisable(true);
					setIsSelectResults(0);
					setStep(2);
				} else if (isSelectedLeagueType === 2) {
					seIsProgress('20%');
					seIsTitle(Strings.time_to_create_your_market);
					setIsBackButtonDisable(true);
					setIsSelectResults(0);
					setStep(2);
				}
				break;
			case 4:
				if (params?.betCreationType === 1) {
					navigation.goBack();
				} else {
					if (isSelectedLeagueType === 0) {
						seIsProgress('30%');
						seIsTitle(Strings.select_a_game);
						setIsBackButtonDisable(false);
						setIsSelectMainMarket(undefined);

						setStep(3);
					} else if (isSelectedLeagueType === 1) {
						seIsProgress('30%');
						seIsTitle(Strings.time_to_create_your_market);
						setIsBackButtonDisable(false);
						setStep(3);
					}
				}

				break;
			case 5:
				if (isSelectedLeagueType === 0) {
					seIsProgress('40%');
					seIsTitle(Strings.select_a_market);
					setIsBackButtonDisable(false);
					setIsSelectChooseSideType(null);
					setStep(4);
				} else if (isSelectedLeagueType === 1) {
					seIsProgress('40%');
					seIsTitle(Strings.when_will_the_bet_end);
					setIsBackButtonDisable(false);
					setIsSelectChooseSideType(null);
					setStep(4);
				} else if (isSelectedLeagueType === 2) {
					seIsProgress('30%');
					seIsTitle(Strings.time_to_create_your_market);
					setIsBackButtonDisable(false);
					setIsSelectChooseSideType(null);

					setStep(3);
				}
				break;
			case 6:
				seIsProgress('50%');
				seIsTitle(Strings.choose_your_side);
				setIsBackButtonDisable(false);
				setStep(5);
				break;
			case 7:
				seIsProgress('60%');
				seIsTitle(Strings.how_much_do_you_want_to_bet);
				setIsBackButtonDisable(false);
				setStep(6);
				break;
			case 8:
				seIsProgress('70%');
				seIsTitle(Strings.select_the_crypto_to_use_in_this_bet);
				setIsBackButtonDisable(false);
				setStep(7);
				break;
			case 9:
				seIsProgress('70%');
				seIsTitle(Strings.review_your_bet);
				setIsBackButtonDisable(false);
				setStep(8);
				setIsPrivacy(-1);
				break;

			case 10:
				seIsProgress('80%');
				seIsTitle(Strings.you_are_almost_done);
				setStep(9);
				setIsBackButtonDisable(isPrivacy === -1 ? true : false);
				setIsViewNextBackBtn(true);
				setNextBtnTitle(Strings.next);
				break;
		}
	};
	const connectMetaMask = async () => {
		const success = await connector.connect();
		if (success) {
			console.log(
				'connectMetaMask :: success :: inside if ::',
				success?.accounts[0]
			);
			getBalance(success?.accounts[0]);
			// console.log('res balance', res);
			// setCurrentBalance(parseFloat(res).toPrecision(5));
		} else {
			console.log(
				'connectMetaMask :: success :: inside else ::',
				success?.accounts[0]
			);
			getBalance(userInfo.user.walletAddress);
		}
	};

	const needHelp = () => {
		return (
			<TouchableOpacity
				style={styles.viewNeedHelpStyle}
				onPress={() => {
					setModalVisibleType(0);
					setModalNeedHelpVisible(true);
				}}>
				<ExpoFastImage
					resizeMode={'contain'}
					source={icons.help}
					style={styles.helpImg}
				/>
				<Text style={styles.underlineStyle}>{Strings.needHelpChoosing}</Text>
			</TouchableOpacity>
		);
	};
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						if (isProgress === '10%') {
							navigation.goBack();
						} else if (isProgress === '100%') {
							navigation.dispatch(StackActions.popToTop());
						} else {
							setInfoPopUpType(0);
							setModalLeagueVisible(true);
						}
					}}
					onLeftIconPath={icons.back}
					name={Strings.create_bet}
					onProfilePath={userProfileInfo?.user?.picture}
					levelRank={userProfileInfo?.user?.level}
				/>

				<View style={styles.viewContain}>
					<GradientProgressView progress={isProgress} />
					<Text style={styles.titleStyle}>{isTitle}</Text>
					{showViews()}
				</View>

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
				) : (
					<ButtonGradient
						onPress={() => {
							navigation.dispatch(StackActions.popToTop());
						}}
						colorArray={defaultTheme.secondaryGradientColor}
						angle={gradientColorAngle}
						buttonTextcolor={colors.white}
						buttonText={Strings.continue}
						style={styles.continueFeedButton}
					/>
				)}

				<CreateLeaguePopup
					popupTitle={
						infoPopUpType === 0
							? Strings.betBack
							: infoPopUpType === 1
							? Strings.findYourFavoriteLeagues
							: Strings.Metamask_does_not_connected
					}
					buttonOkTitle={
						infoPopUpType === 0
							? Strings.ok
							: infoPopUpType === 1
							? Strings.createYourOwn
							: Strings.Connect
					}
					buttonCancelTitle={
						infoPopUpType === 0
							? Strings.cancel
							: infoPopUpType === 1
							? Strings.browseLeagues
							: Strings.cancel
					}
					leftIconPath={infoPopUpType === 1 ? icons.plusWhite : null}
					isVisible={modalLeagueVisible}
					onPressOk={() => {
						setModalLeagueVisible(!modalLeagueVisible);

						if (infoPopUpType === 1) {
							setIsSelectedLeagueType(1);
							seIsTitle(Strings.time_to_create_your_market);
							setIsSelectResults(0);

							seIsProgress('20%');
							setStep(2);
						} else if (infoPopUpType === 2) {
							connectMetaMask();
						} else {
							navigation.goBack();
						}
					}}
					onPressCancel={() => {
						setModalLeagueVisible(!modalLeagueVisible);

						if (infoPopUpType === 1) {
							setIsSelectedLeagueType(0);
						}
					}}
				/>

				<InformationPopUpView
					popupTitle={
						modalVisibleType === 1
							? betWinningHelpTitle
							: modalVisibleType === 2
							? betAboutHelpTitle
							: modalVisibleType === 3
							? betOddHelpTitle
							: modalVisibleType === 4
							? durationHelpTitle
							: betTypNeedHelpTitle
					}
					description={
						modalVisibleType === 1
							? betWinningHelp
							: modalVisibleType === 2
							? betAboutHelp
							: modalVisibleType === 3
							? betOddHelp
							: modalVisibleType === 4
							? durationHelp
							: betTypNeedHelp
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
						setTimeout(async () => {
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
								if (
									userInfo?.user?.socialLoginType?.toLowerCase() !== 'metamask'
								) {
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
			</View>
		</SafeAreaView>
	);
};

export default BetsCategoryScreen;
