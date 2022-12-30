import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, Share, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import icons from '../../../assets/icon';
import FeedBetsView from '../../../components/Events/feedBetsView';
import HeaderComponent from '../../../components/HeaderComponent';
import ShareBottomSheet from '../../../components/ShareBottomSheet';
import Strings from '../../../constants/strings';
import {createBetDetailsPreviewShareUrl} from '../../../constants/utils/Function';
import ScreenNames from '../../../navigation/screenNames';
import {
	getFollowers,
	getMatchDetails
} from '../../../redux/apiHandler/apiActions';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import styles from './style';

export default function EventDetailsScreen() {
	const dispatch = useDispatch();

	const [isCollapsed, setIsCollapsed] = useState(true);
	const [isSecondLevelCollapsed, setIsSecondLevelCollapsed] = useState(true);

	const [isMenuOpen, seIsMenuOpen] = useState(false);
	const [feedObject, setFeedObject] = useState();
	const [selectedBetType, setSelectedBetType] = useState();

	const topTabData = [
		{id: 1, title: 'All', badgeCount: '9'},
		{id: 2, title: 'Bets', badgeCount: '4'},
		{id: 3, title: 'Friends', badgeCount: '5'}
	];
	const params = useRoute().params;
	const {title, matchId, isRecent, betCreationType} = params;
	const navigation = useNavigation();

	const [currentPage, setCurrentPage] = useState(0);
	const [totalFollowUser, setTotalFollowUser] = useState(-1);
	const [followUserData, setFollowUserData] = useState([]);
	const [isFromBackButton, setIsFromBackButton] = useState(false);

	// const MemorizedFeedBetsView = React.useMemo(
	//   () => <FeedBetsView item={feedObject} />,
	//   [feedObject],
	// );

	useEffect(() => {
		console.log('title >> ', title);
		console.log('matchId >> ', matchId);
		console.log('betCreationType >> ', betCreationType);

		dispatch(updateApiLoader({apiLoader: true}));

		getMatchDetails(matchId)
			.then(res => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log('getMatchDetails >> res >> ', JSON.stringify(res));
				setFeedObject(res?.data?.matchDetails);

				// if (res?.data?.length > 0) {
				// setFeedObject(res?.data[0]);
				// } else {
				// Alert.alert('', 'Match has been already started!');
				// navigation.goBack();
				// }

				setSelectedBetType(res?.data?.betTypes);
			})
			.catch(err => {
				dispatch(updateApiLoader({apiLoader: false}));
				console.log(err);
			});
	}, [matchId, isFromBackButton]);

	const handleShareStory = (isShareFrom, tempFeedObject) => {
		seIsMenuOpen(false);

		// console.log('====================================');
		// console.log('tempFeedObject ::', JSON.stringify(tempFeedObject));
		// console.log('====================================');
		if (isShareFrom === 'custom_bet') {
			navigation.navigate(ScreenNames.StoryShareScreen, {
				feedObject: {
					bet: tempFeedObject,
					dataType: 'custom'
				},
				matchId: tempFeedObject?.bets[0]?.match_id
			});
		} else {
			navigation.navigate(ScreenNames.StoryShareScreen, {
				feedObject: tempFeedObject,
				isFromFeed: true,
				matchId: tempFeedObject?._id
			});
		}
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
				// console.log('getFollowersData Response : ', JSON.stringify(res));
				if (currentPage !== 0) {
					setFollowUserData(followUserData.concat(res?.data.follower));
				} else {
					setFollowUserData(res?.data.follower);
				}
				setTotalFollowUser(res?.data.countfollower);
			})
			.catch(err => {
				console.log('getFollowersData Data Err : ', err);
			});
	};
	useEffect(() => {
		getFollowersData();
	}, [currentPage]);

	const handleShareUrl = async () => {
		try {
			const result = await Share.share({
				message: createBetDetailsPreviewShareUrl(
					title,
					matchId,
					matchId,
					betCreationType,
					false
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
			Alert.alert(error.message);
		}
	};
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						setIsFromBackButton(true);
						navigation.goBack();
					}}
					name={Strings.event_details}
					onLeftIconPath={icons.back}
					onSettingIconPath={params?.isFromStreaming ? '' : icons.share}
					onSettingMenuPress={() => {
						//TODO: share popup
						params?.isFromStreaming ? {} : seIsMenuOpen(true);
					}}
				/>
				{/* <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          enableOnAndroid={false}
          bounces={false}> */}
				{params?.isFromStreaming && (
					<FeedBetsView
						isFromStreaming={title !== Strings.feed}
						item={params?.feedObject}
						selectedBetType={params?.selectedBetType}
						isRecent={isRecent}
						handleShareStory={data => handleShareStory('custom_bet', data)}
						handleShareUrl={handleShareUrl}
					/>
				)}
				{feedObject && selectedBetType && !params?.isFromStreaming && (
					<FeedBetsView
						isFromStreaming={title !== Strings.feed}
						item={feedObject}
						selectedBetType={selectedBetType}
						isRecent={isRecent}
						handleShareStory={data => handleShareStory('custom_bet', data)}
						handleShareUrl={handleShareUrl}
					/>
				)}
				{/* </KeyboardAwareScrollView> */}
				<ShareBottomSheet
					isVisible={isMenuOpen}
					onPressCancel={() => {
						seIsMenuOpen(false);
					}}
					users={followUserData}
					handleShareEvent={() => handleShareStory('match', feedObject)}
					handleShareUrl={handleShareUrl}
					shareURL={createBetDetailsPreviewShareUrl(
						title,
						matchId,
						matchId,
						betCreationType,
						false
					)}
					onNext={() => {
						if (totalFollowUser > followUserData.length) {
							setCurrentPage(currentPage + 1);
						}
					}}
				/>
			</View>
		</SafeAreaView>
	);
}
