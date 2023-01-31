import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import ExpoFastImage from 'expo-fast-image';
import icons from '../../../assets/icon';
import InputComponent from '../../../components/InputComponent';
import Strings from '../../../constants/strings';
import styles from './style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {horizontalScale, verticalScale} from '../../../theme';
import HeaderComponent from '../../../components/HeaderComponent';
import SwichView from '../../../components/SwichView';
import SelectWhoCan from '../../../components/SelectWhoCan';
import {useNavigation, useRoute} from '@react-navigation/native';
import SportsComponent from '../../../components/SportsComponent';
import RadioButton from '../../../components/RadioButton';
import FollowersUserView from '../../../components/FollowersUserView';
import FollowingUserView from '../../../components/FollowingUserView';
import {gradientColorAngle, width} from '../../../theme/metrics';
import UserGroupView from '../../../components/UserGroupView';
import FindFriendView from '../../../components/FindFriendView';
import {defaultTheme} from '../../../theme/defaultTheme';
import colors from '../../../theme/colors';
import InstaFriendView from '../../../components/InstaFriendView';
import CustomTopTabView from '../../../components/CustomTopTabVIew';
import ScreenNames from '../../../navigation/screenNames';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
	followUnfollowUser,
	getCategory,
	getFollowers,
	updateChannel
} from '../../../redux/apiHandler/apiActions';
import {useDispatch, useSelector} from 'react-redux';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import ConnectUserView from '../../../components/ConnectUserView';
import SearchBar from '../../../components/SearchBar';
import {
	getLevelRank,
	uniqueIdGenerateFrom2Ids
} from '../../../constants/utils/Function';
import {RootState} from '../../../redux/store';
import useUpdateEffect from '../../../components/CustomHooks/useUpdateEffect';
import NoDataComponent from '../../../components/NoDataComponent';
import ContactsFlatList from '../../../components/ContactsFlatList';
import FriendFlatList from '../../../components/FriendFlatList';
import ButtonGradient from '../../../components/ButtonGradient';

let pageUser = 0;

const FollowingFollowersScreen: React.FC<any> = props => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const {type, userId} = useRoute().params; // type followers = 0 , following = 1
	const [isSelectedIndex, seIsSelectedIndex] = useState(type);
	const [searchUserText, setSearchUserText] = useState('');
	const [followUserData, setFollowUserData] = useState([]);
	const [totalFollowUser, setTotalFollowUser] = useState(-1);

	const [suggestedUserData, setSuggestedUserData] = useState([]);
	const [isNoFollowersData, setIsNoFollowersData] = useState(false);
	const [isNoFollowingData, setIsNoFollowingData] = useState(false);

	const topTabData = [
		{id: 1, title: Strings.followers},
		{id: 2, title: Strings.following}
	];

	const noDataItemArray = [
		{
			image_url: icons.no_followers,
			title_text: Strings.no_followers,
			description_text: Strings.no_followers_desc
		},
		{
			image_url: icons.no_followings,
			title_text: Strings.no_followings,
			description_text: Strings.no_followings_desc
		}
	];

	useEffect(() => {
		pageUser = 0;
	}, []);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			if (isSelectedIndex === 0 || isSelectedIndex === 1) {
				pageUser = 0;
				setIsNoFollowersData(false);
				setIsNoFollowingData(false);
				getFollowersData();
			}
		});
		return () => {
			unsubscribe;
		};
	}, []);

	useUpdateEffect(() => {
		if (isSelectedIndex === 0 || isSelectedIndex === 1) {
			pageUser = 0;
			setIsNoFollowersData(false);
			setIsNoFollowingData(false);
			getFollowersData();
		}
	}, [isSelectedIndex]);

	const getFollowersData = () => {
		dispatch(updateApiLoader({apiLoader: true}));

		const uploadData = {
			skip: pageUser,
			limit: '10',
			search: searchUserText,
			type: isSelectedIndex === 0 ? 'follower' : 'following',
			user_id: userId
		};
		getFollowers(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));

				//console.log('getFollowersData Response : ', res);
				if (pageUser !== 0) {
					setFollowUserData(followUserData?.concat(res?.data?.follower));
					setIsNoFollowersData(followUserData.length === 0 ? true : false);
				} else {
					setFollowUserData(res?.data?.follower);
					setIsNoFollowersData(res?.data.follower.length === 0 ? true : false);
				}
				setTotalFollowUser(res?.data?.countfollower);
				if (
					res?.data?.follower?.length === 0 &&
					isSelectedIndex === 1 &&
					userId === userInfo?.user?._id
				) {
					if (pageUser !== 0) {
						setSuggestedUserData(
							suggestedUserData?.concat(res?.data?.suggested)
						);
					} else {
						setSuggestedUserData(res?.data?.suggested);
					}
					setTotalFollowUser(res?.data?.countSuggested);
				} else {
					setIsNoFollowingData(true);
				}
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));

				console.log('getFollowersData Data Err : ', err);
			});
	};

	// useEffect(() => {
	//   if (searchUserText.trim.length > 2) {
	//     pageUser = 0;
	//     getFollowersData();
	//   } else if (searchUserText.trim.length === 0) {
	//     pageUser = 0;
	//     getFollowersData();
	//   }
	// }, [searchUserText]);

	const renderFollowersUserItem = ({item, index}) => (
		<FollowersUserView
			levelRank={item?.user?.level}
			displayName={getLevelRank(item?.user?.level)?.type}
			profilePic={item?.user?.picture}
			userName={item?.user?.displayName || '@' + item?.user?.userName}
			shouldShowCloseButton={true}
			onPress={() => {
				console.log(item);
				if (userInfo.user._id === item?.user?._id) return;
				navigation.push(ScreenNames.OtherUserProfileScreen, {
					userId: item?.user?._id
				});
			}}
			shouldShowCloseButton={false}
		/>
	);

	const renderSuggestedUserItem = ({item, index}) => (
		<FollowingUserView
			levelRank={item?.level}
			username={item?.displayName || item?.userName}
			profileImgPath={item?.picture}
			betsCount={item?.activeBets}
			onClosePress={() => {
				console.log('onClosePress');
				removeUser(item?._id);
			}}
			onFollow={() => {
				console.log('onPress');
				postFollowUser(item?._id);
			}}
			onSendMessage={async () => {
				const data = {
					senderId: userInfo?.user?._id,
					receiverId: item?._id,
					channelId:
						'amity_' +
						uniqueIdGenerateFrom2Ids([userInfo?.user?._id, item?._id])
				};
				await updateChannel(data);
				navigation.navigate(ScreenNames.ChatDetailsScreen, {
					friendId: item?._id,
					userId: userInfo?.user?._id,
					friendImage: item?.picture,
					friendName: item?.userName,
					channelId:
						'amity_' +
						uniqueIdGenerateFrom2Ids([userInfo?.user?._id, item?._id]),
					friendLevel: item?.level,
					friendDeviceToken: item?.deviceToken,
					friendData: item
				});
			}}
			onPress={() => {
				if (userInfo?.user?._id === item?._id) return;
				navigation.navigate(ScreenNames.OtherUserProfileScreen, {
					userId: item?._id,
					removeUser
				});
			}}
			isShowFollow={true}
			shouldShowCloseButton={true}
		/>
	);

	const removeUser = (follower_id: any) => {
		let filteredList = suggestedUserData.filter(
			(item: any) => item._id !== follower_id
		);
		if (filteredList.length === 0) {
			setIsNoFollowingData(true);
		}
		setSuggestedUserData(filteredList);
	};

	const onShowList = () => {};

	//followUnfollowUser
	const postFollowUser = (follower_id: any) => {
		followUnfollowUser({follower_id: follower_id})
			.then(res => {
				console.log('postFollowUser Response : ', res);
				if (res?.statusCode === 200) {
					removeUser(follower_id);
				} else {
				}
			})
			.catch(err => {});
	};

	return (
		<SafeAreaView style={styles.container}>
			<HeaderComponent
				onLeftMenuPress={() => {
					navigation.goBack();
				}}
				onLeftIconPath={icons.back}
				name={Strings.profile}
				// onSettingIconPath={icons.setting}
			/>
			<View style={styles.viewContain}>
				<SearchBar
					onPress={() => {
						navigation.navigate(ScreenNames.BottomTabScreen, {
							screen: 'DiscoverRouter',
							params: {
								screen: ScreenNames.DiscoverScreen,
								params: {
									isFromFollowerFollowing: true
								}
							}
						});
					}}
					placeholderText={Strings.search}
				/>
				<CustomTopTabView
					dataSource={topTabData}
					onTabChange={async item => {
						if (item === isSelectedIndex) return;
						await setFollowUserData(null);
						pageUser = 0;
						seIsSelectedIndex(item);
						console.log('-----seIsSelectedIndex-----', item);
					}}
					selectedIndex={isSelectedIndex}
				/>

				{/* {isNoFollowingData &&
          followUserData?.length === 0 &&
          isSelectedIndex === 1 && (
            // <Text style={styles.noDataStyle}>{Strings.no_Data_Found}</Text>
            <NoDataComponent noData={noDataItemArray[isSelectedIndex]} />
          )} */}

				{isSelectedIndex === 0 && (
					<FlatList
						data={followUserData}
						renderItem={renderFollowersUserItem}
						showsVerticalScrollIndicator={false}
						onEndReachedThreshold={0.1}
						contentContainerStyle={{flexGrow: 1}}
						onScrollEndDrag={() => {
							if (totalFollowUser !== followUserData?.length) {
								pageUser = pageUser + 1;
								getFollowersData();
							}
						}}
						keyExtractor={(item, index) => item?._id + index}
						ListEmptyComponent={() => {
							return (
								<>
									{isNoFollowersData && (
										// <Text style={styles.noDataStyle}>{Strings.no_Data_Found}</Text>
										<NoDataComponent
											noData={noDataItemArray[isSelectedIndex]}
										/>
									)}
								</>
							);
						}}
					/>
				)}

				{followUserData?.length > 0 && isSelectedIndex === 1 ? (
					<>
						{/* <ButtonGradient
							onPress={() => {
								navigation.navigate(ScreenNames.DiscoverFindFriendsScreen);
							}}
							colorArray={defaultTheme.ternaryGradientColor}
							angle={gradientColorAngle}
							buttonTextcolor={colors.white}
							rightIcon={true}
							buttonText={Strings.connect_friends}
							style={styles.loginButtonSocial}
							leftIconPath={icons.plusRound}
						/> */}
						<FlatList
							data={followUserData}
							renderItem={renderFollowersUserItem}
							showsVerticalScrollIndicator={false}
							onEndReachedThreshold={0.5}
							onScrollEndDrag={() => {
								if (totalFollowUser !== followUserData?.length) {
									pageUser = pageUser + 1;
									getFollowersData();
								}
							}}
							keyExtractor={(item, index) => item._id + index}
						/>
					</>
				) : suggestedUserData.length > 0 && isSelectedIndex === 1 ? (
					// <KeyboardAwareScrollView enableOnAndroid={false} bounces={false}>
					//   <FlatList
					//     horizontal
					//     data={suggestedUserData}
					//     renderItem={renderSuggestedUserItem}
					//     keyExtractor={(item, index) => item._id + index}
					//     contentContainerStyle={{flexGrow: 1, backgroundColor : 'red'}}
					//   />
					//   <FindFriendView
					//     onPress={() => {
					//       // handleSubmit();
					//       // navigation.replace(ScreenNames.BottomTabScreen);
					//       //  navigation.navigate(ScreenNames.ProfileSetupScreen);
					//     }}
					//     style={styles.userGroupStyle}
					//   />
					//   <InstaFriendView
					//     title={Strings.instagramFriends}
					//     userArray={[0, 1, 2, 3]}
					//     style={styles.userGroupStyle}
					//   />
					//   <InstaFriendView
					//     title={Strings.yourContacts}
					//     userArray={[0, 1]}
					//     style={styles.userGroupStyle}
					//   />
					// </KeyboardAwareScrollView>

					// <KeyboardAwareScrollView enableOnAndroid={false} bounces={false}>
					//   <FlatList
					//     horizontal
					//     data={suggestedUserData}
					//     renderItem={renderSuggestedUserItem}
					//     keyExtractor={(item, index) => item._id + index}
					//     contentContainerStyle={{flexGrow: 1}}
					//   />
					// </KeyboardAwareScrollView>

					<View style={{flex: 1}}>
						<Text style={styles.titleText}>{Strings.connect_friends}</Text>
						<View>
							<FriendFlatList
								onShowList={onShowList}
								userId={userInfo.user._id}
							/>
						</View>
						{/* <View
							style={{
								flexGrow: 1
							}}>
							<ContactsFlatList
								userId={userInfo.user._id}
								title={Strings.yourContacts}
							/>
						</View> */}
					</View>
				) : (
					isNoFollowingData &&
					isSelectedIndex === 1 && (
						<View
							style={{
								flex: 1,
								justifyContent: 'center'
							}}>
							<NoDataComponent noData={noDataItemArray[isSelectedIndex]} />
						</View>
					)
				)}
			</View>
		</SafeAreaView>
	);
};

export default FollowingFollowersScreen;
