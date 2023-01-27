import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Platform, Share, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import icons from '../../../assets/icon';
import ConformationPopupComponet from '../../../components/ConformationPopupComponet';
import useUpdateEffect from '../../../components/CustomHooks/useUpdateEffect';
import ReportFeedView from '../../../components/Events/ReportFeedView';
import HeaderComponent from '../../../components/HeaderComponent';
import LeftIconWithTextComponent from '../../../components/LeftIconWithTextComponent';
import LiveStreamingFlatList from '../../../components/LiveStreamingFlatList';
import NoDataComponent from '../../../components/NoDataComponent';
import SelecteableTag from '../../../components/SelecteableTag';
import Strings from '../../../constants/strings';
import {
	createBetDetailsPreviewShareUrl,
	dateTimeConvert,
	getEventShareUrl,
	showErrorAlert
} from '../../../constants/utils/Function';
import ScreenNames from '../../../navigation/screenNames';
import {
	getFilteredFeeds,
	postReportMatch
} from '../../../redux/apiHandler/apiActions';
import {resetFilteredFeeds} from '../../../redux/reducerSlices/dashboard';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import {RootState} from '../../../redux/store';
import {horizontalScale, verticalScale} from '../../../theme';
import {defaultTheme} from '../../../theme/defaultTheme';
import styles from './style';

const FeedFilterScreen: React.FC<any> = props => {
	const navigation = useNavigation();
	const [modalVisible, setModalVisible] = useState(false);

	const dispatch = useDispatch();

	const {filters, updateFilter} = useRoute().params;

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [selectedMatchId, setSelectedMatchId] = useState('');
	const [isReportPopupShown, setIsReportPopupShown] = useState(false);

	const feedInfo = useSelector((state: RootState) => {
		return state.dashboard.filteredFeeds;
	});

	const feedInfoLoading = useSelector((state: RootState) => {
		return state.dashboard.filterLoading;
	});

	const feedErrorInfo = useSelector((state: RootState) => {
		return state.dashboard.filterFailed;
	});

	const [arrFilters, setArrFilters] = useState([]);

	const noDataItem = {
		image_url: icons.no_feedfilter,
		title_text: Strings.no_filter,
		description_text: Strings.no_filter_desc
	};

	useEffect(() => {
		if (filters && filters?.length > 0) {
			setArrFilters(filters);
		}
	}, [filters]);

	useUpdateEffect(() => {
		if (currentPage === 1 && isLoading === false) {
			dispatch(updateApiLoader({apiLoader: feedInfoLoading}));
		}
	}, [feedInfoLoading]);

	useUpdateEffect(() => {
		console.log('arrFilters???>>>', arrFilters);
		if ((currentPage < totalPage || totalPage === 0) && currentPage === 1) {
			if (currentPage === 1) {
				// dispatch(updateApiLoader({apiLoader: true}));
			} else {
				if (totalPage > 1) {
					setIsLoading(true);
				}
			}
			callFeedApi();
		}
		return () => {
			dispatch(resetFilteredFeeds({}));
		};
	}, [arrFilters]);

	const resetFeedApiData = isFromPullToRefresh => {
		dispatch(resetFilteredFeeds({isFromPullToRefresh: isFromPullToRefresh}));
		setTotalPage(0);
		setCurrentPage(1);
	};

	const getTagsNames = () => {
		const tagNameArray = [];

		if (
			arrFilters.filter(x => x.filterType === Strings.HOT.toLowerCase())[0]
				?.value
		) {
			tagNameArray.push(Strings.HOT.toLowerCase());
		}

		if (
			arrFilters.filter(x => x.filterType === Strings.FRIENDS.toLowerCase())[0]
				?.value
		) {
			tagNameArray.push(Strings.FRIENDS.toLowerCase());
		}

		if (
			arrFilters.filter(
				x => x.filterType === Strings.LAST_MINUTE.toLowerCase()
			)[0]?.value
		) {
			tagNameArray.push(Strings.LAST_MINUTE.toLowerCase());
		}

		return tagNameArray.toString();
	};

	const callFeedApi = () => {
		dispatch(
			getFilteredFeeds({
				limit: '10',
				skip: currentPage - 1,
				trendingType: getTagsNames(),
				category_id:
					arrFilters.filter(x => x.filterType === 'category')[0]?.value ?? '',
				sub_category_id:
					arrFilters.filter(x => x.filterType === 'subCategory')[0]?.value ??
					'',
				duration:
					arrFilters.filter(x => x.filterType === 'duration')[0]?.value ?? '',
				orderby:
					arrFilters.filter(x => x.filterType === 'orderBy')[0]?.value ?? ''
			})
		);
	};

	useUpdateEffect(() => {
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

		// console.log('feedInfo.matchList >> ', JSON.stringify(feedInfo.matchList));
	}, [feedInfo]);

	useUpdateEffect(() => {
		if ((currentPage < totalPage || totalPage === 0) && currentPage > 1) {
			if (currentPage === 1) {
				//dispatch(updateApiLoader({apiLoader: true}));
			} else {
				setIsLoading(true);
			}
			callFeedApi();
		}
	}, [currentPage]);

	const handleShare = async (matchId, endTime) => {
		const eventEndTime = dateTimeConvert(endTime);
		if (Platform.OS === 'web') {
			try {
				await navigator.share({
					text: getEventShareUrl(matchId, eventEndTime, Strings.feed, 1)
				});
			} catch (error) {
				showErrorAlert('', error.message);
			}
		} else {
			try {
				const result = await Share.share({
					message: getEventShareUrl(matchId, eventEndTime, Strings.feed, 1)
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

	const handleTagTypes = type => {
		switch (type) {
			case Strings.HOT.toLowerCase():
				return icons.ic_hot;

			case Strings.FRIENDS.toLowerCase():
				return icons.ic_friends;

			case Strings.LAST_MINUTE.toLowerCase():
				return icons.ic_timer;

			default:
				return null;
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<HeaderComponent
				onLeftIconPath={icons.back}
				name={Strings.feed_filter}
				onLeftMenuPress={() => {
					navigation.goBack();
				}}
			/>

			{arrFilters?.length > 0 && (
				<View
					style={{
						width: 100,
						marginHorizontal: horizontalScale(16),
						marginBottom: verticalScale(16)
					}}>
					<LeftIconWithTextComponent
						text={Strings.filters.toUpperCase()}
						isApplyFilter={true}
						applyFilterCount={arrFilters.length}
						borderStyle={{borderRadius: 8}}
						gradientColors={defaultTheme.ternaryGradientColor}
					/>
				</View>
			)}

			<View style={styles.tagViewContainerStyle}>
				<View style={styles.tagViewStyle}>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						{arrFilters?.map((item, index) => (
							<SelecteableTag
								activeOpacity={1}
								viewStyle={{marginRight: horizontalScale(4)}}
								text={item?.title}
								leftIconPath={handleTagTypes(item?.filterType)}
								onPress={async () => {
									resetFeedApiData();
									updateFilter(item, item.filterType);
									arrFilters.splice(index, 1);
									setArrFilters([...arrFilters]);
								}}
							/>
						))}
					</ScrollView>
				</View>

				<LiveStreamingFlatList
					data={feedInfo.matchList}
					shouldShowBottomButtons
					tagLeftImagePath={icons.timer}
					cellTapped={item => {
						// navigation.navigate(ScreenNames.EventDetailsScreen, {
						//   title: Strings.feed,
						//   feedObject: item,
						//   betCreationType: 1,
						//   selectedBetType: feedInfo.betType,
						// })

						if (item?.dataType === 'customBet') {
							navigation.navigate(ScreenNames.CustomBetDetailsScreen, {
								title: Strings.feed,
								betCreationType: 1,
								betId: item.bet_id,
								id: item?._id
								// feedObject: item,
								// selectedBetType: feedInfo.betType,
							});
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
					onMenuPressed={(data, item) => {
						switch (data.id) {
							case 0:
								console.log('0 >>' + data.text);
								setSelectedMatchId(item._id);
								setTimeout(() => {
									setIsReportPopupShown(true);
								}, 1000);
								break;
							case 1:
								console.log('item._id >> ', item._id);
								setTimeout(() => {
									handleShare(item._id, item?.match_end_time);
								}, 1000);
								break;
							case 2:
								console.log('2 >> ' + data.text);
								navigation.navigate(ScreenNames.StoryShareScreen, {
									feedObject: item,
									isFromFeed: true,
									matchId:
										item?.dataType === 'customBet' ? undefined : item?._id
								});
								break;

							default:
								break;
						}
					}}
					onNextPageLoaded={async () => {
						// setIsLoading(true);
						if (currentPage <= totalPage && totalPage !== 1) {
							setIsLoading(true);
							setCurrentPage(currentPage + 1);
						}
						// setIsLoading(true);
						// setCurrentPage(currentPage + 1);
						// callFeedApi();
						// await setNextPage();
						// if (currentPage < totalPage || totalPage === 0) {
						//   callFeedApi();
						// }
					}}
					isRefreshing={isRefreshing}
					onRefreshCall={() => {
						//setIsRefreshing(true);
						setIsRefreshing(true);
						resetFeedApiData(true);
						dispatch(updateApiLoader({apiLoader: true}));
						callFeedApi();
						console.log('onRefreshCall>?????');
					}}
					isLoading={isLoading}
					onDiscoverButtonClicked={item => {
						// navigation.navigate(ScreenNames.EventDetailsScreen, {
						//   title: Strings.feed,
						//   feedObject: item,
						//   betCreationType: 1,
						//   selectedBetType: feedInfo.betType,
						// })
						if (item?.dataType === 'customBet') {
							navigation.navigate(ScreenNames.CustomBetDetailsScreen, {
								title: Strings.feed,
								betCreationType: 1,
								betId: item.bet_id,
								id: item?._id
								// feedObject: item,
								// selectedBetType: feedInfo.betType,
							});
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
					onCreatBetButtonClicked={item => {
						console.log('onCreatBetButtonClicked', item);
						if (item?.dataType === 'customBet') {
							navigation.navigate(ScreenNames.CustomBetDetailsScreen, {
								title: Strings.feed,
								betCreationType: 1,
								betId: item.bet_id,
								id: item?._id
								// feedObject: item,
								// selectedBetType: feedInfo.betType,
							});
						} else {
							navigation.navigate(ScreenNames.BetsCategoryScreen, {
								matchData: item,
								betCreationType: 1,
								selectedBetType: feedInfo.betType
							});
						}
					}}
				/>
			</View>

			{feedErrorInfo && (
				<View style={[styles.noDataContainer, StyleSheet.absoluteFill]}>
					<NoDataComponent noData={noDataItem} />
				</View>
			)}

			<ConformationPopupComponet
				popupTitle={Strings.whatDoYouWantToCreate}
				buttonOkTitle={Strings.p2pBet}
				isVisible={modalVisible}
				onPressOk={() => {
					console.log('onPressOk');

					setModalVisible(!modalVisible);
					navigation.navigate(ScreenNames.BetsCategoryScreen);
				}}
				onPressCancel={() => {
					setModalVisible(!modalVisible);
				}}
			/>
			<ReportFeedView
				onPressCancel={() => {
					setIsReportPopupShown(false);
				}}
				onPressOk={(tag, description) => {
					setIsReportPopupShown(false);
					const data = {
						tagText: tag === 'Other' ? description : tag,
						matchId: selectedMatchId,
						customTag: tag === 'Other' ? 1 : 0
					};
					postReportMatch(data).then(res => {
						showErrorAlert('', res?.message ?? Strings.somethingWentWrong);
					});
				}}
				isVisible={isReportPopupShown}
			/>
		</SafeAreaView>
	);
};

export default FeedFilterScreen;
