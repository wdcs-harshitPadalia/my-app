import React, {useState, useEffect} from 'react';
import {
	FlatList,
	View,
	StyleSheet,
	ImageBackground,
	Platform,
	Share,
	TouchableOpacity,
	Text
} from 'react-native';
import LoadMoreLoaderView from '../../components/LoadMoreLoaderView';
import NoDataComponent from '../../components/NoDataComponent';
import OtherUserProfileReplicateBetComponent from '../../components/OtherUserProfileReplicateBetComponent';
import {BetEventtInfoView} from '../../components/BetEventtInfoView';
import ExpoFastImage from 'expo-fast-image';
import {LinearGradient} from 'expo-linear-gradient';
import Strings from '../../constants/strings';
import {
	getLiveChallengesData,
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
import {defaultTheme} from '../../theme/defaultTheme';
import icons from '../../assets/icon';
import {updateApiLoader} from '../../redux/reducerSlices/preLogin';
import fonts from '../../theme/fonts';
import LiveStreamingTag from '../LiveStreamingTag';

const {v4: uuidv4} = require('uuid');

const DiscoverLiveStreamComponent = ({
	navigation,
	userInfo,
	friendList,
	onEndReach,
	params,
	dispatch
}) => {
	const [isShowShareModal, setIsShowShareModal] = useState(false);
	const [discoverPage, setDiscoverPage] = useState(0);
	const [discoverMatchData, setDiscoverMatchData] = useState([]);

	const [totalDiscoverMatchCount, setTotalDiscoverMatchCount] = useState(0);
	const [isShowNoForYou, setIsShowNoForYou] = useState(false);

	useEffect(() => {
		console.log('params?.video_id1??>', params?.live_id);
		getDiscoverMatchData(params?.live_id);
	}, [discoverPage]);

	const getDiscoverMatchData = (videoId?: string, temp) => {
		if (discoverPage === undefined) {
			setDiscoverMatchData([]);
			return;
		}
		if (discoverPage === 0) {
			dispatch(updateApiLoader({apiLoader: true}));
		} else {
			// setIsLoadDiscoverMatch(true);
		}
		const uploadData = {
			skip: videoId === 'error' ? 0 : discoverPage,
			limit: '10'
			// video_id:
			// 	videoId === 'error'
			// 		? temp === 'error'
			// 			? videoId
			// 			: undefined
			// 		: videoId ?? undefined
		};

		getLiveChallengesData(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getLiveChallengesData res ::  ', JSON.stringify(res));
				const discoverMatches = res?.data?.challengesList;
				if (discoverPage !== 0) {
					setDiscoverMatchData(discoverMatchData.concat(discoverMatches));
				} else {
					setDiscoverMatchData(discoverMatches);
				}
				//setIsRefresh(false);
				setTotalDiscoverMatchCount(res?.data?.challengesCount);
				//setIsLoadDiscoverMatch(false);
				if (discoverMatches?.length === 0 && discoverMatchData?.length === 0) {
					setIsShowNoForYou(true);
				}
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getDiscoverMatches Data Err : ', err);
				// setIsRefresh(false);
				// setIsLoadDiscoverMatch(false);
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
						<View
							style={{
								backgroundColor: colors.blackTransparent05,
								paddingTop: 12,
								borderRadius: 8,
								overflow: 'hidden',
								// flex: 0.8
								width: width - 112
							}}>
							<View style={{paddingHorizontal: 12, flexWrap: 'wrap'}}>
								<Text
									style={{
										color: colors.red,
										fontSize: 10,
										fontFamily: fonts.type.Krona_Regular,
										flexShrink: 1
									}}>
									{`@${item?.users?.userName} `}
									<Text style={{color: colors.white, textAlign: 'center'}}>
										{Strings.Is_creating_the_following_challenge_and_ITS_LIVE}
									</Text>
								</Text>
								<Text
									numberOfLines={2}
									style={{
										color: colors.white,
										fontSize: 18,
										fontFamily: fonts.type.Krona_Regular,
										marginTop: verticalScale(10)
									}}>
									{item?.feed_name}
								</Text>
							</View>
							<View style={{backgroundColor: colors.greyTwo, paddingVertical: verticalScale(12), marginTop: verticalScale(10)}}>
								<Text
									style={{
										textAlign: 'center',
										fontSize: 12,
										color: colors.white,
										fontFamily: fonts.type.Inter_Medium
									}}>
										{`${Strings.START_TIME}: ${dateTimeConvert(item?.start_date_time)}`}
								</Text>
								<View style={{paddingHorizontal: horizontalScale(12), marginTop: verticalScale(12)}}>
									<LiveStreamingTag
										text={Strings.WATCH_LIVE_STREAM}
										backgroundColor={colors.redTag}
									/>
								</View>
							</View>
						</View>
						<View
							style={{
								width: 80,
								// backgroundColor: 'green',
								height: 100,
								marginVertical: 16
								// flex: 0.2
							}}></View>
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
			{/* <TouchableOpacity
				onPress={() => {
					setIsShowShareModal(!isShowShareModal);
				}}
				hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
				style={styles.shareView}>
				<LinearGradient
					useAngle={true}
					angle={gradientColorAngle}
					colors={defaultTheme.ternaryGradientColor}
					style={styles.bgGradient}>
					<ExpoFastImage
						source={icons.ic_share_upload}
						style={styles.imgUploadStyle}
					/>
				</LinearGradient>
			</TouchableOpacity> */}
		</ImageBackground>
	);

	return (
		<View style={styles.container}>
			<FlatList
				// style={{flex: 1}}
				//contentContainerStyle={{flex: 1}}
				data={discoverMatchData}
				renderItem={renderForYouItem}
				pagingEnabled
				getItemLayout={(_data, index) => ({
					length: height,
					offset: height * index,
					index
				})}
				decelerationRate={0.9}
				// initialNumToRender={1}
				// removeClippedSubviews
				keyboardShouldPersistTaps={'handled'}
				keyExtractor={(item, index) => `${item?._id}${index}`}
				// onEndReachedThreshold={0.0025}
				onEndReached={() => {
					console.log('getDiscoverMatchData next page');
					// //if (totalDiscoverMatchCount !== discoverMatchData?.length) {
					// 	setDiscoverPage(discoverPage + 1);
					// //}
				}}
				// ListFooterComponent={() => (
				// 	<>{isLoadDiscoverMatch && <LoadMoreLoaderView />}</>
				// )}
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
				// ListEmptyComponent={() => (
				// 	<>
				// 		{isShowNoForYou && (
				// 			<View style={{height: height, width: width}}>
				// 				<NoDataComponent noData={noDataForYou} />
				// 			</View>
				// 		)}
				// 	</>
				// )}
				// windowSize={4}
				// initialNumToRender={1}
				// maxToRenderPerBatch={1}
				// snapToInterval={height}
				// decelerationRate={'normal'}
				// removeClippedSubviews={false}
				// snapToAlignment={'center'}
				// initialScrollIndex={0}
				// disableIntervalMomentum
				// onScroll={event => {
				// 	isFocused && setIsShowSwipeUp(false);
				// 	onScroll(event);
				// }}
				//onViewableItemsChanged={onViewableItemsChanged.current}
				//onScroll={onScroll}
				// viewabilityConfig={{
				// 	itemVisiblePercentThreshold: 100
				// 	// minimumViewTime: 2000,
				// }}
				// onViewableItemsChanged={onViewRef.current}
				// viewabilityConfig={viewConfigRef.current}
				// onViewableItemsChanged={onViewableItemsChanged}
				// viewabilityConfigCallbackPairs={
				// 	viewabilityConfigCallbackPairs.current
				// }
				// initialScrollIndex={0}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
		// backgroundColor: colors.red
	},
	fullScreenImageBg: {
		height: SCREEN_HEIGHT,
		width: screenWidth,
		justifyContent: 'center',
		alignItems: 'center'
		// paddingHorizontal: 16
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
	}
});

export default DiscoverLiveStreamComponent;
