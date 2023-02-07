import React, {useEffect, useRef, useState} from 'react';
import {
	ActivityIndicator,
	Dimensions,
	NativeTouchEvent,
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	Text,
	Alert
} from 'react-native';

import Modal from 'react-native-modal';
// import GestureRecognizer from 'rn-swipe-gestures';
import Story from './Story';
import UserView from './UserView';
import ProgressArray from './ProgressArray';
import {SafeAreaView} from 'react-native-safe-area-context';
import {defaultTheme} from '../../theme/defaultTheme';
import icons from '../../assets/icon';
import {horizontalScale, verticalScale} from '../../theme';
import CommentInput from '../CommentInput';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import Strings from '../../constants/strings';
import {
	createJoinBetShareUrl,
	createMatchDetailsShareUrl,
	getVideoShareUrl,
	uniqueIdGenerateFrom2Ids
} from '../../constants/utils/Function';
import {MessageType} from '@flyerhq/react-native-chat-ui';
import {
	createChannel,
	createMessage,
	createQuery,
	getChannel,
	joinChannel,
	runQuery
} from '@amityco/ts-sdk';
import {updateChannel} from '../../redux/apiHandler/apiActions';
import {updateChannel as updateChannel1} from '../../redux/apiHandler/apiActions';
const {v4: uuidv4} = require('uuid');

const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
	dataStories: any;
	onStoryNext: (boolean) => void;
	onStoryPrevious: (boolean) => void;
	onClose: () => void;
	isNewStory: boolean;
	onHandleRedirectUser: () => void;
};

const StoryDetailsContainer: React.FC<Props> = (props: Props) => {
	const storyRef = useRef();

	const {dataStories} = props;
	const {stories = []} = dataStories || {};
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isModelOpen, setIsModelOpen] = useState(false);
	const [isPause, setIsPause] = useState(false);
	// const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [isLoaded, setLoaded] = useState(false);
	const story = stories.length ? stories[currentIndex] : {};
	const [duration, setDuration] = useState(
		stories[currentIndex].duration ? stories[currentIndex].duration : 3
	);
	const [isInputFocus, setIsInputFocus] = useState(false);
	// const [duration, setDuration] = useState(3);

	// useEffect(() => {
	//   console.log("dataStories >> ",JSON.stringify(dataStories));
	//   console.log("stories >> ",JSON.stringify(stories));
	//   console.log("stories.length >> ",stories.length);
	//   console.log("stories[currentIndex] >> ",stories[currentIndex]);
	// }, []);

	const {isReadMore}: any = story || {};

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const changeStory = (evt: NativeTouchEvent) => {
		storyRef.current.handlePlay();
		if (evt.pageX > SCREEN_WIDTH / 2 - 100) {
			nextStory();
		} else {
			prevStory();
		}
	};

	const nextStory = () => {
		console.log('nextStory >> ');
		if (stories.length - 1 > currentIndex) {
			setCurrentIndex(currentIndex + 1);
			setLoaded(false);
			setDuration(
				stories[currentIndex].duration ? stories[currentIndex].duration : 3
			);
		} else {
			setCurrentIndex(0);
			setIsPause(false);
			props.onStoryNext(false);
		}
	};

	const prevStory = () => {
		console.log('prevStory >>');
		if (currentIndex > 0 && stories.length) {
			setCurrentIndex(currentIndex - 1);
			setLoaded(false);
			setDuration(
				stories[currentIndex].duration ? stories[currentIndex].duration : 3
			);
		} else {
			setCurrentIndex(0);
			setIsPause(false);
			props.onStoryPrevious(false);
		}
	};

	const onImageLoaded = () => {
		console.log('onImageLoaded >>');
		setDuration(
			stories[currentIndex].duration ? stories[currentIndex].duration : 3
		);
		setLoaded(true);
	};

	const onVideoLoaded = length => {
		console.log('length :: ', length);
		// console.log('onVideoLoaded >>', length.duration);
		setLoaded(true);
		setDuration(stories[currentIndex].duration);
		// setDuration(length.duration);
	};

	const onPause = result => {
		console.log('onPause >>', result);
		setIsPause(result);
	};

	const replyModalOpen = () => {
		console.log('replyModalOpen >>');
		storyRef.current.handlePause();
		setIsPause(true);
		setIsInputFocus(true);
		// setIsModelOpen(true);
	};

	const replyModalClose = () => {
		console.log('replyModalClose >>');
		storyRef.current.handlePlay();
		setIsPause(false);
		setIsInputFocus(false);
		// setIsModelOpen(false);
	};

	const loading = () => {
		if (!isLoaded) {
			return (
				<View style={styles.imgLoading}>
					{/* <View>
            <Story
              onImageLoaded={onImageLoaded}
              pause={isPause}
              onVideoLoaded={onVideoLoaded}
              story={story}
              friendProfile={dataStories.picture}
              userName={`@` + dataStories.userName}
            />
          </View> */}
					<ActivityIndicator color="white" />
				</View>
			);
		}
	};

	const onSwipeDown = () => {
		console.log('onSwipeDown >>');
		props.onClose();
		// if (!isModelOpen) {
		//   props.onClose();
		// } else {
		//   setIsModelOpen(false);
		// }
	};

	const onSwipeUp = () => {
		console.log('onSwipeUp >>');
		// if (!isModelOpen && isReadMore) {
		//   setIsModelOpen(true);
		// }
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* <GestureRecognizer
				onSwipeDown={onSwipeDown}
				onSwipeUp={onSwipeUp}
				config={config}
				style={styles.container}> */}
			<TouchableOpacity
				activeOpacity={1}
				delayLongPress={500}
				disabled={isInputFocus}
				onPress={e => changeStory(e.nativeEvent)}
				onLongPress={() => onPause(true)}
				onPressOut={() => onPause(false)}
				style={styles.container}>
				<View style={styles.container}>
					<Story
						ref={storyRef}
						onImageLoaded={onImageLoaded}
						pause={isPause}
						isNewStory={props.isNewStory}
						onVideoLoaded={onVideoLoaded}
						story={story}
						friendProfile={dataStories.picture}
						userName={'@' + dataStories.userName}
						storyClose={props.onClose}
						friendLevel={dataStories.level}
						next={nextStory}
					/>

					{/* {loading()} */}

					<UserView
						username={
							dataStories?._id === userInfo?.user?._id
								? Strings.your_story
								: '@' + dataStories.userName
						}
						profileImg={dataStories.picture}
						timeLeft={stories[currentIndex].createdAt}
						onClosePress={props.onClose}
						friendLevel={dataStories.level}
						handleRedirectUser={props.onHandleRedirectUser}
					/>

					{/* {!isModelOpen && dataStories?._id !== userInfo?.user?._id && (
              <TouchableOpacity
                onPress={replyModalOpen}
                style={styles.replyContainer}>
                <Image source={icons.reply} style={styles.replyIcon} />
                <Text style={styles.replyText}>{'Reply'}</Text>
              </TouchableOpacity>
            )} */}

					<ProgressArray
						next={nextStory}
						isLoaded={isLoaded}
						duration={duration}
						pause={isPause}
						isNewStory={props.isNewStory}
						stories={stories}
						currentIndex={currentIndex}
						currentStory={stories[currentIndex]}
						length={stories.map((_, i) => i)}
						progress={{id: currentIndex}}
					/>
				</View>
			</TouchableOpacity>
			{/* <Modal
					style={[
						styles.modal,
						{backgroundColor: isModelOpen ? 'transparent' : ''}
					]}
					isVisible={isModelOpen}>
					<View
						style={{height: '100%', backgroundColor: 'red'}}
						onTouchEndCapture={replyModalClose}> */}
			{dataStories?._id !== userInfo?.user?._id && (
				<View
					style={{
						width: '100%',
						position: 'absolute',
						bottom: 30,
						paddingHorizontal: verticalScale(20)
					}}>
					<CommentInput
						profileImage={userInfo.user?.picture}
						style={{backgroundColor: 'transparent'}}
						rightIconPath={icons.ic_chatSend}
						placeholder="Type a message..."
						rightIconClick={async text => {
							console.log('rightIconClick >>', stories[currentIndex]);
							const data = {
								senderId: userInfo?.user?._id,
								receiverId: dataStories?._id,
								channelId:
									'amity_' +
									uniqueIdGenerateFrom2Ids([
										userInfo?.user?._id,
										dataStories?._id
									])
							};
							await updateChannel1(data);

							const channelId =
								'amity_' +
								uniqueIdGenerateFrom2Ids([
									userInfo.user?._id,
									dataStories?._id
								]);
							const query5 = createQuery(getChannel, channelId);
							let shareURL = '';

							if (story.type === 'video') {
								shareURL =
									getVideoShareUrl(
										story?.shortVideos?._id ?? story?.betShortVideos?._id
									) +
									'\n' +
									text;
							} else {
								shareURL =
									(story?.bet && Object.keys(story.bet).length > 0
										? createJoinBetShareUrl(story.bet?._id)
										: createMatchDetailsShareUrl(
												Strings.feed,
												story?.match?._id,
												1
										  )) +
									'\n' +
									text;
							}
							runQuery(query5, result => {
								//console.log('getChannelByID', result);
								if (result.data) {
									const user = {
										id: userInfo.user?._id,
										avatarName: userInfo.user?.userName,
										firstName: userInfo.user?.userName,
										lastName: '',
										imageUrl: userInfo.user?.picture
									};
									const textMessage: MessageType.Text = {
										author: user,
										createdAt: Date.now(),
										id: uuidv4(),
										text: shareURL,
										type: 'text'
										//uri: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_960_720.jpg',
									};
									const query = createQuery(createMessage, {
										channelId: channelId,
										type: 'text',
										data: {
											text: shareURL
										},
										metadata: {
											data: textMessage
										}
									});

									runQuery(query, ({data: textMessage, ...options}) => {
										//console.log('sent????', textMessage, options);
										//addMessage(message.metadata?.data);
										if (options?.error || options?.loading) {
											return;
										}
										Alert.alert('', 'Message sent successfully.');
									});
									let query1 = createQuery(joinChannel, channelId);
									runQuery(query1, result =>
										console.log('result?.data?.channelId???', result)
									);
								} else if (result.loading === false) {
									const query2 = createQuery(createChannel, {
										channelId: channelId,
										userIds: [dataStories?._id],
										type: 'live',
										metadata: {
											data: {
												[userInfo?.user?._id]: userInfo.user,
												[dataStories?._id]: dataStories?._id
											}
										}
									});
									runQuery(query2, result => {
										if (result.data) {
											const user = {
												id: userInfo.user?._id,
												avatarName: userInfo.user?.userName,
												firstName: userInfo.user?.userName,
												lastName: '',
												imageUrl: userInfo.user?.picture
											};
											const textMessage: MessageType.Text = {
												author: user,
												createdAt: Date.now(),
												id: uuidv4(),
												text: shareURL,
												type: 'text'
												//uri: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_960_720.jpg',
											};
											const query = createQuery(createMessage, {
												channelId: channelId,
												type: 'text',
												data: {
													text: shareURL
												},
												metadata: {
													data: textMessage
												}
											});

											runQuery(query, ({data: textMessage, ...options}) => {
												//console.log('sent????', textMessage, options);
												if (options?.error || options?.loading) {
													return;
												}
												Alert.alert('', 'Message sent successfully.');

												//addMessage(message.metadata?.data);
											});
										}
									});
								}
							});
							console.log('rightIconClick');
						}}
						onLeftIconPress={() => {
							console.log('onLeftIconPress');
						}}
						onFocus={replyModalOpen}
						onBlur={replyModalClose}
					/>
				</View>
			)}
			{/* </View>
				</Modal> */}
			{/* </GestureRecognizer> */}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: defaultTheme.backGroundColor,
		marginHorizontal: 0,
		marginVertical: 0
	},
	progressBarArray: {
		flexDirection: 'row',
		position: 'absolute',
		top: 30,
		width: '98%',
		height: 10,
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	imgLoading: {
		backgroundColor: defaultTheme.backGroundColor,
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	modal: {
		// position: 'absolute',
		// left: 10,
		// right: 10,
		// bottom: verticalScale(20),
		height: '100%',
		margin: 0
	},
	input: {
		marginHorizontal: verticalScale(16),
		alignSelf: 'center'
	},
	replyContainer: {
		position: 'absolute',
		bottom: 55,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	replyIcon: {
		height: 30,
		width: 30,
		tintColor: colors.white
	},
	replyText: {
		color: colors.white,
		fontSize: 12,
		fontWeight: '400',
		fontFamily: fonts.type.Krona_Regular
	}
});

export default StoryDetailsContainer;
