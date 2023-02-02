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
import {useDispatch} from 'react-redux';
import LottieView from 'lottie-react-native';
import UserGroupView from '../UserGroupView';
import useUpdateEffect from '../CustomHooks/useUpdateEffect';
import LoadMoreLoaderView from '../LoadMoreLoaderView';
import NoDataComponent from '../NoDataComponent';

const {v4: uuidv4} = require('uuid');

const DiscoverLiveStreamComponent = ({
	userInfo,
	friendList,
	onEndReach,
	params
}) => {
	const [isShowShareModal, setIsShowShareModal] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [liveChallengeData, setLiveChallengeData] = useState([]);
	const dispatch = useDispatch();

	const lottieRef = React.useRef<LottieRefCurrentProps>(null);

	const [totalDiscoverMatchCount, setTotalDiscoverMatchCount] = useState(0);
	const [isShowNoForYou, setIsShowNoForYou] = useState(false);
	const [isShowSwipeUp, setIsShowSwipeUp] = useState(true);
	const [visibleParentIndex, setVisibleParentIndex] = React.useState<number>(0);
	const animation = useRef(null);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

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
									{`@${item?.users?.userName} `}
									<Text style={{color: colors.white, textAlign: 'center'}}>
										{Strings.Is_creating_the_following_challenge_and_ITS_LIVE}
									</Text>
								</Text>
								<Text numberOfLines={2} style={styles.liveFeedNameText}>
									{item?.feed_name}
								</Text>
							</View>
							<View style={styles.liveStreamBottomView}>
								{item?.isStarted ? (
									<UserGroupView
										onPressViewAll={() => {
											//navigation.navigate(ScreenNames.UserViewProfileScreen);
										}}
										colorArray={[colors.grey2]}
										angle={gradientColorAngle}
										rightIcon={false}
										buttonText={Strings.login}
										desText={''}
										style={styles.liveStreamWatchingView}
										shouldShowCloseButton={false}
										userArray={[
											{
												push_notifications: {
													pause_all_notifications: false,
													bet_join: true,
													bet_replicate: true,
													bet_invitation: true,
													new_followers: true,
													direct_messages: true,
													events_you_like: true,
													people_you_know: true,
													your_friends_bet: true
												},
												_id: '63bd0346da24177747ccbfa1',
												email: 'skstoryuser1@yopmail.com',
												walletAddress:
													'0xf388738fb39301eb8bcd4ab68c692623d007ee79',
												picture:
													'https://defibet.s3.us-east-2.amazonaws.com/avatars/1669812989074Avatar_2.png',
												isSocialLogin: true,
												socialLoginType: 'email',
												role: 0,
												loginActivity: [
													{
														device: 'iPhone 14',
														ipaddress: '192.168.0.208',
														country: 'India',
														isLoggedOut: true,
														loggedOutAt: 1673347101133,
														status: 'INACTIVE',
														_id: '63bd0346da24177747ccbfa2'
													},
													{
														device: 'iPhone 14 Pro',
														ipaddress: '192.168.0.208',
														country: 'India',
														isLoggedOut: true,
														loggedOutAt: 1673360707788,
														status: 'INACTIVE',
														_id: '63bd411de4191f1fc131253d'
													},
													{
														device: 'OnePlus 3T',
														ipaddress: '192.168.2.39',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63bd519ee4191f1fc132a432'
													},
													{
														device: 'iPhone 14',
														ipaddress: '192.168.0.111',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63bd7a7cf990c552887a82f2'
													},
													{
														device: 'iPhone 14 Pro',
														ipaddress: '192.168.0.111',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63bd7cbbf990c552887a9237'
													},
													{
														device: 'iPhone 14 Pro',
														ipaddress: '192.168.0.111',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63be554af990c552887adcf1'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63be5be5f990c552887ae1cf'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63be8495f990c552887cb599'
													},
													{
														device: 'iPhone 14',
														ipaddress: '192.168.0.111',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63beba5574c760b9ccbd7505'
													},
													{
														device: 'iPhone 14',
														ipaddress: '192.168.0.111',
														country: 'India',
														isLoggedOut: true,
														loggedOutAt: 1673513059648,
														status: 'INACTIVE',
														_id: '63bfaaddbc01149d97545212'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63bfcd19bc01149d97575dbe'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63c0f6e2204d511440789698'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63c1350f41087143c81ce353'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: true,
														loggedOutAt: 1673611212370,
														status: 'INACTIVE',
														_id: '63c1436041087143c81d1bb8'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: true,
														loggedOutAt: 1673611208071,
														status: 'INACTIVE',
														_id: '63c1438f41087143c81d1d34'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63c4e047e39f189fdd7f14e8'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: true,
														loggedOutAt: 1674110199804,
														status: 'INACTIVE',
														_id: '63c7840e33e3808951e91d76'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63c799acfcb169d7863a7827'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63c8e7a79df6eb2090530f34'
													},
													{
														device: 'iPhone 14',
														ipaddress: '192.168.0.111',
														country: 'India',
														isLoggedOut: true,
														loggedOutAt: 1674113331097,
														status: 'INACTIVE',
														_id: '63c8e7eb9df6eb2090531053'
													},
													{
														device: 'iPhone 8',
														ipaddress: '192.168.0.111',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63c8eefe9df6eb2090532381'
													},
													{
														device: 'iPhone 14',
														ipaddress: '192.168.0.111',
														country: 'India',
														isLoggedOut: true,
														loggedOutAt: 1674125803818,
														status: 'INACTIVE',
														_id: '63c8f1569df6eb2090532c2e'
													},
													{
														device: 'iPhone 14',
														ipaddress: '192.168.0.111',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63c9233d9df6eb20905447f9'
													},
													{
														device: 'OnePlus 3T',
														ipaddress: '192.168.0.141',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63c92cba329d7e912d8dcdc2'
													},
													{
														device: 'iPhone (7)',
														ipaddress: '192.168.2.15',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63c931b0329d7e912d8e80af'
													},
													{
														device: 'iPhone',
														ipaddress: '192.168.2.17',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63c938f4329d7e912d8e91db'
													},
													{
														device: 'Redmi note 8 pro',
														ipaddress: '192.168.2.13',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63c93a85329d7e912d8e93b3'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: true,
														loggedOutAt: 1674222072445,
														status: 'INACTIVE',
														_id: '63ca99db1a1249dbc6907bf2'
													},
													{
														device: 'iPhone 14 Pro',
														ipaddress: '192.168.0.111',
														country: 'India',
														isLoggedOut: true,
														loggedOutAt: 1674225922051,
														status: 'INACTIVE',
														_id: '63caa8681a1249dbc690833f'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: true,
														loggedOutAt: 1674462517499,
														status: 'INACTIVE',
														_id: '63ce19a41a1249dbc6913362'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: true,
														loggedOutAt: 1674469960315,
														status: 'INACTIVE',
														_id: '63ce28391a1249dbc6918fd8'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63ce68621a1249dbc6934a09'
													},
													{
														device: 'iPhone 14 Pro',
														ipaddress: '192.168.0.138',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63ce81371a1249dbc693e6ac'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63cf8bbe0834db750a690537'
													},
													{
														device: 'iPhone 11',
														ipaddress: '192.168.0.138',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63cf8fc80834db750a691e4f'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: true,
														loggedOutAt: 1674563525693,
														status: 'INACTIVE',
														_id: '63cf9a880834db750a6930d2'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63d0c84c7cf6d4e53b3afd08'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63d7673bf2b20433c95a6eb4'
													},
													{
														device: 'iPhone 14',
														ipaddress: '192.168.0.138',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63d7c845f2b20433c95c7635'
													},
													{
														device: 'iPhone 14',
														ipaddress: '192.168.0.138',
														country: 'India',
														isLoggedOut: true,
														loggedOutAt: 1675140096787,
														status: 'INACTIVE',
														_id: '63d89a71f2b20433c95cb804'
													},
													{
														device: 'iPhone 14 Pro',
														ipaddress: '192.168.0.138',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63d89c5cf2b20433c95cd875'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63d8f9d9c0a3ffc3b26b2739'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63d9075cc0a3ffc3b26b96d2'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63d9f7a01d2d8ae2033e153d'
													},
													{
														device: 'unknown',
														ipaddress: 'unknown',
														country: 'India',
														isLoggedOut: false,
														status: 'ACTIVE',
														_id: '63d9f9af1d2d8ae2033e3c99'
													}
												],
												visible: true,
												bettingStatisticsVisible: 'anyone',
												balanceVisible: 'nobody',
												betsVisible: 'anyone',
												messagesVisible: 'anyone',
												videosVisible: 'anyone',
												deviceToken: '',
												isJury: false,
												level: 1,
												userStrikeLevel: 1,
												juryStrikeLevel: 0,
												juryAdminWithdrawStrikeLevel: 0,
												isDeleted: false,
												isActive: true,
												removedSuggestedUsers: [],
												favCatIds: ['632c9261b7fbc2dbad023f39'],
												favSubCatIds: ['622f106da1c8272d4b83c500'],
												createdAt: '2023-01-10T06:18:46.605Z',
												updatedAt: '2023-02-01T05:33:35.051Z',
												__v: 0,
												birthDate: '10-01-2005',
												country: 'India',
												userName: 'Skstoryuser1',
												affiliateCode: '6FXMIEZ1',
												referrerAffiliateCode: null,
												biography: '',
												displayName: '',
												preferredSubCategories: ''
											}
										]}
										userCount={0}
										userID={''}
										isFromLive
										isFromLiveDiscover
									/>
								) : (
									<Text style={styles.streamStartTimeText}>
										{`${Strings.START_TIME}: ${dateTimeConvert(
											item?.start_date_time
										)}`.toUpperCase()}
									</Text>
								)}

								<View
									style={{
										paddingHorizontal: horizontalScale(12),
										marginTop: verticalScale(12)
									}}>
									<LiveStreamingTag
										text={Strings.WATCH_LIVE_STREAM}
										backgroundColor={colors.redTag}
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
		paddingVertical: verticalScale(12),
		marginTop: verticalScale(10)
	},
	liveStreamWatchingView: {
		padding: 0,
		margin: 0,
		paddingHorizontal: horizontalScale(8)
	},
	streamStartTimeText: {
		textAlign: 'center',
		fontSize: 12,
		color: colors.white,
		fontFamily: fonts.type.Inter_Medium
	}
});

export default memo(DiscoverLiveStreamComponent);
