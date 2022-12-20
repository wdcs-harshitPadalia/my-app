import React, {useEffect, useRef, useState} from 'react';
import {
	Alert,
	Animated,
	LayoutAnimation,
	Platform,
	RefreshControl,
	SectionList,
	UIManager,
	View
} from 'react-native';
import {Text} from 'react-native-elements';
import icons from '../../../assets/icon';
import Strings from '../../../constants/strings';
import styles from './style';
import HeaderComponent from '../../../components/HeaderComponent';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ConformationPopupComponet from '../../../components/ConformationPopupComponet';
import ScreenNames from '../../../navigation/screenNames';
import CustomTopTabView from '../../../components/CustomTopTabVIew';
import NotificationView from '../../../components/NotificationView';
import {defaultTheme} from '../../../theme/defaultTheme';
import NotificationFriendsView from '../../../components/NotificationFriendsView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {updateNotificationBadgeStatus} from '../../../redux/reducerSlices/userInfo';
import {
	confirmFriendRequest,
	declineFriendRequest,
	getUserNotificationsData,
	updatedUserNotificationsStatus
} from '../../../redux/apiHandler/apiActions';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import NotificationPromotionView from '../../../components/NotificationPromotionView';
import {RootState} from '../../../redux/store';
import useUpdateEffect from '../../../components/CustomHooks/useUpdateEffect';
import {resetNotifications} from '../../../redux/reducerSlices/notification';
import LoadMoreLoaderView from '../../../components/LoadMoreLoaderView';
import NotificationBetResultView from '../../../components/NotificationBetResultView';
import ButtonGradient from '../../../components/ButtonGradient';
import colors from '../../../theme/colors';
import {horizontalScale, verticalScale} from '../../../theme';
import NotificationJuryView from '../../../components/NotificationJuryView';
import NotificationBetDisputeResultView from '../../../components/NotificationBetDisputeResultView';
import NoDataComponent from '../../../components/NoDataComponent';
import NotificationRevealJuryResultView from '../../../components/NotificationRevealJuryResultView';
import {gradientColorAngle} from '../../../theme/metrics';
import FriendFlatList from '../../../components/FriendFlatList';

const NotificationScreen: React.FC<any> = props => {
	const navigation = useNavigation();
	const [modalVisible, setModalVisible] = useState(false);

	const [isSelectedIndex, setIsSelectedIndex] = useState(0);
	// const [previousNotifications, setPreviousNotifications] = useState([]);
	// const [newNotifications, setNewNotifications] = useState([]);

	const dispatch = useDispatch();

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [selectedAnimationId, setSelectedAnimationId] = useState(-1);

	const [data, setData] = useState([]);
	const isFocus = useIsFocused();

	const fadeAnim = useRef(new Animated.Value(1)).current;

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const fadeIn = cb => {
		Animated.timing(fadeAnim, {
			//value: 1,
			toValue: 0,
			useNativeDriver: true
		}).start(cb);
	};

	const notificationInfo = useSelector((state: RootState) => {
		return state.notification.notificationData;
	});

	const newNotifications = useSelector((state: RootState) => {
		return state.notification.newNotifications;
	});

	const oldNotifications = useSelector((state: RootState) => {
		return state.notification.previousNotifications;
	});

	const notificationInfoLoading = useSelector((state: RootState) => {
		return state.notification.loading;
	});

	const notificationErrorInfo = useSelector((state: RootState) => {
		return state.notification.failed;
	});

	const noDataItemArray = [
		{
			image_url: icons.no_notification,
			title_text: Strings.no_notification,
			description_text: Strings.no_notification_desc
		},
		{
			image_url: icons.no_prediction_market,
			title_text: Strings.no_bets,
			description_text: Strings.no_bets_desc
		},
		{
			image_url: icons.no_friends,
			title_text: Strings.no_friens,
			description_text: Strings.no_friens_desc
		}
	];

	useEffect(() => {
		dispatch(updateNotificationBadgeStatus(false));
	}, []);

	useUpdateEffect(() => {
		if (currentPage === 1 && isLoading === false && isRefreshing === false) {
			dispatch(updateApiLoader({apiLoader: notificationInfoLoading}));
		}
	}, [notificationInfoLoading]);

	useEffect(() => {
		if ((currentPage <= totalPage || totalPage === 0) && currentPage === 1) {
			if (currentPage === 1) {
				// dispatch(updateApiLoader({apiLoader: true}));
			} else {
				if (totalPage > 1) {
					//setIsLoading(true);
				}
			}
			callNotificationApi();
		}
		return () => {
			dispatch(resetNotifications({}));
		};
	}, [isSelectedIndex]);

	const resetNotificationApiData = async () => {
		await dispatch(resetNotifications({}));
		await setTotalPage(0);
		await setCurrentPage(1);
	};

	const callNotificationApi = async () => {
		dispatch(
			getUserNotificationsData({
				limit: '10',
				skip: currentPage - 1,
				type:
					isSelectedIndex === 0
						? 'all'
						: isSelectedIndex === 1
						? 'bet'
						: 'friend'
			})
		);
	};

	useUpdateEffect(() => {
		if (notificationErrorInfo) {
			setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
		}
	}, [notificationErrorInfo]);

	useUpdateEffect(() => {
		// console.log(
		//   'Math.ceil(notificationInfo?.count ?? 0 / 10)??',
		//   Math.ceil(notificationInfo?.count / 10),
		//   notificationInfo?.count,
		//   notificationInfo,
		// );
		//setTotalPage(Math.ceil(notificationInfo?.count / 10));
		if (notificationInfo?.count && notificationInfo?.count > 0) {
			setTotalPage(Math.ceil(notificationInfo?.count / 10));
		} else {
			setTotalPage(0);
		}
		setIsLoading(false);
		setIsRefreshing(false);

		//dispatch(updateApiLoader({apiLoader: false}));
	}, [notificationInfo]);

	useUpdateEffect(() => {
		if ((currentPage <= totalPage || totalPage === 0) && currentPage > 0) {
			if (currentPage === 1) {
				//dispatch(updateApiLoader({apiLoader: true}));
			} else {
				//setIsLoading(true);
			}
			callNotificationApi();
		} else {
			setIsLoading(false);
		}
	}, [currentPage]);

	useEffect(() => {
		setIsLoading(false);
		setIsRefreshing(false);
		//if (isFocus) {
		let DATA = [];
		if (newNotifications && newNotifications.length > 0) {
			DATA.push({
				title: 'New',
				data: newNotifications ?? []
			});
		}

		if (oldNotifications && oldNotifications.length > 0) {
			DATA.push({
				title: 'Previous',
				data: oldNotifications ?? []
			});
		}
		//LayoutAnimation.configureNext(layoutAnimConfig);
		//LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
		//setExpanded(!expanded);
		//Alert.alert('dfjk494590');
		setData(DATA);

		//return unsubscribe
		// }
	}, [newNotifications, oldNotifications]);

	const updateNotificationReadState = item => {
		dispatch(updatedUserNotificationsStatus({notification_id: item._id}));
	};

	const renderNotificationItem = item => {
		if (item.type === 'FRIEND') {
			return (
				<Animated.View
					style={
						item._id === selectedAnimationId
							? {opacity: fadeAnim}
							: {opacity: 1}
					}>
					<NotificationFriendsView
						onPress={async () => {
							// if (item?.notificationStatus === 'UNREAD') {
							//   updateNotificationReadState(item);
							// }
							if (item?.isAccepted) {
								navigation.navigate(ScreenNames.OtherUserProfileScreen, {
									userId: item.user?._id,
									notification_id: item._id
								});
							}
						}}
						onConfirm={() => {
							dispatch(
								confirmFriendRequest({
									following_id: item.user?._id,
									notification_id: item._id
								})
							);
							updateNotificationReadState(item);
						}}
						onReject={() => {
							setSelectedAnimationId(item._id);
							fadeIn(() => {
								dispatch(
									declineFriendRequest({
										following_id: item.user?._id,
										notification_id: item._id
									})
								);
								//updateNotificationReadState(item);
								setSelectedAnimationId(-1);
							});
						}}
						colorArray={
							item?.notificationStatus === 'UNREAD'
								? defaultTheme.ternaryGradientColor
								: [defaultTheme.backGroundColor, defaultTheme.backGroundColor]
						}
						data={item}
					/>
				</Animated.View>
			);
		} else if (
			item.type === 'PROMOTION' ||
			item.type === 'CLAIM_REWARD' ||
			item.type === 'BET_JOINED' ||
			item.type === 'BET_REPLICATED' ||
			item.type === 'NO_BET_TAKER'
		) {
			return (
				<NotificationPromotionView
					onPress={() => {
						console.log(item);
						if (item?.notificationStatus === 'UNREAD') {
							updateNotificationReadState(item);
						}
						if (item.type === 'NO_BET_TAKER') {
							navigation.navigate(ScreenNames.BetDetailsScreen, {
								bet_id: item?.bet?._id,
								redirectType: item?.bet?.betStatus,
								notification_id: item._id,
								isFromOtherUser: false
							});
						}
						// navigation.navigate(ScreenNames.OtherUserProfileScreen);
					}}
					colorArray={
						item?.notificationStatus === 'UNREAD'
							? defaultTheme.ternaryGradientColor
							: [defaultTheme.backGroundColor, defaultTheme.backGroundColor]
					}
					data={item}
				/>
			);
		} else if (item.type === 'SUPPORT_TICKET') {
			return (
				<NotificationPromotionView
					onPress={() => {
						if (item?.notificationStatus === 'UNREAD') {
							updateNotificationReadState(item);
						}
						// navigation.navigate(ScreenNames.OtherUserProfileScreen);
					}}
					colorArray={
						item?.notificationStatus === 'UNREAD'
							? defaultTheme.ternaryGradientColor
							: [defaultTheme.backGroundColor, defaultTheme.backGroundColor]
					}
					data={item}
				/>
			);
		} else if (
			item.type === 'NOT_SELECTED_JURY' ||
			item.type === 'VOTE_NOT_CONSIDERED'
		) {
			return (
				<NotificationPromotionView
					onPress={() => {
						if (item?.notificationStatus === 'UNREAD') {
							updateNotificationReadState(item);
						}
						// navigation.navigate(ScreenNames.OtherUserProfileScreen);
					}}
					colorArray={
						item?.notificationStatus === 'UNREAD'
							? defaultTheme.ternaryGradientColor
							: [defaultTheme.backGroundColor, defaultTheme.backGroundColor]
					}
					data={item}
				/>
			);
		} else if (
			item.type === 'RESULT' ||
			item.type === 'CUSTOM_BET_RESULT' ||
			item.type === 'BET_RESULT_REVIEW' ||
			item.type === 'BET_RESULT_CONFIRMATION' ||
			item.type === 'CUSTOM_BET_RESULT_TAKER' ||
			item.type === 'DISPUTE_EVIDENCE' ||
			item.type === 'RESULT_VERIFICATION_BETMAKER' ||
			item.type === 'MATCH_CANCELLED'
		) {
			return (
				// TYPE
				// RESULT : goalserve result > claim bet amount both maker and taker
				// CUSTOM_BET_RESULT : provide bet result > maker can do this
				// BET_RESULT_REVIEW : review result accept or open dispute > taker can do this
				// BET_RESULT_CONFIRMATION : claim bet amount both maker and taker
				// DISPUTE_EVIDENCE : maker can provide evidence
				// CUSTOM_BET_RESULT_TAKER : taker can provide evidence when maker dose not provide evidence

				<NotificationBetResultView
					onPress={() => {
						if (item?.notificationStatus === 'UNREAD') {
							updateNotificationReadState(item);
						}
						console.log('item>>????????()', item);
						navigation.navigate(ScreenNames.BetMakerResultScreen, {
							bet_id: item?.bet?._id,
							redirectType: item.type,
							betObj: item?.bet,
							notification_id: item._id
						});
					}}
					colorArray={
						item?.notificationStatus === 'UNREAD'
							? defaultTheme.ternaryGradientColor
							: [defaultTheme.backGroundColor, defaultTheme.backGroundColor]
					}
					data={item}
				/>
			);
		} else if (item.type === 'BET') {
			return (
				<NotificationView
					onPress={() => {
						if (item?.notificationStatus === 'UNREAD') {
							updateNotificationReadState(item);
						}
						console.log('item>>????????()', item);
						navigation.navigate(ScreenNames.JoinBetCreateScreen, {
							// eventBetData: item,
							isFromNotificationScreen: true,
							betId: item?.bet?._id,
							notification_id: item._id
						});
						//naviagte to join bet screen with decline option
						// navigation.navigate(ScreenNames.OtherUserProfileScreen);
					}}
					colorArray={
						item?.notificationStatus === 'UNREAD'
							? defaultTheme.ternaryGradientColor
							: [defaultTheme.backGroundColor, defaultTheme.backGroundColor]
					}
					data={item}
				/>
			);
		} else if (item.type === 'JURY' || item.type === 'JURY_INVITATION') {
			console.log('item>>????????()', item);
			return (
				<Animated.View
					style={
						item._id === selectedAnimationId
							? {opacity: fadeAnim}
							: {opacity: 1}
					}>
					<NotificationJuryView
						onPress={async () => {
							if (item?.notificationStatus === 'UNREAD') {
								updateNotificationReadState(item);
							}
							if (item.type === 'JURY') {
								navigation.navigate(ScreenNames.ViewDisputeScreen, {
									// userId: item.user?._id,
									// notification_id: item._id,
									betId: item?.bet?._id,
									juryId: item?.jury?._id
									// notification_id: item._id,
								});
							}
						}}
						onConfirm={() => {
							setSelectedAnimationId(item._id);
							fadeIn(() => {
								dispatch(
									confirmFriendRequest({
										type: 'JURY_INVITATION',
										bet_id: item.bet?._id,
										notification_id: item._id
									})
								);
								//updateNotificationReadState(item);
								setSelectedAnimationId(-1);
							});
						}}
						onReject={() => {
							setSelectedAnimationId(item._id);
							fadeIn(() => {
								dispatch(
									declineFriendRequest({
										type: 'JURY_INVITATION',
										bet_id: item.bet?._id,
										notification_id: item._id
									})
								);
								//updateNotificationReadState(item);
								setSelectedAnimationId(-1);
							});
						}}
						colorArray={
							item?.notificationStatus === 'UNREAD'
								? defaultTheme.ternaryGradientColor
								: [defaultTheme.backGroundColor, defaultTheme.backGroundColor]
						}
						data={item}
					/>
				</Animated.View>
			);
		} else if (
			item.type === 'DISPUTE_RESULT' ||
			item.type === 'JURY_RESULT' ||
			item.type === 'ADMIN_RESULT_DISPUTE' ||
			item.type === 'ADMIN_RESULT'
		) {
			return (
				// TYPE
				// DISPUTE_RESULT : maker and taker view dispute result
				// JURY_RESULT : jury view dispute result
				// ADMIN_RESULT : maker, taker and jury view dispute result

				<NotificationBetDisputeResultView
					onPress={() => {
						if (item?.notificationStatus === 'UNREAD') {
							updateNotificationReadState(item);
						}
						console.log('item>>????????()', item);
						if (item.type === 'ADMIN_RESULT') {
							navigation.navigate(ScreenNames.BetMakerResultScreen, {
								bet_id: item?.bet?._id,
								redirectType: item.type,
								betObj: item?.bet,
								notification_id: item._id
							});
						} else {
							navigation.navigate(ScreenNames.DisputeResultScreen, {
								betId: item?.bet?._id,
								redirectType: item.type,
								betObj: item?.bet,
								notification_id: item._id
							});
						}
					}}
					colorArray={
						item?.notificationStatus === 'UNREAD'
							? defaultTheme.ternaryGradientColor
							: [defaultTheme.backGroundColor, defaultTheme.backGroundColor]
					}
					data={item}
				/>
			);
		} else if (item.type === 'REVEAL_JURY_RESULT') {
			console.log('item>>????????()', item);
			return (
				<Animated.View
					style={
						item._id === selectedAnimationId
							? {opacity: fadeAnim}
							: {opacity: 1}
					}>
					<NotificationRevealJuryResultView
						onPress={async () => {
							if (item?.notificationStatus === 'UNREAD') {
								updateNotificationReadState(item);
							}
							navigation.navigate(ScreenNames.BetRevealResultScreen, {
								bet_id: item?.bet?._id,
								redirectType: item.type,
								betObj: item?.bet,
								notification_id: item._id
							});
						}}
						colorArray={
							item?.notificationStatus === 'UNREAD'
								? defaultTheme.ternaryGradientColor
								: [defaultTheme.backGroundColor, defaultTheme.backGroundColor]
						}
						data={item}
					/>
				</Animated.View>
			);
		} else {
			return null;
		}
	};

	const onShowList = () => {};
	return (
		<SafeAreaView style={styles.container}>
			<HeaderComponent
				onLeftMenuPress={() => {
					navigation.goBack();
				}}
				onLeftIconPath={icons.back}
				name={Strings.notifications}
				// onAddMenuPress={async () => {
				//   setModalVisible(true);
				// }}
				// onSendIconPath={icons.send}
				// onSendMenuPress={() => {
				//   navigation.navigate(ScreenNames.ChatListScreen);
				// }}
				// onAddIconPath={icons.plusRed}
				// onNotificationIconPath={icons.notification}
				// isSendBadge
			/>

			<View style={styles.viewContain}>
				<CustomTopTabView
					dataSource={[
						{
							id: 1,
							title: Strings.all,
							badgeCount: notificationInfo?.allNotificationCount
						},
						{
							id: 2,
							title: Strings.bets,
							badgeCount: notificationInfo?.betsNotificationCount
						},
						{
							id: 3,
							title: Strings.friends,
							badgeCount: notificationInfo?.friendNotificationCount
						}
					]}
					onTabChange={item => {
						resetNotificationApiData();
						setIsSelectedIndex(item);
					}}
					selectedIndex={isSelectedIndex}
				/>
				<SectionList
					sections={data}
					//style={{opacity: fadeAnim}}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item, index) => item?._id + index}
					renderItem={({item}) => renderNotificationItem(item)}
					renderSectionHeader={({section: {title}}) => (
						<Text style={styles.header}>{title}</Text>
					)}
					onMomentumScrollBegin={() => {
						//console.log('onMomentumScrollBegin????');
						//setPreventPagination(true);
					}}
					onMomentumScrollEnd={e => {
						if (
							currentPage <= totalPage &&
							totalPage > 1 &&
							e.nativeEvent.contentOffset.y > 0
						) {
							setIsLoading(true);
							setCurrentPage(currentPage + 1);
						}
					}}
					refreshControl={
						<RefreshControl
							refreshing={isRefreshing}
							enabled={true}
							onRefresh={async () => {
								await resetNotificationApiData();
								await setIsRefreshing(true);
								callNotificationApi();
								// if (currentPage !== 0) {
								//   resetNotificationApiData();
								//   setIsRefreshing(true);
								// } else {
								//   callNotificationApi();
								// }
								//callNotificationApi();
							}}
							title="Pull to refresh"
							tintColor="#fff"
							titleColor="#fff"
						/>
					}
					ListFooterComponent={() => (
						<>
							{isLoading && <LoadMoreLoaderView />}
							<View
								style={{
									display:
										isSelectedIndex === 0 &&
										!notificationErrorInfo &&
										currentPage == totalPage
											? 'flex'
											: 'none'
								}}>
								<Text style={styles.usernameStyle}>
									{Strings.suggestions_for_you}
								</Text>
								<FriendFlatList
									onShowList={onShowList}
									userId={userInfo?.user?._id}
									vertical
								/>
							</View>
						</>
					)}
					bounces={true}
					contentContainerStyle={{flexGrow: 1}}
					ListEmptyComponent={() => {
						return (
							<>
								{notificationErrorInfo && (
									// <View style={styles.noDataContainer}>
									//   <Text style={styles.noDataStyle}>{Strings.no_Data_Found}</Text>
									// </View>
									<NoDataComponent noData={noDataItemArray[isSelectedIndex]} />
								)}
							</>
						);
					}}
				/>
			</View>

			{/* {notificationErrorInfo && (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataStyle}>{Strings.no_Data_Found}</Text>
        </View>
      )} */}

			{/* <ButtonGradient
        colorArray={defaultTheme.primaryGradientColor}
        angle={gradientColorAngle}
        buttonTextcolor={colors.white}
        buttonText={'Open Dispute'}
        onPress={onPressOpenDispute}
        style={{marginHorizontal: horizontalScale(20)}}
      /> */}

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
		</SafeAreaView>
	);
};

export default NotificationScreen;
