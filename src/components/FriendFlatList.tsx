import {updateChannel} from '@amityco/ts-sdk';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {TextInputProps, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import {uniqueIdGenerateFrom2Ids} from '../constants/utils/Function';
import ScreenNames from '../navigation/screenNames';
import {
	followUnfollowUser,
	getUserList,
	removeSuggestedUser
} from '../redux/apiHandler/apiActions';
import {
	hideBottomTab,
	showSuggestedUser
} from '../redux/reducerSlices/dashboard';
import {updateApiLoader} from '../redux/reducerSlices/preLogin';
import {verticalScale} from '../theme';
import FollowersUserView from './FollowersUserView';

import FollowingUserView from './FollowingUserView';

interface Props extends TextInputProps {
	userId?: string;
	onShowList?: (isShow) => void;
	vertical?: boolean;
	isFromFeed?: boolean;
	isFromInviteUser?: boolean;
}

const FriendFlatList: React.FC<Props> = props => {
	const {userId, onShowList, vertical, isFromFeed, isFromInviteUser} = props;
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [suggestedUserData, setSuggestedUserData] = useState([]);
	const [totalFollowUser, setTotalFollowUser] = useState(-1);
	const [pageUser, setPageUser] = useState(0);
	const [isCallNextPage, setIsCallNextPage] = useState(true);

	useEffect(() => {
		getFollowersData();
	}, [pageUser]);

	const getFollowersData = () => {
		var arrayData = [];
		suggestedUserData?.map((item, index) => {
			arrayData.push(item?._id);
		});

		const uploadData = {
			random: true,
			limit: '10',
			skip: pageUser,
			excludeUsers: arrayData
		};
		getUserList(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log(
					'getFollowersData :: getUserList :: res ::',
					JSON.stringify(res)
				);
				onShowList(res?.data?.countUsers > 0);
				if (pageUser !== 0) {
					setSuggestedUserData(suggestedUserData?.concat(res?.data?.users));
				} else {
					setSuggestedUserData(res?.data?.users);
				}
				setTotalFollowUser(res?.data?.countUsers);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				dispatch(hideBottomTab({isHideBottomTab: false}));
				console.log('getUserList Data Err : ', err);
			});
	};

	const renderSuggestedUserItem = ({item, index}) => (
		<FollowingUserView
			//style={{height: verticalScale(Platform.OS === 'ios' ? 270 : 280)}}
			item={item}
			levelRank={item?.level}
			username={item?.displayName || '@' + item?.userName}
			profileImgPath={item?.picture}
			betsCount={isFromInviteUser ? 0 : item?.activeBets}
			followUserData={isFromInviteUser ? [] : item?.followers?.followersData}
			totalfollowers={isFromInviteUser ? 0 : item?.followers?.totalfollowers}
			totalfollowings={isFromInviteUser ? 0 : item?.followings?.totalfollowings}
			onClosePress={() => {
				setIsCallNextPage(false);
				console.log('onClosePress', item);
				removeSuggestedUserData(item?._id);
				removeUser(item?._id);
			}}
			onFollow={() => {
				setIsCallNextPage(false);
				console.log('onPress');
				postFollowUser(item?._id);
				removeUser(item?._id);
			}}
			onSendMessage={async () => {
				const data = {
					senderId: userId,
					receiverId: item?._id,
					channelId: 'amity_' + uniqueIdGenerateFrom2Ids([userId, item?._id])
				};
				await updateChannel(data);
				navigation.navigate(ScreenNames.ChatDetailsScreen, {
					friendId: item?._id,
					userId: userId,
					friendImage: item?.picture,
					friendName: item?.userName,
					channelId: 'amity_' + uniqueIdGenerateFrom2Ids([userId, item?._id]),
					friendLevel: item?.level,
					friendDeviceToken: item?.deviceToken,
					friendData: item
				});
			}}
			onPress={() => {
				if (isFromInviteUser) {
					dispatch(showSuggestedUser({isShowSuggestedUser: false}));
					dispatch(hideBottomTab({isHideBottomTab: false}));
				}
				if (userId === item?._id) return;
				navigation.navigate(ScreenNames.OtherUserProfileScreen, {
					userId: item?._id,
					removeUser
				});
			}}
			isShowFollow={true}
			isShowDM={false}
			shouldShowCloseButton={true}
			isFromFeed={isFromFeed}
		/>
	);

	const renderFollowersUserItem = ({item, index}) => (
		<FollowersUserView
			profilePic={item?.picture}
			userName={item?.displayName || '@' + item?.userName}
			onPress={() => {
				if (userId === item?._id) return;
				navigation.navigate(ScreenNames.OtherUserProfileScreen, {
					userId: item?._id,
					removeUser
				});
			}}
			isShowFollow={true}
			onFollow={() => {
				setIsCallNextPage(false);
				console.log('onPress');
				postFollowUser(item?._id);
				removeUser(item?._id);
			}}
			followUserData={item?.followers?.followersData}
		/>
	);

	const removeUser = (follower_id: any) => {
		let filteredList = suggestedUserData.filter(
			(item: any) => item._id !== follower_id
		);
		if (filteredList?.length === 0) {
			onShowList(false);
		}
		setSuggestedUserData(filteredList);
	};

	//followUnfollowUser
	const postFollowUser = (follower_id: any) => {
		followUnfollowUser({follower_id: follower_id})
			.then(res => {
				setIsCallNextPage(true);
				console.log('postFollowUser Response : ', res);
				if (res?.statusCode === 200) {
					removeUser(follower_id);
				} else {
				}
			})
			.catch(err => {});
	};

	const removeSuggestedUserData = (follower_id: any) => {
		removeSuggestedUser({removed_user_id: follower_id})
			.then(res => {
				setIsCallNextPage(true);
				console.log('removeSuggestedUserData Response : ', res);
				if (res?.statusCode === 200) {
					removeUser(follower_id);
				} else {
				}
			})
			.catch(err => {});
	};

	return (
		suggestedUserData?.length > 0 && (
			<FlatList
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				horizontal={vertical ? false : true}
				data={suggestedUserData}
				renderItem={
					vertical ? renderFollowersUserItem : renderSuggestedUserItem
				}
				keyExtractor={(item, index) => item._id}
				style={{
					marginBottom: verticalScale(vertical ? 0 : 16)
				}}
				onEndReached={() => {
					if (isFromFeed) {
						return;
					}
					console.log(
						'onMomentumScrollEnd????',
						pageUser,
						totalFollowUser,
						suggestedUserData?.length
					);
					if (totalFollowUser > suggestedUserData?.length && isCallNextPage) {
						console.log('call page api', pageUser);
						setPageUser(pageUser + 1);
						console.log('call page api', pageUser);

						// getFollowersData();
					}
				}}
			/>
		)
	);
};

export default React.memo(FriendFlatList);
