import React, {useEffect, useState} from 'react';
import {Keyboard, SectionList, Text, View} from 'react-native';
import icons from '../../../assets/icon';
import Strings from '../../../constants/strings';
import styles from './style';
import HeaderComponent from '../../../components/HeaderComponent';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {getUserBet} from '../../../redux/apiHandler/apiActions';
import BetsListView from '../../../components/BetsListView';
import {useDispatch, useSelector} from 'react-redux';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoadMoreLoaderView from '../../../components/LoadMoreLoaderView';
import ScreenNames from '../../../navigation/screenNames';
import {RootState} from '../../../redux/store';
import CustomTopTabView from '../../../components/CustomTopTabVIew';
import NoDataComponent from '../../../components/NoDataComponent';
import useUpdateEffect from '../../../components/CustomHooks/useUpdateEffect';
import {verticalScale} from '../../../theme';
import moment from 'moment';
import SearchBarWIthBack from '../../../components/SearchBarWIthBack';
import useDebounce from '../../../components/CustomHooks/useDebounce';
import {defaultTheme} from '../../../theme/defaultTheme';

let myBetPage = 0;

const MyBetListScreen: React.FC<any> = props => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const {userId, isMyProfile} = useRoute().params ?? {};
	const [userBetList, setUserBetList] = useState([]);
	const [betType, setBetType] = useState();

	const [totalPage, setTotalPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [activebetCount, setActivebetCount] = useState(0);
	const [totalBetCount, setTotalBetCount] = useState(0);
	const [claimableCount, seClaimableCount] = useState(0);

	const userProfileInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});
	const [isSelectedBetTypeIndex, setIsSelectedBetTypeIndex] = useState(0);
	const [isSelectedIndex, seIsSelectedIndex] = useState(0);

	const [isNoData, setIsNoData] = useState(false);
	const [searchClicked, setSearchClicked] = useState(false);
	const [searchText, setSearchText] = useState('');
	const debouncedValue = useDebounce<string>(searchText, 500);

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
	const isFocus = useIsFocused();

	useEffect(() => {
		if (isFocus) {
			console.log('focus call');

			setUserBetList([]);
			myBetPage = 0;
			getUserBetData();
		}
	}, [isFocus]);

	useUpdateEffect(() => {
		console.log('useUpdateEffect call');
		setUserBetList([]);
		if (isSelectedBetTypeIndex === 1) return;

		myBetPage = 0;
		setTotalPage(0);
		getUserBetData();
	}, [isSelectedIndex, isSelectedBetTypeIndex, debouncedValue]);

	const getUserBetData = () => {
		if (myBetPage === 0) {
			dispatch(updateApiLoader({apiLoader: true}));
		}

		const uploadData = {
			skip: myBetPage,
			limit: '10',
			user_id: userId ?? '',
			isActive: isSelectedIndex === 0 ? 'true' : undefined,
			isClaimable: isSelectedIndex === 1 ? 'true' : undefined,
			searchText: searchText
		};

		getUserBet(uploadData)
			.then(res => {
				setIsLoading(false);
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getUserBet Response : ', res);
				setBetType(res?.data?.betType);
				if (myBetPage !== 0) {
					setUserBetList(userBetList.concat(res?.data?.bets));
					setIsNoData(userBetList?.length === 0 ? true : false);
				} else {
					setUserBetList(res?.data?.bets);
					setIsNoData(res?.data?.bets?.length === 0 ? true : false);
				}
				setTotalBetCount(res?.data.betCount);
				if (res?.data.betCount && res?.data.betCount > 0) {
					setTotalPage(Math.ceil(res?.data.betCount / 10));
				} else {
					setTotalPage(0);
				}
				setActivebetCount(res?.data.activebetCount);
				seClaimableCount(res?.data.claimableBetCount);
			})
			.catch(err => {
				setIsLoading(false);

				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getUserBet Data Err : ', err);
			});
	};

	return (
		<SafeAreaView style={styles.container}>
			{!searchClicked ? (
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					onLeftIconPath={icons.back}
					name={userId ? Strings.bets : Strings.my_bets}
					onSettingIconPath={icons.search}
					onSettingMenuPress={() => {
						setSearchClicked(true);
					}}
				/>
			) : (
				<View style={styles.viewSearch}>
					<SearchBarWIthBack
						placeholderText={Strings.search_events_users_more}
						searchPhrase={searchText}
						setSearchPhrase={value => {
							setSearchText(value);
						}}
						onBackPress={() => {
							setSearchClicked(false);
							setSearchText('');
							Keyboard.dismiss();
						}}
						searchClicked={searchClicked}
						isEditable={true}
						selectedIndex={1}
						onClearPress={() => {
							setSearchText('');
						}}
					/>
				</View>
			)}
			<View style={styles.viewSubContain}>
				<CustomTopTabView
					dataSource={[
						{
							id: 1,
							title: Strings.P2P_Bets,
							badgeCount: totalBetCount
						},
						{
							id: 1,
							title: Strings.Prediction_markets,
							badgeCount: 0
						}
					]}
					onTabChange={item => {
						setIsSelectedBetTypeIndex(item);
						setSearchClicked(false);
						setSearchText('');
						Keyboard.dismiss();
					}}
					selectedIndex={isSelectedBetTypeIndex}
				/>
				{isSelectedBetTypeIndex === 0 && (
					<CustomTopTabView
						dataSource={[
							{
								id: 1,
								title: Strings.active,
								badgeCount: isSelectedBetTypeIndex === 0 ? activebetCount : 0
							},
							{
								id: 1,
								title: Strings.claimable,
								badgeCount: isSelectedBetTypeIndex === 0 ? claimableCount : 0
							},
							{
								id: 1,
								title: Strings.all,
								badgeCount: isSelectedBetTypeIndex === 0 ? totalBetCount : 0
							}
						]}
						onTabChange={item => {
							seIsSelectedIndex(item);
						}}
						selectedIndex={isSelectedIndex}
					/>
				)}

				{isSelectedBetTypeIndex === 0 && (
					<SectionList
						// data={feedInfo?.walletData}
						sections={userBetList}
						keyExtractor={(item, index) => item.toString() + index}
						renderSectionHeader={({section: {_id}}) =>
							userBetList?.length > 0 && (
								<View style={styles.dateTitleContainer}>
									<Text style={styles.dateTitleTextStyle}>
										{moment(_id).format('DD MMMM YYYY')}
									</Text>
								</View>
							)
						}
						renderItem={({item, index}) => (
							<BetsListView
								onPress={() => {
									console.log('item', item);
									navigation.navigate(ScreenNames.BetDetailsScreen, {
										bet_id: item?._id,
										redirectType: item.betStatus,
										isFromOtherUser: userId ? true : false,
										userId: userId
									});
								}}
								matchName={item?.match?.matchName}
								gameImage={
									item?.subcategories?.imageUrl ?? item?.categories?.imageUrl
								}
								bet_amount={item?.bet_amount}
								buttonText={'See Details'}
								startTime_timestamp={
									item?.match?.gmt_timestamp ??
									new Date(item?.createdAt).getTime()
								}
								endTime_timestamp={
									item?.match?.match_end_time ?? item?.betEndDate
								}
								marketName={
									item?.betQuestion ??
									item?.mainmarkets?.market_name +
										(item?.market_sub_name ? ' : ' + item?.market_sub_name : '')
								}
								teamName={
									item?.bet_type === 1
										? item?.betQuestion
										: `${item?.match?.localTeamName} vs. ${item?.match?.visitorTeamName}`
								}
								tokenTypes={' ' + item?.tokentypes?.short_name + ' '}
								isShowDetail={
									item?.user_id === userProfileInfo?.user?._id ||
									item?.betTaker?.user_id === userProfileInfo?.user?._id
										? true
										: false
								}
								item={item}
								isMyProfile={isMyProfile}
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
										selectedBetType: betType,
										isFromStreaming: true,
										streamCreator: item?.liveStreamCreator
									});
								}}
							/>
						)}
						contentContainerStyle={{paddingBottom: verticalScale(100)}}
						showsVerticalScrollIndicator={false}
						bounces={false}
						onEndReached={() => {
							console.log('myBetPage', myBetPage, totalPage);
							if (
								myBetPage <= totalPage &&
								totalPage !== 1 &&
								isFocus &&
								!isLoading
							) {
								setIsLoading(true);
								myBetPage = myBetPage + 1;
								getUserBetData();
							}
						}}
						ListFooterComponent={() => (
							<>{isLoading && <LoadMoreLoaderView />}</>
						)}
					/>
				)}
				{(isNoData || isSelectedBetTypeIndex === 1) && (
					<View
						style={{
							position: 'absolute',
							top: 140,
							left: 0,
							right: 0
						}}>
						<NoDataComponent
							noData={noDataItemArray[isSelectedBetTypeIndex]}
							shouldShowButton={userId ? false : true}
							btnTitle={Strings.discover_bets}
							colorArray={defaultTheme.secondaryGradientColor}
							onButtonPress={() => {
								navigation.navigate(ScreenNames.BottomTabScreen, {
									screen: ScreenNames.FeedsRouter,
									params: {
										screen: ScreenNames.FeedScreen
									}
								});
							}}
						/>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
};

export default MyBetListScreen;
