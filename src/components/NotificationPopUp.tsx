/* eslint-disable no-case-declarations */
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import icons from '../assets/icon';
import Strings from '../constants/strings';
import {navigatePush, navigationRef} from '../navigation/navigationHelper';
import ScreenNames from '../navigation/screenNames';
import {getLiveStreamingData} from '../redux/apiHandler/apiActions';
import {resetNotificationData} from '../redux/reducerSlices/userInfo';
import {RootState} from '../redux/store';
import colors from '../theme/colors';
import useUpdateEffect from './CustomHooks/useUpdateEffect';
import {NotificationProps} from './NotificationPopUpComponent';
import NotificationPopUpModalView from './NotificationPopUpModalView';

const NotificationPopUp = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const [notificationData, setNotificationData] = useState<NotificationProps>(
		{}
	);

	const userNotificationData = useSelector((state: RootState) => {
		return state.userInfo.notification;
	});

	const [isNotificationModelVisible, setIsNotificationModelVisible] =
		useState(false);

	function resetData() {
		setIsNotificationModelVisible(false);
		dispatch(resetNotificationData({}));
		setNotificationData({});
	}

	function handleNotificationPopUpBtn() {
		resetData();
		switch (userNotificationData?.notification_type) {
			case Strings.notification_types.trending_sub_category:
				{
					let categoryData =
						userNotificationData &&
						JSON.parse(userNotificationData?.categories);
					let subCategoryData =
						userNotificationData &&
						JSON.parse(userNotificationData?.subcategories);
					navigation.navigate(ScreenNames.BetsCategoryScreen, {
						matchData: {
							issubcategories: true,
							categories: categoryData,
							subcategories: subCategoryData
						},
						isfromTrendingNotification: true
					});
				}
				break;
			case Strings.notification_types.most_followers:
				return navigation.navigate(ScreenNames.OtherUserProfileScreen, {
					userId: userNotificationData?.user_id
				});
			case Strings.notification_types.bet_replicate_trending:
				if (userNotificationData?.isCustom === 'true') {
					navigatePush(ScreenNames.CustomBetDetailsScreen, {
						title: Strings.feed,
						betCreationType: 1,
						betId: userNotificationData?.parent_bet_id,
						id: userNotificationData?.bet_id
					});
				} else {
					navigatePush(ScreenNames.EventDetailsScreen, {
						title: Strings.feed,
						betCreationType: 1,
						matchId: userNotificationData?.match_id
					});
				}

				break;
			case Strings.notification_types.match_trending:
				return navigatePush(ScreenNames.EventDetailsScreen, {
					title: Strings.feed,
					matchId: userNotificationData?.match_id,
					betCreationType: 1
				});
			case Strings.notification_types.numerious_bets_created:
				return navigation.navigate(ScreenNames.BottomTabScreen, {
					screen: ScreenNames.FeedsRouter,
					params: {
						screen: ScreenNames.FeedScreen
					}
				});
			case Strings.notification_types.live_streaming_trending:
				const uploadData = {
					feed_id: userNotificationData?.feed_id
				};
				getLiveStreamingData(uploadData)
					.then(res => {
						navigation.navigate(ScreenNames.EventDetailsScreen, {
							feedObject: res?.data?.matchList[0],
							betCreationType: 1,
							selectedBetType: res?.data?.betType,
							isFromStreaming: true
						});
					})
					.catch(() => {});
				break;
			case Strings.notification_types.trending_category:
				{
					let categoryData =
						userNotificationData &&
						JSON.parse(userNotificationData?.categories);
					navigation.navigate(ScreenNames.BetsCategoryScreen, {
						matchData: {
							issubcategories: true,
							categories: categoryData
						},
						isfromTrendingNotification: true
					});
				}
				break;
		}
	}

	useUpdateEffect(() => {
		const dataCount =
			userNotificationData && Object?.keys(userNotificationData)?.length;

		if (
			navigationRef.current.getCurrentRoute().name !==
				ScreenNames.SplashScreen &&
			(navigationRef.current.getCurrentRoute().name ===
				ScreenNames.FeedScreen ||
				navigationRef.current.getCurrentRoute().name ===
					ScreenNames.LiveStreamingScreen ||
				navigationRef.current.getCurrentRoute().name ===
					ScreenNames.ProfileScreen ||
				navigationRef.current.getCurrentRoute().name ===
					ScreenNames.DiscoverScreen ||
				navigationRef.current.getCurrentRoute().name ===
					ScreenNames.NotificationScreen ||
				navigationRef.current.getCurrentRoute().name ===
					ScreenNames.CustomBetDetailsScreen ||
				navigationRef.current.getCurrentRoute().name ===
					ScreenNames.ChatDetailsScreen ||
				navigationRef.current.getCurrentRoute().name ===
					ScreenNames.EventDetailsScreen ||
				navigationRef.current.getCurrentRoute().name ===
					ScreenNames.ChatListScreen)
		) {
			if (dataCount > 0) {
				showNotificationView();
			}
		}
	}, [
		userNotificationData,
		userNotificationData?.notification_type,
		navigationRef.current?.getCurrentRoute().name
	]);

	function showNotificationView() {
		setIsNotificationModelVisible(true);
		switch (userNotificationData?.notification_type) {
			case Strings.notification_types.most_followers:
				return setNotificationData({
					title: userNotificationData?.title,
					buttonTitle: Strings.see_user_profile,
					highlightedDescription: userNotificationData?.userName,
					description1: userNotificationData?.firstString,
					description2: userNotificationData?.secondString,
					isTitleGradient: false,
					isDescriptionGradient: false,
					color: colors.red,
					onPressButton: () => {
						handleNotificationPopUpBtn();
					},
					imgPath: icons.emoji_amazing
				});
			case Strings.notification_types.trending_sub_category:
				{
					let subCategoryData =
						userNotificationData &&
						userNotificationData?.subcategories &&
						JSON.parse(userNotificationData?.subcategories);
					setNotificationData({
						title: userNotificationData?.title,
						buttonTitle: Strings.create_bet_and_win,
						highlightedDescription: subCategoryData?.name,
						description1: userNotificationData?.firstString,
						description2: userNotificationData?.secondString,
						isTitleGradient: false,
						isDescriptionGradient: false,
						color: colors.red,
						onPressButton: () => {
							handleNotificationPopUpBtn();
						},
						imgPath: icons.emoji_surprised
					});
				}
				break;
			case Strings.notification_types.trending_category:
				{
					let categoryData =
						userNotificationData &&
						userNotificationData?.categories &&
						JSON.parse(userNotificationData?.categories);
					setNotificationData({
						title: userNotificationData?.title,
						buttonTitle: Strings.create_bet_and_win,
						highlightedDescription: categoryData?.name,
						description1: userNotificationData?.firstString,
						description2: userNotificationData?.secondString,
						isTitleGradient: false,
						isDescriptionGradient: false,
						color: colors.red,
						onPressButton: () => {
							handleNotificationPopUpBtn();
						},
						imgPath: icons.emoji_blowout
					});
				}
				break;
			case Strings.notification_types.match_trending:
				return setNotificationData({
					title: userNotificationData?.title,
					buttonTitle: Strings.create_bet_and_win,
					highlightedDescription: userNotificationData?.matchName,
					description1: userNotificationData?.firstString,
					description2: userNotificationData?.secondString,
					isTitleGradient: false,
					isDescriptionGradient: true,
					color: colors.white,
					onPressButton: () => {
						handleNotificationPopUpBtn();
					},
					imgPath: icons.emoji_wow
				});
			case Strings.notification_types.live_streaming_trending:
				return setNotificationData({
					title: userNotificationData?.title,
					buttonTitle: Strings.create_bet_and_win,
					highlightedDescription: userNotificationData?.matchName,
					description1: userNotificationData?.firstString,
					description2: userNotificationData?.secondString,
					isTitleGradient: false,
					isDescriptionGradient: true,
					color: colors.white,
					onPressButton: () => {
						handleNotificationPopUpBtn();
					},
					imgPath: icons.emoji_hey
				});
			case Strings.notification_types.bet_replicate_trending:
				return setNotificationData({
					title: userNotificationData?.title,
					buttonTitle: Strings.participate_and_win,
					highlightedDescription: userNotificationData?.betQuestion,
					description1: userNotificationData?.firstString,
					description2: userNotificationData?.secondString,
					isTitleGradient: false,
					isDescriptionGradient: true,
					color: colors.white,
					onPressButton: () => {
						handleNotificationPopUpBtn();
					},
					imgPath: icons.emoji_omg
				});
			case Strings.notification_types.numerious_bets_created:
				return setNotificationData({
					title: userNotificationData?.title,
					buttonTitle: Strings.participate_and_win,
					highlightedDescription: '',
					description1: userNotificationData?.firstString,
					description2: userNotificationData?.secondString,
					isTitleGradient: true,
					isDescriptionGradient: false,
					color: colors.white,
					onPressButton: () => {
						handleNotificationPopUpBtn();
					},
					imgPath: icons.emoji_rocket
				});
			default:
				break;
		}
	}
	return (
		<>
			{isNotificationModelVisible && (
				<NotificationPopUpModalView
					isVisible={isNotificationModelVisible}
					onBtnSkipPressed={() => {
						resetData();
					}}
					onPressButton={handleNotificationPopUpBtn}
					title={notificationData.title}
					buttonTitle={notificationData.buttonTitle}
					description1={notificationData.description1}
					description2={notificationData.description2}
					highlightedDescription={notificationData.highlightedDescription}
					isDescriptionGradient={notificationData.isDescriptionGradient}
					isTitleGradient={notificationData.isTitleGradient}
					imgPath={notificationData.imgPath}
					descriptionHighlightColor={notificationData.color}
				/>
			)}
		</>
	);
};

export default NotificationPopUp;
