import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
	StyleSheet,
	TextInputProps,
	TouchableOpacity,
	Text,
	View,
	ViewStyle,
	FlatList,
	Platform,
	Alert
} from 'react-native';
import {
	Colors,
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../theme';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import colors from '../theme/colors';
import {LinearGradient} from 'expo-linear-gradient';
import {defaultTheme} from '../theme/defaultTheme';
import Strings from '../constants/strings';
import DropShadow from 'react-native-drop-shadow';
import {
	Chat,
	MessageType,
	defaultTheme as defaultTheme1
} from '@flyerhq/react-native-chat-ui';
import {
	createQuery,
	runQuery,
	createMessage,
	connectClient,
	joinChannel,
	queryMessages,
	observeMessage,
	observeMessages,
	getChannel,
	queryChannels,
	createChannel,
	createImage,
	updateChannel
} from '@amityco/ts-sdk';
import Modal from 'react-native-modal';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import userInfo from '../redux/reducerSlices/userInfo';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import GradientText from './GradientText';
import moment from 'moment';
import fonts from '../theme/fonts';
import CommentInput from './CommentInput';
import EmojiModal from 'react-native-emoji-modal';
import EmojiPicker from 'react-native-emoji-picker-staltz';
import {gradientColorAngle, height, screenHeight} from '../theme/metrics';
import {
	addCommentToSupportTicket,
	getSupportTicketCommentsById,
	sendNotification,
	sendNotificationObject,
	updateChannelTimestamp
} from '../redux/apiHandler/apiActions';
import {
	dateFormatConvert,
	ImageIndicator,
	isValidUrl
} from '../constants/utils/Function';
import {launchImageLibrary} from 'react-native-image-picker';
import useUpdateEffect from './CustomHooks/useUpdateEffect';
import {updateApiLoader} from '../redux/reducerSlices/preLogin';
import {notifyOnNewMessageSend} from '../redux/reducerSlices/notification';

import {LinkPreview} from '@flyerhq/react-native-link-preview';
import HyperLink from 'react-native-hyperlink';
import * as ImagePicker from 'expo-image-picker';
import FullScreenImageComponent from './FullScreenImageComponent';
import {date} from 'yup';

const {v4: uuidv4} = require('uuid');
interface Props extends TextInputProps {
	onPress?: () => void;
	shouldShowCloseButton?: boolean;
	channelId: string;
	style?: ViewStyle;
	backGroundColor?: string;
	isTitleShown?: boolean;
	shouldShowMessageHistory?: boolean;
	chatType?: 'amity' | 'api';
	ticket_status?: string;
	friend_id: string;
	allowImageUpload?: boolean;
	friendDeviceToken?: string;
	friendData?: any;
}
type MessageAction = 'onCreate' | 'onUpdate' | 'onDelete';

//TODO: for public chat join the predefined channel with the channelId = 1 and send message to the channel and don't show the message history.
//for private chat first create a channel with the generated channelId and then join the channel with that channelId and after that fetch the messages from the channel with pagination
const ChatViewComponent: React.FC<Props> = props => {
	const {
		onPress,
		shouldShowCloseButton,
		channelId,
		style,
		backGroundColor,
		isTitleShown,
		shouldShowMessageHistory,
		chatType, //amity based or api based chat
		ticket_status,
		friend_id,
		allowImageUpload,
		friendDeviceToken,
		friendData
	} = props;

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const [messages, setMessages] = useState<MessageType.Any[]>([]);

	const [isShowImagePreview, setIsShowImagePreview] = useState<Boolean>(false);

	const [imageURL, setImageURL] = useState('');

	const [currentPage, setCurrentPage] = useState(0);

	const [imageUploadStatus, setImageUploadStatus] = useState(false);

	const [imageUploadData, setImageUploadData] = useState({});

	const flatListRef = useRef();

	const dispatch = useDispatch();

	const user = {
		id: userInfo.user?._id,
		avatarName: userInfo.user?.userName,
		firstName: userInfo.user?.userName,
		lastName: '',
		imageUrl: userInfo.user?.picture
	};

	const [isEmojiModalVisible, setIsEmojiModalVisible] = useState(false);
	const [options, setOptions] =
		useState<Amity.RunQueryOptions<typeof queryMessages>>();

	const {loading, prevPage, error} = options ?? {};

	useEffect(() => {
		if (chatType === 'amity') {
			// const query = createQuery(createChannel, {
			//   channelId: '629db09e9c4e0cbdc7cf900f&628dea67927d045f8eb4b1bc',
			//   userIds: ['629db09e9c4e0cbdc7cf900f'],
			// });

			// runQuery(query, result => console.log(result));
			// runQuery(createQuery(queryChannels, {}), ({data: channels, ...options}) =>
			//   console.log('All channels joined???', channels, options),
			// );
			const query = createQuery(getChannel, channelId);
			runQuery(query, result => {
				//console.log('getChannelByID', result);
				if (result.data) {
					// const query6 = createQuery(updateChannel, channelId, {
					//   metadata: {
					//     data: {
					//       [userInfo?.user?._id]: userInfo.user,
					//       [friend_id]: friendData,
					//     },
					//   },
					// });
					// runQuery(query6, result => console.log('channel  Updated>>', result));
					let query1 = createQuery(joinChannel, channelId);
					runQuery(query1, result =>
						console.log('result?.data?.channelId???', result)
					);
				} else if (result.loading === false) {
					const query2 = createQuery(createChannel, {
						channelId: channelId,
						userIds: [friend_id],
						type: 'live',
						metadata: {
							data: {
								[userInfo?.user?._id]: userInfo.user,
								[friend_id]: friendData
							}
						}
					});
					runQuery(query2, result => console.log(result));
				}
			});
		}
		// return () => {
		//   query1 = null;
		// };
	}, [channelId]);

	useUpdateEffect(() => {
		setIsShowImagePreview(true);
	}, [imageURL]);

	const onQueryMessages = useCallback(
		({reset = false, page = {limit: 10}}) => {
			//console.log('onQueryMessages??>>>>>>>>>', reset, page);
			const query = createQuery(queryMessages, {
				page,
				channelId,
				isDeleted: false
			});

			runQuery(query, ({data, ...options}) => {
				// console.log('data>??>>>>>>>>>>', data);
				//if (options.prevPage?.before > options.prevPage?.limit || reset) {
				//console.log('options>????', options.origin, reset);
				if (data) {
					const tempArray = [];
					data.forEach(message => {
						!messages.includes(message) &&
							tempArray.push(message.metadata?.data);
					});
					setMessages(prevPosts =>
						reset ? tempArray.reverse() : [...prevPosts, ...tempArray.reverse()]
					);
				}
				// }

				setOptions(options);
			});
		},
		[channelId]
	);

	// useEffect(() => onQueryMessages({reset: true}), [onQueryMessages]);

	useEffect(() => {
		if (shouldShowMessageHistory && chatType === 'amity') {
			// let query1 = createQuery(joinChannel, channelId);
			// runQuery(query1, result => console.log('Joined:>>>', result));
			onQueryMessages({reset: true});
		}
	}, [onQueryMessages]);

	const getSupportComments = async () => {
		try {
			const response = await getSupportTicketCommentsById({
				_id: channelId,
				skip: currentPage,
				limit: 2
			});

			if (response.data?.recordsTotal < messages.length) {
				return;
			}
			//console.log('getSupportComments???? response', response.data?.recordsTotal);
			//setMessages(response.data?.comments);
			if (currentPage > 0) {
				setMessages([...messages, ...response.data?.comments]);
			} else {
				setMessages(response.data?.comments);
			}
		} catch {}
	};

	useEffect(() => {
		if (shouldShowMessageHistory && chatType === 'api') {
			//Call get conversation api
			getSupportComments();
		}
	}, [chatType, shouldShowMessageHistory?.value, currentPage]);

	useUpdateEffect(() => {
		console.log('imageUploadStatus???', imageUploadStatus);
		dispatch(
			updateApiLoader({
				apiLoader: imageUploadStatus,
				showAlertWithText: 'Please wait while we are uploading your image'
			})
		);
	}, [imageUploadStatus]);

	//options
	// useEffect(() => {
	//   console.log('options???', options);
	//   if (shouldShowMessageHistory && chatType === 'amity') {
	//     dispatch(
	//       updateApiLoader({
	//         apiLoader: options?.loading,
	//         //showAlertWithText: 'Please wait while we are uploading your image',
	//       }),
	//     );
	//   }
	// }, [options?.loading]);

	// const sendImageMessage = useCallback(() => {

	// }, []);

	// useUpdateEffect(() => {
	//   console.log('imageUploadData???', imageUploadData);
	//   if (imageUploadData && imageUploadData.length) {
	//     //setImageUploadData({});
	//     sendImageMessage();
	//   }
	// }, [imageUploadData, sendImageMessage]);

	const handleLoadMore = async () => {
		console.log('handleLoadMore', prevPage);
		if (prevPage) {
			//console.log('handleLoadMore1', prevPage);
			onQueryMessages({page: prevPage});
		}
	};

	// useEffect(
	//   () =>
	//     observeMessages(channelId, {
	//       onEvent: (
	//         action: MessageAction,
	//         message: Amity.Snapshot<Amity.Message>,
	//       ) => {
	//         // console.log('message>?:::::::', JSON.stringify(message), action);
	//         // if (action === 'onCreate') {
	//         console.log('message>?:::::::', JSON.stringify(message), action);
	//         //dispatch({notifyOnNewMessageSent(message.data)});
	//         // if (message.data?.type == 'image' && message.data?.editedAt) {
	//         setMessages(prevMessages => [
	//           message.data?.metadata.data!,
	//           ...prevMessages,
	//         ]);
	//         // } else if (
	//         //   message.data?.type !== 'image' &&
	//         //   message.data?.editedAt
	//         // ) {
	//         //   setMessages(prevMessages => [
	//         //     message.data?.metadata.data!,
	//         //     ...prevMessages,
	//         //   ]);
	//         // }
	//         // }
	//         dispatch(notifyOnNewMessageSend(message));
	//       },
	//     }),
	//   [channelId],
	// );

	useEffect(
		() =>
			observeMessages(channelId, {
				onEvent: (
					action: MessageAction,
					message: Amity.Snapshot<Amity.Message>
				) => {
					console.log('message OBserver Callds,ld,s>?:::::::', messages.filter((item) => item.id === message.data?.metadata.data.id));
					if(messages.filter((item) => item.id === message.data?.metadata.data.id)?.length > 0) {
						return;
					}
					if (action === 'onCreate') {
						console.log(
							'message>?:::::::',
							messages,
							action,
							'filter',
							message.data?.metadata.data!
						);
						//dispatch({notifyOnNewMessageSent(message.data)});
						if (message.data?.type == 'image' && message.data?.editedAt) {
							setMessages(prevMessages => [
								message.data?.metadata.data!,
								...prevMessages
							]);
						} else if (
							message.data?.type !== 'image' &&
							message.data?.editedAt
						) {
							setMessages(prevMessages =>  [
								message.data?.metadata.data!,
								...prevMessages
							]);
						}
						dispatch(notifyOnNewMessageSend(message));
					}
				}
			}),
		[channelId, messages]
	);

	const addMessage = (message: MessageType.Any) => {
		// setMessages([message, ...messages]);
	};

	const handleImageSelection = async () => {
		launchImageLibrary(
			{
				includeBase64: false,
				maxWidth: 1440,
				mediaType: 'photo',
				quality: 1
			},
			({assets}) => {
				console.log('response???', assets);
				const response = assets?.[0];

				if (response) {
					// const imageMessage: MessageType.Image = {
					//   author: user,
					//   createdAt: Date.now(),
					//   height: response.height,
					//   id: uuidv4(),
					//   name: response.fileName ?? response.uri?.split('/').pop() ?? '🖼',
					//   size: response.fileSize ?? 0,
					//   type: 'image',
					//   uri: `data:image/*;base64,${response.base64}`,
					//   width: response.width,
					// };
					//setMessages([imageMessage, ...messages]);
					//setMessages(imageMessage);
					let formData = new FormData();
					//data.append('files', `data:image/*;base64,${response.base64}`);
					formData.append('files', response);

					// console.log('??????', formData.getParts('files'));
					const query = createQuery(createImage, formData);

					runQuery(query, result => {
						console.log('image Uploaded????', result);
						setImageUploadStatus(result.loading);
						if (result.data && result.data.length && !result.loading) {
							//setImageUploadData(result.data);
							const imageMessage: MessageType.Image = {
								author: user,
								createdAt: Date.now(),
								id: uuidv4(),
								//text: message.text,
								type: 'image',
								uri: result.data[0].fileUrl + '?size=large'
							};
							const query8 = createQuery(createMessage, {
								channelId: channelId,
								type: 'image', // image, file, video, audio
								// @ts-ignore
								fileId: result.data[0].fileId,
								metadata: {
									data: imageMessage
								}
							});

							runQuery(query8, ({data: message, ...options}) =>
								console.log('IMage uplod api called???', message, options)
							);
						}
					});

					console.log('Hekleklejkkfjklfjfjkl ');
				}
			}
		);
	};
	const handleSendPress = async (message: MessageType.PartialText) => {
		if (chatType === 'api') {
			//Call send message api
			const response = await addCommentToSupportTicket(
				{
					senderId: userInfo.user?._id,
					msg: message.text
				},
				channelId
			);
			console.log('handleSendPress response???', response?.data);
			setMessages(prevMessages => [
				response.data?.commentAdded,
				...prevMessages
			]);
			// if (currentPage === 0) {
			//   getSupportComments();
			// } else {
			//   setCurrentPage(currentPage + 1);
			// }

			return;
		}
		try {
			// const imageMessage: MessageType.Image = {
			//   author: user,
			//   createdAt: Date.now(),
			//   id: uuidv4(),
			//   uri: 'https://res.cloudinary.com/shivicloudinary/image/upload/v1648112648/zw08jjkyciggh83wgubr.png',
			//   type: 'image',
			// };
			// const query1 = createQuery(createMessage, {
			//   channelId: channelId,
			//   type: 'image',
			//   data: {
			//     text: 'https://res.cloudinary.com/shivicloudinary/image/upload/v1648112648/zw08jjkyciggh83wgubr.png',
			//   },
			//   metadata: {
			//     data: imageMessage,
			//   },
			// });

			// runQuery(query1, ({data: imageMessage, ...options}) => {
			//   console.log(message, options);
			//   //addMessage(message.metadata?.data);
			// });
			// const imageMessage: MessageType.Image = {
			//   author: user,
			//   createdAt: Date.now(),
			//   height: response.height,
			//   id: uuidv4(),
			//   name: response.fileName ?? response.uri?.split('/').pop() ?? '🖼',
			//   size: response.fileSize ?? 0,
			//   type: 'image',
			//   uri: `data:image/*;base64,${response.base64}`,
			//   width: response.width,
			// }
			// const data = new FormData();
			// data.append(
			//   'files',
			//   'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
			// );

			// const query5 = createQuery(createImage, data);

			// runQuery(query5, result => console.log('imageUplaod???', result));

			// return;

			// connectClient({userId: '123', displayName: 'Jackky'});
			const textMessage: MessageType.Text = {
				author: user,
				createdAt: Date.now(),
				id: uuidv4(),
				text: message.text,
				type: 'text'
				//uri: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_960_720.jpg',
			};
			const query = createQuery(createMessage, {
				channelId: channelId,
				type: 'text',
				data: {
					text: message.text
				},
				metadata: {
					data: textMessage
				}
			});

			runQuery(query, ({data: textMessage, ...options}) => {
				console.log(message, options);
				if (options.loading === false && friendDeviceToken) {
					let userDetails = {
						username: userInfo.user?.displayName ?? userInfo.user?.userName
					};

					let notificationReq = sendNotificationObject(
						friendDeviceToken,
						Platform.OS === 'android' ? 'android' : 'ios',
						userDetails?.username,
						userDetails
					);
					sendNotification(notificationReq)
						.then(res => {
							console.log('sendNotification Data Res : ', res);
						})
						.catch(err => {
							console.log('notificationOnOff Data Err : ', err);
						});

					updateChannelTimestamp({channelId: channelId, timestamp: Date.now()})
						.then(res => {
							console.log('updateChannelTimestamp Data Res : ', res);
						})
						.catch(err => {
							console.log('updateChannelTimestamp Data Err : ', err);
						});
				}
				//sendNotification

				//addMessage(message.metadata?.data);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const shouldShowSendMsg = () => {
		if (friendData?.messagesVisible?.toLowerCase() === 'anyone') {
			return true;
		} else if (friendData?.messagesVisible?.toLowerCase() === 'nobody') {
			return false;
		} else if (
			friendData?.messagesVisible?.toLowerCase() === 'friends' &&
			friendData.isFriend === 1
		) {
			return true;
		}
		return false;
	};

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) {
			return;
		}

		const data = new FormData();
		data.append('files', event.target.files[0]);
		console.log('files : ', event.target.files[0]);
		// const query = createQuery(createImage, data);
		const query = createQuery(createImage, data);

		runQuery(query, result => {
			console.log('image Uploaded????', result);
			setImageUploadStatus(result.loading);
			if (result.data && result.data.length && !result.loading) {
				//setImageUploadData(result.data);
				const imageMessage: MessageType.Image = {
					author: user,
					createdAt: Date.now(),
					id: uuidv4(),
					//text: message.text,
					type: 'image',
					uri: result.data[0].fileUrl + '?size=large'
				};
				const query8 = createQuery(createMessage, {
					channelId: channelId,
					type: 'image', // image, file, video, audio
					// @ts-ignore
					fileId: result.data[0].fileId,
					metadata: {
						data: imageMessage
					}
				});

				runQuery(query8, ({data: message, ...options}) =>
					console.log('IMage uplod api called???', message, options)
				);
			}
		});

		// runQuery(query, (result) => console.log("===result=====", result));
	};

	return (
		<View
			style={[
				{
					flex: 1,
					backgroundColor: backGroundColor ?? defaultTheme.backGroundColor
				},
				{...style}
			]}>
			{isTitleShown && <Text style={styles.chatTextStyle}>Chat</Text>}
			{/* <input type="file" name="file" onChange={changeHandler} />; */}
			{chatType === 'amity' && (
				<Chat
					enableAnimation
					showUserNames
					messages={messages}
					onSendPress={handleSendPress}
					user={user}
					//dateFormat="DD/MM/YYYY"
					customDateHeaderText={date => dateFormatConvert(date)}
					// showDateHeader={false}
					// showTimeHeader={false}
					//timeFormat="DD/MM/YYYY"
					showUserAvatars
					renderImageMessage={message =>
						Platform.OS === 'web' ? (
							<TouchableOpacity
								onPress={() =>
									imageURL === message.uri
										? setIsShowImagePreview(true)
										: setImageURL(message.uri)
								}
								style={{
									backgroundColor: defaultTheme.backGroundColor,
									padding: 4
								}}>
								<ImageIndicator
									style={styles.imageStyle}
									source={{uri: message.uri}}
								/>
								<Text style={styles.messageTimeStyle}>
									{moment(message.createdAt).format('hh:mm A')}
								</Text>
							</TouchableOpacity>
						) : (
							<View
								style={{
									backgroundColor: defaultTheme.backGroundColor,
									padding: 4
								}}>
								<ImageIndicator
									style={styles.imageStyle}
									source={{uri: message.uri}}
								/>
								<Text style={styles.messageTimeStyle}>
									{moment(message.createdAt).format('hh:mm A')}
								</Text>
							</View>
						)
					}
					// emptyState={() => (
					//   <View
					//     style={{height: height, width: '100%'}}
					//   />
					// )}
					customBottomComponent={() => (
						<View style={styles.bottomComponent}>
							{console.log('riendData??????', friendData)}
							{(shouldShowSendMsg() ||
								!shouldShowMessageHistory ||
								channelId == '1') && (
								<CommentInput
									profileImage={!friend_id && userInfo.user?.picture}
									style={{backgroundColor: defaultTheme.backGroundColor}}
									rightIconPath={icons.ic_chatSend}
									placeholder="Type a message..."
									rightIconClick={
										text => handleSendPress({text: text, type: 'text'})
										//handleImageSelection()
									}
									shouldShowGallery={allowImageUpload}
									onGallaryPress={handleImageSelection}
									onLeftIconPress={() => setIsEmojiModalVisible(true)}
								/>
							)}
						</View>
					)}
					renderTextMessage={message => (
						<View style={{padding: 4}}>
							{userInfo?.user?._id &&
								message.author.id !== userInfo?.user?._id &&
								!friend_id && (
									<Text
										style={{
											//marginTop: 2,
											//marginBottom: -12,
											marginLeft: 4,
											fontSize: 12,
											fontWeight: '500',
											lineHeight: 24,
											color: colors.white,
											fontFamily: fonts.type.Inter_Regular
										}}>
										{'@' + message.author.firstName}
									</Text>
								)}
							<LinearGradient
								colors={
									message.author.id === userInfo?.user?._id
										? defaultTheme.primaryGradientColor
										: defaultTheme.ternaryGradientColor
								}
								useAngle={true}
								style={{
									paddingHorizontal: 16,
									paddingVertical: 12,
									borderRadius: 8,
									fontFamily: fonts.type.Inter_Regular
								}}
								angle={gradientColorAngle}>
								{/* {console.log(
                  "???message.text.split(' ')?.some(str => isValidUrl(str))",
                  message.text,
                  message.text.split(' ')?.some(str => isValidUrl(str)),
                )} */}
								{/* {message.text.split(' ')?.some(str => isValidUrl(str)) ? (
                  <LinkPreview text={message.text} />
                ) : ( */}
								{/* <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    //lineHeight: 24,
                    color: '#ffffff',
                    fontFamily: fonts.type.Inter_Regular,
                  }}>
                  {message.text}
                </Text> */}
								<HyperLink
									linkStyle={{
										color: '#fff',
										fontSize: 14,
										fontFamily: fonts.type.Inter_Bold
									}}
									linkDefault={true}>
									<Text
										style={{
											fontSize: 14,
											color: '#fff',
											fontFamily: fonts.type.Inter_Medium
										}}>
										{message.text}
									</Text>
								</HyperLink>
								{/* )} */}

								{/* <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    //lineHeight: 24,
                    color: '#ffffff',
                    fontFamily: fonts.type.Inter_Regular,
                  }}>
                  {message.text}
                </Text> */}
							</LinearGradient>
							<Text style={styles.messageTimeStyle}>
								{moment(message.createdAt).format('hh:mm A')}
							</Text>
						</View>
					)}
					textInputProps={{
						placeholder: 'Type a message...',
						color: 'red',
						fontFamily: fonts.type.Inter_Regular
					}}
					sendButtonVisibilityMode="always"
					// key={message => {
					//   return message.id;
					// }}
					theme={{
						...defaultTheme1,
						colors: {
							...defaultTheme1.colors,
							userAvatarNameColors: ['red'],
							background: backGroundColor ?? defaultTheme.backGroundColor,
							primary: 'transparent',
							secondary: 'transparent'
						}
					}}
					// onMessagePress={message => console.log(message)}
					//onEndReached={handleLoadMore}
					flatListProps={{
						inverted: true,
						nestedScrollEnabled: true,
						keyExtractor: message => message.id,
						onMomentumScrollEnd: () => {
							handleLoadMore();
						}
					}}
					//NEUTRAL_2
				/>
			)}
			{chatType === 'api' && (
				<>
					<FlatList
						inverted
						showsVerticalScrollIndicator={false}
						ref={flatListRef}
						data={messages}
						renderItem={({item}) => (
							<View style={styles.chatApiListStyle}>
								<View
									style={{
										alignItems:
											item.senderId === userInfo?.user?._id
												? 'flex-end'
												: 'flex-start'
									}}>
									{item.senderId !== userInfo?.user?._id && (
										<Text style={styles.chatApiBubbleUserTextStyle}>
											{'@' + item.senderUserName}
										</Text>
									)}

									<LinearGradient
										colors={
											item.senderId === userInfo.user._id
												? defaultTheme.primaryGradientColor
												: defaultTheme.ternaryGradientColor
										}
										useAngle={true}
										style={styles.chatBubbleGradientStyle}
										angle={gradientColorAngle}>
										<Text
											style={{
												fontSize: 14,
												fontWeight: '500',
												//lineHeight: 24,
												color: '#ffffff',
												fontFamily: fonts.type.Inter_Regular
											}}>
											{item.msg}
										</Text>
									</LinearGradient>
									<Text
										style={{
											marginTop: 2,
											//marginBottom: -12,
											marginLeft: 4,
											fontSize: 9,
											fontWeight: '500',
											//lineHeight: 24,
											color: colors.textTitle
										}}>
										{moment(item.createdAt).format('hh:mm A')}
									</Text>
								</View>
							</View>
						)}
						contentContainerStyle={{paddingBottom: verticalScale(16)}}
						// onContentSizeChange={() => {
						//   setTimeout(
						//     () =>
						//       flatListRef.current.scrollToOffset({
						//         animated: true,
						//         offset: 0,
						//       }),
						//     200,
						//   );
						// }}
						keyExtractor={item => item._id}
						onMomentumScrollEnd={() => {
							setCurrentPage(currentPage + 1);
						}}
					/>
					{messages.length <= 0 && (
						<View style={styles.noDataContainer}>
							<Text style={styles.noDataStyle}>
								{Strings.no_conversation_found}
							</Text>
						</View>
					)}
					{ticket_status?.toUpperCase() === Strings.OPEN && (
						<View style={styles.bottomComponent}>
							<CommentInput
								chatType={chatType}
								profileImage={userInfo.user?.picture}
								style={{backgroundColor: defaultTheme.backGroundColor}}
								rightIconPath={icons.ic_chatSend}
								placeholder="Type a message..."
								rightIconClick={text =>
									handleSendPress({text: text, type: 'text'})
								}
								onLeftIconPress={() => setIsEmojiModalVisible(true)}
							/>
						</View>
					)}
				</>
			)}
			<View>
				<Modal visible={isEmojiModalVisible} transparent={true}>
					<EmojiPicker
						//   onEmojiSelected={(emoji, event) => {
						//     console.log(emoji, event);
						//   }
						// )}
						// onEmojiSelected={(emoji, event) => {
						//   console.log(emoji, event);
						// })
						onPressOutside={() => {
							console.log('onPressOutside');
							setIsEmojiModalVisible(false);
						}}
						onEmojiSelected={data => {
							console.log(data);
							if (data) {
								handleSendPress({text: data, type: 'text'});
							}
							setIsEmojiModalVisible(false);
						}}
						rows={10}
						clearButtonText="Cancel"
						//hideClearButton
						localizedCategories={[
							// Always in this order:
							'Smileys and emotion',
							'People and body',
							'Animals and nature',
							'Food and drink',
							'Activities',
							'Travel and places',
							'Objects',
							'Symbols'
						]}
					/>
				</Modal>
			</View>
			<FullScreenImageComponent
				isVisible={isShowImagePreview}
				url={imageURL}
				onClose={() => {
					setIsShowImagePreview(false);
				}}
			/>
		</View>
	);
};

export default React.memo(ChatViewComponent);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingVertical: verticalScale(10),
		paddingHorizontal: verticalScale(6),
		flex: 1
	},
	bottomComponent: {
		//height: 100,
		//backgroundColor: 'red',
		paddingHorizontal: verticalScale(16),
		paddingBottom: verticalScale(16)
	},
	profileContainer: {
		shadowColor: colors.greenLight,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5
	},

	messageTimeStyle: {
		marginTop: 2,
		//marginBottom: -12,
		marginLeft: 4,
		fontSize: 9,
		fontWeight: '500',
		//lineHeight: 24,
		color: colors.textTitle
	},
	imgIconStyle: {
		width: 30,
		height: 30,
		borderRadius: 15
	},
	viewLabelContainer: {
		// flex: 0.8,
		flexDirection: 'column',
		justifyContent: 'center',
		padding: horizontalScale(10),
		marginLeft: horizontalScale(10),
		marginRight: horizontalScale(80),
		backgroundColor: colors.black,
		borderRadius: 10,
		overflow: 'hidden'
	},
	usernameStyle: {
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: Fonts.type.Inter_Regular,
		flexWrap: 'wrap'
		// textAlign: 'center',
	},
	chatTextStyle: {
		fontSize: moderateScale(20),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		flexWrap: 'wrap',
		// textAlign: 'center',
		marginLeft: horizontalScale(16),
		marginTop: verticalScale(10)
	},
	chatApiListStyle: {
		marginHorizontal: horizontalScale(16),
		marginBottom: verticalScale(8),
		flex: 1
	},
	chatApiBubbleUserTextStyle: {
		//marginTop: 2,
		//marginBottom: -12,
		marginLeft: 4,
		fontSize: 12,
		fontWeight: '500',
		lineHeight: 24,
		color: colors.white,
		fontFamily: fonts.type.Inter_Regular
	},
	chatBubbleGradientStyle: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 8,
		fontFamily: fonts.type.Inter_Regular
	},
	imageStyle: {
		height: horizontalScale(200),
		width: verticalScale(200),
		//backgroundColor: 'red',
		borderRadius: 8,
		overflow: 'hidden'
	},
	noDataContainer: {
		position: 'absolute',
		top: screenHeight / 3.5,
		left: 0,
		right: 0
	},
	noDataStyle: {
		fontSize: moderateScale(16),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginVertical: verticalScale(24),
		textAlign: 'center',
		marginTop: verticalScale(80)
	}
});
