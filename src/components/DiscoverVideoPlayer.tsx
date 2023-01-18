import {
	createChannel,
	createMessage,
	createQuery,
	getChannel,
	joinChannel,
	runQuery
} from '@amityco/ts-sdk';
import {MessageType} from '@flyerhq/react-native-chat-ui';
import {useNavigation} from '@react-navigation/native';
import React, {
	memo,
	useMemo,
	useState,
	forwardRef,
	useRef,
	useImperativeHandle,
	useEffect
} from 'react';
import {
	StyleSheet,
	View,
	ImageBackground,
	ActivityIndicator,
	TouchableOpacity,
	Share,
	Platform,
	StatusBar,
	Alert
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import {LinearGradient} from 'expo-linear-gradient';
import {Video} from 'expo-av';
import {useDispatch} from 'react-redux';
import icons from '../assets/icon';
import {
	downloadVideo,
	getVideoShareMessage,
	getVideoShareUrl,
	showErrorAlert,
	uniqueIdGenerateFrom2Ids
} from '../constants/utils/Function';
import ScreenNames from '../navigation/screenNames';
import {
	getUserMessageList,
	updateChannel
} from '../redux/apiHandler/apiActions';
import {updateApiLoader} from '../redux/reducerSlices/preLogin';
import {RootState} from '../redux/store';

import {horizontalScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import {
	gradientColorAngle,
	height,
	Metrics,
	screenWidth,
	width
} from '../theme/metrics';
import OtherUserProfileReplicateBetComponent from './OtherUserProfileReplicateBetComponent';
import useDownloader from 'react-use-downloader';
import ShareVideoModal from './ShareVideoModal';
const {v4: uuidv4} = require('uuid');
import {useSelector} from 'react-redux';
// import convertToProxyURL from 'react-native-video-cache';
// import {openSettings, PERMISSIONS, request} from 'react-native-permissions';
import Strings from '../constants/strings';
import ReactPlayer from 'react-player';
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';

interface Props {
	parentIndex: number;
	visibleParentIndex?: number;
	isFocus: boolean;
	itemData?: any;
	onVideoLoaded?: (Object) => void;
	isNewStory?: boolean;
	pause?: boolean;
	isLoadVideoFromStory?: boolean;
	ViewableItem?: any;
	_id?: any;
}

// let pageUser = 0;

// const screen_Height =
// 	Platform.OS === 'android'
// 		? Metrics.hasNotch
// 			? height + (StatusBar.currentHeight ?? verticalScale(24))
// 			: height
// 		: height;

const DiscoverVideoPlayer = React.forwardRef((props, parentRef) => {
	const {
		parentIndex,
		visibleParentIndex,
		isFocus,
		itemData,
		isNewStory,
		pause,
		onVideoLoaded,
		isLoadVideoFromStory,
		item,
		screenOriginalHeight,
		ViewableItem,
		_id
	} = props;
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const ref = useRef(null);

	useImperativeHandle(parentRef, () => ({
		play,
		unload,
		stop
	}));

	const {size, elapsed, percentage, download, cancel, error, isInProgress} =
		useDownloader();

	const [isPreLoading, setIsPreLoading] = useState(true);
	const [isVideoPlay, setIsVideoPlay] = useState(false);

	const [isShowShareModal, setIsShowShareModal] = useState(false);
	const [isNoData, setIsNoData] = useState(false);
	const [userListData, setUserListData] = useState([]);
	const [totalUser, setTotalUser] = useState(0);
	const [pageUser, setPageUser] = useState(0);

	const [isVideoPaused, setIsVideoPaused] = useState(true);

	const [isVisible, setIsVisible] = useState(true);

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	useEffect(() => {
		return () => unload();
	}, []);

	const isVideoIndex = () => {
		return parentIndex === visibleParentIndex;
	};

	const isShowVideo = useMemo(() => {
		console.log('ashja34788347349834789347', isVideoIndex());
		return isVideoIndex();
	}, [parentIndex, visibleParentIndex]);

	const play = async () => {
		setIsVideoPlay(true);
		return;
		console.log('Play called in video player>?>???', ref.current);
		if (ref.current == null) {
			return;
		}
		ref.current.play();

		// if (ref.current == null) {
		// 	return;
		// }
		// console.log('Play called in video player1>?>???', ref.current)

		// //setIsVideoPaused(false)

		// // if video is already playing return
		// const status = await ref.current.getStatusAsync();
		// if (status?.isPlaying) {
		// 	return;
		// }
		// try {
		// 	await ref.current.playAsync();
		// } catch (e) {
		// 	console.log(e);
		// }
	};

	const stop = async () => {
		setIsVideoPlay(false);
		return;
		if (ref.current == null) {
			return;
		}
		ref.current.pause();
		// if (ref.current == null) {
		// 	return;
		// }

		// // if video is already stopped return
		// const status = await ref.current.getStatusAsync();
		// if (!status?.isPlaying) {
		// 	return;
		// }
		// try {
		// 	await ref.current.stopAsync();
		// } catch (e) {
		// 	console.log(e);
		// }
	};

	const unload = async () => {
		console.log('unload called@');
		setIsVideoPaused(true);
		return;
		if (ref.current == null) {
			return;
		}
		stop();
		// if (ref.current == null) {
		// 	return;
		// }

		// // if video is already stopped return
		// try {
		// 	await ref.current.unloadAsync();
		// } catch (e) {
		// 	console.log(e);
		// }
	};

	const getIsPlay = () => {
		setIsVideoPlay(
			isFocus ? (parentIndex === visibleParentIndex ? true : false) : false
		);
		return true ? (parentIndex === visibleParentIndex ? true : false) : false;
	};

	const isPlayVideo = useMemo(() => {
		return getIsPlay();
	}, [visibleParentIndex, isFocus]);

	const onTap = () => {
		//isVideoPlay ? stop() : play();
		//setIsVideoPlay(!isVideoPlay);
		setpaused(!paused);
	};

	// api call for getting the friend list
	const getAllUserList = () => {
		if (pageUser === 0) {
			dispatch(updateApiLoader({apiLoader: true}));
		}

		const uploadData = {
			skip: pageUser,
			limit: '10'
		};

		getUserMessageList(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));

				// console.log('getAllUserList :: getUserVideoList :: res ::', res);
				if (pageUser !== 0) {
					setUserListData(userListData.concat(res?.data?.userList));
					setIsNoData(userListData.length === 0 ? true : false);
				} else {
					setUserListData(res?.data?.userList);
					setIsNoData(res?.data?.userList?.length === 0 ? true : false);
				}
				// console.log('length ::', res?.data?.videoCount);
				setTotalUser(res?.data?.userCount);
				if (res?.statusCode?.toString() === '200') {
					!isShowShareModal && setIsShowShareModal(!isShowShareModal);
				}
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				// console.log('getAllUserList :: getUserVideoList :: res ::', err);
			});
	};
	// For sharing video
	const handleShareVideo = async () => {
		if (Platform.OS === 'web') {
			try {
				await navigator.share({
					text: getVideoShareMessage(
						itemData?.users?.displayName || itemData?.users?.userName,
						itemData?._id
					)
				});
			} catch (error) {
				showErrorAlert('', error?.message);
			}
		} else {
			try {
				const result = await Share.share({
					message: getVideoShareMessage(
						itemData?.users?.displayName || itemData?.users?.userName,
						itemData?._id
					)
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

	function onEndReached() {
		if (totalUser !== userListData.length) {
			setPageUser(pageUser + 1);
			getAllUserList();
		}
	}

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
					text: getVideoShareUrl(itemData?._id),
					type: 'text',
					isVideoType: true,
					video_id: itemData?._id,
					video_url: itemData?.video_url,
					video_thumbnail: itemData?.video_thumbnail
					//uri: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_960_720.jpg',
				};
				const query = createQuery(createMessage, {
					channelId: channelId,
					type: 'text',
					data: {
						text: getVideoShareUrl(itemData?._id)
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
							text: getVideoShareUrl(itemData?._id),
							type: 'text'

							//uri: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_960_720.jpg',
						};
						const query = createQuery(createMessage, {
							channelId: channelId,
							type: 'text',
							data: {
								text: getVideoShareUrl(itemData?._id)
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

	const handleDownloadVideo = async () => {
		console.log('itemData?.video_url???>>', itemData?.video_url);
		const date = new Date()
		download(itemData?.video_url, `TF_${date.getTime()}.mp4`);

		setTimeout(() => {
			setIsShowShareModal(false);
		}, 1000);

		//downloadVideo(itemData?.video_url);
	};
	// let reqPermission = await request(
	// 	Platform.OS === 'android'
	// 		? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
	// 		: PERMISSIONS.IOS.PHOTO_LIBRARY
	// );
	// if (reqPermission === 'granted') {
	// 	downloadVideo(itemData?.video_url);
	// } else {
	// 	Alert.alert('Alert', Strings.galleryAccess, [
	// 		{
	// 			text: 'Open Settings',
	// 			onPress: () => openSettings(),
	// 			style: 'destructive'
	// 		},
	// 		{
	// 			text: 'Cancel',
	// 			onPress: () => console.log('Cancel Pressed')
	// 		}
	// 	]);
	// }
	// console.log('reqPermission ::', reqPermission);
	// setIsShowShareModal(!isShowShareModal);
	// useEffect(() => {
	// 	console.log(
	// 		'visibleParentIndex',
	// 		visibleParentIndex,
	// 		'parentIndex',
	// 		parentIndex
	// 	);
	// }, [visibleParentIndex, parentIndex]);
	useEffect(() => {
		console.log('ViewableItem???>', ViewableItem);
		if (ViewableItem === _id) {
			setpaused(false);
		} else {
			ref.current.seekTo(0);
			setpaused(true);
		}
	}, [ViewableItem]);
	const [paused, setpaused] = useState(true);
	useEffect(() => {
		if (isInProgress) {
			if (percentage == 100) {
				setTimeout(() => {
					dispatch(updateApiLoader({apiLoader: false}));
				}, 400);
			} else {
				dispatch(updateApiLoader({apiLoader: true}));
			}
		}
		console.log(
			'percentage??',
			percentage,
			'elapsed???',
			elapsed,
			'isInProgress>>>',
			isInProgress,
			error
		);
	}, [percentage, error]);
	return (
		<View style={[styles.container, {height: screenOriginalHeight}]}>
			{/* <p>Download is in {isInProgress ? 'in progress' : 'stopped'}</p>
			<p>Download size in bytes {size}</p>
			<label for="file">Downloading progress:</label>
			<progress id="file" value={percentage} max="100" />
			<p>Elapsed time in seconds {elapsed}</p>
			{error && <p>possible error {JSON.stringify(error)}</p>} */}
			{!isVisible && (
				<ImageBackground
					source={itemData?.video_thumbnail}
					resizeMode="contain"
					style={styles.imageBgStyle}
				/>
			)}
			{/* <VisibilitySensor
				onChange={isVisible => {
					return (
						console.log(isVisible),
						setIsPreLoading(true),
						setIsVisible(isVisible),
						isVisible ? setpaused(false) : setpaused(true)
					);
				}}> */}
			<TouchableOpacity
				style={{height: screenOriginalHeight}}
				onPress={onTap}
				activeOpacity={1}>
				<>
					{Platform.OS === 'android' ? (
						<Video
							// progressUpdateIntervalMillis={2000}
							//ref={ref}

							source={{uri: itemData?.video_url}}
							style={{
								width: '100%',
								flexGrow: 1,
								backgroundColor: 'red',
								height: screenOriginalHeight
							}}
							resizeMode="contain"
							posterSource={{uri: itemData?.video_thumbnail}}
							shouldPlay={!paused}
							onError={(event: any) => {
								console.log('Video Error : ', event);
								setIsPreLoading(false);
								stop();
								// Alert.alert('', 'Sorry! this video is not compatible with your device so it might not play properly!')
							}}
							onLoad={item => {
								console.log('onLoad');
								setIsPreLoading(false);
								onVideoLoaded && onVideoLoaded(item);
							}}
							onLoadStart={() => {
								console.log('onLoadStart ::', itemData?.video_url);
								// setIsPreLoading(false);
							}}
							onReadyForDisplay={(event: any) => {
								//console.log('event ::', event);
								// setIsPreLoading(false);
							}}
							usePoster
							isLooping={true}
							posterStyle={{resizeMode: 'cover'}}
						/>
					) : (
						<ReactPlayer
							url={itemData?.video_url}
							width="100%"
							height="100%"
							//fluid={"true"}
							controls={false}
							style={{
								flex: 1,
								// margin: 0,
								// padding : 0
								backgroundColor: defaultTheme.backGroundColor
								//height: screenOriginalHeight
							}}
							playsinline
							ref={ref}
							loop
							playing={navigation.isFocused() ? !paused : false}
							onStart={() => {
								setIsPreLoading(true);
								console.log('onStart ::');
								//isVideoLoaded = false;
							}}
							onDuration={duration => {
								console.log('onDuration ::');
								// setIsPreLoading(false)

								//isVideoLoaded = false;
							}}
							// onBuffer={() => {
							// 	setIsPreLoading(true)
							// }}

							onProgress={state => {
								setIsPreLoading(false);
								// console.log('onProgress ::', state);
								// if (!isVideoLoaded && !props.isNewStory) {
								// 	props.onVideoLoaded(state);
								// 	isVideoLoaded = true;
								// }
								const played = parseInt(state.played);
								// if (played === 1) {
								// 	setIsPreLoading(false);
								// }
							}}
							onEnded={() => {
								console.log('onEnded ::');
								//setIsPreLoading(false)
								//isVideoLoaded = false;
							}}
							onError={(error, data) => {
								setIsPreLoading(false);
								console.log('onError :: error ::', error);
								//props.next();
							}}
							// onPause={handlePause}
							// onPlay={handlePlay}
						/>
					)}
				</>

				<LinearGradient colors={['black', 'black']} style={styles.gradient} />
			</TouchableOpacity>
			{isPreLoading && (
				<ActivityIndicator
					animating
					size="large"
					color={colors.gray}
					style={styles.activityIndicator}
				/>
			)}
			{/* <View style={styles.innerRootView}> */}
			{/* <View style={styles.innerTopView} /> */}

			{/* <View style={styles.innerBottomView}> */}
			<View style={styles.betsView}>
				{itemData?.bet && Object.keys(itemData?.bet).length !== 0 && (
					<OtherUserProfileReplicateBetComponent
						itemData={{
							...itemData?.bet,
							betTaker: itemData?.betTaker,
							users: itemData?.users
						}}
						isHideReplicateBet={true}
						isOnlyHideBetTitle={false}
						isFromDiscoverVideo={true}
						handleMenuPress={() => {}}
						handleBetMakerUserPicked={() => {
							navigation.navigate(ScreenNames.OtherUserProfileScreen, {
								userId: itemData?.users?._id
							});
						}}
						handleBetTackerPicked={() => {
							navigation.navigate(ScreenNames.JoinBetCreateScreen, {
								betId: itemData?.bet?._id
							});
						}}
						handleAlreadyBetTackerUserPicked={() => {
							navigation.navigate(ScreenNames.OtherUserProfileScreen, {
								userId: itemData?.betTaker?.takerDetails?._id
							});
						}}
						handleReplicateBet={() => {
							navigation.navigate(ScreenNames.ReplicateBetCreatScreen, {
								eventBetData: itemData?.bet
							});
						}}
					/>
				)}
				{!isLoadVideoFromStory && (
					<TouchableOpacity
						onPress={() => {
							getAllUserList();
						}}
						hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
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
					</TouchableOpacity>
				)}
			</View>
			{/* </View> */}
			{/* </View> */}

			<ShareVideoModal
				isVisible={isShowShareModal}
				onBtnClose={() => {
					setIsShowShareModal(!isShowShareModal);
				}}
				friendList={userListData}
				onSendLink={() => {
					handleShareVideo();
				}}
				onEndReach={() => {
					onEndReached();
				}}
				onBtnDownload={() => {
					handleDownloadVideo();
				}}
				onFriendViewSelection={(item: any) => {
					sendVideoLinkWithFriend(item);
				}}
			/>
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		// height: screen_Height,
		width: '100%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
		// backgroundColor: 'red',
		// ...StyleSheet.absoluteFillObject,
		// width: screenWidth,
	},
	imageBgStyle: {
		// width: screenWidth - horizontalScale(120),
		aspectRatio: 0.6,
		opacity: 0.2,
		position: 'absolute',
		width: '100%',
		aspectRatio: 1,
		opacity: 0.2,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center'
	},
	activityIndicator: {
		// height: 50,
		// flex: 1,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center'
	},
	fullScreenVideo: {
		height: '100%',
		width: '100%',
		position: 'absolute',
		backgroundColor: defaultTheme.backGroundColor
	},
	gradient: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		// height: '100%',
		opacity: 0.4
	},
	betsView: {
		bottom: 120,
		width: screenWidth - horizontalScale(16),
		position: 'absolute'
	},
	hitSlop: {
		left: 18,
		top: 18,
		right: 18,
		bottom: 18
	},
	shareView: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		marginTop: verticalScale(48)
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
	innerRootView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
		// height: '100%',
		// width: '100%',
		// position: 'absolute',
	},
	innerTopView: {
		flex: 0.5,
		width: screenWidth,
		justifyContent: 'flex-end',
		marginBottom: verticalScale(4)
	},
	innerBottomView: {
		flex: 0.5,
		width: screenWidth,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: verticalScale(4)
	}
});

export default memo(DiscoverVideoPlayer);
