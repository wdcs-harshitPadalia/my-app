/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React, {useEffect, useMemo, useState} from 'react';
import {
	Alert,
	BackHandler,
	FlatList,
	Keyboard,
	Platform,
	View
} from 'react-native';
import {Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';

import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useKeepAwake} from 'expo-keep-awake';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import Strings from '../constants/strings';
import {useBetCreateContract} from '../components/CustomHooks/SmartContract';
import {
	getAllMatch,
	getBetType,
	getCategory,
	getLeagueList,
	getMainMarket,
	getSubcategory,
	logout
} from '../redux/apiHandler/apiActions';
import {
	resetProfileData,
	updateDeviceToken
} from '../redux/reducerSlices/userInfo';
import SportsCategory from '../components/SportsCategory';
import LeagueView from '../components/LeagueView';
import SelecteableTag from '../components/SelecteableTag';
import InputComponent from '../components/InputComponent';
import TokenConfirmationModel from '../components/TokenConfirmationModel';
import {defaultTheme} from '../theme/defaultTheme';
import InformationPopUpView from '../components/InformationPopUpView';
import icons from '../assets/icon';
import CreateLeaguePopup from '../components/CreateLeaguePopup';
import colors from '../theme/colors';
import {
	gradientColorAngle,
	moderateScale,
	verticalScale
} from '../theme/metrics';
import ButtonGradient from '../components/ButtonGradient';
import HeaderComponent from '../components/HeaderComponent';
import GradientProgressView from '../components/GradientProgressView';
import styles from './PostLogin/CreateBets/BetsCategory/style';
import {RootState} from '../redux/store';
import useDebounce from '../components/CustomHooks/useDebounce';
import useUpdateEffect from '../components/CustomHooks/useUpdateEffect';
import {magic} from '../navigation/routes';
import {updateApiLoader} from '../redux/reducerSlices/preLogin';
import ConformationPopupComponet from '../components/ConformationPopupComponet';
import {Fonts} from '../theme';
import SportsComponent from '../components/SportsComponent';
import {dateConvert, timeConvert} from '../constants/utils/Function';
import GameSelectionView from '../components/GameSelectionView';

let pageLeague = 0;
let pageGame = 0;

const CreatePredictionMarket: React.FC<any> = () => {
	useKeepAwake();
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const {params} = useRoute(); // betCreationType New Bet = 0 , Events bet = 1

	const userProfileInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});
	const [isProgress, seIsProgress] = useState('10%');
	const [step, setStep] = useState(1);

	const [isTitle, seIsTitle] = useState(Strings.what_is_your_prediction_market);

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

	const [isSelectChooseSideType, setIsSelectChooseSideType] = useState(null);
	const [gameData, setGameData] = useState([]);
	const [totalGames, setTotalGames] = useState(0);
	const [isNoGameData, setIsNoGameData] = useState(false);

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

	const [selectedGame, setSelectedGame] = useState(params?.matchData);

	const [mainMarketData, setMainMarketData] = useState([]);
	const [isSelectMainMarket, setIsSelectMainMarket] = useState();
	const [isSelectSubMainMarket, setIsSelectSubMainMarket] = useState();

	const [currencyData, setCurrencyData] = useState();
	const [isSelectCurrency, setIsSelectCurrency] = useState({});
	const [betAmount, setBetAmount] = useState('');
	const [betUsdAmount, setBetUsdAmount] = useState('0.00');

	// const [oppositeOdds, setOppositeOdds] = useState(0);

	const [isViewNextBackBtn, setIsViewNextBackBtn] = useState(true); // 0 for not selected and 1 for selected
	const [nextBtnTitle, setNextBtnTitle] = useState(Strings.next);

	const [question, setQuestion] = useState('');
	const [isSelectResults, setIsSelectResults] = useState(0); // 0 for not selected and 1 for selected

	const [betWinningHelpTitle, setBetWinningHelpTitle] = useState('');
	const [betWinningHelp, setBetWinningHelp] = useState('');

	const [options1, setOptions1] = useState('');
	const [options2, setOptions2] = useState('');
	const [isSameOption, setIsSameOption] = useState(false);

	const [customDate, setCustomDate] = useState();

	const [showTokenSelectionPopup, setShowTokenSelectionPopup] = useState(false);

	const [modalNeedHelpVisible, setModalNeedHelpVisible] = useState(false);
	const [modalVisibleType, setModalVisibleType] = useState(0); // 0 for need help and 1 for winning help

	const debouncedValue = useDebounce<string>(betAmount, 500);

	const [modalIsBetJoin, setModalIsBetJoin] = useState(false);
	const [betJoinMessage, setBetJoinMessage] = useState('');

	const [isTokenConfirmationModelVisible, setIsTokenConfirmationModelVisible] =
		useState(false);

	const [customeSelectTokenId, setCustomeSelectTokenId] = useState(0);

	const {getBalanceFromContract, approveContract} = useBetCreateContract(false);

	const connector = useWalletConnect();

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	useUpdateEffect(() => {
		// Do fetch here...
		// Triggers when "debouncedValue" changes
	}, [debouncedValue]);

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

			if (params?.isLive) {
				setIsSelectedLeagueType(2);
				setStep(2);
			} else {
				setIsSelectedLeagueType(0);
				setStep(4);
			}
		} else {
			getCategoryData();
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

	const getCategoryData = () => {
		getCategory()
			.then(res => {
				console.log('getCategoryData :: getCategory :: res ::', res);
				setCategoryData(res?.data?.category);
				setIsNoCategoryData(res?.data?.category?.length === 0 ? true : false);
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

	const getLeagueData = (id?: any) => {
		Keyboard.dismiss();
		if (pageLeague === 0) {
			dispatch(updateApiLoader({apiLoader: true}));
		}
		const uploadData = {
			skip: pageLeague,
			limit: '10',
			category_id: isCategoryId,
			sub_category_id: id ?? isSubCategoryId,
			search: searchLeagueText
		};
		getLeagueList(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));

				console.log('getLeagueData :: getLeagueList :: res ::', res);
				if (pageLeague !== 0) {
					setLeagueData(leagueData.concat(res?.data.leagues));
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
				setBetTypeData(res?.data.bet);
				setIsSelectBetsType(res?.data.bet[0]);
				setBetTypNeedHelpTitle(res?.data.content.title);
				setBetTypNeedHelp(res?.data.content.content);
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
				setBetTypNeedHelpTitle(res?.data.content.title);
				setBetTypNeedHelp(res?.data.content.content);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getMainMarketData :: getMainMarket :: catch ::', err);
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
					setGameData(gameData.concat(res?.data.matchList));
					setIsNoGameData(gameData.length === 0 ? true : false);
				} else {
					setGameData(res?.data.matchList);
					setIsNoGameData(res?.data.matchList.length === 0 ? true : false);
				}
				setTotalGames(res?.data.matchCount);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getAllMatchData :: getAllMatch :: catch ::', err);
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
					seIsTitle(Strings.time_to_create_your_market);
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
			onPress={() => {
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
					setIsSubCategoryId(item._id);
					setIsSelectedSubCategory(item.name);
					pageLeague = 0;
					getLeagueData(item._id);
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

						{isSubCategoryId !== '' && !isCustomCategory && (
							<>
								<InputComponent
									placeholder={Strings.searchLeague.toUpperCase()}
									onLeftIconPath={icons.search}
									onChangeText={(text: string) => {
										setSearchLeagueText(text);
									}}
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
									<Text style={styles.noDataStyle}>
										{Strings.no_Data_Found}
									</Text>
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
						{/* {needHelp()} */}
					</>
				) : (
					<></>
					//   <WriteQuestionView
					//     colorArray={
					//       isSelectResults === 0
					//         ? defaultTheme.ternaryGradientColor
					//         : defaultTheme.primaryGradientColor
					//     }
					//     buttonTitle={'2 ' + Strings.results}
					//     onButtonPress={() => {
					//       setIsSelectResults(1);

					//       if (question.trim() !== '') {
					//         setIsBackButtonDisable(false);
					//       } else {
					//         setIsBackButtonDisable(true);
					//       }
					//     }}
					//     textValue={question}
					//     question={que => {
					//       setQuestion(que);
					//       if (que.trim() !== '' && isSelectResults === 1) {
					//         setIsBackButtonDisable(false);
					//       } else {
					//         setIsBackButtonDisable(true);
					//       }
					//     }}
					//   />
				);

			case 3:
				return isSelectedLeagueType === 0 ? (
					<></>
				) : (
					<></>
					//   <SetAnsOptionView
					//     ansValue1={options1}
					//     setAns1={ans => {
					//       setOptions1(ans);
					//       if (ans.trim() !== '' && options2.trim() !== '') {
					//         setIsBackButtonDisable(false);
					//       } else {
					//         setIsBackButtonDisable(true);
					//       }
					//       setIsSameOption(false);
					//     }}
					//     ansValue2={options2}
					//     setAns2={ans => {
					//       setOptions2(ans);
					//       if (ans.trim() !== '' && options1.trim() !== '') {
					//         setIsBackButtonDisable(false);
					//       } else {
					//         setIsBackButtonDisable(true);
					//       }
					//       setIsSameOption(false);
					//     }}
					//     isSameOption={isSameOption}
					//   />
				);
		}
	};

	const callNext = async () => {
		console.log('callNext :: step ::', step, isSelectedLeagueType);

		switch (step) {
			case 1:
				setIsSelectMainMarket(undefined);
				setIsSelectSubMainMarket(undefined);
				if (isSelectedLeagueType === 0) {
					seIsProgress('20%');
					seIsTitle(Strings.select_a_game);
					setIsBackButtonDisable(true);
					setSelectedGame(null);
					pageGame = 0;
					setGameData([]);
					getAllMatchData();
					setStep(2);
				} else if (isSelectedLeagueType === 1 && isCustomCategory) {
					setLeagueData([]);
					setIsNoLeagueData(false);
					setIsLeagueId('');
					seIsProgress('20%');
					seIsTitle(Strings.time_to_create_your_market);
					setIsSelectResults(0);
					setStep(2);
					setQuestion('');
					setIsBackButtonDisable(true);
				}

				break;
			case 2:
				setIsSelectMainMarket(undefined);
				setIsSelectSubMainMarket(undefined);
				if (isSelectedLeagueType === 0) {
					seIsProgress('30%');
					seIsTitle(Strings.time_to_create_your_market);
					setIsBackButtonDisable(true);
					setStep(3);
					setQuestion('');
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
		}
	};

	const callBackButton = () => {
		console.log('callBackButton :: step ::', step);

		switch (step) {
			case 1:
				if (isCategoryId === '') {
					navigation.goBack();
				}

				setSearchCategoryText('');
				setSearchSubCategoryText('');
				setSearchLeagueText('');

				setIsCategoryId('');
				setIsSubCategoryId('');
				setIsLeagueId('');

				setIsSelectedCategory('');

				pageLeague = 0;
				setIsSelectedLeagueType(0);
				setIsBackButtonDisable(true);

				break;
			case 2:
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

					seIsTitle(Strings.what_is_your_prediction_market);
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
					seIsTitle(Strings.select_a_game);
					setIsBackButtonDisable(false);
					setIsSelectMainMarket(undefined);
					setStep(2);
				} else if (isSelectedLeagueType === 1) {
					seIsProgress('20%');
					seIsTitle(Strings.time_to_create_your_market);
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
						// seIsProgress('30%');
						// seIsTitle(Strings.select_a_game);
						// setIsBackButtonDisable(false);
						// setIsSelectMainMarket(undefined);
						// setStep(3);
					} else if (isSelectedLeagueType === 1) {
						seIsProgress('30%');
						seIsTitle(Strings.time_to_create_your_market);
						setIsBackButtonDisable(false);
						setStep(3);
					}
				}

				break;
		}
	};
	//   const connectMetaMask = async () => {
	//     const success = await connector.connect();
	//     if (success) {
	//       console.log(
	//         'connectMetaMask :: success :: inside if ::',
	//         success?.accounts[0],
	//       );
	//       getBalance(success?.accounts[0]);
	//       // console.log('res balance', res);
	//       // setCurrentBalance(parseFloat(res).toPrecision(5));
	//     } else {
	//       console.log(
	//         'connectMetaMask :: success :: inside else ::',
	//         success?.accounts[0],
	//       );
	//       getBalance(userInfo.user.walletAddress);
	//     }
	//   };

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
							//   connectMetaMask();
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
						modalVisibleType === 0 ? betTypNeedHelpTitle : betWinningHelpTitle
					}
					buttonTitle={Strings.got_it}
					description={modalVisibleType === 0 ? betTypNeedHelp : betWinningHelp}
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

export default CreatePredictionMarket;
