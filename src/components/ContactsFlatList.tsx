import React, {useEffect, useMemo, useState} from 'react';
import {
	TextInputProps,
	FlatList,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Linking,
	Platform,
	TextInput
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Strings from '../constants/strings';
import {generateColor, showErrorAlert} from '../constants/utils/Function';
import {
	filterUserContacts,
	followUnfollowUser,
	getCMS
} from '../redux/apiHandler/apiActions';
import {RootState} from '../redux/store';
import {Fonts, horizontalScale, moderateScale, verticalScale} from '../theme';
import colors from '../theme/colors';
import {defaultTheme} from '../theme/defaultTheme';
import ConnectUserView from './ConnectUserView';

import countriesList from '../constants/utils/countriesList.json';
import * as RNLocalize from 'react-native-localize';
import ExpoFastImage from 'expo-fast-image';
import icons from '../assets/icon';
import fonts from '../theme/fonts';
import {gradientColorAngle} from '../theme/metrics';
import SwichView from './SwichView';
import ButtonGradient from './ButtonGradient';
import useUpdateEffect from './CustomHooks/useUpdateEffect';
import {updateSyncContact} from '../redux/reducerSlices/userInfo';
import {clearContacts} from '../redux/reducerSlices/contactsData';
import {LinearGradient} from 'expo-linear-gradient';
import {updateApiLoader} from '../redux/reducerSlices/preLogin';

interface Props extends TextInputProps {
	userId?: string;
	title?: string;
	getContacts?: () => void;
}

const ContactsFlatList: React.FC<Props> = props => {
	const {getContacts} = props;

	const userInfo = useSelector((state: RootState) => {
		return state.userInfo.data;
	});

	const [userData, setUserData] = useState([]);

	const regex = /[^\w\s]/gi;

	const [shareContent, setShareContent] = useState('');
	const regexSharTag = /(<([^>]+)>)/gi;

	const localData = countriesList;
	const dispatch = useDispatch();

	const contactsList = useSelector((state: RootState) => {
		return state.contactsData.contacts;
	});

	const [isSyncEnable, setIsSyncEnable] = useState(userInfo?.isSyncContact);
	const [userContacts, setUserContacts] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [searchContactData, setSearchContactData] = useState([]);
	const [isChecked, setIsChecked] = useState(true);

	const getCMSData = () => {
		getCMS('share-app-content')
			.then(res => {
				console.log('getCategoryData Response : ', res);
				var html = res?.data?.content;
				const result = html.replace(regexSharTag, '');
				const userName =
					userInfo?.user?.displayName || userInfo?.user?.userName;
				setShareContent(userName + ' ' + result.replace('&nbsp;', ' '));
			})
			.catch(err => {
				console.log('getCategoryData Data Err : ', err);
			});
	};

	const onShare = async (number: string, url: string) => {
		console.log('URL::::', number, url);
		try {
			const separator = Platform.OS === 'ios' ? '&' : '?';

			const sharedata =
				Platform.OS === 'ios'
					? `sms:/open?addresses=${number}${separator}body=${url}`
					: `sms:${number}${separator}body=${url}`;

			await Linking.openURL(sharedata);
		} catch (err) {
			console.log('Error while sending SMS message: ', err);
		}
	};

	useEffect(() => {
		if (contactsList.length !== 0) {
			let ISDCode = localData[RNLocalize.getCountry()]?.callingCode[0];
			console.log(
				'ISDCode',
				ISDCode,
				'\ncontactsList',
				JSON.stringify(contactsList)
			);

			var arrayData = [];
			contactsList?.map(item => {
				let mobile_number = '';
				if (item?.phoneNumbers[0]?.number[0] === '+') {
					mobile_number =
						'+' + item?.phoneNumbers[0]?.number.replace(regex, '');
				} else {
					mobile_number =
						'+' + ISDCode + item?.phoneNumbers[0]?.number.replace(regex, '');
				}

				let userObj = {
					firstname:
						item?.givenName === item?.phoneNumbers[0]?.number
							? ''
							: item?.givenName,
					lastname: item?.familyName,
					mobile_number: mobile_number.replace(/ /g, ''),
					textImgColor: generateColor()
				};

				if (userObj.mobile_number !== userInfo?.user?.mobile_number) {
					arrayData.push(userObj);
				}
			});
			console.log('arrayData', arrayData);
			filterUserContactsData(arrayData);
		}
	}, [contactsList]);

	useEffect(() => {
		if (searchText.trim().length > 0) {
			let temList = [...userData];
			let filteredData = temList?.filter(function (item) {
				let name = item?.firstname + ' ' + item?.lastname;
				if (name) {
					return name.toLowerCase().includes(searchText?.trim().toLowerCase());
				} else if (item?.mobile_number) {
					return item?.mobile_number
						.toLowerCase()
						.includes(searchText?.trim().toLowerCase());
				}
			});
			setSearchContactData([...filteredData]);
		}
	}, [searchText]);

	const categoryArray = useMemo(() => {
		return searchText.trim().length > 0 ? searchContactData : userData;
	}, [searchText, userData, searchContactData]);

	useEffect(() => {
		getCMSData();
	}, []);

	const renderFollowersUserItem = ({item}) => {
		return (
			<ConnectUserView
				isInviteVisible={true}
				colorArray={
					item?.isPresent
						? defaultTheme.primaryGradientColor
						: defaultTheme.ternaryGradientColor
				}
				username={
					item?.isPresent
						? '@' + item?.user?.userName
						: item?.firstname === ''
						? item?.mobile_number
						: item?.firstname + ' ' + item?.lastname
				}
				leftIconPath={item?.isPresent ? item?.user?.picture : ''}
				buttonText={item?.isPresent ? Strings.follow : Strings.invite}
				subTitle={item?.isPresent ? item?.firstname + ' ' + item?.lastname : ''}
				onInvitePress={() => {
					if (item?.isPresent) {
						console.log('onPress');
						postFollowUser(item?.user?._id);
						removeUser(item?.mobile_number);
					} else {
						onShare(item?.mobile_number, shareContent);
					}
				}}
				shouldShowCheckBox={item?.isPresent ? false : true}
				textImgColor={item?.textImgColor}
				imgText={
					item?.firstname === ''
						? item?.mobile_number[0] + item?.mobile_number[1]
						: (item?.firstname[0] ?? '') + (item?.lastname[0] ?? '')
				}
				ischeckboxView={isChecked}
				isSelect={userContacts.includes(item?.mobile_number) ? true : false}
				onIsSelect={(isSelected: boolean) => {
					console.log('INDEX', item?.mobile_number, isSelected);
					selectvalue(item);
				}}
				onPress={() => {
					console.log('INDEX', item);
				}}
			/>
		);
	};

	function selectvalue(item: any) {
		if (userContacts.length >= 10) {
			showErrorAlert('', Strings.you_can_only_share_with_upto_10_users);
			return;
		}
		let isExists = userContacts.includes(item?.mobile_number);
		if (!isExists) {
			userContacts.push(item?.mobile_number);
			setUserContacts([...userContacts]);
		} else {
			setUserContacts(
				userContacts.filter(itemTemp => {
					return itemTemp !== item.mobile_number;
				})
			);
		}
	}

	const filterUserContactsData = (data: any) => {
		dispatch(updateApiLoader({apiLoader: true}));
		filterUserContacts(data)
			.then(res => {
				console.log('filterUserContactsData Response : ', JSON.stringify(res));
				// setUserData(res?.data);

				setUserData(
					res?.data?.filter(function (item, pos) {
						return res?.data?.indexOf(item) == pos;
					})
				);

				dispatch(updateApiLoader({apiLoader: false}));
			})
			.catch(err => {
				console.log('filterUserContactsData Data Err : ', err);
				dispatch(updateApiLoader({apiLoader: false}));
			});
	};

	//followUnfollowUser
	const postFollowUser = (follower_id: any) => {
		followUnfollowUser({follower_id: follower_id})
			.then(res => {
				console.log('postFollowUser Response : ', res);
			})
			.catch(() => {});
	};

	useUpdateEffect(() => {
		dispatch(updateSyncContact(isSyncEnable));

		if (isSyncEnable) {
			getContacts;
		} else {
			dispatch(clearContacts());
			setUserData([]);
			setUserContacts([]);
			setSearchText('');
		}
	}, [isSyncEnable]);

	const removeUser = (mobile_number: any) => {
		let filteredList = userData.filter(
			(item: any) => item.mobile_number !== mobile_number
		);
		setUserData(filteredList);
	};

	function handleSend(contactNumber: [], url: string) {
		let numbers = '';
		const separator = Platform.OS === 'ios' ? ',' : ';';
		contactNumber.forEach((phoneNumber: string) => {
			numbers += `${phoneNumber}${separator}`;
		});
		numbers = numbers.slice(0, -1);
		onShare(numbers, url);
	}

	return (
		<View style={styles.container}>
			<View style={styles.viewSyncContact}>
				<SwichView
					toggleSwitch={() => {
						setIsSyncEnable(!isSyncEnable);
					}}
					title={Strings.sync_contacts.toUpperCase()}
					isEnabled={isSyncEnable}
				/>
			</View>

			{isSyncEnable && (
				<>
					<View style={styles.searchBar}>
						<ExpoFastImage
							style={{height: 21, width: 21, opacity: 0.7}}
							source={icons.search}
							resizeMode={'contain'}
						/>
						<TextInput
							style={styles.input}
							placeholder={Strings.search}
							placeholderTextColor={colors.textTitle}
							onChangeText={text => {
								setSearchText(text);
							}}
						/>
					</View>
					<View style={styles.selectView}>
						<Text style={styles.selectedText}>{Strings.str_share}</Text>
						<View style={styles.selectView}>
							<Text style={styles.selectText}>{Strings.str_select}</Text>
							<TouchableOpacity
								onPress={() => {
									setUserContacts([]);
									setIsChecked(!isChecked);
								}}>
								{isChecked ? (
									<LinearGradient
										useAngle={true}
										angle={gradientColorAngle}
										colors={defaultTheme.ternaryGradientColor}
										style={styles.checkboxView}></LinearGradient>
								) : (
									<ExpoFastImage
										style={styles.checkboxView}
										source={icons.ic_checkbox}
									/>
								)}
							</TouchableOpacity>
						</View>
					</View>
				</>
			)}

			{userData.length ? (
				<FlatList
					data={categoryArray}
					renderItem={renderFollowersUserItem}
					showsVerticalScrollIndicator={false}
				/>
			) : (
				<View style={styles.noDataView}>
					<Text style={styles.descriptionStyle}>
						{Strings.sync_your_contacts_from_settings_to_see_them_here}
					</Text>
				</View>
			)}
			{userContacts.length >= 1 && (
				<ButtonGradient
					onPress={() => {
						handleSend(userContacts, shareContent);
					}}
					colorArray={defaultTheme.secondaryGradientColor}
					angle={gradientColorAngle}
					buttonTextcolor={colors.white}
					buttonText={Strings.send}
					style={styles.marginInput}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		// alignItems: 'center',
		borderRadius: verticalScale(10),
		backgroundColor: colors.transparent,
		overflow: 'hidden',
		paddingHorizontal: verticalScale(8),
		flex: 1,
		marginBottom: verticalScale(8)
	},
	titleStyle: {
		fontSize: moderateScale(18),
		color: colors.white,
		fontFamily: Fonts.type.Krona_Regular,
		marginVertical: verticalScale(24),
		textAlign: 'center',
		flex: 1
	},
	noDataView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	descriptionStyle: {
		color: colors.grayLightText,
		fontSize: moderateScale(16),
		fontFamily: Fonts.type.Inter_Medium,
		textAlign: 'center',
		marginVertical: verticalScale(10)
	},
	searchContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%',
		marginBottom: verticalScale(10)
	},
	searchBar: {
		paddingHorizontal: horizontalScale(10),
		paddingVertical: Platform.OS === 'ios' ? verticalScale(8) : 0,
		flexDirection: 'row',
		backgroundColor: colors.black,
		borderRadius: 8,
		alignItems: 'center',
		height: verticalScale(45),
		marginBottom: verticalScale(10)
	},
	input: {
		fontSize: moderateScale(12),
		flex: 1,
		marginHorizontal: horizontalScale(8),
		color: 'white',
		fontFamily: fonts.type.Inter_Regular
	},
	viewSyncContact: {
		paddingVertical: verticalScale(16),
		marginVertical: verticalScale(12),
		backgroundColor: defaultTheme.secondaryBackGroundColor,
		borderRadius: verticalScale(10)
	},
	marginInput: {
		marginVertical: verticalScale(16)
	},
	selectView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	selectedText: {
		marginTop: verticalScale(15),
		textAlign: 'left',
		fontSize: moderateScale(12),
		color: colors.textTitle,
		fontFamily: fonts.type.Inter_Regular,
		marginBottom: verticalScale(10)
	},
	selectText: {
		textAlign: 'right',
		fontSize: moderateScale(12),
		color: colors.white,
		fontFamily: fonts.type.Inter_Medium,
		paddingRight: verticalScale(5)
	},
	checkboxView: {
		height: verticalScale(16),
		width: verticalScale(16)
	}
});
export default ContactsFlatList;
