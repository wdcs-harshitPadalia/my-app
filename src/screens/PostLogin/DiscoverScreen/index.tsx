import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
	FlatList,
	Keyboard,
	RefreshControl,
	Text,
	Dimensions,
	TouchableOpacity,
	View,
	Platform,
	ImageBackground,
	NativeScrollEvent
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
	getExploreData,
	markSeen,
	updateChannel
} from '../../../redux/apiHandler/apiActions';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import {RootState} from '../../../redux/store';
import {Colors, horizontalScale, verticalScale} from '../../../theme';

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
// import FastImage from 'react-native-fast-image';
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
import {LinearGradient} from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import Lottie, {LottieRefCurrentProps} from 'lottie-react';
import DiscoverVideoPlayer from '../../../components/DiscoverVideoPlayer';
import {useIsForeground} from '../../../components/CustomHooks/useIsForeground';
// import {event} from 'react-native-reanimated';
import ErrorComponent from '../../../components/ErrorComponent';
import {connectClient} from '@amityco/ts-sdk';

let page = 0;
let pageBets = 0;
let searchTextUpdated = '';
// let discoverPage = 0;
let hasNotch = false;

const DiscoverScreen: React.FC<any> = props => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const {params} = useRoute();
	const isFocused = useIsFocused();
	const isForeground = useIsForeground();
	const isVideoPlay = isFocused && isForeground;
	const [ViewableItem, SetViewableItem] = useState('');
	const [discoverPage, setDiscoverPage] = useState(0);

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
	const [screenActualHeight, setScreenActualHeight] = useState(0);

	const [isLoading, setIsLoading] = useState(false);
	const [isShowNoRecent, setIsShowNoRecent] = useState(false);
	const [isRefresh, setIsRefresh] = useState(false);
	const [isLoadDiscoverMatch, setIsLoadDiscoverMatch] = useState(false);
	const isTutorial = useSelector((state: RootState) => {
		return state.dashboard.isShowTutorial;
	});
	const [isShowTutorial, setIsShowTutorial] = useState(isTutorial);
	const [isShowNoForYou, setIsShowNoForYou] = useState(false);

	const [isShowSwipeUp, setIsShowSwipeUp] = useState(true);
	const animation = useRef(null);
	const lottieRef = React.useRef<LottieRefCurrentProps>(null);

	const debouncedValue = useDebounce<string>(searchText, 500);

	const [visibleParentIndex, setVisibleParentIndex] = React.useState<number>(0);
	const [isVideoFocus, setIsVideoFocus] = useState(true);
	const mediaRefs = useRef([]);
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

	useEffect(() => {
		getDiscoverMatchData();
		// screenActualHeight !== 0 &&
		// 	setTimeout(() => {
		// 		!params?.video_id && getDiscoverMatchData();
		// 	}, 400);
	}, []);

	useEffect(() => {
		connectClient({
			userId: userInfo.user?._id,
			displayName: userInfo.user?.userName
		});
	}, []);

	const isVideoUnAvailable =
		discoverMatchData[0]?.dataType === 'notFound' ||
		discoverMatchData[0]?.dataType === 'videoDeleted' ||
		discoverMatchData[0]?.dataType === 'videoEnded' ||
		discoverMatchData[0]?.dataType === 'userOwnVideo';

	// useEffect(() => {
	// 	getDiscoverMatchData();
	// }, []);

	useUpdateEffect(() => {
		setIsVideoFocus(isVideoPlay);
	}, [isVideoPlay]);

	useEffect(() => {
		if (!isFocused) {
			navigation.setParams({
				isFromFollowerFollowing: false
			});
		}
		if (isFocused && isShowSwipeUp) {
			if (lottieRef.current) {
				lottieRef?.current?.play();
				// animation?.current.play();
			}
		}
	}, [isFocused]);

	// useEffect(() => {
	// 	if (isFocused && params?.isFromFollowerFollowing) {
	// 		// setIsSelectedIndex(0);
	// 		setSearchClicked(true);
	// 	}
	// }, [params?.isFromFollowerFollowing]);

	// useEffect(() => {
	// 	const focusListener = navigation.addListener('focus', () => {
	// 		if (params?.isFromFollowerFollowing) {
	// 			setSearchClicked(true);
	// 			setIsSelectedIndex(0);
	// 		}
	// 		if (shouldDiscoverRefreshOnFocus) {
	// 			dispatch(updateDiscoverRefreshOnFocus(false));
	// 			discoverPage = 0;
	// 			getDiscoverMatchData();
	// 		}
	// 	});

	// 	return () => {
	// 		focusListener;
	// 	};
	// }, [navigation, shouldDiscoverRefreshOnFocus]);

	// useEffect(() => {
	// 	const blurListener = navigation.addListener('blur', () => {
	// 		if (params?.isFromFollowerFollowing) {
	// 			navigation.setParams({isFromFollowerFollowing: false});
	// 		}
	// 	});

	// 	return () => {
	// 		blurListener;
	// 	};
	// }, []);

	useUpdateEffect(() => {
		if (discoverMatchData[visibleParentIndex].dataType === 'video') {
			videoMarkSeen(discoverMatchData[visibleParentIndex]._id);
		}
	}, [visibleParentIndex]);

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

	useEffect(() => {
		getDiscoverMatchData();
	}, [discoverPage])

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

	const getDiscoverMatchData = (videoId?: string) => {
		if (discoverPage === 0) {
			setVisibleParentIndex(0);
			dispatch(updateApiLoader({apiLoader: true}));
		} else {
			setIsLoadDiscoverMatch(true);
		}
		const uploadData = {
			skip: discoverPage,
			limit: '10',
			video_id: videoId ?? undefined
		};

		getExploreData(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getExploreData res ::  ', JSON.stringify(res));
				const discoverMatches = res?.data?.exploreData;
				if (discoverPage !== 0) {
					setDiscoverMatchData(discoverMatchData.concat(discoverMatches));
				} else {
					setDiscoverMatchData(discoverMatches);
				}
				setIsRefresh(false);
				setTotalDiscoverMatchCount(res?.data?.exploreDataCount);
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

	// const renderFollowersUserItem = ({item, index}) => (
	// 	<FollowersUserView
	// 		levelRank={item?.friends?.level}
	// 		displayName={getLevelRank(item?.friends?.level)?.type}
	// 		profilePic={item?.friends?.picture}
	// 		userName={item?.friends?.displayName || '@' + item?.friends?.userName}
	// 		shouldShowCloseButton={true}
	// 		onPress={() => {
	// 			console.log(item);
	// 			if (userInfo.user._id === item?.friends?._id) return;
	// 			navigation.navigate(ScreenNames.OtherUserProfileScreen, {
	// 				userId: item?.friends?._id,
	// 				isRecent: true
	// 			});
	// 		}}
	// 		onCloseButtonPress={() => {
	// 			recentRemove(item?._id);
	// 		}}
	// 		shouldShowCloseButton={isSelectedIndex === 0 ? true : false}
	// 	/>
	// );

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

	const viewabilityConfig = {
		// minimumViewTime: 150,
		// itemVisiblePercentThreshold: 50,
		viewAreaCoveragePercentThreshold: 70
	};

	const videoMarkSeen = (video_id: string) => {
		const uploadData = {
			video_id: video_id
		};
		markSeen(uploadData)
			.then(res => {
				console.log('videoMarkSeen Data : ', res);
			})
			.catch(err => {
				console.log('videoMarkSeen Data Err : ', err);
			});
	};

	// const onViewableItemsChanged = useRef(({changed}) => {
	// 	console.log('changed??', changed);
	// 	changed.forEach(element => {
	// 		const cell = mediaRefs.current[element?.key];
	// 		if (cell) {
	// 			if (element.isViewable) {
	// 				//setVisibleParentIndex(element?.index);
	// 				if (element?.item?.dataType === 'video') {
	// 					videoMarkSeen(element.item?._id);
	// 				}
	// 				//console.log("play called??", changed)
	// 				// setVisibleParentIndex(element.index)
	// 				// if (!profile) {
	// 				//     setCurrentUserProfileItemInView(element.item.creator)
	// 				// }
	// 				cell?.play();
	// 			} else {
	// 				cell?.stop();
	// 			}
	// 		}
	// 	});
	// });
	// const onViewableItemsChanged = useCallback(
	// 	(info: {changed: ViewToken[]}): void => {
	// 		console.log('visible??%%%%%%%%%%%%%%% aavu');

	// 		const visibleItems = info.changed.filter(entry => entry.isViewable);
	// 		visibleItems.forEach(visible => {
	// 			console.log('visible??%%%%%%%%%%%%%%%', visible);
	// 			// const exists = prevState.find((prev) => visible.item.name in prev);
	// 			// if (!exists) trackItem(visible.item);
	// 		});
	// 	},
	// 	[]
	// );
	const onViewableItemsChanged = useRef(({changed}) => {
		console.log('changed??', changed);
		changed.forEach(element => {
			const cell = mediaRefs.current[element?.key];
			if (cell) {
				if (element.isViewable) {
					// if (element?.item?.dataType === 'video') {
					// 	videoMarkSeen(element.item);
					// }
					console.log('play called??', changed);
					// setVisibleParentIndex(element.index)
					// if (!profile) {
					//     setCurrentUserProfileItemInView(element.item.creator)
					// }
					cell.play();
				} else {
					cell.stop();
				}
			}
		});
	});

	const viewabilityConfigCallbackPairs = useRef([
		{viewabilityConfig, onViewableItemsChanged}
	]);

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

	const renderForYouItem = ({item, index}) =>
		item?.dataType === 'video' ? (
			<View
				style={{
					height: height
					// width: '100%'
					//backgroundColor: 'green',
					// borderColor: 'green',
					// borderWidth: 10
				}}>
				{/* <Text>dfhjkfkljldsljkdsjkldsdfjklsjkl</Text> */}
				<DiscoverVideoPlayer
					ref={ref => (mediaRefs.current[item._id] = ref)}
					itemData={item}
					ViewableItem={ViewableItem}
					_id={item?._id}
					// isFocus={isFocused}
					// parentIndex={visibleParentIndex}
					// index={index}
					screenOriginalHeight={height}
				/>
			</View>
		) : (
			// </View>
			<ImageBackground
				style={[styles.fullScreenImageBg, {height: height}]}
				source={{
					uri: item.subcategories?.imageUrl ?? item?.categories?.imageUrl
				}}
				resizeMode={'cover'}>
				<View style={styles.innerRootView}>
					<View style={styles.innerTopView}>
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
										userName: userInfo?.user?.userName,
										title: Strings.feed,
										matchId: item?.matches?._id
									});
								}
							}}
						/>
					</View>
					<View style={styles.innerBottomView}>
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
					</View>
				</View>
			</ImageBackground>
		);

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

	// {beforeClickTopTabIndex === 1 && (
	//   <View
	//     style={{
	//       marginHorizontal: horizontalScale(16),
	//       marginBottom: verticalScale(16),
	//       height: screenHeight / 1.6,
	//     }}>
	//     <ChatViewComponent
	//       // isTitleShown
	//       chatType="amity"
	//       shouldShowMessageHistory={true}
	//       backGroundColor={'black'}
	//       style={{
	//         borderRadius: 8,
	//         overflow: 'hidden',
	//       }}
	//       channelId={'1'}
	//       allowImageUpload={false}
	//     />
	//   </View>
	// )}
	//       </FlingGestureComponent>
	//     </View>
	//   );
	// };
	const AfterSearchClickComponent = () => {
		return (
			<View style={styles.viewSubContain}>
				{/* <FlingGestureComponent
					onSwipeLeft={() => onSwipeHandle(Directions.LEFT, true)}
					onSwipeRight={() => onSwipeHandle(Directions.RIGHT, true)}> */}
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
													userName: userInfo?.user?.userName,
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
													navigation.navigate(ScreenNames.EventDetailsScreen, {
														userName: userInfo?.user?.userName,
														title: Strings.feed,
														betCreationType: 1,
														matchId: item._id,
														isRecent: true
														// feedObject: item,
														// selectedBetType: feedInfo.betType,
													});
												}
											}}
											showWatchButton={true}
											shouldShowCloseButton={false}
											isRefreshing={false}
											onRefreshCall={() => {}}
											onNextPageLoaded={() => {
												if (
													totalDiscoverSearch !== discoverSearchData?.length &&
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
				{/* </FlingGestureComponent> */}
			</View>
		);
	};

	// return (
	// 	<View
	// 		style={styles.container}
	// 		onLayout={event => {
	// 			screenActualHeight === 0 &&
	// 				setScreenActualHeight(event.nativeEvent.layout.height);
	// 		}}>
	// 		{isFocused && !searchClicked && screenActualHeight !== 0 && (
	// 			<>
	// 				{/* <FlingGestureComponent
	// 					onSwipeLeft={() => onSwipeHandle(Directions.LEFT, true)}
	// 					onSwipeRight={() => onSwipeHandle(Directions.RIGHT, true)}> */}
	// 				{beforeClickTopTabIndex === 0 ? (
	// 					<>
	// 							{isVideoUnAvailable ? (
	// 								<View style={styles.fullScreenImageBg}>
	// 									<ErrorComponent
	// 										onPress={() => {
	// 											// discoverPage = 0;
	// 											// getDiscoverMatchData();
	// 										}}
	// 									/>
	// 								</View>
	// 							) : (
	// 									<FlatList
	// 										data={discoverMatchData}
	// 										renderItem={renderForYouItem}
	// 										pagingEnabled
	// 										keyboardShouldPersistTaps={'handled'}
	// 										keyExtractor={(item, index) => `${item?._id}`}
	// 										onEndReached={() => {
	// 											console.log(
	// 												'getDiscoverMatchData next page',
	// 												totalDiscoverMatchCount,
	// 												discoverMatchData?.length
	// 											);
	// 											if (
	// 												totalDiscoverMatchCount !== discoverMatchData?.length
	// 											) {
	// 												// discoverPage = discoverPage + 1;
	// 												// getDiscoverMatchData();
	// 											}
	// 										}}
	// 										ListFooterComponent={() => (
	// 											<>{isLoadDiscoverMatch && <LoadMoreLoaderView />}</>
	// 										)}
	// 										refreshControl={
	// 											<RefreshControl
	// 												refreshing={isRefresh}
	// 												onRefresh={() => {
	// 													// discoverPage = 0;
	// 													// getDiscoverMatchData();
	// 												}}
	// 												title="Pull to refresh"
	// 												tintColor="#fff"
	// 												titleColor="#fff"
	// 											/>
	// 										}
	// 										ListEmptyComponent={() => (
	// 											<>
	// 												{isShowNoForYou && (
	// 													<View style={{height: height, width: width}}>
	// 														<NoDataComponent noData={noDataForYou} />
	// 													</View>
	// 												)}
	// 											</>
	// 										)}
	// 										// windowSize={4}
	// 										// initialNumToRender={10}
	// 										// maxToRenderPerBatch={2}
	// 										decelerationRate={'normal'}
	// 										removeClippedSubviews
	// 										onScroll={() => {
	// 											isFocused && setIsShowSwipeUp(false);
	// 										}}
	// 										// viewabilityConfig={{
	// 										// 	itemVisiblePercentThreshold: 0
	// 										// }}
	// 										onViewableItemsChanged={onViewableItemsChanged.current}
	// 										// viewabilityConfigCallbackPairs={
	// 										// 	viewAbilityConfigCallbackPairs.current
	// 										// }
	// 										// initialScrollIndex={visibleParentIndex}
	// 									/>
	// 							)}
	// 						{discoverMatchData.length > 1 && isShowSwipeUp && screenActualHeight !== 0 && (
	// 							<View pointerEvents="none" style={styles.swipeView}>
	// 								{Platform.OS === 'web' ? (
	// 									<Lottie
	// 										style={{
	// 											height: 100,
	// 											width: 100,
	// 											alignSelf: 'center'
	// 										}}
	// 										animationData={require('../../../assets/animations/swipe_up.json')}
	// 										// autoPlay
	// 										// loop={isShowSwipeUp}
	// 										lottieRef={lottieRef}
	// 									/>
	// 								) : (
	// 									<LottieView
	// 										style={{
	// 											height: 100,
	// 											width: 100,
	// 											alignSelf: 'center'
	// 										}}
	// 										source={require('../../../assets/animations/swipe_up.json')}
	// 										autoPlay
	// 										loop={isShowSwipeUp}
	// 										ref={ref => {
	// 											animation.current = ref;
	// 										}}
	// 									/>
	// 								)}
	// 							</View>
	// 						)}
	// 					</>
	// 				) : (
	// 					<SafeAreaView
	// 						style={{
	// 							marginTop: verticalScale(65),
	// 							height: '100%',
	// 							backgroundColor: defaultTheme.backGroundColor
	// 						}}>
	// 						<LinearGradient
	// 							colors={['rgba(0, 0, 0, 1)', 'rgba(38, 38, 38, 0)']}
	// 							style={{
	// 								height: verticalScale(80),
	// 								position: 'absolute',
	// 								top: insets.top,
	// 								zIndex: 15,
	// 								left: 0,
	// 								right: 0
	// 							}}></LinearGradient>
	// 						<ChatViewComponent
	// 							// isTitleShown
	// 							chatType="amity"
	// 							shouldShowMessageHistory={true}
	// 							backGroundColor={'black'}
	// 							style={{
	// 								paddingBottom: hasNotch
	// 									? verticalScale(205)
	// 									: verticalScale(255)
	// 							}}
	// 							channelId={'1'}
	// 							allowImageUpload={false}
	// 						/>
	// 					</SafeAreaView>
	// 				)}

	// 				<View style={[styles.tabView, {top: insets.top}]}>
	// 					<CustomTopTabView
	// 						dataSource={beforeClickTopTabData}
	// 						onTabChange={selectedIndex => {
	// 							setBeforeClickTopTabIndex(selectedIndex);
	// 						}}
	// 						selectedIndex={beforeClickTopTabIndex}
	// 						viewWidth={110}
	// 					/>

	// 					<TouchableOpacity
	// 						onPress={() => {
	// 							setSearchClicked(true);
	// 							setIsSelectedIndex(0);

	// 							setDiscoverSearchData([]);
	// 							setRecentMatcheData([]);
	// 							setRecentFriendData([]);
	// 							setRecentBetsData([]);
	// 							setDiscoverSearchBetsData([]);

	// 							page = 0;
	// 							pageBets = 0;

	// 							setTimeout(() => {
	// 								getDiscoverSearchData();
	// 							}, 500);
	// 						}}
	// 						style={styles.btnSearch}>
	// 						<ExpoFastImage
	// 							style={styles.iconSearch}
	// 							source={icons.search}
	// 							resizeMode={'contain'}
	// 						/>
	// 					</TouchableOpacity>
	// 				</View>
	// 				{/* </FlingGestureComponent> */}
	// 			</>
	// 		)}

	// {searchClicked && screenActualHeight !== 0 && (
	// 	<>
	// 		<View style={styles.viewSearch}>
	// 			<SearchBarWIthBack
	// 				placeholderText={searchBarPlaceHolderText}
	// 				searchPhrase={searchText}
	// 				setSearchPhrase={value => {
	// 					setSearchText(value);
	// 					searchTextUpdated = value;
	// 				}}
	// 				onBackPress={() => {
	// 					setDiscoverSearchData([]);
	// 					setSearchClicked(false);
	// 					setSearchText('');
	// 					Keyboard.dismiss();
	// 					setIsSelectedIndex(0);
	// 				}}
	// 				searchClicked={searchClicked}
	// 				isEditable={true}
	// 				selectedIndex={isSelectedIndex}
	// 				onClearPress={() => {
	// 					setSearchText('');
	// 				}}
	// 			/>
	// 		</View>
	// 		<ScrollableCustomTabView
	// 			dataSource={afterClickTopTabData}
	// 			isFromDiscover={true}
	// 			onTabChange={item => {
	// 				// if (item === isSelectedIndex) return;
	// 				setSearchText('');
	// 				// setDiscoverSearchData([]);
	// 				// setRecentMatcheData([]);
	// 				// setRecentFriendData([]);
	// 				// setRecentBetsData([]);
	// 				// setDiscoverSearchBetsData([]);
	// 				const searchIndex = afterClickTopTabData.findIndex(
	// 					arrData => arrData === item
	// 				);
	// 				setIsSelectedIndex(searchIndex);
	// 			}}
	// 			selectedIndex={isSelectedIndex}
	// 			onClearPress={() => {
	// 				setSearchText('');
	// 			}}
	// 		/>
	// 		<AfterSearchClickComponent />
	// 	</>
	// )}
	// 		{isShowTutorial && screenActualHeight !== 0 && (
	// 			<TutorialView
	// 				style={{top: 0, bottom: 0, position: 'absolute'}}
	// 				isShowPlusIcon={false}
	// 				isShowTitle={true}
	// 				isShowEventImg={false}
	// 				popupTitle={Strings.bottomTabDiscover}
	// 				buttonTitle={Strings.next}
	// 				description={Strings.str_tut_discover_desc}
	// 				onNextPress={async () => {
	// 					setIsShowTutorial(!isShowTutorial);
	// 					navigation.navigate(ScreenNames.BottomTabScreen, {
	// 						screen: ScreenNames.ProfileRouter,
	// 						params: {
	// 							screen: ScreenNames.ProfileScreen
	// 						}
	// 					});
	// 				}}
	// 				onSkipPress={async () => {
	// 					dispatch(showTutorial({isShowTutorial: false}));
	// 					setIsShowTutorial(!isShowTutorial);
	// 					navigation.navigate(ScreenNames.BottomTabScreen, {
	// 						screen: ScreenNames.FeedsRouter,
	// 						params: {
	// 							screen: ScreenNames.FeedScreen
	// 						}
	// 					});
	// 					global.tutorialTimer = setTimeout(() => {
	// 						dispatch(hideBottomTab({isHideBottomTab: true}));
	// 						dispatch(showInviteUser({isShowInviteUser: true}));
	// 					}, 120000);
	// 				}}
	// 			/>
	// 		)}
	// 	</View>
	// );
	const onScroll = useCallback(
		(event: NativeSyntheticEvent<NativeScrollEvent>) => {
			const slideSize = event.nativeEvent.layoutMeasurement.height;
			const index = event.nativeEvent.contentOffset.y / slideSize;
			const roundIndex = Math.round(index);
			console.log('roundIndex1:',  roundIndex, discoverMatchData.length, totalDiscoverMatchCount);

			if (roundIndex === visibleParentIndex) return;
			if(roundIndex === discoverMatchData.length - 1 &&  discoverMatchData.length < totalDiscoverMatchCount){
				setDiscoverPage(discoverPage + 1)
			}
			// setVisibleParentIndex(roundIndex);
			// // const cell = mediaRefs.current[discoverMatchData[roundIndex]?._id];
			// // videoMarkSeen(discoverMatchData[roundIndex].item?._id);
			// // if (cell) {
			// // 	cell?.play()
			// // }
			// setVisibleParentIndex(roundIndex);
			//console.log('roundIndex:', roundIndex);
		},
		[discoverMatchData]
	);

	const onViewRef = useRef(viewableItems => {
		console.log('onViewRef?>>>', viewableItems?.viewableItems);
		if (viewableItems?.viewableItems?.length > 0)
			SetViewableItem(viewableItems.viewableItems[0].item._id || 0);
	});
	const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 70});

	return (
		<View style={{flex: 1, backgroundColor: defaultTheme.backGroundColor}}>
			{/* <View style={[styles.tabView]}>
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
			</View> */}
			{beforeClickTopTabIndex === 0 &&
				!searchClicked && isFocused &&
				(isVideoUnAvailable ? (
					<View style={styles.fullScreenImageBg}>
						<ErrorComponent
							onPress={() => {
								// discoverPage = 0;
								// getDiscoverMatchData();
							}}
						/>
					</View>
				) : (
					<View
						style={{flex: 1, backgroundColor: defaultTheme.backGroundColor}}>
						<FlatList
							// style={{flex: 1}}
							//contentContainerStyle={{flex: 1}}
							data={discoverMatchData}
							renderItem={renderForYouItem}
							pagingEnabled
							useTextureView={false}
							playInBackground={false}
							maxToRenderPerBatch={2}
							getItemLayout={(_data, index) => ({
								length: height,
								offset: height * index,
								index
							})}
							decelerationRate={0.9}
							// initialNumToRender={1}
							// removeClippedSubviews
							disableFocus={false}
							keyboardShouldPersistTaps={'handled'}
							keyExtractor={(item, index) => `${item?._id}${index}`}
							// onEndReachedThreshold={0.0025}
							// onEndReached={() => {
							// 	console.log(
							// 		'getDiscoverMatchData next page'
							// 	);
							// 	//if (totalDiscoverMatchCount !== discoverMatchData?.length) {
							// 		setDiscoverPage(discoverPage + 1);
							// 	//}
							// }}
							disableIntervalMomentum
							ListFooterComponent={() => (
								<>{isLoadDiscoverMatch && <LoadMoreLoaderView />}</>
							)}
							// refreshControl={
							// 	<RefreshControl
							// 		refreshing={isRefresh}
							// 		onRefresh={() => {
							// 			setDiscoverPage(0)
							// 		}}
							// 		title="Pull to refresh"
							// 		tintColor="#fff"
							// 		titleColor="#fff"
							// 	/>
							// }
							ListEmptyComponent={() => (
								<>
									{isShowNoForYou && (
										<View style={{height: height, width: width}}>
											<NoDataComponent noData={noDataForYou} />
										</View>
									)}
								</>
							)}
							// windowSize={4}
							// initialNumToRender={1}
							// maxToRenderPerBatch={1}
							// snapToInterval={height}
							// decelerationRate={'normal'}
							// removeClippedSubviews={false}
							// snapToAlignment={'center'}
							// initialScrollIndex={0}
							// disableIntervalMomentum
							onScroll={event => {
								isFocused && setIsShowSwipeUp(false);
								onScroll(event);
							}}
							//onViewableItemsChanged={onViewableItemsChanged.current}
							//onScroll={onScroll}
							// viewabilityConfig={{
							// 	itemVisiblePercentThreshold: 100
							// 	// minimumViewTime: 2000,
							// }}
							onViewableItemsChanged={onViewRef.current}
							viewabilityConfig={viewConfigRef.current}
							// onViewableItemsChanged={onViewableItemsChanged}
							// viewabilityConfigCallbackPairs={
							// 	viewabilityConfigCallbackPairs.current
							// }
							// initialScrollIndex={0}
						/>
					</View>
				))}

			{searchClicked && (
				<>
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
				</>
			)}
			{beforeClickTopTabIndex === 1 && !searchClicked  && (
				<View
					style={{
						marginHorizontal: horizontalScale(16),
						// marginBottom: 100,
						height: '85%',
						width: '100%'
					}}>
					<ChatViewComponent
						// isTitleShown
						chatType="amity"
						shouldShowMessageHistory={true}
						backGroundColor={'black'}
						style={{
							borderRadius: 8,
							overflow: 'hidden'
						}}
						channelId={'1'}
						allowImageUpload={false}
					/>
				</View>
			)}

			{discoverMatchData.length > 1 && isShowSwipeUp && beforeClickTopTabIndex == 0 && (
				<View pointerEvents="none" style={styles.swipeView}>
					{Platform.OS === 'web' ? (
						<Lottie
							style={{
								height: 150,
								width: 150,
								alignSelf: 'center'
							}}
							animationData={require('../../../assets/animations/swipe_up.json')}
							// autoPlay
							// loop={isShowSwipeUp}
							lottieRef={lottieRef}
						/>
					) : (
						<LottieView
							style={{
								height: 100,
								width: 100,
								alignSelf: 'center'
							}}
							source={require('../../../assets/animations/swipe_up.json')}
							autoPlay
							loop={isShowSwipeUp}
							ref={ref => {
								animation.current = ref;
							}}
						/>
					)}
				</View>
			)}

			{!searchClicked && (
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
			)}
		</View>
	);
};

export default DiscoverScreen;
