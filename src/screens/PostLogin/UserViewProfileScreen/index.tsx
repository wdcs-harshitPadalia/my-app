import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import icons from '../../../assets/icon';
import Strings from '../../../constants/strings';
import styles from './style';
import HeaderComponent from '../../../components/HeaderComponent';
import {useNavigation, useRoute} from '@react-navigation/native';
import FollowersUserView from '../../../components/FollowersUserView';
import {
	followUnfollowUser,
	getUserList,
	getVisitorList
} from '../../../redux/apiHandler/apiActions';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import ScreenNames from '../../../navigation/screenNames';
import {getLevelRank} from '../../../constants/utils/Function';
import {RootState} from '../../../redux/store';
import {horizontalScale, verticalScale} from '../../../theme';

let visiterPage = 0;

const UserViewProfileScreen: React.FC<any> = props => {
	const params = useRoute().params;
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});
	const [userList, setUserList] = useState();
	const [totalPage, setTotalPage] = useState(0);

	useEffect(() => {
		visiterPage = 0;
		getVisitorListData();
	}, []);

	const getVisitorListData = () => {
		if (visiterPage === 0) {
			dispatch(updateApiLoader({apiLoader: true}));
		}

		if (params?.isFromFeed) {
			let arrayData = [];
			userList?.map((item, index) => {
				arrayData.push(item?._id);
			});
			const getUserUploadData = {
				random: true,
				limit: '10',
				skip: visiterPage,
				excludeUsers: arrayData
			};
			getUserList(getUserUploadData)
				.then(res => {
					dispatch(updateApiLoader({apiLoader: false}));
					if (visiterPage !== 0) {
						setUserList(userList.concat(res?.data?.users));
					} else {
						setUserList(res?.data?.users);
					}
					setTotalPage(res?.data?.countUsers);
				})
				.catch(err => {
					dispatch(updateApiLoader({apiLoader: false}));
				});
		} else {
			const uploadData = {
				skip: visiterPage,
				limit: '10'
			};
			getVisitorList(uploadData)
				.then(res => {
					dispatch(updateApiLoader({apiLoader: false}));
					console.log('getVisitorList Response : ', res);
					if (visiterPage !== 0) {
						setUserList(userList.concat(res?.data?.visitor));
					} else {
						setUserList(res?.data?.visitor);
					}
					setTotalPage(res?.data.visitorCount);
				})
				.catch(err => {
					dispatch(updateApiLoader({apiLoader: false}));

					console.log('getVisitorList Data Err : ', err);
				});
		}
	};

	const renderFollowersUserItem = ({item, index}) => (
		<FollowersUserView
			// levelRank={item?.level}
			displayName={!params?.isFromFeed ? getLevelRank(item?.level)?.type : ''}
			profilePic={item?.picture}
			userName={item?.displayName || '@' + item?.userName}
			shouldShowCloseButton={true}
			onPress={() => {
				console.log(item);
				if (userInfo?.user?._id === item?._id) return;
				navigation.push(ScreenNames.OtherUserProfileScreen, {
					userId: item?._id
				});
			}}
			shouldShowCloseButton={false}
			isShowFollow={params?.isFromFeed}
			onFollow={() => {
				postFollowUser(item?._id);
				removeUser(item?._id);
			}}
			totalfollowers={item?.followers?.totalfollowers - 1}
			followUserData={item?.followers?.followersData}
		/>
	);

	const removeUser = (follower_id: any) => {
		let filteredList = userList.filter((item: any) => item._id !== follower_id);
		setUserList(filteredList);
	};

	//followUnfollowUser
	const postFollowUser = (follower_id: any) => {
		followUnfollowUser({follower_id: follower_id})
			.then(res => {
				console.log('postFollowUser Response : ', res);
				if (res?.statusCode === 200) {
					removeUser(follower_id);
				}
			})
			.catch(err => {
				console.log('followUnfollowUser Data Err : ', err);
			});
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					onLeftIconPath={icons.back}
					name={
						params?.isFromFeed
							? Strings.str_trending_users
							: Strings.user_view_list
					}
				/>

				<FlatList
					showsVerticalScrollIndicator={false}
					bounces={false}
					data={userList}
					renderItem={renderFollowersUserItem}
					contentContainerStyle={{
						paddingBottom: verticalScale(20),
						marginHorizontal: horizontalScale(8)
					}}
					//onEndReachedThreshold={0.5}
					onEndReached={() => {
						if (totalPage !== userList.length) {
							visiterPage = visiterPage + 1;
							getVisitorListData();
						}
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default UserViewProfileScreen;
