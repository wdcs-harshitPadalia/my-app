import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {BackHandler, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import icons from '../../../assets/icon';
import HeaderComponent from '../../../components/HeaderComponent';
import SettingKeyListView, {
	ListProps
} from '../../../components/SettingKeyListView';

import Strings from '../../../constants/strings';
import {editProfile} from '../../../redux/apiHandler/apiActions';
import {RootState} from '../../../redux/store';
import styles from './style';

const PushNotificationScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const userProfileInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});
	const [selectedSettingKeyData, setselectedSettingKeyData] = useState({});
	const [keyCount, setkeyCount] = useState(0);

	const settingKeysListData: ListProps[] = [
		{
			sectionTitle: Strings.interactions,
			data: [
				{
					title: Strings.someone_takes_bet,
					toggleValue: userProfileInfo?.user?.push_notifications?.bet_join,
					keyValue: 'bet_join'
				},
				{
					title: Strings.someone_replicates_bet,
					toggleValue: userProfileInfo?.user?.push_notifications?.bet_replicate,
					keyValue: 'bet_replicate'
				},
				{
					title: Strings.bet_invitation,
					toggleValue:
						userProfileInfo?.user?.push_notifications?.bet_invitation,
					keyValue: 'bet_invitation'
				},
				{
					title: Strings.new_Followers,
					toggleValue: userProfileInfo?.user?.push_notifications?.new_followers,
					keyValue: 'new_followers'
				}
			]
		}
	];

	const handleGoBack = () => {
		if (keyCount !== 0) {
			const responseData = {
				push_notifications: {
					...userProfileInfo?.user?.push_notifications,
					...selectedSettingKeyData
				}
			};
			dispatch(editProfile(responseData));
		}

		navigation.goBack();
	};

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', handleGoBack);

		return () =>
			BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						handleGoBack();
					}}
					onLeftIconPath={icons.back}
					name={Strings.push_notification}
				/>
				<SettingKeyListView
					data={settingKeysListData}
					setSettingKeyValue={(key: string, value: boolean) => {
						selectedSettingKeyData[key] = value;
						setkeyCount(Object.keys(selectedSettingKeyData).length);
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default PushNotificationScreen;
