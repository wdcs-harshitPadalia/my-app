import React, {useEffect, useState} from 'react';
import {
	Alert,
	FlatList,
	Image,
	Platform,
	ScrollView,
	TouchableOpacity,
	View
} from 'react-native';
import {Text} from 'react-native-elements';
import icons from '../../../assets/icon';
import InputComponent from '../../../components/InputComponent';
import Strings from '../../../constants/strings';
import styles from './style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Fonts, horizontalScale, verticalScale} from '../../../theme';
import HeaderComponent from '../../../components/HeaderComponent';
import SwichView from '../../../components/SwichView';
import SelectWhoCan from '../../../components/SelectWhoCan';
import {useNavigation} from '@react-navigation/native';
import SportsComponent from '../../../components/SportsComponent';
import ScreenNames from '../../../navigation/screenNames';
import {SafeAreaView} from 'react-native-safe-area-context';
import SelectImageComponet from '../../../components/SelectImageComponet';

import {useDispatch, useSelector} from 'react-redux';
import {ImageIndicator} from '../../../constants/utils/Function';
import colors from '../../../theme/colors';
import {
	getAvatarList,
	getCategory,
	getSubcategory
} from '../../../redux/apiHandler/apiActions';
// import * as ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
// import {openSettings, PERMISSIONS, request} from 'react-native-permissions';
import {updateApiLoader} from '../../../redux/reducerSlices/preLogin';
import {Api, ApiBaseUrl, ApiConstants} from '../../../constants/api';
import SelectAvatarComponent from '../../../components/SelectAvatarComponent';
import {moderateFontScale} from '../../../theme/metrics';

const EditProfileScreen: React.FC<any> = props => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const [modalIsSuccess, setModalIsSuccess] = useState(false);
	const [profilePic, setProfilePic] = useState();

	const [displayName, setDiplayName] = useState(
		userInfo?.user?.displayName ?? ''
	);
	const [bioGraphy, setBioGraphy] = useState(userInfo?.user?.biography ?? '');
	const [userName, setUserName] = useState(userInfo?.user?.userName ?? '');
	// const [webSite, setWebsite] = useState(userInfo?.user?.website ?? '');
	const [email, setEmail] = useState(
		userInfo?.user?.email ?? userInfo?.user?.mobile_number ?? ''
	);

	const [isProfileVisible, setIsProfileVisible] = useState(
		userInfo?.user?.visible
	);

	const [isDispute, setIsDispute] = useState(userInfo?.user?.isJury);

	const [whoCanSeeBetStatistics, setWhoCanSeeBetStatistics] = useState(
		userInfo?.user?.bettingStatisticsVisible
	);
	const [whoCanSeeYourBalance, setWhoCanSeeYourBalance] = useState(
		userInfo?.user?.balanceVisible
	);
	const [whoCanSeeBets, setWhoCanSeeBets] = useState(
		userInfo?.user?.betsVisible
	);
	const [sendDirectMessage, setSendDirectMessage] = useState(
		userInfo?.user?.messagesVisible
	);
	const [whoCanSeeVideos, setWhoCanSeeVideos] = useState(
		userInfo?.user?.videosVisible
	);

	const [categoryData, setCategoryData] = useState();
	const [isCategoryId, setIsCategoryId] = useState(userInfo?.user?.category_id);

	const [subCategoryData, setSubCategoryData] = useState([]);
	const [selectedSubCategory, setSelectedSubCategory] = useState(
		userInfo?.user?.preferredSubCategories
			? userInfo?.user?.preferredSubCategories?.split(',')
			: []
	);

	const [showAvatarSelectSheet, setShowAvatarSelectSheet] = useState(false);
	const [avatarDataArray, setAvatarDataArray] = useState([]);
	const [isAvatarSelect, setIsAvatarSelect] = useState(false);
	const [isNotificationEnabled, setIsNotificationEnabled] = useState(
		userInfo?.user?.push_notifications?.pause_all_notifications
	);

	const videoArrOptions = [
		{
			name: Strings.anyone
		},
		{
			name: Strings.friends
		}
	];

	const toggleSwitch = (type: string) => {
		if (type === 'privacy') {
			setIsProfileVisible(previousState => !previousState);
		} else if (type === 'notification') {
			setIsNotificationEnabled(!isNotificationEnabled);
		}
	};

	const whoCanSeeGet = (type: string, value: string) => {
		if (type === Strings.bettingStatistics) {
			setWhoCanSeeBetStatistics(value);
		} else if (type === Strings.balance) {
			setWhoCanSeeYourBalance(value);
		} else if (type === Strings.bets) {
			setWhoCanSeeBets(value);
		} else if (type === Strings.directMessages) {
			setSendDirectMessage(value);
		} else if (type === Strings.video_content) {
			setWhoCanSeeVideos(value);
		}
	};

	useEffect(() => {
		getCategoryData();
		getAvatarListData();
	}, []);

	useEffect(() => {
		if (isCategoryId) {
			getSubCategoryData(isCategoryId);
		}
	}, [isCategoryId]);

	const getCategoryData = () => {
		getCategory()
			.then(res => {
				//console.log('getCategoryData Response : ', res);
				setCategoryData(res?.data.category);
			})
			.catch(err => {
				console.log('getCategoryData Data Err : ', err);
			});
	};

	const getSubCategoryData = (categoryID: string) => {
		getSubcategory(categoryID)
			.then(res => {
				console.log('getSubCategoryData Response : ', res);
				setSubCategoryData(res?.data.subcategory);
			})
			.catch(err => {
				console.log('getSubCategoryData Data Err : ', err);
			});
	};

	const getAvatarListData = () => {
		const uploadData = {
			status: 'ACTIVE'
		};
		getAvatarList(uploadData)
			.then(res => {
				// console.log('getAvatarList Response >>>', JSON.stringify(res));
				setAvatarDataArray(res?.data);
			})
			.catch(err => {
				console.log('getAvatarList Data Err : ', err);
				Alert.alert('getAvatarList', Strings.somethingWentWrong);
			});
	};

	const renderSportsItem = ({item, index}) => (
		<SportsComponent
			title={item.name.toUpperCase()}
			imgPath={item.imageUrl}
			onPress={() => {
				if (isCategoryId === item._id) return;
				setSelectedSubCategory([]);
				setSubCategoryData([]);
				setIsCategoryId(item._id);
			}}
			isShadow={isCategoryId === item._id ? true : false}
			selectedCount={
				isCategoryId === item._id ? selectedSubCategory?.length : 0
			}
		/>
	);

	const renderSubCatItem = ({item, index}) => (
		<SportsComponent
			title={item.name.toUpperCase()}
			imgPath={item.imageUrl}
			onPress={() => {
				let isExists = false;
				selectedSubCategory.filter(itemTemp => {
					if (itemTemp === item._id) {
						isExists = true;
					}
				});
				if (!isExists) {
					selectedSubCategory.push(item._id);
					setSelectedSubCategory([...selectedSubCategory]);
				} else {
					setSelectedSubCategory(
						selectedSubCategory.filter(itemTemp => {
							return itemTemp !== item._id;
						})
					);
				}
			}}
			isShadow={selectedSubCategory.includes(item._id) ? true : false}
		/>
	);

	const pickImage = async (from: String) => {
		if (from === 'camera') {
			// Ask the user for the permission to access the camera
			const permissionResult =
				await ImagePicker.requestCameraPermissionsAsync();

			if (permissionResult.granted === false) {
				alert("You've refused to allow this appp to access your camera!");
				return;
			}

			const result = await ImagePicker.launchCameraAsync();

			// Explore the result
			console.log(result);
			setModalIsSuccess(false);

			if (!result.canceled) {
				console.log('source', result.assets[0]);
				setProfilePic(result.assets[0]);
				setIsAvatarSelect(false);
			}
		} else {
			// Ask the user for the permission to access the media library
			const permissionResult =
				await ImagePicker.requestMediaLibraryPermissionsAsync();

			if (permissionResult.granted === false) {
				alert("You've refused to allow this appp to access your photos!");
				return;
			}

			const result = await ImagePicker.launchImageLibraryAsync();

			// Explore the result
			console.log(result);
			setModalIsSuccess(false);

			if (!result.canceled) {
				console.log('source', result.assets[0]);
				setProfilePic(result.assets[0]);
				setIsAvatarSelect(false);
			}
		}
	};

	const createFormData = photo => {
		const formData = new FormData();
		formData.append('displayName', displayName);
		formData.append('biography', bioGraphy);
		//
		// formData.append('userName', userName);
		// formData.append('website', webSite);
		formData.append('visible', isProfileVisible);
		formData.append('isJury', isDispute);

		// formData.append('email', email);
		formData.append(
			'bettingStatisticsVisible',
			whoCanSeeBetStatistics.toLowerCase()
		);
		formData.append('balanceVisible', whoCanSeeYourBalance.toLowerCase());
		formData.append('betsVisible', whoCanSeeBets.toLowerCase());
		formData.append('messagesVisible', sendDirectMessage.toLowerCase());
		formData.append('videosVisible', whoCanSeeVideos.toLowerCase());
		if (isCategoryId) {
			formData.append('category_id', isCategoryId);
		}
		if (selectedSubCategory) {
			formData.append(
				'preferredSubCategories',
				selectedSubCategory?.toString()
			);
		}

		formData.append('isAvatar', isAvatarSelect);

		if (profilePic) {
			if (isAvatarSelect) {
				formData.append('picture', profilePic);
			} else {
				formData.append('picture', {
					name: photo.fileName,
					type: photo.type,
					uri:
						Platform.OS === 'android'
							? photo.uri
							: photo.uri.replace('file://', '')
				});
			}
		}
		const settingsKeys = {
			...userInfo?.user?.push_notifications,
			...{pause_all_notifications: isNotificationEnabled}
		};
		formData.append(
			'push_notifications[pause_all_notifications]',
			isNotificationEnabled
		);
		formData.append(
			'push_notifications[bet_join]',
			userInfo?.user?.push_notifications?.bet_join
		);
		formData.append(
			'push_notifications[bet_replicate]',
			userInfo?.user?.push_notifications?.bet_replicate
		);
		formData.append(
			'push_notifications[bet_invitation]',
			userInfo?.user?.push_notifications?.bet_invitation
		);
		formData.append(
			'push_notifications[new_followers]',
			userInfo?.user?.push_notifications?.new_followers
		);
		formData.append(
			'push_notifications[direct_messages]',
			userInfo?.user?.push_notifications?.direct_messages
		);
		formData.append(
			'push_notifications[events_you_like]',
			userInfo?.user?.push_notifications?.events_you_like
		);
		formData.append(
			'push_notifications[people_you_know]',
			userInfo?.user?.push_notifications?.people_you_know
		);
		formData.append(
			'push_notifications[your_friends_bet]',
			userInfo?.user?.push_notifications?.your_friends_bet
		);
		return formData;
	};

	const handleUploadPhoto = () => {
		dispatch(updateApiLoader({apiLoader: true}));

		console.log('createFormData(profilePic) >>>> ', createFormData(profilePic));

		fetch(ApiBaseUrl + ApiConstants.EditProfile, {
			method: Api.PUT,
			body: createFormData(profilePic),
			headers: {
				Authorization: 'Bearer ' + userInfo.token
			}
		})
			.then(response => response.json())
			.then(response => {
				console.log('upload succes', JSON.stringify(response));
				dispatch(updateApiLoader({apiLoader: false}));
				navigation.goBack();
			})
			.catch(error => {
				console.log('upload error', JSON.stringify(error));
				dispatch(updateApiLoader({apiLoader: false}));
				navigation.goBack();
			});
	};

	const handleAvatarSelection = () => {
		setModalIsSuccess(false);

		setTimeout(() => {
			setShowAvatarSelectSheet(true);
		}, 500);
	};
	const handleOnPressPushNotification = () => {
		navigation.navigate(ScreenNames.PushNotificationScreen, {});
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<HeaderComponent
					onLeftMenuPress={() => {
						navigation.goBack();
					}}
					onSaveMenuPress={() => {
						handleUploadPhoto();
					}}
					onLeftIconPath={icons.back}
					onSaveIconPath={icons.right}
					name={Strings.cancel}
				/>
				<ScrollView bounces={false}>
					<Text style={styles.titleStyle}>{Strings.settings}</Text>
					<View
						style={[
							{
								alignItems: 'center'
							},
							styles.viewContain
						]}>
						<Text style={styles.subTitleStyle}>
							{Strings.changeProfilePhoto}
						</Text>
						<TouchableOpacity
							onPressIn={() => setModalIsSuccess(true)}
							activeOpacity={1}>
							<ImageIndicator
								resizeMode="cover"
								source={
									profilePic
										? {uri: isAvatarSelect ? profilePic : profilePic.uri}
										: {uri: userInfo?.user?.picture}
								}
								style={styles.imgIconStyle}
								indicatorProps={{
									size: 40,
									borderWidth: 0,
									color: colors.gray,
									unfilledColor: colors.grayLightText
								}}
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.viewContain}>
						<Text style={styles.subTitleStyle}>{Strings.editProfile}</Text>
						<InputComponent
							style={styles.marginInput}
							isShowError={false}
							title={Strings.displayName}
							placeholder={Strings.name.toUpperCase()}
							onChangeText={(text: string) => {
								setDiplayName(text);
							}}
							textValue={displayName}
						/>
						<InputComponent
							style={styles.marginInput}
							textValue={'@' + userName}
							title={Strings.username}
							placeholder={'@ ' + Strings.username.toUpperCase()}
							editable={false}
							onChangeText={(text: string) => {
								setUserName(text);
							}}
						/>
						<InputComponent
							style={styles.marginInput}
							title={Strings.bioGraphy}
							placeholder={Strings.bioGraphy.toUpperCase()}
							returnKeyType={'done'}
							onChangeText={(text: string) => {
								setBioGraphy(text);
							}}
							textValue={bioGraphy}
							multiline={true}
						/>
					</View>
					<View style={styles.viewContain}>
						<Text style={styles.subTitleStyle}>
							{Strings.personalInformation}
						</Text>
						<InputComponent
							style={styles.marginInput}
							title={
								userInfo?.user?.mobile_number
									? Strings.phone
									: Strings.emailAddress
							}
							placeholder={Strings.emailAddress.toUpperCase()}
							editable={false}
							onChangeText={(text: string) => {
								setEmail(text);
							}}
							textValue={email}
						/>
					</View>

					<View style={styles.viewContain}>
						<Text style={styles.subTitleStyle}>{Strings.notifications}</Text>
						<SwichView
							toggleSwitch={() => toggleSwitch('notification')}
							title={Strings.pause_all}
							isEnabled={isNotificationEnabled}
						/>
						{!isNotificationEnabled ? (
							<>
								<TouchableOpacity
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
										marginHorizontal: horizontalScale(16),
										marginTop: verticalScale(12)
									}}
									activeOpacity={0.6}
									onPress={handleOnPressPushNotification}>
									<Text
										style={{
											fontSize: moderateFontScale(12),
											color: colors.white,
											fontFamily: Fonts.type.Inter_Regular,
											fontWeight: '800',
											textTransform: 'uppercase'
										}}>
										{Strings.push_notification.toUpperCase()}
									</Text>
									<Image
										source={icons.arrowForward}
										style={{height: 18, width: 18}}
									/>
								</TouchableOpacity>
							</>
						) : null}
					</View>

					<View style={styles.viewContain}>
						<Text style={styles.subTitleStyle}>{Strings.privacy}</Text>
						<SwichView
							toggleSwitch={() => toggleSwitch('privacy')}
							title={Strings.makeYourProfileVisible.toUpperCase()}
							isEnabled={isProfileVisible}
						/>
						{isProfileVisible && (
							<>
								<Text style={styles.monthNameStyle}>
									{Strings.defineWhoCan}
								</Text>
								<SelectWhoCan
									onMenuPress={() => {
										navigation.navigate(ScreenNames.WhoCanViewScreen, {
											title: Strings.bettingStatistics,
											description: Strings.whoCanSeeYourBettingSatistics,
											setWhoCanSee: whoCanSeeBetStatistics,
											whoCanSeeGet
										});
									}}
									title={Strings.seeYourBettingStatistics.toUpperCase()}
									selectedType={whoCanSeeBetStatistics}
								/>
								<SelectWhoCan
									onMenuPress={() => {
										navigation.navigate(ScreenNames.WhoCanViewScreen, {
											title: Strings.balance,
											description: Strings.WhoCanSeeYourBalance,
											setWhoCanSee: whoCanSeeYourBalance,
											whoCanSeeGet
										});
									}}
									title={Strings.seeYourBalance.toUpperCase()}
									selectedType={whoCanSeeYourBalance}
								/>
								<SelectWhoCan
									onMenuPress={() => {
										navigation.navigate(ScreenNames.WhoCanViewScreen, {
											title: Strings.bets,
											description: Strings.WhoCanSeeYourBets,
											setWhoCanSee: whoCanSeeBets,
											whoCanSeeGet
										});
									}}
									title={Strings.seeYourBets.toUpperCase()}
									selectedType={whoCanSeeBets}
								/>
								<SelectWhoCan
									onMenuPress={() => {
										navigation.navigate(ScreenNames.WhoCanViewScreen, {
											title: Strings.directMessages,
											description: Strings.WhoCanSendYouDMs,
											setWhoCanSee: sendDirectMessage,
											whoCanSeeGet
										});
									}}
									title={Strings.sendYouDirectMessages.toUpperCase()}
									selectedType={sendDirectMessage}
								/>
								<SelectWhoCan
									onMenuPress={() => {
										navigation.navigate(ScreenNames.WhoCanViewScreen, {
											description: Strings.who_can_see_your_videos,
											setWhoCanSee: whoCanSeeVideos,
											whoCanSeeGet,
											arrOptions: videoArrOptions
										});
									}}
									title={Strings.see_your_video_content.toUpperCase()}
									selectedType={whoCanSeeVideos}
								/>
							</>
						)}
					</View>
					<View style={styles.viewContain}>
						<Text style={styles.subTitleStyle}>{Strings.preferences}</Text>
						<Text
							style={[
								styles.monthNameStyle,
								{
									marginVertical: verticalScale(16)
								}
							]}>
							{Strings.selectYourCategories}
						</Text>
						<FlatList
							horizontal
							data={categoryData}
							showsHorizontalScrollIndicator={false}
							renderItem={renderSportsItem}
							style={{marginLeft: horizontalScale(8)}}
						/>
						<FlatList
							horizontal
							data={subCategoryData}
							showsHorizontalScrollIndicator={false}
							renderItem={renderSubCatItem}
							style={{marginLeft: horizontalScale(8)}}
						/>
					</View>
				</ScrollView>
				<SelectImageComponet
					isVisible={modalIsSuccess}
					setIsVisible={setModalIsSuccess}
					onPressCamera={() => pickImage('camera')}
					onPressGallery={() => pickImage('gallery')}
					onPressAvatar={handleAvatarSelection}
				/>

				<SelectAvatarComponent
					isVisible={showAvatarSelectSheet}
					onPressSelectSheet={data => {
						if (data) {
							console.log('data >>> ', data);
							setIsAvatarSelect(true);
							setProfilePic(data);
						}
						setShowAvatarSelectSheet(false);
					}}
					avtarDataArray={avatarDataArray}
				/>
			</View>
		</SafeAreaView>
	);
};

export default EditProfileScreen;
