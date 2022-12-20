import React, {useEffect} from 'react';
import {Alert, Platform, View} from 'react-native';
import {Text} from 'react-native-elements';
import icons from '../../../assets/icon';
import Strings from '../../../constants/strings';
import styles from './style';
import HeaderComponent from '../../../components/HeaderComponent';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FriendFlatList from '../../../components/FriendFlatList';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import ContactsFlatList from '../../../components/ContactsFlatList';
// import {openSettings, PERMISSIONS, request} from 'react-native-permissions';
import {getAllContacts} from '../../../redux/apiHandler/apiActions';
import useUpdateEffect from '../../../components/CustomHooks/useUpdateEffect';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import {isEmpty} from '@magic-sdk/provider';

const DiscoverFindFriendsScreen: React.FC<any> = props => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const contactsDataInfo = useSelector((state: RootState) => {
		return state.contactsData;
	});

	const contactsShowLoading = useSelector((state: RootState) => {
		return state.contactsData.isLoading;
	});

	useUpdateEffect(() => {
		dispatch(
			updateApiLoader({
				apiLoader: true,
				showAlertWithText: Strings.we_re_syncing_your_contacts
			})
		);
	}, [contactsShowLoading]);

	useEffect(() => {
		if (userInfo?.isSyncContact && isEmpty(contactsDataInfo?.contacts)) {
			getContacts();
		}
	}, [userInfo?.isSyncContact, contactsDataInfo?.contacts]);

	const getContacts = async () => {
		// const reqPermission = await request(
		// 	Platform.OS === 'android'
		// 		? PERMISSIONS.ANDROID.READ_CONTACTS
		// 		: PERMISSIONS.IOS.CONTACTS
		// );
		// console.log('reqPermission :: ', reqPermission);

		// if (reqPermission === 'granted') {
		// 	dispatch(
		// 		updateApiLoader({
		// 			apiLoader: true
		// 		})
		// 	);
		// 	dispatch(getAllContacts());
		// } else {
		// 	// Alert.alert('Alert', Strings.contactAccess, [
		// 	// 	{
		// 	// 		text: 'Open Settings',
		// 	// 		onPress: () => openSettings()
		// 	// 	},
		// 	// 	{
		// 	// 		text: 'Cancel',
		// 	// 		onPress: () => console.log('Cancel Pressed')
		// 	// 	}
		// 	// ]);
		// }
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					onLeftIconPath={icons.back}
					name={Strings.connect_friends}
				/>
				<View style={styles.viewContain}>
					<View
						style={{
							flexGrow: 1
						}}>
						<ContactsFlatList
							userId={userInfo.user._id}
							getContacts={getContacts}
						/>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default DiscoverFindFriendsScreen;
