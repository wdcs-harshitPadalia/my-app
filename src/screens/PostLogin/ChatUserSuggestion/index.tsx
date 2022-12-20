import React, {useEffect, useState} from 'react';
import {Alert, FlatList, RefreshControl, SectionList, View} from 'react-native';
import {Text} from 'react-native-elements';
import icons from '../../../assets/icon';
import Strings from '../../../constants/strings';
import styles from './style';
import HeaderComponent from '../../../components/HeaderComponent';
import {useNavigation} from '@react-navigation/native';
import ConformationPopupComponet from '../../../components/ConformationPopupComponet';
import ScreenNames from '../../../navigation/screenNames';
import CustomTopTabView from '../../../components/CustomTopTabVIew';
import NotificationView from '../../../components/NotificationView';
import {defaultTheme} from '../../../theme/defaultTheme';
import NotificationFriendsView from '../../../components/NotificationFriendsView';
import FollowersUserView from '../../../components/FollowersUserView';
import ChatUserView from '../../../components/ChatUserView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
	getFollowers,
	getThreads,
	getUserList,
	updateChannel
} from '../../../redux/apiHandler/apiActions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {uniqueIdGenerateFrom2Ids} from '../../../constants/utils/Function';
import {
	createQuery,
	deleteChannel,
	joinChannel,
	queryChannelMembers,
	queryChannels,
	runQuery
} from '@amityco/ts-sdk';
import LoadMoreLoaderView from '../../../components/LoadMoreLoaderView';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import NoDataComponent from '../../../components/NoDataComponent';
import {updateChatBadgeStatus} from '../../../redux/reducerSlices/userInfo';
import InputComponent from '../../../components/InputComponent';
import {moderateScale} from '../../../theme';
import colors from '../../../theme/colors';
import useUpdateEffect from '../../../components/CustomHooks/useUpdateEffect';
import useDebounce from '../../../components/CustomHooks/useDebounce';

const ChatUserSuggestion: React.FC<any> = props => {
	const navigation = useNavigation();
	const [modalVisible, setModalVisible] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalFollowUser, setTotalFollowUser] = useState(-1);
	const [followUserData, setFollowUserData] = useState([]);
	const [isShowNodata, setIsShowNodata] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [tempSearchText, setTempSearchText] = useState('');
	const [searchText, setSearchText] = useState('');
	const debouncedValue = useDebounce<string>(searchText, 500);

	const userData = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const dispatch = useDispatch();

	const noDataItem = {
		image_url: icons.no_message,
		title_text: Strings.no_Data_Found,
		description_text: ''
	};

	useUpdateEffect(() => {
		resetFeedApiData();
		if (currentPage === 0) {
			getFollowersData();
		}
	}, [debouncedValue]);

	const getFollowersData = async () => {
		// const uploadData = {
		//   skip: currentPage,
		//   limit: 10,
		//   search: '',
		//   type: 'following',
		// };
		// getFollowers(uploadData)
		//   .then(res => {
		//     // console.log('getFollowersData Response : ', JSON.stringify(res));
		//     if (currentPage !== 0) {
		//       setFollowUserData(followUserData.concat(res?.data.follower));
		//       setIsShowNodata(followUserData?.length === 0 ? true : false);
		//     } else {
		//       setFollowUserData(res?.data.follower);
		//       setIsShowNodata(res?.data.follower?.length === 0 ? true : false);
		//     }
		//     setTotalFollowUser(res?.data.countfollower);
		//   })
		//   .catch(err => {
		//     console.log('getFollowersData Data Err : ', err);
		//   });
		const data = {
			//userId: userData?.user?._id,
			skip: currentPage,
			limit: 10,
			random: searchText?.length > 0 ? false : true,
			search: searchText,
			excludeFilters: true
			//   excludeUsers: [],
		};
		if (currentPage !== 0) {
			setIsLoading(true);
		} else {
			//dispatch(updateApiLoader({apiLoader: true}));
		}
		try {
			const response = await getUserList(data);
			console.log('response???', JSON.stringify(response));
			console.log(
				'response?.data.countUsers???',
				response?.data.countUsers,
				currentPage
			);
			setIsShowNodata(response?.data?.countUsers == 0 ? true : false);
			setTotalFollowUser(response?.data.countUsers);
			dispatch(updateApiLoader({apiLoader: false}));
			setIsLoading(false);
			if (currentPage !== 0) {
				setFollowUserData(followUserData.concat(response?.data?.users));
				// setIsShowNodata(followUserData?.length === 0 ? true : false);
			} else {
				setFollowUserData(response?.data?.users);
				// console.log(
				//   'res?.data.users?.length === 0???',
				//   res?.data.users
				// );
				// console.log(
				//   res?.data.users?.length === 0,
				//   'res?.data.users?.length === 0???',
				// );
				// setIsShowNodata(res?.data.users?.length == 0 ? true : false);
			}
			// setFollowUserData(response?.data?.result);
			//   console.log('getFollowersData Response : ', response?.data);
		} catch (error) {
			dispatch(updateApiLoader({apiLoader: false}));
			setIsLoading(false);
			setIsShowNodata(followUserData?.length == 0 ? true : false);
		}
	};

	useEffect(() => {
		dispatch(updateChatBadgeStatus(false));
		getFollowersData();
	}, []);

	// useUpdateEffect(() => {
	// 	if (currentPage === 0) {
	// 		getFollowersData();
	// 	} else {
	// 		setCurrentPage(0);
	// 	}
	// }, [searchText]);

	//   useEffect(() => {
	//     navigation.addListener('focus', () => {
	//       resetFeedApiData();
	//       dispatch(updateApiLoader({apiLoader: true}));
	//       getFollowersData();
	//     });
	//   }, [navigation]);

	useEffect(() => {
		//channel list
		// runQuery(
		//   createQuery(queryChannels, {
		//     types: ['live'],
		//     isDeleted: false,
		//     membership: 'member',
		//   }),
		//   ({data: channels, ...options}) => {
		//     // console.log('Channel????????????', channels, options, channels?.length);

		//     if (channels?.length > 0) {
		//       console.log(
		//         'Channel????????????',
		//         channels[0]?.metadata,
		//         options,
		//         channels?.length,
		//       );
		//     }
		//   },
		// );
		// const query = createQuery(deleteChannel, '62c5830d5dc5f700da3f801c');

		// runQuery(query, result => console.log(result));
		// const query = createQuery(queryChannelMembers, {
		//   channelId: '62c5830d5dc5f700da3f801c',
		//   memberships: ['member']
		// });

		// runQuery(query, ({data: members, ...options}) =>
		//   console.log("jkdjdjks?????????", members, options),
		// );
		getFollowersData();
	}, [currentPage]);

	const renderFollowersUserItem = ({item, index}) => (
		<ChatUserView
			data={item}
			friendLevel={item?.level}
			channelId={
				'amity_' + uniqueIdGenerateFrom2Ids([userData?.user?._id, item?._id])
			}
			onPress={async () => {
				//uniqueIdGenerateFrom2Ids([userData?.user?._id, item?._id]);
				//console.log('item : ', item?.user);
				const data = {
					senderId: userData?.user?._id,
					receiverId: item?._id,
					channelId:
						'amity_' +
						uniqueIdGenerateFrom2Ids([userData?.user?._id, item?._id])
				};
				await updateChannel(data);
				navigation.navigate(ScreenNames.ChatDetailsScreen, {
					friendId: item?._id,
					userId: userData?.user?._id,
					friendImage: item?.picture,
					friendName: item?.userName,
					channelId:
						'amity_' +
						uniqueIdGenerateFrom2Ids([userData?.user?._id, item?._id]),
					friendLevel: item?.level,
					friendDeviceToken: item?.deviceToken,
					friendData: item
				});
			}}
		/>
	);

	const resetFeedApiData = () => {
		setFollowUserData([]);
		setTotalFollowUser(0);
		setCurrentPage(0);
	};

	return (
		<SafeAreaView style={styles.container}>
			<HeaderComponent
				onLeftMenuPress={() => {
					navigation.goBack();
				}}
				onLeftIconPath={icons.back}
				name={Strings.new_message}
				//onAddIconPath={icons.ic_new_message}
				// onAddMenuPress={async () => {
				//   setModalVisible(true);
				// }}
				// onNotificationIconPath={icons.notifications_gray}
				// onNotificationMenuPress={() => {
				//   navigation.navigate(ScreenNames.NotificationScreen);
				// }}
				// onAddIconPath={icons.plusRed}
				// isNotificationBadge
			/>

			<View style={styles.viewContain}>
				<Text style={styles.subTitleText} numberOfLines={2}>
					{Strings.to}
				</Text>
				<InputComponent
					fontSize={moderateScale(12)}
					style={{
						backgroundColor: colors.black,
						borderRadius: 8,
						padding: moderateScale(8),
						borderBottomColor: 'transparent'
					}}
					placeholder={Strings.str_search}
					onLeftIconPath={icons.search}
					onBlur={() => {
						//setSearchText(tempSearchText);
					}}
					onChangeText={(text: string) => {
						//setSearchCategoryText(text);
						setSearchText(text);
					}}
				/>
				<FlatList
					showsVerticalScrollIndicator={false}
					//bounces={false}
					data={followUserData}
					renderItem={renderFollowersUserItem}
					contentContainerStyle={{flexGrow: 1}}
					//onEndReachedThreshold={0.1}
					onMomentumScrollEnd={() => {
						console.log(
							'totalFollowUser??',
							totalFollowUser,
							followUserData.length
						);
						if (totalFollowUser > followUserData.length) {
							setCurrentPage(currentPage + 1);
						}
					}}
					refreshControl={
						<RefreshControl
							refreshing={isRefreshing}
							onRefresh={() => {
								resetFeedApiData();
								dispatch(updateApiLoader({apiLoader: true}));
								getFollowersData();
							}}
							title="Pull to refresh"
							tintColor="#fff"
							titleColor="#fff"
						/>
					}
					ListFooterComponent={() => <>{isLoading && <LoadMoreLoaderView />}</>}
					keyExtractor={(item, index) => item._id + index}
					ListEmptyComponent={() =>
						// <View style={styles.emptyView}>
						//   <Text style={styles.emptyText}>{Strings.no_Data_Found}</Text>
						// </View>
						isShowNodata && (
							<NoDataComponent onButtonPress={() => {}} noData={noDataItem} />
						)
					}
				/>
			</View>

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

export default ChatUserSuggestion;
