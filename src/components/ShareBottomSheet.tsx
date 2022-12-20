import React, {useEffect, useRef} from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	Share,
	Alert
} from 'react-native';
import {
	Colors,
	Fonts,
	horizontalScale,
	moderateScale,
	verticalScale
} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import ConnectUserView from './ConnectUserView';
import Strings from '../constants/strings';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import {height} from '../theme/metrics';
import {Modalize} from 'react-native-modalize';
import {Portal} from '@gorhom/portal';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {uniqueIdGenerateFrom2Ids} from '../constants/utils/Function';
import {MessageType} from '@flyerhq/react-native-chat-ui';
import {
	createChannel,
	createMessage,
	createQuery,
	getChannel,
	joinChannel,
	runQuery,
	updateChannel
} from '@amityco/ts-sdk';
// import {TouchableOpacity} from 'react-native-gesture-handler';
const {v4: uuidv4} = require('uuid');

import {updateChannel as updateChannel1} from '../redux/apiHandler/apiActions';
interface Props {
	onPressOk?: () => void;
	onPressCancel?: () => void;
	isVisible: boolean;
	handleShareEvent: () => void;
	handleShareUrl: () => void;
	users: any;
	onNext: () => void;
	shareURL: string;
	isFromCustomBetDetails?: boolean;
}

const ShareBottomSheet: React.FC<Props> = props => {
	const {
		onPressCancel,
		onPressOk,
		isVisible,
		handleShareEvent,
		handleShareUrl,
		users,
		onNext,
		shareURL,
		isFromCustomBetDetails
	} = props;

	const modalizeRef = useRef<Modalize>(null);
	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const sendEventLinkWithFriend = async friend_id => {
		// const user = {
		//   id: userInfo.user?._id,
		//   avatarName: userInfo.user?.userName,
		//   firstName: userInfo.user?.userName,
		//   lastName: '',
		//   imageUrl: userInfo.user?.picture,
		// };
		// const channelId =
		//   'amity_' + uniqueIdGenerateFrom2Ids([userInfo.user?._id, friend_id]);
		// const textMessage: MessageType.Text = {
		//   author: user,
		//   createdAt: Date.now(),
		//   id: uuidv4(),
		//   text: shareURL,
		//   type: 'text',
		//   //uri: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_960_720.jpg',
		// };
		// const query = createQuery(createMessage, {
		//   channelId: channelId,
		//   type: 'text',
		//   data: {
		//     text: shareURL,
		//   },
		//   metadata: {
		//     data: textMessage,
		//   },
		// });

		// runQuery(query, ({data: textMessage, ...options}) => {
		//   //console.log('sent????', textMessage, options);
		//   //addMessage(message.metadata?.data);
		// });

		// const data = {
		//   senderId: userInfo?.user?._id,
		//   receiverId: friend_id,
		//   channelId: channelId,
		// };
		// await updateChannel1(data);
		const data = {
			senderId: userInfo?.user?._id,
			receiverId: friend_id,
			channelId:
				'amity_' + uniqueIdGenerateFrom2Ids([userInfo?.user?._id, friend_id])
		};
		await updateChannel1(data);

		const channelId =
			'amity_' + uniqueIdGenerateFrom2Ids([userInfo.user?._id, friend_id]);
		const query5 = createQuery(getChannel, channelId);
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
					userIds: [friend_id],
					type: 'live',
					metadata: {
						data: {
							[userInfo?.user?._id]: userInfo.user,
							[friend_id]: friend_id
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
	};

	const renderFollowersUserItem = ({item, index}) => (
		<ConnectUserView
			isInviteVisible={true}
			colorArray={defaultTheme.primaryGradientColor}
			username={item?.user?.userName}
			leftIconPath={item?.user?.picture}
			//leftIconPath={'https://source.unsplash.com/1024x768/?avatar'}
			buttonText={Strings.send}
			onInvitePress={() => {
				sendEventLinkWithFriend(item?.user?._id);
			}}
		/>
	);

	useEffect(() => {
		isVisible && modalizeRef.current?.open();
		!isVisible && modalizeRef.current?.close();
	}, [isVisible]);

	return (
		<Modalize
			scrollViewProps={{scrollEnabled: false}}
			ref={modalizeRef}
			modalHeight={height * (users.length > 0 ? 0.55 : 0.2)}
			modalStyle={styles.modalizeStyle}
			handlePosition="inside"
			handleStyle={{backgroundColor: Colors.placeholderColor}}
			onClosed={onPressCancel}>
			<View style={styles.viewContain}>
				{!isFromCustomBetDetails && (
					<TouchableOpacity
						style={styles.viewStory}
						activeOpacity={0.8}
						onPress={handleShareEvent}>
						<ExpoFastImage
							style={styles.imgIconStyle}
							resizeMode="cover"
							source={{uri: userInfo.user?.picture}}
							defaultSource={icons.userDummy}
							// source={icons.userDummy}
						/>
						<Text style={styles.usernameStyle}>
							{Strings.share_to_your_story}
						</Text>
					</TouchableOpacity>
				)}
				<TouchableOpacity onPress={handleShareUrl}>
					<Text style={styles.linkStyle}>{Strings.send_link_via}</Text>
				</TouchableOpacity>
				{users.length > 0 && (
					<>
						<Text style={styles.linkStyle}>{Strings.send_to_a_friend}</Text>
						<FlatList
							style={{maxHeight: height * 0.3}}
							data={users}
							renderItem={renderFollowersUserItem}
							showsVerticalScrollIndicator={false}
							//inverted
							onMomentumScrollEnd={onNext}
						/>
					</>
				)}
			</View>
		</Modalize>
	);
};

const styles = StyleSheet.create({
	modalizeStyle: {
		backgroundColor: defaultTheme.backGroundColor,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 2,
		elevation: 2
	},
	viewContain: {
		padding: horizontalScale(20)
	},
	viewStory: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	imgIconStyle: {
		width: 34,
		height: 34,
		borderRadius: 17,
		marginRight: verticalScale(16)
	},
	usernameStyle: {
		fontSize: moderateScale(16),
		color: colors.white,
		fontFamily: Fonts.type.Inter_SemiBold,
		marginVertical: verticalScale(12)
	},
	linkStyle: {
		fontSize: moderateScale(16),
		color: colors.white,
		fontFamily: Fonts.type.Inter_SemiBold,
		marginTop: verticalScale(16),
		marginBottom: verticalScale(10)
	}
});

export default ShareBottomSheet;
