import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
	FlatList,
	ScrollView,
	Share,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import ExpoFastImage from 'expo-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import icons from '../../../assets/icon';
import BottomSharePopup from '../../../components/BottomSharePopup';
import ButtonLeftIconGradient from '../../../components/ButtonLeftIconGradient';
import ReportFeedView from '../../../components/Events/ReportFeedView';
import HeaderComponent from '../../../components/HeaderComponent';
import OtherUserProfileReplicateBetComponent from '../../../components/OtherUserProfileReplicateBetComponent';
import ShareBottomSheet from '../../../components/ShareBottomSheet';
import {BotomSharePopupData} from '../../../constants/api';
import Strings from '../../../constants/strings';
import {
	createBetDetailsPreviewShareUrl,
	dateTimeConvert,
	showErrorAlert
} from '../../../constants/utils/Function';
import ScreenNames from '../../../navigation/screenNames';
import {
	getChildBets,
	getFollowers,
	postReportMatch
} from '../../../redux/apiHandler/apiActions';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import {RootState} from '../../../redux/store';
import {verticalScale} from '../../../theme';
import colors from '../../../theme/colors';
import {defaultTheme} from '../../../theme/defaultTheme';
import {gradientColorAngle} from '../../../theme/metrics';
import styles from './style';

export default function CustomBetDetailsScreen() {
	const params = useRoute().params;
	const {title, betId, betCreationType, id} = params;

	const dispatch = useDispatch();
	const navigation = useNavigation();

	const [isShowShareBottomSheet, setIsShowShareBottomSheet] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isReportPopupShown, setIsReportPopupShown] = useState(false);
	const [feedObject, setFeedObject] = useState();
	const [betData, setBetData] = useState();
	const [currentPage, setCurrentPage] = useState(0);
	const [totalFollowUser, setTotalFollowUser] = useState(-1);
	const [followUserData, setFollowUserData] = useState([]);
	const [isFromBackButton, setIsFromBackButton] = useState(false);

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const getUserBetDetailsData = () => {
		const uploadData = {
			parent_bet_id: betId
		};
		dispatch(updateApiLoader({apiLoader: true}));
		getChildBets(uploadData)
			.then(res => {
				setTimeout(() => {
					dispatch(updateApiLoader({apiLoader: false}));
				}, 200);
				// console.log('====================================');
				// console.log('getUserBetDetails Response : ', JSON.stringify(res));
				// console.log('====================================');
				const betList = res?.data;
				if (betList && betList.length) {
					setBetData(betList);
					const betObj = betList[0];
					setFeedObject(betObj);
				}
			})
			.catch(err => {
				setTimeout(() => {
					dispatch(updateApiLoader({apiLoader: false}));
				}, 200);
				console.log('====================================');
				console.log('getUserBetDetails Data Err : ', err);
				console.log('====================================');
			});
	};

	useEffect(() => {
		console.log('====================================');
		console.log(
			'title :: ' +
				title +
				'\nbetId :: ' +
				betId +
				'\nbetCreationType :: ' +
				betCreationType
		);
		console.log('====================================');
		getUserBetDetailsData();
	}, [betId, isFromBackButton]);

	const handleShareStory = () => {
		setIsShowShareBottomSheet(false);
		navigation.navigate(ScreenNames.StoryShareScreen, {
			feedObject: {
				bet: {bets: betData},
				dataType: 'custom'
			}
		});
	};

	const getFollowersData = () => {
		const uploadData = {
			skip: currentPage,
			limit: 10,
			search: '',
			type: 'following'
		};
		getFollowers(uploadData)
			.then(res => {
				// console.log('====================================');
				// console.log('getFollowersData Response : ', JSON.stringify(res));
				// console.log('====================================');
				if (currentPage !== 0) {
					setFollowUserData(followUserData.concat(res?.data?.follower));
				} else {
					setFollowUserData(res?.data?.follower);
				}
				setTotalFollowUser(res?.data?.countfollower);
			})
			.catch(err => {
				// console.log('====================================');
				// console.log('getFollowersData Data Err : ', err);
				// console.log('====================================');
			});
	};

	useEffect(() => {
		getFollowersData();
	}, [currentPage]);

	const handleShareBetDetailsUrl = async () => {
		try {
			const result = await Share.share({
				message: createBetDetailsPreviewShareUrl(
					Strings.str_bet_details,
					id,
					betId,
					betCreationType,
					true
				)
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
			showErrorAlert('', error?.message);
		}
	};

	const checkArrayHasUserId = () => {
		const userId = userInfo?.user?._id;
		// console.log('BetsBottomView useEffect?>>>>>>>>>>>>>???', betInfo);
		if (betData && betData?.length <= 0) {
			return;
		}
		const userIdIndex = betData?.filter(item => {
			// console.log('BetsBottomView useEffect?>>>>>>>>>>>>>???', item);
			return item?.users?._id === userId;
		});
		// console.log('BetsBottomView useEffect?>>>>>>>>>>>', userIdIndex);
		return userIdIndex?.length <= 0;
	};

	const BetFlatListComponent = props => {
		const {betData} = props;

		const [isShowAll, setIsShowAll] = useState(false);

		const renderBetsHeader = () => {
			return (
				<View style={styles.p2pBetHeaderText}>
					<Text style={styles.betTitleText}>{feedObject?.betQuestion}</Text>
					{/* {checkArrayHasUserId(feedObject) && ( */}
					<TouchableOpacity
						style={{paddingVertical: 6}}
						onPress={() => {
							setIsMenuOpen(true);
						}}>
						<ExpoFastImage
							resizeMode={'contain'}
							source={icons.ic_menu}
							style={styles.rightImage}
						/>
					</TouchableOpacity>
					{/* )} */}
				</View>
			);
		};

		const renderBetsFooter = () => {
			return (
				<>
					{checkArrayHasUserId() && (
						<View>
							{betData.length > 3 && (
								<TouchableOpacity onPress={() => setIsShowAll(!isShowAll)}>
									<Text style={styles.btnShowAllStyle}>
										{!isShowAll ? Strings.str_show_all : Strings.str_show_less}
									</Text>
								</TouchableOpacity>
							)}
							<ButtonLeftIconGradient
								onPress={() => {
									navigation.navigate(ScreenNames.ReplicateBetCreatScreen, {
										eventBetData: feedObject
									});
								}}
								colorArray={defaultTheme.ternaryGradientColor}
								angle={gradientColorAngle}
								buttonTextcolor={colors.white}
								rightIcon={true}
								buttonText={Strings.replicate_this_bet_btn}
								leftIconPath={icons.ic_replicate_btn}
								rightIconPath={icons.ic_replicate_btn}
							/>
						</View>
					)}
				</>
			);
		};

		return (
			<FlatList
				nestedScrollEnabled
				ListHeaderComponent={renderBetsHeader}
				data={isShowAll ? betData : betData.slice(0, 3)}
				showsHorizontalScrollIndicator={false}
				renderItem={renderBets}
				ListFooterComponent={renderBetsFooter}
			/>
		);
	};

	const renderBets = ({item}) => {
		return (
			<OtherUserProfileReplicateBetComponent
				itemData={item}
				isHideReplicateBet={true}
				isOnlyHideBetTitle={true}
				handleMenuPress={() => {}}
				handleBetMakerUserPicked={() => {
					navigation.navigate(ScreenNames.OtherUserProfileScreen, {
						userId: item?.users?._id
					});
				}}
				handleBetTackerPicked={() => {
					navigation.navigate(ScreenNames.JoinBetCreateScreen, {
						betId: item?._id
					});
				}}
				handleAlreadyBetTackerUserPicked={() => {
					navigation.navigate(ScreenNames.OtherUserProfileScreen, {
						userId: item?.betTaker?.takerDetails?._id
					});
				}}
				handleReplicateBet={() => {
					navigation.navigate(ScreenNames.ReplicateBetCreatScreen, {
						eventBetData: item
					});
				}}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						setIsFromBackButton(true);
						navigation.goBack();
					}}
					name={Strings.bet_details}
					onLeftIconPath={icons.back}
					onSettingIconPath={params?.isFromStreaming ? '' : icons.share}
					onSettingMenuPress={() => {
						//TODO: share popup
						params?.isFromStreaming ? {} : setIsShowShareBottomSheet(true);
					}}
				/>
				{feedObject && (
					<ScrollView style={styles.flexOne} bounces={false}>
						<View style={{paddingHorizontal: verticalScale(16)}}>
							<Text style={styles.subTitleText}>
								{`${
									feedObject?.categories?.name +
									(feedObject?.subcategories?.name === undefined ? '' : ' - ') +
									(feedObject?.subcategories?.name === undefined
										? ''
										: feedObject?.subcategories?.name)
								}`.toUpperCase()}
							</Text>

							<Text style={styles.titleText}>{feedObject?.betQuestion}</Text>

							<Text style={styles.estimatedTimeText}>
								{dateTimeConvert(
									parseFloat(feedObject?.betEndDate)
								).toUpperCase()}
							</Text>

							<View style={styles.p2pBetView}>
								<BetFlatListComponent betData={betData} />
							</View>
						</View>
					</ScrollView>
				)}

				<BottomSharePopup
					angle={gradientColorAngle}
					isOpen={isMenuOpen}
					onPress={data => {
						setIsMenuOpen(false);
						if (data) {
							switch (data.id) {
								case 0:
									setTimeout(() => {
										setIsReportPopupShown(true);
									}, 500);
									break;
								case 1:
									setTimeout(() => {
										handleShareBetDetailsUrl();
									}, 500);
									break;
								case 2:
									setTimeout(() => {
										handleShareStory();
									}, 500);
									break;
								default:
									break;
							}
						}
					}}
					dataSource={BotomSharePopupData}
					// dataType={'customBet'}
				/>
				<ReportFeedView
					onPressCancel={() => {
						setIsReportPopupShown(false);
					}}
					onPressOk={(tag, description) => {
						setIsReportPopupShown(false);
						// let match_id = feedObject.hasOwnProperty('matches')
						// 	? feedObject?.matches?._id
						// 	: feedObject?._id;
						const data = {
							tagText: tag === 'Other' ? description : tag,
							matchId: '',
							betId: feedObject?._id,
							customTag: tag === 'Other' ? 1 : 0
						};
						console.log('====================================');
						console.log('data :: ', data);
						console.log('====================================');
						postReportMatch(data).then(res => {
							showErrorAlert('', res?.message ?? Strings.somethingWentWrong);
						});
					}}
					isVisible={isReportPopupShown}
				/>

				<ShareBottomSheet
					isVisible={isShowShareBottomSheet}
					onPressCancel={() => {
						setIsShowShareBottomSheet(false);
					}}
					users={followUserData}
					handleShareEvent={handleShareStory}
					handleShareUrl={handleShareBetDetailsUrl}
					shareURL={createBetDetailsPreviewShareUrl(
						Strings.str_bet_details,
						id,
						betId,
						betCreationType,
						true
					)}
					onNext={() => {
						if (totalFollowUser > followUserData.length) {
							setCurrentPage(currentPage + 1);
						}
					}}
					isFromCustomBetDetails={true}
				/>
			</View>
		</SafeAreaView>
	);
}
