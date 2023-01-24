import React, {useState} from 'react';
import styles from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {defaultTheme} from '../../../theme/defaultTheme';
import ChatViewComponent from '../../../components/ChatViewComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import ChatHeaderView from '../../../components/ChatHeaderView';
import ScreenNames from '../../../navigation/screenNames';

const ChatDetailsScreen: React.FC<any> = props => {
	const navigation = useNavigation();
	const [modalVisible, setModalVisible] = useState(false);
	const {params} = useRoute();
	const {
		channelId,
		friendId,
		friendImage,
		friendName,
		friendLevel,
		friendDeviceToken,
		friendData,
		redirectType
	} = params ?? {};

	const arrRadioData = [
		{
			name: 'Anyone'
		},
		{
			name: 'Friends'
		},
		{
			name: 'nobody'
		},
		{
			name: 'Anyone'
		},
		{
			name: 'Friends'
		},
		{
			name: 'nobody'
		},
		{
			name: 'Anyone'
		},
		{
			name: 'Friends'
		},
		{
			name: 'nobody'
		},
		{
			name: 'Anyone'
		},
		{
			name: 'Friends'
		},
		{
			name: 'nobody'
		},
		{
			name: 'Anyone'
		},
		{
			name: 'Friends'
		},
		{
			name: 'nobody'
		}
	];

	// const renderFollowersUserItem = ({item, index}) => (
	//   // <ChatViewComponent
	//   //   onPress={() => {
	//   //     // navigation.navigate(ScreenNames.OtherUserProfileScreen);
	//   //   }}
	//   //   chatType="amity"
	//   //   shouldShowMessageHistory={true}
	//   //   backGroundColor={defaultTheme.backGroundColor}
	//   //   //style={styles.chatContainer}
	//   //   channelId={''}
	//   // />
	// );

	return (
		<SafeAreaView style={styles.container}>
			<ChatHeaderView
				onLeftMenuPress={() => {
					if (redirectType === 'chatUser') {
						navigation.navigate(ScreenNames.ChatListScreen);
					} else {
						navigation.goBack();
					}
				}}
				friendImage={friendImage}
				friendName={'@' + friendName}
				friendLevel={friendLevel}
			/>
			<ChatViewComponent
				onPress={() => {
					// navigation.navigate(ScreenNames.OtherUserProfileScreen);
				}}
				chatType="amity"
				shouldShowMessageHistory={true}
				backGroundColor={defaultTheme.backGroundColor}
				style={styles.container}
				channelId={channelId}
				friend_id={friendId}
				allowImageUpload={true}
				friendDeviceToken={friendDeviceToken}
				friendData={friendData}
			/>
		</SafeAreaView>
	);
};

export default ChatDetailsScreen;
