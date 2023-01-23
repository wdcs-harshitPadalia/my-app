import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import icons from '../../assets/icon';
import CreateLeaguePopup from '../../components/CreateLeaguePopup';
import HeaderComponent from '../../components/HeaderComponent';
import NoDataComponent from '../../components/NoDataComponent';
import VideoContentList from '../../components/VideoContentList';
import Strings from '../../constants/strings';
import {
	deleteUserVideo,
	getUserVideoList
} from '../../redux/apiHandler/apiActions';
import {updateApiLoader} from '../../redux/reducerSlices/preLogin';
import {RootState} from '../../redux/store';
import styles from './style';
let pageUser = 0;

const VideoContentScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const params = useRoute().params;
	const {userId} = params;
	const [totalVideos, setTotalVideos] = useState(0);
	const [isNoData, setIsNoData] = useState(false);
	const [userVideoData, setUserVideoData] = useState([]);
	const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
	const [userVideoId, setUserVideoId] = useState('');

	const noDataItem = {
		image_url: icons.no_livestreaming,
		title_text: Strings.no_video_title,
		description_text: Strings.no_video_found
	};

	useEffect(() => {
		pageUser = 0;
	}, []);

	useEffect(() => {
		getAllVideoList();
	}, [pageUser]);

	// api call for getting the user videos
	const getAllVideoList = () => {
		if (pageUser === 0) {
			dispatch(updateApiLoader({apiLoader: true}));
		}

		const uploadData = {
			skip: pageUser,
			limit: '10',
			user_id: userId && userId
		};

		getUserVideoList(uploadData)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));

				// console.log('getAllVideoList :: getUserVideoList :: res ::', res);
				if (pageUser !== 0) {
					setUserVideoData(userVideoData.concat(res?.data?.videosList));
					setIsNoData(userVideoData.length === 0 ? true : false);
				} else {
					setUserVideoData(res?.data?.videosList);
					setIsNoData(res?.data?.videosList?.length === 0 ? true : false);
				}
				// console.log('length ::', res?.data?.videoCount);
				setTotalVideos(res?.data?.videoCount);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				// console.log('getAllVideoList :: getUserVideoList :: res ::', err);
			});
	};

	// update the user display video list
	const deleteVideo = id => {
		let filteredList = userVideoData.filter((item: any) => item._id !== id);
		setModalDeleteVisible(!modalDeleteVisible);
		setUserVideoData(filteredList);
		userVideoData.length === 1 && setIsNoData(true);
	};

	function onEndReached() {
		if (totalVideos !== userVideoData.length) {
			pageUser = pageUser + 1;
			getAllVideoList();
		}
	}
	// for deleting the user video
	function handleDeleteVideo(id) {
		const uploadData = {
			video_id: [id]
		};

		deleteUserVideo(uploadData)
			.then(res => {
				// console.log('RESSSS', res);
				dispatch(updateApiLoader({apiLoader: false}));
				if (res?.statusCode === 200) {
					deleteVideo(id);
				} else {
				}
			})
			.catch(() => {
				dispatch(updateApiLoader({apiLoader: false}));
			});
	}

	return (
		<SafeAreaView style={styles.container} edges={['bottom', 'top']}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					onLeftIconPath={icons.back}
					name={Strings.video_content}
				/>
				{isNoData ? (
					<View style={styles.noDataView}>
						<NoDataComponent noData={noDataItem} />
					</View>
				) : (
					<VideoContentList
						videoListData={userVideoData}
						setModalDeleteVisible={(value, id) => {
							setModalDeleteVisible(value);
							setUserVideoId(id);
						}}
						modalDeleteVisible={modalDeleteVisible}
						onEndReach={() => {
							onEndReached();
						}}
						isDeleteBtnVisible={userId}
					/>
				)}
			</View>

			<CreateLeaguePopup
				popupTitle={Strings.are_you_sure_you_want_to_delete_this_video}
				buttonOkTitle={Strings.sure}
				buttonCancelTitle={Strings.cancel}
				isVisible={modalDeleteVisible}
				onPressOk={() => {
					handleDeleteVideo(userVideoId);
				}}
				onPressCancel={() => {
					setModalDeleteVisible(!modalDeleteVisible);
				}}
				isInfoVisible={true}
			/>
		</SafeAreaView>
	);
};

export default VideoContentScreen;
