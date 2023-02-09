import React, {useState, useEffect, memo, useCallback, useRef} from 'react';
import {
	FlatList,
	View,
	StyleSheet,
	ImageBackground,
	Platform,
	Share,
	TouchableOpacity,
	Text,
	NativeSyntheticEvent,
	NativeScrollEvent
} from 'react-native';
import Lottie, {LottieRefCurrentProps} from 'lottie-react';

import ExpoFastImage from 'expo-fast-image';
import Strings from '../../constants/strings';
import {
	followUnfollowUser,
	getLiveChallengesData,
	markSeen,
	updateChannel
} from '../../redux/apiHandler/apiActions';

import ScreenNames from '../../navigation/screenNames';

import colors from '../../theme/colors';
import {
	gradientColorAngle,
	height,
	horizontalScale,
	screenWidth,
	SCREEN_HEIGHT,
	verticalScale,
	width
} from '../../theme/metrics';
import ShareVideoModal from '../ShareVideoModal';
import {
	dateTimeConvert,
	showErrorAlert,
	uniqueIdGenerateFrom2Ids
} from '../../constants/utils/Function';
import {
	createChannel,
	createMessage,
	createQuery,
	getChannel,
	joinChannel,
	runQuery
} from '@amityco/ts-sdk';
import icons from '../../assets/icon';
import {updateApiLoader} from '../../redux/reducerSlices/preLogin';
import fonts from '../../theme/fonts';
import LiveStreamingTag from '../LiveStreamingTag';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import UserGroupView from '../UserGroupView';
import useUpdateEffect from '../CustomHooks/useUpdateEffect';
import LoadMoreLoaderView from '../LoadMoreLoaderView';
import NoDataComponent from '../NoDataComponent';
import {RootState} from '../../redux/store';

const {v4: uuidv4} = require('uuid');

const DiscoverLiveStreamComponent = ({friendList, onEndReach, params}) => {
	const [isShowShareModal, setIsShowShareModal] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [liveChallengeData, setLiveChallengeData] = useState([]);
	const dispatch = useDispatch();
	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const lottieRef = React.useRef<LottieRefCurrentProps>(null);

	const [totalDiscoverMatchCount, setTotalDiscoverMatchCount] = useState(0);
	const [isShowNoForYou, setIsShowNoForYou] = useState(false);
	const [isShowSwipeUp, setIsShowSwipeUp] = useState(true);
	const [visibleParentIndex, setVisibleParentIndex] = React.useState<number>(0);
	const animation = useRef(null);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [betType, setBetType] = useState('');

	const navigation = useNavigation();
	useEffect(() => {
		if (lottieRef?.current) {
			lottieRef?.current?.play();
		}
	}, []);

	useUpdateEffect(() => {
		eventMarkSeen(liveChallengeData[visibleParentIndex]._id);
	}, [visibleParentIndex]);

	useUpdateEffect(() => {
		liveChallengeData.length > 0 &&
			eventMarkSeen(liveChallengeData[visibleParentIndex]._id);
	}, [liveChallengeData]);

	const eventMarkSeen = (feed_id: string) => {
		const uploadData = {
			feed_id: feed_id
		};
		markSeen(uploadData)
			.then(res => {
				console.log('videoMarkSeen Data : ', res);
			})
			.catch(err => {
				console.log('videoMarkSeen Data Err : ', err);
			});
	};

	useEffect(() => {
		console.log('params?.video_id1??>', params?.live_id);
		getLiveChallenges(params?.live_id);
	}, [currentPage]);

	const noDataForYou = {
		image_url: icons.no_livestreaming,
		title_text: Strings.no_Data_Found,
		description_text: ''
	};
	const postFollowUser = (follower_id: any) => {
		followUnfollowUser({follower_id: follower_id})
			.then(res => {
				console.log('postFollowUser Response : ', res?.data?.follow);
				if (res?.data?.follow === 1) {
					showErrorAlert('', 'User followed');
				}
			})
			.catch(() => {});
	};

	const getLiveChallenges = (videoId?: string, temp) => {
		if (currentPage === undefined) {
			setLiveChallengeData([]);
			return;
		}
		if (currentPage === 0) {
			setVisibleParentIndex(0);
			dispatch(updateApiLoader({apiLoader: true}));
		} else {
			setIsLoadingMore(true);
		}
		const uploadData = {
			skip: videoId === 'error' ? 0 : currentPage,
			limit: '10'
		};

		getLiveChallengesData(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getLiveChallengesData res ::  ', JSON.stringify(res));
				const discoverMatches = res?.data?.challengesList;
				setBetType(res?.data?.betType);
				if (currentPage !== 0) {
					setLiveChallengeData(liveChallengeData.concat(discoverMatches));
				} else {
					setLiveChallengeData(discoverMatches);
				}
				//setIsRefresh(false);
				setTotalDiscoverMatchCount(res?.data?.challengesCount);
				setIsLoadingMore(false);
				if (discoverMatches?.length === 0 && liveChallengeData?.length === 0) {
					setIsShowNoForYou(true);
				}
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getDiscoverMatches Data Err : ', err);
				// setIsRefresh(false);
				setIsLoadingMore(false);
			});
	};

	const handleShareVideo = async () => {
		if (Platform.OS === 'web') {
			try {
				await navigator.share({
					text: ''
				});
			} catch (error) {
				showErrorAlert('', error?.message);
			}
		} else {
			try {
				const result = await Share.share({
					message: ''
				});
				if (result.action === Share.sharedAction) {
					if (result.activityType) {
						// shared with activity type of result.activityType
						console.log('result.activityType');
						setIsShowShareModal(!isShowShareModal);
					} else {
						// shared
						// console.log('shared');
						setIsShowShareModal(!isShowShareModal);
					}
				} else if (result.action === Share.dismissedAction) {
					// dismissed
				}
			} catch (error) {
				showErrorAlert('', error?.message);
			}
		}
	};

	const sendVideoLinkWithFriend = async item => {
		const data = {
			senderId: userInfo?.user?._id,
			receiverId: item?._id,
			channelId:
				'amity_' + uniqueIdGenerateFrom2Ids([userInfo?.user?._id, item?._id])
		};
		await updateChannel(data);

		const channelId =
			'amity_' + uniqueIdGenerateFrom2Ids([userInfo.user?._id, item?._id]);
		const query5 = createQuery(getChannel, channelId);
		runQuery(query5, result => {
			if (result.data) {
				const user = {
					id: userInfo.user?._id,
					avatarName: userInfo.user?.userName,
					firstName: userInfo.user?.userName,
					lastName: '',
					imageUrl: userInfo.user?.picture
				};
				const textMessage: MessageType.Text = {
					author: user,
					createdAt: Date.now(),
					id: uuidv4(),
					text: '',
					type: 'text',
					isVideoType: true
					// video_id: itemData?._id,
					// video_url: itemData?.video_url,
					// video_thumbnail: itemData?.video_thumbnail
					//uri: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_960_720.jpg',
				};
				const query = createQuery(createMessage, {
					channelId: channelId,
					type: 'text',
					data: {
						text: ''
					},
					metadata: {
						// type: 'video',
						// video_id: itemData?._id,
						// video_url: itemData?.video_url,
						// video_thumbnail: itemData?.video_thumbnail,
						data: textMessage
					}
				});

				runQuery(query, ({data: textMessage, ...options}) => {
					//console.log('sent????', textMessage, options);
					//addMessage(message.metadata?.data);
					if (options?.error || options?.loading) {
						return;
					}
					// Alert.alert('', 'Message sent successfully.');
					setIsShowShareModal(!isShowShareModal);
					navigation.navigate(ScreenNames.ChatDetailsScreen, {
						friendId: item?._id,
						userId: userInfo?.user?._id,
						friendImage: item?.picture,
						friendName: item?.userName,
						channelId: channelId,
						friendLevel: item?.level,
						friendDeviceToken: item?.deviceToken,
						friendData: item
					});
				});
				let query1 = createQuery(joinChannel, channelId);
				runQuery(query1, result =>
					console.log('result?.data?.channelId???', result)
				);
			} else if (result.loading === false) {
				const query2 = createQuery(createChannel, {
					channelId: channelId,
					userIds: [item?._id],
					type: 'live',
					metadata: {
						data: {
							[userInfo?.user?._id]: userInfo.user,
							[item?._id]: item?._id
						}
					}
				});
				runQuery(query2, result => {
					if (result.data) {
						const user = {
							id: userInfo.user?._id,
							avatarName: userInfo.user?.userName,
							firstName: userInfo.user?.userName,
							lastName: '',
							imageUrl: userInfo.user?.picture
						};
						const textMessage: MessageType.Text = {
							author: user,
							createdAt: Date.now(),
							id: uuidv4(),
							isVideoType: true,
							video_id: itemData?._id,
							video_url: itemData?.video_url,
							video_thumbnail: itemData?.video_thumbnail,
							text: '',
							type: 'text'

							//uri: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_960_720.jpg',
						};
						const query = createQuery(createMessage, {
							channelId: channelId,
							type: 'text',
							data: {
								text: ''
							},
							metadata: {
								data: textMessage
							}
						});

						runQuery(query, ({data: textMessage, ...options}) => {
							//console.log('sent????', textMessage, options);
							if (options?.error || options?.loading) {
								return;
							}
							// Alert.alert('', 'Message sent successfully.');
							setIsShowShareModal(!isShowShareModal);
							navigation.navigate(ScreenNames.ChatDetailsScreen, {
								friendId: item?._id,
								userId: userInfo?.user?._id,
								friendImage: item?.picture,
								friendName: item?.userName,
								channelId: channelId,
								friendLevel: item?.level,
								friendDeviceToken: item?.deviceToken,
								friendData: item
							});

							//addMessage(message.metadata?.data);
						});
					}
				});
			}
		});
	};

	const onScroll = useCallback(
		(event: NativeSyntheticEvent<NativeScrollEvent>) => {
			const slideSize = event.nativeEvent.layoutMeasurement.height;
			const index = event.nativeEvent.contentOffset.y / slideSize;
			const roundIndex = Math.round(index);

			if (roundIndex === visibleParentIndex) return;
			if (roundIndex > visibleParentIndex) {
				setVisibleParentIndex(roundIndex);
			}
		},
		[liveChallengeData]
	);
	const renderForYouItem = ({item, index}) => (
		// </View>
		<ImageBackground
			style={[styles.fullScreenImageBg, {height: height}]}
			source={{
				uri: item.subcategories?.imageUrl ?? item?.categories?.imageUrl
			}}
			resizeMode={'cover'}>
			<View style={styles.innerRootView}>
				<View style={styles.innerTopView}>
					<View style={{flexDirection: 'row'}}>
						<View style={styles.liveStreamInfoView}>
							<View style={styles.liveStreamViewTopView}>
								<Text style={styles.liveStreamTopViewText}>
									<Text onPress={() => {
										navigation.navigate(ScreenNames.OtherUserProfileScreen, {
											userId: item?.users?._id
										});
									}}>{`@${item?.users?.userName} `}</Text>
									<Text style={{color: colors.white, textAlign: 'center'}}>
										{Strings.Is_creating_the_following_challenge_and_ITS_LIVE}
									</Text>
								</Text>
								<Text numberOfLines={2} style={styles.liveFeedNameText}>
									{item?.feed_name}
								</Text>
							</View>
							<View style={styles.liveStreamBottomView}>
								{item?.isStarted && item?.liveViewUserData?.length > 0 ? (
									<UserGroupView
										onPressViewAll={() => {
											//navigation.navigate(ScreenNames.UserViewProfileScreen);
										}}
										colorArray={[colors.grey2]}
										angle={gradientColorAngle}
										rightIcon={false}
										buttonText={Strings.login}
										//desText={''}
										style={styles.liveStreamWatchingView}
										shouldShowCloseButton={false}
										userArray={item?.liveViewUserData}
										userCount={item?.liveViewsCount}
										//userID={''}
										userID={userInfo?.user?._id}
										isFromLive
										isFromLiveDiscover
									/>
								) : (
									!item?.isStarted && (
										<Text style={styles.streamStartTimeText}>
											{`${Strings.START_TIME}: ${dateTimeConvert(
												item?.start_date_time
											)}`.toUpperCase()}
										</Text>
									)
								)}

								<View
									style={{
										paddingHorizontal: horizontalScale(12),
										marginTop: verticalScale(12)
									}}>
									<LiveStreamingTag
										text={Strings.WATCH_LIVE_STREAM}
										backgroundColor={colors.redTag}
										onPress={() => {
											console.log("item??>>><",item)
											navigation.navigate(ScreenNames.EventDetailsScreen, {
												feedObject: item,
												betCreationType: 1,
												selectedBetType: betType,
												isFromStreaming: true,
												streamCreator: item?.users,
											});
										}}
									/>
								</View>
							</View>
						</View>
						<View style={styles.liveStreamActionsView}>
							<TouchableOpacity
								activeOpacity={1}
								onPress={() => {
									navigation.navigate(ScreenNames.OtherUserProfileScreen, {
										userId: item?.users?._id
									});
								}}>
								<ExpoFastImage
									style={styles.imgIconStyle}
									resizeMode="cover"
									source={{uri: item?.users?.picture}}
									// source={icons.appLogo}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								activeOpacity={1}
								onPress={() => {
									postFollowUser(item?.users?._id);
								}}
								style={{position: 'absolute', left: 15, top: 30}}>
								<ExpoFastImage
									style={styles.imgFollowIconStyle}
									resizeMode="cover"
									source={icons.ic_follow_user}
									// source={icons.appLogo}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={1}
								style={{marginTop: verticalScale(30)}}
								onPress={() => {
									setIsShowShareModal(true);
								}}>
								<ExpoFastImage
									style={styles.imgShareIconStyle}
									resizeMode="cover"
									source={icons.ic_share_popup}
									// source={icons.appLogo}
								/>
							</TouchableOpacity>
						</View>
					</View>
				</View>

				<ShareVideoModal
					isVisible={isShowShareModal}
					onBtnClose={() => {
						setIsShowShareModal(!isShowShareModal);
					}}
					friendList={friendList}
					onSendLink={() => {
						handleShareVideo();
					}}
					onEndReach={onEndReach}
					onFriendViewSelection={(item: any) => {
						sendVideoLinkWithFriend(item);
					}}
				/>
			</View>
		</ImageBackground>
	);

	return (
		<View style={styles.container}>
			<FlatList
				// style={{flex: 1}}
				//contentContainerStyle={{flex: 1}}
				data={liveChallengeData}
				renderItem={renderForYouItem}
				pagingEnabled
				getItemLayout={(_data, index) => ({
					length: height,
					offset: height * index,
					index
				})}
				decelerationRate={0.9}
				removeClippedSubviews
				keyboardShouldPersistTaps={'handled'}
				keyExtractor={(item, index) => `${item?._id}${index}`}
				onEndReached={() => {
					console.log('getLiveChallenges next page');
					if (totalDiscoverMatchCount !== liveChallengeData?.length) {
						setCurrentPage(currentPage + 1);
					}
				}}
				onScroll={event => {
					setIsShowSwipeUp(false);
					onScroll(event);
				}}
				ListFooterComponent={() => (
					<>{isLoadingMore && <LoadMoreLoaderView />}</>
				)}
				// refreshControl={
				// 	<RefreshControl
				// 		refreshing={isRefresh}
				// 		onRefresh={() => {
				// 			setCurrentPage(0)
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
			/>
			{liveChallengeData.length > 1 && isShowSwipeUp && (
				<View pointerEvents="none" style={styles.swipeView}>
					{Platform.OS === 'web' ? (
						<Lottie
							style={{
								height: 150,
								width: 150,
								alignSelf: 'center'
							}}
							animationData={require('../../assets/animations/swipe_up.json')}
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
							source={require('../../assets/animations/swipe_up.json')}
							autoPlay
							loop={isShowSwipeUp}
							ref={ref => {
								animation.current = ref;
							}}
						/>
					)}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	swipeView: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 100,
		alignSelf: 'center'
	},
	fullScreenImageBg: {
		height: SCREEN_HEIGHT,
		width: screenWidth,
		justifyContent: 'center',
		alignItems: 'center'
	},
	innerRootView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	innerTopView: {
		flex: 0.5,
		width: screenWidth - horizontalScale(24),
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginBottom: verticalScale(4)
	},
	innerBottomView: {
		flex: 0.5,
		width: screenWidth - horizontalScale(16),
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: verticalScale(4)
	},
	shareView: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		marginBottom: verticalScale(48),
		position: 'absolute',
		bottom: verticalScale(80),
		right: verticalScale(20)
	},
	bgGradient: {
		borderRadius: verticalScale(30),
		padding: verticalScale(8),
		position: 'absolute',
		bottom: 5,
		right: 5,
		justifyContent: 'center'
	},
	imgUploadStyle: {
		height: verticalScale(36),
		width: verticalScale(36),
		alignSelf: 'center'
	},
	viewImageStyle: {
		width: 46,
		height: 46,
		borderRadius: 23,
		borderColor: 'rgba(0,0, 0, 0.5)',
		borderWidth: 3,
		margin: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imgIconStyle: {
		width: 40,
		height: 40,
		borderRadius: 20
	},
	imgFollowIconStyle: {
		width: 14,
		height: 14,
		borderRadius: 7
	},
	imgShareIconStyle: {
		width: 45,
		height: 45
	},
	liveStreamInfoView: {
		backgroundColor: colors.blackTransparent05,
		paddingTop: 12,
		borderRadius: 8,
		overflow: 'hidden',
		flex: 1,
		marginHorizontal: horizontalScale(16)
	},
	liveStreamActionsView: {
		alignItems: 'center',
		marginRight: horizontalScale(16)
	},
	liveStreamViewTopView: {paddingHorizontal: 12, flexWrap: 'wrap'},
	liveStreamTopViewText: {
		color: colors.red,
		fontSize: 10,
		fontFamily: fonts.type.Krona_Regular,
		flexShrink: 1
	},
	liveFeedNameText: {
		color: colors.white,
		fontSize: 18,
		fontFamily: fonts.type.Krona_Regular,
		marginTop: verticalScale(10)
	},
	liveStreamBottomView: {
		backgroundColor: colors.greyTwo,
		paddingBottom: verticalScale(12),
		marginTop: verticalScale(10)
	},
	liveStreamWatchingView: {
		padding: 0,
		margin: 0,
		paddingHorizontal: horizontalScale(8),
		marginTop: verticalScale(12)
	},
	streamStartTimeText: {
		textAlign: 'center',
		fontSize: 12,
		color: colors.white,
		fontFamily: fonts.type.Inter_Medium,
		marginTop: verticalScale(12)
	}
});

export default memo(DiscoverLiveStreamComponent);
