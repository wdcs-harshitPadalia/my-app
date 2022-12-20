import React, {useEffect, useRef, useState} from 'react';
import {
	FlatList,
	ImageBackground,
	Keyboard,
	Platform,
	RefreshControl,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
	useIsFocused,
	useNavigation,
	useRoute,
	useScrollToTop
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {Directions} from 'react-native-gesture-handler';

import icons from '../../../assets/icon';

import ChatViewComponent from '../../../components/ChatViewComponent';
import useDebounce from '../../../components/CustomHooks/useDebounce';
import useUpdateEffect from '../../../components/CustomHooks/useUpdateEffect';

import DiscoverFlatList from '../../../components/DiscoverFlatList';
import BetsBottomView from '../../../components/Events/BetsBottomView';
import FollowersUserView from '../../../components/FollowersUserView';
import FollowingUserView from '../../../components/FollowingUserView';
import LoadMoreLoaderView from '../../../components/LoadMoreLoaderView';
import NoDataComponent from '../../../components/NoDataComponent';
import ScrollableCustomTabView from '../../../components/ScrollableCustomTabView';
import SearchBarWIthBack from '../../../components/SearchBarWIthBack';
import TutorialView from '../../../components/TutorialView';
import FlingGestureComponent from '../../../components/FlingGestureComponent';
import CustomTopTabView from '../../../components/CustomTopTabVIew';
import Strings from '../../../constants/strings';
import {
	getLevelRank,
	uniqueIdGenerateFrom2Ids
} from '../../../constants/utils/Function';
import ScreenNames from '../../../navigation/screenNames';
import {
	cancel,
	deleteDiscoverData,
	getDiscoverBets,
	getDiscoverData,
	getRecommendedBets,
	updateChannel
} from '../../../redux/apiHandler/apiActions';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import {RootState} from '../../../redux/store';
import {horizontalScale, verticalScale} from '../../../theme';

import styles from './style';
import {defaultTheme} from '../../../theme/defaultTheme';
import {
	gradientColorAngle,
	height,
	screenHeight,
	width
} from '../../../theme/metrics';
import ButtonGradient from '../../../components/ButtonGradient';
import colors from '../../../theme/colors';
import ExpoFastImage from 'expo-fast-image';
import OtherUserProfileReplicateBetComponent from '../../../components/OtherUserProfileReplicateBetComponent';
import {BetEventtInfoView} from '../../../components/BetEventtInfoView';
import {
	hideBottomTab,
	showInviteUser,
	showTutorial,
	updateDiscoverRefreshOnFocus
} from '../../../redux/reducerSlices/dashboard';
import DeviceInfo from 'react-native-device-info';

let page = 0;
let pageBets = 0;
let searchTextUpdated = '';
let discoverPage = 0;
let hasNotch = DeviceInfo.hasNotch();

const DiscoverScreen: React.FC<any> = props => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const {params} = useRoute();
	const isFocused = useIsFocused();
	const insets = useSafeAreaInsets();
	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});
	const shouldDiscoverRefreshOnFocus = useSelector((state: RootState) => {
		return state.dashboard.shouldDiscoverRefreshOnFocus;
	});
	const [discoverMatchData, setDiscoverMatchData] = useState([]);
	const [discoverSearchData, setDiscoverSearchData] = useState([]);
	const [discoverSearchBetsData, setDiscoverSearchBetsData] = useState([]);
	const [recentMatchedData, setRecentMatcheData] = useState([]);
	const [recentFriendData, setRecentFriendData] = useState([]);
	const [recentBetsData, setRecentBetsData] = useState([]);
	const [userRecentMatchedData, setUserRecentMatcheData] = useState([]);
	const [userRecentFriendData, setUserRecentFriendData] = useState([]);
	const [userRecentBetsData, setUserRecentBetsData] = useState([]);

	const [totalDiscoverSearch, setTotalDiscoverSearch] = useState(0);
	const [totalDiscoverSearchBets, setTotalDiscoverSearchBets] = useState(0);
	const [isSelectedIndex, setIsSelectedIndex] = useState(0);
	const [beforeClickTopTabIndex, setBeforeClickTopTabIndex] = useState(0);
	const [totalDiscoverMatchCount, setTotalDiscoverMatchCount] = useState(0);

	const [searchText, setSearchText] = useState('');
	const [searchBarPlaceHolderText, setSearchBarPlaceHolderText] = useState(
		Strings.search_events_users_more
	);

	const [searchClicked, setSearchClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isShowNoRecent, setIsShowNoRecent] = useState(false);
	const [isRefresh, setIsRefresh] = useState(false);
	const [isLoadDiscoverMatch, setIsLoadDiscoverMatch] = useState(false);
	const isTutorial = useSelector((state: RootState) => {
		return state.dashboard.isShowTutorial;
	});
	const [isShowTutorial, setIsShowTutorial] = useState(isTutorial);
	const [isShowNoForYou, setIsShowNoForYou] = useState(false);

	const debouncedValue = useDebounce<string>(searchText, 500);

	const scrollRef = useRef(null);
	useScrollToTop(scrollRef);

	const beforeClickTopTabData = [
		{id: 1, title: Strings.str_for_you},
		{id: 2, title: Strings.str_live_chat}
	];

	const afterClickTopTabData = [
		{id: 1, title: Strings.recents},
		{id: 2, title: Strings.events_Bets},
		{id: 3, title: Strings.users}
	];

	const noDataItemArray = [
		{
			image_url: icons.no_search,
			title_text: Strings.no_recent_search,
			description_text: Strings.no_recent_search_desc
		},
		{
			image_url: icons.no_search,
			title_text: Strings.no_event_bet_search,
			description_text: Strings.no_event_bet_search_desc
		},
		{
			image_url: icons.no_search,
			title_text: Strings.no_friend_search,
			description_text: Strings.no_friend_search_desc
		}
	];
	const noDataForYou = {
		image_url: icons.no_search,
		title_text: Strings.no_Data_Found,
		description_text: ''
	};

	const screen_Height = Platform.OS === 'android' ? screenHeight - 48 : height;

	useEffect(() => {
		getDiscoverMatchData();
	}, []);

	useEffect(() => {
		if (!isFocused) {
			navigation.setParams({
				isFromFollowerFollowing: false
			});
		}
	}, [isFocused]);

	useEffect(() => {
		if (isFocused && params?.isFromFollowerFollowing) {
			// setIsSelectedIndex(0);
			setSearchClicked(true);
		}
	}, [params?.isFromFollowerFollowing]);

	useEffect(() => {
		const focusListener = navigation.addListener('focus', () => {
			if (params?.isFromFollowerFollowing) {
				setSearchClicked(true);
				setIsSelectedIndex(0);
			}
			if (shouldDiscoverRefreshOnFocus) {
				dispatch(updateDiscoverRefreshOnFocus(false));
				discoverPage = 0;
				getDiscoverMatchData();
			}
		});

		return () => {
			focusListener;
		};
	}, [navigation, shouldDiscoverRefreshOnFocus]);

	useEffect(() => {
		const blurListener = navigation.addListener('blur', () => {
			if (params?.isFromFollowerFollowing) {
				navigation.setParams({isFromFollowerFollowing: false});
			}
		});

		return () => {
			blurListener;
		};
	}, []);

	useUpdateEffect(() => {
		if (isSelectedIndex === 0) {
			setRecentMatcheData([]);
			setRecentFriendData([]);
			setRecentBetsData([]);
		} else {
			setDiscoverSearchData([]);
			setDiscoverSearchBetsData([]);
			setTotalDiscoverSearch(0);
			setTotalDiscoverSearchBets(0);
			setRecentData();
		}
		if (searchText.trim().length > 2) {
			page = 0;
			pageBets = 0;
			setTimeout(() => {
				getDiscoverSearchData();
			}, 500);
			// if (isSelectedIndex === 1) {
			//   pageBets = 0;
			//   getDiscoverBetsData();
			// } else if (isSelectedIndex === 0) {
			// }
		} else if (isSelectedIndex === 0 && isSearchTextEmpty()) {
			page = 0;
			pageBets = 0;
			setTimeout(() => {
				getDiscoverSearchData();
			}, 500);
		}
	}, [debouncedValue]);

	// useEffect(() => {
	//   setIsShowNoRecent(false);
	//   if (isSelectedIndex === 0) {
	//     setDiscoverSearchData([]);
	//     setRecentMatcheData([]);
	//     setRecentFriendData([]);
	//     setRecentBetsData([]);
	//     setDiscoverSearchBetsData([]);

	//     page = 0;
	//     pageBets = 0;
	//     setTimeout(() => {
	//       getDiscoverSearchData();
	//     }, 500);
	//   } else {
	//     setDiscoverSearchData([]);
	//   }
	// }, []);

	useUpdateEffect(() => {
		console.log('isSelectedIndex ::', isSelectedIndex);

		setIsShowNoRecent(false);
		if (isSelectedIndex === 0) {
			setDiscoverSearchData([]);
			setRecentMatcheData([]);
			setRecentFriendData([]);
			setRecentBetsData([]);
			setDiscoverSearchBetsData([]);

			page = 0;
			pageBets = 0;
			setTimeout(() => {
				getDiscoverSearchData();
			}, 500);
			setSearchBarPlaceHolderText(Strings.search_events_users_more);
		} else {
			setDiscoverSearchData([]);
			setDiscoverSearchBetsData([]);
			setTotalDiscoverSearch(0);
			setTotalDiscoverSearchBets(0);
			setRecentData();
			if (isSelectedIndex === 1) {
				setSearchBarPlaceHolderText(Strings.search_events_bets);
			} else {
				setSearchBarPlaceHolderText(Strings.search_users);
			}
		}
	}, [isSelectedIndex]);

	const isSearchTextEmpty = () => {
		return !searchText.trim().length;
	};

	const setRecentData = () => {
		if (isSelectedIndex === 1 && isSearchTextEmpty()) {
			setDiscoverSearchData(userRecentMatchedData);
			setDiscoverSearchBetsData(userRecentBetsData);
			setTotalDiscoverSearch(userRecentMatchedData.length);
			setTotalDiscoverSearchBets(userRecentBetsData.length);
			setIsShowNoRecent(
				userRecentMatchedData?.length === 0 && userRecentBetsData?.length === 0
			);
		} else if (isSelectedIndex === 2 && isSearchTextEmpty()) {
			setDiscoverSearchData(userRecentFriendData);
			setTotalDiscoverSearch(userRecentFriendData.length);
			setIsShowNoRecent(userRecentFriendData?.length === 0);
		}
	};

	const getDiscoverMatchData = () => {
		if (discoverPage === 0) {
			dispatch(updateApiLoader({apiLoader: true}));
		} else {
			setIsLoadDiscoverMatch(true);
		}
		const uploadData = {
			skip: discoverPage,
			limit: '10'
		};

		getRecommendedBets(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getRecommendedBets res ::  ', JSON.stringify(res));
				const discoverMatches = res?.data?.bet;
				if (discoverPage !== 0) {
					setDiscoverMatchData(discoverMatchData.concat(discoverMatches));
				} else {
					setDiscoverMatchData(discoverMatches);
				}
				setIsRefresh(false);
				setTotalDiscoverMatchCount(res?.data?.betCount);
				setIsLoadDiscoverMatch(false);
				if (discoverMatches?.length === 0 && discoverMatchData?.length === 0) {
					setIsShowNoForYou(true);
				}
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getDiscoverMatches Data Err : ', err);
				setIsRefresh(false);
				setIsLoadDiscoverMatch(false);
			});
	};

	const getDiscoverBetsData = () => {
		const uploadData = {
			skip: pageBets,
			limit: '10',
			searchText: searchText
		};
		getDiscoverBets(uploadData)
			.then(res => {
				if (searchTextUpdated.trim().length === 0 && isSelectedIndex !== 0) {
					return;
				}
				console.log('getDiscoverBetsData Response : ', res);
				if (pageBets !== 0) {
					setDiscoverSearchBetsData(
						discoverSearchBetsData.concat(res?.data?.betData)
					);
				}
				// else {
				//   setDiscoverSearchBetsData(res?.data?.betData);
				// }
				setTotalDiscoverSearchBets(res?.data?.betCount);
			})
			.catch(err => {
				console.log('getDiscoverBetsData Data Err : ', err);
				dispatch(updateApiLoader({apiLoader: false}));
			});
	};

	const getDiscoverSearchData = () => {
		const uploadData = {
			skip: page,
			limit: '10',
			type:
				isSelectedIndex === 1
					? 'recent' // events
					: isSelectedIndex === 2
					? 'friends'
					: 'recent',
			searchText: searchText
		};
		if (cancel != undefined) {
			cancel();
		}
		dispatch(updateApiLoader({apiLoader: true}));

		getDiscoverData(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				setIsLoading(false);
				console.log('getDiscoverData Response : ', res);
				// if (searchTextUpdated.trim().length === 0) {
				//   return;
				// }
				const recentMatchData = res?.data?.match;
				const recentBetData = res?.data?.bet;
				const recentFriendsData = res?.data?.friend;
				if (page !== 0) {
					if (isSelectedIndex === 1) {
						setDiscoverSearchData(discoverSearchData.concat(recentMatchData));
					} else if (isSelectedIndex === 2) {
						setDiscoverSearchData(discoverSearchData.concat(recentFriendsData));
					}
				} else {
					if (isSelectedIndex === 0) {
						setRecentMatcheData(recentMatchData);
						setRecentFriendData(recentFriendsData);
						setRecentBetsData(recentBetData);
						if (isSearchTextEmpty()) {
							setUserRecentMatcheData(recentMatchData);
							setUserRecentFriendData(recentFriendsData);
							setUserRecentBetsData(recentBetData);
						}

						if (
							recentMatchData?.length === 0 &&
							recentFriendsData?.length === 0 &&
							recentBetData?.length === 0
						) {
							setIsShowNoRecent(true);
						} else {
							setIsShowNoRecent(false);
						}
					} else if (isSelectedIndex === 1) {
						setDiscoverSearchData(recentMatchData);
						setDiscoverSearchBetsData(recentBetData);

						if (recentMatchData?.length === 0 && recentBetData?.length === 0) {
							setIsShowNoRecent(true);
						} else {
							setIsShowNoRecent(false);
						}
					} else if (isSelectedIndex === 2) {
						setDiscoverSearchData(recentFriendsData);

						if (recentFriendsData?.length === 0) {
							setIsShowNoRecent(true);
						} else {
							setIsShowNoRecent(false);
						}
					}
				}
				setTotalDiscoverSearch(res?.data?.count);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				setIsLoading(false);
				console.log('getDiscoverData Data Err : ', err);
				setIsShowNoRecent(true);
			});
	};

	const renderFollowersUserItem = ({item, index}) => (
		<FollowersUserView
			levelRank={item?.friends?.level}
			displayName={getLevelRank(item?.friends?.level)?.type}
			profilePic={item?.friends?.picture}
			userName={item?.friends?.displayName || '@' + item?.friends?.userName}
			shouldShowCloseButton={true}
			onPress={() => {
				console.log(item);
				if (userInfo.user._id === item?.friends?._id) return;
				navigation.navigate(ScreenNames.OtherUserProfileScreen, {
					userId: item?.friends?._id,
					isRecent: true
				});
			}}
			onCloseButtonPress={() => {
				recentRemove(item?._id);
			}}
			shouldShowCloseButton={isSelectedIndex === 0 ? true : false}
		/>
	);

	const recentRemove = (selected_id: any) => {
		deleteDiscoverData({id: selected_id})
			.then(res => {
				console.log('recentRemove Response : ', res);
				if (res?.statusCode === 200) {
					removeUser(selected_id);
				} else {
				}
			})
			.catch(err => {});
	};

	const removeUser = (selected_id: any) => {
		let filteredList1 = recentMatchedData.filter(
			(item: any) => item._id !== selected_id
		);
		setRecentMatcheData(filteredList1);

		let filteredList2 = recentFriendData.filter(
			(item: any) => item?._id !== selected_id
		);
		setRecentFriendData(filteredList2);

		if (isSearchTextEmpty()) {
			setUserRecentMatcheData(filteredList1);
			setUserRecentFriendData(filteredList2);
			//setUserRecentBetsData(recentBetData);
		}
		if (
			filteredList1?.length === 0 &&
			filteredList2?.length === 0 &&
			recentBetsData?.length === 0
		) {
			setIsShowNoRecent(true);
		} else {
			setIsShowNoRecent(false);
		}
	};

	const renderSuggestedUserItem = ({item, index}) => (
		<FollowingUserView
			levelRank={item?.friends?.level}
			username={item?.friends?.userName}
			profileImgPath={item?.friends?.picture}
			betsCount={item?.friends?.activeBetsCount}
			followUserData={item?.friends?.followers?.followersData}
			totalfollowers={item?.friends?.followers?.totalfollowers}
			totalfollowings={item?.friends?.followings?.totalfollowings}
			onClosePress={() => {
				console.log('onClosePress', item);
				recentRemove(item?._id);
			}}
			onSendMessage={async () => {
				const data = {
					senderId: userInfo?.user?._id,
					receiverId: item?.friends?._id,
					channelId:
						'amity_' +
						uniqueIdGenerateFrom2Ids([userInfo?.user?._id, item?.friends?._id])
				};
				await updateChannel(data);
				navigation.navigate(ScreenNames.ChatDetailsScreen, {
					friendId: item?.friends?._id,
					userId: userInfo?.user?._id,
					friendImage: item?.friends?.picture,
					friendName: item?.friends?.userName,
					channelId:
						'amity_' +
						uniqueIdGenerateFrom2Ids([userInfo?.user?._id, item?.friends?._id]),
					friendLevel: item?.friends?.level,
					friendDeviceToken: item?.friends?.deviceToken,
					friendData: item?.friends
				});
			}}
			onPress={() => {
				if (userInfo?.user?._id === item?.friends?._id) return;
				navigation.navigate(ScreenNames.OtherUserProfileScreen, {
					userId: item?.friends?._id,
					isRecent: true
				});
			}}
			shouldShowCloseButton={searchText.trim().length > 2 ? false : true}
		/>
	);

	const renderForYouItem = ({item, index}) => (
		<ImageBackground
			style={{
				height: screen_Height,
				justifyContent: 'center',
				alignItems: 'center',
				paddingHorizontal: 16
			}}
			source={{
				uri: item.subcategories?.imageUrl ?? item?.categories?.imageUrl
			}}
			resizeMode={'cover'}>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<BetEventtInfoView
					item={item}
					cellTapped={() => {
						if (item?.bet_type === 1) {
							navigation.navigate(ScreenNames.CustomBetDetailsScreen, {
								title: Strings.feed,
								betId: item?.bet_id,
								id: item?._id
							});
						} else {
							navigation.navigate(ScreenNames.EventDetailsScreen, {
								title: Strings.feed,
								matchId: item?.matches?._id
							});
						}
					}}
				/>
				<OtherUserProfileReplicateBetComponent
					itemData={item}
					isHideReplicateBet={false}
					isOnlyHideBetTitle={item?.bet_type === 1 ? true : false}
					handleMenuPress={() => {}}
					handleBetMakerUserPicked={() => {
						navigation.navigate(ScreenNames.OtherUserProfileScreen, {
							userId: item?.users?._id
						});
					}}
					handleBetTackerPicked={() => {
						navigation.navigate(ScreenNames.JoinBetCreateScreen, {
							betId: item?._id
						});
					}}
					handleAlreadyBetTackerUserPicked={() => {
						navigation.navigate(ScreenNames.OtherUserProfileScreen, {
							userId: item?.betTaker?.takerDetails?._id
						});
					}}
					handleReplicateBet={() => {
						navigation.navigate(ScreenNames.ReplicateBetCreatScreen, {
							eventBetData: item
						});
					}}
				/>
				{discoverMatchData.length - 1 !== index && (
					<View
						pointerEvents="none"
						style={[styles.swipeView, {bottom: verticalScale(140)}]}>
						<Text style={styles.swipeText}>
							{Strings.swipe_up_for_more_bets}
						</Text>
						<ExpoFastImage
							source={icons.swipUp}
							style={styles.swipeImage}
							resizeMode={'contain'}
						/>
					</View>
				)}
			</View>
		</ImageBackground>
	);

	const onSwipeHandle = (directionName, showBeforClickTab) => {
		// const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
		const {LEFT, RIGHT} = Directions;
		setSearchText('');
		switch (directionName) {
			case LEFT:
				if (showBeforClickTab) {
					if (beforeClickTopTabIndex < beforeClickTopTabData.length - 1) {
						setBeforeClickTopTabIndex(beforeClickTopTabIndex + 1);
					}
				} else {
					if (isSelectedIndex < afterClickTopTabData.length - 1) {
						setIsSelectedIndex(isSelectedIndex + 1);
					}
				}
				break;
			case RIGHT:
				if (showBeforClickTab) {
					if (beforeClickTopTabIndex > 0) {
						setBeforeClickTopTabIndex(beforeClickTopTabIndex - 1);
					}
				} else {
					if (isSelectedIndex > 0) {
						setIsSelectedIndex(isSelectedIndex - 1);
					}
				}
				break;
		}
	};

	// const BeforeSearchClickComponent = () => {
	//   return (
	//     <View
	//       style={{
	//         flex: 1,
	//         marginTop: verticalScale(16),
	//       }}>
	//       <FlingGestureComponent
	//         onSwipeLeft={() => onSwipeHandle(Directions.LEFT, true)}
	//         onSwipeRight={() => onSwipeHandle(Directions.RIGHT, true)}>
	//         {beforeClickTopTabIndex === 0 && (
	//           <DiscoverFlatList
	//             data={discoverMatchData}
	//             cellTapped={item => {
	//               if (item?.dataType === 'customBet') {
	//                 navigation.navigate(ScreenNames.CustomBetDetailsScreen, {
	//                   title: Strings.feed,
	//                   betCreationType: 1,
	//                   betId: item.bet_id,
	//                   // feedObject: item,
	//                   // selectedBetType: feedInfo.betType,
	//                 });
	//               } else {
	//                 navigation.navigate(ScreenNames.EventDetailsScreen, {
	//                   title: Strings.feed,
	//                   betCreationType: 1,
	//                   matchId: item._id,
	//                   // feedObject: item,
	//                   // selectedBetType: feedInfo.betType,
	//                 });
	//               }
	//             }}
	//             isRefreshing={isRefresh}
	//             onRefreshCall={() => {
	//               discoverPage = 0;
	//               getDiscoverMatchData();
	//             }}
	//             onNextPageLoaded={() => {
	//               if (totalDiscoverMatchCount !== discoverMatchData?.length) {
	//                 discoverPage = discoverPage + 1;
	//                 getDiscoverMatchData();
	//               }
	//             }}
	//             numColumns={3}
	//             scrollEnabled={true}
	//           />
	//         )}

	//         {beforeClickTopTabIndex === 1 && (
	//           <View
	//             style={{
	//               marginHorizontal: horizontalScale(16),
	//               marginBottom: verticalScale(16),
	//               height: screenHeight / 1.6,
	//             }}>
	//             <ChatViewComponent
	//               // isTitleShown
	//               chatType="amity"
	//               shouldShowMessageHistory={true}
	//               backGroundColor={'black'}
	//               style={{
	//                 borderRadius: 8,
	//                 overflow: 'hidden',
	//               }}
	//               channelId={'1'}
	//               allowImageUpload={false}
	//             />
	//           </View>
	//         )}
	//       </FlingGestureComponent>
	//     </View>
	//   );
	// };

	const AfterSearchClickComponent = () => {
		return (
			<View style={styles.viewSubContain}>
				<FlingGestureComponent
					onSwipeLeft={() => onSwipeHandle(Directions.LEFT, true)}
					onSwipeRight={() => onSwipeHandle(Directions.RIGHT, true)}>
					<>
						{isSelectedIndex === 0 && (
							<KeyboardAwareScrollView
								showsVerticalScrollIndicator={false}
								contentContainerStyle={{
									paddingBottom: 40
								}}
								keyboardShouldPersistTaps={'handled'}>
								{/* <Text style={styles.titleText} numberOfLines={2}>
                {afterClickTopTabData[isSelectedIndex].title}
              </Text> */}
								{recentMatchedData?.length > 0 && (
									<View
										style={{
											marginVertical: verticalScale(8)
										}}>
										<DiscoverFlatList
											data={recentMatchedData}
											cellTapped={item => {
												if (item?.dataType === 'customBet') {
													navigation.navigate(
														ScreenNames.CustomBetDetailsScreen,
														{
															title: Strings.feed,
															betCreationType: 1,
															betId: item.bet_id,
															id: item?._id
															// feedObject: item,
															// selectedBetType: feedInfo.betType,
														}
													);
												} else {
													navigation.navigate(ScreenNames.EventDetailsScreen, {
														title: Strings.feed,
														betCreationType: 1,
														matchId: item._id
														// feedObject: item,
														// selectedBetType: feedInfo.betType,
													});
												}
											}}
											showWatchButton={true}
											shouldShowCloseButton={
												searchText.trim().length > 2 ? false : true
											}
											isRefreshing={false}
											onRefreshCall={() => {}}
											onNextPageLoaded={() => {}}
											onCloseButtonPress={itemId => recentRemove(itemId)}
										/>
									</View>
								)}

								{/* <View style={styles.viewRecentFriend}> */}
								{recentFriendData?.length > 0 && (
									<FlatList
										style={{
											marginHorizontal: horizontalScale(8),
											marginBottom: verticalScale(8)
										}}
										// style={{height: 140, backgroundColor: 'red'}}
										horizontal
										showsHorizontalScrollIndicator={false}
										// contentContainerStyle={{paddingBottom: 90}}
										bounces={false}
										data={recentFriendData}
										renderItem={renderSuggestedUserItem}
										keyboardShouldPersistTaps={'handled'}
									/>
								)}
								{recentBetsData?.length > 0 && (
									<View
										style={{
											marginHorizontal: horizontalScale(16),
											marginTop:
												recentMatchedData?.length === recentFriendData?.length
													? verticalScale(8)
													: verticalScale(0)
										}}>
										<BetsBottomView
											addRecent={true}
											betInfo={recentBetsData}
											selectedIndex={1}
											onNextPageLoaded={() => {}}
											isMenuHide={true}
										/>
									</View>
								)}
							</KeyboardAwareScrollView>
						)}

						{isSelectedIndex === 1 && (
							<KeyboardAwareScrollView
								showsVerticalScrollIndicator={false}
								scrollEnabled={true}>
								{discoverSearchData?.length > 0 && (
									<>
										<Text style={styles.titleText} numberOfLines={2}>
											{Strings.events}
										</Text>
										<View>
											<DiscoverFlatList
												data={discoverSearchData}
												cellTapped={item => {
													if (item?.dataType === 'customBet') {
														navigation.navigate(
															ScreenNames.CustomBetDetailsScreen,
															{
																title: Strings.feed,
																betCreationType: 1,
																betId: item.bet_id,
																id: item?._id
																// feedObject: item,
																// selectedBetType: feedInfo.betType,
															}
														);
													} else {
														navigation.navigate(
															ScreenNames.EventDetailsScreen,
															{
																title: Strings.feed,
																betCreationType: 1,
																matchId: item._id,
																isRecent: true
																// feedObject: item,
																// selectedBetType: feedInfo.betType,
															}
														);
													}
												}}
												showWatchButton={true}
												shouldShowCloseButton={false}
												isRefreshing={false}
												onRefreshCall={() => {}}
												onNextPageLoaded={() => {
													if (
														totalDiscoverSearch !==
															discoverSearchData?.length &&
														!isSearchTextEmpty()
													) {
														page = page + 1;
														getDiscoverSearchData();
													}
												}}
											/>
										</View>
									</>
								)}

								{discoverSearchBetsData?.length > 0 && (
									<View style={styles.viewRecentFriend}>
										<Text
											style={[
												styles.titleText,
												{
													marginHorizontal: horizontalScale(8),
													marginTop: horizontalScale(0)
												}
											]}
											numberOfLines={2}>
											{Strings.bets}
										</Text>
										<BetsBottomView
											addRecent={true}
											betInfo={discoverSearchBetsData}
											selectedIndex={1}
											onNextPageLoaded={() => {
												if (
													totalDiscoverSearchBets !==
														discoverSearchBetsData?.length &&
													!isSearchTextEmpty()
												) {
													pageBets = pageBets + 1;
													getDiscoverBetsData();
												}
											}}
											isMenuHide={true}
										/>
									</View>
								)}
							</KeyboardAwareScrollView>
						)}

						{isSelectedIndex === 2 && (
							<View style={{paddingBottom: verticalScale(120)}}>
								<ButtonGradient
									onPress={() => {
										navigation.navigate(ScreenNames.DiscoverFindFriendsScreen);
									}}
									colorArray={defaultTheme.ternaryGradientColor}
									angle={gradientColorAngle}
									buttonTextcolor={colors.white}
									rightIcon={true}
									buttonText={Strings.connect_friends}
									style={styles.loginButtonSocial}
									leftIconPath={icons.plusRound}
								/>
								{/* {discoverSearchData?.length > 0 && (
                <Text style={styles.titleText} numberOfLines={2}>
                  {afterClickTopTabData[isSelectedIndex].title}
                </Text>
              )} */}
								<FlatList
									contentContainerStyle={{
										paddingBottom: verticalScale(120),
										marginTop: verticalScale(16),
										marginHorizontal: horizontalScale(8)
									}}
									bounces={false}
									data={discoverSearchData}
									renderItem={renderFollowersUserItem}
									keyboardShouldPersistTaps={'handled'}
									onEndReached={() => {
										console.log(
											'onEndReached11111',
											totalDiscoverSearch,
											discoverSearchData?.length
										);
										if (
											totalDiscoverSearch !== discoverSearchData?.length &&
											!isSearchTextEmpty()
										) {
											setIsLoading(true);

											page = page + 1;
											getDiscoverSearchData();
										}
									}}
									ListFooterComponent={() => (
										<>{isLoading && <LoadMoreLoaderView />}</>
									)}
								/>
							</View>
						)}

						{isShowNoRecent === true && (
							<View
								style={{
									position: 'absolute',
									top: 50,
									left: 0,
									right: 0
								}}>
								<NoDataComponent
									noData={
										noDataItemArray[
											isSelectedIndex !== 0
												? isSearchTextEmpty()
													? 0
													: isSelectedIndex
												: isSelectedIndex
										]
									}
								/>
							</View>
						)}
					</>
				</FlingGestureComponent>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{!searchClicked && (
				<>
					<FlingGestureComponent
						onSwipeLeft={() => onSwipeHandle(Directions.LEFT, true)}
						onSwipeRight={() => onSwipeHandle(Directions.RIGHT, true)}>
						{beforeClickTopTabIndex === 0 ? (
							<View style={{alignItems: 'center'}}>
								<FlatList
									data={discoverMatchData}
									renderItem={renderForYouItem}
									pagingEnabled
									keyboardShouldPersistTaps={'handled'}
									keyExtractor={(item, index) =>
										(item?._id ?? index).toString()
									}
									onEndReached={() => {
										console.log(
											'getDiscoverMatchData next page',
											totalDiscoverMatchCount,
											discoverMatchData?.length
										);
										if (totalDiscoverMatchCount !== discoverMatchData?.length) {
											discoverPage = discoverPage + 1;
											getDiscoverMatchData();
										}
									}}
									ListFooterComponent={() => (
										<>{isLoadDiscoverMatch && <LoadMoreLoaderView />}</>
									)}
									refreshControl={
										<RefreshControl
											refreshing={isRefresh}
											onRefresh={() => {
												discoverPage = 0;
												getDiscoverMatchData();
											}}
											title="Pull to refresh"
											tintColor="#fff"
											titleColor="#fff"
										/>
									}
									ListEmptyComponent={() => (
										<>
											{isShowNoForYou && (
												<View style={{height: height, width: width}}>
													<NoDataComponent noData={noDataForYou} />
												</View>
											)}
										</>
									)}
								/>
								{/* {discoverMatchData.length > 1 && isShowSwipe && (
									<View pointerEvents="none" style={styles.swipeView}>
										<Text style={styles.swipeText}>
											{Strings.swipe_up_for_more_bets}
										</Text>
										<ExpoFastImage
											source={icons.swipUp}
											style={styles.swipeImage}
											resizeMode={'contain'}
										/>
									</View>
								)} */}
							</View>
						) : (
							<SafeAreaView
								style={{
									marginTop: verticalScale(60),
									height: '100%',
									backgroundColor: defaultTheme.backGroundColor
								}}>
								<ChatViewComponent
									// isTitleShown
									chatType="amity"
									shouldShowMessageHistory={true}
									backGroundColor={'black'}
									style={{
										paddingBottom: hasNotch
											? verticalScale(200)
											: verticalScale(250)
									}}
									channelId={'1'}
									allowImageUpload={false}
								/>
							</SafeAreaView>
						)}

						<View style={[styles.tabView, {top: insets.top}]}>
							<CustomTopTabView
								dataSource={beforeClickTopTabData}
								onTabChange={selectedIndex => {
									setBeforeClickTopTabIndex(selectedIndex);
								}}
								selectedIndex={beforeClickTopTabIndex}
								viewWidth={110}
							/>

							<TouchableOpacity
								onPress={() => {
									setSearchClicked(true);
									setIsSelectedIndex(0);

									setDiscoverSearchData([]);
									setRecentMatcheData([]);
									setRecentFriendData([]);
									setRecentBetsData([]);
									setDiscoverSearchBetsData([]);

									page = 0;
									pageBets = 0;

									setTimeout(() => {
										getDiscoverSearchData();
									}, 500);
								}}
								style={styles.btnSearch}>
								<ExpoFastImage
									style={styles.iconSearch}
									source={icons.search}
									resizeMode={'contain'}
								/>
							</TouchableOpacity>
						</View>
					</FlingGestureComponent>
				</>
			)}

			{searchClicked && (
				<SafeAreaView style={styles.container}>
					<View style={styles.viewSearch}>
						<SearchBarWIthBack
							placeholderText={searchBarPlaceHolderText}
							searchPhrase={searchText}
							setSearchPhrase={value => {
								setSearchText(value);
								searchTextUpdated = value;
							}}
							onBackPress={() => {
								setDiscoverSearchData([]);
								setSearchClicked(false);
								setSearchText('');
								Keyboard.dismiss();
								setIsSelectedIndex(0);
							}}
							searchClicked={searchClicked}
							isEditable={true}
							selectedIndex={isSelectedIndex}
							onClearPress={() => {
								setSearchText('');
							}}
						/>
					</View>

					<ScrollableCustomTabView
						dataSource={afterClickTopTabData}
						isFromDiscover={true}
						onTabChange={item => {
							// if (item === isSelectedIndex) return;
							setSearchText('');
							// setDiscoverSearchData([]);
							// setRecentMatcheData([]);
							// setRecentFriendData([]);
							// setRecentBetsData([]);
							// setDiscoverSearchBetsData([]);

							const searchIndex = afterClickTopTabData.findIndex(
								arrData => arrData === item
							);
							setIsSelectedIndex(searchIndex);
						}}
						selectedIndex={isSelectedIndex}
						onClearPress={() => {
							setSearchText('');
						}}
					/>
					<AfterSearchClickComponent />
				</SafeAreaView>
			)}
			{isShowTutorial && (
				<TutorialView
					style={{top: 0, bottom: 0, position: 'absolute'}}
					isShowPlusIcon={false}
					isShowTitle={true}
					isShowEventImg={false}
					popupTitle={Strings.bottomTabDiscover}
					buttonTitle={Strings.next}
					description={Strings.str_tut_discover_desc}
					onNextPress={async () => {
						setIsShowTutorial(!isShowTutorial);
						navigation.navigate(ScreenNames.BottomTabScreen, {
							screen: ScreenNames.ProfileRouter,
							params: {
								screen: ScreenNames.ProfileScreen
							}
						});
					}}
					onSkipPress={async () => {
						dispatch(showTutorial({isShowTutorial: false}));
						setIsShowTutorial(!isShowTutorial);
						navigation.navigate(ScreenNames.BottomTabScreen, {
							screen: ScreenNames.FeedsRouter,
							params: {
								screen: ScreenNames.FeedScreen
							}
						});
						global.tutorialTimer = setTimeout(() => {
							dispatch(hideBottomTab({isHideBottomTab: true}));
							dispatch(showInviteUser({isShowInviteUser: true}));
						}, 120000);
					}}
				/>
			)}
		</View>
	);
};

export default DiscoverScreen;
