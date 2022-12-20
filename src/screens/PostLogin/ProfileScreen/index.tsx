import {
	useIsFocused,
	useNavigation,
	useScrollToTop
} from '@react-navigation/native';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, Share, View} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import icons from '../../../assets/icon';
import BetsListView from '../../../components/BetsListView';
import BetsProgress from '../../../components/BetsProgress';
import ButtonLeftIconGradient from '../../../components/ButtonLeftIconGradient';
import ConformationPopupComponet from '../../../components/ConformationPopupComponet';
import CurrencyBalanceVIew from '../../../components/CurrencyBalanceVIew';
import useUpdateEffect from '../../../components/CustomHooks/useUpdateEffect';
import HeaderComponent from '../../../components/HeaderComponent';
import MonthSelection from '../../../components/MonthSelection';
import PieChartComponent from '../../../components/PieChartComponent';
import ProfileComponent from '../../../components/ProfileComponent';
import TutorialView from '../../../components/TutorialView';
import UserExperienceView from '../../../components/UserExperienceView';
import UserGroupView from '../../../components/UserGroupView';
import UserInfoComponent from '../../../components/UserInfoComponent';
import {ApiBaseUrl} from '../../../constants/api';
import Strings from '../../../constants/strings';
import {
	getLevelRank,
	getProfileShareUrl
} from '../../../constants/utils/Function';
import ScreenNames from '../../../navigation/screenNames';
import {
	getCMS,
	getUserBetStats,
	getUserProfile,
	removeVisitors
} from '../../../redux/apiHandler/apiActions';
import {
	hideBottomTab,
	showInviteUser,
	showTutorial
} from '../../../redux/reducerSlices/dashboard';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import {RootState} from '../../../redux/store';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import {gradientColorAngle} from '../../../theme/metrics';
import styles from './style';

const ProfileScreen: React.FC<any> = props => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const isFocused = useIsFocused();

	const scrollRef = useRef(null);
	useScrollToTop(scrollRef);

	const [modalVisible, setModalVisible] = useState(false);
	const [visitUserView, setVisitUserView] = useState(false);

	const connector = useWalletConnect();

	const userProfileInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const [betsStats, setBetsStats] = useState();
	const [betsLost, setBetsLost] = useState();
	const [betsPending, setBetsPending] = useState();
	const [betsWon, setBetsWon] = useState();
	const [betsStatisticsType, setBetsStatisticsType] = useState('All');

	const [betWonPercent, setBetWonPercent] = useState(0);
	const [betLossPercent, setBetLossPercent] = useState(0);

	const [allBetsLost, setAllBetsLost] = useState();
	const [allBetsPending, setAllBetsPending] = useState();
	const [allBetsWon, setAllBetsWon] = useState();
	const [allBetWonPercent, setAllBetWonPercent] = useState(0);
	const [allBetLossPercent, setAllBetLossPercent] = useState(0);

	const isTutorial = useSelector((state: RootState) => {
		return state.dashboard.isShowTutorial;
	});
	const [isShowTutorial, setIsShowTutorial] = useState(isTutorial);

	const [shareContent, setShareContent] = useState('');
	const regex = /(<([^>]+)>)/gi;

	useEffect(() => {
		dispatch(updateApiLoader({apiLoader: true}));
		setShareContent(
			getProfileShareUrl(
				userProfileInfo?.user?.displayName || userProfileInfo?.user?.userName
			)
		);
	}, []);

	useEffect(() => {
		if (isFocused) {
			setVisitUserView(false);
			dispatch(getUserProfile({}));
		}
		console.log('isFocused??????', userProfileInfo?.user?.level);
	}, [isFocused]);

	useUpdateEffect(() => {
		dispatch(updateApiLoader({apiLoader: false}));
		setBetsStats(userProfileInfo?.user?.stats);
		setBetsStatisticsType('All');
		setBetResults(userProfileInfo?.user, 'All');
		const hasVisitor = userProfileInfo?.user?.visitor?.length;
		setVisitUserView(hasVisitor);
	}, [userProfileInfo]);

	function setBetResults(data: any, daysType: string) {
		const wonBets = data?.betsWon;
		const lostBets = data?.betsLost;
		setBetsPending(data?.betsPending);
		setBetsWon(wonBets);
		setBetsLost(lostBets);

		const totalBets = wonBets + lostBets;
		let wonPercent = 0;
		let lossPercent = 0;
		if (totalBets !== 0) {
			wonPercent = Math.floor(parseFloat(wonBets / totalBets) * 10000) / 100;
			lossPercent = Math.floor(parseFloat(lostBets / totalBets) * 10000) / 100;
		}
		setBetWonPercent(wonPercent);
		setBetLossPercent(lossPercent);

		if (daysType === 'All') {
			setAllBetsWon(wonBets);
			setAllBetsLost(lostBets);
			setAllBetsPending(data?.betsPending);
			setAllBetWonPercent(wonPercent);
			setAllBetLossPercent(lossPercent);
		}
	}

	const getUserBetStatsData = (daysType: any) => {
		dispatch(updateApiLoader({apiLoader: true}));

		let uploadData = {};

		if (
			daysType === 'Today' ||
			daysType === 'All' ||
			daysType === 'Last week' ||
			daysType === 'Last month'
		) {
			uploadData = {days: daysType.toLowerCase(), viewDetails: false};
		} else {
			uploadData = {
				from: daysType?.firstDate,
				to: daysType?.secondDate,
				viewDetails: false
			};
		}

		getUserBetStats(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getUserBet Response : ', res?.data?.stats);
				setBetsStats(res?.data?.stats);
				setBetResults(res?.data, daysType);
				// setBetsLost(res?.data?.betsLost);
				// setBetsPending(res?.data?.betsPending);
				// setBetsWon(res?.data?.betsWon);

				// const totalBets = res?.data?.betsWon + res?.data?.betsLost;
				// let wonPercent = 0;
				// let lossPercent = 0;
				// if (totalBets !== 0) {
				// 	wonPercent = parseFloat(res?.data?.betsWon / totalBets) * 100;
				// 	lossPercent = parseFloat(res?.data?.betsLost / totalBets) * 100;
				// }
				// setBetWonPercent(Math.floor(wonPercent * 100) / 100);
				// setBetLossPercent(Math.floor(lossPercent * 100) / 100);

				// if (daysType === 'All') {
				// 	setAllBetsWon(res?.data?.betsWon);
				// 	setAllBetsLost(res?.data?.betsLost);
				// 	setAllBetsPending(res?.data?.betsPending);
				// 	setAllBetWonPercent(betWonPercent);
				// 	setAllBetLossPercent(betLossPercent);
				// }
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getUserBet Data Err : ', err);
			});
	};

	const removeVisitorsData = () => {
		removeVisitors()
			.then(res => {
				console.log('removeVisitorsData Response : ', res);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('removeVisitorsData Data Err : ', err);
			});
	};

	const renderCurrencyItem = ({item}) => (
		<CurrencyBalanceVIew
			onPress={() => {
				// handleSubmit();
				// navigation.replace(ScreenNames.BottomTabScreen);
				//  navigation.navigate(ScreenNames.ProfileSetupScreen);
			}}
			leftIconPath={'https://picsum.photos/200/300'}
			title={'MATIC'}
			subtitle={'0,02'}
			balance={'= USD 69,66'}
		/>
	);

	const renderBetsItem = ({item}) => (
		<BetsListView
			onPress={() => {
				console.log('item', item);
				navigation.navigate(ScreenNames.BetDetailsScreen, {
					bet_id: item?._id,
					redirectType: item.betStatus,
					isFromOtherUser: false
				});
			}}
			// gameImage={
			//   item?.match?.image ??
			//   item?.bet?.custom_bet_image ??
			//   item?.custom_bet_image
			// }
			gameImage={item?.subcategories?.imageUrl ?? item?.categories?.imageUrl}
			bet_amount={item?.bet_amount}
			buttonText={'See Details'}
			startTime_timestamp={
				item?.match?.gmt_timestamp ?? new Date(item?.createdAt).getTime()
			}
			endTime_timestamp={item?.match?.match_end_time ?? item?.betEndDate}
			marketName={
				item?.betQuestion ??
				item?.mainmarkets?.market_name +
					(item?.market_sub_name ? ' : ' + item?.market_sub_name : '')
			}
			matchName={item?.match?.matchName}
			teamName={
				item?.bet_type === 1
					? item?.betQuestion
					: `${item?.match?.localTeamName} vs. ${item?.match?.visitorTeamName}`
			}
			tokenTypes={' ' + item?.tokentypes?.short_name + ' '}
			item={item}
			isShowDetail
		/>
	);

	const onShare = async (url: string) => {
		try {
			const result = await Share.share({
				message: url
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
			Alert.alert(error.message);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onSettingIconPath={icons.editProfile}
					onSettingMenuPress={() => {
						navigation.navigate(ScreenNames.EditProfileScreen);
					}}
					// onAddIconPath={icons.support}
					// onAddMenuPress={() => {
					//   navigation.navigate(ScreenNames.SupportTicketsList);
					// }}
					// onAddIconPath={icons.logout}
					// onAddMenuPress={async () => {
					//   dispatch(updateDeviceToken({deviceToken: ''}));
					//   dispatch(resetProfileData({}));
					//   dispatch(logout());
					//   await magic.user.logout();
					//   connector?.killSession();
					//   magic.user.isLoggedIn().then(value => {
					//     console.log(value, 'magic.user.isLoggedIn()');
					//   });
					//   console.log('magic.user.isLoggedIn()');
					// }}
					onSendIconPath={icons.setting}
					onSendMenuPress={() => {
						navigation.navigate(ScreenNames.SettingsScreen);
					}}
					//isSendBadge={true}
					isNotificationBadge={true}
				/>
				{userProfileInfo?.user !== {} && (
					<ScrollView
						ref={scrollRef}
						contentContainerStyle={{paddingBottom: 100}}
						// enableOnAndroid={false}
						bounces={false}>
						<View style={styles.viewContain}>
							<Text style={styles.nameStyle}>{`Hello, ${
								userProfileInfo?.user?.displayName ||
								userProfileInfo?.user?.userName
							}`}</Text>
							<ProfileComponent
								profileImgPath={userProfileInfo?.user?.picture}
								levelRank={userProfileInfo?.user?.level}
							/>
							<Text
								style={
									styles.userNameStyle
								}>{`@${userProfileInfo?.user?.userName}`}</Text>
							<Text style={styles.noobNameStyle}>
								{getLevelRank(userProfileInfo?.user?.level)?.type}
							</Text>
							{userProfileInfo?.user?.biography ? (
								<Text style={styles.bioGraphyStyle} numberOfLines={3}>
									{userProfileInfo?.user?.biography}
								</Text>
							) : null}

							<DropShadow
								style={{
									shadowColor: defaultTheme.secondaryBackGroundColor,
									shadowOffset: {
										width: 0,
										height: 0
									},
									shadowOpacity: 0.5,
									shadowRadius: 5,
									elevation: 5
								}}>
								<ButtonLeftIconGradient
									onPress={() => {
										navigation.navigate(ScreenNames.DiscoverFindFriendsScreen);
									}}
									colorArray={[
										defaultTheme.backGroundColor,
										defaultTheme.backGroundColor
									]}
									angle={gradientColorAngle}
									buttonTextcolor={colors.white}
									buttonText={Strings.connect_friends}
									style={styles.loginButtonSocial}
									leftIconPath={icons.ic_contact_green}
									textType={'none'}
								/>
							</DropShadow>
							<DropShadow
								style={{
									shadowColor: defaultTheme.secondaryBackGroundColor,
									shadowOffset: {
										width: 0,
										height: 0
									},
									shadowOpacity: 0.5,
									shadowRadius: 5,
									elevation: 5
								}}>
								<ButtonLeftIconGradient
									onPress={() => {
										onShare(shareContent);
									}}
									colorArray={[
										defaultTheme.backGroundColor,
										defaultTheme.backGroundColor
									]}
									angle={gradientColorAngle}
									buttonTextcolor={colors.white}
									buttonText={Strings.share_defibet_house_app}
									style={styles.loginButtonSocial}
									leftIconPath={icons.share_green_gradient}
									textType={'none'}
								/>
							</DropShadow>

							<View style={styles.viewUserInfo}>
								<UserInfoComponent
									onActiveBetsPress={() => {
										navigation.navigate(ScreenNames.MyBetListScreen, {
											isMyProfile: true
										});
									}}
									onFollowersPress={() => {
										navigation.navigate(ScreenNames.FollowingFollowersScreen, {
											userId: userProfileInfo?.user?._id,
											type: 0
										});
									}}
									onFollowingPress={() => {
										navigation.navigate(ScreenNames.FollowingFollowersScreen, {
											type: 1,
											userId: userProfileInfo?.user?._id
										});
									}}
									onCreatePress={() => {
										navigation.navigate(ScreenNames.MyBetListScreen, {
											isMyProfile: true
										});
									}}
									onWalletPress={() => {
										navigation.navigate(ScreenNames.WalletTabRoutes);
									}}
									activeBets={userProfileInfo?.user?.activeBets}
									followersCount={userProfileInfo?.user?.userFollower}
									followingCount={userProfileInfo?.user?.userFollowing}
									colorArray={defaultTheme.primaryGradientColor}
									createBtnText={Strings.my_bets.toUpperCase()}
									walletBtnText={Strings.str_wallet.toUpperCase()}
									walletBtnColorArray={defaultTheme.primaryGradientColor}
									isSendMsgShow={true}
								/>
							</View>
							{userProfileInfo?.user?.visitor?.length > 0 && visitUserView && (
								<View style={{borderRadius: 8, overflow: 'hidden'}}>
									<UserGroupView
										onPressViewAll={() => {
											navigation.navigate(ScreenNames.UserViewProfileScreen);
										}}
										onCloseButtonPress={() => {
											removeVisitorsData();
											setVisitUserView(false);
										}}
										colorArray={defaultTheme.ternaryGradientColor}
										angle={gradientColorAngle}
										buttonTextcolor={colors.white}
										rightIcon={true}
										buttonText={Strings.login}
										style={styles.userGroupStyle}
										desText={Strings.visited_your_profile}
										shouldShowCloseButton={true}
										userArray={userProfileInfo?.user?.visitor}
										userCount={
											userProfileInfo?.user?.visitorCount > 0 &&
											userProfileInfo?.user?.visitorCount
										}
										userID={''}
									/>
								</View>
							)}

							<View style={styles.viewChart}>
								<Text style={styles.statisticsTitleStyle}>
									{Strings.betStatistics}
								</Text>
								<MonthSelection
									onPress={type => {
										if (type !== betsStatisticsType && type) {
											setBetsStatisticsType(type);
											getUserBetStatsData(type);
										}
									}}
									colorArray={defaultTheme.ternaryGradientColor}
									angle={gradientColorAngle}
									buttonText={betsStatisticsType}
									rightIcon={true}
									style={styles.userBetsViewStyle}
									dataSource={[
										'All',
										'Today',
										// 'Yesterday',
										'Last week',
										'Last month',
										'Custom date range'
									]}
								/>
								<BetsProgress
									onActiveBetsPress={() => {
										// setSideMenuModalVisible(!sideMenuModalVisible);
									}}
									onFollowersPress={() => {
										// navigation.navigate(Navigation.SelectSkillScreen);
									}}
									onFollowingPress={() => {
										// navigation.navigate(Navigation.SelectSkillScreen);
									}}
									onCreatePress={() => {
										// navigation.navigate(Navigation.SelectSkillScreen);
									}}
									onAWalletPress={() => {
										// navigation.navigate(Navigation.SelectSkillScreen);
									}}
									betsLost={betsLost}
									betsPending={betsPending}
									betsWon={betsWon}
									betWonPercent={betWonPercent}
									betLossPercent={betLossPercent}
								/>
								{betsStats?.length > 0 && (
									<>
										<Text style={styles.categoryStyle}>
											{Strings.mostLovedCategories.toLocaleUpperCase()}
										</Text>
										<PieChartComponent betsStats={betsStats} />
									</>
								)}
							</View>
							<UserExperienceView
								userLevel={userProfileInfo?.user?.level}
								userLevelMaxBetValue={userProfileInfo?.user?.maximumLevelBets}
								userLevelMinBetValue={userProfileInfo?.user?.minimumLevelBets}
								totalBetsCount={userProfileInfo?.user?.totalBets}
								progressTitle={Strings.progress}
								nextGoalTitle={Strings.nextGoal}
								currentFeesTitle={Strings.currentFees}
								currentFees={userProfileInfo?.user?.platformFees}
							/>
							{/* <UserGroupView
                onPress={() => {
                  // handleSubmit();
                  // navigation.replace(ScreenNames.BottomTabScreen);
                  //  navigation.navigate(ScreenNames.ProfileSetupScreen);
                }}
                colorArray={defaultTheme.ternaryGradientColor}
                angle={gradientColorAngle}
                buttonTextcolor={colors.white}
                rightIcon={true}
                buttonText={Strings.login}
                style={styles.userGroupStyle}
              /> */}
							{/* <View style={styles.viewChart}>
                <Text style={styles.statisticsTitleStyle}>{Strings.balance}</Text>
                <FlatList
                  style={styles.currencyStyle}
                  bounces={false}
                  data={[1]}
                  renderItem={renderCurrencyItem}
                />
              </View> */}
						</View>
					</ScrollView>
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
				{isShowTutorial && (
					<TutorialView
						style={{top: 0, bottom: 0, position: 'absolute'}}
						isShowPlusIcon={false}
						isShowTitle={true}
						isShowEventImg={false}
						isLast={true}
						popupTitle={Strings.bottomTabProfile}
						buttonTitle={Strings.got_it}
						description={Strings.str_tut_profile_desc}
						onNextPress={async () => {
							dispatch(showTutorial({isShowTutorial: false}));
							setIsShowTutorial(!isShowTutorial);
							navigation.navigate(ScreenNames.BottomTabScreen, {
								screen: ScreenNames.FeedsRouter,
								params: {
									screen: ScreenNames.FeedScreen
								}
							});
							global.tutorialTimer =  setTimeout(() => {
								dispatch(hideBottomTab({isHideBottomTab: true}));
								dispatch(showInviteUser({isShowInviteUser: true}));
							}, 120000);
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
		</SafeAreaView>
	);
};

export default ProfileScreen;
