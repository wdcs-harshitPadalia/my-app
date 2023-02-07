import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
	FlingGestureHandler,
	Directions,
	State
} from 'react-native-gesture-handler';

import icons from '../../../assets/icon';
import useUpdateEffect from '../../../components/CustomHooks/useUpdateEffect';
import FlatListSlider from '../../../components/FlatListSlider';
import {HeaderView} from '../../../components/HeaderView';
import LiveStreamingFlatList from '../../../components/LiveStreamingFlatList';
import NoDataComponent from '../../../components/NoDataComponent';
import TutorialView from '../../../components/TutorialView';
import Strings from '../../../constants/strings';
import ScreenNames from '../../../navigation/screenNames';
import {
	getLiveStreamingCategories,
	getLiveStreamingFeeds
} from '../../../redux/apiHandler/apiActions';
import {
	hideBottomTab,
	resetLiveFeeds,
	showInviteUser,
	showTutorial
} from '../../../redux/reducerSlices/dashboard';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import {RootState} from '../../../redux/store';
import {horizontalScale, verticalScale} from '../../../theme';
import styles from './style';
import FlingGestureComponent from '../../../components/FlingGestureComponent';
import {AllIconUrl} from '../../../constants/api';

const LiveStreamingScreen: React.FC<any> = props => {
	const flatListRef = useRef();

	const navigation = useNavigation();
	const [categories, setCategories] = React.useState([]);
	const dispatch = useDispatch();

	const [currentPage, setCurrentPage] = useState(0);
	const [totalPage, setTotalPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState({});
	const isFocused = useIsFocused();
	const feedInfo = useSelector((state: RootState) => {
		return state.dashboard.liveFeeds;
	});

	const feedInfoLoading = useSelector((state: RootState) => {
		return state.dashboard.liveFeedsLoading;
	});

	const feedErrorInfo = useSelector((state: RootState) => {
		return state.dashboard.liveFeedsFailed;
	});

	const noDataItem = {
		image_url: icons.no_livestreaming,
		title_text: Strings.no_streamings,
		description_text: Strings.no_streamings_desc
	};

	const isTutorial = useSelector((state: RootState) => {
		return state.dashboard.isShowTutorial;
	});
	const [isShowTutorial, setIsShowTutorial] = useState(isTutorial);

	useUpdateEffect(() => {
		if (currentPage === 0 && isLoading === false && isRefreshing === false) {
			dispatch(updateApiLoader({apiLoader: feedInfoLoading}));
		} else if (feedInfoLoading === false) {
			dispatch(updateApiLoader({apiLoader: false}));
		}
	}, [feedInfoLoading]);

	const resetLiveFeedApiData = () => {
		dispatch(resetLiveFeeds({}));
		setTotalPage(0);
		setCurrentPage(0);
	};

	const callFeedApi = () => {
		console.log('selectedCategory????', selectedCategory);
		if (selectedCategory?._id || selectedCategory?.imageUrl) {
			if (selectedCategory.dataType === 'category') {
				dispatch(
					getLiveStreamingFeeds({
						limit: '10',
						skip: currentPage,
						category_id: selectedCategory?._id
					})
				);
			} else {
				dispatch(
					getLiveStreamingFeeds({
						limit: '10',
						skip: currentPage,
						sub_category_id: selectedCategory?._id
					})
				);
			}
		}
	};

	useUpdateEffect(() => {
		console.log('feedErrorInfo???>>>', feedErrorInfo);
		if (feedErrorInfo) {
			setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
		}
	}, [feedErrorInfo]);

	useUpdateEffect(() => {
		setIsLoading(false);
		setIsRefreshing(false);
		//setTotalPage(Math.ceil(feedInfo?.matchCount/ 10));
		if (feedInfo?.matchCount && feedInfo?.matchCount > 0) {
			setTotalPage(Math.ceil(feedInfo?.matchCount / 10));
		} else {
			setTotalPage(0);
		}
		//dispatch(updateApiLoader({apiLoader: false}));
	}, [feedInfo]);

	useEffect(() => {
		if (currentPage < totalPage || (totalPage === 0 && isFocused)) {
			if (currentPage === 0) {
				dispatch(updateApiLoader({apiLoader: true}));
			} else {
				if (feedInfo?.matchCount > feedInfo?.matchList?.length) {
					setIsLoading(true);
				}
			}
			callFeedApi();
		}
	}, [currentPage, selectedCategory]);

	useEffect(() => {
		if (isFocused) {
			getLiveStreamingCategoryList();
		}
		return () => {
			resetLiveFeedApiData();
		};
	}, []);

	const getLiveStreamingCategoryList = async () => {
		try {
			const response = await getLiveStreamingCategories({});
			resetLiveFeedApiData();
			const updatedArray = [
				{
					imageUrl: AllIconUrl
				},
				...response.data
			];
			setCategories(updatedArray);
			if (response.data?.length > 0) {
				setSelectedCategory(updatedArray[0]);
				console.log(updatedArray[0], 'categories[0]>>>Ooooo');
			} else {
				dispatch(updateApiLoader({apiLoader: false}));
			}
			console.log('response', JSON.stringify(response));
		} catch {}
	};

	const onSwipeChange = directionName => {
		const {LEFT, RIGHT} = Directions;
		let index = categories.findIndex(function (o) {
			return o._id === selectedCategory?._id;
		});

		switch (directionName) {
			case LEFT:
				if (index < categories.length - 1) {
					resetLiveFeedApiData();
					setSelectedCategory(categories[index + 1]);
					flatListRef.current?.scrollToIndex({index: index + 1});
				}
				break;
			case RIGHT:
				if (index > 0) {
					resetLiveFeedApiData();
					setSelectedCategory(categories[index - 1]);
					flatListRef.current?.scrollToIndex({index: index - 1});
				}
				// setState({backgroundColor: 'yellow', myText: 'You swiped right!'});
				break;
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<HeaderView title={Strings.Live_Streaming} />
			<View style={styles.container}>
				<View
					style={{
						marginHorizontal: horizontalScale(10),
						flex: 1
					}}>
					<View style={{paddingVertical: verticalScale(10)}}>
						<FlatListSlider
							ref={flatListRef}
							data={categories}
							selectedCategory={selectedCategory}
							onCategoryChange={async function (category: object): void {
								resetLiveFeedApiData();
								setSelectedCategory(category);
							}}
						/>
					</View>

					{feedInfo?.matchList?.length > 0 && (
						<View
							style={{
								flex: 1
							}}>
							<LiveStreamingFlatList
								data={feedInfo?.matchList}
								onWatchButtonClicked={item => {
									console.log('item?>>?', JSON.stringify(item));
									// navigation.navigate(ScreenNames.EventDetailsScreen, {
									//   title: Strings.Live_Streaming,
									//   feedObject: item,
									//   betCreationType: 1,
									//   selectedBetType: feedInfo.betType,
									// });
									navigation.navigate(ScreenNames.EventDetailsScreen, {
										title: Strings.Live_Streaming,
										feedObject: item,
										betCreationType: 1,
										selectedBetType: feedInfo.betType,
										isFromStreaming: true,
										streamCreator: item?.feed_creator === 'User' && item?.users,
									});
								}}
								cellTapped={
									item =>
										navigation.navigate(ScreenNames.EventDetailsScreen, {
											title: Strings.Live_Streaming,
											feedObject: item,
											betCreationType: 1,
											selectedBetType: feedInfo.betType,
											isFromStreaming: true,
											streamCreator: item?.feed_creator === 'User' && item?.users,
										})
									// navigation.navigate(ScreenNames.EventDetailsScreen, {
									//   title: Strings.feed,
									//   betCreationType: 1,
									//   matchId: item._id,
									//   isFromStreaming: true,
									//   // feedObject: item,
									//   // selectedBetType: feedInfo.betType,
									// })
								}
								moreMenuOptionHidden
								showWatchButton
								//hideBottomView={true}
								//cellTapped={() => {}}
								onNextPageLoaded={() => {
									totalPage > currentPage + 1 &&
										setCurrentPage(currentPage + 1);
								}}
								isRefreshing={isRefreshing}
								onRefreshCall={() => {
									setIsRefreshing(true);
									resetLiveFeedApiData();
									callFeedApi();
									console.log('onRefreshCall>?????');
								}}
								isLoading={isLoading}
							/>
						</View>
					)}

					{(feedInfo?.matchList?.length === 0 && feedErrorInfo === true) ||
					categories.length === 1 ? (
						<View style={styles.noDataContainer}>
							<NoDataComponent noData={noDataItem} />
						</View>
					) : (
						<></>
					)}
				</View>
			</View>
			{isShowTutorial && (
				<TutorialView
					style={{top: 0, bottom: 0, position: 'absolute'}}
					isShowPlusIcon={false}
					isShowTitle={true}
					isShowEventImg={false}
					popupTitle={Strings.bottomTabLive}
					buttonTitle={Strings.next}
					description={Strings.str_tut_live_desc}
					onNextPress={async () => {
						setIsShowTutorial(!isShowTutorial);
						navigation.navigate(ScreenNames.BottomTabScreen, {
							screen: ScreenNames.DiscoverRouter,
							params: {
								screen: ScreenNames.DiscoverScreen
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
		</SafeAreaView>
	);
};

export default LiveStreamingScreen;
