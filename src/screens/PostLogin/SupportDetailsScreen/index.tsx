import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import icons from '../../../assets/icon';
import ChatViewComponent from '../../../components/ChatViewComponent';
import HeaderComponent from '../../../components/HeaderComponent';
import Strings from '../../../constants/strings';
import {defaultTheme} from '../../../theme/defaultTheme';
import styles from './style';

export default function SupportDetailsScreen() {
	const {ticket_id, ticket_status} = useRoute().params;
	const navigation = useNavigation();

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container1}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					onLeftIconPath={icons.back}
					name={Strings.support_details}
				/>
				<ChatViewComponent
					chatType="api"
					shouldShowMessageHistory={true}
					backGroundColor={defaultTheme.backGroundColor}
					style={styles.chatContainer}
					channelId={ticket_id}
					ticket_status={ticket_status}
				/>
			</View>
		</SafeAreaView>
	);
}
