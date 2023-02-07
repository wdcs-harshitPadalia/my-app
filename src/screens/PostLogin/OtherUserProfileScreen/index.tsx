import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import icons from '../../../assets/icon';
import BetsListView from '../../../components/BetsListView';
import BetsProgress from '../../../components/BetsProgress';
import HeaderComponent from '../../../components/HeaderComponent';
import MonthSelection from '../../../components/MonthSelection';
import PieChartComponent from '../../../components/PieChartComponent';
import ProfileComponent from '../../../components/ProfileComponent';
import UserInfoComponent from '../../../components/UserInfoComponent';
import Strings from '../../../constants/strings';
import ScreenNames from '../../../navigation/screenNames';
import {defaultTheme} from '../../../theme/defaultTheme';
import styles from './style';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
	followUnfollowUser,
	getOtherUserProfile,
	getUserBetStats,
	getUserLiveStreaming,
	updateChannel
} from '../../../redux/apiHandler/apiActions';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import useUpdateEffect from '../../../components/CustomHooks/useUpdateEffect';
import {ScrollView} from 'react-native-gesture-handler';
import CustomTopTabView from '../../../components/CustomTopTabVIew';
import CreateLeaguePopup from '../../../components/CreateLeaguePopup';
import {
	getLevelRank,
	uniqueIdGenerateFrom2Ids
} from '../../../constants/utils/Function';
import {RootState} from '../../../redux/store';
import {gradientColorAngle} from '../../../theme/metrics';
import NoDataComponent from '../../../components/NoDataComponent';
import LiveUserProfileComponent from '../../../components/LiveUserProfileComponent';

let scrollToViewPosition = 0;

const OtherUserProfileScreen: React.FC<any> = () => {
	const userData = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const navigation = useNavigation();
	const dispatch = useDispatch();
	const {userId, isRecent, removeUser} = useRoute().params; // type followers = 0 , following = 1

	const scrollRef = useRef();

	const [userProfileInfo, setUserProfileInfo] = useState();

	const [betsStats, setBetsStats] = useState();
	const [betsLost, setBetsLost] = useState();
	const [betsPending, setBetsPending] = useState();
	const [betsWon, setBetsWon] = useState();
	const [isSelectedBetTypeIndex, setIsSelectedBetTypeIndex] = useState(0);
	const [isSelectedIndex, seIsSelectedIndex] = useState(0);

	const [isFollowing, setIsFollowing] = useState(0);

	const [modalLeagueVisible, setModalLeagueVisible] = useState(false);

	const [betWonPercent, setBetWonPercent] = useState(0);
	const [betLossPercent, setBetLossPercent] = useState(0);

	const [isNoData, setIsNoData] = useState(false);
	const [liveEventData, setLiveEventData] = useState([]);
	const [betData, setBetData] = useState({});

	const noDataItemArray = [
		{
			image_url: icons.star_congrats,
			title_text: userId
				? Strings.No_bets_for_now
				: Strings.you_have_not_made_any_bets_yet,
			description_text: userId
				? Strings.This_user_has_not_made_any_bets_yet
				: ''
		},
		{
			image_url: icons.star_congrats,
			title_text: Strings.no_prediction_market,
			description_text: userId
				? Strings.This_user_has_not_made_any_bets_yet
				: ''
		}
	];

	useEffect(() => {
		getUserProfileData();
		getUserLiveStreamingData();
	}, []);

	const getUserProfileData = () => {
		dispatch(updateApiLoader({apiLoader: true}));
		const uploadData = {
			user_id: userId,
			isRecent: isRecent,
			isActive: isSelectedIndex === 0 ? 'true' : undefined,
			isClaimable: isSelectedIndex === 1 ? 'true' : undefined
		};
		getOtherUserProfile(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getUserProfileData Response : ', res);
				setUserProfileInfo(res?.data);
				// getBalance(res?.data?.user?.walletAddress);
				setIsNoData(res?.data?.bets?.length === 0 ? true : false);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getUserBet Data Err : ', err);
			});
	};

	useUpdateEffect(() => {
		setBetsStats(userProfileInfo?.user?.stats);
		setBetsLost(userProfileInfo?.user?.betsLost);
		setBetsPending(userProfileInfo?.user?.betsPending);
		setBetsWon(userProfileInfo?.user?.betsWon);
		setIsFollowing(userProfileInfo?.user?.isFollowing);

		setIsNoData(userProfileInfo?.bets?.length === 0 ? true : false);
	}, [userProfileInfo]);

	const getUserLiveStreamingData = () => {
		const uploadData = {
			user_id: userId
		};
		getUserLiveStreaming(uploadData)
			.then(res => {
				console.log('getUserLiveStreamingData res ::  ', JSON.stringify(res));
				setLiveEventData(res?.data?.liveStreaming);
				setBetData(res?.data?.betType);
			})
			.catch(err => {
				console.log('getUserLiveStreamingData Data Err : ', err);
			});
	};

	const getUserBetStatsData = (daysType: any) => {
		let uploadData = {};

		if (
			daysType === 'Today' ||
			daysType === 'All' ||
			daysType === 'Last week' ||
			daysType === 'Last month'
		) {
			uploadData = {days: daysType.toLowerCase(), user_id: userId};
		} else {
			uploadData = {
				from: daysType?.firstDate,
				to: daysType?.secondDate,
				user_id: userId
			};
		}

		getUserBetStats(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				//console.log('getUserBet Response : ', res);
				setBetsStats(res?.data?.stats);
				setBetsLost(res?.data?.betsLost);
				setBetsPending(res?.data?.betsPending);
				setBetsWon(res?.data?.betsWon);

				const totalBets = res?.data?.betsWon + res?.data?.betsLost;

				if (totalBets !== 0) {
					setBetWonPercent(parseFloat(res?.data?.betsWon / totalBets) * 100);
					setBetLossPercent(parseFloat(res?.data?.betsLost / totalBets) * 100);
				} else {
					setBetWonPercent(0);
					setBetLossPercent(0);
				}
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getUserBet Data Err : ', err);
			});
	};

	// const getBalance = async address => {
	//   try {
	//     let res = await getMetamaskBalance(address);
	//     console.log('res balance', res);
	//     setCurrentBalance(parseFloat(res).toFixed(decimalValue));
	//   } catch (error) {
	//     setCurrentBalance(0);
	//   }
	// };

	// const renderCurrencyItem = ({item}) => (
	//   <CurrencyBalanceVIew
	//     onPress={() => {
	//       // handleSubmit();
	//       // navigation.replace(ScreenNames.BottomTabScreen);
	//       //  navigation.navigate(ScreenNames.ProfileSetupScreen);
	//     }}
	//     leftIconPath={
	//       'https://res.cloudinary.com/shivicloudinary/image/upload/v1648481605/nisz1ge4mwra32fkppkr.png'
	//     }
	//     title={'MATIC'}
	//     subtitle={currentBalance}
	//     balance={''}
	//   />
	// );

	const renderBetsItem = ({item}) => (
		<BetsListView
			onPress={() => {
				console.log('item', item);
				navigation.navigate(ScreenNames.BetDetailsScreen, {
					bet_id: item?._id,
					redirectType: item.betStatus,
					isFromOtherUser: true,
					userId: userId
				});
			}}
			// gameImage={
			//   item?.match?.image ??
			//   item?.bet?.custom_bet_image ??
			//   item?.custom_bet_image
			// }
			gameImage={item?.subcategories?.imageUrl ?? item?.categories?.imageUrl}
			bet_amount={item?.bet_amount}
			buttonText={Strings.join_bet}
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
			isShowDetail={true}
			isJoinBet={true}
			item={item}
			handleMenuPress={() => {}}
			handleBetMakerUserPicked={() => {
				navigation.push(ScreenNames.OtherUserProfileScreen, {
					userId: item?.users?._id
				});
			}}
			handleBetTackerPicked={() => {
				navigation.navigate(ScreenNames.JoinBetCreateScreen, {
					betId: item?._id
				});
			}}
			handleAlreadyBetTackerUserPicked={() => {
				navigation.push(ScreenNames.OtherUserProfileScreen, {
					userId: item?.betTaker?.takerDetails?._id
				});
			}}
			handleReplicateBet={() => {
				navigation.navigate(ScreenNames.ReplicateBetCreatScreen, {
					eventBetData: item
				});
			}}
			onPressLive={() => {
				navigation.navigate(ScreenNames.EventDetailsScreen, {
					feedObject: {
						...item?.feeds,
						subCategoryList: item?.subCategoryList,
						categories: item?.categories
					},
					betCreationType: 1,
					selectedBetType: betData,
					isFromStreaming: true
				});
			}}
		/>
	);

	const isSendMsgShow = () => {
		if (userProfileInfo?.user?.visible === false) {
			return false;
		} else if (
			userProfileInfo?.user?.messagesVisible?.toLowerCase() === 'anyone'
		) {
			return true;
		} else if (
			userProfileInfo?.user?.messagesVisible?.toLowerCase() === 'nobody'
		) {
			return false;
		} else if (
			userProfileInfo?.user?.messagesVisible?.toLowerCase() === 'friends' &&
			isFollowing === 2
		) {
			return true;
		}
		return false;
	};

	const isBettingStatisticsShow = () => {
		if (userProfileInfo?.user?.visible === false) {
			return false;
		} else if (
			userProfileInfo?.user?.bettingStatisticsVisible?.toLowerCase() ===
			'anyone'
		) {
			return true;
		} else if (
			userProfileInfo?.user?.bettingStatisticsVisible?.toLowerCase() ===
			'nobody'
		) {
			return false;
		} else if (
			userProfileInfo?.user?.bettingStatisticsVisible?.toLowerCase() ===
				'friends' &&
			isFollowing === 2
		) {
			return true;
		}
		return false;
	};

	const isBetsShow = () => {
		if (userProfileInfo?.user?.visible === false) {
			return false;
		} else if (userProfileInfo?.user?.betsVisible?.toLowerCase() === 'anyone') {
			return true;
		} else if (userProfileInfo?.user?.betsVisible?.toLowerCase() === 'nobody') {
			return false;
		} else if (
			userProfileInfo?.user?.betsVisible?.toLowerCase() === 'friends' &&
			isFollowing === 2
		) {
			return true;
		}
		return false;
	};

	const isUserVideosShow = () => {
		if (userProfileInfo?.user?.visible === false) {
			return false;
		} else if (
			userProfileInfo?.user?.videosVisible?.toLowerCase() === 'anyone'
		) {
			return true;
		} else if (
			userProfileInfo?.user?.videosVisible?.toLowerCase() === 'friends' &&
			isFollowing === 2
		) {
			return true;
		}
		return false;
	};

	const postFollowUser = (follower_id: any) => {
		let req;
		if (isFollowing === 1) {
			req = {follower_id: follower_id, cancel: true};
		} else {
			req = {follower_id: follower_id};
		}
		console.log('req?????', req);
		followUnfollowUser(req)
			.then(res => {
				//console.log('getUserBet Response : ', res);
				setIsFollowing(res?.data?.follow);
				removeUser(follower_id);
			})
			.catch(err => {
				console.log('getUserBet Data Err : ', err);
			});
	};

	useUpdateEffect(() => {
		getUserProfileData();
	}, [isSelectedIndex, isSelectedBetTypeIndex]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					onLeftIconPath={icons.back}
					name={Strings.user_details}
				/>
				{userProfileInfo && (
					<ScrollView bounces={false} ref={scrollRef}>
						<View style={styles.viewContain}>
							{liveEventData.length ? (
								<LiveUserProfileComponent
									profileImgPath={userProfileInfo?.user?.picture}
									handleOnClick={() => {
										if (liveEventData.length === 1) {
											navigation.navigate(ScreenNames.EventDetailsScreen, {
												feedObject: liveEventData[0],
												betCreationType: 1,
												selectedBetType: betData,
												isFromStreaming: true
											});
										} else {
											navigation.navigate(ScreenNames.LiveChallengeListScreen, {
												liveEventData: liveEventData,
												betData: betData
											});
										}
									}}
								/>
							) : (
								<ProfileComponent
									profileImgPath={userProfileInfo?.user?.picture}
									levelRank={userProfileInfo?.user?.level}
								/>
							)}

							<Text
								style={
									styles.userNameStyle
								}>{`@${userProfileInfo?.user?.userName}`}</Text>
							<Text style={styles.noobNameStyle}>
								{' '}
								{getLevelRank(userProfileInfo?.user?.level)?.type}
							</Text>
							{userProfileInfo?.user?.biography ? (
								<Text style={styles.bioGraphyStyle} numberOfLines={3}>
									{userProfileInfo?.user?.biography}
								</Text>
							) : null}

							<View style={styles.viewUserInfo}>
								<UserInfoComponent
									onActiveBetsPress={() => {
										if (isBetsShow() && userProfileInfo?.user?.totalBets > 0) {
											scrollRef.current.scrollTo({
												x: 0,
												y: scrollToViewPosition,
												animated: true
											});
											// navigation.push(ScreenNames.MyBetListScreen, {
											// 	isMyProfile: false,
											// 	userId: userId
											// });
										}
									}}
									onFollowersPress={() => {
										if (userProfileInfo?.user?.visible === true) {
											navigation.push(ScreenNames.FollowingFollowersScreen, {
												type: 0,
												userId: userId
											});
											// navigation.push(ScreenNames.LiveChallengeListScreen, {
											// 	liveEventData: liveEventData
											// });
										}
									}}
									onFollowingPress={() => {
										if (userProfileInfo?.user?.visible === true) {
											navigation.push(ScreenNames.FollowingFollowersScreen, {
												type: 1,
												userId: userId
											});
										}
									}}
									onCreatePress={() => {
										if (isFollowing === 2) {
											setModalLeagueVisible(true);
										} else if (isFollowing === 1) {
											setModalLeagueVisible(true);
										} else {
											postFollowUser(userId);
										}
									}}
									onWalletPress={async () => {
										//Redirect to chat details screen
										const data = {
											senderId: userData?.user?._id,
											receiverId: userProfileInfo?.user?._id,
											channelId:
												'amity_' +
												uniqueIdGenerateFrom2Ids([
													userData?.user?._id,
													userProfileInfo?.user?._id
												])
										};
										await updateChannel(data);
										navigation.navigate(ScreenNames.ChatDetailsScreen, {
											friendId: userProfileInfo?.user?._id,
											userId: userData?.user?._id,
											friendImage: userProfileInfo?.user?.picture,
											friendName: userProfileInfo?.user?.userName,
											channelId:
												'amity_' +
												uniqueIdGenerateFrom2Ids([
													userData?.user?._id,
													userProfileInfo?.user?._id
												]),
											friendLevel: userProfileInfo?.user?.level,
											friendDeviceToken: userProfileInfo?.user?.deviceToken,
											friendData: userProfileInfo?.user
										});
									}}
									activeBets={userProfileInfo?.user?.activeBets}
									followersCount={userProfileInfo?.user?.userFollower}
									followingCount={userProfileInfo?.user?.userFollowing}
									colorArray={
										isFollowing === 2
											? defaultTheme.blackGredientColor
											: defaultTheme.textGradientColor
									}
									createBtnText={
										isFollowing === 2
											? Strings.following.toUpperCase()
											: isFollowing === 1
											? Strings.requested.toUpperCase()
											: userProfileInfo?.user?.isFollowBack === true
											? Strings.followBack.toUpperCase()
											: Strings.follow.toUpperCase()
									}
									walletBtnText={Strings.sendDM.toUpperCase()}
									walletBtnColorArray={
										isFollowing === 2
											? defaultTheme.secondaryGradientColor
											: defaultTheme.blackGredientColor
									}
									isSendMsgShow={isSendMsgShow()}
									isShowPlusIcon={isFollowing === 2 ? false : true}
									isVideoViewVisible={
										isUserVideosShow() && userProfileInfo?.user?.videoCount > 0
											? true
											: false
									}
									videosCount={userProfileInfo?.user?.videoCount}
									onVideosBtnPress={() => {
										navigation.navigate(ScreenNames.VideoContentScreen, {
											userId: userId
										});
									}}
								/>
							</View>

							{isBettingStatisticsShow() && (
								<View style={styles.viewChart}>
									<Text style={styles.statisticsTitleStyle}>
										{Strings.betStatistics}
									</Text>
									<MonthSelection
										onPress={type => {
											if (type) {
												getUserBetStatsData(type);
											}
										}}
										colorArray={defaultTheme.ternaryGradientColor}
										angle={gradientColorAngle}
										buttonText={Strings.str_all.toUpperCase()}
										rightIcon={true}
										style={styles.userBetsViewStyle}
										dataSource={[
											Strings.str_all,
											Strings.str_today,
											// 'Yesterday',
											Strings.str_last_week,
											Strings.str_last_month,
											Strings.str_custom_date_range
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
							)}

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

							{/* {isBalanceShow() && (
                <View
                  style={[styles.viewChart, {marginBottom: verticalScale(8)}]}>
                  <Text style={styles.statisticsTitleStyle}>
                    {Strings.balance}
                  </Text>
                  <FlatList
                    style={styles.currencyStyle}
                    bounces={false}
                    data={[1]}
                    renderItem={renderCurrencyItem}
                  />
                </View>
              )} */}

							{isBetsShow() && userProfileInfo?.user?.totalBets > 0 && (
								<>
									<View
										onLayout={event => {
											const layout = event.nativeEvent.layout;
											scrollToViewPosition = layout.y;
										}}>
										<CustomTopTabView
											dataSource={[
												{
													id: 1,
													title: Strings.P2P_Bets,
													badgeCount: userProfileInfo?.user?.totalBets
												},
												{
													id: 1,
													title: Strings.Prediction_markets,
													badgeCount: 0
												}
											]}
											onTabChange={item => {
												setIsSelectedBetTypeIndex(item);
											}}
											selectedIndex={isSelectedBetTypeIndex}
										/>
									</View>

									{isSelectedBetTypeIndex === 0 && (
										<CustomTopTabView
											dataSource={[
												{
													id: 1,
													title: Strings.active,
													badgeCount:
														isSelectedBetTypeIndex === 0
															? userProfileInfo?.user?.activeBets
															: 0
												},
												{
													id: 1,
													title: Strings.claimable,
													badgeCount:
														isSelectedBetTypeIndex === 0
															? userProfileInfo?.user?.claimableBets
															: 0
												},
												{
													id: 1,
													title: Strings.all,
													badgeCount:
														isSelectedBetTypeIndex === 0
															? userProfileInfo?.user?.totalBets
															: 0
												}
											]}
											onTabChange={item => {
												seIsSelectedIndex(item);
											}}
											selectedIndex={isSelectedIndex}
										/>
									)}

									{isSelectedBetTypeIndex === 0 && (
										<>
											<FlatList
												style={styles.betsStyle}
												bounces={false}
												data={userProfileInfo?.bets}
												renderItem={renderBetsItem}
											/>
											{userProfileInfo?.user?.totalBets > 2 && (
												<TouchableOpacity
													style={styles.viewMoreBetStyle}
													onPress={() => {
														navigation.push(ScreenNames.MyBetListScreen, {
															userId: userId
														});
													}}>
													<Text style={styles.viewMoreTestStyle}>
														{Strings.view_all}
													</Text>
												</TouchableOpacity>
											)}
										</>
									)}

									{(isNoData || isSelectedBetTypeIndex === 1) && (
										<View style={styles.positionAbsolute}>
											<NoDataComponent
												noData={noDataItemArray[isSelectedBetTypeIndex]}
											/>
										</View>
									)}
								</>
							)}
						</View>
						<CreateLeaguePopup
							popupTitle={
								isFollowing === 1 ? Strings.deleteRequest : Strings.unFollowMsg
							}
							buttonOkTitle={Strings.yes}
							buttonCancelTitle={Strings.no}
							leftIconPath={null}
							isVisible={modalLeagueVisible}
							onPressOk={() => {
								setModalLeagueVisible(!modalLeagueVisible);
								postFollowUser(userId);
							}}
							onPressCancel={() => {
								setModalLeagueVisible(!modalLeagueVisible);
							}}
						/>
					</ScrollView>
				)}
			</View>
		</SafeAreaView>
	);
};

export default OtherUserProfileScreen;
